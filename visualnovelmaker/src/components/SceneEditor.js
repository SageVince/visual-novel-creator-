import React from 'react';
import styled from '@emotion/styled';

const EditorContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

function SceneEditor({ scene, onSceneUpdate }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onSceneUpdate({
      ...scene,
      [name]: value
    });
  };

  return (
    <EditorContainer>
      <h2>Scene Editor</h2>
      <Form>
        <div>
          <label>Background Image URL:</label>
          <Input
            type="text"
            name="background"
            value={scene.background}
            onChange={handleChange}
            placeholder="Enter background image URL"
          />
        </div>

        <div>
          <label>Character Image URL:</label>
          <Input
            type="text"
            name="character"
            value={scene.character}
            onChange={handleChange}
            placeholder="Enter character image URL"
          />
        </div>

        <div>
          <label>Character Name:</label>
          <Input
            type="text"
            name="characterName"
            value={scene.characterName}
            onChange={handleChange}
            placeholder="Enter character name"
          />
        </div>

        <div>
          <label>Dialogue:</label>
          <TextArea
            name="dialogue"
            value={scene.dialogue}
            onChange={handleChange}
            placeholder="Enter dialogue"
          />
        </div>
      </Form>
    </EditorContainer>
  );
}

export default SceneEditor; 