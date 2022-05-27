import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import BackIcon from '../../../../../assets/images/backicon.svg';
import Line from '../../../../../assets/images/line.svg';
import Spiner from '../../../../common/Spiner/Spiner';
import { connect } from 'react-redux';
import { createTopic } from '../../../../redux/store/reducers/forum-reducer';

const ForumCreate = ({ navigation, route, isLoading, userData, createTopic }) => {

    let Params = route.params.title
    let ParamsId = route.params.id
    let ParamsCount = route.params.count

    const [data, setData] = useState({
        forum: ParamsId,
        author: userData?.id,
        title: '',
        description: '',
    })


    return (
        isLoading ?
            <Spiner />
            :
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Forum1', { title: Params, id: ParamsId, count: ParamsCount, })
                        }
                        style={styles.backView}
                    >
                        <BackIcon />
                    </TouchableOpacity>
                    <View style={styles.textView}>
                        <View style={styles.textView_block}>
                            <Text style={styles.headerTitle}>Создать топик</Text>
                            <Line width={100} alignSelf="center" marginTop={4} />
                        </View>
                    </View>
                    <View style={styles.circle}>
                        <Text style={styles.circleText}></Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ marginTop: '3%' }}>
                    <View style={styles.content}>
                        <View style={styles.contentUp}>
                            <Text style={{ width: '90%', fontWeight: '700', fontSize: 14, }}>{Params}</Text>
                            <View style={{ width: '100%', backgroundColor: '#374957', height: 2, marginTop: '5%', }}></View>
                        </View>

                        <Text style={{ width: '90%', fontWeight: '300', marginTop: '5%', }}>
                            Можете написать нам
                        </Text>
                        <TextInput
                            onChangeText={text => setData({ ...data, title: text })}
                            style={styles.input}
                            placeholder="Название"
                            placeholderTextColor="#B4D1D7"
                        />
                        <TextInput
                            onChangeText={text => setData({ ...data, description: text })}
                            multiline={true}
                            style={styles.input2}
                            placeholder="Описание"
                            placeholderTextColor="#B4D1D7"

                        />
                    </View>
                    <View style={styles.btnMain}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Forum')}
                            style={styles.buttonstyle1}>
                            <Text style={styles.textbutton1}>ОТМЕНА</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (data.title != '' && data.description != '') {
                                    createTopic(data, navigation)
                                } else {
                                    Alert.alert('Обязательно!', 'Заполните поля')
                                }
                            }}
                            style={styles.buttonstyle2}
                        >
                            <Text style={styles.textbutton2}>ПУБЛИКОВАТЬ</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    contentUp: {
        width: '90%',
    },
    input: {
        width: '90%',
        height: 50,
        marginTop: '5%',
        color: '#000',
        borderRadius: 25,
        backgroundColor: 'white',
        paddingLeft: '5%',
        fontSize: 15,
    },
    input2: {
        width: '90%',
        height: 150,
        justifyContent: "flex-start",
        marginTop: '5%',
        color: '#000',
        borderRadius: 25,
        backgroundColor: 'white',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        fontSize: 15,
        textAlignVertical: "top",
    },
    container: {
        backgroundColor: "#E5E5E5",
        flex: 1,
    },
    header: {
        flexDirection: "row",
        width: "90%",
        paddingTop: 50,
        justifyContent: "space-between",
        alignSelf: "center",
        marginBottom: 40,
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
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "15%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
        borderRadius: 50,
    },
    circleText: {
        fontSize: 15,
        color: "#159CE4",
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
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    btnMain: {
        width: "90%",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: "10%",
        marginLeft: "5%",
        marginBottom: "10%",

    },
    buttonstyle1: {
        borderColor: "#159CE4",
        borderWidth: 2,
        width: "48%",
        height: 45,
        borderRadius: 20,
        alignContent: "center",
        justifyContent: "center",
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
        width: "48%",
        height: 45,
        borderRadius: 20,
        alignContent: "center",
        justifyContent: "center",
    },
    textbutton2: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
    },

})

const mapStateToProps = (state) => {
    return {
        userData: state.mainPage.userData,
        isLoading: state.forum.isLoading,
    }
}

export default connect(mapStateToProps, { createTopic })(ForumCreate)


