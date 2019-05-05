import {MDCMenu} from './components/MDCMenu';
import {MDLTextField} from './components/MDLTextField';
import {MDCButton} from './components/MDCButton';
import * as SVG from "./svg";

if(document.querySelector('#accounts-admin')) {
    // Instantiations
    const accountSearchField = new MDLTextField("#account-search-form .mdl-textfield");
    const searchMenu = new MDCMenu('#accounts-admin .search-options-menu .mdc-menu');
    const searchOptionsButton = new MDCButton('#accounts-admin .search-options-menu .mdc-button');
    const addButton = new MDCButton('#accounts-admin .add-button');
    const editButton = new MDCButton('#accounts-admin .edit-button');
    const deleteButton = new MDCButton('#accounts-admin .delete-button');

    // Account search field
    accountSearchField.labelText = "Search an account";
    accountSearchField.setClearable();
    accountSearchField.errorText = accountException;
    accountSearchField.value = accountCode;
    accountSearchField.showError(!isAccountFound);

    // Actions (add/edit/delete) button
    addButton.text = "Add a new account";
    addButton.leadingIcon = "person_add";

    editButton.text = "Edit an account";
    editButton.leadingIcon = SVG.AccountEditIcon();

    deleteButton.text = "Delete an account";
    deleteButton.leadingIcon = "delete_forever";

    // Search options buttons & menus
    searchOptionsButton.trailingIcon = 'arrow_drop_down';
    searchOptionsButton.variant('raised');

    searchMenu.setAnchorMargin({bottom: 2});
    searchMenu.onClosed(() => searchOptionsButton.blur());

    searchOptionsButton.addEventListener('click', e => {
        searchMenu.open = !searchMenu.open;
    });
}