import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BackIcon from '../../../../../../assets/images/backicon.svg';
import Line from '../../../../../../assets/images/line.svg';

const ContactsDetail = ({ navigation, route, contacts, currentContactsCoordinate, getCurrentContactCoordinate }) => {

    const { contactsName, contactsDesignation } = route.params

    useEffect(() => {
        contacts?.map((el, i) => {
            if (el.contacts == contactsDesignation) {
                getCurrentContactCoordinate(el.longitude, el.latitude, el.title)
            }

        })
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Contacts')}
                    style={styles.backView}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.textView}>
                    <View style={styles.textView_block}>
                        <Text style={styles.headerTitle}>
                            {contactsName}
                        </Text>
                        <Line width={100} alignSelf='center' marginTop={4} />
                    </View>
                </View>

                <View style={styles.circle}>
                    <Text style={styles.circleText}></Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.mapView}>
                    <MapView
                        style={styles.map}
                        region={currentContactsCoordinate}
                        provider={PROVIDER_GOOGLE}
                    >
                        <Marker coordinate={currentContactsCoordinate} title={currentContactsCoordinate.title} />
                    </MapView>
                </View>

                <ScrollView style={styles.content__scrollView} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.content__description}>
                        {
                            contacts.length != [] && contacts.map(el => {
                                return (
                                    el.contacts == contactsDesignation ?
                                        <TouchableOpacity
                                            key={el.id}
                                            style={styles.content__item}
                                            onPress={() => getCurrentContactCoordinate(el.longitude, el.latitude, el.title)}
                                        >
                                            <Text style={{ fontWeight: '700', fontSize: 16, }}>
                                                {el.title}
                                            </Text>
                                            <Text style={{ fontWeight: '400', fontSize: 16, }}>
                                                {el.address}
                                            </Text>
                                            <Text style={{ fontWeight: '400', fontSize: 16, }}>
                                                {el.phone}
                                            </Text>
                                            <View style={styles.divider}></View>

                                        </TouchableOpacity>
                                        :
                                        null
                                )
                            })
                        }
                    </View>
                </ScrollView>


            </View>

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

        marginBottom: 20,

        justifyContent: 'space-between',
        alignSelf: 'center'
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
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 50
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
    content: {
        width: '90%',
        alignSelf: 'center'
    },
    mapView: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 15
    },
    map: {
        width: '100%',
        height: '100%'
    },
    content__scrollView: {
        width: '100%',
        height: '50%',
    },
    content__description: {
        width: '100%',
    },
    content__item: {
        width: '100%',
        marginBottom: 10,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'silver',
        marginTop: 15,

    },
})

export default ContactsDetail
