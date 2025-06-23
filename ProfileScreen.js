import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user, setUser } = useUser();
  const [profileImage, setProfileImage] = useState(require('../assets/default-profile.png'));
  const navigation = useNavigation();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'We need access to your photos to let you choose one.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleLogout = () => {
    setUser(null); // Clear user context
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image source={profileImage} style={styles.image} />
      </TouchableOpacity>

      <Text style={styles.tip}>(Tap image to change)</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user?.name || 'Not Available'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || 'Not Available'}</Text>

        <Text style={styles.label}>Member Since:</Text>
        <Text style={styles.value}>{user?.joined || 'Not Available'}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 100,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#2196F3',
  },
  tip: {
    marginTop: 8,
    marginBottom: 20,
    fontSize: 12,
    color: '#888',
  },
  infoBox: {
    width: '85%',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    color: '#444',
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#ff4d4d',
    padding: 14,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});