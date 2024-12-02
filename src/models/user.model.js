const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { generateOtp } = require('../utils/randomString');
const { sendEmail } = require('../services/authenticationServices/mail.service');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        require: true
    },
    phone : {
        type: String,
        require: true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    otp: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    }
},{timestamps : true})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// userSchema.pre('save', function (next) {
//     if (!this.otp) {
//         this.otp = generateOtp()
//         sendEmail({
//             to: this.email,
//             subject: 'Your otp',
//             text: `Your otp is ${this.otp}`
//         }).then(res => console.log(`Success sending email to ${this.email}`))
//             .catch(err => console.log(`Error sending email to ${this.email}`))
//     }
//     next()
// })
userSchema.pre('save', async function (next) {
    // Check if OTP is missing or not set, generate a new OTP if needed
    if (!this.otp) {
        this.otp = generateOtp(); // Generate OTP
        
        try {
            // Send OTP email
            await sendEmail({
                to: this.email,
                subject: 'Your OTP',
                text: `Your OTP is ${this.otp}`,
            });
            console.log(`Success sending email to ${this.email}`);
        } catch (err) {
            console.error(`Error sending email to ${this.email}:`, err);
            // You can decide if you want to throw an error here or proceed
            return next(err); // This stops the save if email fails
        }
    }
    next(); // Proceed with saving the user
});


// Add method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = new mongoose.model("User",userSchema)

module.exports = User