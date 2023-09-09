import { Request, Response } from "express";
import Connection from "../db.js"
import { Equipments } from "./model.js";
import EquipmentRepo from "./repository.js";


export default class Controller {

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

    async save(req: Request, res: Response) {
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
        
        try {
            // run ML prediction here
            await EquipmentRepo.save(equipmentInstance);
            res.status(200).send({
                message: "Success! Saved to database."
            })
            
            
        } catch (err) {
            res.status(500).send({
                message: err
            })
        }
    }

    async updateItem(req: Request, res: Response){
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
}