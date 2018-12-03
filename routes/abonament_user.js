const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Abonament_Users= require ("../schema/abonament_user.js");
const Abonamente = require("../schema/abonamente.js");

router.get("/", (req,res)=>{
    Abonament_Users.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); 
    })    
});

router.post("/addAbonament_User", (req,res) =>{
    Abonamente.find({"_id":req.body.tip_abonament}, function(err, obiect){
    const abonament_user = new Abonament_Users({
        _id : mongoose.Types.ObjectId(),
        user_id: req.body.user_id,
    data_inceput: Date.now(),
    data_sfarsit: Date.now()  ,
    tip_abonament: req.body.tip_abonament
    });

    console.log(obiect[0].numar_luni) ;
    
      var numar_luni = obiect[0].numar_luni;

    abonament_user.data_sfarsit.setMonth(abonament_user.data_sfarsit.getMonth() + numar_luni);
    abonament_user.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Abonament salvat!",
            AbonamentAdaugat: abonament_user
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
})
});

router.get("/:abonament_UserId", (req,res) => {
    const id = req.params.abonament_UserId;
    Abonament_Users.findById(id).exec().then(doc=>{
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
router.patch("/:abonament_UserId", (req,res)=>{
    const id = req.params.abonament_UserId;
    Abonament_Users.update({_id:id}, {$set:{
        data_inceput: req.body.data_inceput,
        data_sfarsit: req.body.data_sfarsit,
        tip_abonament: req.body.tip_abonament
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

router.delete("/:abonament_UserId", (req,res) =>{
    const id = req.params.abonament_UserId;
    Abonament_Users.remove({ _id: id })
    .exec()
      .then(result => {
        res.status(200).json({
          message: "Abonament sters!"
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