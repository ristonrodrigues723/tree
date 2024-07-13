document.addEventListener('DOMContentLoaded', () => {
    const tree = document.getElementById('tree');
    const svg = document.getElementById('tree-svg');
    const addNodeBtn = document.getElementById('addNodeBtn');
    let nodeId = 0;

    function createNodeLine(x1, y1, x2, y2) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("class", "node-line");
        svg.appendChild(line);
    }

    function updateTreeVisualization() {
        svg.innerHTML = ''; // Clear existing visualization
        const rootNode = tree.querySelector('.caret');
        drawNode(rootNode, 400, 50, null);
    }

    function drawNode(node, x, y, parentX, parentY) {
        if (parentX !== null && parentY !== null) {
            createNodeLine(parentX, parentY + 20, x, y - 20);
        }

        const childList = node.nextElementSibling;
        if (childList && childList.children.length > 0) {
            const childWidth = 800 / (childList.children.length + 1);
            let childX = x - 400 + childWidth;
            const childY = y + 100;

            Array.from(childList.children).forEach(childLi => {
                const childNode = childLi.querySelector('.caret');
                drawNode(childNode, childX, childY, x, y);
                childX += childWidth;
            });
        }
    }

    // Toggle child nodes
    tree.addEventListener('click', (e) => {
        if (e.target.classList.contains('caret')) {
            e.target.classList.toggle('caret-down');
            e.target.nextElementSibling.classList.toggle('active');
            updateTreeVisualization();
        }
    });

    // Add new child node
    addNodeBtn.addEventListener('click', () => {
        const selectedNode = tree.querySelector('.caret-down');
        if (selectedNode) {
            const newNodeName = prompt('Enter the name for the new node:');
            if (newNodeName) {
                nodeId++;
                const newNode = document.createElement('li');
                newNode.innerHTML = `
                    <span class="caret" data-id="node-${nodeId}">${newNodeName}</span>
                    <ul class="nested"></ul>
                `;
                selectedNode.nextElementSibling.appendChild(newNode);
                updateTreeVisualization();
            }
        } else {
            alert('Please select a parent node by clicking on it before adding a child.');
        }
    });

    // Initial visualization
    updateTreeVisualization();
});