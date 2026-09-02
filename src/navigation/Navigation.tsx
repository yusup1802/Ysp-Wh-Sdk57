import { createNativeStackNavigator } from '@react-navigation/native-stack';
import K3s from '../pages/K3s';
import ScanBarcode from '../pages/ScanBarcode';

// Definisikan tipe rute untuk keandalan TypeScript
export type RootStackParamList = {
  Barcode: undefined;
  K3s: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Barcode">
      <Stack.Screen
        name="Barcode"
        component={ScanBarcode}
        options={{ title: 'Scan Barcode' }}
      />
      <Stack.Screen name="K3s" component={K3s} options={{ title: 'K3s' }} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
