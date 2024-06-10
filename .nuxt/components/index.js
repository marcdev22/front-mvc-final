export { default as UiSnackbar } from '../..\\components\\ui-components\\ui-snackbar.vue'
export { default as UsersUiLogin } from '../..\\components\\users\\ui-login.vue'
export { default as UiBanner } from '../..\\components\\ui-sections\\ui-banner.vue'
export { default as UiPopular } from '../..\\components\\ui-sections\\ui-popular.vue'
export { default as UiProducts } from '../..\\components\\ui-sections\\ui-products.vue'
export { default as UiTestimonials } from '../..\\components\\ui-sections\\ui-testimonials.vue'
export { default as UiConfirmation } from '../..\\components\\ui-order-steps\\ui-confirmation.vue'
export { default as UiDetails } from '../..\\components\\ui-order-steps\\ui-details.vue'
export { default as UiPayment } from '../..\\components\\ui-order-steps\\ui-payment.vue'
export { default as UiReceipt } from '../..\\components\\ui-order-steps\\ui-receipt.vue'
export { default as UiShipping } from '../..\\components\\ui-order-steps\\ui-shipping.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
