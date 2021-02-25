var mongoose = require('mongoose');



let dbURI = "mongodb+srv://ahmerali:ahmerali@cluster0.slkv6.mongodb.net/ahmerali"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

///////////************** Mongodb connected or disconnected Events ***********/////////////

mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected")

})

mongoose.connection.on('disconnectes', function () {
    console.log("mongoose is disconnected")
    process.exit(1)
})


mongoose.connection.on('error', function (err) {
    console.log('mongoose connecion is in error: ', err)
    process.exit(1)

})

mongoose.connection.on('SIGNIT', function () {
    console.log('app is turminating')
    mongoose.connection.close(function () {
        console.log('mongoose default connection is closed')
        process(0)
    })


})


///////////************** Mongodb connected or disconnected Events ***********/////////////


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    createdOn: { type: Date, 'default': Date.now },
    activeSince: Date

})

var userModle = mongoose.model("sweetShopUser", userSchema)
var otpSchema = new mongoose.Schema({
    "email": String,
    "otpCode": String,
    "createdOn": { "type": Date, "default": Date.now },
});
var otpModel = mongoose.model("otps", otpSchema);

module.exports = {
    userModle: userModle,
    otpModel: otpModel
}