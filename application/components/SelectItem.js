import React, { useState, useEffect } from 'react';
import {View, ScrollView, StyleSheet, Linking, Alert, TouchableOpacity} from 'react-native';
import { Text, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {map, _} from 'lodash';
import ConfigApp from '../config/ConfigApp';
import Styles from '../config/Styles';
import Strings from "../config/Strings";

export default function SelectItem(props) {

  const {title, description, onClick} = props;

return(
    <List.Item
      title={title}
      description={description}
      onPress={onClick}
      titleStyle={Styles.SearchListTitle}
      descriptionStyle={Styles.SearchListDesc}
      right={props => <List.Icon {...props} icon={"chevron-down"} />}
      rippleColor={'transparent'}
      style={Styles.SearchListStyle}
    />
  );

}