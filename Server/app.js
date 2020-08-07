const express = require('express');
const app = express();
const port = process.env.port;
const cors = require('cors');
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongo.MongoClient;
//const url = "mongodb://localhost:27017";
const data = require('./APIData')
const url = "mongodb+srv://ronakkela:jalsakaro@cluster0-poga4.mongodb.net/zomato?retryWrites=true&w=majority"
let db;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/users', (req, res) => {
//  db.collection('city').find({}).toArray((err, result) => {
//        if (err) throw err;
//       res.send(result)
//    })
//  });

app.get('/citylist', (req, res) => {
    db.collection('cities').find({}).toArray((err, result) => {
        if (err) throw err;
        res.send({ type: "citylist", citylist: result })

    })
});

app.get('/restaurant', (req, res) => {
    const PAGE_SIZE = 3
    const query_db = {}
    
    if(!!req.query.city) query_db.city_code = Number(req.query.city)
    if(!!req.query.area) query_db.area_code = Number(req.query.area)
    if(!!req.query.cuisine){
        if( req.query.cuisine instanceof Array ) req.query.cuisine = req.query.cuisine.map(v => Number(v))
        else req.query.cuisine = [Number(req.query.cuisine)]
        query_db.cuisines = {$in: req.query.cuisine }
    }
    if(!!req.query.mealtype){
        if( req.query.mealtype instanceof Array ) req.query.mealtype = req.query.mealtype.map(v => Number(v))
        else req.query.mealtype = [Number(req.query.mealtype)]
        query_db.mealtypes = {$all: req.query.mealtype }
    }

    const cost = !req.query.cost ?  0 : Number(req.query.cost)
    
    if(cost === 1) query_db.costfortwo = {$lt: 500}
    else if(cost === 2) query_db.costfortwo = {$gte: 500, $lt: 1000}
    else if(cost === 3) query_db.costfortwo = {$gte: 1000, $lt: 1500}
    else if(cost === 4) query_db.costfortwo = {$gte: 1500, $lt: 2000}
    else if(cost === 5) query_db.costfortwo = {$gte: 2000}


    const page = !req.query.page ? 0 : Number(req.query.page)-1

    const pageStart = page * PAGE_SIZE
    const pageEnd = pageStart + PAGE_SIZE
   
    const sortingOrder = !req.query.sort ? 1 : Number(req.query.sort)


    db.collection('restaurants').find(query_db).sort({costfortwo: sortingOrder}).toArray((err, result) =>{
        if (err) throw err;

        res.send({type:"restaurant", itemCount:   result.length, result: result.slice(pageStart, pageEnd)})
    })
   
});


app.get('/restaurant/:id', (req, res) => {
    var id = req.params.id
     
    db.collection('restaurants').findOne({_id: mongo.ObjectId(id)}, (err, result)=> {
        if(err) throw err;
        res.send({
            type: "restaurant",
            restaurant: result
        })
    })
});

app.get('/cuisine', (req, res) => {
    db.collection('cuisines').find({}).toArray((err, result) => {
        if (err) throw err;
        res.send({ type: "cuisine", cuisines: result })
    })
});

app.get('/mealtype', (req, res) => {
    db.collection('mealtypes').find().toArray((err, result) => {
        if (err) throw err;
        res.send({ type: "mealtype", mealtypes: result })
        
    })
});
                                                                                                            

MongoClient.connect(url, (err, client) => {
    if (err) console.log('error while connecting');
    console.log("Connected to  : ", url)
    db = client.db('zomato');
    app.listen(port, (err) => {
        console.log(`Server is running on port ${port}`)
    })
});
