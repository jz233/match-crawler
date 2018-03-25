var web_match = require('./web_match');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('basketball', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const MatchInfo = sequelize.define('match_info', {
  match_id: {
    type: Sequelize.INTEGER,
    primaryKey: true  //手动指定主键字段，否则默认为'id'
  },
  match_date: Sequelize.STRING(8),
  hm_name: Sequelize.STRING(3),
  aw_name: Sequelize.STRING(3),
  hm_win: Sequelize.INTEGER,
  hm_score: Sequelize.STRING(3),
  aw_score: Sequelize.STRING(3),
  OTs: Sequelize.INTEGER,
  img_url: Sequelize.STRING(500),
  details_url: Sequelize.STRING(200)

},{
  timestamps: false,  //没有时间戳字段
  freezeTableName: true,  //固定表名
  tableName: 'match_info' //指定表名
});

// sequelize
//   .query('select * from match_info limit 0, 5', {
//     model: MatchInfo,
//     // type: Sequelize.QueryTypes.SELECT //不加会返回两条相同的记录
//   })
//   .then(results => {
//     console.log(results);
//   })

//获取结果原始数据（ raw:true 只有表数据，没有其他元数据）
// MatchInfo.findOne({where: {match_id: 1}, raw:true}).then(result => {
//   console.log(result);
// })

//获取结果中某个字段
// MatchInfo.findOne({where: {match_id: 2}}).then(result => {
//   console.log(result.get('details_url'));
// })


// 查找符合要求的所有记录
function findAll() {
    MatchInfo.findAll({where: {hm_name: 'HOU'}, raw:true}).then(results => {
        console.log(results);
    })
}


function count() {
    MatchInfo.count().then(c => {
        console.log('there are ' + c + ' matches')
    })
}

function buildMatchInfo(matchInfo){
    let match = MatchInfo.build({
        // arena, startDate, awTeam, hmTeam, awScore, hmScore, ots
        // match_id:
        match_date: matchInfo.startDate,
        hm_name: matchInfo.hmTeam,
        aw_name: matchInfo.awTeam,
        hm_win: Number(matchInfo.hmScore) > Number(matchInfo.awScore) ? 1 : 0,
        hm_score: matchInfo.hmScore,
        aw_score: matchInfo.awScore,
        OTs: matchInfo.ots,
        img_url: "",
        details_url: ""
    });

    console.log(match.dataValues);
}

function createMatchInfo(matchInfo) {
    MatchInfo.create({
        // arena, startDate, awTeam, hmTeam, awScore, hmScore, ots
        // match_id:
        match_date: matchInfo.startDate,
        hm_name: matchInfo.hmTeam,
        aw_name: matchInfo.awTeam,
        hm_win: matchInfo.hmScore > matchInfo.awScore ? 1 : 0,
        hm_score: matchInfo.hmScore,
        aw_score: matchInfo.awScore,
        OTs: matchInfo.ots,
        img_url: "",
        details_url: ""
    }).then(match => {
        match.save()
    })

}



exports.sequelize = sequelize;
module.exports.MatchInfo = MatchInfo;
module.exports.buildMatchInfo = buildMatchInfo;
module.exports.createMatchInfo = createMatchInfo;
module.exports.findAll = findAll;

//#####################################################################
