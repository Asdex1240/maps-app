import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 25.6866,
        longitude: -100.3161,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}  
      >
        <Marker
          coordinate={{
            latitude: 25.6866,
            longitude: -100.3161,
          }}
          title='Aquí Estoy'
          description='Descripción de mi ubicación'
        />

        <Marker
          coordinate={{
            latitude: 25.6966,
            longitude: -100.3161,
          }}
          title='Aquí Estoy 2'
          description='Descripción de mi ubicación'
        />
      </MapView>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  }
})