import { View, Text, Image, StyleSheet, Dimensions } from "react-native"
import { useRouter } from "expo-router"
import Logo from "@/components/Logo"
import ProgressDots from "@/components/ProgressDots"
import { Button } from "react-native-paper"

const OnboardingControl = () => {
  const router = useRouter()

  const handleNext = () => {
    router.push("/(onboarding)/save")
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo size="small" withText />

        <View style={styles.illustrationContainer}>
          <Image
            source={require("@/assets/illustrations/control.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Control Made Easy</Text>
          <Text style={styles.description}>
            Schedule, prioritize, and manage all deliveries with just a few taps.
          </Text>
        </View>

        <ProgressDots current={3} total={5} />

        <Button mode="contained" onPress={handleNext} style={styles.button} contentStyle={{ paddingVertical: 8 }}>
          Next
        </Button>
      </View>
    </View>
  )
}

export default OnboardingControl

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
  },
  illustrationContainer: {
    marginVertical: 30,
    width: width * 0.8,
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
