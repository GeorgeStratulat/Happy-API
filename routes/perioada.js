const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Perioade = require ("../schema/perioada.js");

router.get("/", (req,res)=>{
    Perioade.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); 
    })    
});

router.post("/addPerioada", (req,res) =>{
    const perioada = new Perioade({
            _id : mongoose.Types.ObjectId(),
            zile: req.body.zile,
            ora_inceput: req.body.ora_inceput,
            ora_sfarsit: req.body.ora_sfarsit  
    });

    perioada.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Perioada salvata!",
            PerioadaAdaugat: perioada
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get("/:perioadaId", (req,res) => {
    const id = req.params.perioadaId;
    Perioade.findById(id).exec().then(doc=>{
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
router.put("/:ofertaId", (req,res)=>{
    const id = req.params.ofertaId;
    Perioade.update(
        {_id:id}, {
            zile: req.body.zile,
            ora_inceput: req.body.ora_inceput,
            ora_sfarsit: req.body.ora_sfarsit  
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

router.delete("/:perioadaId", (req,res) =>{
    const id = req.params.perioadaId;
    Perioade.remove({ _id: id })
    .exec()
      .then(result => {
        res.status(200).json({
          message: "Bautura sters!"
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