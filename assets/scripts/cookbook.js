// cookbook.js

// Function to create a new cookbook
function createCookbook() {
    const newCookbook = document.createElement('div');
    newCookbook.className = 'cookbook bg-white p-8 rounded-md shadow-md mb-4 overflow-hidden';
    newCookbook.id = 'cookbook' + (document.querySelectorAll('.cookbook').length + 1);

    // Make cookbook wider than tall
    newCookbook.style.width = '450px';
    newCookbook.style.height = '310px'; // Increased height to compensate for scrollbar

    newCookbook.style.position = 'absolute';
    newCookbook.style.left = '50px';
    newCookbook.style.top = '50px';

    // Fetch XML data
    fetch('assets/data/formulas.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlData = parser.parseFromString(data, 'application/xml');
            // Use xmlData to dynamically populate cookbook content
            populateCookbookContent(xmlData, newCookbook);
        })
        .catch(error => console.error('Error loading XML:', error));

    document.body.appendChild(newCookbook);
    newCookbook.addEventListener('mousedown', handleMouseDown);
}

// Function to dynamically populate cookbook content
function populateCookbookContent(xmlData, cookbook) {
    // Get unique top categories from XML data
    const topCategoryNodes = xmlData.querySelectorAll('formula top_category');
    const topCategories = new Set(Array.from(topCategoryNodes).map(categoryNode => categoryNode.textContent));

    // Create top category buttons as a styled list
    const topCategoryList = document.createElement('ul');
    topCategoryList.className = 'list-none p-0 m-0 overflow-y-auto pb-6 h-full'; // Set the height to full
    topCategories.forEach(topCategory => {
        const topCategoryItem = document.createElement('li');
        topCategoryItem.className = 'text-blue-500 cursor-pointer mb-2 hover:text-blue-700';
        topCategoryItem.textContent = topCategory;
        topCategoryItem.addEventListener('click', () => showCategories(xmlData, cookbook, topCategory));
        topCategoryList.appendChild(topCategoryItem);
    });

    // Clear previous content
    cookbook.innerHTML = '';

    // Create exit button
    const exitButton = document.createElement('button');
    exitButton.className = 'close-button absolute top-0 right-0 p-1 rounded-tr-md rounded-bl-md bg-red-500 text-white text-sm';
    exitButton.textContent = 'X';
    exitButton.addEventListener('click', () => closeCookbook(cookbook.id));

    // Attach elements to cookbook
    cookbook.appendChild(topCategoryList);
    cookbook.appendChild(exitButton);
}

// Function to show subcategories for a top category
function showCategories(xmlData, cookbook, topCategory) {
    // Get subcategories for the selected top category
    const formulas = xmlData.querySelectorAll('formula');
    const topCategoryFormulas = Array.from(formulas).filter(formula => formula.querySelector('top_category').textContent === topCategory);

    // Extract unique subcategories
    const subCategories = new Set(Array.from(topCategoryFormulas).map(formula => formula.querySelector('category').textContent));

    // Create subcategory buttons as a styled list
    const subCategoryList = document.createElement('ul');
    subCategoryList.className = 'list-none p-0 m-0 overflow-y-auto pb-6 h-full'; // Set the height to full
    subCategories.forEach(subCategory => {
        const subCategoryItem = document.createElement('li');
        subCategoryItem.className = 'text-green-500 cursor-pointer mb-2 hover:text-green-700';
        subCategoryItem.textContent = subCategory;
        subCategoryItem.addEventListener('click', () => showFormulas(xmlData, cookbook, topCategory, subCategory));
        subCategoryList.appendChild(subCategoryItem);
    });

    // Clear previous content
    cookbook.innerHTML = '';

    // Create exit button.
    const exitButton = document.createElement('button');
    exitButton.className = 'close-button absolute top-0 right-0 p-1 rounded-tr-md rounded-bl-md bg-red-500 text-white text-sm';
    exitButton.textContent = 'X';
    exitButton.addEventListener('click', () => closeCookbook(cookbook.id));

    // Create back button
    const backButton = document.createElement('button');
    backButton.className = 'back-button absolute top-0 left-0 p-1 rounded-tl-md rounded-br-md bg-blue-500 text-white text-sm';
    backButton.textContent = '<--';
    backButton.addEventListener('click', () => populateCookbookContent(xmlData, cookbook));

    // Attach elements to cookbook
    cookbook.appendChild(subCategoryList);
    cookbook.appendChild(exitButton);
    cookbook.appendChild(backButton);
}

// Function to show formulas in a subcategory
function showFormulas(xmlData, cookbook, topCategory, subCategory) {
    // Get formulas for the selected subcategory
    const formulas = xmlData.querySelectorAll('formula');
    const subCategoryFormulas = Array.from(formulas).filter(formula =>
        formula.querySelector('top_category').textContent === topCategory &&
        formula.querySelector('category').textContent === subCategory
    );

    // Create formula buttons as a styled list
    const formulaList = document.createElement('ul');
    formulaList.className = 'list-none p-0 m-0 overflow-y-auto pb-6 h-full'; // Set the height to full
    subCategoryFormulas.forEach(formula => {
        const formulaItem = document.createElement('li');
        formulaItem.className = 'text-green-500 cursor-pointer mb-2 hover:text-green-700';
        formulaItem.textContent = formula.querySelector('title').textContent;
        formulaItem.addEventListener('click', () => showFormulaContent(xmlData, cookbook, formula));
        formulaList.appendChild(formulaItem);
    });

    // Clear previous content
    cookbook.innerHTML = '';

    // Create exit button
    const exitButton = document.createElement('button');
    exitButton.className = 'close-button absolute top-0 right-0 p-1 rounded-tr-md rounded-bl-md bg-red-500 text-white text-sm';
    exitButton.textContent = 'X';
    exitButton.addEventListener('click', () => closeCookbook(cookbook.id));

    // Create back button
    const backButton = document.createElement('button');
    backButton.className = 'back-button absolute top-0 left-0 p-1 rounded-tl-md rounded-br-md bg-blue-500 text-white text-sm';
    backButton.textContent = '<--';
    backButton.addEventListener('click', () => showCategories(xmlData, cookbook, topCategory));

    // Attach elements to cookbook
    cookbook.appendChild(formulaList);
    cookbook.appendChild(exitButton);
    cookbook.appendChild(backButton);
}

// Function to show content of a selected formula
function showFormulaContent(xmlData, cookbook, formula) {
    // Extract formula details
    const title = formula.querySelector('title').textContent;
    const description = formula.querySelector('description').textContent;
    const useCase = formula.querySelector('use_case').textContent;
    const shortExample = formula.querySelector('short_example').textContent;
    const longExample = formula.querySelector('long_example').textContent;

    // Create elements to display formula content
    const formulaContent = document.createElement('div');
    formulaContent.className = 'text-left overflow-auto p-4';
    formulaContent.style.maxHeight = '280px'; // Set maximum height for the content

    formulaContent.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${title}</h2>
        <p class="text-gray-600 mb-2">${description}</p>
        <p class="mb-2"><strong>Use Case:</strong> ${useCase}</p>
        <p class="mb-2"><strong>Short Example:</strong> ${shortExample}</p>
        <p class="mb-2"><strong>Long Example:</strong> ${longExample}</p>
    `;

    // Clear previous content
    cookbook.innerHTML = '';

    // Create exit button
    const exitButton = document.createElement('button');
    exitButton.className = 'close-button absolute top-0 right-0 p-1 rounded-tr-md rounded-bl-md bg-red-500 text-white text-sm';
    exitButton.textContent = 'X';
    exitButton.addEventListener('click', () => closeCookbook(cookbook.id));

    // Create back button
    const backButton = document.createElement('button');
    backButton.className = 'back-button absolute top-0 left-0 p-1 rounded-tl-md rounded-br-md bg-blue-500 text-white text-sm';
    backButton.textContent = '<--';
    backButton.addEventListener('click', () => showFormulas(xmlData, cookbook, formula.querySelector('top_category').textContent, formula.querySelector('category').textContent));

    // Attach elements to cookbook
    cookbook.appendChild(formulaContent);
    cookbook.appendChild(exitButton);
    cookbook.appendChild(backButton);
}

// Function to close the cookbook
function closeCookbook(cookbookId) {
    const cookbookToRemove = document.getElementById(cookbookId);
    if (cookbookToRemove) {
        document.body.removeChild(cookbookToRemove);
    }
}

// Attach event listener to create a new cookbook
document.getElementById('createCookbookButton').addEventListener('click', createCookbook);
