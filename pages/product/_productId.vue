<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12" sm="6" class="d-flex align-center">
        <v-img
          v-if="product"
          :width="480"
          :src="require(`~/assets/img/products/${product.image}.jpg`)"
        ></v-img>
        <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
      </v-col>
      <v-col cols="12" sm="6" class="px-6">
        <h4 v-if="product" class="text-h4">{{ product.name }}</h4>
        <h6 v-if="product" class="text-h4 font-weight-medium pt-4 pb-10 price-text">
          $ {{ product.price }}
        </h6>
        <v-form>
          <v-row>
            <v-col cols="12">
              <span v-if="product" class="font-weight-medium">{{ product.details }}</span>
            </v-col>
            <v-col cols="12">
              <span class="font-weight-medium">Cantidad:</span>
            </v-col>
            <v-col cols="5" md="4" lg="3">
              <v-text-field
                v-model="shirtCount"
                type="number"
                prepend-inner-icon="mdi-plus"
                append-icon="mdi-minus"
                class="centered-input"
                :rules="[rules.count]"
                hide-spin-buttons
                outlined
                dense
                readonly
                @click:prepend-inner="addCount"
                @click:append="reduceCount"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                color="primary"
                height="48"
                block
                depressed
                :disabled="!product"
                @click="addToCart"
              >
                <v-icon left>mdi-cart</v-icon>
                Añadir al carrito
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDetails',
  layout: 'home',
  data() {
    return {
      product: null,
      shirtCount: 1,
      rules: {
        count: value => value > 0 && value <= 10 || 'Cantidad debe ser entre 1 y 10'
      }
    };
  },
  async created() {
    try {
      const productId = this.$route.params.productId;
      const url = `http://localhost:6010/product/${productId}`;
      const response = await axios.get(url);
      this.product = response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      this.showSnackbar('Error fetching product details', 'red');
    }
  },
  methods: {
    async addToCart() {
      const productId = this.product.image;
      const quantity = this.shirtCount;

      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        console.log("Token:", token);

        const headers = { Authorization: `Bearer ${token}` };

        // Check if the cart exists
        console.log("Checking if cart exists...");
        let cartResponse = await axios.get("http://localhost:6010/cart", { headers });
        console.log("Cart response:", cartResponse.data);
        if (cartResponse.data.message === 'Cart not found') {
          // Cart does not exist, create an empty one
          console.log("Cart not found, creating an empty one.");
          await axios.post("http://localhost:6010/cart/create", {}, { headers });
          cartResponse = await axios.get("http://localhost:6010/cart", { headers });
        }

        const cartItems = cartResponse.data.cart.items;
        const existingItem = cartItems.find(item => item.productId === productId);

        if (existingItem) {
          // Product exists in cart, so update quantity
          await this.updateItemQuantity(productId, quantity + existingItem.quantity);
        } else {
          // Product doesn't exist in cart, so add it
          await this.addItemToCart(productId, quantity);
        }

        this.showSnackbar('Item added to cart successfully', 'green');
      } catch (error) {
        console.error('Error adding to cart:', error);
        this.showSnackbar('Error adding item to cart', 'red');
      }
    },
    async addItemToCart(productId, quantity) {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const headers = { Authorization: `Bearer ${token}` };
      const url = "http://localhost:6010/cart/add";
      const data = { productId, quantity };

      try {
        await axios.post(url, data, { headers });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        this.showSnackbar('Error adding item to cart', 'red');
      }
    },
    async updateItemQuantity(productId, quantity) {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const headers = { Authorization: `Bearer ${token}` };
      const url = "http://localhost:6010/cart/update";
      const data = { productId, quantity };

      try {
        await axios.post(url, data, { headers });
      } catch (error) {
        console.error('Error updating item quantity:', error);
        this.showSnackbar('Error updating item quantity', 'red');
      }
    },
    addCount() {
      if (this.shirtCount < 10) {
        this.shirtCount += 1;
      }
    },
    reduceCount() {
      if (this.shirtCount > 1) {
        this.shirtCount -= 1;
      }
    },
    showSnackbar(message, color) {
      console.log(message, color);
    }
  }
};
</script>

<style>
.text-h4 {
  font-family: 'Poppins', 'sans-serif';
}

.price-text {
  color: #56B280;
}

.centered-input input {
  text-align: center;
}
</style>
