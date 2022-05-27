import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  PlatformColor,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Line from "../../../../../assets/images/line.svg";
import BackIcon from "../../../../../assets/images/backicon.svg";
import Adding from "./Adding";
import Sumka from "../../../../../assets/images/sumka.svg";
import { getAlarm, setAlarm } from "../../../../AsyncStorage/AsyncStorage";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function PillsAdd({ navigation, route }) {
  const { parentDays, change, newAlarm, stateAlarm, idItem, stateData, stateTitle } = route.params
  const [data, setData] = useState(change == 'Новое напоминание' ? new Date() : new Date(stateData));
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  const [day, setDay] = useState('PM');
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [btn, setBtn] = useState(false);
  const [btn2, setBtn2] = useState(false);

  const [days, setDays] = useState('Пн,')

  const [hours, setHours] = useState(new Date().toLocaleTimeString().slice(0, -6))
  const [title, setTitle] = useState(change == 'Новое напоминание' ? null : stateTitle)

  const [hourMinute, setHourMinute] = useState(new Date().toLocaleTimeString().slice(3, +5))
  const [hour, setHour] = useState(new Date().toLocaleTimeString().slice(0, -6))
  const [obj, setObj] = useState(
    {
      hours: hours,
      days: days,
      title: title,
      id: stateAlarm == null || stateAlarm == undefined || stateAlarm == 0 ? 1 : stateAlarm[stateAlarm.length - 1]?.id + 1,
      data: new Date(data),
    }
  )

  useEffect(() => {
    changes()
  }, [hours, data, title, days])

  const changes = () => {
    setHours(Platform.OS == 'ios' ? new Date(data).toLocaleTimeString().slice(0, -3) : new Date(data).toLocaleTimeString().slice(0, -3))
    setHourMinute(new Date(data).toLocaleTimeString().slice(3, +5))
    setHour(new Date(data).toLocaleTimeString().slice(0, -6))
    setObj({
      hours: hours,
      days: days,
      title: title,
      id: stateAlarm == null || stateAlarm == undefined || stateAlarm == 0 ? 1 : stateAlarm[stateAlarm.length - 1]?.id + 1,
      data: new Date(data),
    })
    setShow(false)
  }
  const getDelateAlarm = () => {
    const filtered = stateAlarm.filter((item) => item.id !== idItem)
    setAlarm(filtered)
  }
  const getPushNewAlarm = async () => {
    stateAlarm == null ?
      setAlarm([obj])
      : setAlarm([...stateAlarm, obj])
    navigation.navigate('Pills')
  }

  const getChangeAlarm = () => {
    var result = stateAlarm.map(e => {
      if (idItem == e.id) {
        e.hours = hours,
          e.days = days,
          e.title = title,
          e.id = idItem
      }
      return e;
    })
    setAlarm(result)
    navigation.navigate('Pills')
  }

  const setTime = (event, date) => {
    setShow(Platform.OS === 'ios');
    if (date !== undefined) {
      setData(date)
    }
  };

  const showTimepicker = (currentMode) => {
    setShow(true);
    setMode("time");
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredViewM}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ position: "absolute", right: 15 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "red", fontSize: 25, fontWeight: "700" }}>
                x
              </Text>
            </TouchableOpacity>

            <Text style={styles.modalText}>Удалить напоминание?</Text>
            <Line width={100} alignSelf="center" />

            <View style={styles.modalWar}>
              <TouchableHighlight
                style={{
                  borderRadius:
                    Math.round(
                      Dimensions.get("window").width +
                      Dimensions.get("window").height
                    ) / 2,
                  width: Dimensions.get("window").width * 0.13,
                  height: Dimensions.get("window").width * 0.13,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor: "#F03800",
                  margin: 10,
                  alignSelf: "center",
                }}
                underlayColor="#ccc"
              >
                <Text
                  style={{ fontSize: 25, color: "#F03800", fontWeight: "700" }}
                >
                  {" "}
                  !{" "}
                </Text>
              </TouchableHighlight>
              <Text>Все данные будут удалены!</Text>
            </View>

            <View style={styles.btnMain}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={btn ? styles.buttonstyle2 : styles.buttonstyle1}
              >
                <Text style={btn ? styles.textbutton2 : styles.textbutton1}>
                  Отмена
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible),
                    getDelateAlarm(),
                    navigation.navigate('Pills')
                }}
                style={btn2 ? styles.buttonstyle2 : styles.buttonstyle1}
              >
                <Text style={btn2 ? styles.textbutton2 : styles.textbutton1}>
                  Удалить
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Pills")}
          style={styles.backView}
        >
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.textView}>
          <View style={styles.textView_block}>
            <Text style={styles.headerTitle}>{change}</Text>
            <Line width={100} alignSelf="center" marginTop={4} />
          </View>
        </View>
        <TouchableOpacity
          onPress={
            change == 'Новое напоминание' ?

              null
              : () => setModalVisible(true)
          }
          style={
            change == 'Новое напоминание' ?
              styles.circle2
              : styles.circle1
          }
        >
          <Text style={styles.circleText}>{change == 'Новое напоминание' ? '' : 'x'}</Text>

        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.time}>
              {Platform.OS === "android" ? (
                <>
                  <View style={styles.time__head}>
                    <View style={styles.time__left}>
                      <View style={styles.time__item}>
                        <Text style={styles.time__text}>{hour}</Text>
                      </View>
                      <View style={styles.time__item_dot}>
                        <Text style={styles.time__text}>:</Text>
                      </View>
                      <View style={styles.time__item}>
                        <Text style={styles.time__text}>{hourMinute}</Text>
                      </View>
                    </View>
                    <View style={[styles.time__item, styles.time__right]}>
                      <TouchableOpacity
                        onPress={() => setDay('AM')}
                        style={styles.time__day_am}
                      >
                        <Text
                          style={
                            day == 'AM'
                              ? [styles.time__text, styles.time__day_active]
                              : [styles.time__text, styles.time__day_am_text]
                          }
                        >
                          AM
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setDay('PM')}
                        style={styles.time__day_pm}
                      >
                        <Text
                          style={
                            day == 'PM'
                              ? [styles.time__text, styles.time__day_active]
                              : [styles.time__text, styles.time__day_pm_text]
                          }
                        >
                          PM
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.time__picker}>
                    <TouchableOpacity style={styles.showTime} onPress={() => showTimepicker()}>
                      <Text style={styles.showTime__text}>Выбрать время!</Text>
                    </TouchableOpacity>
                    {
                      show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={data}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={setTime}
                        />
                      )
                    }
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.time__picker}>
                    <RNDateTimePicker
                      style={{ height: 200 }}
                      testID="dateTimePicker"
                      value={data}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={setTime}
                      dateFormat='hour minute'
                      timeZoneOffsetInSeconds={3600}
                    />
                  </View>
                </>
              )}


              <Adding parentDays={parentDays} setDay={setDays} day={days} />


              <View style={styles.userInfo}>
                <Sumka width={20} marginLeft={13} />

                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  value={title}
                  onChangeText={Text => setTitle(Text)}
                  placeholder="Лекарство, которое будете принимать"
                  style={styles.placeholderText}
                />

              </View>




              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => {
                    setState1(!state1);
                    navigation.navigate("Pills");
                  }}
                  style={styles.buttonstyle1}
                >
                  <Text style={styles.textbutton1}>
                    ОТМЕНИТЬ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setState2(!state2);
                  }}
                  style={styles.buttonstyle2}
                  onPress={

                    change == 'Новое напоминание' ?
                      () => getPushNewAlarm()
                      : () => getChangeAlarm()
                  }
                >
                  <Text style={styles.textbutton2}>
                    {
                      change == 'Новое напоминание' ?
                        'ДОБАВИТЬ БУДИЛЬНИК'
                        : 'СОХРАНИТЬ'
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  modalWar: {
    width: "94%",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  btnMain: {
    width: "94%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  centeredView: {
    backgroundColor: "#E5E5E5",
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
    paddingTop: 22,
  },
  centeredViewM: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    paddingTop: 50,
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 30
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
    backgroundColor: "#fff",
    borderRadius: 50,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "15%",
    backgroundColor: "red",
  },
  circle1: {
    width: '100%',
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "15%",
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle2: {
    width: '100%',
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "15%",
    backgroundColor: "transparent",
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleText: {
    color: "white",
    fontSize: 25,
    fontWeight: "700",
    alignSelf: "center",
    textAlign: "center",
    marginTop: -5
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
    height: "60%",
    flexBasis: "100%",
    flexShrink: 1,
    flexGrow: 0,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  time: {
    width: "90%",
  },
  time__head: {
    width: "94%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginLeft: 10,
  },
  time__left: {
    flexBasis: "60%",
    flexShrink: 1,
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time__item: {
    flexBasis: "40%",
    flexShrink: 1,
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },
  time__item_dot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time__text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "700",
    flexDirection: "row",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 20,
  },
  time__right: {
    flexBasis: "20%",
    flexShrink: 1,
    flexGrow: 0,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  time__day_active: {
    backgroundColor: "#159CE4",
    paddingVertical: 15,
    color: "#fff",
  },
  time__day_am: {
    width: "100%",
  },
  time__day_am_text: {
    fontSize: 15,
    color: "#EAF1FF",
    paddingVertical: 15,
  },
  time__day_pm: {
    width: "100%",
  },
  time__day_pm_text: {
    color: "#EAF1FF",
    fontSize: 15,
    paddingVertical: 15,
  },
  time__picker: {
    width: "80%",
    height: 150,
    marginLeft: "10%",
    marginBottom: 50
  },
  showTime: {
    width: '100%',
    backgroundColor: '#159CE4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 13
  },
  showTime__text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  },
  userInfo: {
    marginTop: "5%",
    width: "94%",
    height: 'auto',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginLeft: "3%",
    marginBottom: "10%",
    overflow: 'hidden',
  },
  placeholderText: {
    paddingTop: 0,
    fontSize: 15,
    marginLeft: 5,
    marginVertical: '3%',
    width: '85%',
    alignSelf: 'center',
  },
  buttons: {
    width: "98%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "10%",
    marginLeft: "1%",
    marginBottom: "10%",
  },
  buttonstyle1: {
    borderColor: "#159CE4",
    borderWidth: 2,
    width: "50%",
    height: 45,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  textbutton1: {
    color: "black",
    fontSize: 11,
    textAlign: "center",
  },
  buttonstyle2: {
    backgroundColor: "#159CE4",
    borderColor: "#159CE4",
    borderWidth: 2,
    width: "50%",
    height: 45,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  textbutton2: {
    color: "white",
    fontSize: 11,
    textAlign: "center",
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