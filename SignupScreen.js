import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    const userData = {
      name,
      email,
      password,
      joined: new Date().toLocaleDateString(),
    };

    setUser(userData);
    await AsyncStorage.setItem('registeredUser', JSON.stringify(userData));

    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 25, backgroundColor: '#f2f7ff' },
  heading: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, alignSelf: 'center', color: '#333' },
  input: { backgroundColor: '#fff', padding: 12, marginBottom: 15, borderRadius: 8, fontSize: 16, elevation: 1 },
  button: { backgroundColor: '#28a745', padding: 14, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
});

export default SignupScreen;
