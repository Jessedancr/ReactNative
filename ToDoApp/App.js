import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TaskTile from "./util/TaskTile";

export default function App() {
  const [task, setTask] = useState();
  const [taskArray, setTaskArray] = useState([]);

  // FUNCTION TO ADD TASK
  const addTask = async () => {
    Keyboard.dismiss();
    console.log(task);
    try {
      await AsyncStorage.setItem(
        "myTask",
        JSON.stringify([...taskArray, task])
      );
      setTaskArray([...taskArray, task]);
    } catch (err) {
      console.log(err);
    }
    setTask(null);
  };

  // ASYNC FUNCTION TO LOAD TASKS TO ASYNC STORAGE
  const LoadTasks = async () => {
    try {
      await AsyncStorage.getItem("myTask").then((task) => {
        if (task !== null) {
          setTaskArray(JSON.parse(task));
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    LoadTasks();
  }, []);

  // FUNCTION TO DELETE TASK
  const deleteTask = async (index) => {
    try {
      AsyncStorage.removeItem("myTask").then((taskArrayCopy) => {
        taskArrayCopy = [...taskArray];
        taskArrayCopy.splice(index, 1);
        setTaskArray(taskArrayCopy);
      });
    } catch (err) {
      alert(err);
    } finally {
      console.log('This line would always run')
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TODAY'S TASKS</Text>
        {/*THIS VIEW HOLDS ALL THE CURRENT TASKS*/}
        <ScrollView style={styles.tasks}>
          {taskArray.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => deleteTask(index)} key={index}>
                <TaskTile text={item}></TaskTile>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {/* ADD A NEW TASK */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Add a new task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => addTask()}>
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
    backgroundColor: "#E8EAED",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tasks: {
    marginTop: 5.0,
    marginBottom: 135,
  },
  keyboardAvoidingView: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  textInput: {
    //flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    width: 250,
  },
  addTaskView: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.0,
  },
  tasksContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  addText: {},
});
