import { formatPrice } from '../utils'

function OrderSummary({ total }) {
  return (
    <div className="card">
      <h3>Order Summary</h3>
      <p>Subtotal: {formatPrice(total.subtotal)}</p>
      <p>Discount: {formatPrice(total.discount)}</p>
      <p>Tax: {formatPrice(total.tax)}</p>
      <h3>Total: {formatPrice(total.finalTotal)}</h3>
    </div>
  )
}

export default OrderSummary
