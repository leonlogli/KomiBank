import {isString, findFirstChildByClass} from '../utils';

export class MDCIconButtonToggle {
        
    constructor(selector) {
        /** @private {?Element} */
        this.root_ = isString(selector) ? document.querySelector(selector) : selector;
        /** @private {?Element} */
        this.onIcon_ = findFirstChildByClass(this.root_, 'mdc-icon-button__icon--on');
        this.on = false;
        this.root_.onclick = () => this.on = !this.on;
    }

    /*'*************************************************************************
     *                                                                         *
     *  Events Handler Methods                                                 *
     *                                                                         *
     **************************************************************************/

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
    
    get on() {
        return this.isTransitionEnabled ? this.onIcon_.style.opacity == 1
            : this.onIcon_.style.display == 'inline-block';
    }

    set on(value) {
        if(value === true) {
            if(this.isTransitionEnabled) {
                this.onIcon_.style.opacity = 1;
                this.onIcon_.nextElementSibling.style.opacity = 0;
            } 
            else {
                this.onIcon_.style.display = 'inline-block';
                this.onIcon_.nextElementSibling.style.display = 'none';
            }
            
        }
        else {
            if(this.isTransitionEnabled) {
                this.onIcon_.style.opacity = 0;
                this.onIcon_.nextElementSibling.style.opacity = 1; 
            }
            else {
                this.onIcon_.style.display = 'none';
                this.onIcon_.nextElementSibling.style.display = 'inline-block';
            }
        }
    }

    /** Returns whether transition is enabled or not */
    get isTransitionEnabled() {
        return this.onIcon_.style.position == "absolute";
    }

    /**
     * Enables fade transition between each toggle
     * @param {boolean} value 
     * @param {number} duration in second. default : 0.3
     */
    enableTransition(value, duration = 0.3) {
        if(value === true) {
            [this.onIcon_.style, this.onIcon_.nextElementSibling.style].forEach(style => {
                style.display = 'inline-block';
                style.transition = "opacity " + duration + "s linear";
                style.position = "absolute";
                style.top = style.left = "12px";
            });
        }
        else {
            [this.onIcon_.style, this.onIcon_.nextElementSibling.style].forEach(style => {
                style.removeProperty("display");
                style.removeProperty("transition");
                style.removeProperty("position");
                style.removeProperty("top");
                style.removeProperty("left");
                style.removeProperty("opacity");
            });
        }
        this.on = false;
    }

    /** @return {string} The text content of the on icon. */
    get onIcon() {
        this.listen("zeer" ,e => console.log());
        return this.onIcon_ ? this.onIcon_.textContent : null;
    }

    /** Sets the text content of the on icon. @param {string} value */
    set onIcon(value) {
        if(this.onIcon_) {
            this.onIcon_.innerHTML = value;
        }
        else {
            this.root_.insertAdjacentHTML('afterbegin',
            '<i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">' + value + '</i>');
        }
    }

    /** @return {string} The text content of the off icon. */
    get offIcon() {
        return this.onIcon_.nextElementSibling ? this.onIcon_.nextElementSibling.textContent : null;
    }

    /** Sets the text content of the off icon. @param {string} value */
    set offIcon(value) {
        if(this.onIcon_.nextElementSibling) {
            this.onIcon_.nextElementSibling.innerHTML = value;
        }
        else {
            this.root_.insertAdjacentHTML('beforeend',
                '<i class="material-icons mdc-icon-button__icon">' + value + '</i>');
        }
    }
}