const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
		const usersCollection = client.db('navantis_pharma_db').collection('users');
		const productsCollection = client.db('navantis_pharma_db').collection('products');
		const categoriesCollection = client.db('navantis_pharma_db').collection('categories');
		const eventsCollection = client.db('navantis_pharma_db').collection('events');
		const careersCollection = client.db('navantis_pharma_db').collection('careers');
		const queriesCollection = client.db('navantis_pharma_db').collection('queries');
		const applicationsCollection = client.db('navantis_pharma_db').collection('applications');

		// send user(s) data api
		app.post('/users', async (req, res) => {
			const user = req.body;
			const query = { email: user.email };
			const existingUser = await usersCollection.findOne(query);
			if (existingUser) {
				return res.send({ message: "User already exists" })
			}
			const result = await usersCollection.insertOne(user);
			res.send(result);
		});

		// get all user(s) api
		app.get('/users', async (req, res) => {
			const result = await usersCollection.find().toArray();
			res.send(result);
		});

		// get single user(s) api
		app.get('/user/:email', async (req, res) => {
			const email = req.params.email;
			const query = { email: email }
			const result = await usersCollection.findOne(query);
			res.send(result);
		});

		// update user's role api
		app.patch('/users/admin/:id', async (req, res) => {
			const id = req.params.id;
			const filter = { _id: new ObjectId(id) }
			const updateDoc = {
				$set: {
					role: 'admin'
				},
			};
			const result = await usersCollection.updateOne(filter, updateDoc);
			res.send(result);
		});

		// update user(s) profile api
		app.patch('/user/:email', async (req, res) => {
			const email = req.params.email;
			const filter = { email: email };
			const updatedUser = req.body;
			const options = { upsert: true };
			const updatedDoc = {
				$set: {
					...updatedUser,
				}
			}
			const result = await usersCollection.updateOne(
				filter,
				updatedDoc,
				options
			);
			res.send(result);
		});

		// delete user api
		app.delete('/user/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await usersCollection.deleteOne(query);
			res.send(result);
		});

		// add a new product api
		app.post('/products', async (req, res) => {
			const newProduct = req.body;
			newProduct.createdAt = new Date();
			const result = await productsCollection.insertOne(newProduct);
			res.send(result);
		});

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

		// update product api
		app.patch("/product/:id", async (req, res) => {
			const id = req.params.id;
			const updatedProduct = req.body;
			const filter = { _id: new ObjectId(id) };
			const options = { upsert: true };
			const updatedDoc = {
				$set: {
					...updatedProduct,
					updatedAt: new Date(),
				}
			}
			const result = await productsCollection.updateOne(
				filter,
				updatedDoc,
				options
			);
			res.send(result);
		});

		// delete product api
		app.delete('/product/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await productsCollection.deleteOne(query);
			res.send(result);
		});

		// add a new category api
		app.post('/category', async (req, res) => {
			const newCategory = req.body;
			newCategory.createdAt = new Date();
			const result = await categoriesCollection.insertOne(newCategory);
			res.send(result);
		});

		//get all categories api
		app.get('/categories', async (req, res) => {
			const result = await categoriesCollection.find().toArray();
			res.send(result);
		});

		// get all only categories api
		app.get('/only-categories', async (req, res) => {
			const result = await categoriesCollection.find().project({ category: 1 }).toArray();
			res.send(result);
		});

		// update category api
		app.patch("/category/:id", async (req, res) => {
			const id = req.params.id;
			const updatedCategory = req.body;
			const filter = { _id: new ObjectId(id) };
			const options = { upsert: true };
			const updatedDoc = {
				$set: {
					...updatedCategory,
					updatedAt: new Date(),
				}
			}
			const result = await categoriesCollection.updateOne(
				filter,
				updatedDoc,
				options
			);
			res.send(result);
		});

		// delete category api
		app.delete('/category/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await categoriesCollection.deleteOne(query);
			res.send(result);
		});

		// add a new event api
		app.post('/event', async (req, res) => {
			const newEvent = req.body;
			newEvent.createdAt = new Date();
			const result = await eventsCollection.insertOne(newEvent);
			res.send(result);
		});

		//get all events api
		app.get('/events', async (req, res) => {
			const result = await eventsCollection.find().toArray();
			res.send(result);
		});

		// update event api
		app.patch("/event/:id", async (req, res) => {
			const id = req.params.id;
			const updatedEvent = req.body;
			const filter = { _id: new ObjectId(id) };
			const options = { upsert: true };
			const updatedDoc = {
				$set: {
					...updatedEvent,
					updatedAt: new Date(),
				}
			}
			const result = await eventsCollection.updateOne(
				filter,
				updatedDoc,
				options
			);
			res.send(result);
		});

		// delete event api
		app.delete('/event/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await eventsCollection.deleteOne(query);
			res.send(result);
		});

		// add a new circular api
		app.post('/circular', async (req, res) => {
			const newCircular = req.body;
			newCircular.createdAt = new Date();
			const result = await careersCollection.insertOne(newCircular);
			res.send(result);
		});

		//get all careers api
		app.get('/careers', async (req, res) => {
			const result = await careersCollection.find().toArray();
			res.send(result);
		});

		// update career api
		app.patch("/career/:id", async (req, res) => {
			const id = req.params.id;
			const updatedCareer = req.body;
			const filter = { _id: new ObjectId(id) };
			const options = { upsert: true };
			const updatedDoc = {
				$set: {
					...updatedCareer,
					updatedAt: new Date(),
				}
			}
			const result = await careersCollection.updateOne(
				filter,
				updatedDoc,
				options
			);
			res.send(result);
		});

		// delete career api
		app.delete('/career/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await careersCollection.deleteOne(query);
			res.send(result);
		});

		// add new query api
		app.post('/queries', async (req, res) => {
			const newQuery = req.body;
			newQuery.createdAt = new Date();
			const result = await queriesCollection.insertOne(newQuery);
			res.send(result);
		});

		//get all queries api
		app.get('/queries', async (req, res) => {
			const result = await queriesCollection.find().toArray();
			res.send(result);
		});

		// delete query api
		app.delete('/query/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await queriesCollection.deleteOne(query);
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

		// delete application api
		app.delete('/application/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await applicationsCollection.deleteOne(query);
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