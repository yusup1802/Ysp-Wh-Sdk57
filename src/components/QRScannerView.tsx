// components/QRScannerView.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';

interface QRScannerViewProps {
  onScan: (code: string) => void;
  title?: string;
  subtitle?: string;
}

export const QRScannerView: React.FC<QRScannerViewProps> = ({
  onScan,
  title = 'Scan QR Code',
  subtitle = 'Arahkan kamera ke dalam kotak',
}) => {
  const [zoom, setZoom] = useState<number>(0);

  const toggleZoom = () => {
    setZoom((prev) => (prev === 1 ? 2 : 1));
  };
  return (
    <View style={styles.cameraWrapper}>
      <Camera
        style={StyleSheet.absoluteFill}
        scanBarcode={true}
        cameraType={CameraType.Back}
        onReadCode={(event) => onScan(event.nativeEvent.codeStringValue)}
        showFrame={false}

        focusMode="on"
        zoomMode="on"
        zoom={zoom}
      />

      {/* Full Screen Mask dengan Kotak Scan */}
      <View style={styles.maskOverlay}>
        <View style={styles.maskTop} />
        <View style={styles.maskMiddle}>
          <View style={styles.maskSide} />
          <View style={styles.maskFocus}>
            <View style={styles.laserline} />
          </View>
          <View style={styles.maskSide} />
        </View>
        <View style={styles.maskBottom}>
          <TouchableOpacity style={styles.zoomButton} onPress={toggleZoom}>
            <Text style={styles.zoomText}>{zoom === 0 ? '1x' : '2x'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Header Info Overlay */}
      <View style={styles.headerOverlay}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraWrapper: {
    flex: 1,
    position: 'relative',
  },
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
    top: 20,
    // top: 60,
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
  zoomButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  zoomText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
