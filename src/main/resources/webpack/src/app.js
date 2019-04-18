import {MDCRipple} from '@material/ripple/index';
import * as Utils from './utils';
import './sass/app.scss';

// Instantiations
const savingsAccountCard = document.querySelector("#savings-account-card");
const currentAccountCard = document.querySelector("#current-account-card");

// Setup a ripple effect for mdc compoents
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(item) {
    return new MDCRipple(item);
});

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
