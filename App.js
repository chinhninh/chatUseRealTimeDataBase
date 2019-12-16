import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './components/Login';
import Home from './components/Home';
import AuthLoading from './components/AuthLoading'
import Chat from './components/Chat';
import Profile from './components/Profile';
import Register from './components/Register';
import Loading from './components/Loading';

const navigator =createStackNavigator({
  Home: {screen: Home},
  Chat: {screen: Chat},
  Profile: {screen: Profile},
  Login: {screen: Login},
  Register: {screen: Register},
  Loading: {screen: Loading}
  // AuthLoading: {screen: AuthLoading}
},
{
  initialRouteName: 'Login',
  headerMode: 'none'
}
)

const App = createAppContainer(navigator)
// console.ignoredYellowBox = ['Setting a timer'];
export default App
console.disableYellowBox = true;




// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import Login from './components/Login';
// import Home from './components/Home';
// import AuthLoading from './components/AuthLoading'
// import Chat from './components/Chat';
// import Profile from './components/Profile';
// import Register from './components/Register';

// const AppStack = createStackNavigator({ 
//   Home: Home,
//   Chat: Chat,
//   Profile: Profile
// });
// const AuthStack = createStackNavigator({ Login: Login  });
// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Register: Register,
//       AuthLoading: AuthLoading,
//       App: AppStack,
//       Auth: AuthStack,
//     },
//     {
//       initialRouteName: 'AuthLoading',
//     }
//   )
// );
