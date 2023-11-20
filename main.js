const mongoose = require('mongoose');
const cors = require('cors');
const CustomErrorHandler = require('./Utils/CustomErrorHandler');
const GlobalErrorHandler = require('./Controller/ErrorHandler');
const userRouter = require('./Routes/authRoutes');
const movieRouter = require('./Routes/movieRoutes');
const termsRouter = require('./Routes/termsRoutes');
const privacyRouter = require('./Routes/privacyRoutes');
const subscriptionRouter = require('./Routes/subscriptionRoutes');
const express = require('express');

const dotenv = require('dotenv');
// Read env file
dotenv.config({ path: './config.env' });

// Remote connection
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
}).then((conn) => {
    console.log("Successfully connected to Atlas");
    // console.log(conn);
});

let app = express();
// Middleware
app.use(express.json());

app.use(cors({
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200
}));

// Access User Router
app.use('/CinoHolic/api/user', userRouter);

// Access Movie Router
app.use('/CinoHolic/api/movie', movieRouter);

// Access Terms Router
app.use('/CinoHolic/api/terms', termsRouter);

// Access Privacy Router
app.use('/CinoHolic/api/privacy', privacyRouter);

// Access Subscription Router
app.use('/CinoHolic/api/subscription', subscriptionRouter);

// Response for invalid routes
app.all('*', (req, res, next) => {
    const err = new CustomErrorHandler(`Can't find ${req.originalUrl} on the server`, 404);
    next(err);
})

// Global Error Handler Middleware
app.use(GlobalErrorHandler);

// start server
app.listen(8000, () => {
    console.log("Server has been started");
});