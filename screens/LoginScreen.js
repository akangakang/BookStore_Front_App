import React,{useState} from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    Button,
    Alert
} from 'react-native';
import {AuthContext} from "../context";
import {apiUrl} from "../urlconfig";
// 获取屏幕的宽和高
let {width,height} = Dimensions.get('window');
const LOGIN_URL=apiUrl+"/login";
var isSuccess ;
function fetchData({name,password,signIn}) {
    fetch(LOGIN_URL,{
        method:'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            "username":name,
            "password":password,
        }),
    })
        .then((response) => {
            // let cookie=response._bodyBlob._data.blobId;
            // console.log("cookie in login screen:"+JSON.stringify(response));

            return response.json();
        })
        .then((responseData) => {
            let _storeData = async () => {
                try {
                    await AsyncStorage.setItem("@Bookstore:token",JSON.stringify(responseData.data));
                    await AsyncStorage.setItem("@Bookstore:userId",JSON.stringify(responseData.data.userId));
                    await AsyncStorage.setItem("@Bookstore:change",0);
                    console.log(JSON.stringify(responseData.data.userId));
                    console.log(AsyncStorage.getItem("@Bookstore:token"))
                    //Alert.alert(JSON.stringify(responseData));
                } catch (error) {
                    // Error saving data
                }
            };
            _storeData();
            // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
            console.log(responseData);
            isSuccess=(responseData.status==0?true:false);
            if(isSuccess){
                signIn()
            }else{
                Alert.alert("用户名或秘密错误！");
            }
        })
        .catch((error)=>{
            console.error(error);
        });
}
export function LoginScreen(){
    const [name, setName] = useState('');
    const [password,setPassword]=useState('');
    const { signIn } = React.useContext(AuthContext);
    return (
            <View style={{ flex: 1}}>
                <View style={styles.container}>

                    <Text style={styles.titleStyle}>LOGIN</Text>
                    {/*账号和密码*/}
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={text => setName(text)}
                        value={name}
                        placeholder={'请输入用户名'} />

                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='请输入密码'
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry={true}/>

                    {/*登录*/}


                    <Button style={styles.loginBtnStyle} title="    登录    "  color="#f0a1a8"
                            onPress={() => {
                        fetchData({name,password,signIn});
                    }}
                    >
                        {/*<Text style={{color:'white'}}> 登录 </Text>*/}
                    </Button>

                    {/*设置*/}


                </View>
            </View>
        );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // 侧轴的对齐方式
        justifyContent: "center",
        alignItems:'center',
        backgroundColor: '#add8e6',

    },
    textInputStyle: {
        width:width*0.7,
        height:40,
        backgroundColor:'white',
        textAlign:'center',
        marginBottom:10
    },
    loginBtnStyle: {
        width: width,
        height: 40,
        backgroundColor:'blue',
        marginTop:50,
        marginBottom: 20,
        borderRadius:10,

    },
    settingStyle: {
        width: width*0.85,
        height: 40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    titleStyle: {
        fontSize:50,
        alignItems:'center',
        paddingBottom:10,
        color: '#f0a1a8',
        fontWeight:'bold',
        marginBottom:20
    },
});
