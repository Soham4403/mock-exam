import { formatPrice } from '../utils'

function Orders({ orders }) {
  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 && <p>No orders placed yet.</p>}

      {orders.map((order) => (
        <div className="card order" key={order.id}>
          <h3>Order #{order.id}</h3>
          <p>Customer: {order.customerName || order.customer?.name}</p>
          <p>Total: {formatPrice(order.total)}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  )
}

export default Orders
