import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { Button, PaperProvider, Portal, Snackbar } from 'react-native-paper';
import { AudioVibeButton } from '../../components/AudioVibeButton';
import ButtonTrigger from '../../components/ButtonTriger';

// Dapatkan dimensi layar untuk perhitungan overlay
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const audioSource = require('../assets/audio/duplicate1.mp3');

export default function ScanBarcode() {
  const navigation = useNavigation<any>();
  const [hasPermission, setHasPermission] = useState(false);
  const [visible, setVisible] = useState(false);

  // ... (Logika izin kamera tetap sama)
  const handleTriggerToast = () => setVisible(true);
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          // Periksa dulu apakah izin sudah diberikan sebelumnya
          const hasAlreadyPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );

          if (hasAlreadyPermission) {
            setHasPermission(true);
            return;
          }

          // Tampilkan dialog izin
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Izin Kamera Required',
              message:
                'Aplikasi membutuhkan izin kamera untuk me-scan QR Code.',
              buttonPositive: 'Izinkan',
              buttonNegative: 'Batal',
            }
          );

          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
          console.warn(err);
          setHasPermission(false);
        }
      } else {
        // iOS
        setHasPermission(true);
      }
    };

    requestCameraPermission();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Area Scanner / Kamera - Flex 1 penuh */}
        {hasPermission ? (
          <View style={styles.cameraWrapper}>
            <Camera
              style={StyleSheet.absoluteFill}
              scanBarcode={true}
              cameraType={CameraType.Back}
              onReadCode={(event) =>
                Alert.alert('QR Code Found', event.nativeEvent.codeStringValue)
              }
              showFrame={false} // Matikan frame bawaan, kita buat yang custom
            />

            {/* Tampilan Kustom: Full Screen Mask dengan Kotak Scan */}
            <View style={styles.maskOverlay}>
              <View style={styles.maskTop} />
              <View style={styles.maskMiddle}>
                <View style={styles.maskSide} />
                <View style={styles.maskFocus}>
                  {/* Ini adalah Kotak Fokus Transparan */}
                  {/* Anda bisa menambahkan animasi garis laser di sini jika mau */}
                  <View style={styles.laserline} />
                </View>
                <View style={styles.maskSide} />
              </View>
              <View style={styles.maskBottom} />
            </View>

            {/* Overlay Teks Informasi atas */}
            <View style={styles.headerOverlay}>
              <Text style={styles.headerTitle}>Scan QR Code</Text>
              <Text style={styles.headerSubtitle}>
                Arahkan kamera ke dalam kotak
              </Text>
            </View>
          </View>
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
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            // ...
          >
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
  cameraWrapper: {
    flex: 1,
    position: 'relative',
  },
  // --- Properti yang sebelumnya hilang ---
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
  // --- Mask & Layout Overlay ---
  maskOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  maskTop: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  maskMiddle: {
    flexDirection: 'row',
    height: 250,
    width: '100%',
  },
  maskSide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  maskFocus: {
    width: 250,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  laserline: {
    height: 2,
    width: '80%',
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  maskBottom: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  headerOverlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 4,
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
  },
});
