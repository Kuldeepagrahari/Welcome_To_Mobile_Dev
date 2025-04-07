import { StyleSheet, Text, TextInput, View,  } from 'react-native'
import React from 'react'

const SearchBar = () => {
  return (
    <View>
      <TextInput
       placeholder="Search through 300+ Movies"
       placeholderTextColor="white"
       className='bg-[#0F0D23] text-white h-10 p-3 rounded-3xl'
        
      >
    
      </TextInput>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})