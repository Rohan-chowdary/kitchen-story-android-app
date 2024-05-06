import React from 'react';
import { View, Platform} from 'react-native';
import ConfigApp from '../config/ConfigApp';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const bannerid = Platform.OS == "ios" ? ConfigApp.IOS_BANNER_ID : ConfigApp.ANDROID_INTERSTITIAL_ID;

export default function AdmobBanner(props){

    return (

      <View style={{alignSelf: 'center'}}>

        <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.BANNER}
        requestOptions={{
        requestNonPersonalizedAdsOnly: true,
        }}
        />

      </View>

      )
}
