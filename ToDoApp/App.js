import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import TaskTile from './util/TaskTile';

export default function App() {
  const [task, setTask] = useState();
  const [taskArray, setTaskArray] = useState([])

  const addTask = () => {
    Keyboard.dismiss()
    console.log(task)
    setTaskArray([...taskArray, task])
    setTask(null)
  }

  const deleteTask = (index) => {
    let itemsCopy = [...taskArray];
    itemsCopy.splice(index, 1)
    setTaskArray(itemsCopy)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TODAY'S TASKS</Text>
        {/*THIS VIEW HOLDS ALL THE CURRENT TASKS*/}
        <View style={styles.tasks}>
          {
            taskArray.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => deleteTask(index)} key={index}>
                  <TaskTile text={item} >
                  </TaskTile>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      {/* ADD A NEW TASK */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <TextInput style={styles.textInput}
          placeholder='Add a new task'
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={addTask}>
          <View style={styles.addTaskView}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View> /* OVERALL VIEW */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  tasks: {
    marginTop: 10.0
  },
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  textInput: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
    width: 250,
  },
  addTaskView: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.0
  },
  addText: {},

});
