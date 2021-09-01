const { Router } = require('express');
const router = new Router();

const deals = require('../deals.json');

// router.get('/deals', (req, res) => {
//    //res.json(deals);
//    res.send('Deals');
// });


router.get('/deals', (req, res) => {
    res.json(deals);
});


module.exports = router;
