//check if URL is valid

function checkIfURL(inputText) {
    const text =/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return text.test(inputText)
}

export { checkIfURL }
