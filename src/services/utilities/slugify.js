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
                    const [elementArray, elementArrayLength] = [element.split(""), element.split("").length]
                    
                    if ( arrayContainsElementsOfAnother( elementArray, forbiddenCharacters ) && elementArrayLength !== 1 ) {
                        return elementArray.filter(c => !forbiddenCharacters.includes(c)).join("")
                    } else if ( arrayContainsElementsOfAnother( elementArray, forbiddenCharacters ) && elementArrayLength === 1 ) {
                        return '';
                    } else {
                        return element;
                    }
                }).filter(c => c).join("-");
    
    return slug;
}

/* ---------- */

export default slugify;
