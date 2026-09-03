import { AudioSource, useAudioPlayer } from 'expo-audio';
import { Button, StyleSheet, Vibration, View, ViewStyle } from 'react-native';

interface AudioVibeButtonProps {
  title: string;
  audioSource: AudioSource;
  vibrateDuration?: number; // Opsional, default 1000ms
  color?: string;
  style?: ViewStyle;
}

export function AudioVibeButton({
  title,
  audioSource,
  vibrateDuration = 1000,
  color,
  style,
}: AudioVibeButtonProps) {
  const player = useAudioPlayer(audioSource);

  const handlePress = () => {
    // 1. Putar audio dari awal
    player.seekTo(0);
    player.play();

    // 2. Jalankan getaran
    if (vibrateDuration > 0) {
      Vibration.vibrate(vibrateDuration);
    }
  };

  return (
    <View style={[styles.buttonWrapper, style]}>
      <Button title={title} color={color} onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginVertical: 6,
  },
});

// usage

// import { AudioVibeButton } from './components/AudioVibeButton';

// const soundOne = require('./assets/audio/duplicate1.mp3');
{
  /* <AudioVibeButton 
    title="Play & Vibrate 1s" 
    audioSource={soundOne} 
/>

      <AudioVibeButton 
        title="Play & Vibrate 2s (Custom)" 
        audioSource={soundOne} 
        vibrateDuration={2000} 
        color="#10B981"
      /> */
}
