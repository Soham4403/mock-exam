require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const ConnDb = require('./src/Config/DbConfig')
const User = require('./src/Models/User')

const app = express()
const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'mern_exam_secret'

const orders = []

const productNames = [
  ['Wireless Headphone', 'Electronics', 2500, 4.5],
  ['Running Shoes', 'Fashion', 3200, 4.2],
  ['Smart Watch', 'Electronics', 5900, 4.7],
  ['Leather Backpack', 'Accessories', 1850, 4.4],
  ['Bluetooth Speaker', 'Electronics', 2100, 4.3],
  ['Denim Jacket', 'Fashion', 2750, 4.1],
]

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' })
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token missing' })
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const alreadyExists = await User.findOne({ email })
  if (alreadyExists) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const user = await User.create({ name, email, password })

  res.json({ id: user._id, name: user.name, email: user.email })
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email, password })

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  res.json({
    token: createToken(user),
    user: { id: user._id, name: user.name, email: user.email },
  })
})

app.get('/api/products', verifyToken, async (req, res) => {
  let photos = []

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=6')
    photos = await response.json()
  } catch {
    photos = productNames.map((item, index) => ({
      thumbnailUrl: `https://via.placeholder.com/150?text=Product+${index + 1}`,
      title: `${item[0]} description`,
    }))
  }

  const products = productNames.map((item, index) => ({
    id: index + 1,
    name: item[0],
    category: item[1],
    price: item[2],
    rating: item[3],
    image: photos[index].thumbnailUrl,
    description: photos[index].title,
  }))

  res.json(products)
})

app.post('/api/orders', verifyToken, (req, res) => {
  const { customer, items, total } = req.body

  if (!customer || !items || items.length === 0) {
    return res.status(400).json({ message: 'Order data is missing' })
  }

  const order = {
    id: Date.now(),
    customer,
    customerName: customer.name,
    items,
    total,
    status: 'Placed',
  }

  orders.unshift(order)
  res.json(order)
})

app.get('/api/orders', verifyToken, (req, res) => {
  res.json(orders)
})

ConnDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
})
