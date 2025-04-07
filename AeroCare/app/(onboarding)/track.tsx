import { View, Text, Image, StyleSheet, Dimensions } from "react-native"
import { useRouter } from "expo-router"
import Logo from "@/components/Logo"
import ProgressDots from "@/components/ProgressDots"
import { Button } from "react-native-paper"

const OnboardingTrack = () => {
  const router = useRouter()

  const goToNext = () => {
    router.push("/(onboarding)/control")
  }

  const handleAllowLocation = () => {
    // You can integrate real-time location permission logic here
    goToNext()
  }

  const handleSkip = () => {
    goToNext()
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo size="small" withText />

        <View style={styles.illustrationContainer}>
          <Image
            source={require("@/assets/illustrations/tracking.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Track Your Drones Live</Text>
          <Text style={styles.description}>
            Monitor drone routes, payload status, and ETAs with precision. For Real Time Tracking turn on live location.
          </Text>
        </View>

        <ProgressDots current={2} total={5} />

        <View style={styles.buttonGroup}>
          <Button mode="contained" onPress={handleAllowLocation} style={styles.button}>
            Allow live location
          </Button>

          <Button mode="outlined" onPress={handleSkip} style={styles.button}>
            Skip
          </Button>
        </View>
      </View>
    </View>
  )
}

export default OnboardingTrack

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
  buttonGroup: {
    width: "100%",
    gap: 10,
  },
  button: {
    width: "100%",
    borderRadius: 8,
  },
})
