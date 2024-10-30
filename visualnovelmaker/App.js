import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, Platform } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SceneEditorScreen from './screens/SceneEditorScreen';
import ScenePreviewScreen from './screens/ScenePreviewScreen';
import SceneListScreen from './screens/SceneListScreen';
import AssetManagerScreen from './screens/AssetManagerScreen';
import HelpScreen from './screens/HelpScreen';
import { NovelProvider } from './context/NovelContext';

const Stack = createNativeStackNavigator();

// Web-specific styles
const webStyles = Platform.select({
  web: {
    container: {
      maxWidth: 1200,
      marginHorizontal: 'auto',
      height: '100%',
    },
    navigationContainer: {
      height: '100vh',
    },
  },
  default: {},
});

export default function App() {
  return (
    <NovelProvider>
      <NavigationContainer style={webStyles.navigationContainer}>
        <Stack.Navigator 
          screenOptions={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#4a90e2',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Help')}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Help</Text>
              </TouchableOpacity>
            ),
            ...(Platform.OS === 'web' && {
              animation: 'none', // Disable animations on web
              contentStyle: webStyles.container,
            }),
          })}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Visual Novel Creator' }}
          />
          <Stack.Screen 
            name="SceneList" 
            component={SceneListScreen}
            options={{ title: 'Scene Manager' }}
          />
          <Stack.Screen 
            name="SceneEditor" 
            component={SceneEditorScreen}
            options={{ title: 'Edit Scene' }}
          />
          <Stack.Screen 
            name="ScenePreview" 
            component={ScenePreviewScreen}
            options={{ title: 'Preview' }}
          />
          <Stack.Screen 
            name="AssetManager" 
            component={AssetManagerScreen}
            options={{ title: 'Asset Manager' }}
          />
          <Stack.Screen 
            name="Help" 
            component={HelpScreen}
            options={{ title: 'Help & Tutorials' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NovelProvider>
  );
} 