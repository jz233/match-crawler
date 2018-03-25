var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio')
var request = require('request')

var i = 0
// var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391"
var url = 'http://www.nba.com/gameline/20150514/';

function fetchPage(x){
	startRequest(x)
}

function startRequest(x){
	http.get(x, function(res) {
		var html = ''
		var titles = []
		res.setEncoding('utf-8')
		res.on('data', function(chunk) {
			html += chunk
		})

		res.on('end', function() {
			var $ = cheerio.load(html)

			// var time = $('.article-info a:first-child').next().text().trim()
			// var news_item = {
      //     title: $('div.article-title a').text().trim(),
      //     Time: time,
      //     link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
      //     author: $('[title=供稿]').text().trim(),
      //     i: i = i + 1,
      // }
			var games = $('.GameLine')
			games.each(function(i, game){
				var news_item = {
					away_team: $('div.nbaModTopTeamAw', game).children('.nbaModTopTeamName').text().trim()
				}

				console.log(news_item)

			});
		})

	}).on('error', function(err) {
		console.log(err)
	});
}

fetchPage(url)
