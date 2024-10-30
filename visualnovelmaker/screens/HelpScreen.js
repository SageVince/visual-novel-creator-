import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';

export default function HelpScreen({ navigation }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const helpTopics = {
    'Getting Started': {
      title: 'Getting Started',
      content: [
        'Welcome to Visual Novel Creator!',
        '1. Start by creating a new scene from the Scene Manager',
        '2. Add backgrounds and characters from the Asset Manager',
        '3. Write your dialogue and add choices',
        '4. Preview your scene to see how it looks',
      ]
    },
    'Scene Editor': {
      title: 'Scene Editor Guide',
      content: [
        'The Scene Editor lets you:',
        '• Add background images',
        '• Add and position characters',
        '• Write dialogue',
        '• Create choices for branching stories',
        '• Add background music and sound effects',
        '\nTip: Long press and drag scenes to reorder them!'
      ]
    },
    'Asset Manager': {
      title: 'Asset Manager Guide',
      content: [
        'Use the Asset Manager to:',
        '• Upload background images',
        '• Add character images',
        '• Import music and sound effects',
        '• Organize your assets by category',
        '\nSupported formats:',
        '• Images: PNG, JPG',
        '• Audio: MP3, WAV'
      ]
    },
    'Characters': {
      title: 'Character Management',
      content: [
        'Character features:',
        '• Position characters left, center, or right',
        '• Adjust character scale and opacity',
        '• Add multiple characters to a scene',
        '• Remove characters when needed',
        '\nTip: Use the preview button to see how characters look in the scene!'
      ]
    }
  };

  const renderHelpModal = () => (
    <Modal
      visible={!!selectedTopic}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSelectedTopic(null)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {selectedTopic ? helpTopics[selectedTopic].title : ''}
          </Text>
          <ScrollView style={styles.modalScroll}>
            {selectedTopic &&
              helpTopics[selectedTopic].content.map((text, index) => (
                <Text key={index} style={styles.modalText}>
                  {text}
                </Text>
              ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedTopic(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help & Tutorials</Text>
      <ScrollView style={styles.topicList}>
        {Object.keys(helpTopics).map((topic) => (
          <TouchableOpacity
            key={topic}
            style={styles.topicButton}
            onPress={() => setSelectedTopic(topic)}
          >
            <Text style={styles.topicButtonText}>{topic}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderHelpModal()}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  topicList: {
    flex: 1,
  },
  topicButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  topicButtonText: {
    fontSize: 16,
    color: '#4a90e2',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalScroll: {
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
}); 