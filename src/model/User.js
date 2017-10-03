"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    createdAt: Date,
    updatedAt: Date,
    name: {
        type: String,
        "default": '',
        required: true
    },
    email: {
        type: String,
        "default": '',
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        "default": ''
    },
    deleted: {
        type: Boolean,
        "default": false
    }
});
exports["default"] = mongoose_1.model('User', UserSchema);
