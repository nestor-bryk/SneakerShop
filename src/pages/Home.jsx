import React from 'react';
import Card from '../components/Card/index';
import AppContext from '../context';

function Home({
    items, 
    searchValue, 
    onAddToCart, 
    onChangeInputValue, 
    onAddToFavorites, 
    isLoading
}) {

    const renderItems = () => {
        const filtredItems = items.filter(item => 
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        return ( isLoading ? [...Array(8)] : filtredItems).map((item, index) =>    
            <Card 
                key={index}
                onFavorite={(obj) => onAddToFavorites(obj)}
                onAdd={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}
            />       
        )
        
    }

    return (
        <div className='content p-40'>
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Search on request "${searchValue}"` : 'All sneakers'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search/search.svg" alt="Search" />
                    <input onChange={onChangeInputValue} placeholder="Search..." value={searchValue} />
                </div>
            </div>

            <div className="d-flex flex-wrap">{renderItems()}</div>
        </div>
    )
}

export default Home;


