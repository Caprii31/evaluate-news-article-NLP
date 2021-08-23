function handleSubmit(event) {
    event.preventDefault()
    errorMsg.innerHTML = ''
    let urlInput = document.getElementById('url').value

    let input = {
        url: encodeURI(urlInput)
    }
    console.log(input)
    if (Client.checkForUrl(urlInput)) {
        postData('/analysis', input)
    } else {
        console.log('invalid URL')
        displayErrorMsg()
    }
};

function displayErrorMsg() {
    let message = "<p>The URL is invalid. Make sure the URL is correct, and try again.</p>"
    let errorMsg = document.getElementById("errorMsg");
    errorMsg.innerHTML = message;
};

// postData is going to be used to post any data to the server

async function postData(url, data) {

    const response = await fetch('http://localhost:8081' + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const analysis = await response.json();
        displayAnalysis(analysis)
    } catch (error) {
        console.log("error", error);
    }
}

function displayAnalysis(data) {
    console.log(data)
    console.log(data.agreement);
    console.log(data.confidence);
    console.log(data.irony);
    console.log(data.model);
    console.log(data.score_tag);

    document.getElementById("model").innerHTML = `<p> Model: ${data.model}</p>`;
    document.getElementById("score_tag").innerHTML = `<p> Score tag: ${data.score_tag}</p>`;
    document.getElementById("agreement").innerHTML = `<p> Agreement: ${data.agreement}</p>`;
    document.getElementById("subjectivity").innerHTML = `<p> Subjectivity: ${data.subjectivity}</p>`;
    document.getElementById("confidence").innerHTML = `<p> Confidence: ${data.confidence}</p>`;
    document.getElementById("irony").innerHTML = `<p> Irony: ${data.irony}</p>`;
}

export { handleSubmit };
