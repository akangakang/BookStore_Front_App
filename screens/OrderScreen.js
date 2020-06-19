import React from 'react';
import {
    View,
    Text,
    AsyncStorage,
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,

    TouchableHighlight, Button,
} from 'react-native';
import {MySearchBar} from '../components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {apiUrl} from '../urlconfig';
import {Card, Stepper, Checkbox, Tag, Provider, WingBlank, Modal} from '@ant-design/react-native';
import CheckBox1 from 'react-native-check-box';

import {placeOrder} from '../service/cartService';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height: 30, marginBottom: 16,
    },
    name: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    author: {
        fontSize: 10,
        textAlign: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingRight: 10,
    },
    image: {
        width: 53,
        height: 70,
    },
    list: {
        paddingLeft: 10,
        paddingRight: 5,
        backgroundColor: '#ededed',
    },
});
const shadowOpt = {
    width: 100,
    height: 100,
    color: '#000',
    border: 10,
    radius: 50,
    opacity: 0.2,
    x: 0,
    y: 8,
    style: {marginVertical: 5},
};
let GET_ORDERS_URL = '';

export class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            isLoading: true,
            select: [],
            price: 0,

        };
        this._navListener=null;
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('focus', () => {
            console.log('order');

            const _retrieveData = async () => {
                try {
                    const value = await AsyncStorage.getItem('@Bookstore:userId');
                    GET_ORDERS_URL = apiUrl + '/getMyOrderAllInfo?userId=' + value;
                    // console.log(GET_CART_ITEMS_URL);
                    // if (value !== null) {
                    // We have data!!
                    this.fetchData();
                    // }
                } catch (error) {
                    // Error retrieving data
                    console.log('error');
                }
            };
            _retrieveData( );
        });

    }

    componentWillUnmount() {
        this._navListener.remove();
    }
    fetchData() {
        console.log(GET_ORDERS_URL);
        fetch(GET_ORDERS_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    isLoading: false,
                    orders: responseData,
                });
            })

    }


    renderOrderItems = ({item}) => {
        return (
            <View style={{flexDirection: 'row', height: 110, backgroundColor: '#FFFFFF'}}>
                <Image
                    source={{uri: item.cover}}
                    style={{width: 80, height: 100, margin: 10, marginLeft: 20, marginBottom: 10}}
                />
                <View>
                    <Text style={{marginLeft: 22, fontSize: 14, margin: 3}}>书名: {item.book}</Text>
                    <Text style={{marginLeft: 22, fontSize: 14, margin: 3}}>作者: {item.author}</Text>

                    {/*<Text style={{marginLeft: 22, fontSize: 14, margin: 3}}>ISBN: {item.isbn}</Text>*/}
                    <Text
                        style={{marginLeft: 22, fontSize: 14, margin: 3}}>价格: {item.price} ￥</Text>
                    <Text
                        style={{marginLeft: 22, fontSize: 14, margin: 3}}>数量: {item.number} </Text>
                </View>

            </View>
        );
    };
    renderOrders = ({item}) => {
        return (

            <TouchableHighlight onPress={() => {
                this.navigateToDetail({item});
            }} underlayColor='#ededed'>

                <View style={{paddingTop: 5, paddingBottom: 15, width: 400}}>
                    <WingBlank size="md">

                        <Card>
                            <Card.Header


                                extra={new Date(item.date).toLocaleDateString().replace(/\//g, '-') + ' ' + new Date(item.date).toTimeString().substr(0, 8)}

                            />


                            <Card.Body>
                                <FlatList
                                    data={item.myOrder}
                                    renderItem={this.renderOrderItems}
                                    // style={styles.list}
                                    keyExtractor={t => t.myId}
                                    horizontal={false}

                                />


                            </Card.Body>

                        </Card>


                    </WingBlank>
                </View>

            </TouchableHighlight>

        );
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <SafeAreaView style={{flex: 2}}>
                <Text>{"\n "}</Text>
                {/*<Tag style={{paddingTop:20,paddingLeft: 20,paddingBottom:5}}>总价：{this.state.price}元</Tag>*/}

                {/*<BasicModalExample price={this.state.price} placeOrder={this.handlePlaceOrder}/>*/}

                <FlatList
                    data={this.state.orders}
                    renderItem={this.renderOrders}
                    style={styles.list}
                    keyExtractor={item => item.orderId}
                    horizontal={false}

                />
            </SafeAreaView>
        );
    }
}
