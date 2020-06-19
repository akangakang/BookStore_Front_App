import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground,Button} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {addToCart} from '../service/cartService';
import {SyncStorage} from 'react-native';
export class BookScreen extends React.Component {

    handleAddToCart=()=>{
        // console.log(this.props.route.params.detail.key);
        // alert(this.props.route.params.detail.key);
        addToCart(this.props.route.params.detail.key);
    };
    render() {
        // console.log(this.props.route.params.detail);
        let detail = this.props.route.params.detail;
        return (
            // { flex: 1, alignItems: 'center', justifyContent: 'center' }
            <View>
                <ImageBackground source={{uri: detail.cover}}
                                 style={{width: 1000, height: 280}}>
                    <View style={styles.container}>
                        <BlurView
                            style={styles.absolute}
                            blurType="light"
                            blurAmount={50}
                        />
                        <View style={styles.top}>

                            <Image
                                source={{uri: detail.cover}}
                                style={styles.image}
                            />
                            <View style={styles.topRight}>
                                <Text style={styles.name}>{detail.book}</Text>
                                <Text style={styles.name}>{detail.author}</Text>
                                <Text> {"\n"} </Text>
                                <View>
                                <Button
                                    title="加入购物车"
                                    color="#f1939c"
                                    onPress={this.handleAddToCart}
                                />
                            </View>
                            </View>

                        </View>

                        <View>


                        </View>
                        <View>


                        </View>

                    </View>
                </ImageBackground>



                <View style={styles.bottom}>


                        <Text style={styles.description}>类型：{detail.type}</Text>
                        <Text style={styles.description}>单价：¥{detail.price}</Text>
                        <Text style={styles.description}>库存：{detail.stock}</Text>
                        <Text style={styles.description}>ISBD：{detail.isbn}</Text>
                        <Text style={styles.description}>简介：{detail.description}</Text>
                        {/*<Text> {"\n"} </Text>*/}

                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    name: {
        fontSize: 22,
        fontWeight:('bold', '700'),

        margin:5,
        color:'white',
        textShadowOffset:{width:2,hegith:2},
        textShadowRadius:5,
        textShadowColor:'grey'
    },
    topRight: {
        justifyContent:"center",
        marginLeft: 15,

    },
    image: {
        width: 162,
        height: 235,
        marginTop:20,
        marginLeft:20
    },
    description: {
        fontSize:15,
        margin:1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    top:{
        flex: 3,
        flexDirection: 'row',
        height: 300,
    },
    bottom: {
        margin: 20,
        marginLeft:30,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
