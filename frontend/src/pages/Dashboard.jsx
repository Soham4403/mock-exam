import { formatPrice, getCartTotal, setRoute } from '../utils'

function Dashboard({ products, cart, orders }) {
  const total = getCartTotal(cart)

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="card"><h3>Total Products</h3><p>{products.length}</p></div>
        <div className="card"><h3>Cart Items</h3><p>{cart.length}</p></div>
        <div className="card"><h3>Cart Value</h3><p>{formatPrice(total.finalTotal)}</p></div>
        <div className="card"><h3>Total Orders</h3><p>{orders.length}</p></div>
      </div>

      <div className="card">
        <h2>Recent Activity</h2>
        <p>Product added to cart</p>
        <p>Product removed from cart</p>
        <p>Order placed</p>
      </div>

      <button onClick={() => setRoute('products')}>Go to Products</button>
    </div>
  )
}

export default Dashboard
