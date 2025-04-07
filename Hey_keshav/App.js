import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from "./screens/WelcomeScreen"
import WisdomScreen from "./screens/WisdomScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FFFBF0" },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Wisdom" component={WisdomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

