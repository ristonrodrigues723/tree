document.addEventListener('DOMContentLoaded', () => {
    const tree = document.getElementById('tree');
    const addNodeBtn = document.getElementById('addNodeBtn');

    // Toggle child nodes
    tree.addEventListener('click', (e) => {
        if (e.target.classList.contains('caret')) {
            e.target.classList.toggle('caret-down');
            e.target.nextElementSibling.classList.toggle('active');
        }
    });

    // Add new child node
    addNodeBtn.addEventListener('click', () => {
        const selectedNode = tree.querySelector('.caret-down');
        if (selectedNode) {
            const newNodeName = prompt('Enter the name for the new node:');
            if (newNodeName) {
                const newNode = document.createElement('li');
                newNode.innerHTML = `
                    <span class="caret">${newNodeName}</span>
                    <ul class="nested"></ul>
                `;
                selectedNode.nextElementSibling.appendChild(newNode);
            }
        } else {
            alert('Please select a parent node by clicking on it before adding a child.');
        }
    });
});