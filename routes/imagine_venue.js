const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Venues = require ("../schema/venue.js");
const Bauturi = require ("../schema/bautura.js");
const Imagine_Venues = require("../schema/imagine_venue.js");

router.get("/", (req,res)=>{
    Imagine_Venues.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); 
    })    
});

router.patch("/:imagineId/ordoneaza", (req,res)=>{
    const id = req.params.imagineId;
    Imagine_Venues.update({_id:id}, {$set:{
        order: req.body.order
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