import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getOurCoordinates } from '../../../../../redux/store/reducers/contacts-reducer';
import ContactsMap from './index';
import Spiner from './../../../../../common/Spiner/Spiner';

class ContactsMapContainer extends Component {
    componentDidMount() {
        this.props.getOurCoordinates()
    }
    render() {
        return (
            this.props.isLoading ?
                <Spiner />
                :
                <>
                    <ContactsMap {...this.props} />
                </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.contacts.isLoading,
        ourCordinates: state.contacts.ourCordinates
    }
}

export default connect(mapStateToProps, { getOurCoordinates })(ContactsMapContainer)