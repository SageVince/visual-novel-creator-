import React, { useState } from 'react';
import styled from '@emotion/styled';
import SceneEditor from './components/SceneEditor';
import ScenePreview from './components/ScenePreview';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  gap: 20px;
  padding: 20px;
  background-color: #f0f0f0;
`;

function App() {
  const [currentScene, setCurrentScene] = useState({
    background: '',
    character: '',
    dialogue: '',
    characterName: '',
    choices: []
  });

  const handleSceneUpdate = (updatedScene) => {
    setCurrentScene(updatedScene);
  };

  return (
    <AppContainer>
      <SceneEditor 
        scene={currentScene} 
        onSceneUpdate={handleSceneUpdate} 
      />
      <ScenePreview scene={currentScene} />
    </AppContainer>
  );
}

export default App; 