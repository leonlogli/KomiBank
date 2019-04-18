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

export {
    findFirstChildByClass
};