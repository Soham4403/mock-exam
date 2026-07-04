import { formatPrice } from '../utils'

function Orders({ orders }) {
  const delivered = orders.filter((order) => order.status === 'Delivered').length
  const placed = orders.filter((order) => order.status === 'Placed').length

  return (
    <div>
      <h1>Orders</h1>

      <div className="stats">
        <div className="card"><h3>Total Orders</h3><p>{orders.length}</p></div>
        <div className="card"><h3>Delivered</h3><p>{delivered}</p></div>
        <div className="card"><h3>Processing</h3><p>{placed}</p></div>
        <div className="card"><h3>Cancelled</h3><p>0</p></div>
      </div>

      <div className="card table-card">
        <h2>All Orders</h2>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id || order.id}>
                  <td>#{order._id || order.id}</td>
                  <td>{order.customerName || order.customer?.name}</td>
                  <td>{order.date || 'Today'}</td>
                  <td>{formatPrice(order.total)}</td>
                  <td><span className="badge">{order.status}</span></td>
                  <td><button className="light-btn">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Orders
