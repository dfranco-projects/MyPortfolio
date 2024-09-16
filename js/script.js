'use strict';

/**
 * Light & dark mode toggle functionality
 */

// Get the theme toggle button and HTML element
const $themeBtn = document.querySelector('[data-theme-btn]'); 
const $HTML = document.documentElement; 

// Determine if the user's system preference is dark mode
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set the theme based on sessionStorage or system preference
if (sessionStorage.getItem('theme')) {
    $HTML.dataset.theme = sessionStorage.getItem('theme'); // Corrected assignment
} else {
    $HTML.dataset.theme = isDark ? 'dark' : 'light';
    sessionStorage.setItem('theme', $HTML.dataset.theme);
}

const changeTheme = () => {
    // Toggle theme
    $HTML.dataset.theme = $HTML.dataset.theme === 'light' ? 'dark' : 'light';
    sessionStorage.setItem('theme', $HTML.dataset.theme);
};

// Add event listener to the theme toggle button
$themeBtn.addEventListener('click', changeTheme);

/**
 * Language switch functionality
 */

// Get the language switch button
const langBtn = document.querySelector('.lang-btn');

// Function to toggle the language
const toggleLanguage = () => {
    const currentLang = document.documentElement.getAttribute('data-lang');
    const newLang = currentLang === 'en' ? 'pt' : 'en';
    document.documentElement.setAttribute('data-lang', newLang);
    sessionStorage.setItem('language', newLang);
    setLanguage(newLang); // Update text content
};

// Set the initial language based on sessionStorage or default to English
const storedLang = sessionStorage.getItem('language') || 'en';
document.documentElement.setAttribute('data-lang', storedLang);
setLanguage(storedLang); // Ensure text is set according to stored language

// Add event listener to the language button
langBtn.addEventListener('click', toggleLanguage);

// Function to update text content based on language
function setLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
}

/**
 * Tab
 */

const $tabBtn = document.querySelectorAll('[data-tab-btn]');
let [lastActiveTab] = document.querySelectorAll('[data-tab-content]');
let [lastActiveTabBtn] = $tabBtn;

$tabBtn.forEach(item => {
    item.addEventListener('click', function () {

        lastActiveTab.classList.remove('active');
        lastActiveTabBtn.classList.remove('active'); 

        const tabContent = document.querySelector(`[data-tab-content="${item.dataset.tabBtn}"]`);

        tabContent.classList.add('active'); 
        this.classList.add('active'); 
        lastActiveTab = tabContent;
        lastActiveTabBtn = this;

    });
});


