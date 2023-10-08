const {db} = require('../config/config')

module.exports = {
    getAllInParking: async (req,res) =>{
        try{
            const ParkingLot = req.body.lot;
            const snapshot = await db.collection('Parking_spots').where('lot', '==',ParkingLot).get();
            const documents = []
            snapshot.forEach((doc) =>{
                documents.push({id:doc.id,data: doc.data()})
            })
            if(snapshot.empty){
                res.status(404).send({message: "no parking lot found under that ID"})
            }else{
                res.status(200).send(documents);
            }
        }catch(error){
            res.status(500).send({error: error.message})
        }
    },
    addSpot: async (req,res) =>{
        try{
            const snapshot = await db.collection('Parking_spots').get()
            count = 0;
            snapshot.forEach((doc) =>{
                count++;
            })
            if(snapshot.empty){
                console.log(count);
            }
            const newDoc = db.collection('Parking_spots').doc((count + 1).toString());
            await newDoc.set(req.body);

            res.status(200).send({message: "Parking spot added correctly"});

        }catch(error){
            res.status(500).send({message: error.message});
        }
    },
    updateSpot: async (req,res) =>{
        try{
            const spot = req.body.id
            const snapshot = db.collection('Parking_spots').doc(spot).update({status:req.body.status})
            res.status(200).send({message:"status toggled"});
        }catch(error){
            res.status(200).send({message: error.message});
        }
    },
    getStatus: async (req,res) =>{
        try{
            const spot = req.body.id
            const snapshot = await db.collection('Parking_spots').doc(spot).get();
            const status = snapshot.data().status;
            res.status(200).send({status: status});
        }catch(error){
            res.status(500).send({message: error.message})
        }
    }
};