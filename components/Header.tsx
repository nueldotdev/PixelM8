import { View, Text, StyleSheet, Touchable, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'


interface Props {
  title: string
}


export default function Header({ title }: Props) {
  return (
    <View style={style.container}>
      <Text style={style.title}>{title.charAt(0).toUpperCase() + title.slice(1)}</Text>
      <Pressable>
        <Image source={require('../assets/images/icon.png')} style={style.image} />
      </Pressable>
    </View>
  )
}


const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 40,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },

  image: { width: 50, height: 50, borderRadius: 50, borderColor: '#E2E2E2', borderWidth: 1 }
})