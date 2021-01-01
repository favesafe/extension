window.onload=() => findPrivacyLink();


const findPrivacyLink = () => {
    /* Get all links in a document */
    console.log("start search")
    const links = Array.from(document.links);

    const privacyLinks = links.filter(containsPrivacy);

    console.log(privacyLinks);
    chrome.runtime.sendMessage({
        message: "links",
        payload: {
            linksFound:privacyLinks.length > 0,
            links: privacyLinks
        }
    });
}

const containsPrivacy = (item) => {
    /* Helper function for checking if link items href or innertext has the string "privacy" in it */

    const href = item.href.match(/privacy/i);
    const innerText = item.innerText.match(/privacy/i);

    return  href || innerText
}