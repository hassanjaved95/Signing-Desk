import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCompanies, getCompanyUsers, getContactsAsUsers, createContact, updateContact, deleteContacts } from "Actions";

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import useStyles from "./action-button-css";
import Recipients from './recipients';
import SigningOrder from './sigining-order';
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';
import { toBase64 } from "Helpers/helpers";
import IntlMessages from "Util/IntlMessages";


// const companies = [
//     { id: 'CompanyA', value: 'CompanyA', label: "CompanyA" },
//     { id: 'CompanyB', value: 'CompanyB', label: "CompanyB" },
//     { id: 'CompanyC', value: 'CompanyC', label: "CompanyC" },
// ]

// const users = [
//     { id: 'User1', value: "User1", label: "User1", firstName: 'User', lastName: "1", email: "user1@gmail.com" },
//     { id: 'User2', value: "User2", label: "User2", firstName: 'User', lastName: "2", email: "user2@gmail.com" },
//     { id: 'User3', value: "User3", label: "User3", firstName: 'User', lastName: "3", email: "user3@gmail.com" },
//     { id: 'User4', value: "User4", label: "User4", firstName: 'User', lastName: "4", email: "user4@gmail.com" },
//     { id: 'User5', value: "User5", label: "User5", firstName: 'User', lastName: "5", email: "user5@gmail.com" },
//     { id: 'User6', value: "User6", label: "User6", firstName: 'User', lastName: "6", email: "user6@gmail.com" }
// ];




class RecipientActions extends React.Component {
    users = null;
    companies = null;
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            loading: true,
            activeTab: '1',
            selectedCompany: {},
            editingContact: '',
            isUsers: true,
            companies: [],
            listUser: [],
            try: true,
            addContact: false,
        };
    }

    componentDidMount() {

        this.props.getContactsAsUsers();
        //this.props.getCompanyUsers();
        this.props.getCompanies();
    }

    deleteEditingContact = (obj) => {
        if (this.state.editingContact) {
            this.setState({
                selectedUsers: this.state.selectedUsers.filter(user => user.id != this.state.editingContact.id),
                editingContact: ''
            })
        }
    }

    setAddContact = (addContact) => {
        this.setState({ addContact });
    }

    onSelectCompany = (company) => {
        this.setState({
            selectedCompany: company
        });
        this.props.getCompanyUsers({ companyId: company.id });
    }



    onClickRecipient = (user) => {
        this.setState({
            editingContact: user,
            listUser: user
        })
    }
    onToggleUsers = () => {
        this.setState({
            isUsers: !this.state.isUsers
        })
        this.props.getCompanies();

        this.companies = this.props.companies;
    }
    clearEditingContact = () => {
        this.setState({
            editingContact: '',
            listUser: []
        });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    switchUsers = () => {
        this.users = [];
        if (this.state.isUsers) {
            this.users = this.props.contacts;
        }
        else {
            if (this.props.companyUsers != null) {
                this.users.contacts = this.props.companyUsers;
            }
            else {
                this.users.contacts = [];
            }
        }
    }
    toggleLoader = () => {
        if (this.state.loading) {
            return (
                <RctSectionLoader />
            )
        }
    }
    createContact = (reqObj) => {
        console.log('CreateContact with Params:', reqObj);
        this.props.createContact(reqObj);
    }


    updateContact = (reqObj) => {
        this.props.updateContact(reqObj);

        this.clearEditingContact();
        this.props.onDeSelectUser(reqObj.id);

    }
    deleteContact = () => {
        this.clearEditingContact();
        this.props.onDeleteRecipient(this.state.editingContact.id);
    }

    onSubmitForm = (obj) => {
        if (obj.file) {
            toBase64(obj.file).then((base64) => {
                obj.CertPEM = base64;
                obj.certEmail = obj.email;
                if (obj.id) {
                    this.updateContact(obj);
                } else {
                    this.createContact(obj);
                }
            }).catch(console.log);
        } else {
            obj.certEmail = obj.email;
            if (obj.id) {
                this.updateContact(obj);
            }
            else {
                this.createContact(obj);
            }
        }
    }

    render() {
        const { companies, companyUsers, contacts, loading } = this.props;

        this.toggleLoader();
        this.switchUsers();
        return (
            <div>
                {
                    loading == true &&
                    <RctSectionLoader />
                }
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            style={{
                                borderColor: this.state.activeTab === '1' ? '#EBEDF2 #EBEDF2 #5D92F4 #F4F7FA' : '#EBEDF2 #EBEDF2 #F4F7FA',
                                borderBottomWidth: this.state.activeTab === '1' ? '2px' : "1px"
                            }}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Recipients
              </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            style={{
                                borderColor: this.state.activeTab === '2' ? '#EBEDF2 #EBEDF2 #5D92F4 #F4F7FA' : '#EBEDF2 #EBEDF2 #F4F7FA',
                                borderBottomWidth: this.state.activeTab === '2' ? '2px' : "1px"
                            }}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Signing Order
              </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">

                                {
                                    this.users && this.users.contacts &&
                                    <Recipients
                                        users={this.users.contacts}
                                        onSelectUser={this.props.onSelectUser}
                                        onSelectCompany={this.onSelectCompany}
                                        selectedUsers={this.props.selectedUsers}
                                        selectedCompany={this.state.selectedCompany}
                                        deleteEditingContact={this.deleteEditingContact}
                                        clearEditing={this.clearEditingContact}
                                        editingContact={this.state.editingContact}
                                        onClickRecipient={this.onClickRecipient}
                                        companies={this.companies}
                                        isUsers={this.state.isUsers}
                                        onClickToggleUsers={this.onToggleUsers}
                                        onSubmitForm={this.onSubmitForm}
                                        deleteContact={this.deleteContact}
                                        currentUser={this.state.listUser}
                                        addContact={this.state.addContact}
                                        setAddContact={this.setAddContact}
                                    />
                                }



                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <SigningOrder selectedUsers={this.props.selectedUsers} onClickRecipient={() => { }} />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );

    }
}

const mapStateToProps = ({ documentViewer, contacts }) => {
    const { companies } = documentViewer;
    const { companyUsers } = contacts;
    return { companies, companyUsers, contacts };
}

export default withRouter(
    connect(mapStateToProps,
        {

            getCompanies,
            getCompanyUsers,
            getContactsAsUsers,
            createContact,
            updateContact,
            deleteContacts
        }
    )(RecipientActions));