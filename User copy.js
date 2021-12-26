const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name : {
                first:String,
                last : String
            },
    email : String,
    age: Number,
    username : String,
    password : String
  
  });
  userSchema.virtual('fullName').get(function(){
      return this.name.first+' '+this.name.last;
  }).set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });;
  const Model = mongoose.model("User",userSchema);

  module.exports = {Model}; 