import {MDCMenu} from './components/MDCMenu';
import {MDLTextField} from './components/MDLTextField';
import {MDCButton} from './components/MDCButton';
import * as SVG from "./svg";
import {isSessionStorageAvailable} from "./utils";

if (document.querySelector('#accounts-page')) {
    // Instantiations
    const accountSearchField = new MDLTextField("#accounts-page .search-form .mdl-textfield");
    const pageSizeMenu = new MDCMenu('#accounts-page #accounts-table-header .mdc-menu');
    const pageSizeButton = new MDCButton('#accounts-page .page-size-button');
    const addAccountButton = new MDCButton('#accounts-page .add-account-button');
    const pageSizeField = document.querySelector('#accounts-page .page-size-field');
    const accountsPageSize = 'accountsPageSize';

    // addAccount Button
    addAccountButton.variant('unelevated');
    addAccountButton.leadingIcon = 'person_add';
    addAccountButton.addEventListener('click', e => window.location.href = "/account/add");
    
    // Account search field
    accountSearchField.labelText = "Search";

    // Set edit icon in the table with svg icon
    document.querySelectorAll('#accounts-page table .action-col-edit').forEach(icon => {
        icon.appendChild(SVG.AccountEditIcon("blue", "mdc-icon-button__icon"));
    });
    
    // Page size button & menu
    pageSizeButton.variant('unelevated');
    pageSizeButton.trailingIcon = 'arrow_drop_down';
    if(isSessionStorageAvailable && localStorage.getItem(accountsPageSize)) {
        pageSizeButton.text = localStorage.getItem(accountsPageSize);
    }
    else pageSizeButton.text = 5;
    pageSizeField.value = pageSizeButton.text;
    
    pageSizeMenu.setAnchorMargin({bottom: -20});
    pageSizeButton.addEventListener('click', e => {
        pageSizeMenu.open = !pageSizeMenu.open;
    });

    pageSizeMenu.root_.querySelector('.mdc-list-item').classList.add('mdc-list-item--disabled');
    pageSizeMenu.onSelected(e => {
        pageSizeButton.text = pageSizeMenu.selectedItemText;
        if(isSessionStorageAvailable) {
            localStorage.setItem(accountsPageSize, pageSizeMenu.selectedItemText);
        }

        pageSizeField.value = pageSizeMenu.selectedItemText;
        document.querySelector('#accounts-page .search-form').submit();
    })
    window.addEventListener('resize', e => pageSizeMenu.open = false);
}