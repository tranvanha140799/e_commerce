import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';

import { Products, Navbar, Cart, Checkout } from './components'; // Cần có file components/index.js
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    };

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();

        setCart(cart);
    };

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    };

    const handleUpdateCartQuantity = async (productId, quantity) => {
        const res = await commerce.cart.update(productId, { quantity });

        setCart(res.cart);
    };

    const handleRemoveFromCart = async (productId) => {
        const res = await commerce.cart.remove(productId);

        setCart(res.cart);
    };

    const handleEmptyCart = async () => {
        const res = await commerce.cart.empty();

        setCart(res.cart);
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart
                            cart={cart}
                            handleUpdateCartQuantity={handleUpdateCartQuantity}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout cart={cart} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
