import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { Text, Button} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import { getLogged } from "../config/DataApp";
import Styles from '../config/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfigApp from '../config/ConfigApp';
import ColorsApp from '../config/ColorsApp';
import Strings from '../config/Strings';
import UserContext from '../context/UserContext';

export default function Submit(props) {

  	const contextState = useContext(UserContext);
	const {navigation} = props;
	const [isLogged, setisLogged] = useState('');

	const checkLogged = async () => {
		const response = await getLogged();
		setisLogged(response);
	}

	const onChangeScreen = (screen) => {
		navigation.navigate(screen);
	};


	useEffect(() => {

		checkLogged();

	}, []);

	if (isLogged === 'true') {

		return (

 		<WebView 
         source={{uri: ConfigApp.URL+'submit-recipe'}} 
         javaScriptEnabled={true}
         domStorageEnabled={true}
         renderLoading={this.ActivityIndicatorLoadingView} 
         startInLoadingState={false}  
         />

			);

	}else{

		return (

			<View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
			<Icon name="account-lock" color="black" size={100} style={{marginBottom: 20}}/>
			<Button mode="contained" style={{borderRadius: 100}} contentStyle={Styles.SignButtonContent} labelStyle={Styles.SignButtonLabel} onPress={() => onChangeScreen("login")}>
			{Strings.ST10}
			</Button>

			<TouchableOpacity activeOpacity={0.9} onPress={() => onChangeScreen('register')}>
			<Text style={Styles.SignButtonTextContent}>
			{Strings.ST12} <Text style={{fontWeight: 'bold'}}>{Strings.ST35}</Text>
			</Text>
			</TouchableOpacity>

			</View>
			
			);

	}

}

