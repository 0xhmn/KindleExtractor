console.log("test begins");

const list = [1,2,3,4,5,6,7,8,9,10];

// slow api
function slowDoublePromise(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(num * 2);
        }, 1000);
    })
}

function thenTest(num) {
    slowDoublePromise(num).then((res) => {
        console.log('then result: ', res);
    })
}

async function asyncTest(num) {
    var tt = await slowDoublePromise(num);
    console.log('await test: ', tt);
}

//////////////////////
////////////// Individual Testing
/////////////////////

console.log("start to get the result ...");

// asyncTest(2);
// thenTest(3);

//////////////////////
////////////// List Testing
/////////////////////

/**
 * Return all the resutls in 1 Second.
 * Since it creates 10 promises and all of them wait for 1 sec to return.
 * @param {Array} list 
 */
function listOperationTestForAll(list) {
    list.forEach(num => {
        slowDoublePromise(num).then((res) => {
            console.log('all returned result: ', res);
        })
    });
}

/**
 * Process each Promise individually.
 * It takes 10 seconds for all of them to be done.
 * @param {Array} list 
 */
async function listOperationTestForEach(list) {
    for (const num of list) {
        var prm = await slowDoublePromise(num);
        console.log('returned result: ', prm);
    }
}

console.log("all returned result: ");
listOperationTestForAll(list);

console.log("individual returned result: ");
listOperationTestForEach(list);