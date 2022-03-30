import { StyleSheet, Text, View, TextInput, Button, Vibration } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState(null);
  const [translatedText, setTranslatedText] = useState(null);
  let dictionary = {
    "a": "•―",
    "b": "―•••",
    "c": "―•―•",
    "d": "―••",
    "e": "•",
    "f": "••―•",
    "g": "――•",
    "h": "••••",
    "i": "••",
    "j": "•―――",
    "k": "―•―",
    "l": "•―••",
    "m": "――",
    "n": "―•",
    "o": "―――",
    "p": "•――•",
    "q": "――•―",
    "r": "•―•",
    "s": "•••",
    "t": "―",
    "u": "••―",
    "v": "•••―",
    "w": "•――",
    "x": "―••―",
    "y": "―•――",
    "z": "――••"
  }




  const translate = (inputText) => {
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

    setTranslatedText(finalText)
  }

  const timer = ms => new Promise(res => setTimeout(res, ms))

  const vibratePattern = async () => {
    for (let element of translatedText) {
      if (element == "•") {
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

  }




  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Text to translate</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => translate(text)}
        value={text}
        placeholder="useless placeholder"
        keyboardType="default"
        multiline
      />
      <Text style={styles.titleText}>Translation</Text>
      <TextInput
        style={styles.input}
        value={translatedText}
        placeholder="useless placeholder"
        keyboardType="default"
        multiline
      />
      <Button
        onPress={vibratePattern}
        title="Vibrate"
        color="#000000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});