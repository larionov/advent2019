const [wire1, wire2] = require('./input3.js');

/*const zip = (a, b) => a.map(function(e, i) {
  return [e, b[i]];
});*/

const distance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
const last = array => array[array.length - 1];
const addM = (a, b) => [a[0] + b[0], a[1] + b[1]];
const eqM = (a, b) => (a[0]  ===  b[0]) &&  (a[1] === b[1]);

const dirToArr = (d) => ({
    U: [0, 1, 0],
    D: [0, -1, 0],
    L: [-1, 0, 0],
    R: [1, 0, 0],
})[d];

const expand = (start, value, direction) => {
    const fill = Array(value).fill(direction);
    return fill.reduce((acc, i) => {
        const top = last(acc);
        const np = addM(top, i);
        return [...acc, [np[0], np[1], top[2] + 1]];
    }, [start]);
};
console.log(expand([10, 20, 30], 10, [1, 2, 3]));

const toPosition = (acc, i) => {
    const top = last(acc);
    const v = parseInt(i.substring(1), 10);
    const d = dirToArr(i.substring(0, 1), v);
    //console.log(acc, v, d);

    return [
        ...acc,
        ...expand(top, v, d),
    ];

};

const pos1 = wire1.reduce(toPosition, [[0, 0, 0]]);
const pos2 = wire2.reduce(toPosition, [[0, 0, 0]]);

console.log(pos1.length);
console.log(pos2.length);

let intersections = [];
for (let i = 0; i < pos1.length; i++) {
    for (let j = 0; j < pos2.length; j++) {
        if(eqM(pos1[i], pos2[j])) {
            console.log('>', distance(pos1[i], [0, 0]));
            console.log(pos1[i][2] + pos2[j][2]);
            //intersections = [...intersections, pos1];
        }

    }
}
//console.log(intersections[0].map(i => distance([0,0], i)).sort());
