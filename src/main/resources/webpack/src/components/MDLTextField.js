import {isString, createDIV, createElement} from '../utils';

export class MDLTextField {
        
    constructor(selector) {
        this.root_ = isString(selector) ? document.querySelector(selector) : selector;
        this.input_ = this.root_.querySelector(".mdl-textfield__input");
        this.label_ = this.root_.querySelector(".mdl-textfield__label");
        this.leadingIcon_ = this.root_.querySelector(".leading-icon");
        this.trailingIcon_ = this.root_.querySelector(".trailing-icon");
        
        /** @private {?string} stores the initial trailingIcon before setting the input clear-icon */ 
        this.initialTrailingIcon_ = this.trailingIcon;
        this.clearIcon = 'clear';

        this.setAttribute('autocomplete', "off"); // By default, disable input autocomplete
    }

    static create(fieldClass, id, name) {
        const field = createDIV("mdl-textfield mdl-js-textfield mdl-textfield--floating-label",
                `<input type="text" name=${name} class="mdl-textfield__input">
                <label class="mdl-textfield__label" style="margin-bottom: 0">Label</label>
                <div class="mdc-line-ripple"></div>`);
        if(fieldClass) field.className = field.className + ' ' + fieldClass;
        if(id) field.id = id;
        return new MDLTextField(field);
    }

    _toIcon(value, iconClass) {
        const valueIcon = createElement("i", `material-icons mdl-textfield__icon ${iconClass}`, value);
        valueIcon.setAttribute('tabindex', 0);
        valueIcon.setAttribute('role', "button");
        return valueIcon;
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
                this.value = null;
                this.root_.classList.remove('is-dirty');
                this.hideClearIcon();
            }
        }; 
    }

    showClearIcon() {
        if(this.trailingIcon_) {
            if(this.initialTrailingIcon_) {
                this.trailingIcon = this.clearIcon ? this.clearIcon : 'clear';
            } 
            else this.trailingIcon_.style.display = 'inline-block';
            this.trailingIcon_.onclick = this._clearIconClickHandler(); // Set clearIcon click handler
        }
    }

    hideClearIcon() {
        if(this.trailingIcon_) {
            if(this.initialTrailingIcon_) {
                this.trailingIcon = this.initialTrailingIcon_;
            } 
            else  this.trailingIcon_.style.display = 'none';
            this.trailingIcon_.onclick = null; // Cancel clearIcon click handler
        }
    }

    /** Sets the  mdl input clearable (by setting clear-icon as the trailing icon) */
    setClearable() {
        if (!this.initialTrailingIcon_) {
            this.trailingIcon = this.clearIcon ? this.clearIcon : 'clear';
            this.hideClearIcon();
        } 
        if(!this.root_.classList.contains("mdl-text-field--with-trailing-icon")) {
            this.root_.classList.add("mdl-text-field--with-trailing-icon");
        }
        this.input_.addEventListener('blur', e => {
            if (!this.trailingIcon_.matches(':hover')) {
                this.hideClearIcon();
            }
        });
        ['focus', 'input'].forEach(item => this.input_.addEventListener(item, () => {
            this.value ? this.showClearIcon() : this.hideClearIcon();
        }));
    }
    
    /*'*************************************************************************
     *                                                                         *
     *  Events Handler Methods                                                 *
     *                                                                         *
     **************************************************************************/

    get onchange() {
        return this.input_.onchange
    }

    set onchange(listener) {
        this.input_.onchange = listener;
    }

    addEventListener(type, listener, options) {
        this.input_.addEventListener(type, listener, options);
    }

    removeEventListener(type, listener, options) {
        this.input_.removeEventListener(type, listener, options);
    }

    addLeadingIconEventListener(type, listener, options) {
        this.leadingIcon_.addEventListener(type, listener, options);
    }

    removeLeadingIconEventListener(type, listener, options) {
        this.leadingIcon_.removeEventListener(type, listener, options);
    }

    addTrailingIconEventListener(type, listener, options) {
        this.trailingIcon_.addEventListener(type, e => {
            if(this.trailingIcon != this.clearIcon) { // if clearIcon is not shown
                listener(e);
            }
        }, options);
    }

    removeTrailingIconEventListener(type, listener, options) {
        this.trailingIcon_.removeEventListener(type, listener, options);
    }

    /***************************************************************************
     *                                                                         *
     *  Setters and getters                                                    *
     *                                                                         *
     **************************************************************************/

    /** @return {string} The value of the input. */
    get value() {
        return this.input_.value;
    }

    /** @param {string} value The value to set on the input. */
    set value(value) {
        this.input_.value = value;
        if(!value) this.root_.classList.remove('is-dirty');
    }

    get labelText() {
        return this.label_ ? this.label_.innerHTML : null;
    }

    set labelText(value) {
        this.label_.innerHTML = value;
    }

    get errorText() {
        const errorEl_ = this.root_.querySelector('.mdl-textfield__error');
        return errorEl_ ? errorEl_.innerHTML : null;
    }

    set errorText(value) {
        const errorEl_ = this.root_.querySelector('.mdl-textfield__error');
        if(errorEl_) {
            errorEl_.innerHTML = value;
        }
        else this.root_.appendChild(createElement("SPAN", "mdl-textfield__error", value));
    }

    get isErrorShown() {
        return this.root_.querySelector('.mdl-textfield__error.visible') != null;
    }

    showError(value) {
        const errorEl_ = this.root_.querySelector('.mdl-textfield__error');
        if(errorEl_) {
            if(value == true) {
                if(!errorEl_.classList.contains('visible')) errorEl_.classList.add('visible');
                errorEl_.classList.remove('invisible');
            }
            else {
                if(!errorEl_.classList.contains('invisible')) errorEl_.classList.add('invisible');
                errorEl_.classList.remove('visible');
            }
        }
    }

    /** @return {string} The text content of the leading icon. */
    get leadingIcon() {
        return this.leadingIcon_ ? this.leadingIcon_.innerHTML : null;
    }

    /** Sets the text content of the leading icon. @param {string} value */
    set leadingIcon(value) {
        if(this.leadingIcon_) {
            this.leadingIcon_.innerHTML = value;
        }
        else {
            this.leadingIcon_ = this._toIcon(value, "leading-icon");
            if(this.trailingIcon) {
                this.root_.insertBefore(this.leadingIcon_, this.trailingIcon_);
            }
            else this.root_.appendChild(this.leadingIcon_);
        }
        if(!this.root_.classList.contains("mdl-textfield--with-leading-icon")) {
            this.root_.classList.add("mdl-textfield--with-leading-icon");
        }
    }

    /** @return {string} The text content of the trailing icon. */
    get trailingIcon() {
        return this.trailingIcon_ ? this.trailingIcon_.innerHTML : null;
    }

    /** Sets the text content of the trailing icon. @param {string} value */
    set trailingIcon(value) {
        if(this.trailingIcon_) {
            this.trailingIcon_.innerHTML = value;
        }
        else {
            this.trailingIcon_ = this._toIcon(value, "trailing-icon");
            this.root_.appendChild(this.trailingIcon_);
        }
        
        if(!this.root_.classList.contains("mdl-textfield--with-trailing-icon")) {
            this.root_.classList.add("mdl-textfield--with-trailing-icon");
        }
        if(value == this.clearIcon) {
            this.trailingIcon_.classList.add('clear-icon');
        }
        else {
            this.initialTrailingIcon_ = value;
            this.trailingIcon_.classList.remove('clear-icon');
        }
    }
    
    setAttribute(name, value) {
        if(this.input_) this.input_.setAttribute(name, value);
    }
    
    getAttribute(name) {
        return this.input_ ? this.input_.getAttribute(name) : null;
    }

    hasAttribute(name) {
        return this.input_ ? this.input_.hasAttribute(name) : false;
    }

    removeAttribute(name) {
        if(this.input_) this.input_.removeAttribute(name);
    }
}