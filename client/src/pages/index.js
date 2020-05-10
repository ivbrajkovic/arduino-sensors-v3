// Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Home from '../pages/Home';
import Dev from '../pages/Dev';
import Settings from '../pages/Settings';
import History from '../pages/History';
import About from '../pages/About';

// Routes => Compoonents
export default [
  { name: 'Login', path: '/login', Component: Login },
  { name: 'Signup', path: '/signup', Component: Signup },
  { name: 'Home', path: '/', Component: Home, privateRoute: true },
  { name: 'Dev', path: '/dev', Component: Dev, privateRoute: true },
  {
    name: 'Settings',
    path: '/settings',
    Component: Settings,
    privateRoute: true
  },
  { name: 'History', path: '/history', Component: History, privateRoute: true },
  { name: 'About', path: '/about', Component: About }
];
