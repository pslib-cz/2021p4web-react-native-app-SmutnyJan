import { StyleSheet, Text, View, TextInput, Button, Vibration, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SMS from 'expo-sms';
import { dictionary } from './MorseCodeTranslates';
import * as Clipboard from 'expo-clipboard';
import * as MailComposer from 'expo-mail-composer';




export default function App() {
  const [text, setText] = useState(null);
  const [translatedText, setTranslatedText] = useState(null);
  const [vibrationColor, setVibrationColor] = useState("#000000");
  const [speechColor, setSpeechColor] = useState("#000000");
  const [isVibratingInProgress, setIsVibratingInProgress] = useState(false);


  const [iconMode, setIconMode] = useState(false);
  const toggleSwitch = () => setIconMode(previousState => !previousState);


  const changeColor = () => {
    setSpeechColor("#000000")
  }

  const showAlert = () =>
    Alert.alert(
      '',
      'Successfully copied to clipboard',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      {
        cancelable: true
      }
    );

  const sendEmail = async () => {
    var options = {}

    options = {
      subject: "",
      recipients: [],
      body: translatedText,
    }
    let promise = new Promise((resolve, reject) => {
      MailComposer.composeAsync(options)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })


  }


  const copyToClipboard = () => {
    showAlert()
    Clipboard.setString(translatedText);
  };

  const sendSms = async () => {
    await SMS.sendSMSAsync([], translatedText, {})
  }

  const handleVibrate = () => {
    if (isVibratingInProgress == false) {
      setIsVibratingInProgress(true)

      vibratePattern()
      setVibrationColor("#ff0000")
    }
  }


  const translate = (inputText) => {
    setText(inputText)
    let finalText = ""

    for (let element of inputText) {
      if (dictionary[element.toLowerCase()] == undefined) {
        finalText += element
      }
      else {
        finalText += dictionary[element.toLowerCase()]
      }
      finalText += " "
    }
    setTranslatedText(finalText.trim())
  }

  const timer = ms => new Promise(res => setTimeout(res, ms))

  const vibratePattern = async () => {
    for (let element of translatedText) {
      if (element == ".") {
        Vibration.vibrate(50)
      }
      else if (element == "―") {
        Vibration.vibrate(100)
      }
      else if (element == " ") {
        await timer(100);

      }
      await timer(200);
    }
    setIsVibratingInProgress(false)
    setVibrationColor("#000000")

  }

  const speak = async () => {
    if (await Speech.isSpeakingAsync()) {
      setSpeechColor("#000000")
      Speech.stop()
    }
    else {
      setSpeechColor("#ff0000")
      let textToRead = ""
      for (let element of translatedText) {
        if (element == " ") {
          textToRead += " mezera "
        }
        else if (element == ".") {
          textToRead += " tečka "
        }
        else if (element == "―") {
          textToRead += " spojovník "
        }
      }
      Speech.maxSpeechInputLength = Number.MAX_VALUE;

      let options = {
        onDone: changeColor
      }
      Speech.speak(textToRead, options);
    }
  };

  /*
          <View style={styles.button}>
            <Button onPress={vibratePattern} title="VIBRATE" color="#000000" />
          </View>
          <View style={styles.button}>
            <Button onPress={() => { isCancelled = true; }} title="Cancel" color="#000000" />
          </View>
          <View style={styles.button}>
            <Button title="Read" onPress={speak} color="#000000" />
          </View>
  */

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.titleText}>Text to translate</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              onChangeText={text => translate(text)}
              value={text}
              placeholder="text to tranlate"
              keyboardType="default"
              multiline
            />
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.titleText}>Translation</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              value={translatedText}
              placeholder="morse code translation"
              keyboardType="default"
              multiline
              editable={false}
            />
          </ScrollView>

        </View>
      </View>
        <View style={styles.icons}>
          <Text>Icon mode</Text>
          <Switch
            trackColor={{ false: '#000000', true: '#000000' }}
            thumbColor={iconMode ? '#000000' : '#ff0000'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={iconMode}
          />
        </View>

      {
        iconMode ?
          <View style={styles.icons}>
            <TouchableOpacity onPress={handleVibrate}>
              <Ionicons name="radio" size={50} color={vibrationColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={speak}>
              <Ionicons name="volume-high" size={50} color={speechColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={sendSms}>
              <Ionicons name="paper-plane" size={50} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={copyToClipboard}>
              <Ionicons name="link" size={50} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={sendEmail}>
              <Ionicons name="chatbubbles" size={50} color="#000000" />
            </TouchableOpacity>
          </View>
          :
          <View style={styles.container}>
            <View style={styles.button}>
              <Button onPress={handleVibrate} title="VIBRATE" color={vibrationColor} />
            </View>
            <View style={styles.button}>
              <Button onPress={speak} title="SPEAK" color={speechColor} />
            </View>
            <View style={styles.button}>
              <Button onPress={sendSms} title="SEND SMS" color="#000000" />
            </View>
            <View style={styles.button}>
              <Button onPress={copyToClipboard} title="COPY TO CLIPBOARD" color="#000000" />
            </View>
            <View style={styles.button}>
              <Button onPress={sendEmail} title="SEND EMAIL" color="#000000" />
            </View>
          </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  input: {
    height: 100,
    borderWidth: 1,
    padding: 10,
  },

  inputContainer: {
    marginBottom: 20,

  },

  container: {
    marginTop: 20,
    margin: 12,
  },

  button: {
    marginBottom: 20,
  },

  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    
  },
});