import type React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline"
  fullWidth?: boolean
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
  onClick?: () => void
  onPress?: () => void
}

const Button = ({
  variant = "primary",
  fullWidth = false,
  children,
  style,
  textStyle,
  onClick,
  onPress,
}: ButtonProps) => {
  const handlePress = () => {
    if (onClick) onClick()
    if (onPress) onPress()
  }

  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], fullWidth && styles.fullWidth, style]}
      onPress={handlePress}
    >
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#30D5C8",
  },
  secondary: {
    backgroundColor: "#f5f5f5",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#30D5C8",
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#333",
  },
  outlineText: {
    color: "#30D5C8",
  },
})

export default Button

