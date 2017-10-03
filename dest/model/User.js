"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let UserSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('User', UserSchema);
