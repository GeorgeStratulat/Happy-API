const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const BauturaComandata = require ("../schema/bautura_comandata");
const Users = require("../schema/users")

router.get("/", (req,res)=>{
    
      BauturaComandata.find().exec().then(docs=>{
          console.log(docs);
          res.status(200).json(docs);
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        }); 
      })    
    });

router.post("/addComanda", (req, res) =>{
    const comanda = new BauturaComandata({
        _id: new mongoose.Types.ObjectId(),
        id_bautura: req.body.id_bautura,
        id_user: req.body.id_user,
        imagine_bautura: req.body.imagine_bautura,
        nume_bautura: req.body.nume_bautura
        
    });
    console.log(comanda);
    
    comanda.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Comanda salvat!",
            ComandaAdaugata: comanda
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

    Users.update({_id: req.body.id_user}, {$push:{
        lista_bauturi: req.body.id_bautura
    }}).exec().then(result => {
        console.log(result);
        
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    
});

router.get("/:abonamentId", (req,res) => {
    const id = req.params.abonamentId;
    BauturaComandata.findById(id).exec().then(doc=>{
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

// router.patch("/:abonamentId", (req,res)=>{
//     const id = req.params.abonamentId;
//     Abonamente.update({_id:id}, {$set:{
//         numar_bauturi: req.body.numar_bauturi,
//         numar_bauturi_zilnic: req.body.numar_bauturi_zilnic
//     }
//     })
//     .exec()
//     .then(result => {
//       console.log(result);
//       res.status(200).json({
//         message: "Employee Updated!"
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

router.delete("/:abonamentId", (req,res) =>{
    const id = req.params.abonamentId;
    BauturaComandata.remove({ _id: id })
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