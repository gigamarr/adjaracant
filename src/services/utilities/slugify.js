function arrayContainsElementsOfAnother(arrayOne, arrayTwo) {
    return arrayOne.filter(c => arrayTwo.indexOf(c) !== -1)
}


function slugify(title) {
    const forbiddenCharacters = [
                                    "'", "\"", "\\", "/", "!", 
                                    "@", "#", "$", "%", "^", 
                                    "&", "*", "(", ")", "_", 
                                    "+", "{", "}", "?", ",", 
                                    ".", "<", ">", ":", ";", 
                                    "|", "[", "]"
                                ]
    const titleArray = title.toLowerCase().split(" ")

    const slug = titleArray.map(element => {
                    if ( arrayContainsElementsOfAnother( element.split(""), forbiddenCharacters ) && element.split("").length !== 1 ) {
                        return element.split("").filter(c => !forbiddenCharacters.includes(c)).join("")
                    } else if ( arrayContainsElementsOfAnother( element.split(""), forbiddenCharacters ) && element.split("").length === 1 ) {
                        return '';
                    } else {
                        return element;
                    }
                }).filter(c => c).join("-");
    
    return slug;
}

/* ---------- */

export default slugify;