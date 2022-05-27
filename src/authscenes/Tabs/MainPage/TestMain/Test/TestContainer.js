import React from 'react'
import { connect } from 'react-redux'
import Test from './'
import Spiner from '../../../../../common/Spiner/Spiner';
import { changeCurrentQuestion, getAllQuestions, checkAnswer, getCorrectPoint, getCorrectAnswer, getOnceOfProgress, getDetailsInfo, getCurrentDetailInfo } from '../../../../../redux/store/reducers/tests-reducer';



class TestContainer extends React.Component {

    componentDidMount() {
        this.props.getAllQuestions(this.props.route.params.testName)
        this.props.getDetailsInfo()
    }


    render() {
        return (

            this.props.isLoading ?
                <Spiner />
                :
                <>
                    <Test {...this.props} />
                </>

        )

    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.tests.isLoading,
        questions: state.tests.questions,
        totalQuestionCount: state.tests.totalQuestionCount,
        currentQuestion: state.tests.currentQuestion,
        showAnswer: state.tests.showAnswer,
        countCorrectAnswers: state.tests.countCorrectAnswers,
        correctAnswer: state.tests.correctAnswer,
        onceOfProgress: state.tests.onceOfProgress,
        detailsInfo: state.tests.detailsInfo,
        currentDetailInfo: state.tests.currentDetailInfo

    }
}

export default connect(mapStateToProps, { getAllQuestions, changeCurrentQuestion, checkAnswer, getCorrectPoint, getCorrectAnswer, getOnceOfProgress, getDetailsInfo, getCurrentDetailInfo })(TestContainer)