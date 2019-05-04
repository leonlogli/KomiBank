import {isString, createElement} from '../utils';

export class MDCButton {
        
    constructor(selector) {
        /** @private {?Element} */
        this.root_ = isString(selector) ? document.querySelector(selector) : selector;
        /** @private {?Element} */
        this.label_ = this.root_.querySelector(".mdc-button__label");
    }

    blur() {
        this.root_.blur();
    }

    /** Create a new instance of MDCButton */
    static create(buttonClass, id, text = 'Button') {
        const btn = createElement("BUTTON", "mdc-button", '<span class="mdc-button__label">' + text + '</span>');
        if(buttonClass) btn.classList.add(buttonClass);
        if(id) btn.id = id;
        return new MDCButton(btn);
    }

    /**  @param {string} values classes as string separated by spaces. Ex : "class1 class2" */
    addClasses(values) {
        this.root_.className = this.root_.className + ' ' + values;
    }

    /**  @param {string} values classes as string separated by spaces. Ex : "class1 class2" */
    removeClasses(...values) {
        values.forEach(cl => this.root_.classList.remove(cl));
    }

    /** 
     * Sets the variant of this button. 
     * @param {string} value Ex: raised, unelevated, outlined, dense 
     * @param {boolean} isDense default: false
     */
    variant(value, isDense = false) {
        switch (value.toUpperCase()) {
            case 'RAISED':
                if(!this.root_.classList.contains('mdc-button--raised')) {
                    this.root_.classList.add('mdc-button--raised');
                    this.removeClasses('mdc-button--outlined', 'mdc-button--unelevated');
                }                
                break;
            case 'UNELEVATED':
                if(!this.root_.classList.contains('mdc-button--unelevated')) {
                    this.root_.classList.add('mdc-button--unelevated');
                    this.removeClasses('mdc-button--outlined', 'mdc-button--raised');
                }
                break;
            case 'OUTLINED':
                if(!this.root_.classList.contains('mdc-button--outlined')) {
                    this.root_.classList.add('mdc-button--outlined');
                    this.removeClasses('mdc-button--unelevated', 'mdc-button--raised');
                }
                break;
            default: 
                this.removeClasses('mdc-button--outlined', 'mdc-button--raised', 'mdc-button--unelevated');
        }
        isDense === true ? this.addClasses('mdc-button--dense') : this.removeClasses('mdc-button--dense');
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
    
    set id(id) {
        this.root_.id = id;
    }

    get text() {
        return this.label_.textContent;
    }
    
    set text(value) {
        this.label_.innerHTML = value;
    }

    /** @return The text content of the leading icon. If leadingIcon is an SVGElement, it is returned */
    get leadingIcon() {
        const icon = this.label_.previousElementSibling;
        if(icon) {
            return icon instanceof SVGElement ? icon : icon.textContent;
        }
        else return null;
    }

    /** Sets the leading icon. @param value string or SVGElement */
    set leadingIcon(value) {
        if(value instanceof SVGElement) {
            value.setAttribute('class', value.getAttribute('class') + "mdc-button__icon");
            this.label_.previousElementSibling ? this.root_.replaceChild(value, this.label_.previousElementSibling) : 
                this.root_.insertBefore(value, this.label_);
        }
        else {
            if(this.label_.previousElementSibling) {
                this.label_.previousElementSibling.innerHTML = value;
            }
            else {
                this.label_.insertAdjacentHTML('beforebegin', 
                    '<i class="material-icons mdc-button__icon" aria-hidden="true">' + value + '</i>');
            }
        }
        
    }

    /** @return The text content of the trailing icon. If trailing is an SVGElement, it is returned */
    get trailingIcon() {
        const icon = this.label_.nextElementSibling;
        if(icon) {
            return icon instanceof SVGElement ? icon : icon.textContent;
        }
        else return null;
    }

    /** Sets the text content of the trailing icon. @param value string or SVGElement */
    set trailingIcon(value) {
        if(value instanceof SVGElement) {
            value.setAttribute('class', value.getAttribute('class') + "mdc-button__icon");
            this.label_.nextElementSibling ? this.root_.replaceChild(value, this.label_.nextElementSibling) : 
                this.root_.appendChild(value);
        }
        else {
            if(this.label_.nextElementSibling) {
                this.label_.nextElementSibling.innerHTML = value;
            }
            else {
                this.label_.insertAdjacentHTML('afterend', 
                    '<i class="material-icons mdc-button__icon" aria-hidden="true">' + value + '</i>');
            }
        }
    }
}