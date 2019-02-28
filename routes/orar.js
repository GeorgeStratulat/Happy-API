const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Venues = require ("../schema/venue.js");
const Orare = require("../schema/orar.js");

router.get("/", (req,res)=>{
    Orare.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); 
    })    
});

router.get("/:orarId", (req,res) => {
    const id = req.params.orarId;
    Orare.findById(id).exec().then(doc=>{
        console.log("From database ", doc);
        if(doc){
            res.status(200).json(doc);
        } else{
            res.status(404).json({ message: "No employee found with specified id" });
        }
      })
      .catch(err => {
        console.log("nu merge /getID");
        res.status(500).json({ error: err });
      });
    
});

router.get("/venue/:venueId", (req,res) => {
    const id = req.params.venueId;
    Orare.find({"venue":id}).exec().then(doc=>{
        console.log("From database ", doc);
        if(doc){
            res.status(200).json(doc);
        } else{
            res.status(404).json({ message: "No employee found with specified id" });
        }
      })
      .catch(err => {
        console.log("nu merge /getID");
        res.status(500).json({ error: err });
      });
    
});

router.post("/addOrar", (req,res) =>{
    const orar = new Orare({
        _id : mongoose.Types.ObjectId(),
        venue: req.body.venue,
        luni: req.body.luni,
        marti: req.body.marti,
        miercuri: req.body.miercuri,
        joi: req.body.joi,
        vineri: req.body.vineri,
        sambata: req.body.sambata,
        duminica: req.body.duminica
    });

    orar.save().then(result=>{
      console.log(result);
      res.status(201).json({
          message:"Orar salvat!",
          orarAdaugat: orar
      });
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({
          error:err
      });
  });
});


router.patch("/:venueId", (req,res)=>{
    const id = req.params.venueId;
    Orare.update({venue:id}, {$set:{
      luni: req.body.luni,
      marti: req.body.marti,
      miercuri: req.body.miercuri,
      joi: req.body.joi,
      vineri: req.body.vineri,
      sambata: req.body.sambata,
      duminica: req.body.duminica
  }
  })
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Employee Updated!"
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
  
  });

  module.exports = router;