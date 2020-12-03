import { main as input } from './input10.js';
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}
function getXY(x, y, input) {
    return input[y][x];
}

function putXY(x, y, v, input) {
    input[y] = replaceAt(input[y], x,  v);
    return input;
}



function getLine(_x1, _y1, _x2, _y2) {
    let x1, y1, x2, y2;

    x1 = _x1; y1 = _y1;
    x2 = _x2; y2 = _y2;

    if (_x1 >= _x2 && _y1 >= _y2) {
        x1 = _x2; y1 = _y2;
        x2 = _x1; y2 = _y1;
    } else if (_x1 < _x2 && _y1 >= _y2) {
        x1 = _x1; y1 = _y1;
        x2 = _x2; y2 = _y2;
    } else if (_x1 >= _x2 && _y1 < _y2) {
        x1 = _x2; y1 = _y2;
        x2 = _x1; y2 = _y1;
    }
    const dy = (y2 - y1);
    const dx = (x2 - x1);
    //if (dx < 2 && dy < 2) return [];
    let result = [];
    if (Math.abs(dy) <= Math.abs(dx)) {
        const k = dy / dx;
        // console.log('<', {x1, y1, x2, y2, dx, dy, k});
        for (let i = 1; i < dx; i++) {
            if (i * k === Math.floor(i * k)) {
                result.push([x1 + i, y1 + i * k]);
            }
        }
    } else {
        const k = dx / dy;
        // console.log('>', {x1, y1, x2, y2, dx, dy, k});
        if (dy < 0) {
            for (let i = dy + 1; i < 0; i++) {
                // console.log(Math.abs(dy), Math.abs(dx));
                if (i * k === Math.floor(i * k)) {
                    result.push([x1 + i * k, y1 + i]);
                }
            }
        } else {
            for (let i = 1; i < dy; i++) {
                // console.log(Math.abs(dy), Math.abs(dx));
                if (i * k === Math.floor(i * k)) {
                    result.push([x1 + i * k, y1 + i]);
                }
            }
        }
    }
    return result;
}
const x1 = 19;
const y1 = 14;
function getAngles(x1, y1, input) {
    const angles = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input.length; x++) {
            if (getXY(x, y, input) === '#') {
                const dy = (y - y1);
                const dx = (x - x1);

                const angle = - Math.atan2(dx, dy) + Math.PI ;
                angles.push({x, y, angle});

            }
        }
    }
    return angles;
}

function zap(x, y, x1, y1, input) {
    const line = getLine(x, y, x1, y1).sort((a, b) => {
        return Math.pow(x - a[0], 2) + Math.pow(y - a[1], 2) -
            Math.pow(x - b[0], 2) + Math.pow(y - b[1], 2);
    });
    console.log({line});
    return [0,0];
}

const angles = getAngles(19, 14, input).sort(function(a, b) {
    return a.angle - b.angle;
});
angles.forEach(t => console.log(t));
const [zx, zy] = zap(19, 14, 19, 2);

const result = [];
//{ x1: 19, y1: 14, count: 274 }

//         let count = 0;
//         const x2 = 1;
//         const y2 = 9;
//         if (getXY(x1, y1, input) === '#') {

//             for (let y2 = 0; y2 < input.length; y2++) {
//                 for (let x2 = 0; x2 < input.length; x2++) {
//                     if (x1 === x2 && y1 === y2) continue;
//                     if (getXY(x2, y2, input) === '#') {
//                         const line = getLine(x1, y1, x2, y2);
//                         // console.log({x2, y2, line});

//                         //                    putXY(x2, y2, '-', input);
//                         const blocking = line.filter(([x, y]) => {
//                             return getXY(x, y, input) === '#';
//                         });
//                         // if (!blocking.length) {
//                         //     putXY(x2, y2, '*', input);
//                         // }
//                         //                    console.log(x2, y2, line);
//                         count += (blocking.length === 0) ? 1 : 0;
//                         // console.log({blocking}, count);


//                     }


//                 }
//             }
//         }
//         result.push({x1, y1, count});
// //     }
// }
putXY(x1, y1, '@', input);

console.log('   0123456789012345678901234');
console.log(input.map((l,i) => i.toString().padStart(2, ' ') +' '+ l).join('\n'));

result.sort(function(a, b) {
    return a.count - b.count;
}).forEach(t => console.log(t));
