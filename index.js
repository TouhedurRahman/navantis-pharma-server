const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fxqg8by.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    // Database collections
    const productsCollection = client.db('navantis_pharma_db').collection('products');
    const categoriesCollection = client.db('navantis_pharma_db').collection('categories');
    const eventsCollection = client.db('navantis_pharma_db').collection('events');
    const careersCollection = client.db('navantis_pharma_db').collection('careers');
    const queriesCollection = client.db('navantis_pharma_db').collection('queries');
    const applicationsCollection = client.db('navantis_pharma_db').collection('applications');

    //get all products api
    app.get('/products', async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    //get latest products api
    app.get('/latest-products', async (req, res) => {
      const result = await productsCollection.find().sort({ _id: -1 }).toArray();
      res.send(result);
    });

    //get all categories api
    app.get('/categories', async (req, res) => {
      const result = await categoriesCollection.find().toArray();
      res.send(result);
    });

    //get all events api
    app.get('/events', async (req, res) => {
      const result = await eventsCollection.find().toArray();
      res.send(result);
    });

    //get all careers api
    app.get('/careers', async (req, res) => {
      const result = await careersCollection.find().toArray();
      res.send(result);
    });

    // add new query api
    app.post('/queries', async (req, res) => {
      const newQuery = req.body;
      newQuery.createdAt = new Date();
      const result = await queriesCollection.insertOne(newQuery);
      res.send(result);
    });

    //get all applications api
    app.get('/applications', async (req, res) => {
      const result = await applicationsCollection.find().toArray();
      res.send(result);
    });

    // add new application api
    app.post('/applications', async (req, res) => {
      const newApplication = req.body;
      newApplication.createdAt = new Date();
      const result = await applicationsCollection.insertOne(newApplication);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send("✅ Database Successfully Connected!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});