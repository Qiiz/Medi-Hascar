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

    deleteSingle(serial_number: String): Promise<void>;
    // update specific record 
    updateItem(oldEquipment: Equipments, newEquipment: Equipments): Promise<void>;
    // get all the status
    getAllStatus(status: String): Promise<number>;

}

// data layer access for our database 
class EquipmentRepo implements IEquipmentRepo {
    async deleteSingle(serial_number: String): Promise<void> {
        const connection = await DBconnection();
        const query = `DELETE FROM db.Equipment WHERE serial_number = '${serial_number}';`

        try {
            await connection.execute(query)
        } catch (err) {
            throw err;
        } finally{
            connection.end()
        }
    }

    async getAllStatus(status: String): Promise<number> {
        const connection = await DBconnection();
        const query = `SELECT status FROM db.Equipment
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
        const query = `SELECT functionality FROM db.Equipment WHERE functionality = '${functionality}'`;
    
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
            const insertQuery = `INSERT INTO db.Equipment  
                                (state, district, facility, category, equip_name, cost, serial_number, 
                                department, manufacturer, model, price, installation_date, under_warrenty, 
                                functionality, status, return_date, borrow_date, cluster) 
                                VALUES (
                                    '${equipment.state || ""}',
                                    '${equipment.district || ""}',
                                    '${equipment.facility || ""}',
                                    '${equipment.category || ""}',
                                    '${equipment.equip_name || ""}',
                                    ${equipment.cost || 0},
                                    '${equipment.serial_number || ""}',
                                    '${equipment.department || ""}',
                                    '${equipment.manufacturer || ""}',
                                    '${equipment.model || ""}',
                                    ${equipment.price || 0},
                                    '${equipment.installation_date || ""}',
                                    '${equipment.under_warrenty || ""}',
                                    '${equipment.functionality || ""}',
                                    '${equipment.status || ""}',
                                    '${equipment.return_date || ""}',
                                    '${equipment.borrow_date || ""}',
                                    ${equipment.cluster || 0})`;

            console.log(insertQuery);
    
            // Execute the insert query
            const [result] = await connection.execute(insertQuery);
        } catch (err) {
            throw err; // Propagate the error to the caller so that they can catch the error
        } finally{
            connection.end(); // Close the DB connection once the operation is completed
        }
    }
 
    async retrieveAll(searchParams: { serial_number: string; }): Promise<Equipments[]> {
        let query: string = `SELECT * FROM db.Equipment`;
        let condition: string = ""
        const connection = await DBconnection();
        
        if (searchParams?.serial_number)
            condition += `LOWER(equip_name) LIKE '%${searchParams.serial_number}%'`
        // we can add more parameters if we want to

        if(condition.length)
            query += " WHERE " + condition

        try {
            const [rows] = await connection.execute(query);
            return rows as unknown as Equipments[];
        } catch (err) {
            throw err; // Propagate the error to the caller so that they can catch the error
        } finally {
            connection.end(); // Close the DB connection once the operation is completed
        }
    }

    async retrieveSingle(searchParams: { serial_number?: string; }): Promise<Equipments[]> {
        const connection = await DBconnection();
        const query = `SELECT * FROM db.Equipment
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
        const query = `UPDATE db.Equipment
                        SET 
                            state = '${newEquipment.state}',
                            district = '${newEquipment.district}',
                            facility = '${newEquipment.facility}',
                            category = '${newEquipment.category}',
                            equip_name = '${newEquipment.equip_name}',
                            cost = '${newEquipment.cost}',
                            department = '${newEquipment.department}',
                            manufacturer = '${newEquipment.manufacturer}',
                            model = '${newEquipment.model}',
                            price = '${newEquipment.price}',
                            installation_date = '${newEquipment.installation_date}',
                            under_warrenty = '${newEquipment.under_warrenty}',
                            functionality = '${newEquipment.functionality}',
                            status = '${newEquipment.status}',
                            return_date = '${newEquipment.return_date}',
                            borrow_date = '${newEquipment.borrow_date}'
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

    async getForecast(){
        const connection = await DBconnection();
        const query = `SELECT category,
                        SUM(CASE WHEN cluster = 3 THEN 1 ELSE 0 END) AS cluster_unhealthy_count,
                        SUM(CASE WHEN cluster = 2 OR cluster = 1 THEN 1 ELSE 0 END) AS cluster_healthy_count,
                        SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) AS available_count,
                        SUM(CASE WHEN functionality = 'Active/in use' THEN 1 ELSE 0 END) AS inuse_count,
                        SUM(CASE WHEN functionality = 'Not in use' THEN 1 ELSE 0 END) AS notinuse_count,
                        SUM(CASE WHEN functionality = 'Approved for disposal' THEN 1 ELSE 0 END) AS approve_for_disposal,
                        COUNT(*) AS totalEquipmentsCount

                        FROM db.Equipment
                        GROUP BY category;`
    
        try {
            const [clusterResult] = await connection.execute(query)
            return clusterResult
        } catch (err) {
            throw err;
        } finally {
            connection.end();
        }
    }
}

export default new EquipmentRepo();
