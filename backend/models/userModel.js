import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    },
    password: {
        type: String,
        default: '',
    },

    uid: {
        type: String,
        default: "",

    },
    ProviderId: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }


}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;