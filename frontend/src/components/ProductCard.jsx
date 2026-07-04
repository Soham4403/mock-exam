import { formatPrice, setRoute } from '../utils'

function ProductCard({ product, inCart, addToCart }) {
  return (
    <div className="card product-card">
      <img className="product-image" src={product.image} alt={product.name} />
      <p className="category">{product.category}</p>
      <h3 onClick={() => setRoute(`product/${product.id}`)}>{product.name}</h3>
      <p>Rating: {product.rating}</p>
      <p>{formatPrice(product.price)}</p>
      <button disabled={inCart} onClick={() => addToCart(product)}>
        {inCart ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  )
}

export default ProductCard
