import { Alert } from "react-native"
import { forumAPI } from "../../../API"

const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
const SET_LIST_DATA = 'SET_LIST_DATA'
const SET_APPEAL_LIST = 'SET_APPEAL_LIST'
const SET_COMMENTS = 'SET_COMMENTS'
const SET_CURRENT_COMMENT = 'SET_CURRENT_COMMENT'
const FILTER_NEW_COMMENT = 'FILTER_NEW_COMMENT'
const FILTER_OLD_COMMENT = 'FILTER_OLD_COMMENT'
const SET_COMMENT_PARRENT_ID = 'SET_COMMENT_PARRENT_ID'




let initialState = {
    isLoading: false,
    list: [],
    appealList: [],
    comments: [],
    currentComment: null,
    commentParrentId: null
}


const forumReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SET_LIST_DATA:
            return {
                ...state,
                list: action.data
            }
        case SET_APPEAL_LIST:
            return {
                ...state,
                appealList: action.data
            }
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        case SET_CURRENT_COMMENT:
            return {
                ...state,
                currentComment: action.id
            }
        case FILTER_NEW_COMMENT:
            return {
                ...state,
                appealList: action.appealList.reverse()
            }
        case FILTER_OLD_COMMENT:
            return {
                ...state,
                appealList: action.appealList.reverse()
            }
        case SET_COMMENT_PARRENT_ID:
            return {
                ...state,
                commentParrentId: action.commentParrentId
            }
        default:
            return state
    }
}

export const toggleIsLoading = (isLoading) => ({ type: TOGGLE_IS_LOADING, isLoading })
export const setListData = (data) => ({ type: SET_LIST_DATA, data })
export const setAppealList = (data) => ({ type: SET_APPEAL_LIST, data })
export const setComments = (comments) => ({ type: SET_COMMENTS, comments })
export const setCurrentComment = (id) => ({ type: SET_CURRENT_COMMENT, id })
export const setFilterNew = (appealList) => ({ type: FILTER_NEW_COMMENT, appealList })
export const setFilterOld = (appealList) => ({ type: FILTER_OLD_COMMENT, appealList })
export const setCommentParrentId = (commentParrentId) => ({ type: SET_COMMENT_PARRENT_ID, commentParrentId })




export const getListData = (name = '') => (dispatch) => {

    name ? null : dispatch(toggleIsLoading(true))
    forumAPI.getForumList(name)
        .then(response => {
            dispatch(toggleIsLoading(false))
            dispatch(setListData(response))
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
        })
}

export const getAppealListData = (name = '') => (dispatch) => {
    name ? null : dispatch(toggleIsLoading(false))
    forumAPI.getAppealist(name)
        .then(response => {
            dispatch(setAppealList(response))
        })
        .catch(err => {
        })
}

export const getComments = () => (dispatch) => {
    dispatch(toggleIsLoading(true))
    forumAPI.getComments()
        .then(response => {
            dispatch(toggleIsLoading(false))
            dispatch(setComments(response))
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
        })
}

export const createComment = (comment, appeal, author, parent = null) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    forumAPI.createComment(comment, appeal, author, parent)
        .then(response => {
            dispatch(toggleIsLoading(false))
            Alert.alert('Успешно', 'Комментарий добавлен!!!')
            forumAPI.getComments()
                .then(response => {
                    dispatch(toggleIsLoading(false))
                    dispatch(setComments(response))
                })
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
            Alert.alert('Ошибка сервера', 'Повторите позже!!!')
        })
}

export const deleteComment = (id) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    forumAPI.deleteComment(id)
        .then(response => {
            dispatch(toggleIsLoading(false))
            Alert.alert('Успешно', 'Комментарий удалён!!!')
            forumAPI.getComments()
                .then(response => {
                    dispatch(toggleIsLoading(false))
                    dispatch(setComments(response))
                })
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
        })

}

export const editComment = (id, editData) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    forumAPI.editComment(id, editData)
        .then(response => {
            if (response.id) {
                dispatch(toggleIsLoading(false))
                Alert.alert('Успешно', 'Комментарий изменён!!!')
                forumAPI.getComments()
                    .then(response => {
                        dispatch(toggleIsLoading(false))
                        dispatch(setComments(response))
                    })
            }
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
        })
}

export const deleteAppeal = (id, navigation) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    forumAPI.deleteAppeal(id)
        .then(response => {
            dispatch(toggleIsLoading(false))
            Alert.alert('Успешно', 'Обращение удалёно!!!')
            navigation.navigate('Forum')
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
        })
}

export const editAppeal = (id, editData, navigation) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    forumAPI.editAppeal(id, editData)
        .then(response => {
            if (response.id) {
                Alert.alert('Успешно', 'Данные изменены!!!')
                navigation.navigate('Forum')
            }
            dispatch(toggleIsLoading(false))
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
        })
}

export const createTopic = (data, navigation) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    forumAPI.createTopic(data)
        .then(response => {
            dispatch(toggleIsLoading(false))
            navigation.navigate('Forum')
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
        })
}

export const getCommentParentId = (id) => (dispatch) => {
    dispatch(setCommentParrentId(id))
}

export default forumReducer