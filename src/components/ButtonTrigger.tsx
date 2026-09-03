import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
} from 'react-native';

interface VibrationButtonProps {
  title: string;
  duration?: number;
}

const ButtonTrigger = ({ title, duration = 1000 }: VibrationButtonProps) => {
  const handleVibrate = () => {
    console.log('Tombol getar ditekan!');
    try {
      if (Platform.OS === 'android') {
        // Durasi langsung dalam milidetik (ms)
        Vibration.vibrate(duration);
      } else {
        // iOS butuh pattern [delay, duration]
        Vibration.vibrate([0, duration]);
      }
    } catch (error) {
      console.error('Gagal memicu getaran:', error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.button}
      onPress={handleVibrate}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ButtonTrigger;
