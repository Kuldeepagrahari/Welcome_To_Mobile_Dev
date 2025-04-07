import React from "react"
import { View, StyleSheet } from "react-native"

type ProgressDotsProps = {
  current: number
  total: number
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ current, total }) => {
  return (
    <View style={styles.container}>
      {[...Array(total)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === current && styles.activeDot,
          ]}
        />
      ))}
    </View>
  )
}

export default ProgressDots

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007BFF", // primary color
    width: 12,
    height: 12,
  },
})
