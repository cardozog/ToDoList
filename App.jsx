import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Task from './components/Task';
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const App = () => {
  const ref = useRef(null);
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const addTask = () => {
    Keyboard.dismiss();
    if (task.trim() === '') {
      return;
    }

    let taskObject = {key: Date.now().toString(), task: task};
    setTaskItems([...taskItems, taskObject]);
    setTask('');
  };

  const deleteTask = key => {
    let listCopy = taskItems.filter(task => task.key !== key);
    setTaskItems(listCopy);
  };

  const dragEnd = ({data}) => {
    setTaskItems(data);
    console.log(data);
  };

  const renderTask = ({item, drag}) => {
    const {isActive} = useOnCellActiveAnimation();
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.7}>
          <ShadowDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              style={{elevation: isActive ? 30 : 0}}>
              <Animated.View>
                <Task
                  text={item.task}
                  onRemoveButtonPress={() => deleteTask(item.key)}
                />
              </Animated.View>
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Tarefas de hoje</Text>
        <View style={styles.items}>
          <GestureHandlerRootView>
            <DraggableFlatList
              ref={ref}
              data={taskItems}
              keyExtractor={task => task.key}
              renderItem={renderTask}
              onDragEnd={dragEnd}
            />
          </GestureHandlerRootView>
        </View>
      </View>

      <View style={styles.writeTextWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Escreva uma tarefa"
          value={task}
          onChangeText={text => setTask(text)}
        />

        <TouchableOpacity onPress={() => addTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },

  taskWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 3 / 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  items: {
    marginTop: 30,
  },
  writeTextWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  input: {
    padding: 15,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 60,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c0c0c0',
  },
  addText: {color: 'red'},
});

export default App;
