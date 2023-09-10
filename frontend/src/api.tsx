import axios from 'axios';
import { MedicalItem } from '../shared/models'

export function createRecord(data: object) {
    const result: Record<string, string> = {}
    Object.entries(data).forEach(([k, v]) => {
        result[k] = String(v);
    })
    return result;
}

export function createMedicalItem(data: Record<string, string>): MedicalItem {
    const result: MedicalItem = {
        serial_number: data.serial_number,
        equip_name: data.equip_name,
        state: data.state,
        dateOfInstallation: data.dateOfInstallation,
        status: data.status,
        functionality: data.functionality,
        category: data.category,
        cost: parseInt(data.cost, 0),
        under_warrenty: Boolean(data.under_warrenty)
    }
    return result;
}

export async function fetchMedicalItems() {
    try {
        const { data, status } = await axios.get<MedicalItem[]>('http://localhost:8000.com/medical-items');
        console.log('Fetch Medical Items Status: ' , status);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
        } else {
          console.log('unexpected error: ', error);
        }
        return [];
    }
   
}

export async function addMedicalItem(item: MedicalItem) {
    try {
        const { data , status } = await axios.post('http://localhost:8000.com/item/add', { item });
        console.log('Add Medical Items Status: ' , status);

    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
        } else {
          console.log('unexpected error: ', error);
        }
    }
}

export async function deleteMedicalItem(idValue: string) {
    try {
        const { data , status } = await axios.post('http://localhost:8000.com/item/delete', { serial_number: idValue } );
        console.log('Delete Medical Items Status: ' , status);

    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
        } else {
          console.log('unexpected error: ', error);
        }
    }
}