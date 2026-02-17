import { useCallback, useMemo } from 'react'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import { toast } from 'react-toastify'

export function useCart() {
  const { state, dispatch } = useGlobal()

  const getProductVariantDetails = useCallback((productId, variantId) => {
    const product = state.PRODUCTS.find(p => p.productId === productId)
    if(!product) return null
    const variant = product.variants.find(v => v.variantId === variantId)
    return { product, variant }
  }, [state.PRODUCTS])

  const addToCart = useCallback((productId, variantId, quantity = 1) => {
    const details = getProductVariantDetails(productId, variantId)
    
    if(!details) {
      toast.error('Product not found')
      return false
    }

    const { variant } = details
    
    if(quantity > variant.stock && !variant.unlimitedStock) {
      toast.error(`Only ${variant.stock} in stock`)
      return false
    }

    const cartItem = { productId, variantId, quantity }

    const existingCartIndex = state.cart.findIndex(
      item => item.productId === productId && item.variantId === variantId
    )

    let updatedCart
    if(existingCartIndex > -1) {
      updatedCart = [...state.cart]
      updatedCart[existingCartIndex].quantity += quantity
    } else {
      updatedCart = [...state.cart, cartItem]
    }

    dispatch({ type: ACTIONS.ADD_TO_CART, payload: updatedCart })
    toast.success('Item has been added to cart')
    return true
  }, [state.PRODUCTS, state.cart, dispatch, getProductVariantDetails])

  const updateQuantity = useCallback((productId, variantId, quantity) => {
    if(quantity < 1) {
      removeFromCart(productId, variantId)
      return
    }

    dispatch({
      type: ACTIONS.UPDATE_ITEM_QTY,
      payload: { productId, variantId, quantity },
    })
  }, [dispatch])

  const removeFromCart = useCallback((productId, variantId) => {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: { productId, variantId },
    })
  }, [dispatch])

  const cartTotals = useMemo(() => {
    let subtotal = 0
    let totalRuriCoin = 0
    let totalItems = 0
    let outOfStockCount = 0

    state?.cart?.forEach(item => {
      const details = getProductVariantDetails(item.productId, item.variantId)
      if(!details) return

      const { variant } = details
      const isStocked = variant.stock > 0

      if(isStocked) {
        subtotal += variant.price * item.quantity
        totalRuriCoin += variant.ruriCoin * item.quantity
      } else {
        outOfStockCount++
      }

      totalItems += item.quantity
    })
    
    return {
      subtotal,
      totalRuriCoin,
      totalItems,
      outOfStockCount,
      containsOutOfStock: outOfStockCount > 0,
    }
  }, [state.cart, getProductVariantDetails])

  const getDiscountedSubtotal = useCallback((coupon) => {
    if(!coupon) return cartTotals.subtotal

    const discountValue = coupon.type === 'percent' ? cartTotals.subtotal * (coupon.discount / 100) : coupon.discount

    return Math.max(0, cartTotals.subtotal - discountValue)
  }, [cartTotals.subtotal])

  const getCartCount = useCallback(() => {
    return state.cart.length
  }, [state.cart])

  const isItemInCart = useCallback((productId, variantId) => {
    return state.cart.some(item => item.productId === productId && item.variantId === variantId)
  }, [state.cart])

  const clearCart = useCallback(() => {
    dispatch({ type: ACTIONS.SET_CART, payload: [] })
  }, [dispatch])

  return {
    cart: state.cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getProductVariantDetails,
    cartTotals,
    getDiscountedSubtotal,
    getCartCount,
    isItemInCart,
  }
}