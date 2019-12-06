import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './components/Login';
import Home from './components/Home';
import AuthLoading from './components/AuthLoading'
import Chat from './components/Chat';
import Profile from './components/Profile';
import Register from './components/Register';

const navigator =createStackNavigator({
  // AuthLoading: {screen:AuthLoading},
  Home: {screen: Home},
  Chat: {screen: Chat},
  Profile: {screen: Profile},
  Login: {screen: Login},
  Register: {screen: Register}
},
{
  initialRouteName: 'Register',
  headerMode: 'none'
}
)

const App = createAppContainer(navigator)

export default App
// const AppStack = createStackNavigator({ 
  
//   Home: Home,
//   Chat: Chat,
//   Profile: Profile, 
  
// });
// const AuthStack = createStackNavigator({ Login: Login });

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: AuthLoading,
//       App: AppStack,
//       Auth: AuthStack,
//     },
//     {
//       initialRouteName: 'AuthLoading',
//     }
//   )
// );

