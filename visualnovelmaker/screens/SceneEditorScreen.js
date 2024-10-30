import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  Image,
  Modal 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNovel } from '../context/NovelContext';
import Slider from '@react-native-community/slider';

export default function SceneEditorScreen({ route, navigation }) {
  const { sceneIndex } = route.params || {};
  const { novel, addScene, updateScene } = useNovel();
  const [showExpressionModal, setShowExpressionModal] = useState(false);
  
  const [scene, setScene] = useState({
    background: '',
    characters: [
      {
        name: '',
        image: '',
        expression: 'default',
        position: 'center', // 'left', 'center', 'right'
        scale: 1,
        opacity: 1
      }
    ],
    dialogue: '',
    characterName: '',
    choices: [],
    music: '',
    soundEffects: [],
    transitions: {
      in: 'fade',
      out: 'fade'
    }
  });

  const addCharacter = () => {
    setScene(prev => ({
      ...prev,
      characters: [
        ...prev.characters,
        {
          name: '',
          image: '',
          expression: 'default',
          position: 'center',
          scale: 1,
          opacity: 1
        }
      ]
    }));
  };

  const updateCharacter = (index, updates) => {
    setScene(prev => ({
      ...prev,
      characters: prev.characters.map((char, i) => 
        i === index ? { ...char, ...updates } : char
      )
    }));
  };

  const removeCharacter = (index) => {
    setScene(prev => ({
      ...prev,
      characters: prev.characters.filter((_, i) => i !== index)
    }));
  };

  const renderCharacterEditor = (character, index) => (
    <View key={index} style={styles.characterSection}>
      <Text style={styles.sectionTitle}>Character {index + 1}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Character Name"
        value={character.name}
        onChangeText={(text) => updateCharacter(index, { name: text })}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => pickCharacterImage(index)}
        >
          <Text>Select Character Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeCharacter(index)}
        >
          <Text style={styles.deleteButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.positionSelector}>
        {['left', 'center', 'right'].map(pos => (
          <TouchableOpacity
            key={pos}
            style={[
              styles.positionButton,
              character.position === pos && styles.positionButtonActive
            ]}
            onPress={() => updateCharacter(index, { position: pos })}
          >
            <Text style={styles.positionButtonText}>{pos}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sliderContainer}>
        <Text>Scale: {character.scale.toFixed(1)}</Text>
        <Slider
          style={styles.slider}
          value={character.scale}
          minimumValue={0.5}
          maximumValue={1.5}
          step={0.1}
          onValueChange={(value) => updateCharacter(index, { scale: value })}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text>Opacity: {character.opacity.toFixed(1)}</Text>
        <Slider
          style={styles.slider}
          value={character.opacity}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          onValueChange={(value) => updateCharacter(index, { opacity: value })}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.imageButton}
        onPress={() => pickImage('background')}
      >
        <Text>Select Background Image</Text>
      </TouchableOpacity>

      {scene.characters.map((character, index) => 
        renderCharacterEditor(character, index)
      )}

      <TouchableOpacity 
        style={styles.addButton}
        onPress={addCharacter}
      >
        <Text style={styles.addButtonText}>Add Character</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Dialogue"
        multiline
        value={scene.dialogue}
        onChangeText={(text) => setScene(prev => ({ ...prev, dialogue: text }))}
      />

      <TouchableOpacity 
        style={styles.imageButton}
        onPress={() => pickImage('character')}
      >
        <Text>Select Character Image</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Character Name"
        value={scene.characterName}
        onChangeText={(text) => setScene(prev => ({ ...prev, characterName: text }))}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={addChoice}
      >
        <Text style={styles.buttonText}>Add Choice</Text>
      </TouchableOpacity>

      {scene.choices.map((choice, index) => (
        <View key={index} style={styles.choiceContainer}>
          <TextInput
            style={styles.input}
            placeholder="Choice Text"
            value={choice.text}
            onChangeText={(text) => {
              const newChoices = [...scene.choices];
              newChoices[index].text = text;
              setScene(prev => ({ ...prev, choices: newChoices }));
            }}
          />
        </View>
      ))}

      <TouchableOpacity 
        style={[styles.button, styles.saveButton]}
        onPress={saveScene}
      >
        <Text style={styles.buttonText}>Save Scene</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
  },
  imageButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  choiceContainer: {
    marginBottom: 15,
  },
  characterSection: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
  },
  positionSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  positionButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  positionButtonActive: {
    backgroundColor: '#4a90e2',
  },
  positionButtonText: {
    color: 'white',
  },
  sliderContainer: {
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  addButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 