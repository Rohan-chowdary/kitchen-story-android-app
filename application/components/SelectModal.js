import React, { useState, useEffect } from 'react';
import {View, ScrollView, StyleSheet, Linking, Alert, TouchableOpacity} from 'react-native';
import { Button, Text, List, Checkbox, Portal, Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {map, _} from 'lodash';
import { useNavigation } from '@react-navigation/native';
import ConfigApp from '../config/ConfigApp';
import Styles from '../config/Styles';
import Strings from "../config/Strings";

export default function SelectModal(props) {

  const {isVisible,
    titleModal,
    closeModal,
    itemsData,
    isMultiple,
    manuallyClose,
    selectedValue,
    onClick} = props;

  const [value, setValue] = useState([]);

  const navigation = useNavigation();

  const NoResultsFound = () => {
    return (
      <View style={Styles.JustifyMiddle}>
      <Text style={{color: '#999', marginTop: 10}}>{Strings.ST48}</Text>
      </View>
      );
  };

  useEffect(() => {

  }, [value]);

  const onChangeValue = (value) => {
    closeModal(value);
  }

  const onCloseModal = () => {
    manuallyClose();
  }

return(
    <Portal>
      <Dialog visible={isVisible} onDismiss={() => manuallyClose ? onCloseModal() : onChangeValue(selectedValue)} contentContainerStyle={Styles.selectModal}>

          <Dialog.Title style={{alignSelf: 'center'}}>{titleModal}</Dialog.Title>

          <Dialog.ScrollArea style={Styles.SearchSelectModalHeight}>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

            {!itemsData.length ? NoResultsFound() : null}
            
            {map(itemsData, (item, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => onChangeValue([item.id, item.title])}>
            <View style={Styles.SearchSelectModalView}>

            {!isMultiple ? (<Checkbox.IOS status={selectedValue[0] === item.id ? "checked" : "unchecked"} uncheckedColor={"red"}/>):
            (<Checkbox.IOS status={item.selected ? "checked" : "unchecked"}/>)}
            <Text style={Styles.SearchSelectModalCheckbox}>{item.title}</Text>
            </View>
            </TouchableOpacity>
            ))}

          </ScrollView>
          </Dialog.ScrollArea>

          <Dialog.Actions style={{flexDirection: 'row'}}>
            <TouchableOpacity style={Styles.buttonSelectModal} activeOpacity={0.9} onPress={() => manuallyClose ? onCloseModal() : onChangeValue(selectedValue)}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{Strings.ST76}</Text>
            </TouchableOpacity>
          </Dialog.Actions>

      </Dialog>
    </Portal>
  );

}