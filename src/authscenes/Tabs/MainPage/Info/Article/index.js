import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BackIcon from '../../../../../../assets/images/backicon.svg';
import Line from '../../../../../../assets/images/line.svg';
import Divider from '../../../../../../assets/images/divider.svg';
import { getToken } from '../../../../../AsyncStorage/AsyncStorage';

export default function Article({ navigation, route }) {
    const { id, title } = route.params

    const [article, setArticel] = useState()

    useEffect(() => {
        art()
    }, [])

    const art = async () => {
        const token = await getToken()
        const req = await fetch(`http://62.109.8.101/api/v1/list/article`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
        const resp = await req.json()
        setArticel(resp)
    }

    const content = article?.map((a, i) => {
        return (
            a.article == id ?
                <View key={i}>
                    <Divider/>
                        <Text style={styles.contentTitle}>
                            {a.title}
                        </Text>
                        <Text style={styles.contentDescription}>
                            {a.description}
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
                <ScrollView  showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                    style={styles.routesScroll}>
                        {content}
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
        width: '90%',
        height:'90%',
    },
    routesScroll: {
        width: '100%',
    },
    contentNaming: {
        fontSize: 14,
        marginVertical: 5,
        color: '#159CE4'
    },
    contentDescription: {
        fontSize: 14,
        color: '#374957',
        paddingBottom: 20,
    },
    contentDescription1: {
        fontSize: 14,
        color: '#374957',
        marginBottom: '10%'
    },
    contentTitle: {
        margin: 5,

    },
})