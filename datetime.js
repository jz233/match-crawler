var moment = require('moment')

// const d = new Date()
//
// var date = d.getDate()
// var month = d.getMonth()
// var year = d.getFullYear()
//
// console.log(month + '/' + date + '/' + year);

var startDate = moment('20180201')
for(let i=0; i<10; i++) {
    console.log(startDate.add(1, 'days').format('YYYYMMDD'));
}

