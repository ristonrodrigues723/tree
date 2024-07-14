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
            return "Root node added";
        }
        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            if (current.value === parentValue) {
                if (isLeft && !current.left) {
                    current.left = newNode;
                    return `Left child ${value} added to parent ${parentValue}`;
                } else if (!isLeft && !current.right) {
                    current.right = newNode;
                    return `Right child ${value} added to parent ${parentValue}`;
                }
                return "Node already exists";
            }
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        return "Parent node not found";
    }
}

const tree = new BinaryTree();
const svg = document.getElementById('tree-svg');
const addNodeBtn = document.getElementById('addNodeBtn');
const buildTreeBtn = document.getElementById('buildTreeBtn');
const messageBox = document.getElementById('messageBox');
const rootDisplay = document.getElementById('rootDisplay');
const leftChildDisplay = document.getElementById('leftChildDisplay');
const rightChildDisplay = document.getElementById('rightChildDisplay');

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
    const levelHeight = 60;
    const svgWidth = 600;
    const svgHeight = 400;

    function drawNode(node, x, y, level) {
        if (!node) return;

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", nodeRadius);
        circle.setAttribute("fill", getRandomColor());
        svg.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y + 5);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.textContent = node.value;
        svg.appendChild(text);

        // Add click event listener to the node
        circle.addEventListener('click', () => {
            displayNodeInfo(node);
        });

        if (node.left) {
            const leftX = x - svgWidth / Math.pow(2, level + 2);
            const leftY = y + levelHeight;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x);
            line.setAttribute("y1", y + nodeRadius);
            line.setAttribute("x2", leftX);
            line.setAttribute("y2", leftY - nodeRadius);
            line.setAttribute("stroke", "black");
            svg.appendChild(line);
            drawNode(node.left, leftX, leftY, level + 1);
        }

        if (node.right) {
            const rightX = x + svgWidth / Math.pow(2, level + 2);
            const rightY = y + levelHeight;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x);
            line.setAttribute("y1", y + nodeRadius);
            line.setAttribute("x2", rightX);
            line.setAttribute("y2", rightY - nodeRadius);
            line.setAttribute("stroke", "black");
            svg.appendChild(line);
            drawNode(node.right, rightX, rightY, level + 1);
        }
    }

    drawNode(tree.root, svgWidth / 2, nodeRadius + 10, 0);
}

function displayMessage(message) {
    messageBox.textContent = message;
}

function displayNodeInfo(node) {
    rootDisplay.textContent = node.value;
    leftChildDisplay.textContent = node.left ? node.left.value : 'None';
    rightChildDisplay.textContent = node.right ? node.right.value : 'None';
}

