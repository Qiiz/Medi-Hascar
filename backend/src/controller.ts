import { Request, Response } from "express";
import Connection from "../db.js"

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
}