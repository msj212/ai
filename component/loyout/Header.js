import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Header() {
  return (
    <View style={styles.header}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={18} color="#888" style={styles.icon} />
        <TextInput 
          placeholder="Search..." 
          style={styles.searchInput} 
          placeholderTextColor="#888"
        />
      </View>

      {/* Notification Icon */}
      <TouchableOpacity style={styles.notificationButton}>
        <FontAwesome5 name="bell" size={22} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  notificationButton: {
    marginLeft: 15,
  },
});
