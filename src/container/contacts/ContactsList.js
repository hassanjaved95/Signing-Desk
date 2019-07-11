/**
 * Contacts Listing
 */
import React, { Component, useState  } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { getContacts } from "Actions";
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
            search: false
        }
    }

    
    componentDidMount() {
        this.props.getContacts();
    }

    onClickContactItem = (e, contact) => {
        console.log('onClickContact e:', e);
        console.log('onClickContact Contact:', contact);
    };

    onClickNewContact = () => {
        this.setState({
            newContact: true
        });
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
                        <NewContact classes={{textField: ''}} showAddress={() => {}} />
                    </DialogTemplate>)
                }
                <div className="page-actions">
                    <PageActions page="Contacts" onNewContact={() => { this.onClickNewContact() }} />
                </div>
                <div className="content-area">
                    <div className="content-head header-shadow head-container">
                        <ul className="list-unstyled m-0">
                            <ContactsListItemHeader />
                        </ul>
                    </div>
                    <div className="content-detail">
                        <ul className="list-unstyled m-0">
                            {
                                contacts && contacts.length > 0 && contacts !== null ? (
                                    contacts.map((contact) => (
                                        <ContactsListItem
                                            key={contact.corporatesID}
                                            contact={contact}
                                            onClickContactItem={(e) => this.onClickContactItem(e, contact)}
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
    { getContacts }
)(ContactsList));
