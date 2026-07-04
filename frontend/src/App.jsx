import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { api } from './api'
import { getCartTotal, readLocal, setRoute, writeLocal } from './utils'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'

function App() {
  const [route, setCurrentRoute] = useState(location.hash.replace('#', '') || 'login')
  const [user, setUser] = useState(() => readLocal('user', null))
  const [token, setToken] = useState(() => readLocal('token', null))
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(() => readLocal('cart', []))
  const [orders, setOrders] = useState(() => readLocal('orders', []))

  const cartTotal = useMemo(() => getCartTotal(cart), [cart])
  const isLoggedIn = Boolean(user && token)

  useEffect(() => {
    const handleRoute = () => setCurrentRoute(location.hash.replace('#', '') || 'login')
    window.addEventListener('hashchange', handleRoute)
    return () => window.removeEventListener('hashchange', handleRoute)
  }, [])

  useEffect(() => {
    writeLocal('cart', cart)
  }, [cart])

  useEffect(() => {
    writeLocal('orders', orders)
  }, [orders])

  useEffect(() => {
    if (token) api.getProducts(token).then(setProducts)
  }, [token])

  function saveLogin(loginData) {
    writeLocal('user', loginData.user)
    writeLocal('token', loginData.token)
    setUser(loginData.user)
    setToken(loginData.token)
    setRoute('dashboard')
  }

  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
    setProducts([])
    setRoute('login')
  }

  function addToCart(product) {
    const alreadyAdded = cart.find((item) => item.id === product.id)
    if (alreadyAdded) return
    setCart([...cart, { ...product, quantity: 1 }])
  }

  function updateQuantity(id, value) {
    setCart(cart.map((item) => (
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + value) } : item
    )))
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id))
  }

  async function placeOrder(customer) {
    const savedOrder = await api.placeOrder({ customer, items: cart, total: cartTotal.finalTotal }, token)
    const order = savedOrder || {
      id: Date.now(),
      customerName: customer.name,
      total: cartTotal.finalTotal,
      status: 'Placed',
    }
    setOrders([order, ...orders])
    setCart([])
    setRoute('orders')
  }

  if (route === 'register') return <Register />
  if (route === 'login') return <Login onLogin={saveLogin} />

  return (
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <Layout route={route} user={user} logout={logout}>
        {route === 'dashboard' && <Dashboard products={products} cart={cart} orders={orders} />}
        {route === 'products' && <Products products={products} cart={cart} addToCart={addToCart} />}
        {route.startsWith('product/') && <ProductDetails products={products} cart={cart} addToCart={addToCart} />}
        {route === 'cart' && <Cart cart={cart} total={cartTotal} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />}
        {route === 'checkout' && <Checkout cart={cart} total={cartTotal} placeOrder={placeOrder} />}
        {route === 'orders' && <Orders orders={orders} />}
      </Layout>
    </ProtectedRoute>
  )
}

export default App
