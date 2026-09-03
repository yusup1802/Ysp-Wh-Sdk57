import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

export const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const hasAlreadyPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );

          if (hasAlreadyPermission) {
            setHasPermission(true);
            return;
          }

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
        setHasPermission(true);
      }
    };

    requestCameraPermission();
  }, []);

  return hasPermission;
};
