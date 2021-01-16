// import readline from 'readline';
// import QuickSort from './quicksort.mjs';
// import { Node, BinarySearchTree } from './bst.mjs';
//
// const solve = (line1, line2, line3) => {
//     const [n, m] = line1.split(' ').map(Number);
//     const H = QuickSort(line2.split(' ').map(Number));
//     const T = line3.split(' ');
//
//     const output = [];
//     const bst = new BinarySearchTree();
//     const fn = (nodes, start, end) => {
//         if (start >= end) {
//             return null;
//         }
//
//         const mid = Math.trunc((start + end) / 2);
//         const node = new Node(nodes[mid]);
//
//         node.left = fn(nodes, start, mid);
//         node.right = fn(nodes, mid + 1, end);
//         if (node.left !== null) {
//             node.left.parent = node;
//         }
//         if (node.right !== null) {
//             node.right.parent = node;
//         }
//
//         return node;
//     };
//     bst.root = fn(H, 0, n);
//
//     for (const t of T) {
//         const ticketNode = bst.findMaximumNodeLimit(Number(t));
//         if (ticketNode !== null) {
//             output.push(ticketNode.data);
//             bst.deleteNode(ticketNode);
//         } else {
//             output.push(-1);
//         }
//     }
//     return output;
// };
//
// const printAnswer = (answer) => {
//     let output = answer;
//     if (Array.isArray(answer)) {
//         if (Array.isArray(answer[0])) {
//             output = output.map(o => o.join(' '));
//         }
//         output = output.join('\n');
//     }
//     console.log(output);
// };
//
// (() => {
//     const r = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
//     let lines = [];
//     r.on('line', async (line) => {
//         lines.push(line);
//         if (lines.length === solve.length) {
//             const answer = await solve.call(null, ...lines);
//             printAnswer(answer);
//             lines = [];
//         }
//     });
// })();
