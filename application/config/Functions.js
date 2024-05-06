import ConfigApp from "./ConfigApp";
import React from 'react';
import { Dimensions, Image } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export function checkParams(param){

	return !param ? 'any' : param;
};

export function renderImage(node, index, siblings, parent, defaultRenderer) {
	if (node.name == 'img') {
	const a = node.attribs;
	return ( <Image key={index} style={{width: screenWidth*0.85, height: 150}} resizeMode={"contain"} source={{uri: a.src}}/> );
	}
}

export function sortByData(strings){

	let data = [
	{id:'date-asc', title: strings.ST70},
	{id:'date-desc', title: strings.ST89},
	{id:'price-asc', title: strings.ST71},
	{id:'price-desc', title: strings.ST72},
	{id:'size-asc', title: strings.ST91},
	{id:'size-desc', title: strings.ST90}
	];

	return data;
};