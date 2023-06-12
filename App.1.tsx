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
  StyleSheet, Alert,
} from 'react-native';


function App(): JSX.Element {

  const [showModal, setShowModal] = useState(false);

  const webViewRef = useRef(null);


  const unifiPayload = {
    syfPartnerId: "PI53421676",
    tokenId: "PI5342167647016188ab0b7e36",
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
    alert('Received message from WebView alert :'+ messageFromWebView)
    console.log('Received message from WebView:', messageFromWebView);
   // setMyText("My Changed Text  === " + messageFromWebView);
  };

  const loadJavascriptInWebview2 = `
  const loadJs = (payload) => {
  jsonObj = payload;
  console.log("Webview load script loadJavascriptInWebview...");
  console.log("Webview load script jsonObj..."+jsonObj);
  }
  loadJs(${JSON.stringify(unifiPayload)});
  true;
`; 

const loadJavascriptInWebview1 = `
   jsonObj = ${JSON.stringify(unifiPayload)};
  true;
`; 

const loadJavascriptInWebview3 = `
  loadJsonObject(JSON.stringify(${unifiPayloadStr}));
  true;
`;

const loadJavascriptInWebview4 = `
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

console.log(loadJavascriptInWebview3);

  return ( 
    <WebView
      originWhitelist={["*"]} 
      ref={webViewRef} 
      //source={{ uri: 'http://192.168.86.24' }} 
      source={{ uri: 'http://localhost' }} 
      onMessage={onMessageReceived}
      javaScriptEnabled={true}
      onLoadEnd={() => {
        webViewRef?.current?.injectJavaScript(loadJavascriptInWebview4)
      }}
     // injectJavaScript={onLoadStartFn}
     // source={{ uri: 'https://qpdpone.syfpos.com/mpp/syf-unifi-webview.html' }} 
      
     // source={{uri:'file:///android_asset/index.html'}}
    />
  );

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
});


export default App;
