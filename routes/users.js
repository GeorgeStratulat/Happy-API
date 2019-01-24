const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = require ("../schema/users.js");
const Abonamente = require("../schema/abonamente.js");
const Bautura_Comandata = require("../schema/bautura_comandata.js");

router.get("/", (req,res)=>{
    Users.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); 
    })    
});

router.get("/:userId/bautura_comandata", (req,res) => {
    const id = req.params.userId;
    Users.findById(id).exec().then(doc=>{
        console.log("From database ", doc);
          Bautura_Comandata.find({"id_user":doc._id}, function(err, bautura){
           res.status(200).json(bautura);
          })
          //  console.log(listabauturi);
        
      })
      .catch(err => {
        console.log("nu merge /getID");
        // res.status(500).json({ error: err });
      });
    
  });

router.post("/login", (req,res) =>{
    const user = new Users({
        email: req.body.email,
        parola: req.body.parola
    });
    Users.findOne({"email": user.email}).exec().then(doc=>{
        
        var id = doc._id;
       res.send({"success":true, "message":id });
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ message: "Can't find shit"});
      });
    ;
});

router.post("/addUser", (req,res) =>{
    const user = new Users({
        _id : mongoose.Types.ObjectId(),
        prenume: req.body.prenume,
        nume: req.body.nume,
        data_nastere: req.body.data_nastere,
        email: req.body.email,
        tip_abonament: "",
        bautura_zi: false,
        lista_bauturi: [],
        parola:req.body.parola
    });

    user.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"User salvat!",
            UserAdaugat: user
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get("/:userId", (req,res) => {
    const id = req.params.userId;
    Users.findById(id).exec().then(doc=>{
        console.log("From database ", doc);
        if(doc){
            res.status(200).json(doc);
        } else{
            res.status(404).json({ message: "No employee found with specified id" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    
});

router.patch("/:userId/addBautura/:bauturaId", (req,res)=>{
    const uid = req.params.userId;
    const bid = req.params.bauturaId;
    Users.update({_id: uid}, {$push:{
        lista_bauturi: bid
    }}).exec().then(result => {
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

router.patch("/:userId/deleteBautura/:bauturaId", (req,res)=>{
  const uid = req.params.userId;
  const bid = req.params.bauturaId;
  Users.update({_id: uid}, {$pull:{
      lista_bauturi: bid
  }}).exec().then(result => {
      console.log(result);
      res.status(200).json({
        message: "Employee Updated! Drink deleted: " + bid
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});

router.patch("/:userId", (req,res)=>{
    const id = req.params.userId;
    Abonamente.update({_id:id}, {$set:{
        prenume: req.body.prenume,
        nume: req.body.nume,
        data_dastere: req.body.data_dastere,
        email: req.body.email,
        tip_abonament: req.body.tip_abonament,
        bautura_zi: req.body.bautura_zi,
        lista_bauturi: req.body.lista_bauturi,
        parola:req.body.parola
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

router.patch("/:userId/tip_abonament", (req,res)=>{
    const id = req.params.userId;
    Users.update({_id:id}, {$set:{
        tip_abonament: req.body.tip_abonament,
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

router.delete("/:userId", (req,res) =>{
    const id = req.params.userId;
    Users.remove({ _id: id })
    .exec()
      .then(result => {
        res.status(200).json({
          message: "User sters!"
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