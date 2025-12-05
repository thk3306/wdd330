const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

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
