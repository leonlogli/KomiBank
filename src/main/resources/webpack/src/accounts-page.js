import {MDCMenu} from './components/MDCMenu';
import {MDLTextField} from './components/MDLTextField';
import {MDCButton} from './components/MDCButton';
import * as SVG from "./svg";
import {mqMedium, addMediaQueryListener} from "./utils";

if(document.querySelector('#accounts-page')) {
    // Instantiations
    const accountSearchField = new MDLTextField("#accounts-page .search-form .mdl-textfield");
    const searchMenu = new MDCMenu('#accounts-page .search-form .mdc-menu');
    const addAccountButton = new MDCButton('#accounts-page .add-account-button');
    
    // Account search field
    accountSearchField.labelText = "Search an account";
    accountSearchField.root_.classList.remove('mdl-textfield--floating-label');

    addAccountButton.variant('raised');
    addAccountButton.leadingIcon = 'person_add';
    addAccountButton.addEventListener('click', e => window.location.href = "/account/add");
    
    accountSearchField.trailingIcon = 'arrow_drop_down';
    accountSearchField.errorText = accountException;
    accountSearchField.value = accountCode;
    accountSearchField.showError(!isAccountFound);
    document.querySelector('#accounts-page .card-header').style.paddingBottom = isAccountFound ? "0" : "4px";

    document.querySelectorAll('#accounts-page .action-col-edit').forEach(icon => {
        icon.appendChild(SVG.AccountEditIcon("blue", "mdc-icon-button__icon"));
    });
    
    // Search options & menus
    searchMenu.setAnchorMargin({bottom: -20});
    searchMenu.root_.style.width = Math.max(180, Math.round(accountSearchField.root_.getBoundingClientRect().width)) + "px";

    accountSearchField.addTrailingIconEventListener('click', e => {
        searchMenu.open = !searchMenu.open;
    });

    window.addEventListener('resize', e => searchMenu.open = false);
   
    addMediaQueryListener(mqMedium, function(mqMatches) {
        addAccountButton.root_.style.display = mqMatches ? 'inline-block' : 'none';
    });
}