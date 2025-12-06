import { initializeHamburgerMenu } from './navigation.js';

// Initialize navigation
initializeHamburgerMenu();

// Weather API functionality
const currentTemp = document.querySelector("#temperature");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#conditions");
const url = "https://api.openweathermap.org/data/2.5/weather?lat=-36.85646280918705&lon=174.7760109734543&appid=4699897b20e248b1b6f5f515e8636dcb&units=metric";

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C\n`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    captionDesc.textContent = `${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
}

// Initialize weather API
apiFetch();

// Featured Businesses functionality
const membersUrl = 'https://thk3306.github.io/wdd330/project/data/members.json';

async function getFeaturedBusinesses() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            // Filter for Gold and Silver members (levels 2 and 3)
            const featuredMembers = data.filter(member => member.membershipLevel >= 2);
            // Get 3 random featured members
            const randomMembers = getRandomMembers(featuredMembers, 3);
            displayFeaturedBusinesses(randomMembers);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Error loading featured businesses:', error);
    }
}

function getRandomMembers(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
}

function displayFeaturedBusinesses(members) {
    const featuredCards = document.querySelector('#featured-cards');
    featuredCards.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'featured-card';

        const membershipBadge = member.membershipLevel === 3 ? 
            '<span class="badge gold">Gold Member</span>' : 
            '<span class="badge silver">Silver Member</span>';

        card.innerHTML = `
            ${membershipBadge}
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p class="description">${member.description}</p>
            <p class="contact"><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="website-link">Visit Website →</a>
        `;

        featuredCards.appendChild(card);
    });
}

// Initialize featured businesses
getFeaturedBusinesses();