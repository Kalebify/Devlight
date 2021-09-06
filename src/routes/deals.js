const { Router } = require('express');
const router = new Router();

const deals = require('../deals.json');



// router.get('/deals', (req, res) => {
//    //res.json(deals);
//    res.send('Deals');
// });
function simpleSearch (query){
    var _Equals= query.includes("=");
    var _Contains= query.includes(":");
    var  _GreaterThan = query.includes(">");
    var  _LessThan= query.includes("<");

    var resultSearchQuery = {};
    var filterQuery =''; 
    if (_Equals){
        filterQuery = query.slice(query.toString().indexOf("=")+1).trimStart();
        if(isNaN(filterQuery)){
            resultSearchQuery = deals.filter(x=>x.title===filterQuery);
        }
    }
    else if (_Contains){
        filterQuery = query.slice(query.toString().indexOf(":")+1).trimStart();
        if(isNaN(filterQuery)){
            resultSearchQuery = deals.filter((deal)=> deal.title.includes(filterQuery))
        }
    }
    else if (_GreaterThan){
        filterQuery = query.slice(query.toString().indexOf(">")+1).trimStart();
        if(!(isNaN(filterQuery))){
            resultSearchQuery = deals.filter((deal)=> deal.salePrice > parseInt(filterQuery))
        }
    }
    else if (_LessThan){
        filterQuery = query.slice(query.toString().indexOf("<")+1).trimStart();
        if(!(isNaN(filterQuery))){
            resultSearchQuery = deals.filter((deal)=> deal.salePrice < parseInt(filterQuery))
        }
    }
    return resultSearchQuery;
}

function combineSearch(combineQuery){

    var _Equals= false ; 
    var _Contains= false ; 
    var  _GreaterThan = false ; 
    var  _LessThan=  false ; 
    var equalFiltro =''; 
    var containFiltro =''; 
    var greaterFiltro =''; 
    var lessFiltro =''; 
       
    var combineResults = {};
    var params = combineQuery.split(',');

    params.forEach(element => {
        if(element.includes("=")){
            _Equals= true;
            equalFiltro =  element.slice(element.toString().indexOf("=")+1).trimStart();
        } else
        if(element.includes(":")){
            _Contains = true;
            containFiltro =  element.slice(element.toString().indexOf(":")+1).trimStart();
        } else 
        if(element.includes(">")){
            _GreaterThan = true;
            greaterFiltro =  element.slice(element.toString().indexOf(">")+1).trimStart();
        }else
        if(element.includes("<")){
            _LessThan = true;
            lessFiltro =  element.slice(element.toString().indexOf("<")+1).trimStart();
        }  
    });

      if (_Equals && _GreaterThan){
        combineResults = deals.filter(x=>x.title===equalFiltro && x.salePrice > parseInt(greaterFiltro));
            } else 
            if (_Equals && _GreaterThan && _LessThan){
                combineResults = deals.filter(x=>x.title===equalFiltro && x.salePrice> parseInt(greaterFiltro) && x.salePrice< parseInt(lessFiltro));
            } else 
            if (_Equals &&  _LessThan){
                combineResults = deals.filter(x=>x.title===equalFiltro && x.salePrice < parseInt(lessFiltro));
            } else 
            if (_Contains &&  _LessThan){
                combineResults = deals.filter(x=>x.title.includes(containFiltro) && x.salePrice < parseInt(lessFiltro));
            } else 
            if (_Contains && _GreaterThan && _LessThan){
                combineResults = deals.filter(x=>x.title.includes(containFiltro) && x.salePrice > parseInt(greaterFiltro) && x.salePrice< parseInt(lessFiltro));
            } else 
            if (_Contains && _GreaterThan){
                combineResults = deals.filter(x=>x.title.includes(containFiltro) && x.salePrice > parseInt(greaterFiltro));
            }

    return combineResults;
}


router.get('/deals', (req, res) => {
    var query = req.query.q;
    if(query.length>=3 ){ 
        
        var combinado = query.includes(",");  
        //console.log(combinado);     
        if (!combinado)
        {
            return res.json(simpleSearch(query));
        }else {
            return res.json(combineSearch(query));         
        }
        }
        
      res.json(deals);
    
});


module.exports = router;
