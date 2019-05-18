import {MDCMenu} from './components/MDCMenu';
import {MDLTextField} from './components/MDLTextField';
import {MDCButton} from './components/MDCButton';
import * as SVG from "./svg";
import {isSessionStorageAvailable} from "./utils";

if (document.querySelector('#customers-page')) {
    // Instantiations
    const customerSearchField = new MDLTextField("#customers-page .search-form .mdl-textfield");
    const pageSizeMenu = new MDCMenu('#customers-page #customers-header .mdc-menu');
    const pageSizeButton = new MDCButton('#customers-page .page-size-button');
    const pageSizeField = document.querySelector('#customers-page .page-size-field');
    const customersPageSize = 'customersPageSize';

    // Customer search field
    customerSearchField.labelText = "Search a customer";

    // Set edit icon in the table with svg icon
    document.querySelectorAll('#customers-page table .action-col-edit').forEach(icon => {
        icon.appendChild(SVG.AccountEditIcon("blue", "mdc-icon-button__icon"));
    });
    
    // Page size button & menu
    pageSizeButton.variant('unelevated');
    pageSizeButton.trailingIcon = 'arrow_drop_down';
    if(isSessionStorageAvailable && localStorage.getItem(customersPageSize)) {
        pageSizeButton.text = localStorage.getItem(customersPageSize);
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
            localStorage.setItem(customersPageSize, pageSizeMenu.selectedItemText);
        }

        pageSizeField.value = pageSizeMenu.selectedItemText;
        document.querySelector('#customers-page .search-form').submit();
    })
    window.addEventListener('resize', e => pageSizeMenu.open = false);
}