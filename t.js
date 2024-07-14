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

function drawTree() {
    svg.innerHTML = '';
    if (!tree.root) return;

    const nodeRadius = 20;
    const levelHeight = 80;
    const drawNode = (node, x, y, level) => {
        if (!node) return;

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", nodeRadius);
        circle.setAttribute("fill", getRandomColor());
        circle.setAttribute("class", "node-circle");
        svg.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y);
        text.setAttribute("class", "node-text");
        text.textContent = node.value;
        svg.appendChild(text);

        if (node.left) {
            const leftX = x - 100 / (level + 1);
            const leftY = y + levelHeight;
            drawNode(node.left, leftX, leftY, level + 1);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x);
            line.setAttribute("y1", y + nodeRadius);
            line.setAttribute("x2", leftX);
            line.setAttribute("y2", leftY - nodeRadius);
            line.setAttribute("stroke", "black");
            svg.insertBefore(line, svg.firstChild);
        }

        if (node.right) {
            const rightX = x + 100 / (level + 1);
            const rightY = y + levelHeight;
            drawNode(node.right, rightX, rightY, level + 1);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x);
            line.setAttribute("y1", y + nodeRadius);
            line.setAttribute("x2", rightX);
            line.setAttribute("y2", rightY - nodeRadius);
            line.setAttribute("stroke", "black");
            svg.insertBefore(line, svg.firstChild);
        }
    };

    drawNode(tree.root, 400, 40, 0);
}

addNodeBtn.addEventListener('click', () => {
    const rootValue = parseInt(document.getElementById('rootInput').value);
    const leftValue = parseInt(document.getElementById('leftChildInput').value);
    const rightValue = parseInt(document.getElementById('rightChildInput').value);

    if (!isNaN(rootValue)) {
        if (!tree.root) {
            tree.insert(rootValue);
        }
        if (!isNaN(leftValue)) {
            tree.insert(leftValue, rootValue, true);
        }
        if (!isNaN(rightValue)) {
            tree.insert(rightValue, rootValue, false);
        }
    }

    document.getElementById('rootInput').value = '';
    document.getElementById('leftChildInput').value = '';
    document.getElementById('rightChildInput').value = '';
});

buildTreeBtn.addEventListener('click', drawTree);