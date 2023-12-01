const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');

const connectDB = require('./models/db');
const fileUpload = require('express-fileupload');
const userRouter = require('./routes/userRoute');
const cleanFolder = require('./utils/cleanupTemp');
const invalidRoute = require('./controllers/invalidRoute');
const propertyRouter = require('./routes/propertyRoute');
const errorHandler = require('./controllers/errorController');

const app = express();
const PORT = process.env.PORT || 8000;
const isLocal = process.env.NODE_ENV === 'development';

const corsOptions = {
  origin: isLocal ? 'http://localhost:3000' : undefined,
  credentials: isLocal ? true : false,
};

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data:'],
    },
  })
);
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

cleanFolder(); // clear temp folder on server start

app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api/user', userRouter);
app.use('/api/property', propertyRouter);
app.all('*', invalidRoute);
app.use(errorHandler);

async function main() {
  connectDB();
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}
main();
