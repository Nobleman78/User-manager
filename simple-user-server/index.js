const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

/*------MiddleWar------*/
app.use(express.json());


//AM06Tc5J7N33hfm3
//Jesmin


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Jesmin:AM06Tc5J7N33hfm3@cluster0.oyt4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const database = client.db("usersDB");
        const userCollection = database.collection("users");

        /*--------------Get All Users---------------*/
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        /*--------Get Specific User-------- */
        app.get('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id) }
            const result = await userCollection.findOne(query)
            res.send(result);
        })

        /*--------------Create New User-------------*/
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('New User', user)
            const result = await userCollection.insertOne(user);
            res.send(result)


        })
        /*----------Update an User Information------*/
        app.put('/users/:id',async(req,res)=>{
            const id = req.params.id;
            const updatedUserInfo = req.body;
            console.log(updatedUserInfo);
            const query = {_id: new ObjectId(id)}
            const options = {upsert:true}
            const updatedUser = {
                $set: {
                    name: updatedUserInfo.name,
                    email:updatedUserInfo.email
                }
            }
            const result = await userCollection.updateOne(query,updatedUser,options)
            res.send(result);

        })

        /*----------Delete an User-----------*/
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('Delete from database', id)
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        /*----Send a ping to confirm a successful connection--------*/
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {
        /*-----Ensures that the client will close when you finish/error-----*/
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('SIMPLE CRUD SERVER');
})
app.listen(port, () => {
    console.log(`Simple CRUD Server is running on port ${port}`)
})


