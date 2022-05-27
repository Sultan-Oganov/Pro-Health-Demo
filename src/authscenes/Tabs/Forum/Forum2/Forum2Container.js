import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spiner from '../../../../common/Spiner/Spiner';
import Forum2 from './';
import { createComment, getComments, deleteComment, deleteAppeal, editAppeal, setCurrentComment, editComment, setCommentParrentId,getAppealListData } from './../../../../redux/store/reducers/forum-reducer';

class Forum2Container extends Component {

    componentDidMount() {
        this.props.getComments()
    }

    render() {
        return (
            this.props.isLoading ?
                <Spiner />
                :
                <>
                    <Forum2 {...this.props} />
                </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoading: state.forum.isLoading,
        userData: state.mainPage.userData,
        comments: state.forum.comments,
        currentComment: state.forum.currentComment,
        commentParrentId: state.forum.commentParrentId,
        appealList: state.forum.appealList,
    }
}

export default connect(mapStateToProps, { createComment, getComments, deleteComment, deleteAppeal, editAppeal, setCurrentComment, editComment, setCommentParrentId,getAppealListData })(Forum2Container)