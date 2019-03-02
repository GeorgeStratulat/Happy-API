const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Admin_Venues = require ("../schema/admin_venue.js");

router.get("/", (req,res)=>{
    Admin_Venues.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); 
    })    
});

router.post("/login", (req,res) =>{
    const admin_venue = new Admin_Venues({
        username: req.body.username,
        password: req.body.password
    });
    Admin_Venues.findOne({"username": admin_venue.username, "password": admin_venue.password}).exec().then(doc=>{
        
        var id = doc._id;
       res.send({"success":true, "message":id });
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ message: "Can't find shit"});
      });
    ;
});

module.exports = router;