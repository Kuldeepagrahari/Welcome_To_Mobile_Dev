import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons' // or react-native-vector-icons/Feather

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChangeText,
  name,
  required = false,
  error = '',
  icon = null,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputType = type === 'password' && !showPassword ? true : false

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={[styles.inputFieldContainer, error && styles.inputFieldContainerError]}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <TextInput
          style={[styles.inputField, icon && styles.withIcon]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={inputType}
          name={name}
        />
        {showPasswordToggle && type === 'password' && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordToggle}>
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inputFieldContainerError: {
    borderColor: 'red',
  },
  iconWrapper: {
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  withIcon: {
    paddingLeft: 0,
  },
  passwordToggle: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
})

export default Input
