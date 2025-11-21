import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-native';

const items = [
  { id: '1', name: 'Home', detail: 'MG Road', icon: 'home', color: '#3B82F6' },
  { id: '2', name: 'Work', detail: 'Tech Park', icon: 'briefcase', color: '#10B981' },
  { id: '3', name: 'Airport', detail: 'Terminal 1', icon: 'airplane', color: '#8B5CF6' }
];

export function RecentLocations() {

  const navigate = useNavigate();

  function select(item) {
    const params = new URLSearchParams();
    params.set("destination", item.detail);

    navigate(`/?${params.toString()}`);
  }

  return (
    <View>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => select(item)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.detail}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    padding: 16,
    borderRadius: 16, 
    width: 100,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8
      },
      android: {
        elevation: 3
      }
    })
  },
  iconContainer: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 10 
  },
  title: { 
    fontWeight: '600',
    fontSize: 14,
    color: '#111827',
    marginBottom: 3,
    textAlign: 'center'
  },
  subtitle: { 
    color: '#6B7280', 
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center'
  }
});
