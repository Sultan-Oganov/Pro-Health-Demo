import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spiner from '../../../../../common/Spiner/Spiner';
import ContactsDetail from './';

import { getContacts, getCurrentContactCoordinate } from './../../../../../redux/store/reducers/contacts-reducer';

class ContactsDetailContainer extends Component {
    componentDidMount() {
        this.props.getContacts()
    }

    render() {
        return (
            this.props.isLoading ?
                <Spiner />
                :
                <>
                    <ContactsDetail {...this.props} />
                </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.contacts.isLoading,

        contacts: state.contacts.contacts,
        currentContacts: state.contacts.currentContacts,
        currentContactsCoordinate: state.contacts.currentContactsCoordinate,
    }
}

export default connect(mapStateToProps, { getContacts, getCurrentContactCoordinate })(ContactsDetailContainer)

