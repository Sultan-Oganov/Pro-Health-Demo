import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../../assets/images/logo.svg';
import Naming from '../../../../assets/images/naming.svg';
import Doctor from '../../../../assets/images/doctor.svg';
import Next from '../../../../assets/images/next.svg';
import Tablet from '../../../../assets/images/tablet.svg';
import Avatar from '../../../../assets/images/avatar.png';
import Media from '../../../../assets/images/media.svg';
import Share from '../../../../assets/images/share.svg';
import Map from '../../../../assets/images/map.svg';
import Test from '../../../../assets/images/testImg.svg';
import Watch from '../../../../assets/images/watch.svg';
import Watch1 from '../../../../assets/images/watch1.svg';
import Arrow from '../../../../assets/images/arrow.svg';
import { getAlarm } from '../../../AsyncStorage/AsyncStorage';
import dateFormat from 'dateformat';

function MainPage({ userData, appealList, allInfo }) {
  const navigation = useNavigation()
  const [alarm, setAlarm] = useState()


  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchUser = async () => {
        try {
          const alarm = await getAlarm();
          if (isActive) {
            setAlarm(alarm);
          }
        } catch (e) {
        }
      };
      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );


  const alarmDataItem =
    alarm == null || alarm == undefined || alarm == 0 ? (
      <TouchableOpacity
        style={
          Platform.OS == "android"
            ? styles.notificationButton
            : styles.notificationButtonIos
        }
        onPress={() => navigation.navigate("Pills")}
      >
        <Doctor alignSelf="center" width={25} />
        <Text
          style={
            Platform.OS == "androis"
              ? styles.notificationText
              : styles.notificationTextIos
          }
        >
          Настройте уведомление о принятии лекарств
        </Text>
      </TouchableOpacity>
    ) : (
      alarm.map((el, i) => {
        return (
          <TouchableOpacity
            style={
              Platform.OS == "ios"
                ? styles.notificationButtonIosItem
                : styles.notificationButtonItem
            }
            onPress={() => navigation.navigate("Pills")}
            key={i}
          >
            <View style={{ alignSelf: "center", flexDirection: "row" }}>
              <Watch alignSelf="center" />
              <Text
                style={[styles.notificationText, { fontSize: 11, width: 90 }]}
              >
                {el.title}:
              </Text>
            </View>

            <View
              style={
                Platform.OS == "ios"
                  ? {
                    width: 100,
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }
                  : {
                    width: 100,
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }
              }
            >
              <Arrow alignSelf="center" />
              <Watch1 alignSelf="center" opacity={0.5} marginLeft={10} />
              <Text
                style={[
                  styles.notificationText,
                  { width: 50, opacity: 0.5, marginLeft: 10 },
                ]}
              >
                {el.hours}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })
    );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ width: "97%", alignSelf: "flex-end" }}
      >
        <View styles={styles.mainContainer}>
          <View style={styles.header}>
            <View style={styles.headerLogo}>
              <Logo width={50} height={49.69} />
              <Naming width={100} alignSelf="center" marginRight={50} />
            </View>
            <View style={styles.headerText}>
              <Text>Привет!</Text>
              <Text style={{ fontWeight: "700" }}>{userData?.username}</Text>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
            horizontal={true}
          >
            {alarmDataItem}
          </ScrollView>

          {allInfo ? (
            <TouchableOpacity
              style={styles.info}
              onPress={() => navigation.navigate("Info")}
            >
              <View style={styles.infoPanelHeader}>
                <Text style={styles.infoMaintext}>ВСЯ ИНФОРМАЦИЯ</Text>
                <Next style={styles.infoTabImg} />
              </View>
              <View style={styles.infoContent}>
                <Tablet style={styles.infoTabImg} />
                <Text style={styles.infoTabText}>{allInfo[0]?.title}</Text>
              </View>
              <Text style={styles.infoText}>{allInfo[0]?.description}</Text>
            </TouchableOpacity>
          ) : null}

          <View style={styles.infoForm}>
            <Text style={styles.infoMaintext1}>ФОРУМ</Text>
            <Next style={styles.infoTabImg} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
            horizontal={true}
          >
            {appealList.length > 0 &&
              appealList?.map((el, id) => {
                var now = new Date(el.pub_date);
                return (

                  id < 2 &&
                  <TouchableOpacity
                    key={id}
                    style={styles.forumCard}
                    onPress={()=>
                      navigation.navigate('Forum2', {
                        commentCount: el.comment_count,
                        author: el.author?.username,
                        authorId: el.author?.id,
                        date: dateFormat(now, "dd.mm.yy h:MM"),
                        appeal: el.id,
                        forum: el.forum,
                        title: el.title,
                        description: el.description
                      })}>
                    <Text style={styles.forumMessage}>
                      Последнее сообщение
                    </Text>
                    <View style={styles.forumPanel}>
                      <Image source={Avatar} />
                      <View style={styles.forumPanel1}>
                        <Text style={styles.userName}>
                          {el?.author?.username} {dateFormat(now, "dd.mm.yy HH:MM")}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.forumName}>
                      {el.title}
                    </Text>
                    <Text style={styles.forumText}>
                      {el.description}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }

          </ScrollView>

          <View style={styles.mainButtons}>
            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => navigation.navigate("Media")}
            >
              <Media />
              <Text style={styles.mainButton__mainText}>Медиа</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => navigation.navigate("ShareApp")}
            >
              <Share />
              <Text style={styles.mainButton__mainText}>Поделиться</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainButtons_footer}>
            <TouchableOpacity onPress={() => navigation.navigate("Contacts")}>
              <View style={styles.info__contacts}>
                <Text style={[styles.infoMaintext, { marginRight: 5 }]}>
                  КОНТАКТЫ
                </Text>
                <Next style={styles.infoTabImg} />
              </View>
              <Map style={{ marginLeft: -15 }} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("TestMain")}
              style={styles.testButton}
            >
              <Test />
              <Text style={styles.testText}>
                ПРОЙДИТЕ ТЕСТ, ЧТОБЫ ПРОВЕРИТЬ СВОИ ЗНАНИЯ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default MainPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
    height: "100%",
    paddingTop: "13%",
    width: "100%",
  },
  mainContainer: {
    width: "100%",
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "98%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "65%",
  },
  notificationButton: {
    paddingVertical: 15,
    height: 65,
    width: 320,
    backgroundColor: "#159CE4",
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignContent: "space-around",
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
  },
  notificationButtonIos: {
    paddingVertical: 15,
    height: 65,
    width: 330,
    backgroundColor: "#159CE4",
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignContent: "space-around",
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
  },
  notificationButtonIosItem: {
    paddingVertical: 15,
    height: 65,
    width: 330,
    backgroundColor: "#159CE4",
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  notificationButtonItem: {
    paddingVertical: 15,
    height: 65,
    width: 320,
    backgroundColor: "#159CE4",
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignContent: "space-around",
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
  },
  notificationText: {
    color: "#ffffff",
    alignSelf: "center",
    marginLeft: 20,
    width: 200,
    fontWeight: "700",
    fontSize: 15,
  },
  notificationTextIos: {
    color: "#ffffff",
    alignSelf: "center",
    marginLeft: 20,
    width: 200,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
  },
  info: {
    width: "98%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
  },
  infoPanelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
    marginBottom: 10,
  },
  infoMaintext: {
    fontWeight: "700",
    color: "#159CE4",
    marginRight: 5,
  },
  infoMaintext1: {
    fontWeight: "700",
    color: "#159CE4",
    marginRight: 5,
    marginLeft: 5,
  },
  infoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoTabImg: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "10%",
  },
  infoTabText: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "88%",
    fontWeight: "700",
  },
  infoForm: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  forumCard: {
    width: 270,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
  },
  forumMessage: {
    fontWeight: "700",
    marginBottom: 10,
  },
  forumPanel: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  forumPanel1: {
    width: "90%",
    marginLeft: '2%',
    flexDirection: "row",
  },
  userName: {
    color: "#159CE4",
  },
  forumName: {
    fontWeight: "700",
    color: "#374957",
  },
  forumText: {
    color: "#374957",
  },
  mainButtons: {
    width: "98%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mainButton: {
    backgroundColor: "#81C4E8",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "48%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  mainButton__mainText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
  info__contacts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "50%",
  },
  mainButtons_footer: {
    width: "98%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  testButton: {
    backgroundColor: "#B2D972",
    borderRadius: 20,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  testText: {
    color: "#ffffff",
    alignSelf: "center",
    fontSize: 10,
    textAlign: "center",
    marginTop: 6,
    fontWeight: "700",
  },
});
