const input = require('./input9.js');
//const input = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
//const input = [1102,34915192,34915192,7,4,7,99,0];
//const input = [104,1125899906842624,99];
function run({prg, base = 0, input, ip = 0, output = [], HALT = false}) {
    let ax = 0;
    let bx = 0;
    let rel = 0;
    for (;!HALT;) {
        const command = prg[ip].toString(10).padStart(5, '0');
        const f = command.substring(0, 3).split('').map(c => parseInt(c, 10));
        const flags = { ax: f[2], bx: f[1], cx: f[0]};
        const opcode = parseInt(command.substring(3), 10);
        const commands = ({
            1: {width: 4, name: 'add'},
            2: {width: 4, name: 'mul'},
            3: {width: 2, name: 'input'},
            4: {width: 2, name: 'output'},
            5: {width: 0, name: 'jmp-if-true'},
            6: {width: 0, name: 'jmp-if-false'},
            7: {width: 4, name: 'less then'},
            8: {width: 4, name: 'equals'},
            9: {width: 2, name: 'adjust base'},
            99: {width: 0, name: 'halt'},
        });
        const width = commands[opcode].width;

        if (flags.ax === 0) {
            if (typeof prg[prg[ip + 0]] === 'undefined') prg[prg[ip + 0]] = 0;
        } else if (flags.ax === 2) {
            if (typeof prg[base + prg[ip + 0]] === 'undefined') prg[base + prg[ip + 0]] = 0;
        }
        if (flags.bx === 0) {
            if (typeof prg[prg[ip + 1]] === 'undefined') prg[prg[ip + 1]] = 0;
        } else if (flags.bx === 2) {
            if (typeof prg[base + prg[ip + 1]] === 'undefined') prg[base + prg[ip + 1]] = 0;
        }
        if (flags.cx === 0) {
            if (typeof prg[prg[ip + 3]] === 'undefined') prg[prg[ip + 3]] = 0;
        } else if (flags.cx === 2) {
            if (typeof prg[base + prg[ip + 3]] === 'undefined') prg[base + prg[ip + 3]] = 0;
        }
        ax = flags.ax === 1 ? prg[ip + 1] : (flags.ax === 2 ? prg[base + prg[ip + 1]] : prg[prg[ip + 1]]);
        bx = flags.bx === 1 ? prg[ip + 2] : (flags.bx === 2 ? prg[base + prg[ip + 2]] : prg[prg[ip + 2]]);
        cx = flags.cx === 1 ? prg[ip + 3] : (flags.cx === 2 ? prg[base + prg[ip + 3]] : prg[prg[ip + 3]]);

        //console.log('-', {cmd: prg.slice(ip, ip+(width || 3)).join(','), ip, base, command, opcode: `${opcode}: ${commands[opcode].name}`, flags, ax, bx, input, output});
        switch (opcode) {
        case 1:
            rel = flags.cx === 2 ? base : 0;
            prg[rel + prg[ip + 3]] = ax + bx;
            break;
        case 2:
            rel = flags.cx === 2 ? base : 0;
            prg[rel + prg[ip + 3]] = ax * bx;
            break;
        case 3:
            //console.log('>>> input: ', input);
            rel = flags.ax === 2 ? base : 0;
            prg[rel + prg[ip + 1]] = input.pop();
            break;
        case 4:
            console.log('<<< output:', ax);
            //console.log('>', {cmd: prg.slice(ip, ip+(width || 3)).join(','), ip, command, opcode, flags, ax, bx, input, output});
            output.push(ax);

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
            rel = flags.cx === 2 ? base : 0;
            prg[rel + prg[ip + 3]] = ax < bx ? 1 : 0;
            break;
        case 8:
            rel = flags.cx === 2 ? base : 0;
            prg[rel + prg[ip + 3]] = ax === bx ? 1 : 0;
            break;
        case 9:
            base += ax
            break;
        case 99:
            //console.log('HALT');
            HALT = true;
            break;
        default:
            console.log('>unknown', opcode, ip);
            return undefined;
            break;
        }

        ip += width;
    }
    return {
        base,
        input,
        output,
        prg,
        base,
        ip,
        HALT,
    };
}

const state = { prg: input.slice(), input: [2], HALT: false, };
const output = run(state);
console.log( output.output);
