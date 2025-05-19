//@ts-ignore

import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Camera, House, MessageSquareMoreIcon } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
        },
        tabBarButton: (props) => (
         <TouchableOpacity
            {...props}
            activeOpacity={1} // <- No opacity change
            style={[props.style, { backgroundColor: "transparent" }]} // <- No press bg
            delayLongPress={undefined} // Ensure compatibility with TouchableOpacityProps
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => <Camera color="white" size={28} />,
          tabBarButton: (props) => (
            <TouchableWithoutFeedback onPress={props.onPress}>
              <View
                style={{
                  top: -20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "tomato",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Passing props to allow navigation */}
                  {props.children}
                </View>
              </View>
            </TouchableWithoutFeedback> // or Touchabedback
          ),
        }}
      />

      <Tabs.Screen
        name="rooms"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <MessageSquareMoreIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
