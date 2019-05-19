import {MDCTabBar} from './components/MDCTabBar';
import {MDLTextField} from './components/MDLTextField';
import {MDCButton} from './components/MDCButton';
import {isSessionStorageAvailable} from './utils';

if(document.querySelector('#add-operations')) {
    // Tab Instantiation
    const operationsTab = new MDCTabBar("#add-operations .mdc-tab-bar");
    // Set Tab Conent Views
    operationsTab.setContentViews("#add-operations .tab-view");
    // Get the active tab index in session storage
    const activeTabIndex = 'operationsTabIndex';
    if(isSessionStorageAvailable) {
        if(localStorage.getItem(activeTabIndex)) {
            operationsTab.activateTab(parseInt(localStorage.getItem(activeTabIndex)));
        } 
        else {
            localStorage.setItem(activeTabIndex, 0);
            operationsTab.activateTab(0);
        }
    }

    operationsTab.onActived(() => {
        if(isSessionStorageAvailable) {
            localStorage.setItem(activeTabIndex, operationsTab.activedTabIndex);
        }
        document.querySelectorAll('#add-operations .mdl-textfield__error').forEach(field => {
            if(!field.classList.contains('invisible')) field.classList.add('invisible');
            field.classList.remove('visible');
        })
    })
    
    // Payement tab view 
    if(document.querySelector('#payemt-tab-view')) {
        const accountCodeField = new MDLTextField("#payemt-tab-view .acount-code-field");
        const amountField = new MDLTextField("#payemt-tab-view .amount-field");
        const paymentForm = document.querySelector('#payemt-tab-view form');
        const submitButton = new MDCButton('#payemt-tab-view .submit-button');

        accountCodeField.labelText = "Account code";
        amountField.labelText = "Amount";
        submitButton.variant('raised');

        // Payement Form validation
        paymentForm.addEventListener("submit", function (event) {
            commonValidation(accountCodeField, amountField, event);
        }, false);
    }

    // Withdraw tab view 
    if(document.querySelector('#withdraw-tab-view')) {
        const accountCodeField = new MDLTextField("#withdraw-tab-view .acount-code-field");
        const amountField = new MDLTextField("#withdraw-tab-view .amount-field");
        const withdrawForm = document.querySelector('#withdraw-tab-view form');
        const submitButton = new MDCButton('#withdraw-tab-view .submit-button');

        accountCodeField.labelText = "Account code";
        amountField.labelText = "Amount";
        submitButton.variant('raised');

        // Withdraw Form validation
        withdrawForm.addEventListener("submit", event => {
            commonValidation(accountCodeField, amountField, event);
        }, false);
    }

    // Transfert tab view 
    if(document.querySelector('#transfert-tab-view')) {
        const senderAccountField = new MDLTextField("#transfert-tab-view .acount-code-field");
        const recipAccountField = new MDLTextField("#transfert-tab-view .recipient-account-field");
        const amountField = new MDLTextField("#transfert-tab-view .amount-field");
        const transfertForm = document.querySelector('#transfert-tab-view form');
        const submitButton = new MDCButton('#transfert-tab-view .submit-button');

        senderAccountField.labelText = "Sender account code";
        recipAccountField.labelText = "Recipient account code";
        amountField.labelText = "Amount to transfert";
        submitButton.variant('raised');

        // Transfert Form validation
        transfertForm.addEventListener("submit", function (event) {
            if(!senderAccountField.value) {
                validate(senderAccountField, "Sender account code is required *", event);
            }
            else senderAccountField.showError(false);

            if(!recipAccountField.value) {
                validate(recipAccountField, "Recipient account code is required *", event);
            }
            else if(senderAccountField.value == recipAccountField.value) {
                validate(recipAccountField, "Recipient and sender account must be different !", event);
            }
            else recipAccountField.showError(false);

            if(!amountField.value) {
                validate(amountField, "The amount is required *", event);
            }
            else if (!/^\d+$/.test(amountField.value)) {
                validate(amountField, "The amount must be a number !", event);
            }
            else amountField.showError(false);
        }, false);

        recipAccountField.onchange = function() {
            if(senderAccountField.value == recipAccountField.value) {
                validate(recipAccountField, "Recipient and sender account must be different !", event);
            }
            else recipAccountField.showError(false);
        }
    }

    /**
     * Handle the field validity
     * @param {MDLTextField} field field to validate
     * @param {string} errorText text to show if errors occur
     * @param {Event} event the form submit event
     */
    function validate(field, errorText, event) {
        field.errorText = errorText;
        field.showError(true);
        if(event) {
            event.preventDefault();
        }
    }

    // Amount and account code validation
    function commonValidation(accountCodeField, amountField, event) {
        if(!accountCodeField.value) {
            validate(accountCodeField, "The account code is required *", event);
        }
        else accountCodeField.showError(false);

        if(!amountField.value) {
            validate(amountField, "The amount is required *", event);
        }
        else if (!/^\d+$/.test(amountField.value)) {
            validate(amountField, "The amount must be a number !", event);
        }
        else amountField.showError(false);
    }
}
