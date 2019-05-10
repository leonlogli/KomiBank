import {MDCTextField} from './components/MDCTextField';
import {MDCButton} from './components/MDCButton';

if(document.querySelector('#add-account')) {
    const customerNameField = new MDCTextField("#add-account .customer-name-field");
    const customerEmailField = new MDCTextField("#add-account .customer-email-field");
    const accountCodeField = new MDCTextField("#add-account .account-code-field");
    const accountForm = document.querySelector('#add-account form');
    const submitButton = new MDCButton('#add-account .submit-button');

    customerNameField.labelText = "Full name";
    customerEmailField.labelText = "Email address";
    accountCodeField.labelText = "Account code";
    submitButton.variant('raised');

    // Account Form validation
    accountForm.addEventListener("submit", function (event) {
        if(!customerNameField.value) {
            customerNameField.helperText = "Name is required *";
            customerNameField.showHelperText(true);
            if(event) {
                event.preventDefault();
            }
        }
        else customerNameField.showHelperText(false);

        if(!customerEmailField.value) {
            customerEmailField.helperText = "Email address is required *";
            customerEmailField.showHelperText(true);
            if(event) {
                event.preventDefault();
            }
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmailField.value)) {
            customerEmailField.helperText = "Enter a valid email address !";
            customerEmailField.showHelperText(true);
            if(event) {
                event.preventDefault();
            }
        }
        else customerEmailField.showHelperText(false);
        
        if(!accountCodeField.value) {
            accountCodeField.helperText = "Account code is required *";
            accountCodeField.showHelperText(true);
            if(event) {
                event.preventDefault();
            }
        }
    }, false);

    customerEmailField.onchange = function() {
        if(customerNameField.value == customerEmailField.value) {
            customerEmailField.helperText = "Recipient and sender account must be different !";
            customerEmailField.showHelperText(true);
            if(event) {
                event.preventDefault();
            }
        }
        else customerEmailField.showHelperText(false);
    }
}
