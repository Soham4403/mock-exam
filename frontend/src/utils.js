export function setRoute(route) {
  window.location.hash = route
}

export function readLocal(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback
  } catch {
    return fallback
  }
}

export function writeLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function formatPrice(price) {
  return `Rs. ${Math.round(price).toLocaleString('en-IN')}`
}

export function getCartTotal(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = subtotal * 0.1
  const tax = (subtotal - discount) * 0.18

  return {
    subtotal,
    discount,
    tax,
    finalTotal: subtotal - discount + tax,
  }
}
