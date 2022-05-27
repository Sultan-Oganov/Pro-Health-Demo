import { testsAPI } from "../../../API"


const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
const SET_ALL_TESTS = 'SET_ALL_TESTS'
const SET_ALL_QUESTIONS = 'SET_ALL_QUESTIONS'
const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION'
const TOGGLE_SHOW_ANSWER = 'TOGGLE_SHOW_ANSWER'
const SET_CORRECT_POINT = 'SET_CORRECT_POINT'
const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER'
const SET_TOTAL_QUESTION_COUNT = 'SET_TOTAL_QUESTION_COUNT'
const SET_ONCE_OF_PROGRESS = 'SET_ONCE_OF_PROGRESS'
const SET_DETAILS_INFO = 'SET_DETAILS_INFO'
const SET_CURRENT_DETAIL_INFO = 'SET_CURRENT_DETAIL_INFO'



let initialState = {
    allTests: [],
    questions: [],
    totalQuestionCount: 0,
    onceOfProgress: 0,
    currentQuestion: 0,
    isLoading: false,
    showAnswer: false,
    countCorrectAnswers: 0,
    correctAnswer: false,
    detailsInfo: [],
    currentDetailInfo: []
}



const testsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SET_ALL_TESTS:
            return {
                ...state,
                allTests: action.allTests
            }
        case SET_ALL_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            }
        case SET_TOTAL_QUESTION_COUNT:
            return {
                ...state,
                totalQuestionCount: action.count
            }
        case SET_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestion: action.num
            }
        case TOGGLE_SHOW_ANSWER:
            return {
                ...state,
                showAnswer: action.showAnswer
            }
        case SET_CORRECT_POINT:
            return {
                ...state,
                countCorrectAnswers: action.point
            }
        case SET_CORRECT_ANSWER:
            return {
                ...state,
                correctAnswer: action.answer
            }
        case SET_ONCE_OF_PROGRESS:
            return {
                ...state,
                onceOfProgress: action.count
            }
        case SET_DETAILS_INFO:
            return {
                ...state,
                detailsInfo: action.detailsInfo
            }
        case SET_CURRENT_DETAIL_INFO:
            return {
                ...state,
                currentDetailInfo: action.currentDetailInfo
            }
        default:
            return state
    }
}

export const toggleIsLoading = (isLoading) => ({ type: TOGGLE_IS_LOADING, isLoading })
export const setAllTests = (allTests) => ({ type: SET_ALL_TESTS, allTests })
export const setAllQuestions = (questions) => ({ type: SET_ALL_QUESTIONS, questions })
export const setCurrentQuestion = (num) => ({ type: SET_CURRENT_QUESTION, num })
export const toggleShowAnswer = (showAnswer) => ({ type: TOGGLE_SHOW_ANSWER, showAnswer })
export const setCorrectPoint = (point) => ({ type: SET_CORRECT_POINT, point })
export const setCorrectAnswer = (answer) => ({ type: SET_CORRECT_ANSWER, answer })
export const setTotalQuestionCount = (count) => ({ type: SET_TOTAL_QUESTION_COUNT, count })
export const setOnceOfProgress = (count) => ({ type: SET_ONCE_OF_PROGRESS, count })
export const setDetailsInfo = (detailsInfo) => ({ type: SET_DETAILS_INFO, detailsInfo })
export const setCurrentDetailInfo = (currentDetailInfo) => ({ type: SET_CURRENT_DETAIL_INFO, currentDetailInfo })



export const getAllTests = () => (dispatch) => {
    dispatch(toggleIsLoading(true))
    testsAPI.getTests()
        .then(async (response) => {
            dispatch(toggleIsLoading(false))
            dispatch(setAllTests(response))
        })
}

export const getAllQuestions = (testName) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    testsAPI.getQuestions(testName)
        .then(async (response) => {
            dispatch(toggleIsLoading(false))
            dispatch(setAllQuestions(response))
            dispatch(setTotalQuestionCount(response.length))
            dispatch(setOnceOfProgress(100 / response.length))
        })
}

export const changeCurrentQuestion = (num, length, btn, navigation, testName, testId) => (dispatch) => {
    dispatch(toggleShowAnswer(false))
    if (btn == 'next') {
        if (num < length - 1) {
            let i = num + 1
            dispatch(setCurrentQuestion(i))
        }
        else {
            navigation.navigate('TestResult', {
                testName,
                testId
            })
        }
    }
    // else if (btn == 'prev') {
    //     if (num > 0) {
    //         let i = num - 1
    //         dispatch(setCurrentQuestion(i))
    //     } else {
    //         dispatch(setCurrentQuestion(0))
    //     }
    // }
}

export const checkAnswer = () => (dispatch) => {
    dispatch(toggleShowAnswer(true))
}

export const getCorrectPoint = (point) => (dispatch) => {
    dispatch(setCorrectPoint(point))
}

export const getCorrectAnswer = (answer) => (dispatch) => {
    dispatch(setCorrectAnswer(answer))
}

export const getOnceOfProgress = (count) => (dispatch) => {
    dispatch(setOnceOfProgress(count))
}

export const getFinallTest = (id, result, navigation, navigate) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    testsAPI.setFinalResult({ quiz: id, result: result })
        .then(response => {
            dispatch(toggleIsLoading(false))
            navigate == 'end' ? navigation.navigate('MainPage') : navigation.navigate('TestMain')
        })
    dispatch(toggleShowAnswer(false))
    dispatch(setCurrentQuestion(0))
    dispatch(getCorrectPoint(0))
}

export const getDetailsInfo = () => (dispatch) => {
    dispatch(toggleIsLoading(true))
    testsAPI.detailsInfo()
        .then(response => {
            dispatch(toggleIsLoading(false))
            dispatch(setDetailsInfo(response))
        })
}

export const getCurrentDetailInfo = (questionId, arrDetailsInfo) => (dispatch) => {
    arrDetailsInfo.map(el => {
        return el.answer == questionId
            ?
            dispatch(setCurrentDetailInfo(el.text))
            :
            null

    })
}

export default testsReducer