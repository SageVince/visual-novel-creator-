import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useNovel } from '../context/NovelContext';

export default function AssetManagerScreen() {
  const { novel, addAsset } = useNovel();

  const pickImage = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      addAsset(type, {
        uri: result.assets[0].uri,
        name: `${type}_${Date.now()}`,
      });
    }
  };

  const pickAudio = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      if (result.type === 'success') {
        addAsset(type, {
          uri: result.uri,
          name: result.name,
        });
      }
    } catch (err) {
      console.error('Error picking audio:', err);
    }
  };

  const renderAssetSection = (title, type, assets, isAudio = false) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => isAudio ? pickAudio(type) : pickImage(type)}
      >
        <Text style={styles.addButtonText}>Add {title}</Text>
      </TouchableOpacity>

      <ScrollView horizontal style={styles.assetList}>
        {assets.map((asset, index) => (
          <View key={index} style={styles.assetItem}>
            {!isAudio && (
              <Image source={{ uri: asset.uri }} style={styles.assetPreview} />
            )}
            <Text style={styles.assetName}>{asset.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderAssetSection('Backgrounds', 'backgrounds', novel.assets.backgrounds)}
      {renderAssetSection('Characters', 'characters', novel.assets.characters)}
      {renderAssetSection('Music', 'music', novel.assets.music, true)}
      {renderAssetSection('Sound Effects', 'sounds', novel.assets.sounds, true)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  assetList: {
    flexDirection: 'row',
  },
  assetItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  assetPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  assetName: {
    fontSize: 12,
    textAlign: 'center',
    width: 100,
  },
}); 