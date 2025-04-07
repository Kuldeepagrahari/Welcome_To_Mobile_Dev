import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {images} from "@/constants/images"
import {icons} from "@/constants/icons"
const TabComponent = ({focused, iconTitle, icon}: any) => {
    if(focused){
        return (
            <>
              <ImageBackground source={images.highlight} 
              className='flex flex-row justify-center align-center w-full flex-1 min-w-[112px] min-h-14 mt-5 mb-1 items-center rounded-full overflow-hidden text-black' >
                <Image source={icon} tintColor="#151312" className='size-5'></Image>
                <Text className='text-secondary ml-2'>{iconTitle}</Text>
              </ImageBackground>
            </>
        )
    }else{
        return (
            <View>
                 <Image source={icon} tintColor="#A8B5DB" className='size-5'></Image>
            </View>
        )
    }
}
const _layout = () => {
  return (
   <Tabs 
        screenOptions={{
            tabBarShowLabel:false,
            tabBarItemStyle:{
               width:"100%",
               height:"100%",
               justifyContent:"center",
               alignItems:"center"
            },
            tabBarStyle:{
                backgroundColor:"#0F0D23",
                borderRadius:"50px",
                marginHorizontal:"20px",
                position:"absolute",
                marginBottom:"30px"

            }
            
        }}
   >
    <Tabs.Screen name="index" 
    options={{
        title:"",
        headerShown: false,
        tabBarIcon:({focused}) => (
         <TabComponent iconTitle="Home" icon= {icons.home} focused={focused} />
        )

    }}/>
    <Tabs.Screen name="saved" options={{
        title:"Saved",
        headerShown: false,
        tabBarIcon:({focused}) => (
            <TabComponent iconTitle="Search" icon= {icons.search} focused={focused} />
        )
    }}/>
    <Tabs.Screen name="search" options={{
        title:"Search",
        headerShown: false,
        tabBarIcon:({focused}) => (
            <TabComponent iconTitle="Saved" icon= {icons.save} focused={focused} />
        )
    }}/>
    <Tabs.Screen name="profile" options={{
        title:"Profile",
        headerShown: false,
        tabBarIcon:({focused}) => (
            <TabComponent iconTitle="Profile" icon= {icons.person} focused={focused} />
        )
    }}/>
   </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})