import axios from 'axios';
import { Activity, Forecast, MedicalItem, Statistics } from '../../shared/models';

export function createRecord<T extends object>(data: T, prettyPropNames: Record<keyof T, string>) {
    const result: Record<string, string> = {};
    Object.entries(data).forEach(([k, v]) => {
        if (k in prettyPropNames) {
            result[prettyPropNames[k as keyof T]] = String(v);
        }
    });
    return result;
}

export async function fetchMedicalItems() {
    try {
        const { data, status } = await axios.get<MedicalItem[]>('http://localhost:8000/medical-items');
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

export async function fetchActivities() {
  try {
      const { data, status } = await axios.get<Activity[]>('http://localhost:8000/activities');
      console.log('Fetch Activities Status: ' , status);
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

export async function addItem<T extends object>(item: T) {
    try {
        console.log(item)
        const { data , status } = await axios.post('http://localhost:8000/item/add', { data: item } );
        console.log('Add Medical Items Status: ' , status);

    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
        } else {
          console.log('unexpected error: ', error);
        }
    }
}

export async function editItem<T extends object>(item: T) {
    try {
        const { data , status } = await axios.post('http://localhost:8000/item/edit', { data: item });
        console.log('Edit Medical Items Status: ' , status);

    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
        } else {
          console.log('unexpected error: ', error);
        }
    }
}

export async function deleteItem(idValue: string) {
    try {
        const { data , status } = await axios.post('http://localhost:8000/item/delete', { data: { serial_number: idValue } } );
        console.log('Delete Medical Items Status: ' , status);

    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
        } else {
          console.log('unexpected error: ', error);
        }
    }
}

export async function fetchForecast(): Promise<Forecast[]> {
    try {
        const { data, status } = await axios.get<Forecast[]>('http://localhost:8000/forecast');
        console.log('Fetch Forecast Status: ' , status);
        console.log(data);

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

export async function fetchStatistics(): Promise<Statistics | undefined> {
    try {
        const { data, status } = await axios.get<Statistics>('http://localhost:8000/statistics');
        console.log('Fetch Stats Status: ' , status);

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
        } else {
          console.log('unexpected error: ', error);
        }
        return undefined;
    }
}
