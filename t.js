class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value, parentValue, isLeft) {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            if (current.value === parentValue) {
                if (isLeft && !current.left) {
                    current.left = newNode;
                } else if (!isLeft && !current.right) {
                    current.right = newNode;
                }
                return;
            }
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }
}

const tree = new BinaryTree();
const svg = document.getElementById('tree-svg');
const addNodeBtn = document.getElementById('addNodeBtn');
const buildTreeBtn = document.getElementById('buildTreeBtn');

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



buildTreeBtn.addEventListener('click', drawTree);