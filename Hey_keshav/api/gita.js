// API functions to fetch Bhagavad Gita verses

// Base URL for the Gita API
const BASE_URL = "https://bhagavadgitaapi.in"

// Fetch a specific verse from a chapter
export const fetchVerse = async (chapter, verse) => {
  try {
    const response = await fetch(`${BASE_URL}/slok/${chapter}/${verse}`)

    if (!response.ok) {
      throw new Error("Failed to fetch verse")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching verse:", error)
    throw error
  }
}

// Get the total number of verses in a chapter
export const getChapterVerseCount = async (chapter) => {
  try {
    const response = await fetch(`${BASE_URL}/chapter/${chapter}`)

    if (!response.ok) {
      throw new Error("Failed to fetch chapter info")
    }

    const data = await response.json()
    return data.verses_count
  } catch (error) {
    console.error("Error fetching chapter info:", error)
    return 20 // Fallback default in case API fails
  }
}

