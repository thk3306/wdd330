// Directory search module - handles Google Custom Search integration
const GOOGLE_API_KEY = 'AIzaSyBsPbUDrA3bQ13_fJxtnnE_KjViZQKEPHo';
const SEARCH_ENGINE_ID = 'b2531f7bdcbf34397';

/**
 * Performs a Google Custom Search for New Zealand businesses
 * @param {string} query - Search query
 * @returns {Promise<Object|null>} Search results or null if error
 */
async function performGoogleSearch(query) {
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&cr=countryNZ&gl=nz`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Google Custom Search API Response:', JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return null;
    }
}

/**
 * Creates a search result card element
 * @param {Object} item - Search result item
 * @returns {HTMLElement} Result card element
 */
function createResultCard(item) {
    const resultCard = document.createElement('div');
    resultCard.className = 'search-result-card';

    const title = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = item.link;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    titleLink.innerHTML = item.htmlTitle;
    title.appendChild(titleLink);

    const link = document.createElement('p');
    link.className = 'result-link';
    link.textContent = item.displayLink;

    const snippet = document.createElement('p');
    snippet.className = 'result-snippet';
    snippet.innerHTML = item.htmlSnippet;

    resultCard.appendChild(title);
    resultCard.appendChild(link);
    resultCard.appendChild(snippet);

    // Add image if available
    if (item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image[0]) {
        const img = document.createElement('img');
        img.src = item.pagemap.cse_image[0].src;
        img.alt = item.title;
        img.loading = 'lazy';
        img.className = 'result-image';
        resultCard.insertBefore(img, title);
    }

    return resultCard;
}

/**
 * Displays search results on the page
 * @param {Object} data - Search API response data
 */
function displaySearchResults(data) {
    const searchResults = document.querySelector('#searchResults');
    searchResults.innerHTML = '';

    if (!data || !data.items || data.items.length === 0) {
        searchResults.innerHTML = '<h3>No Results Found</h3>';
        return;
    }

    // Display search metadata
    const searchInfo = document.createElement('div');
    searchInfo.className = 'search-info';
    searchInfo.innerHTML = `
        <p>About ${data.searchInformation.formattedTotalResults} results 
        (${data.searchInformation.formattedSearchTime} seconds)</p>
    `;
    searchResults.appendChild(searchInfo);

    // Display each search result
    data.items.forEach((item) => {
        const card = createResultCard(item);
        searchResults.appendChild(card);
    });
}

/**
 * Initialize search functionality
 */
export function initSearch() {
    const searchButton = document.querySelector('#searchButton');
    const searchInput = document.querySelector('#searchInput');

    if (!searchButton || !searchInput) return;

    // Search button click handler
    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query) {
            const searchResults = document.querySelector('#searchResults');
            searchResults.innerHTML = '<p>Loading...</p>';
            const data = await performGoogleSearch(query);
            displaySearchResults(data);
        }
    });

    // Enter key handler
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}
