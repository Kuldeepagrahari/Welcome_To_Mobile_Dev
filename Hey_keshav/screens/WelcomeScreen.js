import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image } from "react-native"
import CategoryCard from "../components/CategoryCard"

const categories = [
  {
    id: 1,
    title: "I feel anxious or stuck",
    emoji: "😟",
    chapters: [2],
  },
  {
    id: 2,
    title: "Family issues are overwhelming",
    emoji: "👨‍👩‍👧‍👦",
    chapters: [1, 3],
  },
  {
    id: 3,
    title: "I'm exhausted from work/study",
    emoji: "😩",
    chapters: [3, 6],
  },
  {
    id: 4,
    title: "I overthink everything",
    emoji: "🤔",
    chapters: [18],
  },
  {
    id: 5,
    title: "I'm feeling lonely or emotional",
    emoji: "💔",
    chapters: [12],
  },
  {
    id: 6,
    title: "I don't know who I am",
    emoji: "🔍",
    chapters: [2, 4],
  },
  {
    id: 7,
    title: "I lost someone",
    emoji: "😢",
    chapters: [2],
  },
  {
    id: 8,
    title: "I can't make decisions",
    emoji: "🤷‍♂️",
    chapters: [18],
  },
  {
    id: 9,
    title: "I want to explore spirituality",
    emoji: "✨",
    chapters: [10, 15],
  },
]

const WelcomeScreen = ({ navigation }) => {
  const handleCategoryPress = (category) => {
    navigation.navigate("Wisdom", {
      chapters: category.chapters,
      title: category.title,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.imgur.com/JfkXhTg.jpeg" }}
            style={styles.peacockFeather}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Hey Parth, what's troubling your mind today?</Text>
        <Text style={styles.subtitle}>Krishna holds timeless answers for your questions.</Text>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              emoji={category.emoji}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF0",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  peacockFeather: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#5D4037",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#8D6E63",
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 8,
    marginBottom: 24,
  },
  categoriesContainer: {
    paddingHorizontal: 8,
  },
})

export default WelcomeScreen

