window.onload= () => findPrivacyLink();

const findPrivacyLink = () => {
    /* Get all links in a document */
    const links = Array.from(document.links);
    const privacyLinks = links.filter(containsPrivacy);

    // Ruma scripti jolla testasin content.js toimivuutta
    let privacyPage;
    if (privacyLinks.length > 1){
        privacyPage = privacyLinks[0].href
    }else{
        privacyPage = ''
    }
    console.log(privacyPage)

    // Testing with only one link
    chrome.runtime.sendMessage({
        from: "content",
        links: privacyPage
    })

    /*chrome.runtime.sendMessage({
        message: "links",
        payload: {
            linksFound: privacyLinks.length > 0,
            links: privacyLinks
        }
    });*/
}

const containsPrivacy = (item) => {
    /* Helper function for checking if link items href or innertext has the string "privacy" in it */

    const href = item.href.match(/privacy/i);
    const innerText = item.innerText.match(/privacy/i);

    return  href || innerText
}

