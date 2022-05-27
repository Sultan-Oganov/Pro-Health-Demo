import { getToken } from '../../../AsyncStorage/AsyncStorage';
import { forumAPI, infoAPI, authAPI } from './../../../API';

const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
const SET_ALL_INFO = 'SET_ALL_INFO'
const SET_USER_DATA = 'SET_USER_DATA'
const SET_APPEAL_LIST_DATA = 'SET_APPEAL_LIST_DATA'

let initialState = {
    isLoading: false,
    allInfo: [],
    userData: [],
    appealListData: []
}

const mainPageReducer = (state = initialState, action) => {
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
        case SET_USER_DATA: {
            return {
                ...state,
                userData: action.userData
            }
        }
        case SET_APPEAL_LIST_DATA: {
            return {
                ...state,
                appealListData: action.appealListData
            }
        }
        default:
            return state
    }
}

export const toggleIsLoading = (isLoading) => ({ type: TOGGLE_IS_LOADING, isLoading })
export const setAllInfo = (allInfo) => ({ type: SET_ALL_INFO, allInfo })
export const setUserData = (userData) => ({ type: SET_USER_DATA, userData })
export const setAppealListData = (appealListData) => ({ type: SET_APPEAL_LIST_DATA, appealListData })


export const getAllInfoForMainPage = (token) => async (dispatch) => {
    if (token === null) {
        token = await getToken()
    }
    dispatch(toggleIsLoading(true))

    try {
        let req = await fetch('http://62.109.8.101/api/v1/list/all_information', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        let res = await req.json()

        dispatch(setAllInfo(res))

        let req2 = await fetch('http://62.109.8.101/api/v1/auth/users/me/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        let res2 = await req2.json()
        dispatch(setUserData(res2))

        let req3 = await fetch('http://62.109.8.101/api/v1/list/appeal', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })

        let res3 = await req3.json()
        dispatch(setAppealListData(res3))
        dispatch(toggleIsLoading(false))
    }
    catch (err) {
      
        dispatch(toggleIsLoading(false))
    }

}

export default mainPageReducer