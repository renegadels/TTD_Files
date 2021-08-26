let tutorials = [0,4,9,12,15,17,22,23,26,28,36,45];
let numTut = tutorials.length;
let towerDiff = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let options = [];

function find_sum_combos(indices, target, towers) {
    var s, n, remaining;

    towers = towers || [];

    s = towers.reduce(function (a, b) {
        return a + b;
    }, 0);

    if (s === target) {
        options.push(towers);
    }

    if (s >= target) {
        return;
    }

    for (var i = 0; i < indices.length; i++) {
        n = indices[i];
        remaining = indices.slice(i + 1);
        find_sum_combos(remaining, target, towers.concat([n]));
    }
}

function round_half_up(number, decimals=0) {
    multiplier = 10 ** decimals;
    return Math.floor(number*multiplier + 0.5) / multiplier;
}

const timerPred = async function(levelCount) {
    const timerModel = await tf.loadLayersModel('https://raw.githubusercontent.com/renegadels/TTD_Files/main/TTD_Timer/model.json');

    let nn_res = (timerModel.predict(tf.tensor([levelCount])));
    
    return round_half_up((parseFloat(nn_res.dataSync()[0])));
};

const ammoPred = async function(levelCount) {
    const ammoModel = await tf.loadLayersModel('https://raw.githubusercontent.com/renegadels/TTD_Files/main/TTD_Ammo/model.json');

    let nn_res = (ammoModel.predict(tf.tensor([levelCount])));
    
    return round_half_up((parseFloat(nn_res.dataSync()[0])));
};

const towerPred = async function(levelCount) {
    const towerModel = await tf.loadLayersModel('https://raw.githubusercontent.com/renegadels/TTD_Files/main/TTD_Tower/model.json');

    let nn_res = towerModel.predict(tf.tensor([levelCount]));
    
    let rounded = round_half_up((parseFloat(nn_res.dataSync()[0])));
    
    find_sum_combos(towerDiff, rounded);
    var rand = options[(Math.random() * options.length) | 0];
    return rand;
};


