/**
 * THIS IS A SIMPLE APP CONTAINING TWO TEXTFIELDS 
 * WHICH TAKE USER INPUT FROM A TEXTFIELD 
 * AND DISPLAYS THEM ON THE SCREEN
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const SaveData = async () => {
    console.log('data saved')
    try {
      await AsyncStorage.setItem("myName", name)
      await AsyncStorage.setItem("myAge", age)
    } catch (err) {
      alert(err)
    }
  }

  const load = async () => {
    try {
      let name = await AsyncStorage.getItem("myName")
      let age = await AsyncStorage.getItem("myAge")
      if (name !== null && age !== null) {
        setName(name);
        setAge(age);
      }
    } catch (err) {
      alert(err)
    }
  }

  const DeleteData = async () => {
    console.log('Data cancelled!')
    try{
      await AsyncStorage.removeItem("myName")
      await AsyncStorage.removeItem("myAge")
    } catch(err){
      alert(err)
    } finally{
      setName('')
      setAge('')
    }
  }

  useEffect(() => {
    load()
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Enter name:</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder='e.g John Doe'
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text>Enter age:</Text>
      <TextInput
        keyboardType='numeric'
        style={styles.inputStyle}
        placeholder='e.g 99'
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <Text>Name: {name}, Age: {age}</Text>

      <View style={styles.saveButtonStyle}>
      <Button
        title='save'
        onPress={() => SaveData()}
      />
      <View style={styles.cancelButtonStyle}>
      <Button title='Delete' onPress={() => DeleteData()}/>
      </View>
      </View>

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
  },
  saveButtonStyle: {
    flexDirection: 'column',
    height: 50,
    width: 100,
    backgroundColor: 'darkgrey',
    margin: 20  
  },
  cancelButtonStyle: {
    height: 50,
    width: 100,
    backgroundColor: 'darkgrey',
    marginTop: 30
  }
}
);