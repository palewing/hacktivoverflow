const {Schema, model} = require("mongoose");
const hashHelper = require("../helpers/hashHelper");

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
        validate:{
            validator: function(){
                return new Promise((resolve, reject) =>{
                    User.findOne({email: this.email})
                    .then(user=>{
                        if(user){
                            resolve(false)
                        }
                        else{
                            resolve(true)
                        }
                    })
                    .catch(err=>{
                        reject(err)
                    })
                })
            },
            message(){
                return `Email already registered`
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: [4, 'Password minimum length is 4']
    }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.pre('save', function(next){
    this.password = hashHelper.hash(this.password);
    next();
})

const User = model('User', userSchema);

module.exports = User