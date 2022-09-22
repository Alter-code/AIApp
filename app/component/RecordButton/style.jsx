import { StyleSheet } from "react-native";
import colors from '../../colors';

export default StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        backgroundColor: colors.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: { color: colors.primary, fontSize: 80 }
});