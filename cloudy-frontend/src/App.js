import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrimeReact from 'primereact/api';
// import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import FileScreen from './screens/FileScreen';
import SharedFileScreen from './screens/SharedFileScreen';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';

PrimeReact.ripple = true;
PrimeReact.inputStyle = 'filled';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<HomeScreen />} />
				<Route path='/files' element={<FileScreen />} />
				<Route path='/shared' element={<SharedFileScreen />} />
				<Route path='/login' element={<LoginScreen />} />
				<Route path='/register' element={<RegisterScreen />} />
				<Route path='/profile' element={<ProfileScreen />} />

				<Route path='/admin/userlist' element={<UserListScreen />} />
				<Route path='/admin/user/edit/:id' element={<UserEditScreen />} />
			</Routes>
			{/* <Footer /> */}
		</BrowserRouter>
	);
};

export default App;
