import {MDCTabBar as _MDCTabBar} from '@material/tab-bar/index';
import {isString} from '../utils';

export class MDCTabBar extends _MDCTabBar {
    constructor(selector) {
        super(isString(selector) ? document.querySelector(selector) : selector);
        this.tabViews_;
        this.activatedTabModel_;
        
        this.onActived(event => {
            this.activatedTabModel_ = event.detail;
            if(this.tabViews_) {
                // Hide currently-active content
                this.tabViews_.forEach(view => {
                    if(view.classList.contains('tab-view--active')) {
                        view.classList.remove('tab-view--active');
                    }
                });
                // Show content for newly-activated tab
                if(!this.tabViews_[this.activatedTabModel_.index].classList.contains('tab-view--active')) {
                    this.tabViews_[this.activatedTabModel_.index].classList.add('tab-view--active');
                }
            }
        });
    }

    onActived(listener) {  
        this.listen('MDCTabBar:activated', listener);
    }

    _getTabTextEl(tabIndex) {
        const tab = this.getTabElements_()[tabIndex];
        return tab ? tab.querySelector('.mdc-tab__text-label') : null;
    }

    _getTabIconEl(tabIndex) {
        const tab = this.getTabElements_()[tabIndex];
        return tab ? tab.querySelector('.mdc-tab__icon') : null;
    }

    /***************************************************************************
     *                                                                         *
     *  Setters and getters                                                    *
     *                                                                         *
     **************************************************************************/

    /** The current actived Tab Item icon. */
    get activedTabIcon() {
        return this.getTabText(this.activedTabIndex);
    }

    /** The current actived Tab Item text. */
    get activedTabText() {
        return this.getTabText(this.activedTabIndex);
    }
    
    /** The current actived tab index. */
    get activedTabIndex() {
        return this.activatedTabModel_ ? this.activatedTabModel_.index : -1;
    }

    setContentViews(selector) {
        this.tabViews_ = document.querySelectorAll(selector);
    }

    setTabText(text, tabIndex) {
        const textEl = this._getTabTextEl(tabIndex);
        if(textEl) {
            textEl.innerHTML = text
        }
    } 
    
    getTabText(tabIndex) {
        const textEl = this._getTabTextEl(tabIndex);
        return textEl ? textEl.textContent : null;
    }   

    setTabIcon(icon, tabIndex) {
        const tabIcon = this._getTabIconEl(tabIndex);
        const tabContent = this.getTabElements_()[tabIndex].querySelector(".mdc-tab__content");
        if(tabContent) {
            if(icon instanceof SVGElement) {
                icon.setAttribute('class', icon.getAttribute('class') + "mdc-tab__icon");
                if(tabIcon) {
                    tabContent.replaceChild(icon, tabIcon);
                }
                else tabContent.appendChild(icon);
            }
            else {
                if(tabIcon) {
                    tabIcon.innerHTML = icon;
                }
                else {
                    tabContent.insertAdjacentHTML('afterbegin', 
                        '<i class="material-icons mdc-tab__icon" aria-hidden="true">' + icon + '</i>');
                }
            }
        }
    }
    
    getTabIcon(tabIndex) {
        const iconEl = this._getTabIconEl(tabIndex);
        if(iconEl) {
            return iconEl instanceof SVGElement ? iconEl : iconEl.textContent;
        }
        else return null;
    }
}