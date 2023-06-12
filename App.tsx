/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { WebView } from 'react-native-webview';

import {
  StyleSheet, Alert, View, SafeAreaView, Button,
} from 'react-native';


function App(): JSX.Element {

  const [showModal, setShowModal] = useState(false);

  const webViewRef = useRef(null);


  const unifiPayload = {
    syfPartnerId: "PI53421676",
    tokenId: "188adb0c549PI5342167639481",
    encryptKey: "",
    modalType: "",
    childMid: "",
    childPcgc: "",
    childTransType: "",
    pcgc: "",
    partnerCode: "",
    clientToken: "",
    postbackid: "d979e5b7-6382-4e4e-b269-aab027bbed58",
    clientTransId: "",
    cardNumber: "",
    custFirstName: "",
    custLastName: "",
    expMonth: "",
    expYear: "",
    custZipCode: "",
    custAddress1: "",
    phoneNumb: "",
    appartment: "",
    emailAddr: "",
    custCity: "",
    upeProgramName: "",
    custState: "",
    transPromo1: "",
    iniPurAmt: "",
    mid: "",
    productCategoryNames: "",
    transAmount1: "700",
    transAmounts: "",
    initialAmount: "",
    envUrl: "",
    productAttributes: "",
    processInd: "3"
  };

  const unifiPayloadStr = JSON.stringify(unifiPayload);

  const onMessageReceived = event => {
    const messageFromWebView = event.nativeEvent.data;
    alert('Received message from WebView alert :' + messageFromWebView)
    console.log('Received message from WebView:', messageFromWebView);
  };


  const loadSYFJavascriptInWebview = `
  loadJsonObject(JSON.stringify(${unifiPayloadStr}));
  true;
`;

  const loadSYFJavascriptInWebviewTemp = `
setTimeout(() => {
  var jsonObj = ${unifiPayloadStr};
  console.log('jsonObj = ' +JSON.stringify(jsonObj));
  loadJsonObject(JSON.stringify(jsonObj));
  window.onmessage = event => {
    console.log("React webview Received message:"+ event.data);
    if (
      event.data == "Unifi Modal Close" ||
      event.data == "Close Model" ||
      event.data == "Close" ||
      event.data == "closeModal" ||
      event.data == "Return To Merchant Shipping"
    ) {
      console.log(
        "window.ReactNativeWebView in html = " + window.ReactNativeWebView
      );
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("syf-close-modal");
      }
    }
  };
  true;
}, 100);
`;

  console.log(loadSYFJavascriptInWebviewTemp);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View>
        <Button title="Click to reload!" onClick={() => window.location.reload(true)}>
          </Button>
      </View>
      <WebView
        //originWhitelist={["*"]} 
        ref={webViewRef}
        //source={{ uri: 'http://192.168.86.24' }} 
        //source={{ uri: 'http://localhost' }} 
        source={{ uri: 'https://dpdpone.syfpos.com/mpp/syf-unifi-webview.html' }}
        onMessage={onMessageReceived}
        javaScriptEnabled={true}
        onLoadEnd={() => {
          webViewRef ?.current ?.injectJavaScript(loadSYFJavascriptInWebviewTemp)
      }}
      />

      
    </SafeAreaView>
  );

}


export default App;
