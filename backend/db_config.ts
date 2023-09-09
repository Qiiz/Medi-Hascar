interface DB {
    HOST: string,
    USER: string,
    PASSWORD: string,
    DB: string,
    PORT: number
}

// Edit your db configuration here
const DB_info: DB = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "db",
    PORT: 3306
};

export default DB_info