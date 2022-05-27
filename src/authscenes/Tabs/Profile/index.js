import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Line from "../../../../assets/images/line.svg";
import BackIcon from "../../../../assets/images/backicon.svg";
import True from "../../../../assets/images/True.svg";
import Check from "../../../../assets/images/Check.svg";
import { useNavigation } from "@react-navigation/native";

function Profile({ username, email, userLogout }) {
  const navigation = useNavigation();
  const [state2, setState2] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainPage")}
          style={styles.backView}
        >
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.textView}>
          <View style={styles.textView_block}>
            <Text style={styles.headerTitle}>Настройки</Text>
            <Line width={100} alignSelf="center" marginTop={4} />
          </View>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}></Text>
        </View>
      </View>

      <View style={styles.content}>
        <View>
          <View style={styles.firstline}>
            <Text>ЯЗЫК</Text>
            <Text style={styles.first}>РУССКИЙ</Text>
          </View>
          {/* <View style={styles.divider}></View> */}
          <View
            style={{
              width: "100%",
              backgroundColor: "silver",
              height: 1,
              // marginLeft: "0%",
              opacity: 0.6,
            }}
          ></View>
        </View>

        <View>
          <View style={styles.firstline}>
            <Text> PUSH - УВЕДОМЛЕНИЯ </Text>

            <TouchableOpacity onPress={() => setChecked(!checked)}>
              <View>{checked ? <Check /> : <True />}</View>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.divider}></View> */}
          <View
            style={{
              width: "100%",
              backgroundColor: "silver",
              height: 1,
              // marginLeft: "0%",
              opacity: 0.6,
            }}
          ></View>
        </View>

        <View>
          <View style={styles.firstline}>
            <Text>ЛОГИН </Text>
            <Text style={styles.first}>{username}</Text>
          </View>
          {/* <View style={styles.divider}></View> */}
          <View
            style={{
              width: "100%",
              backgroundColor: "silver",
              height: 1,
              // marginLeft: "0%",
              opacity: 0.6,
            }}
          ></View>
        </View>

        <View>
          <View style={styles.firstline}>
            <Text>E-MAIL </Text>
            <Text style={styles.first}>{email}</Text>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "silver",
              height: 1,
              // marginLeft: "0%",
              opacity: 0.6,
            }}
          ></View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileEditPass")}
        >
          <Text style={styles.second}>СМЕНИТЬ ПАРОЛЬ</Text>
        </TouchableOpacity>
      </View>

      {/*
===============================
КНОПКИ ДЛЯ РЕДАКТИРОВАНИЯ ДАННЫХ 
===============================
      */}
      {/* <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            setState1(!state1);
          }}
          style={state1 ? styles.buttonstyle2 : styles.buttonstyle1}
        >
          <Text style={state1 ? styles.textbutton2 : styles.textbutton1}>ОТМЕНА</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setState2(!state2);
        }}
          style={state2 ? styles.buttonstyle2 : styles.buttonstyle1}>
          <Text style={state2 ? styles.textbutton2 : styles.textbutton1}>СОХРАНИТЬ</Text>
        </TouchableOpacity>

      </View> */}

      <TouchableOpacity
        style={[
          state2 ? styles.buttonstyle2 : styles.buttonstyle1,
          { marginTop: 10 },
        ]}
        onPress={() => {

          userLogout();
        }}
      >
        <Text style={state2 ? styles.textbutton2 : styles.textbutton1}>
          Выход
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
    alignItems: "center",
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
    borderRadius: 50,
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
    width: "90%",
    marginTop: 10,
  },
  firstline: {
    width: "100%",
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: "5%",
  },
  first: {
    color: "#159CE4",
    textTransform: "uppercase",
  },
  second: {
    color: "#159CE4",
    marginTop: 30,
    marginLeft: "61%",
  },
  buttons: {
    width: "84%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "15%",
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
  divider: {
    width: "100%",
    backgroundColor: "silver",
    height: 1,
  },
});
