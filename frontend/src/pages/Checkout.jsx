import { useState } from 'react'
import OrderSummary from '../components/OrderSummary'
import { setRoute } from '../utils'

function Checkout({ cart, total, placeOrder }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' })
  const [error, setError] = useState('')

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function submitOrder(event) {
    event.preventDefault()
    setError('')

    if (cart.length === 0) return setError('Cart is empty')
    if (Object.values(form).some((value) => !value)) return setError('All fields are required')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter valid email')
    if (!/^\d+$/.test(form.phone)) return setError('Phone must be numeric')
    if (!/^\d+$/.test(form.pincode)) return setError('Pincode must be numeric')

    placeOrder(form)
  }

  return (
    <div>
      <h1>Checkout</h1>
      <div className="two-column">
        <form className="card form" onSubmit={submitOrder}>
          <h2>Customer Information</h2>
          {error && <p className="error">{error}</p>}
          <input name="name" placeholder="Full Name" value={form.name} onChange={updateField} />
          <input name="email" placeholder="Email" value={form.email} onChange={updateField} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={updateField} />
          <input name="address" placeholder="Address" value={form.address} onChange={updateField} />
          <input name="city" placeholder="City" value={form.city} onChange={updateField} />
          <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={updateField} />
          <p><strong>Payment:</strong> Cash on Delivery</p>
          <button>Place Order</button>
          <button type="button" className="light-btn" onClick={() => setRoute('cart')}>Back to Cart</button>
        </form>

        <OrderSummary total={total} />
      </div>
    </div>
  )
}

export default Checkout
