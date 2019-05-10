import {MDCTextField as _MDCTextField} from '@material/textfield/index';
import {isString, createDIV, createElement} from '../utils';

export class MDCTextField extends _MDCTextField {
    constructor(selector) {
        super(isString(selector) ? document.querySelector(selector) : selector);
        this.inputEl_ = this.input_;
        if(this.leadingIcon_) {
            this.leadingIconEl_ = this.leadingIcon_.root_;
            this.leadingIconEl_.classList.add('leading-icon');
        }
        if(this.trailingIcon) {
            this.trailingIconEl_ = this.trailingIcon_.root_;
            this.trailingIconEl_.classList.add('trailing-icon');
        }
        if(this.helperText_) this.helperTextEl_ = this.helperText_.root_;
        if(this.label_) this.labelEl_ = this.label_.root_;
        
        /** @private {?string} stores the initial trailingIcon before setting the input clear-icon */ 
        this.initialTrailingIcon_ = this.trailingIcon;
        this.clearIcon = 'clear';

        this.setAttribute('autocomplete', "off"); // By default, disable input autocomplete
    }

    static create(variant, fieldClass, id, name) {
        let field;
        if(variant && value.toUpperCase() == "OUTLINED") {
            field = createDIV("mdc-text-field mdc-text-field--outlined",
                `<input type="text" name=${name} class="mdc-text-field__input">
                <div class="mdc-notched-outline">
                  <div class="mdc-notched-outline__leading"></div>
                  <div class="mdc-notched-outline__notch">
                    <label class="mdc-floating-label">Your Name</label>
                  </div>
                  <div class="mdc-notched-outline__trailing"></div>
                </div>`);
        }
        else if(variant && value.toUpperCase() == "TEXTAREA") {
            field = createDIV("mdc-text-field mdc-text-field--textarea",
                `<textarea name=${name} class="mdc-text-field__input" rows="8" cols="40"></textarea>
                <div class="mdc-notched-outline">
                  <div class="mdc-notched-outline__leading"></div>
                  <div class="mdc-notched-outline__notch">
                    <label class="mdc-floating-label">Textarea Label</label>
                  </div>
                  <div class="mdc-notched-outline__trailing"></div>
                </div>`);
        }
        else {
            field = createDIV("mdc-text-field",
                `<input type="text" name=${name} class="mdc-text-field__input">
                <label class="mdc-floating-label">Label</label>
                <div class="mdc-line-ripple"></div>`);
        }
        if(fieldClass) field.className = field.className + ' ' + fieldClass;
        if(id) field.id = id;
        return new MDCTextField(field);
    }
    
    _toIcon(value, iconClass) {
        const valueIcon = createElement("i", `material-icons mdc-text-field__icon ${iconClass}`, value);
        valueIcon.setAttribute('tabindex', 0);
        valueIcon.setAttribute('role', "button");
        return valueIcon;
    }

    /**  @param {string} values classes as string separated by spaces. Ex : "class1 class2" */
    removeClasses(...values) {
        values.forEach(cl => this.root_.classList.remove(cl));
    }

    /*'*************************************************************************
     *                                                                         *
     *  Clear Icon Handling Methods                                            *
     *                                                                         *
     **************************************************************************/

    /** @private Handler to call when clear icon is shown */
    _clearIconClickHandler() {
        return () => {
            if(this.trailingIcon == this.clearIcon) { // if clearIcon is shown
                this.value = "";
                if(this.labelEl_) this.labelEl_.classList.remove('mdc-floating-label--float-above');
                this.hideClearIcon();
            }
        }; 
    }

    showClearIcon() {
        if(this.trailingIconEl_) {
            if(this.initialTrailingIcon_) {
                this.trailingIcon = this.clearIcon ? this.clearIcon : 'clear';
            } 
            else this.trailingIconEl_.style.display = 'inline-block';
            this.trailingIconEl_.onclick = this._clearIconClickHandler(); // Set clearIcon click handler
        }
    }

    hideClearIcon() {
        if(this.trailingIconEl_) {
            if(this.initialTrailingIcon_) {
                this.trailingIcon = this.initialTrailingIcon_;
            } 
            else  this.trailingIconEl_.style.display = 'none';
            this.trailingIconEl_.onclick = null; // Cancel clearIcon click handler
        }  
    }

    /** Sets the  mdl input clearable (by setting clear-icon as the trailing icon) */
    setClearable() {
        if (!this.initialTrailingIcon_) {
            this.trailingIcon = this.clearIcon ? this.clearIcon : 'clear';
            this.hideClearIcon();
        } 
        if(!this.root_.classList.contains("mdc-text-field--with-trailing-icon")) {
            this.root_.classList.add("mdc-text-field--with-trailing-icon");
        }
        this.inputEl_.addEventListener('blur', e => {
            if(this.trailingIconEl_ && !this.trailingIconEl_.matches(':hover')) {
                this.hideClearIcon();
            }
        });
        ['focus', 'input'].forEach(item => this.inputEl_.addEventListener(item, () => {
            this.value ? this.showClearIcon() : this.hideClearIcon();
        }));
    }
    
    /*'*************************************************************************
     *                                                                         *
     *  Events Handler Methods                                                 *
     *                                                                         *
     **************************************************************************/

    addEventListener(type, listener, options) {
        this.inputEl_.addEventListener(type, listener, options);
    }

    removeEventListener(type, listener, options) {
        this.inputEl_.removeEventListener(type, listener, options);
    }

    addLeadingIconEventListener(type, listener, options) {
        this.leadingIcon_.addEventListener(type, listener, options);
    }

    removeLeadingIconEventListener(type, listener, options) {
        this.leadingIcon_.removeEventListener(type, listener, options);
    }

    addTrailingIconEventListener(type, listener, options) {
        this.trailingIconEl_.addEventListener(type, e => {
            if(this.trailingIcon != this.clearIcon) { // if clearIcon is not shown
                listener(e);
            }
        }, options);
    }

    removeTrailingIconEventListener(type, listener, options) {
        this.trailingIconEl_.removeEventListener(type, listener, options);
    }

    /*'*************************************************************************
     *                                                                         *
     *  Setters and getters                                                    *
     *                                                                         *
     **************************************************************************/

    /** @return The text content of the leading icon. If leadingIcon is an SVGElement, it is returned */
    get leadingIcon() {
        const icon = this.inputEl_.previousElementSibling;
        if(icon) {
            return icon instanceof SVGElement ? icon : icon.textContent;
        }
        else return null;
    }
    
    /** Sets the leading icon. @param value string or SVGElement*/
    set leadingIcon(value) {
        const icon = this.inputEl_.previousElementSibling;
        if(value instanceof SVGElement) {
            value.setAttribute('class', value.getAttribute('class') + " mdc-text-field__icon leading-icon");
            icon ? this.root_.replaceChild(value, icon) : this.root_.insertBefore(value, this.inputEl_);
        }
        else {
            const valueIcon = this._toIcon(value, "leading-icon");
            if(icon) {
                icon instanceof SVGElement ? this.root_.replaceChild(valueIcon, icon) : icon.innerHTML = value;
            }
            else {
                icon instanceof SVGElement ? this.root_.insertBefore(value, this.inputEl_) :
                    this.root_.insertBefore(valueIcon, this.inputEl_);
            }
        }
        if(!this.root_.classList.contains("mdc-text-field--with-leading-icon")) {
            this.root_.classList.add("mdc-text-field--with-leading-icon");
        }
        this.leadingIconEl_ = this.root_.querySelector(".leading-icon");
    }

    /** @return The text content of the trailing icon. If trailing is an SVGElement, it is returned */
    get trailingIcon() {
        const icon = this.root_.querySelector(".trailing-icon");
        if(icon) {
            return icon instanceof SVGElement ? icon : icon.textContent;
        }
        else return null;
    }

    /** Sets the text content of the trailing icon. @param value string or SVGElement */
    set trailingIcon(value) {
        const icon = this.root_.querySelector(".trailing-icon");
        if(value instanceof SVGElement) {
            value.setAttribute('class', value.getAttribute('class') + " mdc-text-field__icon trailing-icon");
            icon ? this.root_.replaceChild(value, icon) : this.root_.appendChild(value);
        }
        else {
            const valueIcon = this._toIcon(value, "trailing-icon");
            if(icon) {
                icon instanceof SVGElement ? this.root_.replaceChild(valueIcon, icon) : icon.innerHTML = value;
            }
            else {
                icon instanceof SVGElement ? this.root_.appendChild(value) : this.root_.appendChild(valueIcon);
            }
        }
        if(!this.root_.classList.contains("mdc-text-field--with-trailing-icon")) {
            this.root_.classList.add("mdc-text-field--with-trailing-icon");
        }
        this.trailingIconEl_ = this.root_.querySelector(".trailing-icon");
        if(value == this.clearIcon) {
            this.trailingIconEl_.classList.add('clear-icon');
        }
        else {
            this.initialTrailingIcon_ = value;
            this.trailingIconEl_.classList.remove('clear-icon');
        }
    }
    
    /**
     * @return {string} The helper text element content.
     */
    get helperText() {
        return this.helperTextEl_ ? this.helperTextEl_.querySelector('.mdc-text-field-helper-text').innerHTML :  null;
    }

    set helperText(value) {
        if(this.root_.nextElementSibling && this.root_.nextElementSibling.classList.contains('mdc-text-field-helper-line')) {
            this.root_.nextElementSibling.querySelector('.mdc-text-field-helper-text').innerHTML = value;
        }
        else {
            this.root_.insertAdjacentHTML('afterend', 
                `<div class="mdc-text-field-helper-line">
                    <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">${value}</div>
                </div>`);
        }
        if(this.root_.nextElementSibling && this.root_.nextElementSibling.classList.contains('mdc-text-field-helper-line')) {
            this.helperTextEl_ = this.root_.nextElementSibling;
        }
    }
 
    get isHelperTextShown() {
        return this.helperTextEl_ && this.helperTextEl_.classList.contains('.visible');
    }

    showHelperText(value) {
        if(this.helperTextEl_) {
            if(value == true) {
                if(!this.helperTextEl_.classList.contains('visible')) this.helperTextEl_.classList.add('visible');
                this.helperTextEl_.classList.remove('invisible');
            }
            else {
                if(!this.helperTextEl_.classList.contains('invisible')) this.helperTextEl_.classList.add('invisible');
                this.helperTextEl_.classList.remove('visible');
            }
        }
    }

    get labelText() {
        return this.labelEl_ ? this.labelEl_.innerHTML : null;
    }

    set labelText(value) {
        this.labelEl_.innerHTML = value;
    }

    setAttribute(name, value) {
        if(this.inputEl_) this.inputEl_.setAttribute(name, value);
    }

    getAttribute(name) {
        return this.inputEl_ ? this.inputEl_.getAttribute(name) : null;
    }

    hasAttribute(name) {
        return this.inputEl_ ? this.inputEl_.hasAttribute(name) : false;
    }

    removeAttribute(name) {
        if(this.inputEl_) this.inputEl_.removeAttribute(name);
    }
}