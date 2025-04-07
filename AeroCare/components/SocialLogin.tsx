import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';

const SocialLogin: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or sign in with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#fff' }]}>
          <AntDesign name="google" size={24} color="#EA4335" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#3b5998' }]}>
          <FontAwesome name="facebook-f" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#000' }]}>
          <Entypo name="apple" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 14,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: Platform.OS === 'android' ? 4 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
