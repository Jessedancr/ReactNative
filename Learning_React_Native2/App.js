/**
 * THIS IS A SIMPLE CONTAINING TWO TEXTFIELDS 
 * WHICH TAKE USER INPUT FROM A TEXTFIELD 
 * AND DISPLAYS THEM ON THE SCREEN
 */

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

export default function App() {
  const [name, setName] = useState('')
 const [age, setAge] = useState('')
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Enter name:</Text>
      <TextInput
      style = {styles.inputStyle}
      placeholder='e.g John Doe'
      value={name}
      onChangeText={setName}
      /> 
      <Text>Enter age:</Text>
      <TextInput
      keyboardType='numeric'
      style = {styles.inputStyle}
      placeholder='e.g 99'
      value={age}
      onChangeText={setAge}
      />
      <Text>Name: {name}, Age: {age}</Text>
    </View> // TopMost View
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }, // container Style
  buttonContainer: {
    marginTop: 30
  },
  inputStyle: {
   borderWidth: 1,
   borderColor: 'dimgrey',
   padding: 8,
   margin: 10,
   width: 200 
  }
}
);