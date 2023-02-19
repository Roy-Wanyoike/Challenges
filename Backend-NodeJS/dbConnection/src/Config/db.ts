import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env')
}
)
import mssql from 'mssql'
const sqlConfig = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PWD as string,
    database: process.env.DB_NAME as string ,
    server: '172.17.0.1',
    pool: {
        max: 10,
        min: 0,
         idleTimeoutMillis: 30000
         },
          options: {
            encrypt: false, // for azure
            trustServerCertificate: false // change to true for local dev / self-signed certs
        }}
        console.log('Running');
        let checkConnection = async ()=> {
            try {
                const x= await mssql.connect(sqlConfig)
                if(x.connected){
                     console.log("Connected to the Database");
                    }
                } catch (error) {
                     console.log(error);
                     }
                    }
                     checkConnection()