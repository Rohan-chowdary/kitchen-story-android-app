import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar, List, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {map, size} from 'lodash';
import Strings from '../config/Strings';
import Styles from '../config/Styles';
import ConfigApp from '../config/ConfigApp';
import { getFavorites, submitUnLike } from "../config/DataApp";
import LoadMoreButton from '../components/LoadMoreButton';
import Empty from '../components/Empty';
import EmptyResults from '../components/EmptyResults';
import UserContext from '../context/UserContext';

export default function Favorites(props) {

	const contextState = useContext(UserContext);
	const userInfo = contextState.user;

  	const { navigation } = props;
	const [items, setItems] = useState([]);
  	const [page, setPage] = useState(1);
  	const [isLoaded, setIsLoaded] = useState(false);
  	const [showButton, setshowButton] = useState(true);
  	const [loading, setLoading] = useState(false);


  const onChangeScreen = (id, title) => {
    navigation.navigate('recipe', {id, title});
  };

	useEffect(() => {

		getFavorites(userInfo.user_id).then((response) => {
			setItems(response);
			setIsLoaded(true);
		});

	}, []);

const removeBookmark = async (UserId, itemId) => {

 submitUnLike(UserId, itemId).then(token => {
  if (token === 'unliked') {
		getFavorites(userInfo.user_id).then((response) => {
			setItems(response);
		});
  }
});

};

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getFavorites(userInfo.user_id, page+1).then((response) => {

      if (!items) {
        setItems(response);
        setLoading(false);
      }else{
        setItems([...items, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);

    });

  };

  const renderButton = () => {

    return (
      <LoadMoreButton
      Indicator={loading}
      showButton={showButton}
      Items={items}
      Num={6}
      Click={() => loadMore()}/>
      )
  }

	const renderProperties = () => {

		if (!items || size(items) < 1 ) {

			return null;

		}else {

			return (
				<View>

				{map(items, (item, index) => (
					<List.Item
			        key={index}
			        title={item.title}
			        titleStyle={{fontWeight: 'bold', marginBottom: 3}}
			        onPress={() => onChangeScreen(item.id, item.title)}
			        activeOpacity={1}
			        titleNumberOfLines={2}
			        underlayColor="#ffffff"
        			rippleColor="rgba(0, 0, 0, .01)"
			        left={props => <Avatar.Image size={80} style={{marginRight: 10}} source={{uri: item.image}} />}
					right={props => <IconButton icon={"trash-can-outline"} {...props} style={{alignSelf: 'center'}} animated={true} color="red" onPress={() => removeBookmark(userInfo.user_id, item.id)}/>}
			      />

					))}

				</View>
				);
		}

	};

	if (size(items) < 1) {

		return(
			<Empty/>
			);

	}else{
		return (

<ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
			<View style={Styles.FullHeightScreen2}>
			<List.Section>
			{renderProperties()}
        	{renderButton()}

			</List.Section>
			</View>
			</ScrollView>
			);
	}
}

