import { StyleSheet, Text, View, TextInput, Button, Vibration, ScrollView } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState(null);
  const [translatedText, setTranslatedText] = useState(null);


  let isCancelled = false
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
    "z": "――••",
    "1": "•――――",
    "2": "••―――",
    "3": "•••――",
    "4": "••••―",
    "5": "•••••",
    "6": "―••••",
    "7": "――•••",
    "8": "―――••",
    "9": "――――•",
    "0": "―――――",
    "à": "•――•―",
    "å": "•――•―",
    "ä": "•―•―",
    "æ": "•―•―",
    "ç": "•―•―",
    "ĉ": "―•―••",
    "ç": "―•―••",
    "ð": "••――•",
    "è": "•―••―",
    "é": "••―••",
    "đ": "••―••",
    "ĝ": "――•―•",
    "ĥ": "――――",
    "š": "――――",
    "ĵ": "•―――•",
    "ñ": "――•――",
    "ö": "―――•",
    "ø": "―――•",
    "ŝ": "•••―•",
    "þ": "•――••",
    "ü": "••――",
    "ŭ": "••――",
    "ż": "――••―",
    "'": "•――――•",
    "-": "―••••―",
    "!": "――••―",
    "\"": "•―••―•",
    "$": "•••―••―",
    "&": "•―•••",
    "(": "―•――•",
    ")": "―•――•―",
    "*": "―•―•―",
    ",": "――••――",
    ".": "•―•―•―",
    "/": "―••―•",
    ":": "―――•••",
    ";": "―•―•―•",
    "?": "••――••",
    "@": "•――•―•",
    "_": "••――•―",
    "+": "•―•―•",
    "=": "―•••―",
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
    isCancelled = false
    for (let element of translatedText) {
      if(isCancelled == true) {
        return
      }
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
      <View style={styles.button}>
        <Button onPress={vibratePattern} title="VIBRATE" color="#000000" />
      </View>
      <View style={styles.button}>
        <Button onPress={() => {isCancelled = true;}} title="Cancel" color="#000000" />
      </View>
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
});