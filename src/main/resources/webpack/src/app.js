import './polyfill';
import {MDCRipple} from '@material/ripple/index';
import {MDCButton} from './components/MDCButton';
import * as Utils from './utils';
import './sass/app.scss';

// Setup a ripple effect for mdc compoents
const selector = '.mdc-button, .mdc-icon-button, .mdc-list-item, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(item) {
    return new MDCRipple(item);
});

ripples.forEach(r => {
    if(r.root_.classList.contains('mdc-icon-button')) {
        r.unbounded = true;
    }
});

// On Home (index) page
if(document.querySelector('.home-page')) {
    // Instantiations
    const savingsAccountCard = document.querySelector("#savings-account-card");
    const currentAccountCard = document.querySelector("#current-account-card");
    const homePageButton = new MDCButton('.mdc-button--raised');

    homePageButton.leadingIcon = 'person';
    homePageButton.trailingIcon = 'email';
    homePageButton.onclick(e => window.location.href='#accounts-header');

    // handle Read More/ Read Less content
    Utils.findFirstChildByClass(savingsAccountCard, "more-button").addEventListener('click', e => {
        const moreDots = Utils.findFirstChildByClass(savingsAccountCard, "more-dots");
        moreDots.style.display = moreDots.style.display === "none" ? "inline" : "none";
        e.target.innerHTML = moreDots.style.display === "none" ? "Learn more" : "Learn less";
    });

    Utils.findFirstChildByClass(currentAccountCard, "more-button").addEventListener('click', e => {
        const moreDots = Utils.findFirstChildByClass(currentAccountCard, "more-dots");
        moreDots.style.display = moreDots.style.display === "none" ? "inline" : "none";
        e.target.innerHTML = moreDots.style.display === "none" ? "Learn more" : "Learn less";
    });

}
