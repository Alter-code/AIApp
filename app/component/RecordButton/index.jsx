import { View, TouchableWithoutFeedback, StatusBar } from 'react-native';
import style from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function RecordButton(props) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={style.container}>

                { 
                    props.playing 
                    ? 
                        < FontAwesome5 name="pause" style={style.icon} /> 
                    : 
                        < FontAwesome5 name="play" style={[style.icon, {left: 10}]} />
                }
            
            </View>
        </TouchableWithoutFeedback >
    );
}