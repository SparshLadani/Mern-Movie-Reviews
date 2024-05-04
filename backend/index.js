import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'


async function main(){
    dotenv.config() //Load all the environmental variables

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    ) // Create an instance of MongoClient and pass in the database URI.
    const port = process.env.PORT||8000

    try{
        await client.connect()
        await MoviesDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)

        app.listen(port, ()=>{
            console.log('server is running on port:' + port);
        })
    } // Try to connect hte client.connect to connect the database
    //This further returns a promise. We also use await over here
    //to block further execution until that operation is completed
    /*
    app.listen starts the server and listens via specified port.The callback
    function provided in the 2nd 
    argument is executed when the server startslistening
    */
    catch (e){
        console.error(e);
        process.exit(1)
    }
}

main().catch(console.error); 
//With the main() function implemented, we then 
//call it and send any errors to the console.
