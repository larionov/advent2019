const input = require('./input2.js');

const calculate = (input, noun, verb) => {
    input[1] = noun;
    input[2] = verb;
    let end = false;
    let ax = 0;
    let bx = 0;

    for (let ip = 0; ip < input.length && !end;) {
        const opcode = input[ip];
	console.log(`ip ${ip} opcode ${opcode}`);
	switch (opcode) {
        case 1:
            ax = input[input[ip + 1]];
            bx = input[input[ip + 2]];
            input[input[ip + 3]] = ax + bx;
            ip += 4;
console.log('at', input[input[ip + 3]], ax + bx)
            break;
        case 2:
            ax = input[input[ip + 1]];
            bx = input[input[ip + 2]];
            
console.log('at', input[input[ip + 3]], ax * bx)
			input[input[ip + 3]] = ax * bx;
            ip += 4;
            break;
        case 99:
	console.log(input);
            return input[0];
            break;
        default:
            console.log('>unknown', opcode, ip);
            break;
        }
    }
    return undefined;
}
calculate(input.slice(), 12, 2);
process.exit(0);
for (let i = -1000; i < 1000; i ++) {
    for (let j = -1000; j < 1000; j ++) {
        const result = calculate(input.slice(), i, j);
        if (result === 19690720) {

            console.log({i, j, result});
        }

    }
}
