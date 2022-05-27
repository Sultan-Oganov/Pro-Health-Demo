import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import BackIcon from '../../../../../../assets/images/backicon.svg';
import Line from '../../../../../../assets/images/line.svg';
import Divider from '../../../../../../assets/images/divider.svg';
import { getToken } from '../../../../../AsyncStorage/AsyncStorage';

export default function InfoTermDescription({ navigation, route }) {
    const [des, setDes] = useState()
    const { content, title } = route.params


    const description = async () => {
        const token = await getToken()
        const req = await fetch('http://62.109.8.101/api/v1/list/content', {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
        const resp = await req.json()
        setDes(resp)
    }

    useEffect(() => {
        description()
    }, [])


    const themeItems = des?.map((d, i) => {
        return (
            d.content == content ?
                <View key={i}>
                    <TouchableOpacity key={i} onPress={() => navigation.navigate('Article', { id: d?.id, title: d?.title, })}>
                        <Text style={styles.contentNaming}>
                            {d.title}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.contentDescription}>
                        {d.description}
                    </Text>
                </View>
                : null
        )
    })


    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Info")}
                    style={styles.backView}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.textView}>
                    <View style={styles.textView_block}>
                        <Text style={styles.headerTitle}>
                            {title}
                        </Text>
                        <Line width={100} alignSelf='center' marginTop={4} />
                    </View>
                </View>
                <View style={styles.circle}>
                    <Text style={styles.circleText}></Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.description}>
                    КРАТКОЕ ОПИСАНИЕ ПРЕДПОЧТИТЕЛЬНЫХ ТЕРМИНОВ И ОШИБОК, КОТОРЫХ СЛЕДУБЕТ ИЗБЕГАТЬ
                </Text>
                    <Divider />
                    {/* <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS ==='ios'? 'padding':null}> */}
                        <ScrollView
                            showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                            style={styles.routesScroll}>
                                {themeItems}
                        </ScrollView>
                    {/* </KeyboardAvoidingView> */}
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
        marginLeft: 20,
        marginTop: 20,
        width: '90%'
    },
    description: {
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 10
    },
    routesScroll: {
        width: '100%',
        height:'73%',
    },
    contentNaming: {
        fontWeight: 'bold',
        fontSize: 14,
        marginVertical: 10,
        color: '#374957'
    },
    contentDescription: {
        fontSize: 12,
        color: '#374957',
        marginBottom: '1%'
    },
    contentDescription1: {
        fontSize: 12,
        color: '#374957',
        marginBottom: '30%'
    }
})