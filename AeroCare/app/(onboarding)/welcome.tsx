import { View, Text, Image, StyleSheet, Dimensions } from "react-native"
import { useRouter } from "expo-router"
import Logo from "@/components/Logo"
import ProgressDots from "@/components/ProgressDots"
import { Button } from "react-native-paper"

const OnboardingWelcome = () => {
  const router = useRouter()

  const handleNext = () => {
    router.push("/(onboarding)/essentials")
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo size="medium" withText={false} />

        <View style={styles.illustrationContainer}>
          <Image
            source={require("@/assets/icons/drone-icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to AeroCare!</Text>
          <Text style={styles.description}>
            Revolutionizing medical deliveries with drones. Faster, safer, and smarter healthcare logistics.
          </Text>
        </View>

        <ProgressDots current={0} total={5} />

        <Button mode="contained" onPress={handleNext} style={styles.button}>
          Next
        </Button>
      </View>
    </View>
  )
}

export default OnboardingWelcome

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },
  illustrationContainer: {
    marginVertical: 30,
    width: width * 0.6,
    height: width * 0.6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    borderRadius: 8,
    marginTop: 20,
  },
})
