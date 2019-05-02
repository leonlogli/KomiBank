/**
 * Creates an instance of the element for the specified tag.
 * @param {string} tagName The name of an element.
 * @param {string} classes classes as string separated by spaces. Ex : "class1 class2"
 * @param {string} innerHTML innerHTML of the element.
 * @param {...Element} childs childs to append to the element.
 * @return {Element} the created element
 */
function createElement(tagName, classes, innerHTML, ...childs) {
    const element = document.createElement(tagName);
    element.className = classes;
    if(innerHTML) {
        element.innerHTML = innerHTML;
    }
    childs.forEach(child => {
        if(child instanceof Node) {
            element.appendChild(child);
        }
    });
    return element;
}

/**
 * Creates an instance of the element for DIV tag.
 * @param {string} classes classes as string separated by spaces. Ex : "class1 class2"
 * @param {string} innerHTML innerHTML of the element.
 * @param {...Element} childs childs to append to the element.
 * @return {Element} the created element
 */
function createDIV(classes, innerHTML, ...childs) {
    return createElement("DIV", classes, innerHTML, childs);
}

/**
 * Check if the specified object is a String
 * @return {Boolean} true if the specified object is a String, false otherise
 */
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

export {
    isString, createElement, createDIV
};