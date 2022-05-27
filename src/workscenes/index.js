import React from 'react'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from '../authscenes/Tabs'
import MainPageContainer from '../authscenes/Tabs/MainPage/MainPageContainer';
import ProfileContainer from '../authscenes/Tabs/Profile/ProfileContainer';
import ContactsReview from '../authscenes/Tabs/MainPage/Contacts/ContactsReview';
import ContactsMapContainer from '../authscenes/Tabs/MainPage/Contacts/ContactsMap/ContactsMapContainer';
import TestMainContainer from './../authscenes/Tabs/MainPage/TestMain/TestMainContainer';
import Article from './../authscenes/Tabs/MainPage/Info/Article/index';
import Pills from './../authscenes/Tabs/MainPage/Pills/index';
import PillsAdd from './../authscenes/Tabs/MainPage/PillsAdd/index';
import TestContainer from './../authscenes/Tabs/MainPage/TestMain/Test/TestContainer';
import TestResult from './../authscenes/Tabs/MainPage/TestMain/TestResult/index';
import ForumContainer from '../authscenes/Tabs/Forum/ForumContainer';
import Forum1Container from '../authscenes/Tabs/Forum/Forum1/Forum1Container';
import Forum2Container from '../authscenes/Tabs/Forum/Forum2/Forum2Container';
import ForumCreate from '../authscenes/Tabs/Forum/ForumCreate';
import ShareApp from './../authscenes/Tabs/Forum/Share/index';
import ProfileEditPass from '../authscenes/Tabs/Profile/ProfileEditPass';
import Info from '../authscenes/Tabs/MainPage/Info';
import InfoTerm from '../authscenes/Tabs/MainPage/Info/InfoTerm';
import InfoTermDescription from '../authscenes/Tabs/MainPage/Info/InfoTermDescription';
import Media from '../authscenes/Tabs/MainPage/Media';
import MediaVideo from '../authscenes/Tabs/MainPage/Media/MediaVideo';
import ContactsContainer from '../authscenes/Tabs/MainPage/Contacts/ContactsContainer';
import ContactsDetailContainer from '../authscenes/Tabs/MainPage/Contacts/ContactsDetail/ContactsDetailContainer';


const WorkScenes = () => {

  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'red' } }}>
        <Stack.Screen
          name="MainPage"
          options={{ headerShown: false }}
          component={MainPageContainer}
        />
        <Stack.Screen
          name="ContactsReview"
          options={{ headerShown: false }}
          component={ContactsReview}
        />
        <Stack.Screen
          name="ContactsMap"
          options={{ headerShown: false }}
          component={ContactsMapContainer}
        />
        <Stack.Screen
          name="TestMain"
          options={{ headerShown: false }}
          component={TestMainContainer}
        />

        <Stack.Screen
          name="Article"
          options={{ headerShown: false }}
          component={Article}
        />

        <Stack.Screen
          name="Pills"
          options={{ headerShown: false }}
          component={Pills}
        />
        <Stack.Screen
          name="PillsAdd"
          options={{ headerShown: false }}
          component={PillsAdd}
        />
        <Stack.Screen
          name="Test"
          options={{ headerShown: false }}
          component={TestContainer}
        />
        <Stack.Screen
          name="TestResult"
          options={{ headerShown: false }}
          component={TestResult}
        />
        <Stack.Screen
          name="Forum"
          options={{ headerShown: false }}
          component={ForumContainer}
        />
        <Stack.Screen
          name="Forum1"
          options={{ headerShown: false }}
          component={Forum1Container}
        />
        <Stack.Screen
          name="Forum2"
          options={{ headerShown: false }}
          component={Forum2Container}
        />
        <Stack.Screen
          name="ForumCreate"
          options={{ headerShown: false }}
          component={ForumCreate}
        />

        <Stack.Screen
          name="ShareApp"
          options={{ headerShown: false }}
          component={ShareApp}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={ProfileContainer}
        />
        <Stack.Screen
          name="ProfileEditPass"
          options={{ headerShown: false }}
          component={ProfileEditPass}
        />
        <Stack.Screen
          name="Tabs"
          options={{ headerShown: false }}
          component={Tabs}
        />
        <Stack.Screen
          name="Info"
          options={{ headerShown: false }}
          component={Info}
        />
        <Stack.Screen
          name="InfoTerm"
          options={{ headerShown: false }}
          component={InfoTerm}
        />
        <Stack.Screen
          name="InfoTermDescription"
          options={{ headerShown: false }}
          component={InfoTermDescription}
        />
        <Stack.Screen
          name="Media"
          options={{ headerShown: false }}
          component={Media}
        />
        <Stack.Screen
          name="MediaVideo"
          options={{ headerShown: false }}
          component={MediaVideo}
        />
        <Stack.Screen
          name="Contacts"
          options={{ headerShown: false }}
          component={ContactsContainer}
        />
        <Stack.Screen
          name="ContactsDetail"
          options={{ headerShown: false }}
          component={ContactsDetailContainer}
        />

      </Stack.Navigator>
      <Tabs />
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WorkScenes;