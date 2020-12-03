const prg = require('./input5.js');

function run(prg, input = 0) {
    let ax = 0;
    let bx = 0;
    let cx = 0;

    for (let ip = 0; ip < prg.length;) {
        const command = prg[ip].toString(10).padStart(4, '0');
        const flags = command.substring(0, 2).split('').map(c => Boolean(parseInt(c, 10)));
        const opcode = parseInt(command.substring(2), 10);
        const width = ({
            1: 4, // add
            2: 4, // mul
            3: 2, // input
            4: 2, // output
            5: 0, // jmp-if-true
            6: 0, // jmp-if-false
            7: 4, // less then
            8: 4, // equals
            99: 0, // halt
        })[opcode];
        ax = flags[1] ? prg[ip + 1] : prg[prg[ip + 1]];
        bx = flags[0] ? prg[ip + 2] : prg[prg[ip + 2]];

        console.log('>', {cmd: prg.slice(ip, ip+(width || 3)).join(','), ip, command, opcode, flags, ax, bx, cx});
        switch (opcode) {
        case 1:
            prg[prg[ip + 3]] = ax + bx;
            break;
        case 2:
            prg[prg[ip + 3]] = ax * bx;
            break;
        case 3:
            prg[prg[ip + 1]] = input;
            break;
        case 4:
            console.log('output:', ax);
            break;
        case 5:
            if (ax !== 0) ip = bx;
            else ip += 3;
            break;
        case 6:
            if (ax === 0) ip = bx;
            else ip += 3;
            break;
        case 7:
            prg[prg[ip + 3]] = ax < bx ? 1 : 0;
            break;
        case 8:
            prg[prg[ip + 3]] = ax === bx ? 1 : 0;
            break;
        case 99:
            return prg[0];
            break;
        default:
            console.log('>unknown', opcode, ip);
            return undefined;
            break;
        }

        ip += width;
    }
    return undefined;
}

console.log(run(prg.slice(), 5));
