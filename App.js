import * as React from 'react';
import {AsyncStorage,View} from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from "./screens/LoginScreen";
import {HomeScreen} from "./screens/HomeScreen";
import {SplashScreen} from "./components/splash";
import {AuthContext} from "./context"
import {apiUrl} from "./urlconfig"
const Stack = createStackNavigator();
const CHECK_URL=apiUrl+"/checkSession";
export default function App() {
  const [state, dispatch] = React.useReducer(
      (prevState, action) => {
        switch (action.type) {
          case 'RESTORE_TOKEN':
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'SIGN_IN':
            return {
              ...prevState,
              isSignout: false,
              userToken: action.token,
            };
          case 'SIGN_OUT':
            return {
              ...prevState,
              isSignout: true,
              userToken: null,
            };
        }
      },
      {
        isLoading: true,
        isSignout: false,
        userToken: null,
      }
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const Async = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('@Bookstore:token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      fetch(CHECK_URL,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({}),
      })
          .then((response) =>{return response.json();})
          .then((responseData) => {
            if(responseData.status<0){
              AsyncStorage.removeItem("@Bookstore:token");
              dispatch({ type: 'RESTORE_TOKEN', token: null });
            }else{
              dispatch({ type: 'RESTORE_TOKEN', token: userToken });
            }
          })
          .catch((error)=>{
            console.error(error);
          });
    };

    Async();



  }, []);
  const authContext = React.useMemo(
      () => ({
        signIn: async data => {
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `AsyncStorage`
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async data => {
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token

          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
      }),
      []
  )
  return(
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
                // No token found, user isn't signed in
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                      title: 'Log in',
                      // When logging out, a pop animation feels intuitive
                      animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                      headerShown:false,
                    }}
                />
            ) : (
                // User is signed in
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
  );
}
