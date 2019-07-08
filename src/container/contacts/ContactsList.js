/**
 * Contacts Listing
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { getContacts } from "Actions";

import ContactsListItem from "Components/ListItem/ContactsListItem";
import ContactsListItemHeader from "Components/ListItem/ContactsListItemsHeader";
import PageActions from "Components/ListItem/PageActions";

import IntlMessages from "Util/IntlMessages";

class ContactsList extends Component {
    componentDidMount() {
        this.props.getContacts();
    }

    /**
     * Function to return task label name
     */
    getTaskLabelNames = taskLabels => {
        let elements = [];
        const { labels } = this.props;
        for (const taskLabel of taskLabels) {
            for (const label of labels) {
                if (label.value === taskLabel) {
                    let ele = (
                        <span
                            key={label.value}
                            className={classnames("badge badge-pill", {
                                "badge-success": label.value === 1,
                                "badge-primary": label.value === 2,
                                "badge-info": label.value === 3,
                                "badge-danger": label.value === 4
                            })}
                        >
                            <IntlMessages id={label.name} />
                        </span>
                    );
                    elements.push(ele);
                }
            }
        }
        return elements;
    };

    onClickContact = (e, contact) => {
        console.log('onClickContact e:', e);
        console.log('onClickContact Contact:', contact);
    };

    render() {
        const { contacts } = this.props;
        console.log('Contacts:', contacts);
        return (
            <div className="page-content">
                <div className="page-actions">
                    <PageActions page="Contacts" />
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
                                            onClickContact={(e) => this.onClickContact(e, contact)}
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


export default connect(mapStateToProps,
    { getContacts }
)(ContactsList);
