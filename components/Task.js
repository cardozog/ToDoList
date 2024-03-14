import {useState} from 'react';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Task = props => {
  const [tick, setTick] = useState();
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          style={[
            styles.square,
            {backgroundColor: tick ? '#3af24d' : '#f23a3a'},
          ]}
          onPress={() => {
            tick ? setTick(false) : setTick(true);
          }}
        />
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <TouchableOpacity onPress={props.onRemoveButtonPress}>
        <Text style={styles.removeText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
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
    width: 32,
    height: 32,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '60%',
    color: '#000',
    fontSize: 16,
  },
  removeText: {
    color: '#f23a3a',
    marginRight: 10,
  },
});

export default Task;
