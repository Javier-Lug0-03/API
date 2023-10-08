const {db} = require('../config/config')

module.exports = {
    getAll: async (req,res) => {
        try{
            const snapshot = await db.collection('Parking_Lots').get();
            const documents = [];
            snapshot.forEach((doc) =>{
                documents.push({id:doc.id,data:doc.data()})
            })
            if(snapshot.empty){
                res.status(404).send({message:"no entries"})
            }else{
                res.status(200).send(documents);
            }
        }catch(error){
            res.status(500).send({message:error.message})
        }
    },
    getAvailable: async(req,res) =>{
        try{
            const snapshot = await db.collection('Parking_Lots').where('Full', '==', false).get();
            const documents = [];
            snapshot.forEach((doc) =>{
                documents.push({id:doc.id,data:doc.data()})
            })
            if(snapshot.empty){
                res.status(404).send({message:"No available parking right now"})
            }else{
                res.status(200).send(documents)
            }
        }catch(error){
            res.status(500).send({message: error.message})
        }
    },
    toggleState: async(req,res) =>{
        try{
            const Lot = req.body.lot
            const snapshot = await db.collection('Parking_Lots').doc(Lot).update({Full:req.body.status});
            res.status(200).send({message:"Status toggled"});
        }catch(error){
            res.status(500).send({message:error.message})
        }
    }
}