const input = require('./input.js');
console.log(input);

const calcFuel = (mass) => Math.floor(mass / 3) - 2;

const recursiveFuel = mass => {
    const fuel = calcFuel(mass);
    console.log(fuel, mass);
    if (fuel < 0)
        return 0;
    else
        return recursiveFuel(fuel) + fuel;
};

const initial = input.map(recursiveFuel).reduce((acc, m) => acc + m, 0)
console.log((initial));
