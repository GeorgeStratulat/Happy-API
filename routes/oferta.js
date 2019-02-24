const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Oferte = require ("../schema/oferta.js");
const Venues = require ("../schema/venue.js");
const Perioada = require("../schema/perioada.js");

router.get("/", (req,res)=>{
    Oferte.find().exec().then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); 
    })    
});

router.post("/:venueId/addOferta", (req,res) =>{
    const perioada = new Perioada({
        _id: mongoose.Types.ObjectId(),
        ora_inceput: req.body.ora_inceput,
        ora_sfarsit: req.body.ora_sfarsit,
        zile: req.body.zile
    })
    perioada.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Perioada salvata!",
            PerioadaAdaugata: perioada
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:"De aici 1"
        });
    });

    const oferta = new Oferte({
            _id : mongoose.Types.ObjectId(),
            nume: req.body.nume,
            locatie_id: req.body.locatie_id,
            numar_bauturi: req.body.numar_bauturi,
            bautura_id: req.body.bautura_id,
            tip_oferta: req.body.tip_oferta,
            perioada: perioada._id
    });

    oferta.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Oferta salvata!",
            OfertaAdaugat: oferta
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:"De aici 2"
        });
    });

    Venues.update(
        {_id:req.body.locatie_id}, {$push:{
        oferte: oferta._id
    }}
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
        error: req.body.bautura_id
      });
    });
});

router.get("/:ofertaId", (req,res) => {
    const id = req.params.ofertaId;
    Oferte.findById(id).exec().then(doc=>{
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
    Oferte.update(
        {_id:id}, {
            nume: req.body.nume,
            locatie_id: req.body.locatie_id,
            numar_bauturi: req.body.numar_bauturi,
            bautura_id: req.body.bautura_id,
            tip_oferta: req.body.tip_oferta,
            perioada: req.body.perioada
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

router.delete("/:ofertaId", (req,res) =>{
    const id = req.params.ofertaId;
    Oferte.remove({ _id: id })
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