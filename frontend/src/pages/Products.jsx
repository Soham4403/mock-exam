import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'

function Products({ products, cart, addToCart }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('low')

  const categories = ['All', ...new Set(products.map((product) => product.category))]

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
      .filter((product) => category === 'All' || product.category === category)
      .sort((a, b) => sort === 'low' ? a.price - b.price : b.price - a.price)
  }, [products, search, category, sort])

  return (
    <div>
      <h1>Products</h1>

      <div className="filters">
        <input placeholder="Search product" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
        </select>
      </div>

      <div className="grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            inCart={cart.some((item) => item.id === product.id)}
            addToCart={addToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && <p>No products found.</p>}
    </div>
  )
}

export default Products
