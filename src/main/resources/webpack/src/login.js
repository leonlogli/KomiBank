import {MDCTextField} from './components/MDCTextField';
import {MDCButton} from './components/MDCButton';
import {MDCFormField} from '@material/form-field/index';
import {MDCCheckbox} from '@material/checkbox/index';
import {statusBar, isSessionStorageAvailable} from './utils';

if(document.querySelector('#login-form')) {
    const userNameField = new MDCTextField("#login-form .user-name-field");
    const passwordField = new MDCTextField("#login-form .password-field");
    const accountForm = document.querySelector('#login-form form');
    const submitButton = new MDCButton('#login-form .submit-button');
    const rememberMeCheckBox = new MDCCheckbox(document.querySelector('#login-form .mdc-checkbox'));
    const formField = new MDCFormField(document.querySelector('#login-form .mdc-form-field'));
    const rememberMe = 'rememberme';
    formField.input = rememberMeCheckBox;

    userNameField.labelText = "Username";
    userNameField.leadingIcon = 'person';

    passwordField.labelText = "Password";
    passwordField.leadingIcon = 'lock';

    submitButton.variant('outlined');

    // Account Form validation
    accountForm.addEventListener("submit", function (event) {
        if(!isSessionStorageAvailable || localStorage.getItem(rememberMe) == 'false') {
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
            else passwordField.showHelperText(false);
        }
    }, false);

    //Remember Me

    let rememberAlreadyChecked = false;

    rememberMeCheckBox.listen('change', e => {
        if(rememberAlreadyChecked == false && rememberMeCheckBox.checked && localStorage.getItem(rememberMe) == 'false') {
            if(statusBar.isOpen) {
                statusBar.close();
            }
            statusBar.labelText = "Only tick this box if this is your computer and it is not used by anyone else !";
            statusBar.actionButtonText = "OK";
            statusBar.timeoutMs = 5000;
            statusBar.open();
            rememberAlreadyChecked = true;
        }

        if(userLogout) {
            localStorage.setItem(rememberMe, false);
        }
        else if(isSessionStorageAvailable) {
            localStorage.setItem(rememberMe, rememberMeCheckBox.checked);
        }
    });
    
    // User log out 
    
    if(userLogout) {
        if(statusBar.isOpen) {
            statusBar.close();
        }
        statusBar.labelText = "You have been logged out !";
        statusBar.actionButtonText = "CLOSE";
        statusBar.timeoutMs = 5000;
        statusBar.open();

        localStorage.setItem(rememberMe, false);
    }

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
}
