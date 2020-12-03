const input = require('./input7.js');

function run({prg, input, ip = 0, output = undefined, HALT = false}) {
    //console.log('start ip:', ip);
    let ax = 0;
    let bx = 0;
    for (; ip < prg.length && !HALT;) {
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

        //console.log('-', {cmd: prg.slice(ip, ip+(width || 3)).join(','), ip, command, opcode, flags, ax, bx, input, output});
        switch (opcode) {
        case 1:
            prg[prg[ip + 3]] = ax + bx;
            break;
        case 2:
            prg[prg[ip + 3]] = ax * bx;
            break;
        case 3:
            //console.log('>>> input: ', input);
            prg[prg[ip + 1]] = input.pop();
            break;
        case 4:
            //console.log('<<< output:', ax);
            //console.log('>', {cmd: prg.slice(ip, ip+(width || 3)).join(','), ip, command, opcode, flags, ax, bx, input, output});
            output = ax;
            return {
                input,
                output,
                prg,
                ip: ip + 2,
                HALT
            };
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
        input,
        output,
        prg,
        ip,
        HALT,
    };
}


var permArr = [],
  usedChars = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};

function calculate(order, input) {
    const states = {
        5: { prg: input.slice(), input: [5], HALT: false, },
        6: { prg: input.slice(), input: [6], HALT: false, },
        7: { prg: input.slice(), input: [7], HALT: false, },
        8: { prg: input.slice(), input: [8], HALT: false, },
        9: { prg: input.slice(), input: [9], HALT: false, },
    };

    let prev = 0;

    let haltCount = 0;
    while (haltCount < Object.keys(states).length) {
        haltCount = 0;
        for (let amp of order) {
            //console.log('--- AMP ---', amp, 'input: ', prev);
            if (prev !== undefined) {
                states[amp].input.unshift(prev);
                states[amp] = run(states[amp])
                prev = states[amp].output;
                //console.log(states[amp].HALT);
                if (states[amp].HALT) {
                    haltCount ++ ;
                }
            } else {
                return;
            }
        }
        //console.log({haltCount});
    }
    return prev;
}

//console.log('result:', calculate([5,6,7,8,9], input));



const powers = permute([5,6,7,8,9]).map(order => {
    return calculate(order, input);
});


console.log(powers.reduce((max, p) => {
    return p > max ? p : max;
}, 0));
