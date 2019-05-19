import {MDCTextField} from './components/MDCTextField';
import {MDCButton} from './components/MDCButton';
import {MDCFormField} from '@material/form-field/index';
import {MDCCheckbox} from '@material/checkbox/index';
import {statusBar, toggleNavBarClass} from './utils';

if(document.querySelector('#signup-form')) {
    const userNameField = new MDCTextField("#signup-form .user-name-field");
    const passwordField = new MDCTextField("#signup-form .password-field");
    const confirmPasswordField = new MDCTextField("#signup-form .confirm-password-field");
    const accountForm = document.querySelector('#signup-form form');
    const submitButton = new MDCButton('#signup-form .submit-button');
    const termsCheckbox = new MDCCheckbox(document.querySelector('#signup-form .terms .mdc-checkbox'));
    const formField = new MDCFormField(document.querySelector('#signup-form .terms .mdc-form-field'));
    formField.input = termsCheckbox;
    
    userNameField.labelText = "Username";
    userNameField.leadingIcon = 'person';

    passwordField.labelText = "Password";
    passwordField.leadingIcon = 'lock';

    confirmPasswordField.labelText = "Confirm your password";
    confirmPasswordField.leadingIcon = 'lock';

    submitButton.variant('raised');

    // Account Form validation
    accountForm.addEventListener("submit", function (event) {
        if(!userNameField.value) {
            validate(userNameField, "Username is required *", event);
        }
        else if (!/^[a-zA-Z0-9.\\-_$@*!]{3,30}$/.test(userNameField.value)) {
            validate(userNameField, "Invalid username !", event);
        }
        else userNameField.showHelperText(false);

        if(!passwordField.value) {
            validate(passwordField, "Password is required *", event);
        }
        else if(passwordField.value.length < 4) {
            validate(passwordField, "Your password must have at least 4 characters !", event);
        }
        else if(passwordField.value != confirmPasswordField.value) {
            validate(confirmPasswordField, "The password fields must match !", event);
        }
        else confirmPasswordField.showHelperText(false);
        
        if(!termsCheckbox.checked) {
            if(statusBar.isOpen) {
                statusBar.close();
            }
            statusBar.labelText = "You must accept the terms";
            statusBar.actionButtonText = "OK";
            statusBar.timeoutMs = 5000;
            statusBar.open();
            event.preventDefault();
        }
    }, false);

    // Sign up success
    
    const statusBarActionListener = e => {
        if(e.detail.reason == "action") {
            window.location.href = '/login';
        }
    }

    if(userSignUpSuccess) {
        if(statusBar.isOpen) {
            statusBar.close();
        }
        statusBar.labelText = "You've successfully registered !";
        statusBar.actionButtonText = "LOGIN NOW";
        statusBar.timeoutMs = 9500;
        statusBar.listen('MDCSnackbar:closed', statusBarActionListener);
        statusBar.open();
    }
    else statusBar.unlisten('MDCSnackbar:closed', statusBarActionListener);

    /**
     * Handle the field validity
     * @param {MDCTextField} field field to validate
     * @param {string} errorText text to show if errors occur
     * @param {Event} event the form submit event
     */
    function validate(field, errorText, event) {
        field.helperText = errorText;
        userNameField.showHelperText(true);
        if(event) {
            event.preventDefault();
        }
    }
    
    document.querySelector('.main-container').style.paddingTop = 0;
    window.onscroll = e => toggleNavBarClass(e);
    toggleNavBarClass();

    document.querySelector(".nav-link.login").style.display = 'none';
    document.querySelector(".nav-link.signup").style.display = 'none';
}
