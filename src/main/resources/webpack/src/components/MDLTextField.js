import {isString} from '../utils';

export class MDLTextField {
        
    constructor(selector) {
        /** @private {?Element} */
        this.root_ = isString(selector) ? document.querySelector(selector) : selector;
        /** @private {?Element} */
        this.input_ = this.root_.querySelector(".mdl-textfield__input");
         /** @private {?Element} */
         this.label_ = this.root_.querySelector(".mdl-textfield__label");
        /** @private {?Element} */
        this.leadingIcon_ = this.root_.querySelector(".leading-icon");
        /** @private {?Element} */
        this.trailingIcon_ = this.root_.querySelector(".trailing-icon");

        // check if the field has clear-icon class
        if (this.trailingIcon_ && this.trailingIcon_.classList.contains('clear-icon')) {
            /** @private {?string} stores the initial trailingIcon before setting the input clear-icon */ 
            this.initialTrailingIcon_ = this.trailingIcon;
            /** @private {?string} */
            this.clearIcon = 'clear';
            this.setClearable();
        }
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
        if (this.initialTrailingIcon_ !== undefined) {
            this.trailingIcon = this.clearIcon ? this.clearIcon : 'clear';
            this.trailingIcon_.classList.add('clear-icon');
        } 
        else this.trailingIcon_.style.display = 'inline-block';
        // Set clearIcon click handler
        this.trailingIcon_.onclick = this._clearIconClickHandler();
    }

    hideClearIcon() {
        if (this.initialTrailingIcon_ !== undefined) {
            this.trailingIcon = this.initialTrailingIcon_;
            this.trailingIcon_.classList.remove('clear-icon');
        } 
        else this.trailingIcon_.style.display = 'none';
        // Cancel clearIcon click handler
        this.trailingIcon_.onclick = null;
    }

    /** Sets the  mdl input clearable (by setting clear-icon as the trailing icon) */
    setClearable() {
        if (!this.value) {
            this.hideClearIcon();
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

    /** @return {string} The text content of the leading icon. */
    get leadingIcon() {
        return this.leadingIcon_.innerHTML;
    }

    /** Sets the text content of the leading icon. @param {string} value */
    set leadingIcon(value) {
        this.leadingIcon_.innerHTML = value;
    }

    /** @return {string} The text content of the trailing icon. */
    get trailingIcon() {
        return this.trailingIcon_.innerHTML;
    }

    /** Sets the text content of the trailing icon. @param {string} value */
    set trailingIcon(value) {
        this.trailingIcon_.innerHTML = value;
        if(value !== this.clearIcon) this.initialTrailingIcon_ = value;
    }
}