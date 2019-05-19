import './polyfill';
import {MDCRipple} from '@material/ripple/index';
import {MDCButton} from './components/MDCButton';
import {MDCCard} from './components/MDCCard';
import * as SVG from "./svg";
import "./accounts-page";
import "./customers-page";
import "./add-operations";
import "./account-form";
import "./login";
import "./signup";
import './sass/app.scss';
import {toggleNavBarClass, statusBar} from './utils';

// Setup a ripple effect for mdc compoents
const selector = '.mdc-button, .mdc-icon-button, .mdc-fab, .mdc-list-item, .mdc-card__primary-action';
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

// About our app
document.querySelector(".nav-link.about").onclick = e => {
    if(statusBar.isOpen) {
        statusBar.close();
    }
    statusBar.labelText = "KomiBank is developed by Léon Logli";
    statusBar.actionButtonText = "CLOSE";
    statusBar.timeoutMs = 9500;
    statusBar.open();
}

// On Home (index) page
if(document.querySelector('.home-page')) {
    // Instantiations
    const savingsAccountCard = new MDCCard("#savings-account-card");
    const currentAccountCard = new MDCCard("#current-account-card");
    const homePageButton = new MDCButton('#home-carousel-1 .mdc-button');
    const joinUsButton = new MDCButton('#sign-up .mdc-button');

    window.onscroll = e => toggleNavBarClass(e);
    toggleNavBarClass();

    // Home Page Button
    homePageButton.trailingIcon = 'chevron_right';
    homePageButton.variant('raised');
    homePageButton.onclick(e => {
        document.querySelector('#accounts-header').scrollIntoView({ behavior: 'smooth' });
    });
    
    joinUsButton.variant('outlined');
    joinUsButton.onclick(e => {
        document.querySelector('#accounts-header').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Savings Account Card
    savingsAccountCard.mediaURL = "url('../images/savings-account.jpg')";
    savingsAccountCard.setText(`A savings account is typically the first official bank account anybody opens. 
        It is designed to save you money.`, `Money you put into a savings account will actually grow over time by
        accruing interest. Savings accounts are an excellent place to park emergency cash. Opening a savings account 
        at KomiBank also marks the beginning of your relationship with a financial institution.`);
    savingsAccountCard.addActionButton("Apply now", null, "apply-sa");
    savingsAccountCard.addActionButton("Learn more", null, null, true);
    savingsAccountCard.addActionEventListener('click', "apply-sa", e => {
        window.location.href = '/account/add?type=SA';
    });
    savingsAccountCard.addEventListener('click', e => {
        window.location.href = '/account/add?type=SA';
    });

    // Cuurent account card
    currentAccountCard.mediaURL = "url('../images/current-account.jpg')";
    currentAccountCard.setText(`Offers easy access to your money for your daily transactional needs and helps keep
        your cash secure.`, `Money that you put in a current account usually won’t stay there for long, since it’s 
        where your everyday spending, bills, and other debits occur. There are no restrictions (in most personal 
        accounts) on how many transactions can take place in your account`);
    currentAccountCard.addActionButton("Apply now", null, "apply-ca");
    currentAccountCard.addActionButton("Learn more", null, null, true);
    currentAccountCard.addActionEventListener('click', "apply-ca", e => {
        window.location.href = '/account/add?type=CA';
    });
    currentAccountCard.addEventListener('click', e => {
        window.location.href = '/account/add?type=CA';
    });
}
