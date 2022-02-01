import { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthProvider";

export const AppContext = createContext({
    cart: [],
    addToCart: (product, amount) => {},
    removeFromCart: (productId) => {},
    isProductInCart: (productId) => {},
    getCartTotal: () => {},
    clearCart: () => {},
    favourites: [],
    addToFavourites: (product) => {},
    isProductInFavourites: (productId) => {},
    removeFromFavourites: (productId) => {},
    refresh: () => {},
    loading: false,
})

export default function AppStateProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const { user } = useAuth();

    const load = useCallback(() => {
        if (!user) return
        setLoading(true);
        // load cart data
        AsyncStorage.getItem(`${user.email}-cart`).then(data => {
          if (data){
            setCart(JSON.parse(data))
          }
        }).catch(console.log)
        .finally(() => setLoading(false))

        // load favourites data
        setLoading(true);
        AsyncStorage.getItem(`${user.email}-favourites`).then(data => {
          if (data){
            setFavourites(JSON.parse(data))
          }
        }).catch(console.log)
        .finally(() => setLoading(false))
    }, [user]);

    useEffect(() => {
        load();
    }, [load]);

    function writeCartData(data){
      return AsyncStorage.setItem(`${user.email}-cart`, JSON.stringify(data)).catch(console.log)
    }
    function writeFavouritesData(data){
      return AsyncStorage.setItem(`${user.email}-favourites`, JSON.stringify(data)).catch(console.log)
    }
    const addToCart = (product, amount) => {
      if (amount < 1) return;
      product.amount = amount;
      product.total = parseFloat(product?.price * amount).toPrecision(3);
      setCart(prev => ([ ...prev, product ]));
      writeCartData(cart);
    }
    const removeFromCart = (productId) => {
      setCart(prev => prev.filter(product => product.id !== productId))
      writeCartData(cart)
    }
    const isProductInCart = useCallback((productId) => {
      let inCart = false;
      for (let i = 0; i < cart.length; i++){
        if (cart[i].id === productId) {
          inCart = true;
          return true;
        }
      }
      return inCart;
    }, [cart])

    const clearCart = () => {
      setCart([])
      return AsyncStorage.removeItem(`${user.email}-cart`).catch(console.log)
    }
    const getCartTotal = () => {
      let cartTotal = 0.0;
      cart.forEach(item => {
        cartTotal = (parseFloat(cartTotal) + parseFloat(item.total)).toPrecision(3)
      })
      return cartTotal;
    }
    const addToFavourites = (product) => {
      setFavourites(prev => ([ ...prev, product ]))
      writeFavouritesData(favourites)
    }
    const removeFromFavourites = (productId) => {
      setFavourites(prev => prev.filter(product => product.id !== productId))
      writeFavouritesData(favourites)
    }
    const isProductInFavourites = useCallback((productId) => {
      let inFavourites = false;
      for (let i = 0; i < favourites.length; i++){
        if (favourites[i].id === productId) {
          inFavourites = true;
          return true;
        }
      }
      return inFavourites;
    }, [favourites])

    return (
        <AppContext.Provider value={{ 
            cart, addToCart, isProductInCart, removeFromCart, clearCart, getCartTotal, favourites, 
            addToFavourites, isProductInFavourites, removeFromFavourites, refresh: load, loading 
          }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppState = () => useContext(AppContext);