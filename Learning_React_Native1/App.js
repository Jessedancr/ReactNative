/**
 * THIS IS A SIMPLE APP USING FLATLIST COMPONENT
 * TO DISPLAY A LIST OF ITEMS
 * IT ALSO USES THE TOUCHOPACITY COMPONENT
 * TO RESPOND TO USER'S GESTURE AND DELETE
 * ITEMS FROMTHE LIST
 */
import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native'

export default function App() {
  const [people, setPeople] = useState([
    { name: 'Jesse', id: '1' },
    { name: 'Joseph', id: '2' },
    { name: 'Isaac', id: '3' },
    { name: 'Bimpe', id: '4' },
    { name: 'Goodness', id: '5' },
    { name: 'Gilo', id: '6' },
    { name: 'Dieko', id: '7' },
    { name: 'Samuel', id: '8' },
    { name: 'Daniel', id: '9' },
    { name: 'Michael', id: '10' },
    { name: 'Dorcas', id: '11' },
  ]);

  const buttonPressed = (id) => {
    setPeople((prevPeople) => {
      return prevPeople.filter(person => person.id != id)
    })
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={people}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => buttonPressed(item.id)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* <ScrollView>
      {
        people.map(item =>
          <View>
            <Text style = {styles.item}>{item.name}</Text>
          </View>

        )
      }
      </ScrollView> */}
    </View>
  )
}


// STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightcyan',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  item: {
    marginHorizontal: 10,
    marginTop: 24,
    padding: 20,
    backgroundColor: 'aqua',
    fontSize: 16
  }
})