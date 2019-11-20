const jwtHelper = require("../helpers/jwtHelper");

module.exports = (req, res, next) => {
    try {
        req.user = jwtHelper.decode(req.headers.token);
        next();
    }
    catch(err) {
        next(err)
    }
}