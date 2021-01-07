const findJsonUrl = (domain) => {
/* Check if we find privacy url for domain from json-file and open a new tab */
    fetch(chrome.extension.getURL('/privacy_domains_data.json'))
        .then(res => res.json())
        .then((data) => {
            privacy_policy_url = data[domain].privacy_policy_url
            chrome.tabs.create({url: privacy_policy_url})
        })
}

const openPrivacyTab = (privacy_url) => {
/* Opens privacy policy of website in a new tab */
    chrome.tabs.create({url: privacy_url})
}

const openJsonUrl = () => {
/* Checks if privacy policy url is stored in json file */
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const url = new URL(tabs[0].url);
        const domain = url.hostname.replace(/^w*.\./, '')
        findJsonUrl(domain)
    })
}

chrome.runtime.onMessage.addListener((msg, sender) => {
/* Gets privacy policy url from content script, check if url is valid else try to find url from json-file */
    if (msg.from == 'content') {
        console.log(msg.from)
        const url = msg.url
        if (url != '') openPrivacyTab(url)
        else openJsonUrl()
    }
})