import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Alert, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Title, Button, Avatar, List, Checkbox } from 'react-native-paper';
import Styles from '../config/Styles';
import { submitComment } from "../config/DataApp";
import ColorsApp from '../config/ColorsApp';
import Strings from '../config/Strings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserContext from '../context/UserContext';

export default function Comment(props) {

  const { route } = props;
  const { navigation } = props;
  const { id, action, comment } = route.params;

  const contextState = useContext(UserContext);
  const userInfo = contextState.user;

  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState('');

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const postComment = async () => {

    setLoading(true);

    if (id, body, userInfo, action) {

      console.log(id, body, userInfo.user_id, action);

      submitComment(id, userInfo.user_id, action, body, comment).then(response => {

        if (response === 'submitted') {

          setLoading(false);

          goBack();

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

    <SafeAreaView>
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

    <View style={Styles.CommentsScreen}>

    <TextInput
    placeholder={Strings.ST103}
    onChangeText={text => setBody(text)}
    value={body} multiline={true}
    mode="flat"
    autoCapitalize="none"
    style={Styles.textArea} />

    <Button mode="contained" onPress={()=> postComment()} style={Styles.AuthButton} contentStyle={Styles.AuthButtonContent} labelStyle={Styles.AuthButtonLabel}>
    {!loading ? Strings.ST96 : Strings.ST31}
    </Button>

    </View>
    </ScrollView>
    </SafeAreaView>

    );
}
