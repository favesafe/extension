
function goJsonUrl(path, domain) {
    fetch(chrome.extension.getURL(path))
        .then(res => res.json())
        .then(function (data) {
            privacy_policy_url = data[domain].privacy_policy_url
            chrome.tabs.create({url: privacy_policy_url})
        })
}

function findUrl(url){
    try {
        adddalert("etsi sivusta tiedo prkl")
    }
    catch(err) {
        const domain = url.replace(/^w*.\./, '')
        goJsonUrl('/privacy_domains_data.json', domain)
    }
}

chrome.runtime.onMessage.addListener(function (req,
    send, sendres){
        console.log(urk)
        findUrl(req.url)
    })