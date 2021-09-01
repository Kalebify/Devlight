const express = require('express');
const app = express();
const morgan = require('morgan');

//setting 
app.set('port', process.env.Port || 3001);

//routes 
app.use(require('./routes/index'));
//app.use('/api/deals', require('./routes/deals'));
app.use(require('./routes/deals'));



//
app.use(morgan(('dev')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// starting the server 
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})