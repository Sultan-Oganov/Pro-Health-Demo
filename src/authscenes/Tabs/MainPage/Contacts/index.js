import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BackIcon from '../../../../../assets/images/backicon.svg';
import Line from '../../../../../assets/images/line.svg';
import Next from '../../../../../assets/images/next.svg';

export default function Contacts({ navigation, designation }) {
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
            <Text style={styles.headerTitle}>Контакты</Text>
            <Line width={100} alignSelf="center" marginTop={4} />
          </View>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}></Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.route}>
          <View style={styles.WrapRoutes}>
            <TouchableOpacity
              style={styles.routes}
              onPress={() => navigation.navigate("ContactsReview")}
            >
              <Text style={styles.routesText}>ОБРАТНАЯ СВЯЗЬ</Text>
              <Next />
            </TouchableOpacity>
            <View
              style={{
                width: "90%",
                backgroundColor: "silver",
                height: 1,
                marginLeft: "5%",
              }}
            ></View>
          </View>
          <View style={styles.WrapRoutes}>
            <TouchableOpacity
              style={styles.routes}
              onPress={() => navigation.navigate("ContactsMap")}
            >
              <Text style={styles.routesText}>МЫ НА КАРТЕ</Text>
              <Next />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              backgroundColor: "silver",
              height: 1,
              marginLeft: "5%",
              opacity: 0.6,
            }}
          ></View>

          {designation.length != [] &&
            designation.map((element) => {
              return (
                <View style={styles.WrapRoutes} key={element.id}>
                  <TouchableOpacity
                    style={styles.routes}
                    onPress={() =>
                      navigation.navigate("ContactsDetail", {
                        contactsName: element.title,
                        contactsDesignation: element.id,
                      })
                    }
                  >
                    <Text style={styles.routesText}>{element.title}</Text>
                    <Next />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: "90%",
                      backgroundColor: "silver",
                      height: 1,
                      marginLeft: "5%",
                      opacity: 0.6,
                    }}
                  ></View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

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
  route: {
    height: "60%",
    marginTop: "10%",
    justifyContent: "space-between",
  },
  routes: {
    flexDirection: "row",
    width: "90%",
    height: 70,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  WrapRoutes: {},
  routesText: {
    textTransform: "uppercase",
    width: 260,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#159CE4",
  },
});
