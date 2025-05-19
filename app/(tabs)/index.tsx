import {
  View,
  Text,
  SectionList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "@/components/Header";

const DATA = [
  {
    title: "Today",
    data: [
      [
        { id: "1", uri: "https://placekitten.com/200/200" },
        { id: "2", uri: "https://placekitten.com/201/200" },
        { id: "3", uri: "https://placekitten.com/202/200" },
        { id: "4", uri: "https://placekitten.com/203/200" },
        { id: "5", uri: "https://placekitten.com/204/200" },
      ],
    ],
  },
  {
    title: "Yesterday",
    data: [
      [
        { id: "6", uri: "https://placekitten.com/200/201" },
        { id: "7", uri: "https://placekitten.com/205/200" },
      ],
    ],
  },
  {
    title: "May 17",
    data: [[{ id: "5", uri: "https://placekitten.com/203/200" }]],
  },
];

export default function Home() {
  return (
    <>
      <Header title="Home" />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        

        <SectionList
          sections={DATA}
          keyExtractor={(_, index) => `section-${index}`}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.gridRow}>
              {item.slice(0, 3).map((photo, index) => {
                const isLast = index === 2 && item.length > 3;
                return (
                  <TouchableOpacity
                    key={photo.id}
                    style={styles.gridImageWrapper}
                  >
                    <Image
                      source={{ uri: photo.uri }}
                      style={styles.gridImage}
                    />
                    {isLast && (
                      <View style={styles.overlay}>
                        <Text style={styles.overlayText}>
                          +{item.length - 2}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
    color: "#333",
  },
  gridRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  gridImageWrapper: {
    flex: 1,
    aspectRatio: 1,
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  gridImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: "#rgba(0, 0, 0, 0.09)",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.23)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
