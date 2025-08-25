import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import FAB from '../shared/FAB';

interface Props extends ViewProps {
  showUserLocation?: boolean;
  initialLocation: LatLng;

}


const CustomMap = ({initialLocation, showUserLocation = true, ...rest}: Props) => {

  const mapRef = useRef<MapView>(null);

  const [isFollowingUser, setIsFollowingUser] = useState(true)
  const [isShowingPolyline, setIsShowingPolyline] = useState(true)


  const { watchLocation, clearWatchLocation, getLocation, lastKnownLocation, userLocationList } = useLocationStore();
  
  useEffect(() => {
    
    watchLocation();
  
    return () => {
      clearWatchLocation();
    }
  }, []);

  useEffect(() => {
    if(lastKnownLocation && isFollowingUser) {
      moveCameraToLocation(initialLocation);
    }

  }, [lastKnownLocation, isFollowingUser])
  

  const moveCameraToLocation = (latLng: LatLng) => {
    if(!mapRef.current) return;

    mapRef.current.animateCamera({
      center: latLng,
      zoom: 15
    })
  }

  const moveToCurrentLocation = async () => {
    if(!lastKnownLocation) {
      moveCameraToLocation(initialLocation);
    }else{
      moveCameraToLocation(lastKnownLocation);
    }

    const location = await getLocation();
    if(!location) return

    moveCameraToLocation(location);
  }
  
  
  return (
    <View {...rest}>
      <MapView
        onTouchStart={() => setIsFollowingUser(false)}
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}  
      >
        {
          isShowingPolyline && (
            <Polyline
              strokeColor='red'
              strokeWidth={20}
              coordinates={userLocationList}
            />
          )
          
        }
        

      </MapView>

      <FAB
        iconName='compass-outline'
        style={{
          bottom: 20,
          right: 20
        }}

        onPress={ moveToCurrentLocation }
      />

      <FAB
        iconName={ isFollowingUser ? 'walk-outline' : 'accessibility-outline' }
        style={{
          bottom: 80,
          right: 20
        }}

        onPress={ () => setIsFollowingUser(!isFollowingUser) }
      />

      <FAB
        iconName={ isShowingPolyline ? 'eye-outline' : 'eye-off-outline' }
        style={{
          bottom: 140,
          right: 20
        }}

        onPress={ () => setIsShowingPolyline(!isShowingPolyline) }
      />
    </View>
  )
}

export default CustomMap;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  }
})