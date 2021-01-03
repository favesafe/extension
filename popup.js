const searchPrivacyPolicy = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {from: "popup"})
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let button = document.querySelector('button');
    button.addEventListener('click', () => searchPrivacyPolicy())
})