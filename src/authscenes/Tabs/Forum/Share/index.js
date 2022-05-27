import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Share } from 'react-native'
import ShareImage from '../../../../../assets/images/share.svg';
import Logo from '../../../../../assets/images/logo.svg';
import Naming from '../../../../../assets/images/naming.svg';


export default function ShareApp() {
  const navigation = useNavigation()

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: Platform.OS == 'ios' ?
          'Описание: Это приложение - помощник ' + '\n' +
          'Cсылка для Ios: http://62.109.8.101/admin/'
          :
          'Описание: Это приложение - помощник ' + '\n' +
          'Cсылка для android: http://62.109.8.101/admin/'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{
        width: '100%',
        height: 350,
        // marginTop:'35%', 
        alignItems: 'center', alignSelf: 'center',
        justifyContent: 'center',
      }}>
        <Logo width={150} alignSelf='center' />
        <Naming width={150} alignSelf='center' style={{ marginTop: 5, }} />
      </View>

      <TouchableOpacity
        onPress={() => onShare()
          // navigation.navigate('MainPage')
        }
        style={styles.button}>

        <ShareImage style={{ alignItems: 'center', marginLeft: '5%', marginTop: '4%', width: 25, }} />
        <Text style={styles.buttonText}>Поделиться ссылкой с друзьями</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 100,
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#159CE4',
    marginTop: '10%',
    flexDirection: 'row',
    width: '90%',
    height: 55,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    alignSelf: 'center',
    marginLeft: '10%',

  },
})


