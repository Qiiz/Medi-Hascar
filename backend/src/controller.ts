import { Request, Response } from "express";
import EquipmentRepo from "./repository.js";
import Connection from "../db.js"
import { Equipments } from "./model.js";
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
            console.log(response.data);
            return response.data
          } catch (error) {
            // Handle any errors here
            console.error(error);
            return null
          }

    }

    async save(req: Request, res: Response) {
        const controllerInstance = new Controller(); // Instantiate the Controller class
        const equipmentInstance: Equipments = req.body
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
            equipmentInstance.cluster = -1
        }

        try {

            await EquipmentRepo.save(equipmentInstance);
            res.status(200).send({
                message: "Success! Saved to database."
            })
            
            
        } catch (err) {
            // console.log(err)

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
        console.log('im in update')
        try {
            const updatedEquipment = req.body
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

    async getStatistics(req:Request, res:Response){
        try {
            // get all availble items 
            const totalAvailable = await EquipmentRepo.getAllStatus("Available")
            const totalUnAvailable = await EquipmentRepo.getAllStatus("Not Available")

            // calculate the overall health
            const nonfunctionalSize = await EquipmentRepo.getAllFunctionality("Non-functional");
            const functionalSize = await EquipmentRepo.getAllFunctionality("Functional");
            const totalSize = nonfunctionalSize + functionalSize;
            // calculate the healthy percentage
            const healthyPercentage = (functionalSize / totalSize) * 100;

            // Create a JSON object to hold the variables and their values
            const responseObj = {
                totalUnhealthy: nonfunctionalSize,
                healthyPercentage: healthyPercentage,
                totalUnAvailable: totalUnAvailable,
                totalAvailable: totalAvailable,
            };
        
            // send the JSON response to the frontend
            res.status(200).json(responseObj);
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
                const threshold = (item.cluster_healthy_count/item.cluster_unhealthy_count + item.cluster_healthy_count) * 100
                console.log("threshold: ", threshold)

                if (threshold > 70){
                    forecast = "Good"
                }else{
                    forecast = "Bad"
                }

                const totalUnavailable = item.totalEquipmentsCount - item.available_count

                const responseObj = {
                    category: item.category,
                    quantity: item.totalEquipmentsCount,
                    inuse: totalUnavailable,
                    available: Number(item.available_count),
                    unhealthy: Number(item.cluster_0_count), // cluster_0 is the total unhealthy equipments
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
}