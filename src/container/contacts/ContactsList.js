/**
 * Email Listing
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

import { readEmail, onSelectEmail, markAsStarEmail } from "Actions";

import ContactsListItem from "./../../components/ListItem/ContactsListItem";
import IntlMessages from "Util/IntlMessages";

import { getContacts } from "Actions";

class ContactsList extends Component {
    componentDidMount() {
        console.log(this.props);
        // this.props.getContacts();
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

    render() {
        const { contacts } = this.props;
        return (
            <ul className="list-unstyled m-0">
                {contacts && contacts.length > 0 && contacts !== null ? (
                    contacts.map((document, key) => (
                        <ContactsListItem />
                    ))
                ) : (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>No contacts Found In Selected Folder</h4>
                        </div>
                    )}
            </ul>
        );
    }
}

// map state to props
const mapStateToProps = ({ contacts }) => {
    return contacts;
};

export default withRouter(
    connect(mapStateToProps,
        {
            getContacts
        }
    )(ContactsList)
);
