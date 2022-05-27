import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import Contacts from './';
import Spiner from '../../../../common/Spiner/Spiner';
import { getDesignation } from './../../../../redux/store/reducers/contacts-reducer';

class ContactsContainer extends Component {

    componentDidMount() {
        this.props.getDesignation()
    }

    render() {
        return (
            this.props.isLoading ?
                <Spiner />
                :
                <>
                    <Contacts {...this.props} />
                </>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.contacts.isLoading,
        designation: state.contacts.designation
    }
}

export default connect(mapStateToProps, { getDesignation })(ContactsContainer)