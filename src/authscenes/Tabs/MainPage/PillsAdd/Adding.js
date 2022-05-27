import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Switch, Platform, Image, TouchableOpacity } from "react-native";



export default function Adding({ enable, setDay, day, parentDays }) {
  const [enabled, setEnabled] = useState(enable);
  const [n, setN] = useState(0)

  const [days, setDays] = useState([
    {
      day_ru: 'Пн',
      day_eng: 'Mn',
      status: true
    },
    {
      day_ru: 'Вт',
      day_eng: 'Ts',
      status: false
    },
    {
      day_ru: 'Ср',
      day_eng: 'Wn',
      status: false
    },
    {
      day_ru: 'Чт',
      day_eng: 'Ts',
      status: false
    },
    {
      day_ru: 'Пт',
      day_eng: 'Fr',
      status: false
    },
    {
      day_ru: 'Сб',
      day_eng: 'Sr',
      status: false
    },
    {
      day_ru: 'Вс',
      day_eng: 'Sn',
      status: false
    }
  ])

  const changeObj = () => {
    return parentDays.split(',').map(el => days.map(day => el == day.day_ru ? day.status = true : null))
  }

  const dayRu = []
  useEffect(() => {
    setDeyInfo()
    setDay(enabled || dayRu.length == 7 ? 'ежедневно' : dayRu.join())
    n == 0 && parentDays !== undefined ? changeObj() : null
    setN(n + 1)
  }, [days, enabled])

  const setDeyInfo = () => {
    enabled == true ?
      setDay('ежедневно')
      :
      days.map(el => {
        el.status ?
          dayRu.push(el.day_ru)
          : null
      })
  }

  const changeDays = (prop) => {
    let arr = []
    days.map(el => {
      if (el.day_ru == prop) {
        el.status = !el.status
      }
      arr.push(el)
    })
    setDays(arr)
  }

  const toggleSwitch = () => {
    setEnabled((oldValue) => !oldValue);
  };

  return (
    <View style={enabled ? styles.container1 : styles.container}>

      <View style={styles.content}>
        <View style={{ marginLeft: 10, height: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {
            enabled ? <Text style={{ fontSize: 14, fontWeight: '700', color: 'black', }} >
              Eжедневно
            </Text>
              :
              <Text style={{ fontSize: 14, fontWeight: '700', color: 'black', }} >
                Выберите дни
              </Text>
          }

        </View>
        <Switch
          onValueChange={toggleSwitch}
          value={enabled}
          thumbColor={enabled ? thumbColorOn : thumbColorOff}
          trackColor={{ false: trackColorOff, true: trackColorOn }}
          ios_backgroundColor={trackColorOff}
        />
      </View>


      {enabled ?
        null
        :
        <View style={styles.buttons}>
          {days.map(d => {
            return (
              <TouchableOpacity
                onPress={() => {
                  changeDays(d.day_ru)
                }}
                key={d.day_ru}
                style={d.status ? styles.buttonstyle2 : styles.buttonstyle1}
              >
                <Text style={d.status ? styles.textbutton2 : styles.textbutton1}>{d.day_ru} {d.status ? <Text style={{ fontWeight: '700', fontSize: 16 }}>x</Text> : null}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      }
    </View>
  )
}

const thumbColorOn = Platform.OS === "android" ? "#fff" : "#fff";
const thumbColorOff = Platform.OS === "android" ? "#fff" : "#fff";
const trackColorOn = Platform.OS === "android" ? "#98e7f0" : "#0cd1e8";
const trackColorOff = Platform.OS === "android" ? "#EAF1FF" : "#EAF1FF";


const styles = StyleSheet.create({
  container: {
    width: '94%',
    backgroundColor: 'white',
    marginTop: '5%',
    marginBottom: '2%',
    marginLeft: 10,
    height: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 20,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowColor: '#159CE4',
    elevation: 5,
  },
  container1: {
    width: '94%',
    backgroundColor: 'white',
    marginTop: '5%',
    marginBottom: '2%',
    marginLeft: 10,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 20,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowColor: '#159CE4',
    elevation: 5,
  },
  content: {
    width: '90%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
  },
  buttons: {
    width: '90%',
    height: 100,
    flexWrap: 'wrap',
    marginTop: '2%',
    marginLeft: '5%',
  },

  buttonstyle1: {
    backgroundColor: '#EAF1FF',
    borderWidth: 2,
    width: 60,
    height: 30,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    borderColor: '#EAF1FF',
    marginLeft: 10,
    marginTop: '5%',
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
    width: 60,
    height: 30,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: '5%',
  },
  textbutton2: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});
