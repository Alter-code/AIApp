import { StyleSheet, Dimensions } from "react-native";
import colors from '../../colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        position: 'absolute',
        width: windowWidth*0.75+10,
        height: windowHeight,
        left: 0,
        borderBottomRightRadius: 40,
        top:0,
    
    },
    icon : {
        top: windowHeight*0.5,
        position: 'absolute',
        color: colors.fontColor,
        fontSize: 30,
        left: windowWidth*0.75-20,
    },
    header: {
        marginBottom: 30,
        fontFamily: "OrbitronBold",
        color: colors.fontColor,
        fontSize: 16,
        left: 24,
        top: 16,
    },
    file: {
        fontFamily: "Orbitron",
        textDecorationLine: "underline",
        color: colors.fontColor,
        fontSize: 18,
        left: 24,
    }
});
