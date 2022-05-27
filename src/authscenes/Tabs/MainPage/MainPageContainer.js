import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spiner from './../../../common/Spiner/Spiner';
import MainPage from './';
import { getAllInfoForMainPage } from './../../../redux/store/reducers/mainPage-reducer';

class MainPageContainer extends Component {

    componentDidMount() {

        if (this.props.userData.length === 0 && this.props.appealList.length === 0 && this.props.allInfo.length === 0) {
            this.props.getAllInfoForMainPage(this.props.token)
        }

    }

    render() {
        return (
            this.props.isLoading ?
                <Spiner />
                :
                <>
                    <MainPage {...this.props} />
                </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        isLoading: state.mainPage.isLoading,
        appealList: state.mainPage.appealListData,
        userData: state.mainPage.userData,
        allInfo: state.mainPage.allInfo
    }
}

export default connect(mapStateToProps, { getAllInfoForMainPage })(MainPageContainer)