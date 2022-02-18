const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
	'mongodb+srv://user1:Ig8dNZxMx1ZbwBOT@cluster0.kyofh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
async function run() {
	try {
		// Connect the client to the server
		await client.connect();
		// Establish and verify connection
		const database = client.db('BIJOU_DB');
		const specialPackageCollection = database.collection('specialPackage');
		const packagesCollection = database.collection('packages');
		console.log('Connected successfully to Database');

		//Get API specialPackage
		app.get('/specialPackage', async (req, res) => {
			const cursor = specialPackageCollection.find({});
			const specialPackage = await cursor.toArray();
			res.send(specialPackage);
		});

		//POST api for special packages
		app.post('/specialPackage', async (req, res) => {
			const newUser = req.body;
			const result = await specialPackageCollection.insertOne(newUser);
			console.log('hitting the post', req.body);
			res.json(result);
		});

		// Get single service special packages
		app.get('/specialPackage/:id', async (req, res) => {
			const id = req.params.id;
			// console.log('Getting specific service', id);
			const query = { _id: ObjectId(id) };
			const packages = await specialPackageCollection.findOne(query);
			res.json(packages);
		});

		//Get API Package
		app.get('/package', async (req, res) => {
			const cursor = packagesCollection.find({});
			const package = await cursor.toArray();
			res.send(package);
		});

		//POST api for special packages
		app.post('/package', async (req, res) => {
			const newUser = req.body;
			const result = await packagesCollection.insertOne(newUser);
			console.log('hitting the post', req.body);
			res.json(result);
		});

		// Get single service special packages
		app.get('/package/:id', async (req, res) => {
			const id = req.params.id;
			// console.log('Getting specific service', id);
			const query = { _id: ObjectId(id) };
			const packages = await packagesCollection.findOne(query);
			res.json(packages);
		});
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('Running my Tourism Server');
});
app.listen(port, () => {
	console.log('Running Server on port', port);
});
