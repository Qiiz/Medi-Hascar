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
    // get all the status
    getAllStatus(status: String): Promise<number>;

}

// data layer access for our database 
class EquipmentRepo implements IEquipmentRepo {
    async getAllStatus(status: String): Promise<number> {
        const connection = await DBconnection();
        const query = `SELECT status FROM db.Equipments
                        WHERE  status = '${status}'`
        try {
            const [rows] = await connection.execute(query)
            if (Array.isArray(rows)) {
                const size = rows.length;
                return size
            } else return 0;
        } catch (err) {
            throw err;
        } finally{
            connection.end();
        }
    }

    async getAllFunctionality(functionality: string): Promise<number> {
        const connection = await DBconnection();
        const query = `SELECT functionality FROM db.Equipments WHERE functionality = '${functionality}'`;
    
        try {
            const [functionalitySize] = await connection.execute(query);
            if (Array.isArray(functionalitySize)) {
                const size = functionalitySize.length;
                return size
            } else return 0;
        } catch (err) {
            throw err;
        } finally {
            connection.end();
        }
    }

    async save(equipment: Equipments): Promise<void>{
        const connection = await DBconnection();
        try {
            const insertQuery = `INSERT INTO db.Equipments (serial_number, state, equip_name, category, cost, status, functionality, under_warrenty) 
                                VALUES ('${equipment.serial_number}', 
                                        '${equipment.state}',
                                        '${equipment.equip_name}', 
                                        '${equipment.category}', 
                                        '${equipment.cost}', 
                                        '${equipment.status}',
                                        '${equipment.functionality}',
                                        '${equipment.under_warrenty}')`;
    
            // Execute the insert query
            const [result] = await connection.execute(insertQuery);
        } catch (err) {
            throw err; // Propagate the error to the caller so that they can catch the error
        } finally{
            connection.end(); // Close the DB connection once the operation is completed
        }
    }
 
    async retrieveAll(searchParams: { serial_number: string; }): Promise<Equipments[]> {
        let query: string = `SELECT * FROM db.Equipments`;
        let condition: string = ""
        const connection = await DBconnection();
        
        if (searchParams?.serial_number)
            condition += `LOWER(equip_name) LIKE '%${searchParams.serial_number}%'`
        // we can add more parameters if we want to

        if(condition.length)
            query += " WHERE " + condition

        try {
            const [rows] = await connection.execute(query);
            return rows as Equipments[];
        } catch (err) {
            throw err; // Propagate the error to the caller so that they can catch the error
        } finally {
            connection.end(); // Close the DB connection once the operation is completed
        }
    }

    async retrieveSingle(searchParams: { serial_number?: string; }): Promise<Equipments[]> {
        const connection = await DBconnection();
        const query = `SELECT * FROM db.Equipments
                        WHERE serial_number = '${searchParams.serial_number}'`
        
        try {
            const [rows] = await connection.execute(query)
            // Assuming the first row in the result represents the Equipment model
            return rows as Equipments[];

        } catch (err) {
            throw err;
        } finally{
            connection.end()
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
                        under_warrenty = '${newEquipment.under_warrenty}'
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
    retrieveMedicalItems(Params: { page: number; limit: number; }): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export default new EquipmentRepo();
