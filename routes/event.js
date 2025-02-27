
const eventModel = require('../models/eventDetails');
require('dotenv').config();


const events = async (req,res)=>{
    try {
      const events = await eventModel.find({});
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const findEvent=async(req,res)=>{
  try{
    const event=req.body.id;
    const eventDetails=await eventModel.find({id: event});
    res.status(200).json(eventDetails[0]);
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}  

module.exports={events,findEvent}; 