import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import style from "./style"

export default function FileIcon(props) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={style.container}>
                <FontAwesome5 name="file" style={style.icon} />
            </View>
        </TouchableWithoutFeedback>
    );
}
