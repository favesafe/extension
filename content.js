window.onload= () => findPrivacyLink();
let privacyPage;

const findPrivacyLink = () => {
    /* Get all links in a document */
    const links = Array.from(document.links);
    const privacyLinks = links.filter(containsPrivacy);

    // Ruma scripti jolla testasin content.js toimivuutta
    if (privacyLinks.length > 1){
        privacyPage = privacyLinks[0].href
    }
    console.log(privacyPage)
}

const containsPrivacy = (item) => {
    /* Helper function for checking if link items href or innertext has the string "privacy" in it */

    const href = item.href.match(/privacy/i);
    const innerText = item.innerText.match(/privacy/i);

    return  href || innerText
}

chrome.runtime.onMessage.addListener((msg, sender) => {
    /* When user clicks popup button, this sends a privacy policy url of this tab to background script */
    
    if(msg.from == "popup"){
        chrome.runtime.sendMessage({
            from: "content",
            url: privacyPage
        })
    }
})
