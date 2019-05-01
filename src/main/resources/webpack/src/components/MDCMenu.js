import {MDCMenu as MDCMenu_} from '@material/menu/index';
import {Corner} from '@material/menu-surface/constants';
import {isString} from '../utils';

export class MDCMenu extends MDCMenu_ {
    constructor(selector) {
        super(isString(selector) ? document.querySelector(selector) : selector);
        /** @private contains the current selected item and index */
        this.selectedItemModel_;
        /** @private {string} Default anchor corner alignment of top-left menu corner */
        this.anchorCorner_;
        
        // Set default anchor corner
        this.anchorCorner = 'BOTTOM_LEFT';

        this.onSelected(e => {
            this.selectedItemModel_ = e.detail;
        });
        
        this.onOpened(e => {
            document.activeElement.blur();
            if(this.selectedItemModel_) {
                if(this.selectedItem) this.selectedItem.focus();
            }
        });
    }

    /*'*************************************************************************
     *                                                                         *
     *  Events Handler Methods                                                 *
     *                                                                         *
     **************************************************************************/
     
    onSelected(listener) {  
        this.addEventListener('MDCMenu:selected', listener);
    }
    
    onOpened(listener) {  
        this.addEventListener('MDCMenuSurface:opened', listener);
    }

    onClosed(listener) {  
        this.addEventListener('MDCMenuSurface:closed', listener);
    }

    addEventListener(type, listener, options) {
        this.root_.addEventListener(type, listener, options);
    }

    removeEventListener(type, listener, options) {
        this.root_.removeEventListener(type, listener, options);
    }

    /***************************************************************************
     *                                                                         *
     *  Setters and getters                                                    *
     *                                                                         *
     **************************************************************************/

    /** @return {Element} The current selected item. */
    get selectedItem() {
        return this.selectedItemModel_ ? this.selectedItemModel_.item : null;
    }

    /** @return {string} The current selected item text. */
    get selectedItemText() {
        return this.selectedItem ? this.selectedItem.querySelector('.mdc-list-item__text').textContent : null;
    }
    
    /** @return {string} The current selected index. */
    get selectedIndex() {
        return this.selectedItemModel_ ? this.selectedItemModel_.index : -1;
    }

    get anchorCorner() {
        return this.anchorCorner_;
    }

    /** 
     * Default anchor corner alignment of top-left menu corner
     * @param {string} value Ex: 'BOTTOM_LEFT', 'BOTTOM_START', 'TOP_RIGHT', 'TOP_END', etc.
     *  */
    set anchorCorner(value) {
        this.anchorCorner_ = value.toUpperCase();
        switch (this.anchorCorner_) {
            case 'BOTTOM_LEFT':
                this.setAnchorCorner(Corner.BOTTOM_LEFT);
                break;
            case 'BOTTOM_RIGHT':
                this.setAnchorCorner(Corner.BOTTOM_RIGHT);
                break;
            case 'BOTTOM_START':
                this.setAnchorCorner(Corner.BOTTOM_START);
                break;
            case 'BOTTOM_END':
                this.setAnchorCorner(Corner.BOTTOM_END);
                break;
            case 'TOP_LEFT':
                this.setAnchorCorner(Corner.TOP_LEFT);
                break;
            case 'TOP_RIGHT':
                this.setAnchorCorner(Corner.TOP_RIGHT);
                break;
            case 'TOP_START':
                this.setAnchorCorner(Corner.TOP_START);
                break;
            case 'TOP_END':
                this.setAnchorCorner(Corner.TOP_END);
                break;
            default:
                this.setAnchorCorner(Corner.BOTTOM_LEFT);
                this.anchorCorner_ = 'BOTTOM_LEFT';
        }
    }
}