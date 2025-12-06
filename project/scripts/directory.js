const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// Google Custom Search JSON API Configuration
const GOOGLE_API_KEY = 'AIzaSyBsPbUDrA3bQ13_fJxtnnE_KjViZQKEPHo'; // Replace with your API key
const SEARCH_ENGINE_ID = 'b2531f7bdcbf34397'; // Replace with your cx (Search Engine ID)

// Google Custom Search API Function
async function performGoogleSearch(query) {
    // Add New Zealand region restriction parameters
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&cr=countryNZ&gl=nz`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return null;
    }
}

// Display Google Search Results
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
        
        searchResults.appendChild(resultCard);
    });
    
    // Log the full JSON response to console for debugging
    console.log('Google Custom Search API Response:', JSON.stringify(data, null, 2));
}

// Search Button Event Listener
const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        const searchResults = document.querySelector('#searchResults');
        searchResults.innerHTML = '<p>Loading...</p>';
        const data = await performGoogleSearch(query);
        displaySearchResults(data);
    }
});

// Allow Enter key to trigger search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Member Directory Code (existing)
const url = 'https://thk3306.github.io/wdd330/project/data/members.json';

const cards = document.querySelector('#cards');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    members.forEach((member) => {
        const card = document.createElement('section');
        const name = document.createElement('h2');
        const image = document.createElement('img');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('a');
        const membershipLevel = document.createElement('p');
        const description = document.createElement('p');
        const contactEmail = document.createElement('p');
        
        name.textContent = member.name;
        image.setAttribute('src', `${member.image}`);
        image.setAttribute('alt', `Image of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '200');
        image.setAttribute('height', '300');
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        website.setAttribute('href', member.website);
        website.textContent = `Website: ${member.website}`;
        membershipLevel.textContent = `Membership Level: ${member.membershipLevel}`;
        description.textContent = `Description: ${member.description}`;
        contactEmail.textContent = `Contact Email: ${member.contactEmail}`;
        
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membershipLevel);
        card.appendChild(description);
        card.appendChild(contactEmail);
        cards.appendChild(card);
    })
}

getMemberData().then(() => {
    cards.classList.add('grid');
    gridButton.classList.add('active');
});

const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

gridButton.addEventListener('click', () => {
    cards.classList.remove('list');
    cards.classList.add('grid');
    gridButton.classList.add('active');
    listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
    cards.classList.remove('grid');
    cards.classList.add('list');
    listButton.classList.add('active');
    gridButton.classList.remove('active');
});
