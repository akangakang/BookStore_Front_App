import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {apiUrl} from '../urlconfig';
import {Card, Modal, Provider, WingBlank} from '@ant-design/react-native';
import CheckBox1 from 'react-native-check-box';

import {placeOrder} from '../service/cartService';

import {addToCartByButtom, removeByItemId} from '../service/cartService';

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
let GET_CART_ITEMS_URL = '';

export class CartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            isLoading: true,
            select: [],
            price: 0,

        };
        this.onClose = () => {

            this.setState({
                visible: false,
            });
        };

        this.state = {
            visible: false,

        };
        this._navListener = null;
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('focus', () => {
            console.log('cart');

            const _retrieveData = async () => {
                try {
                    const value = await AsyncStorage.getItem('@Bookstore:userId');
                    GET_CART_ITEMS_URL = apiUrl + '/getCartItems?userId=' + value;
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
            _retrieveData();
        });

    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    handlePlaceOrder = () => {
        console.log('placeOrder');
        let s = [];
        this.state.books.forEach((t) => {
            if (t.selected) {
                s.push(t.key);
            }
        });
        if (s.length == 0) {
            alert('未选中商品');
            return;
        }
        placeOrder(s);
        this.props.navigation.navigate('Order');
    };

    getPrice = () => {
        let p = 0;
        this.state.books.forEach((item) => {
            if (item.selected) {
                p += item.number * item.price;
            }
        });
        this.setState({
            price: p,
        });
    };

    fetchData() {
        console.log(GET_CART_ITEMS_URL);
        fetch(GET_CART_ITEMS_URL, {
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
                    books: responseData,

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    navigateToDetail({item}) {
        this.props.navigation.push('Detail', {detail: item});
    }

    renderBook = ({item}) => {
        console.log(item.number);
        const callBack = () => {
            this.fetchData();
        };

        return (


            <TouchableHighlight onPress={() => {
                this.navigateToDetail({item});
            }} underlayColor='#ededed'>

                <View style={{paddingTop: 5, paddingBottom: 15, width: 400}}>
                    <WingBlank size="md">

                        <Card>
                            <Card.Header
                                // thumbStyle={{ width:150, height:200}}
                                // thumb={item.cover}
                                extra={item.book}
                                title={
                                    <CheckBox1
                                        style={{flex: 1, padding: 3}}
                                        onClick={() => {
                                            let newItem = item;
                                            newItem.selected = !newItem.selected;
                                            let newData = this.state.books;
                                            newData.forEach((t) => {
                                                if (t.key == newData.key) {
                                                    t = newData;
                                                }
                                            });


                                            this.setState({
                                                books: newData,
                                            });
                                            this.getPrice();
                                        }}
                                        isChecked={item.selected}

                                    />


                                }

                            />
                            <Card.Body>
                                <View style={{flex: 1, flexDirection: 'row', height: 135, marginBottom: 11}}>
                                    <Image
                                        source={{uri: item.cover}}
                                        style={{width: 100, height: 135, margin: 10, marginLeft: 10, marginBottom: 8}}
                                    />
                                    <View>
                                        {/*<Text style={{ marginLeft: 14 }}>书名: {item.book}</Text>*/}
                                        <Text style={{marginLeft: 22, fontSize: 16, margin: 3}}>作者: {item.author}</Text>

                                        <Text style={{marginLeft: 22, fontSize: 16, margin: 3}}>ISBN: {item.isbn}</Text>
                                        <Text
                                            style={{
                                                marginLeft: 22,
                                                fontSize: 16,
                                                margin: 3,
                                            }}>价格: {parseFloat(item.price).toFixed(2)} ￥</Text>


                                        <View style={{
                                            flex: 2,
                                            flexDirection: 'row',
                                            marginLeft: 22,
                                            margin: 3,
                                            marginBottom: 6,
                                            width: 100,
                                            height: 10,
                                        }}>
                                            <Button title={'—'} color="#f1939b"
                                                    onPress={() => this.setState(removeByItemId(item.key, callBack))}/>
                                            <Text
                                                style={{
                                                    marginLeft: 4,
                                                    fontSize: 16,
                                                    margin: 4,
                                                    marginTop: 6,
                                                }}>数量: {item.number} </Text>
                                            <Button title={'+'} color="#f1939b"
                                                    onPress={() => this.setState(addToCartByButtom(item.key, callBack))}/>
                                        </View>

                                    </View>


                                </View>


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
        const footerButtons = [
            {text: '取消', onPress: () => console.log('cancel')},
            {text: '支付', onPress: this.handlePlaceOrder},
        ];
        return (
            <SafeAreaView style={{flex: 0}}>
                <View style={{paddingLeft: 20, paddingTop: 20, paddingRight: 20,paddingBottom: 15}}>

                <Button title={'结算'} color="#f1939b" style={{width: 90, height: 30}}
                        onPress={() => {if(this.state.price>0)this.setState({visible: true})}}>
                    结算
                </Button>
                </View>
                <Provider>
                    <View style={{paddingLeft: 20, paddingTop: 20, paddingRight: 20}}>




                        <Modal
                            title="支付"
                            transparent
                            onClose={this.onClose}
                            maskClosable
                            visible={this.state.visible}
                            closable
                            footer={footerButtons}
                        >
                            <View style={{paddingVertical: 20}}>
                                <Text
                                    style={{textAlign: 'center'}}>确认支付：{parseFloat(this.state.price).toFixed(2)}元</Text>


                            </View>

                        </Modal>

                    </View>
                </Provider>


                <FlatList
                    data={this.state.books}
                    renderItem={this.renderBook}
                    style={styles.list}
                    keyExtractor={item => item.bookId}
                    horizontal={false}

                />
            </SafeAreaView>

        );
    }
}
