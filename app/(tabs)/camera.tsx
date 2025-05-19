import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { CameraType, CameraView, Camera as ExpoCamera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Camera, RotateCcw, Video, MapPin, Save } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

export default function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean | null>(
    null
  );
  const [facing, setFacing] = useState<CameraType>("back");
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState(false);
  const cameraRef = useRef<ExpoCamera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");

      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaStatus.status === "granted");
    })();
  }, []);

  const flipCamera = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const getLocationInfo = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return null;
    const location = await Location.getCurrentPositionAsync({});
    console.log(location.coords);
    return location.coords;
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync();
    const location = await getLocationInfo();

    console.log("Photo URI:", photo.uri);
    console.log("Location:", location);

    if (hasMediaPermission) {
      await MediaLibrary.createAssetAsync(photo.uri);
      Alert.alert("Saved", "Photo saved to gallery.");
    }
  };

  const recordVideo = async () => {
    console.log("Is Recording clicked");
    if (!cameraRef.current) return;

    if (isRecording) {
      cameraRef.current.stopRecording();
      console.log("Recording stopped");
      setIsRecording(false);
    } else {
      console.log("recording start");
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      const location = await getLocationInfo();

      console.log("Video URI:", video.uri);
      console.log("Location:", location);

      if (hasMediaPermission) {
        await MediaLibrary.createAssetAsync(video.uri);
        Alert.alert("Saved", "Video saved to gallery.");
      }

      setIsRecording(false);
    }
  };

  if (hasCameraPermission === null) return <View />;
  if (hasCameraPermission === false)
    return <Text>No access to camera. Please allow permissions.</Text>;

  return (
    <>
    <StatusBar style="light" />
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, marginTop: 40, paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ color: "#fff", fontSize: 16 }}>Auto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ color: "#fff", fontSize: 16 }}>On</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ color: "#fff", fontSize: 16 }}>Off</Text>
            </TouchableOpacity>
        </View>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        <View style={styles.controlsContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 5,
                marginHorizontal: 10,
              }}
              onPress={() => setVideo(false)}
            >
              <Text style={{ color: "white" }}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 5,
                marginHorizontal: 10,
              }}
              onPress={() => setVideo(true)}
            >
              <Text style={{ color: "white" }}>Video</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity onPress={flipCamera}>
              <RotateCcw size={28} color="#fff" />
            </TouchableOpacity>

            {video === true ? (
              <TouchableOpacity onPress={recordVideo}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: isRecording ? "black" : "red",
                    borderWidth: isRecording ? 2 : 2,
                    borderRadius: isRecording ? 5 : 10,
                    borderColor: "white",
                    transform: "scale(2.5)",
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={takePicture}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "grey",
                    borderWidth: 2,
                    borderRadius: 7,
                    borderColor: "white",
                    transform: "scale(2.5)",
                  }}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={getLocationInfo}>
              <MapPin size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  controlsContainer: {
    flexDirection: "column",
    width: "100%",
  },
});
