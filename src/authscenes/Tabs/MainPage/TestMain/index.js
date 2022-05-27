import React from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Backicon from "../../../../../assets/images/backicon.svg";
import Line from "../../../../../assets/images/line.svg";
import Next from "../../../../../assets/images/next.svg";
import Check from "../../../../../assets/images/testMainCheck.png";

const TestMain = ({ tests }) => {
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
            <Text style={styles.headerTitle}>Teсты</Text>
            <Line width={100} alignSelf="center" marginTop={4} />
          </View>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}></Text>
        </View>
      </View>

      <View style={styles.content}>
        {tests.map((test) => {
          return test.final_result != "0.00" ? (
            <View key={test.id} style={styles.route}>
              <TouchableOpacity
                style={styles.routes}
                onPress={() =>
                  navigation.navigate("Test", {
                    testName: test.title,
                    testId: test.id,
                  })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={Check}
                    style={{
                      marginRight: "2%",
                      width: 25,
                      height: 25,
                      resizeMode: "contain",
                    }}
                  />

                  <View style={{ marginLeft: "2%" }}>
                    <Text
                      style={{
                        color: "#159CE4",
                        fontSize: 16,
                        fontWeight: "700",
                        width: 100,
                      }}
                    >
                      {test.title}
                    </Text>
                    <Text>
                      Правильных ответов:{" "}
                      {Math.round(test.final_result) +
                        "/" +
                        test.question_count}
                    </Text>
                  </View>
                </View>

                <Next />
              </TouchableOpacity>
              <View
                style={{ width: "94%", backgroundColor: "silver", height: 1 }}
              ></View>
            </View>
          ) : (
            <View key={test.id} style={styles.route}>
              <TouchableOpacity
                style={styles.routes}
                onPress={() =>
                  navigation.navigate("Test", {
                    testName: test.title,
                    testId: test.id,
                  })
                }
              >
                <Text style={styles.routesText}>{test.title}</Text>
                <Next />
              </TouchableOpacity>
              <View
                style={{ width: "94%", backgroundColor: "silver", height: 1 }}
              ></View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TestMain;

const styles = StyleSheet.create({
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
    marginTop: 30,
  },
  route: {
    alignItems: "center",
  },

  routes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "94%",
    height: 100,
    alignItems: "center",
    alignSelf: "center",
  },
  routesText: {
    textTransform: "uppercase",
    fontSize: 16,
    width: 260,
    fontWeight: "700",
    color: "#159CE4",
  },
});
