const CustomErrorHandler = require('./../Utils/CustomErrorHandler');

const devError = (res, error) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error: error
    });
}

const castErrorHandler = (error) => {
    const message = `Invalid value ${error.value} for field ${error.field}`;
    return new CustomErrorHandler(message, 400);
}

const duplicatekeyErrorHandler = (error) => {
    const message = `${error.message} is already in use`;
    return new CustomErrorHandler(message, 400);
}

const mongooseValidationErrorHandler = (error) => {
    const err = Object.values(error.errors).map(val => val.message);
    const errorMessage = err.join('. ');
    const message = `Warning : ${errorMessage}`;
    return new CustomErrorHandler(message, 400);
}

const jwtErrorHandler = (error) => {
    const message = `Invalid token. Please login again`;
    return new CustomErrorHandler(message, 400);
}

const prodError = (res, error) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
}
module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        console.log("Development mode enabled")
        devError(res, error);
    }
    else if (process.env.NODE_ENV === 'production') {
        console.log("Production mode enabled")
        if (error.name === 'CastError') {
            error = castErrorHandler(error);
        }
        if (error.code === 11000) {
            error = duplicatekeyErrorHandler(error);
        }
        if (error.name === 'ValidationError') {
            error = mongooseValidationErrorHandler(error);
        }
        if (error.name === 'TokenExpiredError') {
            error = jwtExpiredHandler(error);
        }
        prodError(res, error);
    }
}