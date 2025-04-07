"use client"

import { useEffect, useState } from "react"
import { Dimensions } from "react-native"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const { width } = Dimensions.get("window")
    setIsMobile(width < 768)

    const handleDimensionsChange = ({ window }: { window: { width: number; height: number } }) => {
      setIsMobile(window.width < 768)
    }

    const subscription = Dimensions.addEventListener("change", handleDimensionsChange)

    return () => {
      subscription.remove()
    }
  }, [])

  return isMobile
}

