import app from './src/app';
import dbConnection  from './src/db/index';
import dotenv from 'dotenv'
dotenv.config()

async function main(){
    const db = await dbConnection()
    app.listen(app.get('port'), () => {
        console.log(`server on port`, app.get('port'))
    })
}

main();