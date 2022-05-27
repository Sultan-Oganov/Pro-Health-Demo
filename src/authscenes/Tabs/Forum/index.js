import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native'
import BackIcon from '../../../../assets/images/backicon.svg';
import Line from '../../../../assets/images/line.svg';
import SearchIcon from '../../../../assets/images/search.svg'
import Next from '../../../../assets/images/next.svg'

export default function Forum({ route, list, getListData }) {
  const navigation = useNavigation()

  let forumItem = list && list?.map((el, index) => {
    return (
      <View style={styles.routes} key={index}>
        <View style={styles.route__item}>
          <TouchableOpacity style={styles.route} onPress={() => navigation.navigate('Forum1', { title: el.title, id: el.id, count: el.appeal_count, })}>
            <View style={styles.route__imgIcon}>
              <View style={styles.forumImage}>
                <Image source={{ uri: el.icon }} style={styles.forumImage1} />
              </View>
            </View>
            <View style={styles.route__text_block}>
              <Text style={styles.route__text}>
                {el.title}
              </Text>
              <Text style={styles.route__text_theme}>Темы: <Text style={styles.route__text_themeBold}>{el.appeal_count}</Text></Text>
            </View>
            <View style={styles.route__imgArrow}><Next /></View>
          </TouchableOpacity>
        </View>
      </View>
    )
  })

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainPage')}
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
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.search}>
          <TextInput
            onChangeText={text => text.length > 1 && getListData(text)}
            style={styles.searchText} placeholder='Искать на форуме...' placeholderTextColor='#B4D1D7' />
          <SearchIcon />
        </View>

        <View style={styles.content}>{forumItem}</View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
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
    // borderColor: "#159CE4",
    borderColor: "transparent",
    borderRadius: 50,
  },
  circleText: {
    fontSize: 15,
    // color: "#159CE4",
    color: 'transparent',
  },
  headerTitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#374957",
    textAlign: "center",
  },
  search: {
    backgroundColor: "#ffffff",
    width: "90%",
    height: 50,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  searchText: {
    fontSize: 12,
    flexShrink: 1,
    flexGrow: 1,
  },
  content: {
    width: "100%",
    flexBasis: "100%",
    flexShrink: 1,
    flexGrow: 0,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 35,
  },
  routes: {
    width: "90%",
    // height: '90%',
    flexDirection: "column",
  },
  route__item: {
    borderBottomWidth: 1,
    borderColor: "rgba(55, 73, 87, 0.1)",
    paddingTop: 20,
    paddingBottom: 20,
  },
  route: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  route__imgIcon: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "10%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  forumImage: {
    width: 25,
    height: 25,
  },
  forumImage1: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  route__imgArrow: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "10%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  route__text_block: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "80%",
  },
  route__text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#159CE4",
    textTransform: "uppercase",
  },
  route__text_theme: {
    fontSize: 12,
    color: "#000",
    width: "100%",
  },
  route__text_themeBold: {
    fontWeight: "bold",
  },
});
