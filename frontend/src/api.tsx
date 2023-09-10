export interface MedicalItemData extends Record<string, string> {
    ID: string,
    Category: string,
}

type MedicalItemHeaders = keyof MedicalItemData;
