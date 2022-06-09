import React from "react";
import Card from "../components/Card";
import AppContext from "../context";


function Favorites() {

    const {favorites, onAddToCart, onAddToFavorites} = React.useContext(AppContext);

    return (
        <div className='content p-40'>
            <div className="d-flex align-center justify-between mb-40">
                <h1>Favorites</h1>
            </div>

            <div className="d-flex flex-wrap">
                {
                    favorites
                    .map((item, index) => {
                        return (
                            <Card 
                                key={index}
                                onFavorite={(obj) => onAddToFavorites(obj)}
                                onAdd={(obj) => onAddToCart(obj)}
                                favorited={true} 
                                {...item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Favorites;