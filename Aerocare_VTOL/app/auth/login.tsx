"use client"

import { useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: "", password: "" }

    if (!email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleLogin = () => {
    if (validateForm()) {
      // In a real app, you would authenticate here
      router.replace("/onboarding")
    }
  }

  const handleRegister = () => {
    router.push("/auth/register")
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="dark" />
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/drone-logo.png")} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subtitleText}>Hello, please sign in to continue!</Text>
        <Text style={styles.orText}>
          Or{" "}
          <Text style={styles.createAccountText} onPress={handleRegister}>
            Create new account
          </Text>
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <Text style={styles.inputLabel}>Password</Text>
        <View style={[styles.passwordContainer, errors.password ? styles.inputError : null]}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#666" />
          </TouchableOpacity>
        </View>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or sign in with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("@/assets/google-icon.png")} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("@/assets/facebook-icon.png")} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("@/assets/apple-icon.png")} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.noAccountText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#30D5C8",
    marginTop: 10,
    fontFamily: "Inter-Bold",
  },
  subtitleText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    fontFamily: "Inter-Regular",
  },
  orText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    fontFamily: "Inter-Regular",
  },
  createAccountText: {
    color: "#30D5C8",
    fontWeight: "bold",
    fontFamily: "Inter-Medium",
  },
  formContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontFamily: "Inter-Medium",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#ff4d4f",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Inter-Regular",
  },
  passwordContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPasswordText: {
    color: "#30D5C8",
    textAlign: "right",
    marginBottom: 20,
    fontFamily: "Inter-Medium",
  },
  signInButton: {
    backgroundColor: "#30D5C8",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter-Medium",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
    fontFamily: "Inter-Regular",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  noAccountText: {
    color: "#666",
    fontFamily: "Inter-Regular",
  },
  registerText: {
    color: "#30D5C8",
    fontWeight: "bold",
    fontFamily: "Inter-Medium",
  },
})

