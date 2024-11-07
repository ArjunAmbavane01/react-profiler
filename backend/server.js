import express from 'express'
import User from './User.js'
import mongoose from 'mongoose'
import cors from 'cors'


const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/Profiler');
    console.log("Connected to mongoDB");
}
connectDB();
const app = express();
app.use(cors());
app.use(express.json());    

app.get('/contacts', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            type: "success",
            users
        })
    } catch (e) {
        res.status(500).json({
            type: "error",
            message: "Some error occurred",
            error: e.message
        })
    }
});

app.post('/contacts', async (req, res) => {
    try {
        const { firstname,lastName, linkedinUrl, avatarUrl,description } = req.body;
        const userName = firstname + " " + lastName
        await User.create({
            userName,
            linkedinUrl,
            avatarUrl,
            description
        })
        return res.status(200).json({
            type: "success",
            message: "User created successfully",
        })

    } catch (e) {
        res.status(500).json({
            type: "error",
            message: "Some error occurred",
            error: e.message
        })
    }
})

app.get('/contacts/:id', async (req,res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findOne({_id:userId});
        if(user){
            return res.status(200).json({
            type:"success",
                user
            })
        }
        return res.json(200).json({
            type:"success",
            message:"No user found"
        })
    } catch(e){
        res.status(500).json({
            type: "error",
            message: "Some error occurred",
            error: e.message
        })
    }
})

app.delete('/contacts/:id', async (req,res)=>{
    try{
        const {userId} = req.body;
        await User.deleteOne({_id:userId});
        const updatedContacts = await User.find({});
        return res.status(200).json({
            type: "success",
            message: "User Deleted Successfully",
            contacts: updatedContacts
        })
    } catch(e){
        res.status(500).json({
            type:"error",
            message:"Some Error Occurred",
            error:e.message
        })
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})