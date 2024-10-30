import React from 'react';
import styled from '@emotion/styled';

const PreviewContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  position: relative;
  height: 100%;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${props => `url(${props.src})`};
  background-size: cover;
  background-position: center;
`;

const Character = styled.img`
  position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
  max-height: 60%;
`;

const DialogueBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  min-height: 150px;
`;

const CharacterName = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffcc00;
`;

function ScenePreview({ scene }) {
  return (
    <PreviewContainer>
      {scene.background && <Background src={scene.background} />}
      {scene.character && <Character src={scene.character} alt="Character" />}
      <DialogueBox>
        {scene.characterName && <CharacterName>{scene.characterName}</CharacterName>}
        <div>{scene.dialogue}</div>
      </DialogueBox>
    </PreviewContainer>
  );
}

export default ScenePreview; 