import React, { PureComponent } from 'react';
import {View} from 'react-native';
import Styles from '../config/Styles';
import ColorsApp from '../config/ColorsApp';
import { Text, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import Strings from "../config/Strings";

export default function CustomModal(props){

  const {
    isVisible,
    showText,
    modalText,
    showIndicator,
    indicatorColors
  } = props;

		return(

      <Portal>
      <Modal visible={isVisible}>
      <View style={{backgroundColor: '#fff', width: 'auto', minWidth: 70, minHeight: 70, flexDirection: 'row', alignSelf: 'center', paddingVertical: 20, borderRadius: 6, alignItems: 'center', justifyContent: 'center'}}>
      
      {showIndicator === true ? 
      <ActivityIndicator animating={true} color={!indicatorColors ? ColorsApp.PRIMARY : indicatorColors} style={{marginHorizontal: 12}}/>
      : null
      }

      {showText === true ? 
      <Text>{modalText ? modalText : Strings.ST31}</Text>
      : null
      }

      </View>
      </Modal>
      </Portal>

			)
}


