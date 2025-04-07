"use client";

import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@/constants/theme";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({ children, onClick, fullWidth = true, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base * 1.5,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  disabled: {
    backgroundColor: "#a1dadc",
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
