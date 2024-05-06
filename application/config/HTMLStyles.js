import {Dimensions, I18nManager} from "react-native";

export const HTMLStyles = {

	p: {fontSize: 16, textAlign: I18nManager.isRTL ? "right" : "left"},

    a: {textDecorationLine: 'underline', textAlign: I18nManager.isRTL ? "right" : "left"},

    div: {marginBottom: 30},

    li: {fontSize: 16},

    ul: {fontSize: 16},

    h1: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"},

    h2: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"},

    h3: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"},

    h4: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"},

    h5: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"},

    h6: {fontSize: 18, fontWeight: 'bold', textAlign: I18nManager.isRTL ? "right" : "left"}


}