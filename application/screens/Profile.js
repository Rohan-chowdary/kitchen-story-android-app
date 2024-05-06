import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, Linking, View, Image, TouchableOpacity } from 'react-native';
import { Text, Button} from 'react-native-paper';
import { getUserData, getLogged, signOutApi } from "../config/DataApp";
import Styles from '../config/Styles';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfigApp from '../config/ConfigApp';
import ColorsApp from '../config/ColorsApp';
import Strings from '../config/Strings';
import UserContext from '../context/UserContext';

export default function Profile(props) {

  	const contextState = useContext(UserContext);
	const {navigation} = props;
	const [user, setUser] = useState('');
	const [isLogged, setisLogged] = useState('');

	const openLink = () => {
		const submitUrl = ConfigApp.URL+'submit-recipe';
		Linking.openURL(submitUrl);
	};

	const getUser = async () => {
		getUserData().then(resp => {

			if (resp != null) {
				setUser(resp[0]);
			}

		});
	}

	const checkLogged = async () => {
		const response = await getLogged();
		setisLogged(response);
	}

	const signOut = async () => {
        contextState.updateValue([]);
		await signOutApi().then(response => {
			props.navigation.navigate("home");
		});;
	}

	const onChangeScreen = (screen) => {
		navigation.navigate(screen);
	};

	const onClickMember = (id, name) => {
	    props.navigation.navigate('singlemember', {id, name});
	 };

	useEffect(() => {

		if (checkLogged() != false) {

			getUser();

		}

	}, []);

	if (isLogged === 'true') {

		return (

			<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
			<SafeAreaView>
			<View style={Styles.HeaderProfile}>
			<Image source={{uri: user.user_avatar}} style={Styles.ImageProfile} resizeMode={"cover"}/>
		    <View style={{flexDirection: 'row'}}>
		    <Text style={Styles.TextProfile}>{user.user_name}</Text>
		    {user.user_verified ? <Icon name="check-decagram" size={22} style={Styles.memberBadge}/> : null}
		    </View>
			<Text style={Styles.SubTextProfile}>{user.user_email}</Text>
			</View>

			<View style={{marginHorizontal: 30, marginBottom: 40}}>
			<CustomButton Icon="heart-outline" Label={Strings.ST4} Click={() => onChangeScreen("favorites")}/>
			<CustomButton Icon="format-list-bulleted" Label={Strings.ST108} Click={() => onClickMember(user.user_id, user.user_name)}/>
			<CustomButton Icon="playlist-edit" Label={Strings.ST113} Click={openLink}/>
			<CustomButton Icon="logout" Label={Strings.ST9} Click={() => signOut()}/>

			</View>
			</SafeAreaView>
			</ScrollView>

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

