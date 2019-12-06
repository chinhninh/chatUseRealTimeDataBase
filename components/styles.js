import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    txtInput: {
        height:40,
        width:300,
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        margin:10,
        paddingLeft:15
    },
    textButton:{
        fontSize:20
    },
    styleImage:{
        height:32,
        width:32
    },
    txtHeader:{
        fontSize:20
    },
    styleHeader:{
        height:50,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderBottomColor:'black',
        borderBottomWidth: 1
    },
    styleButton:{
        // width: 100, 
        height: 40,
        borderRadius: 10,
        marginTop:20,                            
        borderColor: 'black', 
        borderWidth: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: 5,
        padding:10
    }
})

export default styles;