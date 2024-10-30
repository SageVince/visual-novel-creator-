import React, { useState, useEffect } from 'react';
import { 
  View, 
  Image, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  Animated 
} from 'react-native';
import { Audio } from 'expo-av';
import { useNovel } from '../context/NovelContext';

export default function ScenePreviewScreen({ route, navigation }) {
  const { mode = 'preview', sceneIndex = 0 } = route.params || {};
  const { novel } = useNovel();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(sceneIndex);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [sound, setSound] = useState();

  const currentScene = novel.scenes[currentSceneIndex];

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync();
  };

  const handleNext = () => {
    if (currentSceneIndex < novel.scenes.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();

      setCurrentSceneIndex(prev => prev + 1);
    }
  };

  const handleChoice = (nextScene) => {
    if (nextScene !== null) {
      setCurrentSceneIndex(nextScene);
    }
  };

  if (!currentScene) {
    return (
      <View style={styles.container}>
        <Text>No scenes available</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handleNext}
      activeOpacity={0.9}
    >
      <Animated.View style={[styles.sceneContainer, { opacity: fadeAnim }]}>
        {currentScene.background && (
          <Image
            source={{ uri: currentScene.background }}
            style={styles.background}
          />
        )}
        
        {currentScene.character && (
          <Image
            source={{ uri: currentScene.character }}
            style={styles.character}
          />
        )}

        <View style={styles.dialogueBox}>
          {currentScene.characterName && (
            <Text style={styles.characterName}>
              {currentScene.characterName}
            </Text>
          )}
          <Text style={styles.dialogue}>{currentScene.dialogue}</Text>

          {currentScene.choices && currentScene.choices.length > 0 && (
            <View style={styles.choicesContainer}>
              {currentScene.choices.map((choice, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.choiceButton}
                  onPress={() => handleChoice(choice.nextScene)}
                >
                  <Text style={styles.choiceText}>{choice.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  sceneContainer: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  character: {
    position: 'absolute',
    bottom: 200,
    alignSelf: 'center',
    width: 300,
    height: 400,
    resizeMode: 'contain',
  },
  dialogueBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    minHeight: 150,
  },
  characterName: {
    color: '#ffcc00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dialogue: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  choicesContainer: {
    marginTop: 20,
    gap: 10,
  },
  choiceButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 8,
  },
  choiceText: {
    color: 'white',
    textAlign: 'center',
  },
}); 