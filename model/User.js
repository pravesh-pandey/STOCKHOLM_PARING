const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name : {
            first:{
              type: String,
              require: true,
              min: 3,
              max: 20,
              unique: true,
            },
            last :{
              type: String,
              min: 3,
              max: 20,
              unique: true,
            },
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    age: Number,
    username : {
      type:String,
      require:true,
      min:4,
      max:20,
      unique:true
    },
    password : {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    birthday:{
      type:String,
    },
    phone:{
      type:String,
    },
    gender:{
      type:String,
    },
    hobbies:{
      type:String,
      min:10,
      max:10,
    },
    viewed:[],
  
  },
  { timestamps:true }
  );
  UserSchema.virtual('fullName').get(function(){
      return this.name.first+' '+this.name.last;
  }).set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });;

  module.exports = mongoose.model("User",UserSchema);  