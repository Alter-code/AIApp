import { useEffect, useCallback } from 'react';
import style from './style';
import {Text, View, TouchableWithoutFeedback, Animated } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';
const listOut = () => {
    Animated.timing(listAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

export default function FileList(props) {
    let [loaded] = useFonts({
      'Orbitron': require('../../assets/fonts/Orbitron-VariableFont_wght.ttf'),
      'OrbitronBold': require('../../assets/fonts/Orbitron-Bold.ttf'),
    });

    if (!loaded) {
      return null;
    }
    return (
        <Animated.View style={[style.container, {
            transform: [
              {
                translateX: props.listAnim
              }
            ]
          }]}>
            <TouchableWithoutFeedback onPress={props.hideList}>
                < FontAwesome5 name="arrow-left" style={style.icon} />
            </TouchableWithoutFeedback>

            <View style={{
                right: 30,
                alignItems: 'center',

            }} >
                <Text style={style.header}>Recently Created Files</Text>

                <Text style={style.file}>FileName    12.03.2022</Text>
                <Text style={style.file}>FileName    12.03.2022</Text>
                <Text style={style.file}>FileName    12.03.2022</Text>
                <Text style={style.file}>FileName    12.03.2022</Text>
                <Text style={style.file}>FileName    12.03.2022</Text>
            </View>
        </Animated.View>
    );
}
