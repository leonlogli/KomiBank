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
    if(isSessionStorageAvailable) {
        if(localStorage.getItem('operationsActiveTabIndex')) {
            operationsTab.activateTab(parseInt(localStorage.getItem('operationsActiveTabIndex')));
        } 
        else {
            localStorage.setItem('operationsActiveTabIndex', 0);
            operationsTab.activateTab(0);
        }
    }

    operationsTab.onActived(() => {
        if(isSessionStorageAvailable) {
            localStorage.setItem('operationsActiveTabIndex', operationsTab.activedTabIndex);
        }
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
            if(!accountCodeField.value) {
                accountCodeField.errorText = "The account code is required *";
                accountCodeField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else accountCodeField.showError(false);

            if(!amountField.value) {
                amountField.errorText = "The amount is required *";
                amountField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else if (!/^\d+$/.test(amountField.value)) {
                amountField.errorText = "The amount must be a number !";
                amountField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else amountField.showError(false);
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
            if(!accountCodeField.value) {
                accountCodeField.errorText = "The account code is required *";
                accountCodeField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else accountCodeField.showError(false);

            if(!amountField.value) {
                amountField.errorText = "The amount is required *";
                amountField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else if (!/^\d+$/.test(amountField.value)) {
                amountField.errorText = "The amount must be a number !";
                amountField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else amountField.showError(false);
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
                senderAccountField.errorText = "Sender account code is required *";
                senderAccountField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else senderAccountField.showError(false);

            if(!recipAccountField.value) {
                recipAccountField.errorText = "Recipient account code is required *";
                recipAccountField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else recipAccountField.showError(false);

            if(senderAccountField.value == recipAccountField.value) {
                recipAccountField.errorText = "Recipient and sender account must be different !";
                recipAccountField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else recipAccountField.showError(false);

            if(!amountField.value) {
                amountField.errorText = "The amount is required *";
                amountField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else if (!/^\d+$/.test(amountField.value)) {
                amountField.errorText = "The amount must be a number !";
                amountField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else amountField.showError(false);
        }, false);

        recipAccountField.onchange = function() {
            if(senderAccountField.value == recipAccountField.value) {
                recipAccountField.errorText = "Recipient and sender account must be different !";
                recipAccountField.showError(true);
                if(event) {
                    event.preventDefault();
                }
            }
            else recipAccountField.showError(false);
        }
    }
    
}
