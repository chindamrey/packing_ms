const express = require('express');
const plate = require('./routes/plate');
const vipPlate = require('./routes/vipPlate');
const auth = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(plate);
app.use(vipPlate);
app.use(auth);
app.listen(3000, () => {
    console.log('server runing on port 3000');
})