import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, TouchableHighlight, Image, ScrollView, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Backicon from '../../../../../../assets/images/backicon.svg'
import Line from '../../../../../../assets/images/line.svg'


export default function Test({ route, questions, onceOfProgress, getOnceOfProgress, currentQuestion, changeCurrentQuestion, checkAnswer, showAnswer, countCorrectAnswers, getCorrectPoint, getCorrectAnswer, correctAnswer, detailsInfo, currentDetailInfo, getCurrentDetailInfo }) {
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
            <TouchableHighlight
              style={
                showAnswer
                  ? correctAnswer
                    ? styles.curcleBtnTrue
                    : styles.curcleBtnFalse
                  : styles.curcleBtn
              }
              underlayColor="#ccc"
            >
              <Text
                style={
                  showAnswer
                    ? correctAnswer
                      ? styles.contentNumber
                      : styles.contentNumberFalse
                    : styles.contentNumber
                }
              >
                {" "}
                {currentQuestion + 1}{" "}
              </Text>
            </TouchableHighlight>

            <Text style={styles.contentText}>
              {questions.length != 0 ? questions[currentQuestion].title : null}
            </Text>
          </View>

          <View style={styles.testVariants}>
            {questions.length != 0 &&
              questions[currentQuestion].answer.map((answer) => {
                return (
                  <TouchableOpacity
                    disabled={showAnswer}
                    key={answer.id}
                    backgroundColor={"white"}
                    style={
                      showAnswer
                        ? answer.answer_text ==
                          questions[currentQuestion].true_answer.answer_text
                          ? styles.trueVariants
                          : styles.variants
                        : styles.variants
                    }
                    onPress={() => {
                      getCurrentDetailInfo(questions[currentQuestion].true_answer.id, detailsInfo)
                      checkAnswer(currentQuestion, questions.length, navigation, route.params.testName)
                      if (answer.answer_text == questions[currentQuestion].true_answer.answer_text) {
                        getCorrectPoint(countCorrectAnswers + 1)
                        getCorrectAnswer(true)
                      } else {
                        getCorrectAnswer(false);
                      }
                      getOnceOfProgress(onceOfProgress + onceOfProgress);
                    }}
                  >
                    <View
                      style={
                        showAnswer
                          ? answer.answer_text ==
                            questions[currentQuestion].true_answer.answer_text
                            ? styles.trueVariantsCheck
                            : styles.falseVariantsCheck
                          : styles.variantsCheck
                      }
                    ></View>
                    <Text
                      style={
                        showAnswer
                          ? answer.answer_text ==
                            questions[currentQuestion].true_answer.answer_text
                            ? styles.trueVariantsText
                            : styles.falseVariantsText
                          : styles.variantsText
                      }
                    >
                      {answer.answer_text}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>

          {showAnswer ? (
            <View style={styles.question}>
              <TouchableHighlight
                style={{
                  borderRadius:
                    Math.round(
                      Dimensions.get("window").width +
                      Dimensions.get("window").height
                    ) / 2,
                  width: Dimensions.get("window").width * 0.16,
                  height: Dimensions.get("window").width * 0.16,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor: correctAnswer ? "#26E415" : "#B4D1D7",
                  margin: 10,
                  alignSelf: "center",
                }}
                underlayColor="#ccc"
              >
                <Text
                  style={
                    showAnswer
                      ? correctAnswer
                        ? styles.trueQuest
                        : styles.falseQuest
                      : styles.trueQuest
                  }
                >
                  {" "}
                  !{" "}
                </Text>
              </TouchableHighlight>
              <View style={styles.questText}>
                <Text style={styles.contentTextUp}>
                  {showAnswer
                    ? correctAnswer
                      ? "Правильно!"
                      : "Правильный ответ:"
                    : null}
                </Text>
                <Text style={styles.contentTextBot}>
                  {questions[currentQuestion].true_answer.answer_text}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.btnQuest}
                onPress={() => {
                  Alert.alert('Подробнее', currentDetailInfo)
                }}
              >
                <Text style={{ color: 'white', fontWeight: '400', }}>
                  {showAnswer
                    ? correctAnswer
                      ? "ПОДРОБНЕЕ"
                      : "ПОЧЕМУ?"
                    : null}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View
            style={
              Platform.OS == "ios"
                ? {
                  width: "100%",
                  alignItems: "center",
                  marginTop: showAnswer
                    ? deviceHeight * 0.019
                    : deviceHeight * 0.2,
                }
                : {
                  width: "100%",
                  alignItems: "center",
                  marginTop: showAnswer
                    ? deviceHeight * 0.01
                    : deviceHeight * 0.17,
                }
            }
          >
            <View style={styles.progressTop}>
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                {currentQuestion + 1}
                <Text style={{ fontSize: 13 }}>/{questions.length}</Text>
              </Text>
            </View>

            <View style={styles.progressBottom}>
              {Platform.OS == "android" ? (
                <LinearGradient
                  width={onceOfProgress + "%"}
                  style={{ height: 4, borderRadius: 10 }}
                  colors={["#159CE4", "#4AD0EE"]}
                ></LinearGradient>
              ) : (
                <LinearGradient
                  style={{
                    height: 4,
                    width: onceOfProgress + "%",
                    borderRadius: 2,
                  }}
                  colors={["#159CE4", "#4AD0EE"]}
                ></LinearGradient>
              )}
            </View>

            <View style={styles.btnMain}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TestResult", {
                    testName: route.params.testName,
                    testId: route.params.testId,
                  });
                }}
                style={styles.buttonstyle1}
              >
                <Text style={styles.textbutton1}>Завершить тест</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  changeCurrentQuestion(
                    currentQuestion,
                    questions.length,
                    "next",
                    navigation,
                    route.params.testName,
                    route.params.testId
                  );

                  getOnceOfProgress(onceOfProgress + onceOfProgress);
                }}
                style={styles.buttonstyle2}
              >
                <Text style={styles.textbutton2}>Следующий вопрос</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  curcleBtn: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.16,
    height: Dimensions.get("window").width * 0.16,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#F2F3F4",
    margin: 10,
    alignSelf: "center",
  },
  curcleBtnTrue: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.16,
    height: Dimensions.get("window").width * 0.16,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#26E415",
    margin: 10,
    alignSelf: "center",
  },
  curcleBtnFalse: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.16,
    height: Dimensions.get("window").width * 0.16,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#F03800",
    margin: 10,
    alignSelf: "center",
  },

  questText: {
    width: "40%",
    alignSelf: "center",
  },
  contentTextBot: {
    fontWeight: "700",
    fontSize: 17,
  },
  contentTextUp: {
    fontWeight: "500",
    fontSize: 15,
  },
  trueQuest: {
    fontSize: 25,
    color: "#26E415",
    fontWeight: "700",
  },
  falseQuest: {
    fontSize: 25,
    color: "#B4D1D7",
    fontWeight: "700",
  },
  question: {
    width: "90%",
    backgroundColor: "white",
    marginTop: "6%",
    marginBottom: "5%",

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
  },
  trueVariants: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    marginTop: 10,
  },

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
  btnQuest: {
    width: "28%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 20,
    backgroundColor: "#159CE4",
    marginLeft: 5,
  },
  btnNext: {
    width: "48%",
    textAlign: "center",
    height: 55,
    borderRadius: 25,
    backgroundColor: "#159CE4",
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
  contentNumberFalse: {
    fontSize: 25,
    color: "#F03800",
    fontWeight: "700",
  },
  contentNumber: {
    fontSize: 25,
    color: "#26E415",
    fontWeight: "700",
  },
  contentQuest: {
    width: "90%",
    backgroundColor: "white",
    marginBottom: "2%",

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
  },
  contentText: {
    width: "75%",
    fontWeight: "500",
    fontSize: 15,
    alignSelf: "center",
  },
  testVariants: {
    width: "100%",
  },
  variants: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  trueVariantsCheck: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.06,
    height: Dimensions.get("window").width * 0.06,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "green",
    marginLeft: 15,
    marginRight: 15,
  },
  falseVariantsCheck: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.06,
    height: Dimensions.get("window").width * 0.06,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "red",
    marginLeft: 15,
    marginRight: 15,
  },

  variantsCheck: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.06,
    height: Dimensions.get("window").width * 0.06,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#B4D1D7",
    marginLeft: 15,
    marginRight: 15,
  },
  trueVariantsText: {
    color: "green",
    fontSize: 18,
  },
  falseVariantsText: {
    color: "red",
    fontSize: 18,
  },
  variantsText: {
    color: "#374957",
    fontSize: 18,
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
    marginTop: deviceHeight * 0.07,
  },
  progress2: {
    width: "100%",
    alignItems: "center",
    // position: 'absolute',
    marginTop: deviceHeight * 0.23,
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
    overflow: "hidden",
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
