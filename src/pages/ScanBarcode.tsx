import { AudioVibeButton } from '@/components/AudioVibeButton';
import ButtonTrigger from '@/components/ButtonTrigger';
import { QRScannerView } from '@/components/QRScannerView';
import { useCameraPermission } from '@/hooks/useCameraPermission';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button, PaperProvider, Portal, Snackbar } from 'react-native-paper';

const audioSource = require('../assets/audio/duplicate1.mp3');

export default function ScanBarcode() {
  const navigation = useNavigation<any>();
  const hasPermission = useCameraPermission();
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();

  // ... (Logika izin kamera tetap sama)
  const handleTriggerToast = () => setVisible(true);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        {isFocused && (
          <StatusBar
            barStyle="dark-content" // Ikon HP Android (Jam, Baterai, Sinyal) jadi HITAM
            backgroundColor="#FFFFFF" // Background status bar Android jadi PUTIH
            animated={true}
          />
        )}
        {/* Area Scanner / Kamera - Flex 1 penuh */}
        {hasPermission ? (
          <QRScannerView
            onScan={(code) => Alert.alert('QR Code Found', code)}
            title="Scan QR Code Barang Yusup"
          />
        ) : (
          <View style={styles.noPermissionContainer}>
            <Text style={styles.permissionText}>Menunggu Izin Kamera...</Text>
          </View>
        )}

        {/* Panel Kontrol Bawah - Memanfaatkan space tersisa */}

        <View style={styles.bottomSheet}>
          <Button
            mode="contained"
            icon="bell-ring"
            onPress={handleTriggerToast}
            style={styles.toastButton}
          >
            Munculkan Toast
          </Button>
          <Button onPress={() => navigation.navigate('K3s')}>
            Go to Details
          </Button>
          <View style={styles.actionGroup}>
            <AudioVibeButton
              title="Play & Vibrate 2s"
              audioSource={audioSource}
              vibrateDuration={2000}
              color="#10B981"
            />
            <ButtonTrigger title="Getar 1 Detik" />
            <ButtonTrigger title="Getar 2 Detik" duration={2000} />
          </View>
        </View>

        {/* Global Snackbar */}
        <Portal>
          <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
            QR Code berhasil disalin!
          </Snackbar>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  noPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  permissionText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  toastButton: {
    borderRadius: 8,
    marginBottom: 10,
  },
  actionGroup: {
    gap: 10,
  },
  bottomSheet: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    gap: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    zIndex: 20,
  },
});
