import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { ChevronRight } from "lucide-react-native"

interface CommandItemProps {
  command: {
    id: string
    name: string
    status: string
    date: string
  }
  isDark: boolean
}

export function CommandItem({ command, isDark }: CommandItemProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "#4CAF50"
      case "pending":
        return "#FFC107"
      case "processing":
        return "#2196F3"
      case "cancelled":
        return "#F44336"
      default:
        return "#757575"
    }
  }

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
      <View style={styles.content}>
        <Text style={[styles.name, { color: isDark ? "#fff" : "#000" }]}>{command.name}</Text>
        <View style={styles.details}>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(command.status)}20` }]}>
            <Text style={[styles.statusText, { color: getStatusColor(command.status) }]}>{command.status}</Text>
          </View>
          <Text style={[styles.date, { color: isDark ? "#ccc" : "#666" }]}>{command.date}</Text>
        </View>
      </View>
      <ChevronRight size={20} color={isDark ? "#ccc" : "#666"} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    fontFamily: "Inter-Medium",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  date: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
})

