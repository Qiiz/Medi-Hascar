import { Request, Response } from "express";
import EquipmentRepo from "./repository.js";
import Connection from "../db.js"
import { Equipments } from "./model.js";
import { MedicalItem, Activity, Forecast, Statistics } from "../../shared/models.js";

import axios from 'axios';

export default class Controller {

    async predict(equipment: Equipments) {

        const PORT_NUMBER = 8080; // FLASK SERVER 
        const POST_ENDPOINT = '/cluster_data'; // FLASK SERVER 
        const apiUrl = `http://0.0.0.0:${PORT_NUMBER}${POST_ENDPOINT}`;

        const responseObj = {
            serial_number: equipment.serial_number,
            cost: equipment.cost,
            warrenty: equipment.under_warrenty,
            status: equipment.status,
            functional: equipment.functionality,
            installation_date: equipment.installation_date,
        };
        try {
            const response = await axios.post(apiUrl, responseObj);
            // Handle the response here
            console.log("ML return value: " + response.data);
            return response.data
          } catch (error) {
            // Handle any errors here
            // console.error(error);
            return null
          }

    }

    async save(req: Request, res: Response) {
        console.log(req.body.data);
        const controllerInstance = new Controller(); // Instantiate the Controller class
        const equipmentInstance: Equipments = req.body.data;

        const existingEquipment = await EquipmentRepo.retrieveSingle({serial_number: equipmentInstance.serial_number}); // will return an array with one item inside.
        if (existingEquipment.length >0){
            res.status(500).send("Item already exist in database!")
            return;
        }
        if (!equipmentInstance){ // make sure that there is something in the body
            res.status(500).send("Cannot be empty!")
            return;
        }
        // run ML prediction here
        const mlResults = await controllerInstance.predict(equipmentInstance);
        if(mlResults != null) {
            equipmentInstance.cluster =  mlResults['cluster_num']
        }else{
            equipmentInstance.cluster = -1 // ML no process
        }

        try {
            await EquipmentRepo.save(equipmentInstance);
            res.status(200).send({
                message: "Success! Saved to database."
            })
            
        } catch (err) {
            // console.log(err);
            res.status(500).send({
                message: err
            })
        }
    }

    async findAll(req: Request, res: Response) {
        // ENDPOINT: api/retrieveAll or api/retrieveAll?equipment_name="ABC"
        const name = typeof req.query.equipment_name === "string" ? req.query.equipment_name: ""
        try {
            // retrieve from the repository
            const equipmentDetails = await EquipmentRepo.retrieveAll({
                serial_number: name,
            });
            res.status(200).send(equipmentDetails);
        } catch (err) {
            res.status(500).send({
                message: err
          });
        }
    }

    async testDBConnection(req: Request, res: Response){
        try {
            await Connection();
            res.status(200).send({
                message: 'Database connection is successful.'
            });            
        } catch (err) {
            res.status(500).send({
                message: err
            })
        }
    }

    async updateItem(req: Request, res: Response){
        const controllerInstance = new Controller(); // Instantiate the Controller class
        try {
            const updatedEquipment: Equipments = req.body.data;
            // Get the existing data
            const existingEquipment = await EquipmentRepo.retrieveSingle({serial_number: updatedEquipment.serial_number}); // will return an array with one item inside.
            // existing equipment does not exist
            if (existingEquipment.length == 0){
                res.status(400).send({
                    message: "Equipment not found in database!"
                })
                return ;
            }

            if (!updatedEquipment){ // make sure that there is something in the body
                res.status(500).send("Cannot be empty!")
                return;
            }
            // run ML prediction here
            const mlResults = await controllerInstance.predict(updatedEquipment)
            
            if(mlResults != null) {
                updatedEquipment.cluster = mlResults['cluster_num']
            }else{
                updatedEquipment.cluster = -1 // nothing 
            }
        
            if (existingEquipment.length > 0) {
                // Use existingEquipment's values to fill missing or empty properties in updatedEquipment
                const existing = existingEquipment[0];
                for (const key in existing) {
                    if (!(key in updatedEquipment)) {
                        updatedEquipment[key] = existing[key];
                    }
                }
            }
            
            await EquipmentRepo.updateItem(existingEquipment[0], updatedEquipment)
            res.status(200).send({
                message: "Success! Saved to database."
            });    

        } catch (err) {
            res.status(500).send({
                message: err
            })
        }
    }

    async getForecast(req:Request, res:Response){
        try {

            const forecastResults: any = await EquipmentRepo.getForecast()
            console.log(forecastResults)
            const responseArray = []; // Initialize an empty array to store objects

            for (const item of forecastResults) {
                // calculate threshold  
                var forecast = "Not Processed"
                const total_size = Number(item.cluster_healthy_count) + Number(item.cluster_unhealthy_count)
                const threshold = (Number(item.cluster_healthy_count) /total_size) * 100
                console.log("unhealthy",  item.cluster_unhealthy_count)
                console.log("healthy", item.cluster_healthy_count)
                console.log("size", total_size)
                console.log("threshold: ", threshold)

                if (threshold > 70){
                    forecast = "Good"
                } 
                else if (threshold > 0 && threshold <= 70) {
                    forecast = "Bad"
                }

                const totalUnavailable = item.totalEquipmentsCount - item.available_count

                const responseObj: Forecast = {
                    category: item.category,
                    quantity: item.totalEquipmentsCount,
                    in_use: String(totalUnavailable),
                    available: item.available_count,
                    unhealthy: item.cluster_unhealthy_count, // cluster_0 is the total unhealthy equipments
                    forecast: forecast,
                };
                responseArray.push(responseObj);

              }
        
            // send the JSON response to the frontend
            res.status(200).json(responseArray);
        } catch (err) {
            res.status(500).send({
                message: err
            })
        }
    }

    async getStatistics(req:Request, res:Response){
        try {
            // get all availble items 
            const totalAvailable = await EquipmentRepo.getAllStatus("Available")
            const totalUnavailable = await EquipmentRepo.getAllStatus("Not Available")

            // calculate the overall health
            const nonfunctionalSize = await EquipmentRepo.getAllFunctionality("Approved for Disposal");
            const functionalSize = 0
                + await EquipmentRepo.getAllFunctionality("Active/in Use")
                + await EquipmentRepo.getAllFunctionality("Not in Use");
            const totalSize = nonfunctionalSize + functionalSize;
            // calculate the healthy percentage
            const healthyPercentage = ((functionalSize / totalSize) * 100).toFixed(2);

            // Create a JSON object to hold the variables and their values
            const responseObj: Statistics  = {
                totalUnhealthy: String(nonfunctionalSize),
                healthyPercentage: String(healthyPercentage),
                totalUnAvailable: String(totalUnavailable),
                totalAvailable: String(totalAvailable)
            };
        
            // send the JSON response to the frontend
            res.status(200).json(responseObj);
        } catch (err) {
            res.status(500).send({
                message: err
            })
        }
    }

    async getMedItems(req: Request, res:Response){
        try {
            const medicalItems = await EquipmentRepo.retrieveAll({serial_number: ""});
            const responseArray = []

            for (const item of medicalItems){
                const responseObj: MedicalItem = {
                    serial_number: item.serial_number,
                    equip_name: item.equip_name,
                    state: item.state,
                    installation_date: item.installation_date,
                    status: item.status,
                    functionality: item.functionality,
                    category: item.category,
                    cost: item.cost,
                    under_warrenty: item.under_warrenty
                }
                responseArray.push(responseObj)   
            }
            res.status(200).json(responseArray)
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    }

    async getActivities(req: Request, res:Response){
        try {
            const activityItems = await EquipmentRepo.retrieveAll({serial_number: ""});
            const responseArray = []

            for (const item of activityItems){
                const responseObj: Activity ={
                    serial_number: item.serial_number,
                    state: item.state,
                    equip_name: item.equip_name,
                    borrow_date: item.borrow_date,
                    return_date: item.return_date,
                    status: item.status
                }
                responseArray.push(responseObj)
            }
            res.status(200).json(responseArray)
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    }

    async deleteItem(req: Request, res:Response){
        try {
            const item = req.body.data;
            await EquipmentRepo.deleteSingle(item.serial_number)
            res.status(200).send("Deleted Successfully.")
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    }

}