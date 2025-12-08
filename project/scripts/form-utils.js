export function setFormTimestamp() {
    const timestampField = document.querySelector('#timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
}

export function displayThankYouInfo() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const thankYouElement = document.querySelector('#thankyou');

    if (!thankYouElement) return;

    const firstName = params.get('fname') || 'N/A';
    const lastName = params.get('lname') || 'N/A';
    const email = params.get('email') || 'N/A';
    const phone = params.get('phone') || 'N/A';
    const membershipLevel = params.get('level') || 'N/A';
    const description = params.get('description') || 'N/A';
    const timestamp = params.get('timestamp') || 'N/A';

    thankYouElement.innerHTML = `
        <h2>Your Submitted Information is:</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Chosen Membership Level:</strong> ${membershipLevel}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Time of Submission:</strong> ${timestamp}</p>
    `;
}
