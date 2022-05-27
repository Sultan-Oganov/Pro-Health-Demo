import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import BackIcon from "../../../../../assets/images/backicon.svg";
import Line from "../../../../../assets/images/line.svg";
import SearchIcon from "../../../../../assets/images/search.svg";
import Next from "../../../../../assets/images/next.svg";
import Divider from "../../../../../assets/images/divider.svg";
import { getToken } from "../../../../AsyncStorage/AsyncStorage";

export default function Info({ navigation }) {
  const [info, setInfo] = useState();
  const [val, setVal] = useState();
  const [result, setResult] = useState(false);

  const informations = async () => {
    const token = await getToken();
    const req = await fetch("http://62.109.8.101/api/v1/list/information", {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    });
    const resp = await req.json();
    setInfo(resp);
  };
  const infoSearch = async (name) => {
    const token = await getToken();
    const req = await fetch(
      `http://62.109.8.101/api/v1/list/information?search=${name}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      }
    );
    const resp = await req.json();
    setInfo(resp);
  };

  useEffect(() => {
    informations();
  }, []);

  const infoTheme =
    info &&
    info?.map((i, ind) => {
      return (
        <View key={ind}>
          <TouchableOpacity
            style={styles.routes}
            onPress={() =>
              navigation.navigate("InfoTerm", { information: i?.id })
            }
          // style={styles.InfoBtn}
          >
            <View style={styles.icon}>
              <Image source={{ uri: i.icon }} alt="icon" style={styles.icon1} />
            </View>

            <Text style={styles.routesText}>{i?.title}</Text>
            <Next />
          </TouchableOpacity>
          <View
            style={{
              width: "94%",
              backgroundColor: "silver",
              height: 1,
              marginLeft: "3%",
              opacity: 0.6,
            }}
          ></View>
        </View>
      );
    });

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
            <Text style={styles.headerTitle}>Информация</Text>
            <Line width={100} alignSelf="center" marginTop={4} />
          </View>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}></Text>
        </View>
      </View>
      <View style={styles.search}>
        <TextInput
          placeholder="Искать в разделе..."
          placeholderTextColor="#B4D1D7"
          onChangeText={(text) => {
            setVal(text);
            infoSearch(text);
            setResult(true);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            infoSearch(val);
          }}
        >
          <SearchIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.result}>
        {info ? (
          result ? (
            <Text>
              {val == ""
                ? "всего:" + " " + info.length
                : "найдено:" + " " + info.length}
            </Text>
          ) : null
        ) : null}
      </View>

      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS ==='ios'? 'padding':null}>
      <ScrollView style={styles.route}>
        {infoTheme}
        
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
  icon1: {
    width: 25,
    height: 30,
    resizeMode: "contain",
    // overflow:'visible'
  },
  result: {
    flexDirection: "row",
    marginTop: "2%",
    height: 20,
    width: "100%",
    paddingLeft: "5%",
  },
  route:{
    overflow: 'hidden',
  },
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
  search: {
    backgroundColor: "#ffffff",
    width: "90%",
    height: 50,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },

  routes: {
    flexDirection: "row",
    width: "90%",
    height: 70,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  routesText: {
    width: 240,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#159CE4",
    textTransform: "uppercase",
  },
});
