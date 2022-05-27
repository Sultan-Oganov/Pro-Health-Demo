import { Alert } from 'react-native';
import { contactsAPI } from './../../../API/index';

let initialState = {
    designation: [],
    isLoading: false,
    ourCordinates: [],
    contacts: [],
    currentContactsCoordinate: {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        longitude: 37.617298,
        latitude: 55.755825
    }

}

const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
const SET_DESIGNATION = 'SET_DESIGNATION'
const SET_OUR_COORDINATES = 'SET_OUR_COORDINATES'
const SET_CONTACTS = 'SET_CONTACTS'
const SET_CURRENT_CONTACT_COORDINATE = 'SET_CURRENT_CONTACT_COORDINATE'



const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SET_DESIGNATION:
            return {
                ...state,
                designation: action.designation
            }
        case SET_OUR_COORDINATES:
            return {
                ...state,
                ourCordinates: action.ourCordinates
            }

        case SET_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            }
        case SET_CURRENT_CONTACT_COORDINATE:
            return {
                ...state,
                currentContactsCoordinate: { ...state.currentContactsCoordinate, longitude: action.lon, latitude: action.lat, title: action.title }
            }

        default:
            return state
    }
}

export const toggleIsLoading = (isLoading) => ({ type: TOGGLE_IS_LOADING, isLoading })
export const setDesignation = (designation) => ({ type: SET_DESIGNATION, designation })
export const setOurCoordinates = (ourCordinates) => ({ type: SET_OUR_COORDINATES, ourCordinates })
export const setContacts = (contacts) => ({ type: SET_CONTACTS, contacts })
export const setCurrentContactCoordinate = (lon, lat, title) => ({ type: SET_CURRENT_CONTACT_COORDINATE, lon, lat, title })



export const getDesignation = () => (dispatch) => {
    dispatch(toggleIsLoading(true))
    contactsAPI.getDesignation()
        .then(response => {
            dispatch(toggleIsLoading(false))
            dispatch(setDesignation(response))
        })
}

export const getOurCoordinates = () => (dispatch) => {
    dispatch(toggleIsLoading(true))
    contactsAPI.getOurCordinates()
        .then(response => {
            dispatch(toggleIsLoading(false))
            let arr = []
            response.map(el => {
                arr.push({ ...el, latitudeDelta: 0.0922, longitudeDelta: 0.0421 })
            })
            dispatch(setOurCoordinates(arr))
        })
}


export const getContacts = () => (dispatch) => {
    dispatch(toggleIsLoading(true))
    contactsAPI.getContacts()
        .then(response => {
            dispatch(toggleIsLoading(false))
            dispatch(setContacts(response))
        })
}


export const getCurrentContactCoordinate = (lon, lat, title) => (dispatch) => {
    dispatch(setCurrentContactCoordinate(lon, lat, title))
}

export const sendFeedBack = (data) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    contactsAPI.sendFeedBack(data)
        .then(response => {
            if (response.id) {
                dispatch(toggleIsLoading(false))
                Alert.alert('Успешно', 'Ваше обращение отправлено!!!')
            }
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
            Alert.alert('Ошибка', 'Попробуйте позже!!!')
        })
}


export default contactsReducer