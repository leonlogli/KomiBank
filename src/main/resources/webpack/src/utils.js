import {MDCSnackbar} from '@material/snackbar/index';

/**
 * Global Status Snake bar
 */
const statusBar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));

/**
 * Media Query for screens < 576px
 */
const mqExtraSmall = window.matchMedia("(max-width: 576px)");
/**
 * Media Query for screens ≥ 576px
 */
const mqSmall = window.matchMedia("(min-width: 576px)");
/**
 * Media Query for screens ≥768px
 */
const mqMedium = window.matchMedia("(min-width: 768px)");
/**
 * Media Query for screens ≥992px
 */
const mqLarge = window.matchMedia("(min-width: 992px)");
/**
 * Media Query for screens ≥1200px
 */
const mqExtraLarge = window.matchMedia("(min-width: 1200px)");

/**
 * Listen to the given media query and run the specified callback function each time the query matches
 */
function addMediaQueryListener(query, callback) {
    switch (query) {
        case mqExtraSmall.media:
        case mqExtraSmall:
            _mq(mqExtraSmall);
            break;
        case mqSmall.media:
        case mqSmall:
            _mq(mqSmall);
            break;
        case mqMedium.media:
        case mqMedium:
            _mq(mqMedium);
            break;
        case mqLarge.media:
        case mqLarge:
            _mq(mqLarge);
            break;
        case mqExtraLarge.media:
        case mqExtraLarge:
            _mq(mqExtraLarge);
            break;
        default:
            _mq(query instanceof MediaQueryList ? query : window.matchMedia(query));
    }

    function _mq(media) {
        callback.apply(undefined, [media.matches, media.media]);
        media.addListener(function (mq) {
            callback.apply(undefined, [mq.matches, mq.media]);
        });
    }
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
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    childs.forEach(child => {
        if (child instanceof Node) {
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
    } catch (e) {
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

/** toggle navbar class when it scrolles at top*/
function toggleNavBarClass(e) {
    const navbar = document.querySelector("#main-menu");
    if(window.pageYOffset == 0) {
        navbar.classList.add('navbar-at-top');
    }
    else navbar.classList.remove('navbar-at-top');
};

export {
    isString,
    createElement,
    createDIV,
    isSessionStorageAvailable,
    isLocalStorageAvailable,
    mqExtraSmall,
    mqSmall,
    mqMedium,
    mqLarge,
    mqExtraLarge,
    addMediaQueryListener,
    statusBar,
    toggleNavBarClass
};