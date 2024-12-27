import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TodoScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks', error);
    }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks', error);
    }
  };

  const addTask = () => {
    if (task.trim() === '') {
      alert('Task cannot be empty');
      return;
    }
    const newTask = { id: Date.now().toString(), task, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTask('');
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Todo App</Text>

      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Enter task"
      />
      <View style={{marginBottom: 5}}>
        <Button title="Add Task"   onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={[styles.taskText, item.completed && styles.completedTask]}>
              {item.task}
            </Text>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Text style={styles.actionText}>{item.completed ? 'Undo' : 'Complete'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
export default TodoScreen;
const styles = StyleSheet.create({
    heading:{
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 20,
        color: 'white'
    },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  taskText: {
    flex: 1,
    color: 'black'
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  actionText: {
    color: '#007bff',
    marginLeft: 10,
  },
});
