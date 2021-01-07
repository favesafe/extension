const searchPrivacyPolicy = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { from: 'popup' })
    })
}

const sendFeedback = message => {
    if (message.trim() === '') return
    const url = `https://docs.google.com/forms/d/1en9dvIUrIDYZ_QpUMkGMwmh79kxpnbXxPlch1emhJwk/formResponse?entry.904419645=${message}&submit=Submit`

    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()

    xhr.onload = function() {
        if (xhr.status !== 200) {
            console.error(`Error ${xhr.status}: ${xhr.statusText}`)
        } else { // show the result
            document.getElementById('feedback').style = 'display: none;'
            document.getElementById('feedback-btn').style = 'display: none;'
            document.getElementById('feedback-label').innerText = 'Feedback sent! Thank you'
        }
    }

    xhr.onerror = function() {
        console.error('Request failed')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('listening')

    let button = document.getElementById('btn');
    button.addEventListener('click', () => searchPrivacyPolicy())

    let feedback = document.getElementById('feedback-btn')
    feedback.addEventListener('click', () => {
        const message = document.getElementById('feedback').value
        sendFeedback(message)
    })
})
