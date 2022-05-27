import { Alert, Platform } from 'react-native';
import { setToken, clearAll } from '../../../AsyncStorage/AsyncStorage';
import { authAPI } from './../../../API';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
const TOKEN_IS_HAVE = 'TOKEN_IS_HAVE'
const SIGNUP = 'SIGNUP'
const SIGNIN = 'SIGNIN'
const SET_USER_DATA = 'SET_USER_DATA'
const LOGOUT = 'LOGOUT'


let initialState = {
    id: null,
    email: null,
    username: null,
    phone: null,
    isAuth: false,
    isLoading: false,
    token: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TOKEN_IS_HAVE:
            return {
                ...state,
                isAuth: true
            }
        case SIGNUP:
            return {
                ...state,
                isAuth: true,
                token: action.token
            }
        case SIGNIN:
            return {
                ...state,
                isAuth: true,
                token: action.token
            }
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case LOGOUT:
            return {
                ...state,
                ...initialState
            }
        default:
            return state
    }
}

export const toggleIsLoading = (isLoading) => ({ type: TOGGLE_IS_LOADING, isLoading })
export const haveToken = () => ({ type: TOKEN_IS_HAVE })
export const setAuthUserData = (email, phone, username, id) => ({ type: SET_USER_DATA, data: { email, phone, username, id } })
export const signUp = (token) => ({ type: SIGNUP, token })
export const signIn = (token) => ({ type: SIGNIN, token })
export const logout = () => ({ type: LOGOUT })


export const getAuthUserData = () => (dispatch) => {
    dispatch(toggleIsLoading(true))
    authAPI.me()
        .then(response => {
            dispatch(toggleIsLoading(false))
            if (response.id) {
                let { email, phone, username, id } = response
                dispatch(setAuthUserData(email, phone, username, id))
            }
        })
}



const registerForPushNotificationsAsync = async (name = null, userToken) => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;

        let data = {
            "name": name,
            "registration_id": userToken,
            "device_id": token,
            "active": true,
            "type": Platform.OS
        }

        authAPI.getExpoNotification(data, userToken)
            .then(response => {
              
            })



    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
};


export const authSignUp = (userData) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    authAPI.signUp(userData)
        .then(async (response) => {
            dispatch(toggleIsLoading(false))
            if (response.data.token) {
                let { token } = response.data
                registerForPushNotificationsAsync(null, token)
                dispatch(signUp(token))
                setToken(await response.data.token)
            } else {
                Alert.alert('Такой пользователь существует!!!', 'Повторите попытку ')
            }
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
         
        })
}

export const authSignIn = (userData) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    authAPI.signIn(userData)
        .then(async (response) => {
            dispatch(toggleIsLoading(false))
            if (response.data.auth_token) {
                let { auth_token } = response.data
                registerForPushNotificationsAsync(response.data.username, auth_token)
                dispatch(signIn(auth_token))
                setToken(await response.data.auth_token)
                getAuthUserData()
            }
        }).catch(e => {
            dispatch(toggleIsLoading(false))
            Alert.alert('Неправильные данные!!!', 'Повторите попытку ')
        })
}

export const getResetToken = (email, navigation) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    authAPI.getResetToken(email)
        .then(async (response) => {
            dispatch(toggleIsLoading(false))
            if (response.data.status === 'OK') {
                navigation.navigate('NewPassword')
            }
        })
        .catch(e => {
            dispatch(toggleIsLoading(false))
            Alert.alert('Неправильные данные!!!', 'Повторите попытку ')
        })
}

export const resetPassword = (userData, navigation) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    authAPI.resetPassword(userData)
        .then(response => {
            dispatch(toggleIsLoading(false))
            if (response.detail) {
                Alert.alert('Не правильный код!!!', 'Проверьте код')
            } else if (response.status) {
                Alert.alert('Успешно!!!', 'Пароль изменен')
                navigation.navigate('Login')
            } else {
                response?.password.forEach(el => {
                    Alert.alert('Error', el)
                })
            }
        })
        .catch(err => {
            dispatch(toggleIsLoading(false))
        })
    dispatch(toggleIsLoading(true))
}

export const userLogout = () => (dispatch) => {
    // dispatch(toggleIsLoading(false))
    dispatch(logout())
    clearAll()
}

export default userReducer