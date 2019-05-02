import {MDCButton} from './MDCButton';
import {isString, createElement, createDIV} from '../utils';

export class MDCCard {
        
    constructor(selector) {
        /** @private {?Element} */
        this.root_ = isString(selector) ? document.querySelector(selector) : selector;
        if(!this.root_) {
            this.root_ = MDCCard._buildRoot(null, null, true, true);
        }
        /** @private {?string} stores selector to set default id of collapsible element (when it is defined) */
        this.selector_ = isString(selector) ? selector : this.root_.className;
        /** @private {?Element} */
        this.title_ = this.root_.querySelector(".title");
        /** @private {?Element} */
        this.textEl_ = this.root_.querySelector(".card-text");
        /** @private {?Element} */
        this.media_ = this.root_.querySelector(".mdc-card__media");
        /** @private {?Element} */
        this.primaryAction_ = this.root_.querySelector(".mdc-card__primary-action");
        /** @private {?Element} */
        this.actionButtons_ = this.root_.querySelector(".mdc-card__action-buttons");
        /** @private {?Element} */
        this.actionIcons_ = this.root_.querySelector(".mdc-card__action-icons");
        /** @private {?Element} */
        this.actions_ = this.root_.querySelector(".mdc-card__actions");
        /** @private {?Element} */
        this.collapsibleEl_ = this.root_.querySelector(".collapse");
    }

    /** @private */
    static _buildRoot(cardClass, id, withPrimaryAction, withMedia, withFooterAction) {
        const card = createDIV("mdc-card");
        if(withPrimaryAction == true) {
            card.innerHTML = '<div class="mdc-card__primary-action"></div>'
        }
        if(withMedia == true) {
            const mediaEl = createDIV("mdc-card__media mdc-card__media--16-9");
            if(withPrimaryAction == true) {
                card.querySelector(".mdc-card__primary-action").appendChild(mediaEl);
            }
            else card.appendChild(mediaEl);
        }
        if(withFooterAction == true) {
            const actionsEl = createDIV('mdc-card__actions', 
                '<div class="mdc-card__action-buttons"></div><div class="mdc-card__action-icons"></div>');
            card.appendChild(actionsEl);
        }
        if(cardClass) card.className = card.className + ' ' + cardClass;
        if(id) card.id = id;
        return card;
    }
    
    /** @private */
    _mapCollapseTo(element) {
        element.setAttribute('data-toggle', "collapse");
        element.setAttribute('data-target', "#" + this.collapsibleEl_.id);
        element.setAttribute('aria-expanded', "false");
        element.setAttribute('aria-controls', this.collapsibleEl_.id);
        new Collapse(element);
    }

    static create(cardClass, id, withPrimaryAction, withMedia, withFooterAction) {
        return new MDCCard(MDCCard._buildRoot(cardClass, id, withPrimaryAction, withMedia, withFooterAction));
    }

    /**  @param {string} values classes as string separated by spaces. Ex : "class1 class2" */
    addClasses(values) {
        this.root_.className = this.root_.className + ' ' + values;
    }

    addActionButtonItem(mdcButton, isCollapseTrigger) {
        if(!this.actions_) {
            this.actions_ = createDIV("mdc-card__actions p-2");
            this.root_.appendChild(this.actions_);
        }
        if(!this.actionButtons_) {
            this.actionButtons_ = createDIV("mdc-card__action-buttons");
            this.actions_.appendChild(this.actionButtons_);
        }
        this.actionButtons_.appendChild(mdcButton.root_);
        
        if(isCollapseTrigger) {
            this._mapCollapseTo(mdcButton.root_);
            mdcButton.root_.addEventListener('click', e => {
                const moreDots = this.textEl_.querySelector(".more-dots");
                moreDots.style.display = moreDots.style.display === "none" ? "inline" : "none";
                mdcButton.text = moreDots.style.display === "none" ? "Learn less" : "Learn more";
            });
        }
    }
    
    addActionButton(text, icon, id, isCollapseTrigger, textOnCollapse) {
        const btn = MDCButton.create(null, id, text);
        if(icon) btn.leadingIcon = icon;
        this.addActionButtonItem(btn, isCollapseTrigger);
    }

    addActionIcon(icon, id) {
        if(!this.actions_) {
            this.actions_ = createDIV("mdc-card__actions");
            this.root_.appendChild(this.actions_);
        }
        if(!this.actionIcons_) {
            this.actionIcons_ = createDIV("mdc-card__action-icons");
            this.actions_.appendChild(this.actionIcons_);
        }
        this.actionIcons_.insertAdjacentHTML('beforeend', 
            '<button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" id=' + id + '>'
            + icon + '</button>');
    }

    /*'*************************************************************************
     *                                                                         *
     *  Events Handler Methods                                                 *
     *                                                                         *
     **************************************************************************/

    onclick(listener) {
        this.primaryAction_.onclick = listener;
    }

    addEventListener(type, listener, options) {
        this.primaryAction_.addEventListener(type, listener, options);
    }

    addActionEventListener(type, actionItemID, listener, options) {
        document.getElementById(actionItemID).addEventListener(type, listener, options);
    }

    removeEventListener(type, listener, options) {
        this.primaryAction_.removeEventListener(type, listener, options);
    }

    /*'*************************************************************************
     *                                                                         *
     *  Setters and getters                                                    *
     *                                                                         *
     **************************************************************************/
    
    set id(id) {
        this.root_.id = id;
    }

    get title() {
        return this.title_ ? this.title_.textContent : null;
    }
    
    set title(value) {
        this.title_.innerHTML = value;
    }

    get subTitle() {
        return !this.title_ ? null : this.title_.nextElementSibling ? this.title_.nextElementSibling.textContent : null;
    }
    
    set subTitle(value) {
        this.title_.nextElementSibling.innerHTML = value;
    }

    setText(text, collapsibleText) {
        if(text && !this.textEl_) { // Create text Element if it has not exist
            this.textEl_ = createDIV("card-text px-3 pb-2");
        }
        if(collapsibleText && !this.collapsibleEl_) { // Create collapsibleText Element if it has not exist
            this.collapsibleEl_ = createDIV('collapse');
        }
        if(text && collapsibleText) {
            this.textEl_.innerHTML = text;
            this.collapsibleEl_.innerHTML = collapsibleText;
            
            let moreDots = this.textEl_.querySelector('.more-dots');
            if(!moreDots) {
                moreDots = createElement("SPAN", "more-dots", "..");
            }
            this.textEl_.appendChild(moreDots);
            this.textEl_.appendChild(this.collapsibleEl_);
        }
        else this.textEl_.innerHTML = text ?  text :  this.collapsibleEl_;
        // Set default collapsible id if not set
        if(!this.collapsibleEl_.id) {
            this.collapsibleID = this.selector_.replace(/\s/gi, '-').replace(/#|\./gi, '') + '-collapse';
        }
    }

    set collapsibleID(value) {
        this.collapsibleEl_.id = value;
        this.root_.querySelectorAll('[data-toggle="collapse"]').forEach(i => {
            this._mapCollapseTo(i);
        });
    }

    set mediaURL(value) {
        this.media_.style.backgroundImage = value;
    }
}