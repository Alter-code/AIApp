import { StyleSheet } from "react-native";
import colors from '../../colors';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: colors.secondary,
        width: 70,
        height: 70,
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 30
    },
    icon: { 
        color: colors.primary, fontSize: 45 
    }
});