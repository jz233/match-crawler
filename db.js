const Sequelize = require('sequelize')

const sequelize = new Sequelize('comp589_project', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// const sequelize = new Sequelize('t', 'douj27', 'Jj^(&&935', {
//   host: '138.68.19.30',
//   dialect: 'mysql',
//
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// })

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.')
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err)
//   })

// query
// sequelize
//   .query('select * from team_info', {
//     //plain: true //true只返回第一行
//     // ... 其他
//   })
//   .then(results => {
//     console.log(results)
//   })

// sequelize
//   .query('select * from team_info where team_name = ?', {
//     raw: true,
//     replacements: ['HOU']
//   })
//   .then(results => {
//     console.log(results)
//   })

sequelize
  .query('select * from team_info where team_name = :team_name', {
    raw: true, replacements: {team_name: 'ATL'},
    type: Sequelize.QueryTypes.SELECT //不加会返回两条相同的记录
  })
  .then(results => {
    console.log(results);
  })
