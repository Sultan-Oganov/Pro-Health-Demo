import React, { Component } from 'react'
import Spiner from '../../../../common/Spiner/Spiner'
import { getAppealListData, setFilterNew, setFilterOld } from '../../../../redux/store/reducers/forum-reducer';
import Forum1 from './';
import { connect } from 'react-redux';

class Forum1Container extends Component {
    componentDidMount() {
        this.props.getAppealListData()
    }

    render() {
        return (
            this.props.isLoading ?
                <Spiner />
                :
                <>
                    <Forum1 {...this.props} />
                </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.forum.isLoading,
        appealList: state.forum.appealList,
        userData: state.mainPage.userData
    }
}

export default connect(mapStateToProps, { getAppealListData, setFilterNew, setFilterOld })(Forum1Container)
