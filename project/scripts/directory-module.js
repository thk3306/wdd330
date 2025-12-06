// Members directory module - handles displaying member directory
const MEMBERS_URL = 'https://thk3306.github.io/wdd330/project/data/members.json';

/**
 * Fetches member data from JSON file
 * @returns {Promise<Array>} Array of member objects
 */
async function fetchMembers() {
    try {
        const response = await fetch(MEMBERS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

/**
 * Creates a member card element
 * @param {Object} member - Member object
 * @returns {HTMLElement} Member card element
 */
function createMemberCard(member) {
    const card = document.createElement('section');
    
    const name = document.createElement('h2');
    name.textContent = member.name;
    
    const image = document.createElement('img');
    image.setAttribute('src', member.image);
    image.setAttribute('alt', `Image of ${member.name}`);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('width', '200');
    image.setAttribute('height', '300');
    
    const address = document.createElement('p');
    address.textContent = `Address: ${member.address}`;
    
    const phone = document.createElement('p');
    phone.textContent = `Phone: ${member.phone}`;
    
    const website = document.createElement('a');
    website.setAttribute('href', member.website);
    website.textContent = `Website: ${member.website}`;
    
    const membershipLevel = document.createElement('p');
    membershipLevel.textContent = `Membership Level: ${member.membershipLevel}`;
    
    const description = document.createElement('p');
    description.textContent = `Description: ${member.description}`;
    
    const contactEmail = document.createElement('p');
    contactEmail.textContent = `Contact Email: ${member.contactEmail}`;
    
    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(membershipLevel);
    card.appendChild(description);
    card.appendChild(contactEmail);
    
    return card;
}

/**
 * Renders members to the directory
 * @param {Array} members - Array of member objects
 */
function renderMembers(members) {
    const cardsContainer = document.querySelector('#cards');
    
    if (!cardsContainer) {
        console.error('Cards container not found');
        return;
    }

    cardsContainer.innerHTML = '';
    members.forEach(member => {
        const card = createMemberCard(member);
        cardsContainer.appendChild(card);
    });
}

/**
 * Initialize directory layout controls
 */
function initLayoutControls() {
    const gridButton = document.querySelector('#grid');
    const listButton = document.querySelector('#list');
    const cardsContainer = document.querySelector('#cards');

    if (!gridButton || !listButton || !cardsContainer) return;

    gridButton.addEventListener('click', () => {
        cardsContainer.classList.remove('list');
        cardsContainer.classList.add('grid');
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    });

    listButton.addEventListener('click', () => {
        cardsContainer.classList.remove('grid');
        cardsContainer.classList.add('list');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    });

    // Set initial state
    cardsContainer.classList.add('grid');
    gridButton.classList.add('active');
}

/**
 * Initialize members directory
 */
export async function initDirectory() {
    const members = await fetchMembers();
    renderMembers(members);
    initLayoutControls();
}
