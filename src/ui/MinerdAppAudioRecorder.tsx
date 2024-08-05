import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Spacer from './spacer/Spacer';

type Props = {
  audio: string;
  setAudio: any;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const MinerdAppAudioRecorder = ({audio, setAudio}: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [recordTime, setRecordTime] = useState('00:00:00');
  const [playbackTime, setPlaybackTime] = useState('00:00:00');

  useEffect(() => {
    return () => {
      if (isPlaying) {
        onStopPlay();
      }
    };
  }, [isPlaying]);

  const generateUniquePath = () => {
    const timestamp = new Date().getTime();
    return `/data/user/0/com.minerd_visitas_escolares_app/cache/sound_${timestamp}.mp4`;
  };

  const onStartRecord = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) {
      Alert.alert('Permiso de audio denegado');
      return;
    }

    setIsRecording(true);
    const path = generateUniquePath();
    await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e: any) => {
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
  };

  const onStopRecording = async () => {
    setIsRecording(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordTime('00:00:00');
    setAudio(result);
  };

  const onStartPlay = async () => {
    setIsPlaying(true);
    await audioRecorderPlayer.startPlayer(audio);
    audioRecorderPlayer.addPlayBackListener(e => {
      setPlaybackTime(
        audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      );
      if (Math.floor(e.currentPosition) >= Math.floor(e.duration)) {
        setIsPlaying(false);
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
      }
      return;
    });
  };

  const onStopPlay = async () => {
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlaying(false);
  };

  const requestAudioPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    return result === RESULTS.GRANTED;
  };

  return (
    <>
      <Spacer marginVertical={10} width="100%">
        <Text style={styles.header}>Audio</Text>
        <View style={styles.audioContainer}>
          <TouchableOpacity
            onPress={onStartRecord}
            disabled={isRecording || isPlaying}
            style={
              isRecording || isPlaying
                ? styles.audioBtnDisable
                : styles.audioBtn
            }
            activeOpacity={0.7}>
            <Text style={styles.audioBtnText}>Grabar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onStopRecording}
            disabled={!isRecording && !isPlaying}
            style={!isRecording ? styles.audioBtnDisable : styles.stopAudioBtn}
            activeOpacity={0.7}>
            <Text style={styles.audioBtnText}>Detener</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isRecording || audio === ''}
            onPress={isPlaying ? onStopPlay : onStartPlay}
            style={[
              isRecording || audio === ''
                ? styles.audioBtnDisable
                : styles.audioBtn,
              isPlaying && styles.stopAudioBtn,
            ]}
            activeOpacity={0.7}>
            <Text style={styles.audioBtnText}>
              {isPlaying ? 'Detener reproducción' : 'Reproducir'}
            </Text>
          </TouchableOpacity>
        </View>
      </Spacer>
      {isPlaying && (
        <Text style={[styles.text, styles.audioTime]}>{playbackTime}</Text>
      )}
      {isRecording && (
        <Text style={[styles.text, styles.audioTime]}>{recordTime}</Text>
      )}
    </>
  );
};

export default MinerdAppAudioRecorder;

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  audioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 10,
    width: '90%',
  },
  audioBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  stopAudioBtn: {
    backgroundColor: '#DA0037',
    padding: 10,
    borderRadius: 5,
  },
  audioBtnDisable: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  audioBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  audioTime: {
    textAlign: 'center',
  },
});
