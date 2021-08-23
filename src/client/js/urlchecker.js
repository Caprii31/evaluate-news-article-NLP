function checkForUrl(formText) {
    const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    const regex = new RegExp(pattern)  
    let t = formText;

    return t.match(regex) != null;
}

export { checkForUrl }
