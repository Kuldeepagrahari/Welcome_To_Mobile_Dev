"use client"

import { useState } from "react"
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  useColorScheme,
  Linking,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"

export default function SettingsScreen() {
  const colorScheme = useColorScheme()
  const [autoPlayMusic, setAutoPlayMusic] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [dailyVerseEnabled, setDailyVerseEnabled] = useState(true)
  const appVersion = "1.0.0"

  const toggleAutoPlayMusic = () => {
    setAutoPlayMusic(!autoPlayMusic)
    // In a real app, you would save this preference
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
    // In a real app, you would save this preference
  }

  const toggleDailyVerse = () => {
    setDailyVerseEnabled(!dailyVerseEnabled)
    // In a real app, you would save this preference
  }

  const openPrivacyPolicy = () => {
    Linking.openURL("https://example.com/privacy-policy")
  }

  const openAboutPage = () => {
    Linking.openURL("https://example.com/about")
  }

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#121212" : "#FFFBF0" }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileSection}>
            <Image source={require("@/assets/images/om-symbol.jpeg")} style={styles.profileImage} resizeMode="contain" />
            <Text style={[styles.appName, { color: colorScheme === "dark" ? "#FFC107" : "#5D4037" }]}>Ask Krishna</Text>
            <Text style={[styles.appVersion, { color: colorScheme === "dark" ? "#BDBDBD" : "#9E9E9E" }]}>
              Version {appVersion}
            </Text>
          </View>

          <View style={styles.settingsSection}>
            <Text style={[styles.sectionTitle, { color: colorScheme === "dark" ? "#E6D9B8" : "#8D6E63" }]}>
              App Settings
            </Text>

            <View style={[styles.settingItem, { borderBottomColor: colorScheme === "dark" ? "#333333" : "#E6D9B8" }]}>
              <View style={styles.settingTextContainer}>
                <Ionicons
                  name="musical-notes"
                  size={22}
                  color={colorScheme === "dark" ? "#FFC107" : "#8D6E63"}
                  style={styles.settingIcon}
                />
                <Text style={[styles.settingText, { color: colorScheme === "dark" ? "#FFFFFF" : "#5D4037" }]}>
                  Auto-play Flute Music
                </Text>
              </View>
              <Switch
                value={autoPlayMusic}
                onValueChange={toggleAutoPlayMusic}
                trackColor={{ false: "#767577", true: colorScheme === "dark" ? "#FF9800" : "#8D6E63" }}
                thumbColor={autoPlayMusic ? "#FFC107" : "#f4f3f4"}
              />
            </View>

            <View style={[styles.settingItem, { borderBottomColor: colorScheme === "dark" ? "#333333" : "#E6D9B8" }]}>
              <View style={styles.settingTextContainer}>
                <Ionicons
                  name="notifications"
                  size={22}
                  color={colorScheme === "dark" ? "#FFC107" : "#8D6E63"}
                  style={styles.settingIcon}
                />
                <Text style={[styles.settingText, { color: colorScheme === "dark" ? "#FFFFFF" : "#5D4037" }]}>
                  Enable Notifications
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: "#767577", true: colorScheme === "dark" ? "#FF9800" : "#8D6E63" }}
                thumbColor={notificationsEnabled ? "#FFC107" : "#f4f3f4"}
              />
            </View>

            <View style={[styles.settingItem, { borderBottomColor: colorScheme === "dark" ? "#333333" : "#E6D9B8" }]}>
              <View style={styles.settingTextContainer}>
                <Ionicons
                  name="calendar"
                  size={22}
                  color={colorScheme === "dark" ? "#FFC107" : "#8D6E63"}
                  style={styles.settingIcon}
                />
                <Text style={[styles.settingText, { color: colorScheme === "dark" ? "#FFFFFF" : "#5D4037" }]}>
                  Daily Verse Reminder
                </Text>
              </View>
              <Switch
                value={dailyVerseEnabled}
                onValueChange={toggleDailyVerse}
                trackColor={{ false: "#767577", true: colorScheme === "dark" ? "#FF9800" : "#8D6E63" }}
                thumbColor={dailyVerseEnabled ? "#FFC107" : "#f4f3f4"}
              />
            </View>
          </View>

          <View style={styles.settingsSection}>
            <Text style={[styles.sectionTitle, { color: colorScheme === "dark" ? "#E6D9B8" : "#8D6E63" }]}>About</Text>

            <TouchableOpacity
              style={[styles.settingItem, { borderBottomColor: colorScheme === "dark" ? "#333333" : "#E6D9B8" }]}
              onPress={openPrivacyPolicy}
            >
              <View style={styles.settingTextContainer}>
                <Ionicons
                  name="shield-checkmark"
                  size={22}
                  color={colorScheme === "dark" ? "#FFC107" : "#8D6E63"}
                  style={styles.settingIcon}
                />
                <Text style={[styles.settingText, { color: colorScheme === "dark" ? "#FFFFFF" : "#5D4037" }]}>
                  Privacy Policy
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={colorScheme === "dark" ? "#BDBDBD" : "#9E9E9E"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingItem, { borderBottomColor: colorScheme === "dark" ? "#333333" : "#E6D9B8" }]}
              onPress={openAboutPage}
            >
              <View style={styles.settingTextContainer}>
                <Ionicons
                  name="information-circle"
                  size={22}
                  color={colorScheme === "dark" ? "#FFC107" : "#8D6E63"}
                  style={styles.settingIcon}
                />
                <Text style={[styles.settingText, { color: colorScheme === "dark" ? "#FFFFFF" : "#5D4037" }]}>
                  About This App
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={colorScheme === "dark" ? "#BDBDBD" : "#9E9E9E"} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
  },
  settingsSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
  },
})

