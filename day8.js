const input = require('./input8.js').split('').map(n => parseInt(n, 10));
console.log(input.length);

function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}
var result = chunkArray(input, 150);

console.log(result.length);

//console.log(result.map((layer,i) => [i, layer.filter(p => p === 0).length]));


const image = result.reverse().reduce((img, layer) => {
    for (let i = 0; i < layer.length; i++) {
        img[i] = layer[i] === 2 ? img[i] : layer[i];
    }
    return img;
}, result[0]).map(p => p ===0 ? ' ' : 'X');
console.log(chunkArray(image, 25).map(l => l.join('')));
