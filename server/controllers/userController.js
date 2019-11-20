const User = require("../models/user");
const jwtHelper = require("../helpers/jwtHelper");
const hashHelper = require("../helpers/hashHelper");

class UserController {
    static register(req, res, next) {
        let { email, password } = req.body;
        User.create({ email, password })
            .then(user => {
                let token = jwtHelper.generate(user.id);
                res.status(201).json({ token })
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (hashHelper.compare(req.body.password, user.password)) {
                    let token = jwtHelper.generate(user.id);
                    res.status(200).json({ token });
                }
                else {
                    let err = {
                        status: 400,
                        message: 'Wrong password'
                    }
                    throw err;
                }
            })
            .catch(next)
    }
}

module.exports = UserController;