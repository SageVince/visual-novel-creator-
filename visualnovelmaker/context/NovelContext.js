import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NovelContext = createContext();

// Sample data for testing
const sampleData = {
  title: 'Demo Visual Novel',
  scenes: [
    {
      background: 'https://picsum.photos/seed/scene1/800/600',
      characters: [
        {
          name: 'Alice',
          image: 'https://picsum.photos/seed/alice/400/800',
          position: 'center',
          scale: 1,
          opacity: 1
        }
      ],
      dialogue: "Hi! I'm Alice. Welcome to our demo visual novel!",
      characterName: 'Alice',
      choices: [
        { text: 'Nice to meet you!', nextScene: 1 },
        { text: 'Tell me more about this app', nextScene: 2 }
      ]
    },
    {
      background: 'https://picsum.photos/seed/scene2/800/600',
      characters: [
        {
          name: 'Alice',
          image: 'https://picsum.photos/seed/alice/400/800',
          position: 'left',
          scale: 1,
          opacity: 1
        },
        {
          name: 'Bob',
          image: 'https://picsum.photos/seed/bob/400/800',
          position: 'right',
          scale: 1,
          opacity: 1
        }
      ],
      dialogue: "Let me introduce you to Bob, he'll help us test multiple characters!",
      characterName: 'Alice',
      choices: []
    },
    {
      background: 'https://picsum.photos/seed/scene3/800/600',
      characters: [
        {
          name: 'Bob',
          image: 'https://picsum.photos/seed/bob/400/800',
          position: 'center',
          scale: 1.2,
          opacity: 0.9
        }
      ],
      dialogue: "This is a demo of character scaling and opacity effects!",
      characterName: 'Bob',
      choices: []
    }
  ],
  assets: {
    backgrounds: [
      { uri: 'https://picsum.photos/seed/bg1/800/600', name: 'City Street' },
      { uri: 'https://picsum.photos/seed/bg2/800/600', name: 'School' },
      { uri: 'https://picsum.photos/seed/bg3/800/600', name: 'Park' }
    ],
    characters: [
      { uri: 'https://picsum.photos/seed/char1/400/800', name: 'Alice' },
      { uri: 'https://picsum.photos/seed/char2/400/800', name: 'Bob' }
    ],
    music: [],
    sounds: []
  }
};

export function NovelProvider({ children }) {
  const [novel, setNovel] = useState(sampleData);

  const saveNovel = async () => {
    try {
      await AsyncStorage.setItem('novel', JSON.stringify(novel));
    } catch (error) {
      console.error('Error saving novel:', error);
    }
  };

  const loadNovel = async () => {
    try {
      const savedNovel = await AsyncStorage.getItem('novel');
      if (savedNovel) {
        setNovel(JSON.parse(savedNovel));
      }
    } catch (error) {
      console.error('Error loading novel:', error);
    }
  };

  const addScene = (scene) => {
    setNovel(prev => ({
      ...prev,
      scenes: [...prev.scenes, scene]
    }));
    saveNovel();
  };

  const updateScene = (index, scene) => {
    setNovel(prev => ({
      ...prev,
      scenes: prev.scenes.map((s, i) => i === index ? scene : s)
    }));
    saveNovel();
  };

  const addAsset = (type, asset) => {
    setNovel(prev => ({
      ...prev,
      assets: {
        ...prev.assets,
        [type]: [...prev.assets[type], asset]
      }
    }));
    saveNovel();
  };

  const addExpression = (characterName, expression) => {
    setNovel(prev => ({
      ...prev,
      assets: {
        ...prev.assets,
        expressions: {
          ...prev.assets.expressions,
          [characterName]: [
            ...(prev.assets.expressions[characterName] || []),
            expression
          ]
        }
      }
    }));
    saveNovel();
  };

  // Helper function to reset to sample data
  const resetToSample = () => {
    setNovel(sampleData);
    saveNovel();
  };

  return (
    <NovelContext.Provider value={{
      novel,
      setNovel,
      addScene,
      updateScene,
      addAsset,
      addExpression,
      loadNovel,
      resetToSample
    }}>
      {children}
    </NovelContext.Provider>
  );
}

export const useNovel = () => useContext(NovelContext);