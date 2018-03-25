
// 第一种异步方式
// function f1(callback) {
//     setTimeout(function () {
//         callback()
//     }, 1000)
//     console.log('f1 called');
// }
//
// function f2(){
//     console.log('f2 called')
// }

// f1(f2);

// 第二种异步方式
// var jQuery = require('jQuery')
//
// jQuery.on('done', f2)
//
// function f1() {
//     setTimeout(function () {
//         f1.trigger('done')
//     }, 1000)
//     console.log('f1 called');
// }
//
// function f2() {
//     console.log('f2 called after "done" event triggered')
// }

// 第三种异步方式 Promise
// new Promise( /* executor */ function(resolve, reject) { ... } );
function test(resolve, reject) {
    var timeOut = Math.random() * 2
    console.log('set timeout to ' + timeOut + ' seconds')

    setTimeout(function () {
        if(timeOut < 1) {
            console.log('resolve() called')
            resolve('200 OK')
        }else{
            console.log('reject() called')
            reject('timeout in ' + timeOut + ' seconds')
        }
    }, timeOut * 1000)
}

var p1 = new Promise(test)
p1.then(function (result) {
    console.log('成功: ' + result)
}).catch(function (result) {
    console.log('失败: ' + result)
})
