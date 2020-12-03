const input = '245318-765747';

const arrEq = (a, b) => {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};
const checkRule = (i) => {
    const s = i.toString(10).split('').map(d => parseInt(d, 10));
    const ss = [...s].sort();
    if (!arrEq(ss, s)) return false;

    if ((new Set(s)).size === 6) return false;

    console.log (s.reduce((acc, n) => {
        acc[n] = acc[n] ? acc[n] + 1 : 1;
        return acc;
    }, {}));


    const hasPair = (Object.values(s.reduce((acc, n) => {
        acc[n] = acc[n] ? acc[n] + 1 : 1;
        return acc;
    }, {})).filter(n => parseInt(n, 10) === 2).length > 0);
    return hasPair;
}
let count = 0;
for (let i = 245318 ; i <= 765747; i++) {
    if (checkRule(i))
        count ++;
}
console.log(checkRule(111111));
console.log(checkRule(223450));
console.log(checkRule(123789));
console.log(checkRule(112233));
console.log(checkRule(123444));
console.log(checkRule(111122));
console.log(count);
