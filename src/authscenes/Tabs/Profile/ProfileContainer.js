import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from './';
import Spiner from './../../../common/Spiner/Spiner';
import { getAuthUserData, userLogout } from "../../../redux/store/reducers/user-reducer";


class ProfileContainer extends Component {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            this.props.isLoading ?
                <Spiner />
                :
                <>
                    <Profile {...this.props} />
                </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading,
        username: state.user.username,
        email: state.user.email,
    }
}

export default connect(mapStateToProps, { getAuthUserData, userLogout })(ProfileContainer)