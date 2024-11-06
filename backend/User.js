import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username : String,
    linkedinUrl : String,
    avatarUrl : String,
    description : String,
});

const User = mongoose.model('user',userSchema);

export default User;