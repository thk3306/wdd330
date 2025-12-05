import { initializeHamburgerMenu } from './navigation.js';

// Initialize navigation
initializeHamburgerMenu();

const sightsUrl = 'https://thk3306.github.io/wdd231/project/data/sights.json';
const foodUrl = 'https://thk3306.github.io/wdd231/project/data/food.json';

const sightsContainer = document.querySelector('#sights-places');
const foodContainer = document.querySelector('#food-places');
const sightsSection = document.querySelector('#sights-section');
const foodSection = document.querySelector('#food-section');

// Filter buttons
const allBtn = document.querySelector('#all-btn');
const sightsBtn = document.querySelector('#sights-btn');
const foodBtn = document.querySelector('#food-btn');

async function getSightsData() {
    try {
        const response = await fetch(sightsUrl);
        const data = await response.json();
        displaySights(data);
    } catch (error) {
        console.error('Error fetching sights data:', error);
    }
}

async function getFoodData() {
    try {
        const response = await fetch(foodUrl);
        const data = await response.json();
        displayFood(data);
    } catch (error) {
        console.error('Error fetching food data:', error);
    }
}

const displaySights = (places) => {
    sightsContainer.innerHTML = ''; // Clear existing content
    places.forEach((place) => {
        const card = document.createElement('section');
        const name = document.createElement('h3');
        const image = document.createElement('img');
        const address = document.createElement('address');
        const description = document.createElement('p');
        const button = document.createElement('button');

        name.textContent = place.name;
        name.className = "place-name";
        image.setAttribute('src', `${place.photo_url}`);
        image.setAttribute('alt', `Image of ${place.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '200');
        image.setAttribute('height', '300');
        image.className = "place-image";
        address.textContent = `Address: ${place.address}`;
        address.className = "place-address";
        description.textContent = place.description;
        description.className = "place-description";
        button.textContent = "Learn More";
        button.className = "learn-more-btn";
        button.addEventListener('click', () => {
            window.open(place.link, '_blank');
        });

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(address);
        card.appendChild(button);
        card.className = "place-card";
        sightsContainer.appendChild(card);
    });
    sightsContainer.classList.add('places');
};

const displayFood = (places) => {
    foodContainer.innerHTML = ''; // Clear existing content
    places.forEach((place) => {
        const card = document.createElement('section');
        const name = document.createElement('h3');
        const image = document.createElement('img');
        const location = document.createElement('address');
        const description = document.createElement('p');
        const button = document.createElement('button');

        name.textContent = place.name;
        name.className = "place-name";
        image.setAttribute('src', `${place.photo_url}`);
        image.setAttribute('alt', `Image of ${place.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '200');
        image.setAttribute('height', '300');
        image.className = "place-image";
        location.textContent = `Location: ${place.location}`;
        location.className = "place-address";
        description.textContent = place.description;
        description.className = "place-description";
        button.textContent = "Learn More";
        button.className = "learn-more-btn";
        button.addEventListener('click', () => {
            window.open(place.link, '_blank');
        });

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(location);
        card.appendChild(button);
        card.className = "place-card";
        foodContainer.appendChild(card);
    });
    foodContainer.classList.add('places');
};

// Filter functionality
function showAll() {
    sightsSection.style.display = 'block';
    foodSection.style.display = 'block';
    updateActiveButton(allBtn);
}

function showSights() {
    sightsSection.style.display = 'block';
    foodSection.style.display = 'none';
    updateActiveButton(sightsBtn);
}

function showFood() {
    sightsSection.style.display = 'none';
    foodSection.style.display = 'block';
    updateActiveButton(foodBtn);
}

function updateActiveButton(activeBtn) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Add active class to clicked button
    activeBtn.classList.add('active');
}

// Event listeners for filter buttons
allBtn.addEventListener('click', showAll);
sightsBtn.addEventListener('click', showSights);
foodBtn.addEventListener('click', showFood);

// Load data on page load
getSightsData();
getFoodData();
