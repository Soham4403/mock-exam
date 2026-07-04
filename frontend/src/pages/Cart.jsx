import OrderSummary from '../components/OrderSummary'
import { formatPrice, setRoute } from '../utils'

function Cart({ cart, total, updateQuantity, removeFromCart }) {
  if (cart.length === 0) {
    return (
      <div className="card">
        <h2>Your cart is empty.</h2>
        <button onClick={() => setRoute('products')}>Continue Shopping</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Cart</h1>
      <div className="two-column">
        <div className="card">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
              </div>
              <div>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>

        <div>
          <OrderSummary total={total} />
          <button className="full-btn" onClick={() => setRoute('checkout')}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
