import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface Props {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>
}

const FAB = ({ onPress, style, iconName }: Props) => {
  return (
    <View style={[ styles.btn, style,  ]}>
      <TouchableOpacity
        onPress={onPress}
      >
        <Ionicons name={iconName} size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default FAB

const styles = StyleSheet.create({
  btn: {
    zIndex: 99,
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0.27,
      width: 4.5
    },
    elevation: 5
  }
})