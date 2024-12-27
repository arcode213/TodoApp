import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore'; // For Firebase Firestore
import { useRoute } from '@react-navigation/native';

function TodoScreen() {

    const route= useRoute()
    const {userId}= route.params

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from Firestore when the component mounts
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('tasks') // Firestore collection where tasks are stored
      .doc(userId) // Use the user's uid as the document ID
      .collection('userTasks') // Subcollection for tasks
      .onSnapshot(snapshot => {
        const tasksData = snapshot.docs.map(doc => ({
          id: doc.id,
          task: doc.data().task,
          completed: doc.data().completed,
        }));
        setTasks(tasksData);
      });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [userId]);

  // Add a new task to Firestore
  const addTask = () => {
    if (task.trim() === '') {
      alert('Task cannot be empty');
      return;
    }

    firestore()
      .collection('tasks')
      .doc(userId) // Use the user's UID to store tasks
      .collection('userTasks')
      .add({
        task,
        completed: false,
      })
      .then(() => {
        setTask('');
      })
      .catch(error => {
        console.error('Error adding task: ', error);
      });
  };

  // Toggle task completion in Firestore
  const toggleTaskCompletion = (taskId, currentCompletion) => {
    firestore()
      .collection('tasks')
      .doc(userId)
      .collection('userTasks')
      .doc(taskId)
      .update({
        completed: !currentCompletion,
      })
      .catch(error => {
        console.error('Error updating task: ', error);
      });
  };

  // Delete a task from Firestore
  const deleteTask = (taskId) => {
    firestore()
      .collection('tasks')
      .doc(userId)
      .collection('userTasks')
      .doc(taskId)
      .delete()
      .catch(error => {
        console.error('Error deleting task: ', error);
      });
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
      <View style={{ marginBottom: 5 }}>
        <Button title="Add Task" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={[styles.taskText, item.completed && styles.completedTask]}>
              {item.task}
            </Text>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id, item.completed)}>
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
  heading: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
    color: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: 'gray'
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
    color: 'black',
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
