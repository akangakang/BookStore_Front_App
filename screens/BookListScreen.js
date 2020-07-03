import React from 'react';
import {View,Alert,Text,AsyncStorage,ActivityIndicator, FlatList, Image,StyleSheet,TouchableHighlight} from 'react-native';
import {MySearchBar} from '../components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {apiUrl} from '../urlconfig';
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native';
import MyCarousel from '../components/MyCarousel';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        height:30 ,marginBottom: 16
    },
    name: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    author: {
        fontSize:10,
        textAlign: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingRight:10,
    },
    image: {
        width: 53,
        height: 81
    },
    list: {
        paddingLeft:10,
        paddingRight:5,
        backgroundColor: '#ededed',
    },
});

const GETBOOKS_URL=apiUrl+"/getBooks";
export class BookListScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            books:[],
            showBooks:[],
            isLoading: true,
        }
    }

    componentDidMount(){
       // Alert.alert(AsyncStorage.getItem("@Bookstore:token"));
        const _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem("@Bookstore:userId");
                //Alert.alert(JSON.stringify(value));
                //console.log(JSON.stringify(value).getItem("data"));
                if (value !== null) {
                    // We have data!!
                    this.fetchData();
                }
            } catch (error) {
                // Error retrieving data
            }
        }
        _retrieveData();
    }
    fetchData() {
        fetch(GETBOOKS_URL, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    isLoading:false,
                    books: responseData,
                    showBooks:responseData
                });
            })
            .catch((error)=> {
                console.error(error);
            });
    }
    getText(data) {
        var arr=[];
        var list=this.state.books;
        for (var i = 0; i < list.length; i++) {
            if (list[i].book.indexOf(data) >= 0
               ) {
                arr.push(list[i])
            }
        }
        this.setState({
            showBooks:arr
        })
    }
    navigateToDetail({item}){
        this.props.navigation.push("Detail",{detail:item});
    }

    renderBook=({ item })=>{
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        return (

            <TouchableHighlight onPress={()=>{this.navigateToDetail({item});}}  underlayColor='#ededed'  >

                <View style={{ paddingTop: 20 ,width:200}}>
                    <WingBlank size="md">
                        <Card >
                            <Card.Header
                                thumbStyle={{ width:150, height:200}}
                                thumb={item.cover}
                            />
                            <Card.Body>
                                <View style={{ height:47 ,marginBottom: 20}}>
                                    <Text style={{ marginLeft: 14 }}>书名: {item.book}</Text>
                                    <Text style={{ marginLeft: 14 }}>作者: {item.author}</Text>
                                    <Text style={{ marginLeft: 14 }}>价格: {item.price}</Text>
                                    <Text style={{ marginLeft: 14}}>ISBN: {item.isbn}</Text>
                                </View>

                            </Card.Body>
                            {/*<Card.Footer*/}
                            {/*    content="footer content"*/}
                            {/*    extra="footer extra content"*/}
                            {/*/>*/}
                        </Card>


                    </WingBlank>
                </View>

            </TouchableHighlight>

        );
    }
    cancel(){
        this.setState({
            showBooks:this.state.books
        });
    }
    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <SafeAreaView style={{ flex: 2}}>
                <MySearchBar searchBooks={(data) => this.getText(data)} cancelSearching={()=>this.cancel()}/>
                <MyCarousel/>
                <FlatList
                    data={this.state.showBooks}
                    renderItem={this.renderBook}
                    style={styles.list}
                    keyExtractor={item => item.bookId}
                    horizontal={false}
                    numColumns={2}
                />
            </SafeAreaView>
        );
    }
}
