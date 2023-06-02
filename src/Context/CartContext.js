import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();


export function CartProvider({ children }) {
    

   
    const localCart = JSON.parse(localStorage.getItem('totalItems'));
    const sumPrice = localCart ? Number(localStorage.getItem('totalPrice')) : 0;
    const localFav = JSON.parse(localStorage.getItem('favItems'));
    
    const [items, setItems] = useState(localCart ? localCart: []);
    const [totalPrice, setTotalPrice] = useState(sumPrice);
    const [favItems, setFavItems] = useState(localFav ? localFav : [])

    localStorage.removeItem('totalItems');

    const addToCart = (id, name, price, image) => {
        const existingItem = items.find((item) => item.id === id);
        if (existingItem) {
            existingItem.quantity++;

        } else {
            setItems([...items, { id: id, name: name, price: price,image:image, quantity: 1 }]);

        }

        setTotalPrice(Number(totalPrice) + Number(price))
    }

    const removeFromCart = (id) => {
        const existingItem = items.find((item) => item.id === id);

        if (existingItem.quantity == 1) {
            const reducedCart = items.filter((item) => item.id !== id);
            console.log(reducedCart);
            setItems(reducedCart);

        } else {
            existingItem.quantity--;
        }

        setTotalPrice(Number(totalPrice) - Number(existingItem.price))
    }

    const removeAllItemsCart = () => {
        setItems([]);
        setTotalPrice(0);
    }

    const addToFav = (id, name, price, image) => {
        const existingItem = favItems.find((item) => item.id === id);
        if (!existingItem) {
            setFavItems([...favItems, { id: id, name: name, price: price,image:image}])
        } 
    }

    const removeFav = (id) => {
        const reducedCart = favItems.filter((item) => item.id !== id);
        console.log(reducedCart);
        setFavItems(reducedCart);  
    }


    return ( 
        <CartContext.Provider value = {
            { items, totalPrice, addToCart, removeFromCart, removeAllItemsCart, favItems, addToFav, removeFav } } > { children } 
        </CartContext.Provider>
    )
}

export default CartContext