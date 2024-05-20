import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function TaskTile(props) {
    return (
        <View style={styles.taskTile}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>{/*  */}
            <View style={styles.circular}></View>
        </View>  /*OVERALL VIEW FOR TASK TILE */
    );
}

const styles = StyleSheet.create({
    taskTile: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: 'darkblue',
        opacity: 0.4,
        borderRadius: 5.0,
        marginRight: 10
    },
    text: {},
    circular: {
        height: 12,
        width: 12,
        borderRadius: 6.0,
        borderWidth: 2.0,
        BorderColor: 'darkblue'
    },
})