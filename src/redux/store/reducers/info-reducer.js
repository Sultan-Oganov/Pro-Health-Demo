import { Alert } from 'react-native';
import { infoAPI } from './../../../API';

const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
const SET_ALL_INFO = 'SET_ALL_INFO'

let initialState = {
    isLoading: false,
    allInfo: []
}

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SET_ALL_INFO:
            return {
                ...state,
                allInfo: action.allInfo
            }

        default:
            return state
    }
}

export const toggleIsLoading = (isLoading) => ({ type: TOGGLE_IS_LOADING, isLoading })
export const setAllInfo = (allInfo) => ({ type: SET_ALL_INFO, allInfo })

export const getAllInfo = () => (dispatch) => {
    dispatch(toggleIsLoading(true))
    infoAPI.allInfo()
        .then(response => {
            dispatch(toggleIsLoading(false))
            dispatch(setAllInfo(response))
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
        })
}

export default infoReducer