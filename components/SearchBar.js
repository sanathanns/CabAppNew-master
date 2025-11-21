import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export function SearchBar({ pickup, destination, onChangePickup, onChangeDestination, onSearch }) {
  const pickupRef = useRef(null);
  const destRef = useRef(null);

  return (
    <View style={styles.container}>
      <TextInput
        ref={pickupRef}
        value={pickup}
        onChangeText={onChangePickup}
        placeholder="Pickup"
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => destRef.current?.focus()}
      />

      <TextInput
        ref={destRef}
        value={destination}
        onChangeText={onChangeDestination}
        placeholder="Destination"
        style={[styles.input, { marginTop: 8 }]}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />

      <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, margin: 12, backgroundColor: theme.colors.card, borderRadius: 12, elevation: 2 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  searchBtn: { marginTop: 8, backgroundColor: theme.colors.primary, padding: 12, borderRadius: 8, alignItems:'center' },
  searchText: { color:'#fff', fontWeight:'700' }
});
