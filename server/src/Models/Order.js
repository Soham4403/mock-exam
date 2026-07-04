const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    category: String,
    price: Number,
    rating: Number,
    image: String,
    description: String,
    quantity: Number,
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
    },
    items: [orderItemSchema],
    total: Number,
    status: {
      type: String,
      default: 'Placed',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
