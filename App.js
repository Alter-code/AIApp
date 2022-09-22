import { Button, StyleSheet, Text, View, SafeAreaView, Platform, Animated, StatusBar } from 'react-native';
import Colors from './app/colors';
import RecordButton from './app/component/RecordButton';
import FileIcon from './app/component/FileIcon';
import FileList from './app/component/FileList';
import React, {useRef} from 'react';
import {Audio} from 'expo-av';
export default function App() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const listAnim = useRef(new Animated.Value(0)).current;

  const listIn = () => {
    Animated.timing(listAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const listOut = () => {

    Animated.timing(listAnim, {
      toValue: -500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(updatedRecordings);
  }
  function getRecordingLines(recordings) {
      return recordings.map((recordingLine, index) => {
          return (
          <View key={index} style={styles.row}>
              <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
              <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
              <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
          </View>
          );
      });
  }
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FileIcon onPress={listIn}/>

      <RecordButton playing={recording} onPress={recording ? stopRecording : startRecording}/>

      {getRecordingLines(recordings)}
      <StatusBar></StatusBar>
      <FileList listAnim={listAnim} hideList={listOut}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    margin: 16
  }
});