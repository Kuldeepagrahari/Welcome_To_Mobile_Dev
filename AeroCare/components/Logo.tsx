import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Svg, { Path, Circle } from 'react-native-svg'

const { width } = Dimensions.get('window')

const Logo = ({ size = 'large', withText = true }) => {
  const iconSize = size === 'small' ? 80 : size === 'medium' ? 120 : 160

  return (
    <View style={[styles.logoContainer, size === 'small' && styles.small, size === 'medium' && styles.medium]}>
      <View style={[styles.logoIcon, { width: iconSize, height: iconSize }]}>
        <Svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
          <Path
            d="M100 180C120 180 140 160 160 120C180 80 160 60 100 40C40 60 20 80 40 120C60 160 80 180 100 180Z"
            fill="#30D5C8"
          />
          <Circle cx="100" cy="110" r="40" fill="white" />
          <Path d="M100 90V130M80 110H120" stroke="#30D5C8" strokeWidth="10" strokeLinecap="round" />
        </Svg>
      </View>
      {withText && (
        <View style={styles.logoText}>
          <Text style={styles.logoTitle}>AeroCare</Text>
          <Text style={styles.logoSubtitle}>Swift. Safe. Life-Saving Deliveries</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  logoIcon: {
    marginBottom: 10,
  },
  logoText: {
    alignItems: 'center',
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#30D5C8',
  },
  logoSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
  small: {
    marginVertical: 10,
  },
  medium: {
    marginVertical: 15,
  },
})

export default Logo
