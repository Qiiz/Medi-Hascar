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
    save(equipment: Equipments): Promise<void> {
        throw new Error('Method not implemented.');
    }
    retrieveAll(searchParams: { serial_number?: string | undefined; }): Promise<Equipments[]> {
        throw new Error('Method not implemented.');
    }
    retrieveSingle(searchParams: { serial_number?: string | undefined; }): Promise<Equipments[]> {
        throw new Error('Method not implemented.');
    }
    updateItem(oldEquipment: Equipments, newEquipment: Equipments): Promise<void> {
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
