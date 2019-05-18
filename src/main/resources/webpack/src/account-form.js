import {MDCMenu} from './components/MDCMenu';
import {MDCTextField} from './components/MDCTextField';
import {MDCButton} from './components/MDCButton';
import {toggleNavBarClass} from './utils';

if(document.querySelector('#account-form')) {
    const customerNameField = new MDCTextField("#account-form .customer-name-field");
    const customerEmailField = new MDCTextField("#account-form .customer-email-field");
    const balanceField = new MDCTextField("#account-form .balance-field");
    const accountTypeField = new MDCTextField("#account-form .account-type-field");
    const accountTypeMenu = new MDCMenu('#account-form form .mdc-menu');
    const accountForm = document.querySelector('#account-form form');
    const submitButton = new MDCButton('#account-form .submit-button');
    let overdraftField;
    let interestRateField;

    if(document.querySelector("#account-form .overdraft-field")) {
        overdraftField = new MDCTextField("#account-form .overdraft-field");
        overdraftField.labelText = "Overdraft";
        overdraftField.layout();
    }
    if(document.querySelector("#account-form .interest-rate-field")) {
        interestRateField = new MDCTextField("#account-form .interest-rate-field");
        interestRateField.labelText = "Interest rate";
        interestRateField.layout();
    }

    customerNameField.labelText = "Full name";
    if(customerName) customerNameField.value = customerName;
    customerNameField.layout();

    customerEmailField.labelText = "Email address";    
    customerEmailField.layout();

    balanceField.labelText = "Balance";
    balanceField.layout();

    submitButton.variant('raised');

    accountTypeField.labelText = "Account type";
    accountTypeField.trailingIcon = 'arrow_drop_down';
    if(accountType == 'SA' || accountType == 'sa' || accountType == 'Savings Account') {
        accountTypeField.value = "Savings Account";
    }
    else if(accountType == 'CA' || accountType == 'ca' || accountType == 'Current Account') {
        accountTypeField.value = "Current Account";
    }
    else if(accountType) {
        accountTypeField.value = accountType;
    }

    // Account type menus
    accountTypeMenu.anchorCorner = "top_left";
    accountTypeMenu.root_.style.width = Math.max(180, Math.round(accountTypeField.root_.getBoundingClientRect().width)) + "px";
    accountTypeField.addEventListener('click', e => {
        accountTypeMenu.open = !accountTypeMenu.open;
    });
    accountTypeMenu.onSelected(e => {
        if(accountTypeMenu.selectedIndex == 0) {
            accountTypeField.value = "Savings Account";
        }
        else if(accountTypeMenu.selectedIndex == 1) {
            accountTypeField.value = "Current Account";
        }
    })
    window.addEventListener('resize', e => accountTypeMenu.open = false);

    // Account Form validation
    accountForm.addEventListener("submit", function (event) {
        if(!customerNameField.value) {
            validate(customerNameField, "Name is required *", event);
        }
        else customerNameField.showHelperText(false);

        if(!customerEmailField.value) {
            validate(customerEmailField, "Email address is required *", event);
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmailField.value)) {
            validate(customerEmailField, "Enter a valid email address !", event);
        }
        else customerEmailField.showHelperText(false);

        if(!accountTypeField.value) {
            validate(accountTypeField, "You must choose an account type !", event);
        }
        else accountTypeField.showHelperText(false);
    }, false);

    /**
     * Handle the field validity
     * @param {MDCTextField} field field to validate
     * @param {string} errorText text to show if errors occur
     * @param {Event} event the form submit event
     */
    function validate(field, errorText, event) {
        field.helperText = errorText;
        customerNameField.showHelperText(true);
        if(event) {
            event.preventDefault();
        }
    }
    
    document.querySelector('.main-container').style.paddingTop = 0;
    window.onscroll = e => toggleNavBarClass(e);
    toggleNavBarClass();
}
