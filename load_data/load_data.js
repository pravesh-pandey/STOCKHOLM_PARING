const User = require('../model/User');
const fetch = require('node-fetch');
var randomBinary = require('random-binary');
const UserName = require('unique-string');
var randomProfile = require('random-profile-generator');
const GenerateNewData =() => {
    var profile = randomProfile.profile();
    var data = new User();
    data.name = profile.name;
    data.email = profile.email;
    data.username = UserName();
    data.password = UserName();
    data.gender = profile.gender;
    data.age = profile.age;
    data.profilePicture = profile.avatar;
    data.isAdmin = false;
    data.desc = "some rubbish";
    data.birthday = profile.birthday;
    data.city = profile.state;
    data.phone = profile.phone;
    data.hobbies = randomBinary(10);
    data.viewed = [];
    fetch('http://localhost:5000/api/auth/register', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};
module.exports = {GenerateNewData};
