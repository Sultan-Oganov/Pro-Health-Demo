import React, { useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainIcon from '../../../assets/images/mainIcon.svg';
import ForumIcon from '../../../assets/images/forumIcon.svg';
import ProfileIcon from '../../../assets/images/profileIcon.svg';
import Mainnone from '../../../assets/images/mainnone.svg';
import ForumActive from '../../../assets/images/forumactive.svg';
import Profileactive from '../../../assets/images/profileactive.svg';

export default function Tabs() {
  const navigation = useNavigation()
  const [status, setStatus] = useState(1);


  return (
    <View
      style={styles.container}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={Platform.OS == 'android' ?
            { alignSelf: 'center', alignItems: 'center', }
            : { alignSelf: 'center', alignItems: 'center', }
          }
          onPress={() => {
            setStatus(1)
            navigation.navigate('MainPage')
          }}>
          {status == 1 ?
            <MainIcon style={{ width: 35, }} />
            :
            <Mainnone style={{ width: 35, }} />
          }


        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: 'center', alignItems: 'center', marginRight: 10, }}
          onPress={() => {
            setStatus(2)
            navigation.navigate('Forum')
          }}>
          {status == 2 ? <ForumActive style={{ width: 35, marginBottom: 5, }} />
            : <ForumIcon style={
              { width: 35, marginBottom: 5, }
            } />

          }

        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: 'center', alignItems: 'center', }}
          onPress={() => {
            setStatus(3)
            navigation.navigate('Profile')
          }}>
          {status == 3 ? <Profileactive style={{ width: 35, marginBottom: 2, marginRight: 20, }} />
            :
            <ProfileIcon style={{ width: 35, marginBottom: 2, marginRight: 20, }} />
          }

        </TouchableOpacity>
      </View>

    </View>
  )
}
const windowDimensions = Dimensions.get('window')
const windowWidth = windowDimensions.width;


const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: "#E5E5E5",
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 2,
  },
})