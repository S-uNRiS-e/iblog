require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./Routers/AuthRouter.js')
const blogRouter = require('./Routers/BlogRouter.js')
const usersRouter = require('./Routers/UsersRouter.js')
const PORT = process.env.PORT || 5500;
const app = express();
const errorMiddleware = require('./middleware/error-middleware')

app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use('/api/auth/', authRouter)
app.use('/api/', blogRouter)
app.use('/api/', usersRouter)
app.use(errorMiddleware)

const runServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        app.listen(PORT, () => {
            console.log(`Server was started on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

runServer()