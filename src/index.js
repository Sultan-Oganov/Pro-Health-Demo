import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import WorkScenes from "./workscenes";
import AuthScenes from "./authscenes";
import { connect } from "react-redux";
import { getToken } from "./AsyncStorage/AsyncStorage";
import { haveToken } from './redux/store/reducers/user-reducer';



const Home = ({ isAuth, haveToken }) => {

  useEffect(() => {
    (async () => {
      let token = await getToken()
      if (token) haveToken()
    })()
  }, [])

  return (
    isAuth
      ? <WorkScenes /> :
      <AuthScenes />
  );
}

Home.propTypes = {
  isAuth: PropTypes.bool
};

Home.defaultProps = {
  isAuth: false
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
  }
}

export default connect(mapStateToProps, { haveToken })(Home);