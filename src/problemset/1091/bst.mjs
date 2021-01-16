const id = _ => _;

export class Node {
    data;
    parent;
    left;
    right;

    constructor(data) {
        this.data = data;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}

export class BinarySearchTree {
    root;

    static from(values) {
        const tree = new BinarySearchTree();
        for (const value of values) {
            tree.insert(value);
        }
        return tree;
    }

    static clone(tree) {
        return BinarySearchTree.from(tree);
    }

    constructor() {
        this.root = null;
    }

    getRootNode() {
        return this.root;
    }

    // Insert the given data as a new Node in the Tree
    insert(data, startNode = this.root) {
        const node = new Node(data);

        if (this.root === null) {
            this.root = node;
            return;
        }

        // Find the parentNode below which to attach the new Node
        let parentNode = startNode;
        let direction = (data < parentNode.data) ? 'left' : 'right';
        while (parentNode[direction] !== null) {
            parentNode = parentNode[direction];
            direction = (data < parentNode.data) ? 'left' : 'right';
        }

        node.parent = parentNode;
        parentNode[direction] = node;
    }

    // Replace the given Node along with its entire subTree by the give newNode and its subTree
    replaceSubTree(node, newNode = null) {
        if (node.parent !== null) {
            const direction = (node === node.parent.left) ? 'left' : 'right';
            node.parent[direction] = newNode;
        } else {
            this.root = newNode;
        }
        if (newNode !== null) {
            newNode.parent = node.parent;
        }
    }

    delete(data, startNode = this.root) {
        if (startNode === null) {
            return false;
        }

        // Find the targetNode to delete from the Tree
        let targetNode = startNode;
        while (targetNode !== null && data !== targetNode.data) {
            const direction = (data < targetNode.data) ? 'left' : 'right';
            targetNode = targetNode[direction];
        }

        // No targetNode found; the given value to delete does not exist in this tree
        if (targetNode === null) {
            return false;
        }

        this.deleteNode(targetNode);
        return true;
    }

    deleteNode(targetNode) {
        const parentNode = targetNode.parent;
        const direction = (parentNode && parentNode.left === targetNode) ? 'left' : 'right';

        // For the more complicated case of 2 childNodes, a replacementNode is taken from either subTree
        if (targetNode.left !== null && targetNode.right !== null) {
            const replacementNode = (direction === 'left') ? this.findMinimumNode(targetNode.right) : this.findMaximumNode(targetNode.left);
            targetNode.data = replacementNode.data;
            this.replaceSubTree(replacementNode, replacementNode.left);
        } else {
            // Handle the easier cases for 0 and 1 childNodes for both root and non-root Nodes
            const replacementNode = (targetNode.left === null) ? targetNode.right : targetNode.left;
            if (targetNode === this.root) {
                this.root = replacementNode;
            } else {
                parentNode[direction] = replacementNode;
            }
            if (replacementNode !== null) {
                replacementNode.parent = parentNode;
            }
        }
    }

    findMinimumNode(startNode = this.root) {
        let node = startNode;
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    findMaximumNode(startNode = this.root) {
        let node = startNode;
        while (node.right !== null) {
            node = node.right;
        }
        return node;
    }

    findMinimumNodeLimit(limit, startNode = this.root) {
        if (startNode === null) {
            return null;
        }

        let last = null;
        let node = startNode;
        do {
            while (limit < node.data && node.left !== null) {
                last = node;
                node = node.left;
            }
            while (limit > node.data && node.right !== null) {
                node = node.right;
            }
        } while (limit < node.data && node.left !== null);
        return limit <= node.data ? node : last;
    }

    findMaximumNodeLimit(limit, startNode = this.root) {
        if (startNode === null) {
            return null;
        }

        let last = null;
        let node = startNode;
        do {
            while (limit > node.data && node.right !== null) {
                last = node;
                node = node.right;
            }
            while (limit < node.data && node.left !== null) {
                node = node.left;
            }
        } while (limit > node.data && node.right !== null);
        return limit >= node.data ? node : last;
    }

    find(data, startNode = this.root) {
        let node = startNode;
        while (node !== null && data !== node.data) {
            const direction = (data < node.data) ? 'left' : 'right';
            node = node[direction];
        }
        return (node === null) ? null : node;
    }

    preOrder(cb = id, node = this.root, reverse = false) {
        if (node === null) {
            return;
        }

        const dir1 = reverse ? 'right' : 'left';
        const dir2 = reverse ? 'left' : 'right';
        cb(node);
        this.preOrder(cb, node[dir1], reverse);
        this.preOrder(cb, node[dir2], reverse);
    }

    inOrder(cb = id, startNode = this.root, reverse = false) {
        const dir1 = reverse ? 'right' : 'left';
        const dir2 = reverse ? 'left' : 'right';
        const stack = [];
        let node = startNode;
        while (node !== null || stack.length > 0) {
            while (node !== null) {
                stack.push(node);
                node = node[dir1];
            }

            node = stack.pop();
            cb(node);
            node = node[dir2];
        }
    }

    postOrder(cb = id, node = this.root, reverse = false) {
        if (node === null) {
            return;
        }

        const dir1 = reverse ? 'right' : 'left';
        const dir2 = reverse ? 'left' : 'right';
        this.postOrder(cb, node[dir1], reverse);
        this.postOrder(cb, node[dir2], reverse);
        cb(node);
    }

    bfsOrder(cb = id, startNode = this.root, reverse = false) {
        if (startNode === null) {
            return;
        }

        const queue = [startNode];
        for (let i = 0; i < queue.length; i += 1) {
            const node = queue[i];
            cb(node, i);
            if (!reverse && node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
            if (reverse && node.left !== null) {
                queue.push(node.left);
            }
        }
    }

    toArray() {
        const output = [];
        this.inOrder((node) => {
            output.push(node.data);
        });
        return output;
    }
}

export default BinarySearchTree;
