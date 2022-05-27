import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import BackIcon from '../../../../../../assets/images/backicon.svg';
import Line from '../../../../../../assets/images/line.svg';
import SearchIcon from '../../../../../../assets/images/search.svg'
import Next from '../../../../../../assets/images/next.svg'
import { getToken } from '../../../../../AsyncStorage/AsyncStorage';

export default function InfoTerm({ navigation, route }) {
  const [theme, setThemes] = useState();
  const { information } = route.params;
  const [val, setVal] = useState();
  const [result, setResult] = useState(false);

  const themes = async () => {
    const token = await getToken();
    const req = await fetch("http://62.109.8.101/api/v1/list/themes", {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    });
    const resp = await req.json();
    setThemes(resp);
  };

  const themeSearch = async (name) => {
    const token = await getToken();
    const req = await fetch(
      `http://62.109.8.101/api/v1/list/themes?search=${name}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      }
    );
    const resp = await req.json();
    setThemes(resp);
  };

  useEffect(() => {
    themes();
  }, []);

  const themeItems = theme?.map((el, i) => {
    return el.information == information ? (
      <View key={i}>
        <TouchableOpacity
          style={styles.routes}
          key={i}
          onPress={() =>
            navigation.navigate("InfoTermDescription", {
              content: el?.id,
              title: el?.title,
            })
          }
        >
          <Text style={styles.routesText}>{el.title}</Text>
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
    ) : null;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Info")}
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
            themeSearch(text);
            setResult(true);
          }}
        />
        <TouchableOpacity onPress={() => themeSearch(val)}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.result}>
        {theme ? (
          result ? (
            <Text>
              {val == ""
                ? "всего:" + " " + theme.length
                : "найдено:" + " " + theme.length}
            </Text>
          ) : null
        ) : null}
      </View>
      <View style={styles.route}>{themeItems}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    flexDirection: "row",
    marginTop: "2%",
    // height: 10,
    width: "100%",
    paddingLeft: "5%",
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
  route: {
    width: "100%",
    height: "60%",
    marginTop: "10%",
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
    fontWeight: "bold",
    color: "#159CE4",
    textTransform: "uppercase",
  },
});
