module.exports = (func) => {
    return (re, res, next) => {
        func(re, res, next).catch(err => { next(err) });
    }
}