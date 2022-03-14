const mongoose = require("mongoose");

module.exports = mongoose.model("Guild", new mongoose.Schema({

    id: { type: String }, //ID of the guild
    name: { type: String }, //Name of the guild

    channels: {
        countingChannel: {Default: null, type: String}
    }



}));