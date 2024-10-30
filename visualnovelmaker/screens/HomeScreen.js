import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Platform } from 'react-native';
import { useNovel } from '../context/NovelContext';

export default function HomeScreen({ navigation }) {
  const { loadNovel, resetToSample } = useNovel();

  React.useEffect(() => {
    loadNovel();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Visual Novel Creator</Text>
        <Text style={styles.subtitle}>Create Your Story</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonGrid}>
          <TouchableOpacity 
            style={[styles.button, styles.webButton]}
            onPress={() => navigation.navigate('SceneList')}
          >
            <Text style={styles.buttonText}>Scene Manager</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.webButton]}
            onPress={() => navigation.navigate('AssetManager')}
          >
            <Text style={styles.buttonText}>Asset Manager</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.playButton, styles.webButton]}
            onPress={() => navigation.navigate('ScenePreview', { mode: 'play' })}
          >
            <Text style={styles.buttonText}>Play Novel</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.button, styles.resetButton]}
          onPress={resetToSample}
        >
          <Text style={styles.buttonText}>Reset to Demo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonGrid: {
    ...(Platform.OS === 'web' ? {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 20,
      maxWidth: 800,
      marginHorizontal: 'auto',
    } : {
      gap: 20,
    }),
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  webButton: Platform.select({
    web: {
      cursor: 'pointer',
      transition: 'transform 0.2s',
      ':hover': {
        transform: 'scale(1.02)',
      },
    },
    default: {},
  }),
  playButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    marginTop: 20,
  },
}); 