import React, {useState, useEffect} from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import Loading from './application/components/AppLoading';
import AdmobBanner from './application/components/AdmobBanner';
import { Provider as PaperProvider, DefaultTheme as DefaultThemePaper } from 'react-native-paper';
import { NavigationContainer, DefaultTheme as DefaultThemeNav } from '@react-navigation/native';
import Navigation from './application/navigation/Navigation';
import ColorsApp from './application/config/ColorsApp';
import ConfigApp from './application/config/ConfigApp';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { checkUserApi, getUserData, setUserData, getLogged, setLogged } from "./application/config/DataApp";
import UserContext from './application/context/UserContext';
//import moment from "moment";
//import 'moment/locale/es';

DefaultThemePaper.colors.primary = ColorsApp.PRIMARY;
DefaultThemePaper.colors.placeholder = '#959595';
DefaultThemePaper.colors.accent = ColorsApp.PRIMARY;
DefaultThemeNav.colors.background = ColorsApp.BACKGROUND;
DefaultThemeNav.colors.card = ColorsApp.HEADER;
DefaultThemePaper.roundness = 6;

LogBox.ignoreAllLogs();

const cacheImages = (images) => {

  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

  const loadAssetsAsync = async () => {

    const imageAssets = cacheImages([
      require('./assets/header.jpg'),
      require('./assets/logo.png'),
      require('./assets/logo-white.png'),
    ]);

    await Promise.all([...imageAssets]);
  }

const App = () => {

  const [isReady, setIsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);

  const updateValue = (user) => {
    setUser(user);
  }

  const checkUser = async () => {

    try {

       await getUserData().then((resp) => {

       if (resp.length >= 1 && resp != null) {

        const email = resp[0]['user_email'];

        setUser(resp[0]);
        updateValue(resp[0]);

        checkUserApi(email).then(response => {

          if (response != 'error') {

              setUserData(response).then(response => {
              setLogged(true);

            });

          }else if(response === 'error'){

            setLogged(false);

          }

        });

      }else{
        setLogged(false);

      }

    })

      } catch (error) {
        setLogged(false);
        // console.log("Error", error);
      }

    }

  useEffect(() => {

    //moment.locale("es");

    checkUser();
    setTimeout(() => {
      setLoaded(true);
    }, 1500);

  }, []);

    if (!isReady) {
      return (
        <AppLoading
          startAsync={loadAssetsAsync}
          onFinish={() => setIsReady(true)}
          onError={console.warn}
        />
      );
    }

    if (!loaded) {
      return (
        <Loading/>
        );
    }

    if (loaded && isReady) {
      return (
      <UserContext.Provider value={{ user, updateValue }}>
      <PaperProvider theme={DefaultThemePaper} settings={{ icon: props => <MaterialIcons {...props} />, }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"}/>
      <NavigationContainer theme={DefaultThemeNav}>
      <Navigation/>
      {ConfigApp.SHOWADS && <AdmobBanner/>}
      </NavigationContainer>
      </PaperProvider>
      </UserContext.Provider>
        );
    }

    };

    export default App;