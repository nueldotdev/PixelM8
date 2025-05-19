import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { House, Camera, MessageSquareMoreIcon } from "lucide-react-native";

const { width } = Dimensions.get("window");
const TAB_COUNT = 3;
const TAB_WIDTH = width / TAB_COUNT;

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const translateX = useRef(new Animated.Value(0)).current;
  const desiredOrder = ["index", "camera", "rooms"];
  const orderedRoutes = desiredOrder.map((name) =>
    state.routes.find((r: any) => r.name === name)
  );

  useEffect(() => {
    const visualIndex = desiredOrder.indexOf(state.routes[state.index].name);
    Animated.spring(translateX, {
      toValue: visualIndex * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.tabBar}>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ translateX }],
          },
        ]}
      />
      {orderedRoutes.map((route: any) => {
      const actualIndex = state.routes.findIndex((r: any) => r.key === route.key);
      const { options } = descriptors[route.key];
      const isFocused = state.index === actualIndex;

      const onPress = () => {
        if (!isFocused) navigation.navigate(route.name);
      };

      const Icon =
        route.name === "index"
          ? House
          : route.name === "camera"
          ? Camera
          : MessageSquareMoreIcon;

      return (
        <TouchableOpacity
          key={route.key}
          onPress={onPress}
          style={styles.tab}
          activeOpacity={1}
        >
          <Icon color={isFocused ? "tomato" : "gray"} />
        </TouchableOpacity>
      );
    })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // marginHorizontal: 20,
    // marginBottom: 10,
    overflow: "hidden",
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    width: TAB_WIDTH * 0.25,
    height: 6,
    borderRadius: 3,
    backgroundColor: "tomato",
    left: TAB_WIDTH * 0.38, // centers it under icon
  },
});
