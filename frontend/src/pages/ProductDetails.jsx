import { formatPrice, setRoute } from '../utils'

function ProductDetails({ products, cart, addToCart }) {
  const id = Number(location.hash.replace('#product/', ''))
  const product = products.find((item) => item.id === id)

  if (!product) return <p>Product not found.</p>

  const inCart = cart.some((item) => item.id === product.id)

  return (
    <div>
      <button onClick={() => setRoute('products')}>Back</button>
      <div className="card details">
        <img className="product-image big" src={product.image} alt={product.name} />
        <div>
          <p className="category">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h2>{formatPrice(product.price)}</h2>
          <p>Rating: {product.rating}</p>
          <button disabled={inCart} onClick={() => addToCart(product)}>
            {inCart ? 'Already in Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
