import './polyfill';
import {MDCRipple} from '@material/ripple/index';
import {MDCButton} from './components/MDCButton';
import {MDCCard} from './components/MDCCard';
import * as SVG from "./svg";
import "./accounts-admin";
import "./add-operations";
import "./add-account";
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

// Set Footer SVG Icons
const footerSocialIcons = document.querySelectorAll(".social-networks a");
footerSocialIcons.item(0).appendChild(SVG.GooglePlusIcon());
footerSocialIcons.item(1).appendChild(SVG.TwitterIcon());
footerSocialIcons.item(2).appendChild(SVG.FacebookIcon());

// On Home (index) page
if(document.querySelector('.home-page')) {
    // Instantiations
    const savingsAccountCard = new MDCCard("#savings-account-card");
    const currentAccountCard = new MDCCard("#current-account-card");
    const homePageButton = new MDCButton('#home-carousel-1 .mdc-button');
    const signUpButton = new MDCButton('#sign-up .mdc-button');

    // Home Page Button
    signUpButton.variant('outlined');
    homePageButton.trailingIcon = 'chevron_right';
    homePageButton.onclick(e => window.location.href='#accounts-header');
    
    // Savings Account Card
    savingsAccountCard.mediaURL = "url('../images/savings-account.jpg')";
    savingsAccountCard.setText(`A savings account is typically the first official bank account anybody opens. 
        It is designed to save you money.`, `Money you put into a savings account will actually grow over time by
        accruing interest. Savings accounts are an excellent place to park emergency cash. Opening a savings account 
        at KomiBank also marks the beginning of your relationship with a financial institution.`);
    savingsAccountCard.addActionButton("Apply now", null, "apply-sa");
    savingsAccountCard.addActionButton("Learn more", null, null, true);
    savingsAccountCard.addActionEventListener('click', "apply-sa", e => console.log(e));
    savingsAccountCard.addEventListener('click', e => console.log("card clicked"));

    // Cuurent account card
    currentAccountCard.mediaURL = "url('../images/current-account.jpg')";
    currentAccountCard.setText(`Offers easy access to your money for your daily transactional needs and helps keep
        your cash secure.`, `Money that you put in a current account usually won’t stay there for long, since it’s 
        where your everyday spending, bills, and other debits occur. There are no restrictions (in most personal 
        accounts) on how many transactions can take place in your account`);
    currentAccountCard.addActionButton("Apply now", null, "apply-ca");
    currentAccountCard.addActionButton("Learn more", null, null, true);
    currentAccountCard.addActionEventListener('click', "apply-ca", e => console.log(e));
    currentAccountCard.addEventListener('click', e => console.log("card clicked"));
}
