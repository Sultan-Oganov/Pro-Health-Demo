import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Next from '../../../../../../assets/images/next.svg'


export default function Question(props) {

    const navigation = useNavigation()

    return (
        <View style={styles.question}>
            <TouchableOpacity style={styles.question__row}
                onPress={() => navigation.navigate(props.navPath, {
                    commentCount: props.commentCount,
                    myCommentCount: props.myCommentCount,
                    author: props.author,
                    authorId: props.authorId,
                    date: props.date,
                    appeal: props.appeal,
                    forum: props.forum,
                    title: props.title,
                    description: props.description,

                })}
            >
                {props.myComment ? <View style={styles.question__green_label}></View> : null}
                <View style={styles.question__info}>

                    {
                        props.i
                            ?
                            <Text style={styles.question__text_i}>
                                {props.title}
                            </Text>
                            :
                            <Text style={styles.question__text}>
                                {props.title}
                            </Text>
                    }

                    <Text style={styles.question__comment}>
                        Комментариев:
                        <Text style={styles.comment__count}>
                            {props.commentCount}
                            {
                                /*props.myComment ? <Text style={styles.comment__own}> (Ваших: {props.myCommentCount})</Text> : null */
                            }
                        </Text>
                    </Text>
                    <View style={styles.question__author}>
                        <Text style={styles.question__text_repeat}>
                            Автор: {props.i ? <Text style={{ color: '#159CE4' }}>You</Text> : props.author}
                        </Text>
                        <Text style={styles.question__text_repeat}>
                            Дата: {props.date}
                        </Text>
                    </View>
                </View>
                <View style={styles.question__arrow}>
                    <Next />
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    question: {
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderColor: 'rgba(55, 73, 87, 0.1)',
        position: 'relative',
    },
    question__row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    question__info: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '75%'
    },
    question__text_i: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#374957'

    },
    question__text: {
        fontSize: 16,
        color: '#374957'

    },
    question__comment: {
        fontSize: 14,
        color: '#374957'

    },
    comment__count: {},
    comment__own: {
        color: '#159CE4'
    },
    question__author: {
        color: '#374957',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    question__text_repeat: {
        color: '#374957',
        fontSize: 14,
    },
    question__arrow: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '10%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    question__green_label: {
        position: 'absolute',
        top: 5,
        right: 2,
        width: 8,
        height: 8,
        backgroundColor: '#26E415',
        borderRadius: 10
    }
})