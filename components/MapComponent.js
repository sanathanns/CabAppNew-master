import React from 'react';
import { Platform, View, Text, Image, StyleSheet } from 'react-native';

let MapView = null;
if (Platform.OS !== 'web') {
  try {
    MapView = require('react-native-maps').default;
  } catch (e) {
    MapView = null;
  }
}

export function MapComponent({ style, region }) {
  if (Platform.OS === 'web' || !MapView) {
    return (
      <View style={[styles.webContainer, style]}>
        <Image
          source={{ uri: 'https://via.placeholder.com/800x500.png?text=Map+Preview' }}
          style={[StyleSheet.absoluteFillObject, { borderRadius: 14 }]}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Map Preview (Web)</Text>
        </View>
      </View>
    );
  }

  return (
    <MapView
      style={[{ flex: 1 }, style]}
      initialRegion={region || {
        latitude: 12.9141,
        longitude: 74.8560,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }}
      showsUserLocation
      showsMyLocationButton
    />
  );
}

const styles = StyleSheet.create({
  webContainer: {
    backgroundColor: '#E6F7FF',
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 12,
    top: 12,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  overlayText: { color: '#0b1220', fontWeight: '700' }
});
