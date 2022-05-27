import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TouchableHighlight, Image, Platform, ScrollView, } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Backicon from '../../../../../../assets/images/backicon.svg'
import Line from '../../../../../../assets/images/line.svg'

import Fire from '../../../../../../assets/images/testResFire.svg'
import { connect } from 'react-redux';
import { getCorrectPoint, getFinallTest } from './../../../../../redux/store/reducers/tests-reducer';




const TestResult = ({ route, totalQuestionCount, countCorrectAnswers, getFinallTest }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainPage")}
          style={styles.backView}
        >
          <Backicon />
        </TouchableOpacity>
        <View style={styles.textView}>
          <View style={styles.textView_block}>
            <Text style={styles.headerTitle}>{route.params.testName}</Text>
            <Line width={100} alignSelf="center" marginTop={4} />
          </View>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}></Text>
        </View>
      </View>

      <View
        style={{
          width: "92%",
          backgroundColor: "silver",
          height: 1,
          marginTop: "7%",
          alignSelf: "center",
        }}
      ></View>

      <ScrollView>
        <View style={styles.content}>
          <View style={styles.contentQuest}>
            <Fire style={{ width: 24, marginLeft: "29%", marginRight: "5%" }} />
            <Text style={styles.contentText}>Вы прошли тест!</Text>
          </View>

          <View style={styles.contentQuest2}>
            <Text
              style={{
                fontSize: 35,
                alignSelf: "center",
                fontWeight: "700",
                marginTop: "3%",
              }}
            >
              {countCorrectAnswers}{" "}
              <Text style={{ fontSize: 13, color: "silver" }}>
                /{totalQuestionCount}
              </Text>
            </Text>

            <Text style={styles.contentText2}>правильных ответов</Text>
          </View>
          <TouchableOpacity style={styles.buttonstyle1}>
            <Text style={styles.textbutton1}>Посмотреть результаты</Text>
          </TouchableOpacity>

          <View
            style={Platform.OS == "ios" ? styles.progress : styles.progressA}
          >
            <View style={styles.progressTop}>
              <Text style={{ fontSize: 20, alignSelf: "center" }}>
                {countCorrectAnswers}{" "}
                <Text style={{ fontSize: 13 }}>/{totalQuestionCount}</Text>
              </Text>
            </View>

            <View style={styles.progressBottom}>
              <LinearGradient
                style={{ height: 4, width: "100%", borderRadius: 2 }}
                colors={["#159CE4", "#4AD0EE"]}
              ></LinearGradient>
            </View>

            <View style={styles.btnMain}>
              <TouchableOpacity
                onPress={() => {
                  getFinallTest(
                    route.params.testId,
                    countCorrectAnswers,
                    navigation,
                    "end"
                  );
                }}
                style={styles.buttonstyle1}
              >
                <Text style={styles.textbutton1}>Завершить тест</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  getFinallTest(
                    route.params.testId,
                    countCorrectAnswers,
                    navigation,
                    "another"
                  );
                }}
                style={styles.buttonstyle2}
              >
                <Text style={styles.textbutton2}>пройти другой тест</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    totalQuestionCount: state.tests.totalQuestionCount,
    countCorrectAnswers: state.tests.countCorrectAnswers,
  };
};

export default connect(mapStateToProps, { getCorrectPoint, getFinallTest })(
  TestResult
);

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  btnMain: {
    width: "94%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  btnComplate: {
    width: "48%",
    height: 55,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#159CE4",
    borderRadius: 25,
  },
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    width: "90%",
    paddingTop: 50,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  backView: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 60,
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "15%",
  },
  textView: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textView_block: {
    width: "100%",
    textAlign: "center",
  },
  circle: {
    width: "100%",
    height: 50,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 50,
  },
  circleText: {
    fontSize: 15,
    color: "#159CE4",
  },
  headerTitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#374957",
    textAlign: "center",
  },
  content: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    position: "relative",
  },

  contentQuest: {
    width: "90%",
    backgroundColor: "white",
    marginBottom: "5%",
    height: 60,
    flexDirection: "row",
    borderRadius: 20,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowColor: "#159CE4",
    elevation: 5,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  contentQuest2: {
    width: "90%",
    backgroundColor: "white",
    marginTop: "5%",
    marginBottom: "5%",
    flexDirection: "row",
    borderRadius: 20,
    height: 100,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowColor: "#159CE4",
    elevation: 5,
    alignItems: "center",
    flexDirection: "column",
  },
  contentText2: {
    fontWeight: "700",
    fontSize: 17,
  },

  contentText: {
    width: "75%",
    fontWeight: "500",
    fontSize: 15,
    alignSelf: "center",
  },
  progressBack: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.16,
    height: Dimensions.get("window").width * 0.16,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "white",
  },
  progressNext: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.16,
    height: Dimensions.get("window").width * 0.16,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "white",
  },

  progress: {
    width: "100%",
    alignItems: "center",
    // position: 'absolute',
    marginTop: deviceHeight * 0.1,
  },
  progressA: {
    width: "100%",
    alignItems: "center",
    // position: 'absolute',
    marginTop: deviceHeight * 0.1,
  },
  progressTop: {
    width: "94%",
    flexDirection: "row",
    justifyContent: "center",
  },
  progressBottom: {
    marginTop: "2%",
    width: "94%",
    height: 4,
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonstyle1: {
    borderColor: "#159CE4",
    borderWidth: 2,
    width: "49%",
    height: 45,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  textbutton1: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
  buttonstyle2: {
    backgroundColor: "#159CE4",
    borderColor: "#159CE4",
    borderWidth: 2,
    width: "49%",
    height: 45,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  textbutton2: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});
