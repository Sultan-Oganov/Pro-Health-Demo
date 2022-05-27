import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import BackIcon from '../../../../../assets/images/backicon.svg';
import Line from '../../../../../assets/images/line.svg';
import { clearAll, getToken } from '../../../../AsyncStorage/AsyncStorage';


export default function Media({ navigation }) {
    const [media, setMedia] = useState()

    // const getMedia = async () => {
    //     const token = await getToken()
    //     const req = await fetch('http://62.109.8.101/api/v1/list/media', {
    //         headers: {
    //             accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Token ' + token
    //         }
    //     })
    //     const resp = await req.json()
    //     setMedia(resp)
    // }


    useFocusEffect(
        React.useCallback(() => {
          let isActive = true;
          const fetchUser = async () => {
            try {
               const token = await getToken()
    const req = await fetch('http://62.109.8.101/api/v1/list/media', {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
              if (isActive) {
                
    const resp = await req.json()
   setMedia(resp)
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


    // useEffect(() => {
    //     getMedia()
    // }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("MainPage")}
                    style={styles.backView}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.textView}>
                    <View style={styles.textView_block}>
                        <Text style={styles.headerTitle}>
                            Медиа
                        </Text>
                        <Line width={100} alignSelf='center' marginTop={4} />
                    </View>
                </View>
                <View style={styles.circle}>
                    <Text style={styles.circleText}></Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.media}>

                    {media && media?.map((el, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() =>
                                    navigation.navigate('MediaVideo', { mediaId: el.id, mediaName: el.title, })}

                            >
                                <View style={styles.mediaFiles}>
                                    <View style={styles.bg}></View>

                                    <Image source={{ uri: el.image }} style={styles.mediaImage} />

                                </View>
                                <Text style={styles.mediaTitle}>{el.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                    }

                </View>
            </ScrollView>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        width: '90%',
        paddingTop: 50,
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginBottom: 30,
    },
    backView: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 50,
        justifyContent: 'center',
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '15%'
    },
    textView: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textView_block: {
        width: '100%',
        textAlign: 'center'
    },
    circle: {
        width: '100%',
        height: 50,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        fontSize: 15,
        color: '#159CE4'
    },
    headerTitle: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#374957',
        textAlign: 'center',
    },
    media: {
        marginTop: '5%',
        flexWrap: 'wrap',
        flexBasis: '45%',
        flexShrink: 1,
        flexGrow: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    mediaImage: {
        width: 150,
        height: 150,
        borderRadius: 20,

        zIndex: -5
    },
    mediaTitle: {
        fontSize: 13,
        width: 140,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '5%',
    },
    mediaFiles: {
        position: 'relative',
        marginTop: 10,
        borderRadius: 20,
    },
    bg: {
        borderRadius: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        zIndex: 5
    }


})