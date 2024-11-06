import express from 'express'
import User from './User.js'
import mongoose from 'mongoose'


const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/Profiler');
    console.log("Connected to mongoDB");
}
connectDB();
const app = express();
app.use(express.json());

app.get('/contacts', async (req, res) => {
    try {
        const users = await User.find({});
        let usernameList = [];
        if (users.length != 0) {
            usernameList = users.map((user) => user.userName);
        }
        res.status(200).json({
            type: "success",
            usernameList
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
        res.status(200).json({
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

})

app.patch('/contacts/:id',async (req,res)=>{
    
})

app.delete('/contacts/:id', async (req,res)=>{

})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})