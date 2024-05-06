import React, { useState } from 'react';
import { SafeAreaView, View, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Styles from '../config/Styles';
import { restPassApi } from "../config/DataApp";
import Strings from '../config/Strings';

export default function ForgotPass(props) {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const onChangeScreen = (screen) => {
        props.navigation.navigate(screen);
    };

  const login = async () => {

    setLoading(true);

    if (email) {

        restPassApi(email).then(response => {
              
              if (response === 'success') {
                
              setLoading(false);

                Alert.alert(
                  Strings.ST38, Strings.ST39,
                  [
                    { text: Strings.ST76, onPress: () => onChangeScreen('login') }
                  ],
                  { cancelable: false }
                );
              }else if(response === 'email-not-exist'){

                setLoading(false);
                Alert.alert(Strings.ST104, Strings.ST37);

              }else if(response === 'already-requested'){

                setLoading(false);

                Alert.alert(Strings.ST104, Strings.ST105);

              }else if(response === 'incomplete'){

                setLoading(false);
                Alert.alert(Strings.ST104, Strings.ST32);

              }else{

                setLoading(false);
                Alert.alert(Strings.ST104, Strings.ST32);
              }

        });

      }else{
            setLoading(false);
            Alert.alert(Strings.ST104, Strings.ST33);
          }
      }

      return (

        <ScrollView contentContainerStyle={{marginTop: 30, flex: 1, justifyContent: 'center'}}>
        <SafeAreaView style={Styles.AuthPage}>
        <Image source={require('../../assets/logo.png')} resizeMode={"contain"} style={Styles.AuthLogo} />

        <View style={Styles.AuthContent}>

        <TextInput label={Strings.ST19} onChangeText={text => setEmail(text)} mode="flat" autoCapitalize="none" style={Styles.AuthInput} />

        <Button mode="contained" onPress={()=> login()} style={Styles.AuthButton} contentStyle={Styles.AuthButtonContent} labelStyle={Styles.AuthButtonLabel}>
        {!loading ? Strings.ST17 : Strings.ST31}
        </Button>

        <View style={Styles.AuthBottomContent}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => onChangeScreen('contactform')}>
        <Text style={Styles.AuthBottomText}>
        {Strings.ST41} <Text style={{fontWeight: 'bold'}}>{Strings.ST42}</Text>
        </Text>
        </TouchableOpacity>
        </View>

        </View>
        </SafeAreaView>
        </ScrollView>

        );
  }
