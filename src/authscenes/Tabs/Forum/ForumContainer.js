import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spiner from '../../../common/Spiner/Spiner';
import { getListData } from '../../../redux/store/reducers/forum-reducer';
import Forum from './';

class ForumContainer extends Component {

    componentDidMount() {
        this.props.getListData()
    }

    render() {
        return (
            this.props.isLoading ?
                <Spiner />
                :
                <>
                    <Forum {...this.props} />
                </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.forum.isLoading,
        list: state.forum.list
    }
}

export default connect(mapStateToProps, { getListData })(ForumContainer)
