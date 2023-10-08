const {db} = require('../config/config')

module.exports = {
    createNew: async(req, res) =>{
        try{
            const snapshot = await db.collection('Users').add(req.body);
            res.status(200).send({message:"User registered correctly"})
        }catch(error){
            res.status(500).send({message:error.message})
        }
    },
    login: async(req,res) =>{
        try{
            const email = req.body.email
            const snapshot = await db.collection('Users').where('email', '==', email).get()
            const documents = []
            snapshot.forEach((doc) =>{
                documents.push(doc.data())
            })
            if(snapshot.empty){
                res.status(404).send({message:"Not found"});
            }else{
                res.status(200).send(documents[0].password);
            }
        }catch(error){
            res.status(500).send({message:error.message})
        }
    }
}