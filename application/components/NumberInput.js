import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Styles from '../config/Styles';
import ColorsApp from '../config/ColorsApp';
import { Text, IconButton } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Grid, Row, Col } from 'react-native-easy-grid';

export default function NumberInput(props) {

	const {min, max, value, onchange} = props;

	const increment = () => {

		if(value < max){
			onchange(value + 1);
		}
	}

	const decrement = () => {
		if(value > 1){
			onchange(value - 1);
		}
	}

	return(
		<Grid style={{alignItems: 'center'}}>
		<Col><IconButton onPress={() => decrement()} icon="minus" color={ColorsApp.PRIMARY} /></Col>
		<Col style={{alignItems: 'center' }}><Text style={{fontWeight: 'bold', fontSize: 16}}>{value}</Text></Col>
		<Col><IconButton onPress={() => increment()} icon="plus" color={ColorsApp.PRIMARY} /></Col>
		</Grid>
		);
}