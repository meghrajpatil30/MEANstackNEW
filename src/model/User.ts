import { Schema, model } from 'mongoose';

let UserSchema : Schema = new Schema({
    createdAt: Date,
    updatedAt: Date,
    name: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        default: ''
    },
   address: {
        type: String,
        default: '',
        required: true
    }, 
    deleted: {
        type: Boolean,
        default: false
    }
});

export default model('User', UserSchema);