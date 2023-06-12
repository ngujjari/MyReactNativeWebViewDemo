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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Modal,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {

  const [myText, setMyText] = useState("My Original Text");
  

  const [showModal, setShowModal] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const webViewRef = useRef(null);

  useEffect(() => {
    
    const unifiPayload = {
      syfPartnerId: "PI53421676",
      tokenId: "1889d40a94fPI5342167625089",
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
    webViewRef.current.injectJavaScript(`loadJsonObjectAndroid(${unifiPayload});`);
    }, [])

 

  const sendMessageToWebView = () => {
    const message = 'Hello from React Native!';
    setShowModal(!showModal);
    //webViewRef.current.injectJavaScript(`receiveMessageFromReactNative("${message}");`);

  }

  const onMessageReceived = event => {
    const messageFromWebView = event.nativeEvent.data;

    console.log('Received message from WebView:', messageFromWebView);
    setMyText("My Changed Text  === " + messageFromWebView);
  };


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <WebView
      originWhitelist={["*"]} 
      ref={webViewRef}
      //source={{ uri: 'http://192.168.86.24' }} 
      source={{ uri: 'https://qpdpone.syfpos.com/mpp/syf-unifi-webview.html' }} 
      
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
