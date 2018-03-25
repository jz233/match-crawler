var http = require('http')
var https = require('https')

// var url = 'https://www.basketball-reference.com/boxscores/?month=2&day=25&year=2018'
// var url = 'http://matchweb.sports.qq.com/kbs/list?from=NBA_PC&columnId=100000&startTime=2018-02-12&endTime=2018-02-18'
// var url = 'https://data.nba.net/prod/v2/20180228/scoreboard.json'

/**
 *
 * @param arena
 * @param startDate
 * @param awTeam
 * @param hmTeam
 * @param awScore
 * @param hmScore
 * @param ots
 * @constructor
 */
function Game(arena, startDate, awTeam, hmTeam, awScore, hmScore, ots) {
    this.arena = arena;
    this.startDate = startDate;
    this.awTeam = awTeam;
    this.hmTeam = hmTeam;
    this.awScore = awScore;
    this.hmScore = hmScore;
    this.ots = ots;

}


function fetchData(url, handleResult){
	startRequest(url, handleResult)
}

function fetchPromiseData(){
    startPromiseRequest()
}

function startRequest(url, handleResult){
	https.get(url, function(res) {
		var json = ''
        res.setEncoding('utf-8')
        res.on('data', function(chunk) {
			json += chunk
            // console.log(decodeURIComponent(html.replace(/\\x/g, '%')))
            // fs.writeFile('a.json', unescape(json.replace(/\\u/g, '%u')), function(err){
            //     console.log(err);
            // })
		})

		res.on('end', function() {
            var matchInfo = parseJSONData(json)
            handleResult(matchInfo)
		})

	}).on('error', function(err) {
		console.log(err)
	});
}

function parseJSONData(data) {
    var gamesInfo = [];
    var json = JSON.parse(data);
    var games = json['games']
    games.forEach(function(game, i, games) {
        var info = new Game(
            game['arena']['name'],
            game['startDateEastern'],
            game['vTeam']['triCode'],
            game['hTeam']['triCode'],
            game['vTeam']['score'],
            game['hTeam']['score'],
            game['period']['current'] - 4
        );
        gamesInfo.push(info);
        // console.log(info);
    })

    return gamesInfo
}

function startPromiseRequest() {
    return new Promise(function (resolve, reject) {
        https.get(url, function(res) {
            var json = ''
            res.setEncoding('utf-8')
            res.on('data', function(chunk) {
                json += chunk
            })

            res.on('end', function(data) {
                console.log(data);
                resolve(json)
            })

        }).on('error', function(err) {
            console.log(err)
            reject(new Error(err.message))
        });
    })
}

function parseMatchesJSONData(data) {
    var matches_with_date = []
    data.forEach(function(date, i, data) {
        let gamesInfo = [];
        let games = date['games']
        games.forEach(function (game, j, games) {
            var info = new Game(
                game['arena']['name'],
                game['startDateEastern'],
                game['vTeam']['triCode'],
                game['hTeam']['triCode'],
                game['vTeam']['score'],
                game['hTeam']['score'],
                game['period']['current'] - 4
            );
            gamesInfo.push(info);
        })
        matches_with_date.push(gamesInfo)
        // console.log(info);
    })
    return matches_with_date
}


module.exports.fetchData = fetchData;
module.exports.fetchPromiseData = fetchPromiseData;
module.exports.parseMatchesJSONData = parseMatchesJSONData;
module.exports.Game = Game;

