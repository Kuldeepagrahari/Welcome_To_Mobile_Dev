import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { ChevronRight, Package } from "lucide-react-native"

interface OrderItemProps {
  order: {
    id: string
    orderNumber: string
    date: string
    total: string
    status: string
    items: number
  }
  isDark: boolean
}

export function OrderItem({ order, isDark }: OrderItemProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "#4CAF50"
      case "processing":
        return "#2196F3"
      case "shipped":
        return "#9C27B0"
      case "cancelled":
        return "#F44336"
      default:
        return "#757575"
    }
  }

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconBackground, { backgroundColor: isDark ? "#333" : "#e0e0e0" }]}>
          <Package size={24} color={isDark ? "#fff" : "#000"} />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.orderNumber, { color: isDark ? "#fff" : "#000" }]}>{order.orderNumber}</Text>
          <Text style={[styles.total, { color: isDark ? "#fff" : "#000" }]}>{order.total}</Text>
        </View>
        <View style={styles.details}>
          <Text style={[styles.date, { color: isDark ? "#ccc" : "#666" }]}>{order.date}</Text>
          <Text style={[styles.items, { color: isDark ? "#ccc" : "#666" }]}>{order.items} items</Text>
        </View>
        <View style={styles.footer}>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
            <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
          </View>
          <ChevronRight size={16} color={isDark ? "#ccc" : "#666"} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  total: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-Medium",
  },
  details: {
    flexDirection: "row",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    marginRight: 12,
    fontFamily: "Inter-Regular",
  },
  items: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
})

