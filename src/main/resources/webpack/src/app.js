import {MDCRipple} from '@material/ripple/index';
import './sass/app.scss';

// Setup a ripple effect for mdc compoents
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(item) {
    return new MDCRipple(item);
});