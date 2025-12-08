const MEMBERS_URL = 'https://thk3306.github.io/wdd330/project/data/members.json';
const FEATURED_COUNT = 3;
const MIN_MEMBERSHIP_LEVEL = 2;


async function fetchMembers() {
    try {
        const response = await fetch(MEMBERS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading members data:', error);
        return [];
    }
}

function filterPremiumMembers(members, minLevel) {
    return members.filter(member => member.membershipLevel >= minLevel);
}

function getRandomMembers(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
}

function createBusinessCard(member) {
    const card = document.createElement('div');
    card.className = 'featured-card';

    const badgeClass = member.membershipLevel === 3 ? 'gold' : 'silver';
    const badgeText = member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';

    card.innerHTML = `
        <span class="badge ${badgeClass}">${badgeText}</span>
        <img src="${member.image}" alt="${member.name}" loading="lazy">
        <h3>${member.name}</h3>
        <p class="description">${member.description}</p>
        <p class="contact"><strong>Phone:</strong> ${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="website-link">Visit Website →</a>
    `;

    return card;
}

function renderFeaturedBusinesses(members) {
    const container = document.querySelector('#featured-cards');
    
    if (!container) {
        console.error('Featured cards container not found');
        return;
    }

    container.innerHTML = '';

    members.forEach(member => {
        const card = createBusinessCard(member);
        container.appendChild(card);
    });
}

export async function initFeaturedBusinesses() {
    const members = await fetchMembers();
    const premiumMembers = filterPremiumMembers(members, MIN_MEMBERSHIP_LEVEL);
    const randomMembers = getRandomMembers(premiumMembers, FEATURED_COUNT);
    renderFeaturedBusinesses(randomMembers);
}
