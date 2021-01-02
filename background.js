
const findJsonUrl = (domain) => {
/* Check if we find privacy url for domain from json-file and open a new tab */
    fetch(chrome.extension.getURL('/privacy_domains_data.json'))
        .then(res => res.json())
        .then((data) => {
            privacy_policy_url = data[domain].privacy_policy_url
            chrome.tabs.create({url: privacy_policy_url})
        })
}

/* 
Tiedetyt bugit: Jos avaat esim 1. Grammarly.com 2. hm.com ja siirryt hm jälkeen grammarlyyn
Avaa se hm.comin privacy policyn, sillä content.js loadaa ainoastaan kerran ja viimesimmän sivun arvo 
tallennetaan scraped url
*/

const openPrivacyTab = () => {
    chrome.tabs.create({url: scraped_url})
}

const openJsonUrl = () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const url = new URL(tabs[0].url);
        const domain = url.hostname.replace(/^w*.\./, '')
        findJsonUrl(domain)
    })
}


/* This is a scraped privacy policy url from content.js */ 
let scraped_url;

chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.from == 'content') {
        console.log('background row 28')
        console.log(msg.links)
        scraped_url = msg.links
    }

    if (msg.from == 'popup') {
        if (scraped_url != '') openPrivacyTab()
        else openJsonUrl()
    }
})