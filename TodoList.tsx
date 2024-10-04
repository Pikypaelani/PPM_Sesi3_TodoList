import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';

const TodoList = () => {
  const [title, setTitle] = useState(""); 
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Belajar React Native',
      completed: false,
    },
  ]);
  const [isEditing, setIsEditing] = useState(false); 
  const [editingId, setEditingId] = useState(null); 

  // Fungsi untuk menambah todo atau menyimpan perubahan edit
  const handleAddOrEditTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Masukkan tugas yang ingin ditambahkan atau diedit');
      return;
    }

    if (isEditing) {
      // Simpan perubahan edit
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, title: title } : todo
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Tambah todo baru
      const newTodo = {
        id: todos.length + 1,
        title: title,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }

    setTitle(""); // Reset input setelah menambah atau mengedit
  };

  // Fungsi untuk menghapus todo berdasarkan ID
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Fungsi untuk memulai proses edit todo
  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTitle(todoToEdit.title);
    setIsEditing(true);
    setEditingId(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Masukkan tugas Anda"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable style={styles.button} onPress={handleAddOrEditTodo}>
          <Text style={styles.buttonText}>
            {isEditing ? "Simpan Perubahan" : "Tambah Tugas"}
          </Text>
        </Pressable>
      </View>
      {todos.map((item) => (
        <View key={item.id} style={styles.todoItem}>
          <Text style={styles.todoText}>{item.title}</Text>
          <Pressable style={styles.editButton} onPress={() => handleEditTodo(item.id)}>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={() => handleDeleteTodo(item.id)}>
            <Text style={styles.buttonText}>Hapus</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
  todoText: {
    fontSize: 18,
    color: 'black',
    flex: 1,
  },
  editButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});

export default TodoList;
