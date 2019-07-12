/**
 * Contacts Listing
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { getContacts, sortContactsByEmail, sortContactsByName } from "Actions";
import DialogTemplate from "Components/Dialogs/DialogTemplate";
import ContactsListItem from "Components/ListItem/ContactsListItem";
import NewContact from "Components/ListItem/NewContact";
import ContactsListItemHeader from "Components/ListItem/ContactsListItemsHeader";
import PageActions from "Components/ListItem/PageActions";

import IntlMessages from "Util/IntlMessages";

class ContactsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newContact: false,
            search: false,
            address: false,
            activateAddContactBtn: true,
            allContactsAreSelected: false,
            selectedContacts: [],
            sortBy: {
                nameAsc: null,
                emailAsc: null
            }
        }
    }

    componentDidMount() {
        this.props.getContacts();
    }

    onClickContactItem = (contact, e) => {
        console.log('onClickContact e:', e);
        console.log('onClickContact Contact:', contact);
    };

    onClickNewContact = () => {
        this.setState({
            newContact: true
        });
    }

    toggleSearch = (searchState) => {
        this.setState({
            search: searchState
        });
    }


    selectAllContacts = (event, checked) => {
        event.stopPropagation();

        const { contacts } = this.props;
        if (!contacts) return;

        var ids = [];
        if (checked) {
            ids = contacts.reduce((arr, currObj) => {
                arr.push(currObj.corporatesID);
                return arr;
            }, []);
        }

        this.setState({
            selectedContacts: ids,
            allContactsAreSelected: checked
        })
    }

    onCheckSingleContact = (contact, event, checked) => {
        event.stopPropagation();
        var selectedContacts = this.state.selectedContacts.filter(c => c != contact.corporatesID);

        if (checked) {
            selectedContacts.push(contact.corporatesID)
        }

        var allContactsAreSelected = this.props.contacts &&
            this.props.contacts.length == selectedContacts.length;

        this.setState({
            selectedContacts: selectedContacts,
            allContactsAreSelected
        });
    }

    sortContactsBy = (sortBy) => {
        if (this.props.contacts && this.props.contacts.length) {
            console.log('prevState', this.state);

            const emailAsc = sortBy == 'name' ? null : !this.state.sortBy.emailAsc;
            const nameAsc = sortBy == 'email' ? null : !this.state.sortBy.nameAsc;

            this.setState((state, props) => {
                return {
                    sortBy: {
                        emailAsc,
                        nameAsc
                    }
                }
            }, () => {

                if (sortBy == 'name') {
                    this.props.sortContactsByName(this.state.sortBy.nameAsc);
                } else {
                    this.props.sortContactsByEmail(this.state.sortBy.emailAsc)
                }
            });

        }
        console.log('sortContactsBy:', sortBy);
    }

    onChangeSearchValue = (event) => {
        console.log('onChangeSearchValue:', event.target.value);
    }

    onCloseDlg = () => {
        this.setState({
            newContact: false
        });
    }

    onSaveDlg = () => {
        console.log('onSaveDlg');
        this.onCloseDlg();
    }

    dlgButtons = {
        save: {
            onSave: this.onSaveDlg,
            text: "ADD CONTACT"
        }
    }

    toggleAddressFieldSet = () => {
        this.setState({
            address: !this.state.address
        });
    }

    activateAddContactBtn = ({ touched, errors }) => {
        var activate = true;

        console.log('touched:', touched);
        console.log('errors:', errors);

        if (touched.email && errors.email) {
            activate = false;
        }

        this.setState({
            activateAddContactBtn: activate
        });
    }

    render() {
        const { contacts } = this.props;
        console.log('Contacts:', contacts);
        return (
            <div className="page-content">
                {this.state.newContact &&
                    (<DialogTemplate
                        title="New contact"
                        open={this.state.newContact}
                        onClose={this.onCloseDlg}
                        buttons={this.dlgButtons}
                        disabled={this.state.newContact}
                    >
                        <NewContact
                            classes={{ textField: '' }}
                            toggleAddressFields={this.toggleAddressFieldSet}
                            showAddressFields={this.state.address}
                            enableAddContact={this.activateAddContactBtn}
                        />
                    </DialogTemplate>)
                }
                <div className="page-actions">
                    <PageActions page="Contacts"
                        onNewContact={this.onClickNewContact}
                        onClickSearch={this.toggleSearch.bind(this, true)}
                        onSearchClose={this.toggleSearch.bind(this, false)}
                        search={this.state.search}
                        selectedContacts={this.state.selectedContacts.length}
                        onChangeSearchValue={this.onChangeSearchValue}
                    />
                </div>
                <div className="content-area">
                    <div className="content-head header-shadow head-container">
                        <ul className="list-unstyled m-0">
                            <ContactsListItemHeader
                                sortContactsBy={this.sortContactsBy}
                                onSelectAll={this.selectAllContacts}
                                checked={this.state.allContactsAreSelected}
                                sortBy={this.state.sortBy}
                            />
                        </ul>
                    </div>
                    <div className="content-detail">
                        <ul className="list-unstyled m-0">
                            {
                                contacts && contacts.length > 0 && contacts !== null ? (
                                    contacts.map((contact) => (
                                        <ContactsListItem
                                            key={contact.corporatesID}
                                            checked={this.state.selectedContacts.find(c => c == contact.corporatesID) ? true : false}
                                            contact={contact}
                                            onClickContactItem={this.onClickContactItem.bind(this, contact)}
                                            onCheckSingleContact={this.onCheckSingleContact.bind(this, contact)}
                                        />
                                    ))
                                ) : (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>No contacts Found In Selected Folder</h4>
                                        </div>
                                    )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ contacts }) => {
    return contacts;
};

const mapDispatchToProps = ({ dispatch }) => {

}

export default withRouter(connect(mapStateToProps,
    { getContacts, sortContactsByName, sortContactsByEmail }
)(ContactsList));
