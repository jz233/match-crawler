var phantom = require("phantom");
var _ph, _page, _outObj;

var url = 'https://www.basketball-reference.com/boxscores/?month=2&day=25&year=2018'

phantom.create().then(function(ph){
    _ph = ph;
    return _ph.createPage();
}).then(function(page){
    _page = page;
    return _page.open(url);
}).then(function(status){
    console.log(status);
    return _page.property('content')
}).then(function(content){
    console.log(content);
    _page.close();
    _ph.exit();
}).catch(function(e){
   console.log(e);
});
