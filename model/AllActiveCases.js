const mongoose = require('mongoose');

const User = new mongoose.Schema({
    Title: "string",
    CaseNumber: "string",
    Jurisdiction: "string",
    DateFiled: "string"
});
const users = mongoose.model('users', User);

module.exports = users;