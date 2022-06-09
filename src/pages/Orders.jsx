import axios from "axios";
import React from "react";
import Card from "../components/Card";
import AppContext from "../context";


function Orders() {

    const { onAddToCart, onAddToFavorites, isLoading } = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        try {
            (async() => {
                const { data } = await axios.get('https://629782ee14e756fe3b31ad8f.mockapi.io/orders');
                // console.log(data.map(obj => obj.items).flat());
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
            })()
        } catch (error) {
            alert('Error')
        }
    }, [])


    return (
        <div className='content p-40'>
            <div className="d-flex align-center justify-between mb-40">
                <h1>My orders</h1>
            </div>

            <div className="d-flex flex-wrap">
                {
                    ( isLoading ? [...Array(8)] : orders).map((item, index) => {
                        return (
                            <Card 
                                key={index}
                                loading={isLoading}
                                {...item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Orders;