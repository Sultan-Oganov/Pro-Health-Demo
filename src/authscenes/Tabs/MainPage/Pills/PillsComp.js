import React, { useState } from 'react'
import { StyleSheet, Text, View, Switch, Platform, Image } from "react-native";

import Budilnik from '../../../../../assets/images/budilnik.svg';
import Sumka from '../../../../../assets/images/sumka.svg';


export default function PillsComp(props) {
    const [enabled, setEnabled] = useState(props.enable);
    const toggleSwitch = () => {
        setEnabled((oldValue) => !oldValue);
    };

    const thumbColorOn = Platform.OS === "android" ? "#fff" : "#fff";
    const thumbColorOff = Platform.OS === "android" ? "#fff" : "#fff";
    const trackColorOn = Platform.OS === "android" ? "#98e7f0" : "#0cd1e8";
    const trackColorOff = Platform.OS === "android" ? "#EAF1FF" : "#EAF1FF";


    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', width: '35%', }}>
                <Budilnik alignSelf={'center'} />
                <View style={{ marginLeft: 10, }}>
                    <Text style={enabled ? { fontSize: 12, fontWeight: '400', color: 'black', } : { fontSize: 13, fontWeight: '400', color: 'silver', }} >
                        {props.days}
                    </Text>
                    <Text style={enabled ? { fontSize: 15, fontWeight: '700', color: 'black', } : { fontSize: 15, fontWeight: '700', color: 'silver', }}>

                        {props.hours}

                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', width: '35%', }}>
                <Sumka alignSelf={'center'} />
                <View style={{ marginLeft: 10, }}>
                    <Text style={enabled ? { fontSize: 15, fontWeight: '700', color: 'black', } : { fontSize: 15, fontWeight: '700', color: 'silver', }} >
                        {props.title}
                    </Text>
                </View>
            </View>

            <Switch
                onValueChange={toggleSwitch}
                value={enabled}
                thumbColor={enabled ? thumbColorOn : thumbColorOff}
                trackColor={{ false: trackColorOff, true: trackColorOn }}
                ios_backgroundColor={trackColorOff}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '94%',
        backgroundColor: 'white',
        marginTop: '5%',
        marginBottom: '2%',
        height: 'auto',
        borderRadius: 20,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        shadowColor: '#159CE4',
        elevation: 5,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,

    },
    containerIOS: {
        width: '94%',
        backgroundColor: 'white',
        marginTop: '5%',
        marginBottom: '2%',
        height: 60,
        borderRadius: 20,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        shadowColor: '#159CE4',
        elevation: 5,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
});
