var moment = require('moment')
var https = require('https')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

var web_match = require('./web_match');
var db_match = require('./db_match');

var startDate = moment('20180201')

// web_match.fetchData(url, function (result) {
//     // console.log(result)
//     result.forEach(function (match, i, result) {
//         // if (i == 1) {
//         // db_match.addMatchInfo(match)
//         db_match.createMatchInfo(match)
//         // }
//     })
// });

//异步批处理
/*for (let i = 0; i < 10; i++) {
    var url = 'https://data.nba.net/prod/v2/' + moment('20180201').add(i, 'days').format('YYYYMMDD') + '/scoreboard.json'
    console.log(url)
    web_match.fetchData(url, function (result) {
        console.log('####################################')
        console.log(result)
    })
}*/

// 所有任务url放入数组，按时间顺序
var reqs = []
for(let i=0; i<10; i++) {
    let url = 'https://data.nba.net/prod/v2/' + moment('20180201').add(i, 'days').format('YYYYMMDD') + '/scoreboard.json'
    // console.log(url);
    reqs.push(startPromiseRequest(url).then(JSON.parse))
}


function main() {
    /*function recordValue(results, value) {
        results.push(value)
        return results
    }
    let pushValue = recordValue.bind(null, [])
    var tasks = reqs;
    var promise = Promise.resolve()

    for(let i=0; i< tasks.length; i++) {
        let task = tasks[i]
        promise = promise.then(task).then(pushValue)
    }

    return promise*/
    return Promise.all(reqs)
}

main().then(function (value) {
    console.log(value);
    let games_info = web_match.parseMatchesJSONData(value);
    // console.log(games_info.length)
}).catch(function (err) {
    console.log(err);
})


function startPromiseRequest(url) {
    return new Promise(function (resolve, reject) {
        https.get(url, function(res) {
            var json = ''
            res.setEncoding('utf-8')
            res.on('data', function(chunk) {
                json += chunk
            })

            res.on('end', () => {
                resolve(json)
                // console.log(json)
            })

        }).on('error', function(err) {
            console.log(err)
            reject(new Error(err.message))
        });
        /*var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();*/
    })
}


// db_match.findAll()

// console.log(db_match.MatchInfo.prototype);

// MatchInfo.addMatchInfo()
