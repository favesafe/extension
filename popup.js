document.addEventListener('DomContentLoaded', () => {
    document.querySelector('button').addEventListener('click', 
        onclick, false)
    
    function onclick() {
        console.log("kkkk")
        chrome.runtime.sendMessage({
            url: window.location.href,
        })
    }
})