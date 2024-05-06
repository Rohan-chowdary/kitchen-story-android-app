import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {getReplies} from "../config/DataApp";
import ConfigApp from "../config/ConfigApp";
import Heading from './Heading';
import TouchableScale from 'react-native-touchable-scale';
import { map, size } from "lodash";
import { Text, List, IconButton, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Strings from '../config/Strings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import MoreReplies from './MoreReplies';
import moment from "moment";
import EmptyResults from './EmptyResults';

export default function Replies(props) {

  const { Id, showReply } = props;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  
  useEffect(() => {
    getReplies(Id).then((response) => {
        setItems(response);
    });
  }, []);

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getReplies(Id, page+1).then((response) => {

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

    });

  };

  const renderButton = () => {

    return (
      <MoreReplies
      Indicator={loading}
      showButton={showButton}
      Items={items}
      Num={3}
      Click={() => loadMore()}/>
      )
  }

    return(

      <View style={{width: '100%'}}>

        {map(items, (item, i) => (

          <Card key={i} style={{marginBottom: 20, backgroundColor: 'rgba(0,0,0,0.01)', marginLeft: 20, borderColor: 'rgba(0,0,0,0.05)', borderWidth: 1, elevation: 0}}>
            <Card.Title
            title={item.user_name}
            titleStyle={{fontSize: 16}}
            subtitleStyle={{marginTop: -6}}
            subtitle={moment(item.created).fromNow()}
            left={props => <Avatar.Image size={45} source={{uri: item.user_avatar}} />} />
            <Card.Content>
              <Paragraph>{item.body}</Paragraph>
            </Card.Content>
          </Card>

          ))}

        {renderButton()}


      </View>

      );

}