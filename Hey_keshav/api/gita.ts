// API functions to fetch Bhagavad Gita verses

// Define verse type
interface Verse {
  chapter: number
  verse: number
  slok: string
  translation: string
  tej?: {
    ht: string
  }
  purohit?: string
}

// Base URL for the Gita API
const BASE_URL = "https://bhagavadgitaapi.in"

// Fetch a specific verse from a chapter
export const fetchVerse = async (chapter: number, verse: number): Promise<Verse> => {
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
export const getChapterVerseCount = async (chapter: number): Promise<number> => {
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

