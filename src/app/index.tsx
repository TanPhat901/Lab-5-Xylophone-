import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Audio } from 'expo-av';

const noteColors = ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#009688', '#2196f3', '#9c27b0'];

export default function XylophoneApp() {
  const [sounds, setSounds] = useState<Audio.Sound[]>([]);

  useEffect(() => {
    return () => {
      // Unload sounds when component unmounts
      sounds.forEach(sound => sound.unloadAsync());
    };
  }, [sounds]);

  const playSound = async (noteNumber: number) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: `https://raw.githubusercontent.com/londonappbrewery/xylophone-flutter/master/assets/note${noteNumber}.wav` }
      );
      setSounds(prev => [...prev, sound]);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound', error);
    }
  };

  const renderKey = (color: string, noteNumber: number) => (
    <TouchableOpacity
      key={noteNumber}
      style={[styles.key, { backgroundColor: color }]}
      activeOpacity={0.7}
      onPress={() => playSound(noteNumber)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.keysContainer}>
        {noteColors.map((color, index) => renderKey(color, index + 1))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  keysContainer: {
    flex: 1,
  },
  key: {
    flex: 1,
    width: '100%',
  }
});
