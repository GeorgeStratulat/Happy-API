const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Venues = require ("../schema/venue.js");
const Bauturi = require ("../schema/bautura.js");

router.get("/", (req,res)=>{
    Venues.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); 
    })    
});

router.post("/addVenue", (req,res) =>{
    const venue = new Venues({
        _id : mongoose.Types.ObjectId(),
        nume: req.body.nume,
    locatie: req.body.locatie,
    bauturi: req.body.bauturi,
    imagine: req.body.imagine,
    detalii: req.body.detalii
    });

    venue.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Venue salvat!",
            VenueAdaugat: venue
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get("/:venueId", (req,res) => {
    const id = req.params.venueId;
    Venues.findById(id).exec().then(doc=>{
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

router.get("/:venueId/bautura", (req,res) => {
  const id = req.params.venueId;
  Venues.findById(id).exec().then(doc=>{
      console.log("From database ", doc.bauturi);
        Bauturi.find({"_id":doc.bauturi}, function(err, bautura){
         res.status(200).json(bautura);
        })
        //  console.log(listabauturi);
      
    })
    .catch(err => {
      console.log("nu merge /getID");
      // res.status(500).json({ error: err });
    });
  
});


router.put("/:venueId", (req,res)=>{
    const id = req.params.venueId;
    Venues.update({_id:id}, {$set:{
        nume: req.body.nume,
    locatie: req.body.locatie,
    bauturi: req.body.bauturi,
    imagine: req.body.imagine,
    detalii: req.body.detalii
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

router.patch("/:venueId/locatie/:venueLocatie", (req,res)=>{
    const id = req.params.venueId;
    const locatieSchimbata = req.params.venueLocatie;
    Venues.update({_id:id}, {$set:{
        locatie: locatieSchimbata
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

router.patch("/:venueId/descriere/:venueDescriere", (req,res)=>{
    const id = req.params.venueId;
    const descriereSchimbata = req.params.venueDescriere;
    Venues.update({_id:id}, {$set:{
        detalii: descriereSchimbata
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

router.delete("/:venueId", (req,res) =>{
    const id = req.params.venueId;
    Venues.remove({ _id: id })
    .exec()
      .then(result => {
        res.status(200).json({
          message: "Venue sters!"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

router.post("/:venueId/:bauturaId", (req, res) =>{
    const idv = req.params.venueId;
    const idb = req.params.bauturaId;
    
    Bauturi.findById(idb).exec().then(doc=>{
        // console.log("From database ", doc);
        const bautura = doc;
        console.log(bautura);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: "No drink found"});
        }
    }).catch(err=>{console.log(err); res.status.json({error: err})})
    
    Venue.update(
        {_id:id}, {
        bauturi: bautura._id
    }
    )
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