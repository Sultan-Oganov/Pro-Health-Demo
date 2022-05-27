import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, KeyboardAvoidingView } from 'react-native'
import BackIcon from '../../../../../assets/images/backicon.svg'
import Add from '../../../../../assets/images/plus.svg';
import Line from '../../../../../assets/images/line.svg';
import UserB from '../../../../../assets/images/user-black.svg';
import UserW from '../../../../../assets/images/user-white.svg';
import Spiner from '../../../../common/Spiner/Spiner';
import dateFormat from 'dateformat';
import { TextInput } from 'react-native-gesture-handler';


export default function Forum2({ route, isLoading, userData, comments, createComment, deleteComment, deleteAppeal, editAppeal, currentComment, setCurrentComment, editComment, commentParrentId, setCommentParrentId,appealList,getAppealListData }) {
    const navigation = useNavigation()

    let countComment = route.params.commentCount
    let myCommentCount = route.params.myCommentCount
    let author = route.params.author
    let authorId = route.params.authorId
    let date = route.params.date

    let appeal = route.params.appeal
    let forum = route.params.forum
    let title = route.params.title
    let description = route.params.description


    const [changePost, setChangePost] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [commentText, setCommentText] = useState('')
    const [editMode, setEditMode] = useState(false)


    const [editModeAppealData, setEditModeAppealData] = useState({
        forum: forum,
        author: userData?.id,
        title: title,
        description: description
    })

    const [commentTextChanged, setCommentTextChanged] = useState(false)
    const [editModeCommentData, setEditModeCommentData] = useState({
        appeal: appeal,
        author: userData?.id,
        comment: null,
    })
    const [commentCount, setCommentCount] = useState()

    React.useEffect(() => {
            getAppealListData()
        const unsubscribe = navigation.addListener('focus', () => {
            getAppealListData()
        })
        return () => {
            unsubscribe
            appealList !== null || appealList !== undefined ?
                appealList?.map(el => {
                    el.id === appeal  ? 
                        setCommentCount(el.comment_count)
                    :null
                })
            : setCommentCount(countComment)
        }
        
      }, [appealList]);

    

    const comentItem =
        comments?.map((el, i) => {
            var now = new Date(el.created_on);
            dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
            return (
                appeal == el.appeal && el.parent == null ?
                    <View key={i}>

                        <View style={styles.user}>
                            <View style={el.author.id == userData?.id ? styles.user__logo_me : styles.user__logo}>
                                {el.author.id == userData?.id ? <UserW /> : <UserB />}
                            </View>

                            <View style={styles.user__descr}>
                                <Text style={styles.user__text}><Text style={el.author.id == userData?.id ? styles.user__name_me : styles.user__name}>{el.author.id == userData?.id ? 'You' : el.author.username}</Text>          Дата: {dateFormat(now, "dd.mm.yy h:MM")}</Text>

                                <Text style={styles.user__text}>{el.comment}</Text>

                                {el.author.id == userData?.id ?
                                    <View style={styles.user__links} >
                                        <TouchableOpacity
                                            onPress={() => {
                                                setChangePost(true)
                                                setCurrentComment(el.id)
                                            }}
                                            style={styles.user__link}
                                        >
                                            <Text style={styles.user__link_text}>Редактировать</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            deleteComment(el.id)
                                            
                                        }}
                                            style={styles.user__link}
                                        >
                                            <Text style={[styles.user__link_text, styles.user__link_delete]}>Удалить</Text>
                                        </TouchableOpacity>
                                    </View> :
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible2(true)
                                        setCommentParrentId(el.id)
                                        
                                    }}
                                        style={styles.user__link}>
                                        <Text style={styles.user__link_text}>Ответить</Text>
                                    </TouchableOpacity>}
                            </View>
                        </View>
                        {currentComment == el.id && changePost ?
                            <View style={styles.editPost} >
                                <Text style={styles.editPost__head}>
                                    <Text style={[styles.user__name, styles.user__name_me]}>You</Text>         Дата: {dateFormat(now, "dd.mm.yy h:MM")}
                                </Text>

                                <TextInput
                                    style={styles.editPost__input}
                                    multiline={true}
                                    onChangeText={text => {
                                        setCommentTextChanged(true)
                                        setEditModeCommentData({ ...editModeCommentData, comment: text })
                                    }}
                                    value={!commentTextChanged ? el.comment : editModeCommentData.comment}
                                />
                                <View style={styles.editPost__btns}>
                                    <TouchableOpacity onPress={() => {
                                        setChangePost(false)
                                        setCommentTextChanged(false)
                                    }} style={styles.editPost__btn_cancel}>
                                        <Text style={styles.editPost__btn_cancel_text}>ОТМЕНА</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        editComment(el.id, editModeCommentData)
                                        setChangePost(false)
                                        
                                    }} style={styles.editPost__btn_post}>
                                        <Text style={styles.editPost__btn_post_post_text}>ПУБЛИКОВАТЬ</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            null
                        }
                        {

                        }


                        {el.children !== null || el.children !== [] || el.children !== undefined ?
                            el.children?.map((element, ind) => {
                                return (
                                    <View key={ind}>
                                            <View style={styles.user__answered} >
                                                <View style={styles.user}>
                                                    <View style={element.author.id == userData?.id ? styles.user__logo_me : styles.user__logo}>
                                                        {element.author.id == userData?.id ? <UserW /> : <UserB />}
                                                    </View>

                                                    <View style={styles.user__descr}>
                                                        <Text style={styles.user__text}><Text style={element.author.id == userData?.id ? styles.user__name_me : styles.user__name}>{el.author.id == userData?.id ? 'You' : element.author.username}</Text>          Дата: {dateFormat(now, "dd.mm.yy h:MM")}</Text>

                                                        <Text style={styles.user__text}>{element.comment}</Text>
                                                        {element.author.id == userData?.id ?
                                                            <View style={styles.user__links}>
                                                                <TouchableOpacity onPress={() => {
                                                                    setChangePost(true)
                                                                    setCurrentComment(element.id)
                                                                }} style={styles.user__link}><Text style={styles.user__link_text}>Редактировать</Text></TouchableOpacity>
                                                                <TouchableOpacity
                                                                    onPress={() => deleteComment(element.id)}
                                                                    style={styles.user__link}><Text style={[styles.user__link_text, styles.user__link_delete]}>Удалить</Text></TouchableOpacity>
                                                            </View>
                                                            :
                                                            <TouchableOpacity onPress={() => {
                                                                setModalVisible2(true)
                                                                setCommentParrentId(element.id)
                                                            }}
                                                                style={styles.user__link}>
                                                                <Text style={styles.user__link_text}>Ответить</Text>
                                                            </TouchableOpacity>}
                                                    </View>
                                                </View>
                                            </View>
                                            {currentComment == element.id && changePost ?
                                                <View style={styles.editPost}>
                                                    <Text style={styles.editPost__head}>
                                                        <Text style={[styles.user__name, styles.user__name_me]}>You</Text>         Дата: {dateFormat(now, "dd.mm.yy h:MM")}
                                                    </Text>

                                                    <TextInput
                                                        style={styles.editPost__input}
                                                        multiline={true}
                                                        onChangeText={text => {
                                                            setCommentTextChanged(true)
                                                            setEditModeCommentData({ ...editModeCommentData, comment: text })
                                                        }}
                                                        value={!commentTextChanged ? element.comment : editModeCommentData.comment}
                                                    />
                                                    <View style={styles.editPost__btns}>
                                                        <TouchableOpacity onPress={() => {
                                                            setChangePost(false)
                                                            setCommentTextChanged(false)
                                                        }} style={styles.editPost__btn_cancel}>
                                                            <Text style={styles.editPost__btn_cancel_text}>ОТМЕНА</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => {
                                                            editComment(element.id, editModeCommentData)
                                                            setChangePost(false)
                                                            
                                                        }} style={styles.editPost__btn_post}>
                                                            <Text style={styles.editPost__btn_post_post_text}>ПУБЛИКОВАТЬ</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                :
                                                null
                                            }

                                        {element.children?.map((child, index) => {
                                            return (
                                                <View key={index}>
                                                <View style={styles.user__answered}> 
                                                    <View style={styles.user}>
                                                        <View style={child.author.id == userData?.id ? styles.user__logo_me : styles.user__logo}>
                                                            {child.author.id == userData?.id ? <UserW /> : <UserB />}
                                                        </View>

                                                        <View style={styles.user__descr}>
                                                            <Text style={styles.user__text}><Text style={child.author.id == userData?.id ? styles.user__name_me : styles.user__name}>{child.author.id == userData?.id ? element.author.username +': '  + ' You' : element.author.username +': ' + child.author.username}</Text>          Дата: {dateFormat(now, "dd.mm.yy h:MM")}</Text>

                                                            <Text style={styles.user__text}>{child.comment}</Text>
                                                            {child.author.id == userData?.id ?
                                                                <View style={styles.user__links} >
                                                                    <TouchableOpacity onPress={() => {
                                                                        setChangePost(true)
                                                                        setCurrentComment(child.id)
                                                                    }} style={styles.user__link}><Text style={styles.user__link_text}>Редактировать</Text></TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        onPress={() => deleteComment(child.id)}
                                                                        style={styles.user__link}><Text style={[styles.user__link_text, styles.user__link_delete]}>Удалить</Text></TouchableOpacity>
                                                                </View>
                                                                :null}
                                                        </View>
                                                    </View>

                                                </View>
                                                {currentComment == child.id && changePost ?
                                                <View style={styles.editPost}>
                                                    <Text style={styles.editPost__head}>
                                                        <Text style={[styles.user__name, styles.user__name_me]}>You</Text>         Дата: {dateFormat(now, "dd.mm.yy h:MM")}
                                                    </Text>

                                                    <TextInput
                                                        style={styles.editPost__input}
                                                        multiline={true}
                                                        onChangeText={text => {
                                                            setCommentTextChanged(true)
                                                            setEditModeCommentData({ ...editModeCommentData, comment: text })
                                                        }}
                                                        value={!commentTextChanged ? child.comment : editModeCommentData.comment}
                                                    />
                                                    <View style={styles.editPost__btns}>
                                                        <TouchableOpacity onPress={() => {
                                                            setChangePost(false)
                                                            setCommentTextChanged(false)
                                                        }} style={styles.editPost__btn_cancel}>
                                                            <Text style={styles.editPost__btn_cancel_text}>ОТМЕНА</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => {
                                                            editComment(child.id, editModeCommentData)
                                                            setChangePost(false)
                                                            
                                                        }} style={styles.editPost__btn_post}>
                                                            <Text style={styles.editPost__btn_post_post_text}>ПУБЛИКОВАТЬ</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                :
                                                null
                                            }
                                            </View>

                                            )
                                        })

                                        }
                                    </View>
                                )
                            })
                            : null
                        }

                    </View>
                    : null
            )
        })




    if (isLoading) {
        return <Spiner />
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backView}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.textView}>
                    <View style={styles.textView_block}>
                        <Text style={styles.headerTitle}>
                            Форум
                        </Text>
                        <Line width={100} alignSelf='center' marginTop={4} />
                    </View>
                </View>
                <View style={styles.circle}>
                    <Text style={styles.circleText}>3</Text>
                </View>
            </View>

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.content}>

                        <View style={styles.detail}>

                            {
                                !editMode
                                    ?
                                    <>
                                        <Text style={styles.detail__title}>{title}</Text>
                                        <Text style={styles.detail__description}>
                                            {description}
                                        </Text>
                                    </>
                                    :
                                    <>
                                        <TextInput
                                            style={styles.detail__description_input}
                                            placeholder="Введите текст для изменения заголовка"
                                            onChangeText={text => {
                                                setEditModeAppealData({ ...editModeAppealData, title: text })
                                            }}
                                            value={editModeAppealData.title} />
                                        <TextInput
                                            style={[styles.detail__description_input, styles.detail__description_input_descr]}
                                            placeholder="Введите текст для изменения описания"
                                            multiline={true}
                                            onChangeText={text => setEditModeAppealData({ ...editModeAppealData, description: text })}
                                            value={editModeAppealData.description} />
                                    </>
                            }

                            {
                                userData?.id == authorId &&

                                <View style={styles.auth__btns}>
                                    {
                                        !editMode
                                            ?
                                            <>
                                                <TouchableOpacity
                                                    onPress={() => setEditMode(true)}
                                                    style={styles.auth_btn}>
                                                    <Text style={[styles.auth__btn_text, styles.auth__btn_text_blue]}>
                                                        Редактировать
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() => deleteAppeal(appeal, navigation)}
                                                    style={styles.auth_btn}>
                                                    <Text style={[styles.auth__btn_text, styles.auth__btn_text_red]}>
                                                        Удалить
                                                    </Text>
                                                </TouchableOpacity>
                                            </>
                                            :
                                            <>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        editAppeal(appeal, editModeAppealData, navigation)
                                                        setEditMode(true)
                                                    }}
                                                    style={styles.auth_btn}>
                                                    <Text style={[styles.auth__btn_text, styles.auth__btn_text_blue]}>
                                                        Сохранить изменения
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() => setEditMode(false)}
                                                    style={styles.auth_btn}>
                                                    <Text style={[styles.auth__btn_text, styles.auth__btn_text_red]}>
                                                        Отмена
                                                    </Text>
                                                </TouchableOpacity>
                                            </>
                                    }
                                </View>
                            }



                            <View style={styles.detail__info}>
                                <View style={styles.detail__comment}>
                                    <Text style={styles.detail__text}>
                                        Комментариев: {commentCount + ' '}
                                        {myCommentCount ? (<Text style={styles.comment__blue}>Ваших: {myCommentCount}</Text>) : null}
                                    </Text>
                                    <Text style={styles.detail__text}>
                                        Автор:{author}       Дата: {date}
                                    </Text>
                                </View>

                                <View style={styles.detail__btnAdd}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(true);
                                        }}
                                    ><Add /></TouchableOpacity>
                                </View>
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TextInput
                                            style={{ width: 200, paddingVertical: 10, marginBottom: 20, fontSize: 15 }}
                                            multiline={true}
                                            placeholder="Добавьте комментарий"
                                            onChangeText={text => setCommentText(text)}
                                        />
                                        <TouchableOpacity
                                            style={{ alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.1)', width: 150, borderRadius: 5 }}
                                            disabled={commentText.length < 1}
                                            onPress={() => {
                                                setModalVisible(!modalVisible)
                                                createComment(commentText, appeal, userData?.id)
                                                
                                            }}
                                        >
                                            <Text
                                                style={{ width: '100%', textAlign: 'center', padding: 10, fontSize: 15 }}
                                            >Отправить</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ position: 'absolute', width: 20, height: 20, top: 10, right: 15, }}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                            }}>
                                            <Text style={{ color: 'red', fontSize: 15, textAlign: 'center', textAlignVertical: 'center' }}>X</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </Modal>
                            {comentItem}

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible2}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TextInput
                                            style={{ width: 200, paddingVertical: 10, marginBottom: 20, fontSize: 15 }}
                                            multiline={true}
                                            placeholder="Ответьте на комментарий"
                                            onChangeText={text => setCommentText(text)}
                                        />
                                        <TouchableOpacity
                                            style={{ alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.1)', width: 150, borderRadius: 5 }}
                                            disabled={commentText.length < 1}
                                            onPress={() => {
                                                setModalVisible2(!modalVisible2)
                                                createComment(commentText, appeal, userData?.id, commentParrentId)
                                                
                                            }}
                                        >
                                            <Text
                                                style={{ width: '100%', textAlign: 'center', padding: 10, fontSize: 15 }}
                                            >Отправить</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ position: 'absolute', width: 20, height: 20, top: 10, right: 15, }}
                                            onPress={() => {
                                                setModalVisible2(!modalVisible2);
                                            }}>
                                            <Text style={{ color: 'red', fontSize: 15, textAlign: 'center', textAlignVertical: 'center' }}>X</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        width: '90%',
        paddingTop: 50,
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginBottom: 40
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
        color: 'transparent'
    },
    headerTitle: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#374957',
        textAlign: 'center',
    },
    auth__btns: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    auth_btn: {

    },
    auth__btn_text: {
        fontSize: 12,
        borderBottomWidth: 1,
    },
    auth__btn_text_blue: {
        borderBottomColor: '#159CE4',
        color: '#159CE4'
    },
    auth__btn_text_red: {
        borderBottomColor: '#F03800',
        color: '#F03800'
    },
    content: {
        width: '100%',
        flexBasis: '100%',
        flexShrink: 1,
        flexGrow: 0,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    detail: {
        width: '90%',
    },
    detail__title: {
        color: '#374957',
        fontWeight: '700',
        fontSize: 16,
        textTransform: 'uppercase',
        marginBottom: 10
    },
    detail__description: {
        color: '#374957',
        fontSize: 15,
        fontWeight: '300',
        letterSpacing: 1,
        marginBottom: 20
    },
    detail__description_input: {
        width: '100%',
        padding: 10,
        fontSize: 15,
        fontWeight: '300',
        letterSpacing: 1,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 5
    },
    detail__description_input_descr: {
        minHeight: 100
    },
    detail__info: {
        paddingBottom: 20,
        borderColor: '#374957',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#374957',
        paddingBottom: 10
    },
    detail__comment: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '85%'
    },
    comment__blue: {
        color: '#159CE4'
    },
    detail__text: {
        color: '#374957',
    },
    detail__btnAdd: {
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
    detail__users: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    user: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: -10,
        borderBottomWidth: 2,
        borderColor: 'rgba(55, 73, 87, 0.1)',
    },
    user__logo: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 50,
        justifyContent: 'center',
        marginRight: 15,
        flexGrow: 0,
        flexShrink: 1,
        // flexBasis: '15%'
        width: 50,
        height: 50
    },
    user__descr: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '80%'
    },
    user__text: {
        fontSize: 14,
        marginBottom: 10
    },
    user__name: {
        fontWeight: '700',
        marginRight: 20
    },
    user__name_me: {
        color: '#159CE4'
    },
    user__link: {
    },
    user__link_text: {
        color: '#159CE4',
        textDecorationLine: 'underline'
    },
    user__answered: {
        width: '90%',
        alignSelf: 'flex-end'
    },
    user__descr_answered: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '80%'
    },
    user__links: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    user__logo_answered: {
        flexGrow: 0,
        flexShrink: 1,
        // flexBasis: '19%'
        width: 50,
        height: 50
    },
    user__logo_me: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderRadius: 50,
        justifyContent: 'center',
        marginRight: 15,
        backgroundColor: '#26E415',
        flexGrow: 0,
        flexShrink: 1,
        width: 50,
        height: 50
    },
    user__link_delete: {
        color: '#f00'
    },
    editPost: {
        marginTop: 20
    },
    editPost__head: {
        marginBottom: 10
    },
    editPost__input: {
        paddingVertical: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    editPost__btns: {
        width: "70%",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: "2%",
        marginLeft: "2%",
        marginBottom: "5%",
    },
    editPost__btn_cancel: {
        borderColor: "#159CE4",
        borderWidth: 2,
        width: "48%",
        height: 45,
        borderRadius: 20,
        alignContent: "center",
        justifyContent: "center",
    },
    editPost__btn_post: {
        backgroundColor: "#159CE4",
        borderColor: "#159CE4",
        borderWidth: 2,
        width: "48%",
        height: 45,
        borderRadius: 20,
        alignContent: "center",
        justifyContent: "center",
    },
    editPost__btn_cancel_text: {
        color: "black",
        fontSize: 12,
        textAlign: "center",
    },
    editPost__btn_post_post_text: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
    },

    centeredView: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});