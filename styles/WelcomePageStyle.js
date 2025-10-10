import {StyleSheet, Dimensions} from 'react-native'
const { width } = Dimensions.get("window");


export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
    },
    topPart:{
        flex:1,
        backgroundColor:"#fff",
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20,
        alignItems:'center',
    },
    topText:{
        fontSize: 35,
        color:"#000",
        textAlign:'center',
        fontWeight:'bold',
        fontFamily: 'Jaldi Bold', //aint working for some reason, fuck this shit
    },
    bottomPart:{
        flex:1,
        backgroundColor: "#00205B",
        position:'relative',
        marginBottom:-40,
    },
    curve:{
        position:'absolute',
        top: -20,
        left:0,
        right:0,
        height:200,
    },
    svg:{
        position:'absolute',
        top:0,
        left:0.5,
    },
    buttonsContainer:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:120,
        paddingBottom:40,
        paddingHorizontal:20,
    },
    registerButton:{
        backgroundColor:"#fff",
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset:{
            width:5,
            height:5
        },
        shadowOpacity:0.2,
        shadowRadius:10,
        elevation:10,
    },
    registerText:{
        color:"#00205B",
        fontSize:20,
        fontWeight:'600',
    },
    loginButton:{
        paddingVertical:10,
    },
    loginText:{
        color:"#fff",
        fontSize: 15,
        textDecorationLine:"underline",
        bottom:50,
    }
})