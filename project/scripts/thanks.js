import { initializeHamburgerMenu } from './navigation.js';

const getString = window.location.search;
console.log(getString);

const myInfo = new URLSearchParams(getString);

document.querySelector('#thankyou').innerHTML = `
<h2>Your Submitted Information is:</h2>
<p> Name: ${myInfo.get('fname')} ${myInfo.get('lname')}</p>
<p> Email: ${myInfo.get('email')}</p>
<p> Phone: ${myInfo.get('phone')}</p>
<p> Chosen Membership Level: ${myInfo.get('level')}</p>
<p> Adventuring Needs: ${myInfo.get('description')}</p>
<p> Time of Submission: ${myInfo.get('timestamp')}</p>
`;

// Initialize navigation
initializeHamburgerMenu();

