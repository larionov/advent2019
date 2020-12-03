
const input = require('./input6.js');
function parse(n) {
    return n.split(')');
}

function makeTree() {

    function mapTree(acc, [p, s]) {
        if (!acc[s]) {
            acc[s] = { name: s, children: [], textChildren: [ ] };
        }

        if (!acc[p]) {
            acc[p] = { name: p, children: [], textChildren: [ s ] };
        } else {
            acc[p].textChildren.push(s);
        }

        return acc;
    }
    function build(treeData) {
        for (let i in treeData) {
            const node = treeData[i];
            for (let j = 0; j < node.textChildren.length; j++) {
                const childNode = treeData[node.textChildren[j]]
                node.children.push(childNode);
            }
            //delete node.textChildren;
        }
        for (let i in treeData) {
            const node = treeData[i];
            delete node.textChildren;
        }
    }

    const map = input.map(parse).reduce(mapTree, {});
    const tree = build(map);

    return map;
}

function walkTree(node, level = 0) {
    node.level = level;
    for (let i in node.children) {
        walkTree(node.children[i], level + 1);
    }
}

function sumTree(node, sum) {
    let res = 0;
    for (let i in node.children) {
        res += sumTree(node.children[i]);
    }

    return node.level + res;
}

function findPath(node, target) {
    if (node.name === target.name) {
        return [node];
    }
    for (let i in node.children) {
        const path = findPath(node.children[i], target);
        if (path) {
            return [node, ...path];
        }
    }
}

const tree = makeTree();
walkTree(tree.COM);
//console.log(JSON.stringify(tree.COM, null, 1));
//console.log(sumTree(tree.COM));
console.log(tree.YOU.level + tree.SAN.level - 2 * tree['78P'].level - 2);
//console.log(tree.SAN);
//console.log(tree['78P']);

//const pathYOU = findPath(tree.COM, tree.YOU).map(n => n.name);
//const pathSAN = findPath(tree.COM, tree.SAN).map(n => n.name);
/*let prev = '';
for (let i = 0; i< pathYOU.length; i++) {
    if (pathYOU[i] !== pathSAN[i]) {
        console.log(prev);
        break;
    }
    prev = pathYOU[i];
}
*/
