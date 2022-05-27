import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Picker,
} from "react-native";
import BackIcon from "../../../../../assets/images/backicon.svg";
import SearchIcon from "../../../../../assets/images/search.svg";
import Line from "../../../../../assets/images/line.svg";
import Sort from "../../../../../assets/images/sort.svg";
import SortActive from "../../../../../assets/images/sort-active.svg";
import SortFilter from "../../../../../assets/images/sort-gray.svg";
import Add from "../../../../../assets/images/plus.svg";
import Question from "./Question/Question";
import dateFormat from "dateformat";
import Spiner from "../../../../common/Spiner/Spiner";

export default function Forum1({ isLoading, route, userData, appealList, getAppealListData, setFilterNew, setFilterOld }) {

  let Params = route.params.title
  let ParamsId = route.params.id
  let ParamsCount = route.params.count

  const [filterSearch, setFilterSearch] = useState(false);
  const [mainText, setmainText] = useState('Самые новые темы')
  const [active, setactive] = useState(false)

  const navigation = useNavigation();
  return (
    isLoading ? <Spiner /> :
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Forum")}
            style={styles.backView}
          >
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.textView}>
            <View style={styles.textView_block}>
              <Text style={styles.headerTitle}>Форум</Text>
              <Line width={100} alignSelf="center" marginTop={4} />
            </View>
          </View>
          <View style={styles.circle}>
            <Text style={styles.circleText}>3</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ height: '100%' }}>
          <View style={styles.menuSettings}>
            <View style={styles.search}>
              <TextInput
                style={styles.searchText}
                placeholder="Искать на форуме..."
                placeholderTextColor="#B4D1D7"
                onChangeText={text => getAppealListData(text)}
              />
              <SearchIcon />
            </View>
            <View style={filterSearch ? styles.sorting : styles.sorting_active}>
              <TouchableOpacity onPress={() => setFilterSearch((prev) => !prev)}>
                {filterSearch ? <Sort /> : <SortActive />}
              </TouchableOpacity>
            </View>
          </View>

          {filterSearch ? (

            <View style={active ? [styles.filterBox, styles.filterBox_active] : styles.filterBox}>

              <View style={styles.filterBox__main_item}>

                <View style={styles.leftBlock}>
                  <SortFilter style={styles.leftBlock_img} />
                  <Text style={styles.filterBox__main_text}>{mainText}</Text>
                </View>


                <TouchableOpacity onPress={() => setactive(!active)}>
                  <View style={active ? styles.filterBox__main_arrow_top : styles.filterBox__main_arrow_bottom}></View>
                </TouchableOpacity>

              </View>
              {active &&
                <View style={styles.filterBox__itemsBlock}>
                  <TouchableOpacity onPress={() => {
                    if (mainText != 'Самые новые темы') {
                      setmainText('Самые новые темы')
                      setFilterNew(appealList)
                    }
                    setactive(false)
                  }}><Text style={mainText == 'Самые новые темы' ? styles.filterBox__item_active : styles.filterBox__item}>Самые новые темы</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    if (mainText != 'Cамые старые темы') {
                      setmainText('Cамые старые темы')
                      setFilterOld(appealList)
                    }
                    setactive(false)
                  }}><Text style={mainText == 'Cамые старые темы' ? styles.filterBox__item_active : styles.filterBox__item}>Cамые старые темы</Text></TouchableOpacity>
                </View>

              }
            </View>
          ) : null}

          <View style={styles.content}>
            <View style={styles.content__title}>
              <View style={styles.content__title_texts}>
                <Text style={styles.content__title_title}>
                  {Params}
                </Text>
                <Text style={styles.content__title_theme}>
                  Темы:<Text style={styles.content__theme_int}>{ParamsCount}</Text>

                </Text>
              </View>

              <View style={styles.content__title_btnAdd}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForumCreate", { title: Params, id: ParamsId, count: ParamsCount, })}
                >
                  <Add />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.content__questions}>
              {appealList?.map((el, index) => {

                var now = new Date(el.pub_date);

                return (
                  el.forum == ParamsId ?

                    <Question
                      key={index}
                      navPath="Forum2"

                      appeal={el.id}
                      forum={el.forum}
                      title={el.title}
                      description={el.description}

                      commentCount={el.comment_count}
                      myComment={userData?.id == el.author.id ? true : false}
                      myCommentCount={null}
                      author={el.author?.username}
                      authorId={el.author?.id}
                      date={dateFormat(now, "dd.mm.yy h:MM")}
                      i={el.author.id == userData?.id}
                    /> : null
                )
              })}
            </View>
          </View>
        </ScrollView>
      </View>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
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
    // borderColor: "#159CE4",
    borderColor: "transparent",
    borderRadius: 50,
  },
  circleText: {
    fontSize: 15,
    // color: "#159CE4",
    color: "transparent",

  },
  headerTitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#374957",
    textAlign: "center",
  },
  menuSettings: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  search: {
    backgroundColor: "#ffffff",
    height: 50,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "80%",
  },
  searchText: {
    fontSize: 12,
  },
  sorting: {
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
  sorting_active: {
    width: "100%",
    height: 50,
    backgroundColor: "#374957",
    alignItems: "center",
    borderRadius: 50,
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "15%",
  },
  filterBox: {
    width: '90%',
    alignSelf: "center",
    marginTop: 15,

    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignContent: 'flex-end'
  },
  filterBox_active: {
    height: 140,
    overflow: 'hidden'
  },
  filterBox__main_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBlock_img: {
    marginRight: 20
  },
  filterBox__itemsBlock: {
    height: '70%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  filterBox__main_text: {

  },
  filterBox__main_arrow_bottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderLeftColor: 'transparent',
    borderRightWidth: 7,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: '#000'
  },
  filterBox__main_arrow_top: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderLeftColor: 'transparent',
    borderRightWidth: 7,
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: '#000'
  },
  filterBox__item: {
    color: '#000'
  },
  filterBox__item_active: {
    color: '#159CE4'
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
  content__title: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#374957",
    paddingBottom: 10,
  },
  content__title_texts: {
    flexBasis: "85%",
    flexShrink: 1,
    flexGrow: 0,
  },
  content__title_title: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  content__title_theme: {
    fontSize: 14,
  },
  content__theme_int: {
    fontWeight: "bold",
  },
  content__title_btnAdd: {
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
  content__questions: {
    width: "90%",
  },
});
