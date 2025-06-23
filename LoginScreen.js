import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    const stored = await AsyncStorage.getItem('registeredUser');
    const savedUser = stored ? JSON.parse(stored) : null;

    if (
      savedUser &&
      email === savedUser.email &&
      password === savedUser.password
    ) {
      setUser(savedUser);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef4ff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40, color: '#333' },
  input: { width: '100%', padding: 15, backgroundColor: '#fff', borderRadius: 8, marginBottom: 20, fontSize: 16, borderColor: '#ccc', borderWidth: 1 },
  button: { backgroundColor: '#007aff', paddingVertical: 14, borderRadius: 8, width: '100%' },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600', textAlign: 'center' },
});

export default LoginScreen;
