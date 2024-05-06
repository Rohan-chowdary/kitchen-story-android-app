import React, { useState, useEffect } from 'react';
import { ScrollView, View} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import {getFeaturedCategories} from "../config/DataApp";
import TouchableScale from 'react-native-touchable-scale';
import { Text, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ConfigApp from '../config/ConfigApp';
import ColorsApp from '../config/ColorsApp';
import Strings from '../config/Strings';

export default function FeaturedCategories() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    getFeaturedCategories().then((response) => {
        setIsLoaded(true);
        setGenres(response);
    });
  }, []);

    return(

      <View style={{marginVertical: 20}}>
      <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
        {map(genres, (item, index) => (
        <RenderItem key={index} item={item} />

          ))}
      </ScrollView>
      </View>

      );

}

function RenderItem(props) {

    const navigation = useNavigation();

    const onChangeScreen = (id, title) => {
    navigation.navigate('singlecategory', {
      id: id,
      name: title
    });    
  };

    const { item } = props;
    const { id, title } = item;

      return (
    <View style={Styles.card2View}>
    <TouchableScale onPress={() => onChangeScreen(id, title)} activeOpacity={1} activeScale={0.98} tension={100} friction={10}>
      <View style={Styles.card2Content}>
      <Avatar.Image source={{ uri: item.image }} size={80} />
      <Text style={Styles.card2Title} numberOfLines={1}>{item.title}</Text>
      </View>
    </TouchableScale>
      </View>

      )

}