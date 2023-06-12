/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            This is Home Page
          </Section>

          <Modal
            animationType={'slide'}
            transparent={false}
            visible={showModal}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            {/*All views of Modal*/}
            {/*Animation can be slide, slide, none*/}
            <View style={styles.modal}>
              <Text style={styles.text}>Modal is open!</Text>
              <WebView
                ref={webViewRef}
                originWhitelist={["https://*", "http://*"]}
               // source={{ uri: 'http://192.168.86.24' }}
               source={{html: '<h1>Hello world</h1>'}}
                onMessage={onMessageReceived}
              />
              <Button
                title="Click To Close Modal"
                onPress={() => {
                  setShowModal(!showModal);
                }}
              />
            </View>
          </Modal>


          <Button title="Send Message to WebView" onPress={sendMessageToWebView} />

          <Text>
            {myText}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
