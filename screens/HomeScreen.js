import React from 'react';
import {Button, View,Text} from 'react-native';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import {Profile} from '../components/Profile';
import { createStackNavigator } from '@react-navigation/stack';
import {BookScreen} from './BookScreen';
import {BookListScreen} from "./BookListScreen"
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CartScreen} from './CartScreen';
import {OrderScreen} from './OrderScreen';
import {TabNavigator} from "react-navigation"
console.disableYellowBox = true;
function IconWithBadge({ name, badgeCount, color, size }) {
    return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
            <Ionicons name={name} size={size} color={color} />
            {badgeCount > 0 && (
                <View
                    style={{
                        // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                        position: 'absolute',
                        right: -6,
                        top: -3,
                        backgroundColor: 'red',
                        borderRadius: 6,
                        width: 12,
                        height: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
}

function HomeIconWithBadge(props) {
    // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
    return <IconWithBadge {...props} badgeCount={3} />;
}

function BookListAndDetail(){
    return (
        <SafeAreaProvider>
        <Stack.Navigator>
            <Stack.Screen name="BookList" component={BookListScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Detail" component={BookScreen}/>
        </Stack.Navigator>
            </SafeAreaProvider>
    );
}
function MyCartScreen({ navigation }) {

    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         // Prevent default action
    //         // e.preventDefault();
    //
    //     });
    //
    //     return unsubscribe;
    // }, [navigation]);
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Detail" component={BookScreen}/>
            </Stack.Navigator>
        </SafeAreaProvider>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>My Cart</Text>
        // </View>

    );
}

function MyOrderScreen({navigation}) {
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen name="Cart" component={OrderScreen} options={{headerShown:false}}/>

            </Stack.Navigator>
        </SafeAreaProvider>
    );
}

function MyProfileScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Profile navigation={navigation}/>
        </View>
    );
}
// const myApp= TabNavigator({
//     Home: {
//         screen: MyHomeScreen,
//     },
//     Notifications: {
//         screen: MyNotificationsScreen,
//     },
// }, {
//     tabBarPosition: 'top',
//     animationEnabled: true,
//     tabBarOptions: {
//         activeTintColor: '#e91e63',
//     },
// });
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export function HomeScreen(){
    return (
            // <Drawer.Navigator initialRouteName="Home">
            //     <Drawer.Screen name="Books" component={BookListAndDetail} />
            //     <Drawer.Screen name="MyCart" component={MyCartScreen} />
            //     <Drawer.Screen name="MyOrder" component={MyOrderScreen} />
            //     <Drawer.Screen name="MyProfile" component={MyProfileScreen} />
            // </Drawer.Navigator>

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Home') {
                            return (
                                <HomeIconWithBadge
                                    name={
                                        'md-home'
                                    }
                                    size={size}
                                    color={color}
                                />
                            );
                        } else if (route.name === 'Store') {
                            return (
                                <Ionicons
                                    name={'md-book'}
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                        else if (route.name === 'Cart') {
                            return (
                                <Ionicons
                                    name={'md-cart'}
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                        else if (route.name === 'My') {
                            return (
                                <Ionicons
                                    name={'md-person'}
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>
                <Tab.Screen name="Home" component={BookListAndDetail} />
                <Tab.Screen name="Store" component={MyOrderScreen}
                            listeners={({ navigation, route }) => ({
                                tabPress: e => {
                                    // Prevent default action

                                    // Do something with the `navigation` object

                                },
                            })}/>
                <Tab.Screen name="Cart" component={MyCartScreen}  listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        // Prevent default action

                        // Do something with the `navigation` object

                    },
                })}  />
                <Tab.Screen name="My" component={MyProfileScreen} />
            </Tab.Navigator>

    );
}
