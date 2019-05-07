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

/**
 * Detects that Storage is supported and also available
 * @param {string} type storage type. Ex : 'localStorage', 'sessionStorage'
 */
function isStorageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || 
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage.length !== 0;
    }
}

/** Detects that localStorage is supported and also available */
function isLocalStorageAvailable() {
    return isStorageAvailable('localStorage');
}

/** Detects that sessionStorage is supported and also available */
function isSessionStorageAvailable() {
    return isStorageAvailable('sessionStorage');
}

export {
    isString, createElement, createDIV, isSessionStorageAvailable, isLocalStorageAvailable
};