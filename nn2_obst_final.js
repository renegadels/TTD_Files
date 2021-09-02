let obstDiff = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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



const obstPred = async function(levelCount) {
    const timerModel = await tf.loadLayersModel('https://raw.githubusercontent.com/renegadels/TTD_Files/main/TTD_Obst/model.json');

    let nn_res = (timerModel.predict(tf.tensor([levelCount])));
    
    let rounded = Math.floor((parseFloat(nn_res.dataSync()[0])));
    
    find_sum_combos(obstDiff, rounded);
    var rand = options[(Math.random() * options.length) | 0];
    return rand;
};
