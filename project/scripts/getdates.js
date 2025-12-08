export function setCurrentYear() {
    const today = new Date();
    const yearElement = document.querySelector("#year");
    
    if (yearElement) {
        yearElement.innerHTML = today.getFullYear();
    }
}

export function setLastModified() {
    const lastModified = document.lastModified;
    const lastModifiedElement = document.querySelector("#lastModified");
    
    if (lastModifiedElement) {
        lastModifiedElement.innerHTML = lastModified;
    }
}

export function handleLastVisit() {
    const currentVisit = Date.now();
    const totalVisits = localStorage.getItem('totalVisits') || 0;
    localStorage.setItem('totalVisits', parseInt(totalVisits) + 1);
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    const lastvisitElement = document.querySelector("#lastvisit");
    
    if (!lastvisitElement) return;

    if (!lastVisitTime) {
        lastvisitElement.textContent = "Welcome to our site! This is your first visit.";
    } else {
        const timeDifference = currentVisit - parseInt(lastVisitTime);
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            lastvisitElement.textContent = `Welcome back! You last visited today. Your Total visits: ${localStorage.getItem('totalVisits') || 0}`;
        } else if (daysDifference === 1) {
            lastvisitElement.textContent = `You last visited 1 day ago. Your Total visits: ${localStorage.getItem('totalVisits') || 0}`;
        } else {
            lastvisitElement.textContent = `You last visited ${daysDifference} days ago. Your Total visits: ${localStorage.getItem('totalVisits') || 0}`;
        }
    }

    localStorage.setItem('lastVisitTime', currentVisit);
}

export function initializeDates() {
    setCurrentYear();
    setLastModified();
    handleLastVisit();
}

document.addEventListener('DOMContentLoaded', initializeDates);