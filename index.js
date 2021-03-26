const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


const uri = "mongodb+srv://firstproject:arfin123@cluster0.r5j5a.mongodb.net/firstproject?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

client.connect(err => {
    const productCollection = client.db("firstproject").collection("product");
    //get 
    app.get('/products', (req, res) => {
            productCollection.find({})
                .toArray((err, document) => {
                    res.send(document);
                })
        })
        //single product update
    app.get('/product/:id', (req, res) => {
            productCollection.find({ _id: ObjectId(req.params.id) })
                .toArray((err, documents) => {
                    res.send(documents[0]);
                })
        })
        //Post
    app.post("/addProduct", (req, res) => {
            const product = req.body;
            console.log(product);
            productCollection.insertOne(product)
                .then(result => {
                    console.log('data added suceessfully.');
                    res.send('successful');
                })
        })
        //Delete
    app.delete("/delete/:id", (req, res) => {
        console.log("id: ", req.params.id);
        productCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                console.log('getID', result);
            })
    })









    // const collection = client.db("firstproject").collection("product");
    // const product = { name: "Apple", price: 35, quantity: 20 };
    // collection.insertOne(product)
    //     .then(result => {
    //         console.log('one product added')
    //     })
    // console.log('database Connected successfully');

});



app.listen(3000)