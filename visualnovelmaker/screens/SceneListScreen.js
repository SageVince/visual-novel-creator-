import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useNovel } from '../context/NovelContext';

export default function SceneListScreen({ navigation }) {
  const { novel, setNovel } = useNovel();

  const handleDragEnd = ({ data }) => {
    setNovel(prev => ({
      ...prev,
      scenes: data
    }));
  };

  const renderItem = ({ item, index, drag, isActive }) => (
    <TouchableOpacity
      style={[
        styles.sceneItem,
        isActive && styles.sceneItemActive
      ]}
      onLongPress={drag}
      onPress={() => navigation.navigate('SceneEditor', { sceneIndex: index })}
    >
      <View style={styles.scenePreview}>
        {item.background && (
          <Image
            source={{ uri: item.background }}
            style={styles.previewImage}
          />
        )}
      </View>
      <View style={styles.sceneInfo}>
        <Text style={styles.sceneName}>Scene {index + 1}</Text>
        <Text style={styles.sceneDialogue} numberOfLines={2}>
          {item.dialogue}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.previewButton}
        onPress={() => navigation.navigate('ScenePreview', { sceneIndex: index })}
      >
        <Text style={styles.previewButtonText}>Preview</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('SceneEditor')}
      >
        <Text style={styles.addButtonText}>Add New Scene</Text>
      </TouchableOpacity>

      <DraggableFlatList
        data={novel.scenes}
        renderItem={renderItem}
        keyExtractor={(item, index) => `scene-${index}`}
        onDragEnd={handleDragEnd}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  sceneItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
  },
  sceneItemActive: {
    backgroundColor: '#f0f0f0',
    transform: [{ scale: 1.05 }],
  },
  scenePreview: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sceneInfo: {
    flex: 1,
    marginLeft: 10,
  },
  sceneName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sceneDialogue: {
    fontSize: 14,
    color: '#666',
  },
  previewButton: {
    backgroundColor: '#4a90e2',
    padding: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
  previewButtonText: {
    color: 'white',
    fontSize: 12,
  },
}); 