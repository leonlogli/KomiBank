import {isString, findFirstChildByClass} from '../utils';

export class MDCButton {
        
    constructor(selector) {
        /** @private {?Element} */
        this.root_ = isString(selector) ? document.querySelector(selector) : selector;
        /** @private {?Element} */
        this.label_ = findFirstChildByClass(this.root_, "mdc-button__label");
    }

    /*'*************************************************************************
     *                                                                         *
     *  Events Handler Methods                                                 *
     *                                                                         *
     **************************************************************************/

    onclick(listener) {
        this.root_.onclick = listener;
    }

    addEventListener(type, listener, options) {
        this.root_.addEventListener(type, listener, options);
    }

    removeEventListener(type, listener, options) {
        this.root_.removeEventListener(type, listener, options);
    }

    /*'*************************************************************************
     *                                                                         *
     *  Setters and getters                                                    *
     *                                                                         *
     **************************************************************************/
    
    get text() {
        return this.label_.textContent;
    }
    
    set text(value) {
        this.this.label_.innerHTML = value;
    }

    /** @return {string} The text content of the leading icon. */
    get leadingIcon() {
        return this.label_.previousElementSibling ? this.label_.previousElementSibling.textContent : null;
    }

    /** Sets the text content of the leading icon. @param {string} value */
    set leadingIcon(value) {
        if(this.label_.previousElementSibling) {
            this.label_.previousElementSibling.innerHTML = value;
        }
        else {
            this.label_.insertAdjacentHTML('beforebegin', 
            '<i class="material-icons mdc-button__icon" aria-hidden="true">' + value + '</i>');
        }
    }

    /** @return {string} The text content of the trailing icon. */
    get trailingIcon() {
        return this.label_.nextElementSibling ? this.label_.nextElementSibling.textContent : null;
    }

    /** Sets the text content of the trailing icon. @param {string} value */
    set trailingIcon(value) {
        if(this.label_.nextElementSibling) {
            this.label_.nextElementSibling.innerHTML = value;
        }
        else {
            this.label_.insertAdjacentHTML('afterend', 
            '<i class="material-icons mdc-button__icon" aria-hidden="true">' + value + '</i>');
        }
    }


}