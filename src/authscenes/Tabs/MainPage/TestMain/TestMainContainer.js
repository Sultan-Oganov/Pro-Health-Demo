import React from 'react'
import { connect } from 'react-redux'
import { getAllTests } from '../../../../redux/store/reducers/tests-reducer';
import TestMain from './'
import Spiner from './../../../../common/Spiner/Spiner';


class TestMainContainer extends React.Component {

    componentDidMount() {
        this.props.getAllTests()
    }

    render() {
        return (

            this.props.isLoading ?
                <Spiner />
                :
                <>
                    <TestMain {...this.props} />
                </>

        )

    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.tests.isLoading,
        tests: state.tests.allTests
    }
}

export default connect(mapStateToProps, { getAllTests })(TestMainContainer)