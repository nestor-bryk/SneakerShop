import React from "react";
import Info from "./Info";
import axios from "axios";
import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function Drawer({ onClose, items = [], onRemove }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplited, setIsOrderComplited] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.post('https://629782ee14e756fe3b31ad8f.mockapi.io/orders', {
        items: cartItems,
      });
      
      setOrderId(data.id);
      setIsOrderComplited(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://629782ee14e756fe3b31ad8f.mockapi.io/cartItems/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      alert('Не удалось создать заказ :(')
    }
    setIsLoading(false)
  }

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Box <img className="remove-btn cu-p" onClick={onClose} src="/img/drawer/remove.svg" alt="Remove" />
        </h2>

        {
          items.length > 0 ? <div className="full-drawer">
            <div className="items">
              {
                items.map((item) => {
                  return (
                    <div className="cartItem d-flex align-center justify-between mb-20">
                      <img width={70} height={70} src={item.imgUrl} />
                      <div>
                        <p>{item.title}</p>
                        <b>{item.price + '$'}</b>
                      </div>
                      <img className="remove-btn" onClick={() => onRemove(item.id)} src="/img/drawer/remove.svg" alt="Remove" />
                    </div>
                  )
                })
              }
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>In all:</span>
                  <div></div>
                  <b>{totalPrice} $</b>
                </li>
                <li>
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>{totalPrice / 100 * 5}$</b>
                </li>
              </ul>
              <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>
                Order <img src="/img/drawer/arrow-right.svg" alt="Arrow" />
              </button>
            </div>
          </div> :
            <Info 
              imageUrl={isOrderComplited ? '/img/drawer/done.jpg' : '/img/drawer/box.png'} 
              title={isOrderComplited ? 'Order is processed' : 'Box empty'} 
              description={
                isOrderComplited 
                  ? `Your order №${orderId} will soon be delivered by courier` 
                  : 'Add at least one pair of sneakers to place an order.'
              }
            />
        }
      </div>
    </div>
  )
}

export default Drawer;