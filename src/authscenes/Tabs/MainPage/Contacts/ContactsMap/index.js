import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BackIcon from '../../../../../../assets/images/backicon.svg';
import Line from '../../../../../../assets/images/line.svg';

export default function ContactsMap({ navigation, ourCordinates }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Contacts")}
                    style={styles.backView}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.textView}>
                    <View style={styles.textView_block}>
                        <Text style={styles.headerTitle}>
                            Мы на карте
                        </Text>
                        <Line width={100} alignSelf='center' marginTop={4} />
                    </View>
                </View>
                <View style={styles.circle}>
                    <Text style={styles.circleText}></Text>
                </View>
            </View>

            <View>
                <MapView
                    style={styles.map}
                    region={ourCordinates[0]}
                    provider={PROVIDER_GOOGLE}
                >
                    {
                        ourCordinates.length != [] && ourCordinates.map(el => {
                            return <Marker key={el.id} coordinate={el} title={el.title} />
                        })
                    }

                </MapView>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        width: '90%',
        paddingTop: 50,
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginBottom: 10
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
    headerTitle: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#374957',
        textAlign: 'center',
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
})