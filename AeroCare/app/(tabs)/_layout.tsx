import { Tabs } from "expo-router";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const theme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme === "dark" ? "#fff" : "#000",
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
          borderTopColor: "#ccc",
          borderTopWidth: 0.5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }:any) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="details"
        options={{
          title: "Order",
          tabBarIcon: ({ color, size }:any) => (
            <Feather name="activity" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tracking"
        options={{
          title: "Track",
          tabBarIcon: ({ color, size }:any) => (
            <Entypo name="location-pin" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="command"
        options={{
          title: "Command",
          tabBarIcon: ({ color, size }:any) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
