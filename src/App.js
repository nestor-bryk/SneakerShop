import Header from './components/Header';
import Drawer from './components/Drawer';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';


function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [drawerOpened, setDrawerOpened] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');
	const [favorites, setFavorites] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			const favoritesResponse = await axios.get('https://629782ee14e756fe3b31ad8f.mockapi.io/favorites');
			const cartResponse = await axios.get('https://629782ee14e756fe3b31ad8f.mockapi.io/cartItems');
			const itemsResponse = await axios.get('https://629782ee14e756fe3b31ad8f.mockapi.io/items');

			setIsLoading(false);
			setFavorites(favoritesResponse.data);
			setCartItems(cartResponse.data);
			setItems(itemsResponse.data);
		}

		fetchData();
	}, []);

	const onAddToCart = async (obj) => {
		try {
			const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
			if(findItem) {
				setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`https://629782ee14e756fe3b31ad8f.mockapi.io/cartItems/${findItem.id}`);
			} else {
				const {data} = await axios.post('https://629782ee14e756fe3b31ad8f.mockapi.io/cartItems', obj);	
				setCartItems((prev) => [...prev, data]);
			}
		} catch (error) {
			alert('Error')
		}

	};

	const onRemoveCartItem = (id) => {
		axios.delete(`https://629782ee14e756fe3b31ad8f.mockapi.io/cartItems/${id}`);
		setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
	}

	const onChangeInputValue = (event) => {
		setSearchValue(event.target.value)
	}

	const onAddToFavorites = async (obj) => {
		try {
			if (favorites.find(favObj => favObj.id ===  obj.id)) {
				axios.delete(`https://629782ee14e756fe3b31ad8f.mockapi.io/favorites/${obj.id}`);

			} else {
				const { data } = await axios.post('https://629782ee14e756fe3b31ad8f.mockapi.io/favorites', obj);
				setFavorites((prev) => [...prev, data]);
			}
		} catch (error) {
			alert('Error')
		}
	}

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id))
	};


	return (
		<AppContext.Provider 
			value={{
				items, 
				cartItems, 
				favorites, 
				isItemAdded, 
				setDrawerOpened, 
				setCartItems, 
				onAddToFavorites, 
				onAddToCart, 
				isLoading
			}}>
			<div className='wrapper clear'>
				{drawerOpened && <Drawer onClose={() => setDrawerOpened(false)} items={cartItems} onRemove={onRemoveCartItem} />}
				<Header onClickDrawer={() => setDrawerOpened(true)} />


				<Routes>
					<Route path='/' element={
						<Home 
							items={items} 
							searchValue={searchValue}
							cartItems={cartItems}
							onAddToCart={onAddToCart}
							onChangeInputValue={onChangeInputValue}
							onAddToFavorites={onAddToFavorites}
							isLoading={isLoading} />
					}>
					</Route>
					<Route path='/favorites' element={<Favorites/>}></Route>
					<Route path='/orders' element={<Orders/>}></Route>
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
