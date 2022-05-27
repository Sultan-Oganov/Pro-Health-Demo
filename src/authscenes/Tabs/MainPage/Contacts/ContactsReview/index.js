import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import BackIcon from '../../../../../../assets/images/backicon.svg';
import Line from '../../../../../../assets/images/line.svg';
import { connect } from 'react-redux';
import { sendFeedBack } from '../../../../../redux/store/reducers/contacts-reducer';
import Spiner from '../../../../../common/Spiner/Spiner';

const ContactsReview = ({ navigation, isLoading, sendFeedBack }) => {

    const [data, setData] = useState({
        "appeal": null,
        "text": null
    })

    if (isLoading) {
        return <Spiner />
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Contacts")}
                    style={styles.backView}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.textView}>
                    <View style={styles.textView_block}>
                        <Text style={styles.headerTitle}>
                            Обратная связь
                        </Text>
                        <Line width={100} alignSelf='center' marginTop={4} />
                    </View>
                </View>
                <View style={styles.circle}>
                    <Text style={styles.circleText}></Text>
                </View>
            </View>
            <ScrollView>

                <View style={styles.content}>
                    <Text style={{ width: '94%', fontWeight: '300', }}>
                        Можете написать нам, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Тема обращения"
                        placeholderTextColor="#B4D1D7"
                        onChangeText={text => setData({ ...data, appeal: text })}
                    />
                    <TextInput
                        style={styles.input2}
                        placeholder="Текст обращения"
                        placeholderTextColor="#B4D1D7"
                        multiline={true}
                        onChangeText={text => setData({ ...data, text: text })}
                    />
                </View>

                <View style={styles.btnMain}>
                    <TouchableOpacity
                        onPress={
                            () => {
                                navigation.navigate("Contacts")
                            }}
                        style={styles.buttonstyle1}>

                        <Text style={styles.textbutton1}>Отмена</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            if (data.appeal != '' && data.text != '') {
                                sendFeedBack(data)
                            } else {
                                Alert.alert('Обязательно!', 'Заполните поля')
                            }
                        }}
                        style={styles.buttonstyle2}
                    >
                        <Text style={styles.textbutton2}>Отправить</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.contacts.isLoading
    }
}

export default connect(mapStateToProps, { sendFeedBack })(ContactsReview)

const styles = StyleSheet.create({
    input: {
        width: '94%',
        height: 55,
        marginTop: '5%',
        color: '#000',
        borderRadius: 25,
        backgroundColor: 'white',
        paddingLeft: 20,
        fontSize: 15,
    },
    input2: {
        width: '94%',
        height: 180,
        justifyContent: "flex-start",
        marginTop: '5%',
        color: '#000',
        borderRadius: 25,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        textAlignVertical: "top",

    },
    container: {
        backgroundColor: "#E5E5E5",
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        width: '90%',
        paddingTop: 50,
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
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
    },
    btnMain: {
        width: '94%',
        marginLeft: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%',

    },
    buttonstyle1: {
        borderColor: "#159CE4",
        borderWidth: 2,
        width: '49%',
        height: 55,
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
        width: '49%',
        height: 55,
        borderRadius: 20,
        alignContent: "center",
        justifyContent: "center",
    },
    textbutton2: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },

})

