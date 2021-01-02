const searchPrivacyPolicy = () => {
    chrome.runtime.sendMessage({from: "popup"})
}

document.addEventListener('DOMContentLoaded', () => {
    let button = document.querySelector('button');
    button.addEventListener('click', () => searchPrivacyPolicy())
})