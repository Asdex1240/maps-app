import ThemedPressable from '@/presentation/components/shared/ThemedPressable'
import { ThemedText } from '@/presentation/components/shared/ThemedText'
import { usePermissionsStore } from '@/presentation/store/usePermissions'
import React from 'react'
import { View } from 'react-native'

const PermissionsScreen = () => {

  const {locationStatus, requestLocationPermission} = usePermissionsStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemedPressable onPress={ requestLocationPermission }>
        Habilitar ubicación
      </ThemedPressable>
      <ThemedText>Estado Actual: {locationStatus} </ThemedText>
    </View>
  )
}

export default PermissionsScreen