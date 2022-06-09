import React from "react";

import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

function Card({ 
    id,
    title, 
    imgUrl, 
    price, 
    onAdd, 
    onFavorite, 
    favorited = false, 
    loading = false 
}) {
    const { isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id, parentId: id, title, imgUrl, price}

    const onClickAdd = () => {
        onAdd(obj);
    }

    const onClickFavorite = () => {
        onFavorite(obj)
        setIsFavorite(!isFavorite)
    }

    return (
        loading ? 
        <div className={styles.card}>
            <ContentLoader
                speed={2}
                width={150}
                height={180}
                viewBox="0 0 150 180"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                <rect x="0" y="99" rx="5" ry="5" width="150" height="15" />
                <rect x="0" y="122" rx="5" ry="5" width="100" height="15" />
                <rect x="0" y="155" rx="8" ry="8" width="80" height="25" />
                <rect x="116" y="148" rx="10" ry="10" width="32" height="32" />
            </ContentLoader>
        </div> :
        <div className={styles.card}>
            <div className={styles.favorite}>
                {onFavorite &&
                    <img width={32} height={32} onClick={onClickFavorite} 
                        src={isFavorite ? "/img/card/liked.svg" : "/img/card/unliked.svg"} alt="Unliked" />
                }
            </div>
            <img width={133} height={112} src={imgUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Price:</span>
                    <b>{price + '$'}</b>
                </div>
                <div>
                    {onAdd && (
                        <img className="cu-p" width={32} height={32} 
                        onClick={onClickAdd} 
                        src={isItemAdded(id) ? "/img/card/cheked.svg" : "/img/card/add.svg"} 
                        alt="Plus" />
                    )
                    }
                </div>
            </div>
        </div>
        

    )
}

export default Card;