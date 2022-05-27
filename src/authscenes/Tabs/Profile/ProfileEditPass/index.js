import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Line from "../../../../../assets/images/line.svg";
import Password from "../../../../../assets/images/password.svg";
import Eye from "../../../../../assets/images/eye.svg";
import Eyecopy from "../../../../../assets/images/Eyecopy.svg";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../../../../assets/images/backicon.svg";
import { getToken } from "../../../../AsyncStorage/AsyncStorage";

export default function ProfileEditPass() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    old_password: "",
    new_password: "",
  });
  const [secondPassword, setSecondPassword] = useState("");

  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [secretPass, setSecretPass] = useState(true);
  const [secretPass2, setSecretPass2] = useState(true);
  const [secretPass3, setSecretPass3] = useState(true);

  const handleChange = (num) => {
    if (num == 1) {
      secretPass == true ? setSecretPass(false) : setSecretPass(true);
    } else if (num == 2) {
      secretPass2 == true ? setSecretPass2(false) : setSecretPass2(true);
    } else if (num == 3) {
      secretPass3 == true ? setSecretPass3(false) : setSecretPass3(true);
    }
  };

  const changePassword = async (userData) => {
    let token = await getToken();
    const request = await fetch("http://62.109.8.101/api/v1/change-password/", {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(userData),
    });
    const response = await request.json();
    return response;
  };

  const validate = (oldPass, newPass) => {
    if (oldPass == newPass) {
      changePassword(userData).then((response) => {
        if (response.code == 200) {
          Alert.alert("Успешно", "Пароли изменен!!!");
          navigation.navigate("MainPage");
        } else {
          let a = Object.keys(response);
          Alert.alert(a[0], response[a[0]][0]);
        }
      });
    } else {
      Alert.alert("Пароли не совпадают!!!", "Повторите попытку");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: "#E5E5E5" }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.backView}
          >
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.textView}>
            <View style={styles.textView_block}>
              <Text style={styles.headerTitle}>Смена пароля</Text>
              <Line width={100} alignSelf="center" marginTop={4} />
            </View>
          </View>
          <View style={styles.circle}>
            <Text style={styles.circleText}></Text>
          </View>
        </View>
        <View style={styles.content}>
          <View>
            <View
              style={{
                width: "100%",
                backgroundColor: "silver",
                height: 1,
                // marginLeft: "0%",
                opacity: 0.6,
              }}
            ></View>
            <View style={styles.userInfo}>
              <Password width={20} marginLeft={16} />
              <TextInput
                placeholder="Старый пароль"
                style={styles.placeholderText}
                secureTextEntry={secretPass}
                onChangeText={(text) =>
                  setUserData({ ...userData, old_password: text })
                }
              ></TextInput>
              <TouchableOpacity
                style={{ width: 20 }}
                onPress={() => handleChange(1)}
              >
                {secretPass == true ? (
                  <Eye width={20} />
                ) : (
                  <Eyecopy width={20} />
                )}
              </TouchableOpacity>
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

          <View style={styles.first}>
            <View style={styles.userInfo}>
              <Password width={20} marginLeft={16} />
              <TextInput
                placeholder="Новый пароль "
                style={styles.placeholderText}
                secureTextEntry={secretPass2}
                onChangeText={(text) =>
                  setUserData({ ...userData, new_password: text })
                }
              ></TextInput>
              <TouchableOpacity
                style={{ width: 20 }}
                onPress={() => handleChange(2)}
              >
                {secretPass2 == true ? (
                  <Eye width={20} />
                ) : (
                  <Eyecopy width={20} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Password width={20} marginLeft={16} />
              <TextInput
                placeholder="Повторите новый пароль "
                style={styles.placeholderText}
                secureTextEntry={secretPass3}
                onChangeText={(text) => setSecondPassword(text)}
              ></TextInput>
              <TouchableOpacity
                onPress={() => handleChange(3)}
                style={{ width: 20 }}
              >
                {secretPass3 == true ? (
                  <Eye width={20} />
                ) : (
                  <Eyecopy width={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              setState1(!state1);
              navigation.navigate("Profile");
            }}
            style={state1 ? styles.buttonstyle2 : styles.buttonstyle1}
          >
            <Text style={state1 ? styles.textbutton2 : styles.textbutton1}>
              ОТМЕНА
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setState2(!state2);
              validate(userData.new_password, secondPassword);
            }}
            style={state2 ? styles.buttonstyle2 : styles.buttonstyle1}
          >
            <Text style={state2 ? styles.textbutton2 : styles.textbutton1}>
              СОХРАНИТЬ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
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
    marginTop: "8%",
  },
  userInfo: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: "5%",
    // marginLeft: '5%',
    marginTop: "5%",
  },
  placeholderText: {
    width: "75%",
    fontSize: 12,
    marginLeft: "3%",
  },
  first: {
    marginTop: "3%",
  },
  buttons: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "20%",
    marginLeft: "2%",
    marginBottom: 50,
  },
  buttonstyle1: {
    borderColor: "#159CE4",
    borderWidth: 2,
    width: "45%",
    height: 50,
    borderRadius: 30,
    alignContent: "center",
    justifyContent: "center",
  },
  textbutton1: {
    color: "black",
    fontSize: 12,
    textAlign: "center",
  },
  buttonstyle2: {
    backgroundColor: "#159CE4",
    borderColor: "#159CE4",
    borderWidth: 2,
    width: "45%",
    height: 50,
    borderRadius: 30,
    alignContent: "center",
    justifyContent: "center",
  },
  textbutton2: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});
