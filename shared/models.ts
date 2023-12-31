export interface MedicalItem {
    serial_number: string; // Primary key
    equip_name: string;
    state: string;
    installation_date: string;
    status: string;
    functionality: string;
    category: string;
    cost: number;
    under_warrenty: boolean;
}

export interface Activity {
    serial_number: string; // Primary key
    state: string;
    equip_name: string;
    borrow_date: string;
    return_date: string;
    status: string;
}

export interface Forecast {
    category: string; // Primary key
    quantity: string;
    in_use: string;
    available: string;
    unhealthy: string;
    forecast: string;
}

export interface Statistics {
    totalUnhealthy: string;
    healthyPercentage: string;
    totalUnAvailable: string;
    totalAvailable: string;
}
