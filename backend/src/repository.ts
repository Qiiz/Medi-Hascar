import DBconnection from '../db.js'
import { Equipments } from './model.js'

// do the api end point for medical items and 
// and also statistics

interface IEquipmentRepo {
    /* 
        Utility commands
    */
    // insert the model object into database
    save(equipment: Equipments): Promise<void>;
    // select * from database with <OPTIONAL condition>
    retrieveAll(searchParams: { serial_number?: string }): Promise<Equipments[]>;
    // select * from database with <OPTIONAL condition>
    retrieveSingle(searchParams: { serial_number?: string }): Promise<Equipments[]>;

    /* 
        Page commands
    */
    // update specific record 
    updateItem(oldEquipment: Equipments, newEquipment: Equipments): Promise<void>;
    updateItemStatus(serial_number: String): Promise<void>;

    // get all the status
    getAllStatus(status: String): Promise<number>;

}

// data layer access for our database 
class EquipmentRepo implements IEquipmentRepo {
    async save(equipment: Equipments): Promise<void>{
        const connection = await DBconnection();
        try {
            const insertQuery = `INSERT INTO db.Equipments (serial_number, state, equip_name, category, cost, status, functionality, under_warrenty, installation_date, cluster) 
                                VALUES ('${equipment.serial_number}', 
                                        '${equipment.state}',
                                        '${equipment.equip_name}', 
                                        '${equipment.category}', 
                                        '${equipment.cost}', 
                                        '${equipment.status}',
                                        '${equipment.functionality}',
                                        '${equipment.under_warrenty}',
                                        '${equipment.installation_date}',
                                        '${equipment.cluster}')`;
    
            // Execute the insert query
            const [result] = await connection.execute(insertQuery);
        } catch (err) {
            throw err; // Propagate the error to the caller so that they can catch the error
        } finally{
            connection.end(); // Close the DB connection once the operation is completed
        }
    }

    async updateItem(oldEquipment: Equipments, newEquipment: Equipments): Promise<void> {
        const connection = await DBconnection();
        const query = `UPDATE db.Equipments
                        SET 
                        category = '${newEquipment.category}',
                        equip_name = '${newEquipment.equip_name}', 
                        state = '${newEquipment.state}', 
                        status = '${newEquipment.status}',
                        cost = '${newEquipment.cost}',
                        functionality = '${newEquipment.functionality}',
                        under_warrenty = '${newEquipment.under_warrenty}',
                        installation_date = '${newEquipment.installation_date}'
                        cluster = '${newEquipment.cluster}',
                        WHERE serial_number = '${oldEquipment.serial_number}';`

        try {
            await connection.execute(query);
        } catch (err) {
            console.log(err)
            throw err; 
        } finally {
            connection.end();
        }
    }

    retrieveAll(searchParams: { serial_number?: string | undefined; }): Promise<Equipments[]> {
        throw new Error('Method not implemented.');
    }
    retrieveSingle(searchParams: { serial_number?: string | undefined; }): Promise<Equipments[]> {
        throw new Error('Method not implemented.');
    }
    updateItemStatus(serial_number: String): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getAllStatus(status: String): Promise<number> {
        throw new Error('Method not implemented.');
    }
    
}

export default new EquipmentRepo();
