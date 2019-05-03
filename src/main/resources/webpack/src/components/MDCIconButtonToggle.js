import {isString} from '../utils';

export class MDCIconButtonToggle {
        
    constructor(selector) {
        /** @private {?Element} */
        this.root_ = isString(selector) ? document.querySelector(selector) : selector;
        /** @private {?Element} */
        this.onIcon_ = this.root_.querySelector('.mdc-icon-button__icon--on');
        this.on = false;
        this.root_.onclick = () => this.on = !this.on;
    }

    blur() {
        this.root_.blur();
    }

    /** Create a new instance of MDCIconButtonToggle */
    static create(buttonClass, id, onIcon = 'favorite', offIcon = 'favorite_border') {
        const btn = createElement("BUTTON", "mdc-button", 
            `<i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">${onIcon}</i>
            <i class="material-icons mdc-icon-button__icon">${offIcon}</i>`);
        if(buttonClass) btn.classList.add(buttonClass);
        if(id) btn.id = id;
        return new MDCIconButtonToggle(btn);
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
            : this.onIcon_.style.display == 'block';
    }

    set on(value) {
        if(value === true) {
            if(this.isTransitionEnabled) {
                this.onIcon_.style.opacity = 1;
                this.onIcon_.nextElementSibling.style.opacity = 0;
            } 
            else {
                this.onIcon_.style.display = 'block';
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
                this.onIcon_.nextElementSibling.style.display = 'block';
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
                style.display = 'block';
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

    /** @return The text content of "on" icon. If onIcon is an SVGElement, it is returned */
    get onIcon() {
        return this.onIcon_ instanceof SVGElement ? this.onIcon_ : this.onIcon_.textContent;
    }
    
    /** Sets 'on' icon. @param value string or SVGElement */
    set onIcon(value) {
        if(value instanceof SVGElement) {
            value.setAttribute('class', value.getAttribute('class') + "mdc-icon-button__icon mdc-icon-button__icon--on");
            value.style.verticalAlign = "top";
            this.root_.replaceChild(value, this.onIcon_);
            this.onIcon_ = value;
        }
        else this.onIcon_.innerHTML = value;
    }

    /** @return The text content of "off" icon. If offIcon is an SVGElement, it is returned */
    get offIcon() {
        return this.onIcon_.nextElementSibling instanceof SVGElement ? this.onIcon_.nextElementSibling : 
            this.onIcon_.nextElementSibling.textContent;
    }

    /** Sets 'off' icon. @param value string or SVGElement*/
    set offIcon(value) {
        if(value instanceof SVGElement) {
            value.setAttribute('class', value.getAttribute('class') + "mdc-icon-button__icon");
            value.style.verticalAlign = "top";
            this.root_.replaceChild(value, this.onIcon_.nextElementSibling);
        }
        else this.onIcon_.nextElementSibling.innerHTML = value;
    }

    setIcons(onIcon, offIcon) {
        this.onIcon = onIcon;
        this.offIcon = offIcon;
    }
}