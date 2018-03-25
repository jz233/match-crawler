// new Promise(function (resolve, reject) {
//     reject(new Error('出错了'))
// })

// Unhandled promise rejection (rejection id: 1): Error: duang
// Promise.reject(new Error('duang')).catch(function (error) {
//     console.error(error)
// })

// #################################################################

// then 异步执行
// var promise = new Promise(function (resolve) {
//     console.log('inner promise')    // 1
//     resolve一旦被执行，promise对象就变为确定状态
    // resolve(27)
// })

// 在执行then之前，由于已经执行resolve() promise对象已经是确定状态，按说then应该接着就同步执行了
// 但是即便已经为确定状态，Promise仍然会以异步的方式调用console.log(value)
// 可以避免异步回调同步方法的问题
// promise.then(function (value) {
//     console.log(value)              // 3
// })

// console.log('outer promise')        // 2

// #################################################################
// 异常抛出例子
function taskA() {
    console.log('task A')
    throw new Error('task A error')
}

function taskB() {
    console.log('task B');
}

function onRejected(error) {
    console.log(error)
}

function finalTask() {
    console.log('final task')
}

// var promise = Promise.resolve()
// promise.then(taskA).then(taskB).catch(onRejected).then(finalTask)

function increment(value) {
    return value + 1
}

function doubleUp(value) {
    return value << 1
    // return value * 2
}

function output(value) {
    console.log('output: ' + value)
}

var promise = Promise.resolve(1)    // 参数1 传给increment
promise
    .then(increment)                // 返回值作为参数传给doubleUp
    .then(doubleUp)                 // 返回值作为参数传给output
    .then(output)
    .catch(function (error) {
        console.log(error)
    })