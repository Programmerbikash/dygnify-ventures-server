const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ik3p7tj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri);

async function run() {
    try {
        const personalInfoCollection = client.db("dygnifyVentures").collection("personalInfo");
        const businessInfoCollection = client.db("dygnifyVentures").collection("businessInfo");
        const loanInfoCollection = client.db("dygnifyVentures").collection("loanInfo");
        
        app.get('/info', async (req, res) => {
            const query = {};
            const result = await personalInfoCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/business', async (req, res) => {
            const query = {};
            const result = await businessInfoCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/loan', async (req, res) => {
            const query = {};
            const result = await loanInfoCollection.find(query).toArray();
            res.send(result);
        })
        app.post('/info', async (req, res) => {
            const redInfo = req.body;
            // console.log(redInfo);
            const result = await personalInfoCollection.insertOne(redInfo);
            res.send(result);
        })
        app.post('/business', async (req, res) => {
            const redInfo = req.body;
            // console.log(redInfo);
            const result = await businessInfoCollection.insertOne(redInfo);
            res.send(result);
        })
        app.post('/loan', async (req, res) => {
            const redInfo = req.body;
            // console.log(redInfo);
            const result = await loanInfoCollection.insertOne(redInfo);
            res.send(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send('red positive server is running');
})

app.listen(port, () => console.log(`red positive running on ${port}`))