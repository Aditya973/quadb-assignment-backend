const express = require('express');
const Ticker = require('../models/ticker');


const router = express.Router();

router.post('/tickers',async(req,res)=>{
    try {
        const ticker = await Ticker.create(req.body);
        return res.status(201).json({
            data: ticker,
            success: true
        })
    } catch (error) {
        console.log('something went wrong',error);
        return res.status(500).json({
            data:{},
            success: false,
        })
    }
})

router.get('/tickers/:id',async(req,res)=>{
    try {
        const ticker = await Ticker.findById(req.params.id);
        return res.status(200).json({
            data: ticker,
            success: true
        })
    } catch (error) {
        console.log('something went wrong',error);
        return res.status(500).json({
            data:{},
            success: false,
        })
    }
})

router.delete('/tickers/:id',async(req,res)=>{
    try {
        const ticker = await Ticker.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            data: ticker,
            success: true
        })
    } catch (error) {
        console.log('something went wrong',error);
        return res.status(500).json({
            data:{},
            success: false,
        })
    }
})

router.patch('/tickers/:id',async(req,res)=>{
    try {
        const ticker = await Ticker.findByIdAndUpdate(id,data,{new:true});
        return res.status(200).json({
            data: ticker,
            success: true
        })
    } catch (error) {
        console.log('something went wrong',error);
        return res.status(500).json({
            data:{},
            success: false,
        })
    }
})

router.get('/tickers',async(req,res)=>{
    try {
        const ticker = await Ticker.find({});
        return res.status(200).json({
            data: ticker,
            success: true
        })
    } catch (error) {
        console.log('something went wrong',error);
        return res.status(500).json({
            data:{},
            success: false,
        })
    }
})

module.exports = router;