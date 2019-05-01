/**
 * Find the first instance of a descendant parent with the class childClassName
 * @param {Element} parent the parent element
 * @param {String} childClassName the class name of the child to find
 * @return {Element} The first child that matches the specified class name
 */
function findFirstChildByClass(parent, childClassName) {
    let foundChild = null;

    function recurse(_parent, _childClassName, found) {
        for (let i = 0; i < _parent.childNodes.length && !found; i++) {
            const child = _parent.childNodes[i];
            const classes = child.className != undefined ? child.className.split(" ") : [];

            for (let j = 0; j < classes.length; j++) {
                if (classes[j] == _childClassName) {
                    found = true;
                    foundChild = _parent.childNodes[i];
                    break;
                }
            }

            if (found)
                break;
            recurse(_parent.childNodes[i], _childClassName, found);
        }
    }

    recurse(parent, childClassName, false);
    return foundChild;
}

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
        element.innerHTML = '<div class="mdc-card__action-buttons"></div><div class="mdc-card__action-icons"></div>';
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
    findFirstChildByClass, isString, createElement, createDIV
};