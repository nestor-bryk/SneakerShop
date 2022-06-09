import React from "react";
import AppContext from "../context";

const Info = ({imageUrl, title, description}) => {
    const { setDrawerOpened } = React.useContext(AppContext);

    return (
        <div className="empty-drawer">
            <img src={imageUrl} />
            <h3>{title}</h3>
            <p>{description}</p>
            <button 
                className="greenButton" 
                onClick={() => setDrawerOpened(false)}><img src="/img/drawer/arrow-left.svg" alt="Arrow" /> Come back</button>
        </div>
    )
}

export default Info;