const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
});

// model(collection, Schema);
mongoose.model('users', userSchema);