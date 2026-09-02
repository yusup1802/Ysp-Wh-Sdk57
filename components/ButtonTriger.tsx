import { Button, Vibration } from "react-native";

interface VibrationButtonProps {
  title: string;
  duration?: number;
}

const ButtonTrigger = ({ title, duration = 1000 }: VibrationButtonProps) => {
  return (
    <Button 
      title={title} 
      onPress={() => Vibration.vibrate(duration)} 
    />
  );
};

export default ButtonTrigger;


// Menggunakan durasi bawaan (1000ms)
{/* <ButtonTrigger title="Getar 1 Detik" /> */}

// Menggunakan durasi kustom (misal 2000ms)
{/* <ButtonTrigger title="Getar 2 Detik" duration={2000} /> */}