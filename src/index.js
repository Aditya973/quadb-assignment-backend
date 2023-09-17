const express = require('express');
const {PORT} = require('./config/serverConfig');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const connect = require('./config/database');
const apiRoutes = require('./routes/index');
const Ticker = require('./models/ticker');
const axios = require('axios');

const setupAndCreateServer = async ()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cors());
    app.get('/',async (req,res)=>{
        await Ticker.deleteMany({});
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const data = response.data;
        let updatedData = [];
        for(const [key,value] of Object.entries(data)){
            if(updatedData.length === 10){
                break;
            }
            updatedData.push(value);
        }
        console.log(updatedData);
        await Ticker.insertMany(updatedData);
        res.status(200).json({
            message: 'app is running....'
        })
    })
    app.use('/api',apiRoutes);
    
    await connect();
    console.log('mongodb connected');
    app.listen(PORT,async ()=>{
        console.log('server listening to port',PORT);
    })
}

setupAndCreateServer();