/**
 * Contacts Listing
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { getContacts, sortContactsByEmail, sortContactsByName, searchContacts, deleteContacts, createContact, updateContact } from "Actions";
import DialogTemplate from "Components/Dialogs/DialogTemplate";
import ContactsListItem from "Components/ListItem/ContactsListItem";
import NewContact from "Components/ListItem/NewContact";
import ContactsListItemHeader from "Components/ListItem/ContactsListItemsHeader";
import PageActions from "Components/ListItem/PageActions";
import { toBase64 } from "Helpers/helpers";
import API from 'Api';
import IntlMessages from "Util/IntlMessages";
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';


class ContactsList extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            loading: true,
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

    searchTimerId = null;
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
                arr.push(currObj.id);
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
        var selectedContacts = this.state.selectedContacts.filter(c => c != contact.id);

        if (checked) {
            selectedContacts.push(contact.id)
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
    }

    onChangeSearchValue = (event) => {
        if (this.searchTimerId) {
            clearTimeout(this.searchTimerId);
        }

        var searchVal = event.target.value;
        this.searchTimerId = setTimeout(() => {
            console.log('onChangeSearchValue:', searchVal);
            this.props.searchContacts(searchVal);
        }, 250);


    }

    onCloseDlg = () => {
        this.setState({
            newContact: false
        });
    }

    createContact = (reqObj) => {
        // console.log('CreateContact with Params:', reqObj);

        this.props.createContact(reqObj);
        this.onCloseDlg();
    }

    onSubmitForm = (obj) => {
        if (obj.file) {
            toBase64(obj.file).then((base64) => {
                obj.CertPEM = base64;
                this.createContact(obj);
            }).catch(console.log);
        } else {
            this.createContact(obj);
        }
        console.log('onSubmit:', obj);
    }

    onSaveDlg = () => {
        // console.log('onSaveDlg');
        console.log('onSaveDlg-Ref:', this.ref.current);
        // console.log('jQuery selector', $(this.ref.current));
        $(this.ref.current).click();
    }

    onDeleteContacts = () => {
        var result = window.confirm("Are you sure you want to delete the contact(s)?");
        if(result){
            this.props.deleteContacts({ "ContactIDs": this.state.selectedContacts });
            this.setState({
                selectedContacts: [],
                allContactsAreSelected: false
            });
            // console.log('Delete these contacts:', this.state.selectedContacts);
        }
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

    validateOnChange = (values) => {

    }

    activateAddContactBtn = ({ touched, errors }) => {
        console.log('ForwardRef:', this.ref);
        // var activate = this.ref.current.

        // this.setState({
        //     activateAddContactBtn: activate
        // });
    }

    render() {
        const { contacts, filterdContacts, loading } = this.props;
        const renderContacts = this.state.search ? filterdContacts : contacts;

        if (loading) {
            return (
                <RctSectionLoader />
            )
        }
        return (
            <div className="page-content">
                {this.state.newContact &&
                    (<DialogTemplate
                        title="New contact"
                        open={this.state.newContact}
                        onClose={this.onCloseDlg}
                        buttons={this.dlgButtons}
                        disabled={!this.state.activateAddContactBtn}
                    >
                        <NewContact
                            classes={{ textField: '' }}
                            toggleAddressFields={this.toggleAddressFieldSet}
                            showAddressFields={this.state.address}
                            enableAddContact={this.activateAddContactBtn}
                            onSubmit={this.onSubmitForm}
                            ref={this.ref}
                            validateOnChange={this.validateOnChange}
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
                        onDeleteContacts={this.onDeleteContacts}
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
                                renderContacts && renderContacts.length > 0 && renderContacts !== null ? (
                                    renderContacts.map((contact) => (
                                        <ContactsListItem
                                            key={contact.id}
                                            checked={this.state.selectedContacts.find(c => c == contact.id) ? true : false}
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

export default withRouter(connect(mapStateToProps,
    {
        getContacts,
        sortContactsByName,
        sortContactsByEmail,
        searchContacts,
        deleteContacts,
        createContact,
        updateContact
    }
)(ContactsList));
