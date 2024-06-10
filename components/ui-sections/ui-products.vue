<template>
    <v-container class="py-10">
        <h2 class="section-title text-center">Products</h2>
        <p class="text-center">Ordena para ti o para tus seres queridos</p>
        <v-row class="products-container">
            <v-col
                v-for="(product, index) in products"
                :key="index"
                class="item-container"
            >
                <v-item> 
                    <v-card
                        color=""
                        height="400"
                        class="d-flex flex-column"
                        @click="goToProductDetails(product.id)"
                    >
                        <v-container class="px-4 pt-4">
                            <img
                                width="232"
                                height="232"
                                class="" 
                                :src="require(`@/assets/img/products/${product.img}`)"
                                alt=""
                            />
                            <v-card-text class="bold">
                                <h5 class="text-h5" >{{ product.name }}</h5>
                            </v-card-text>
                        </v-container>  
                        <div class="d-flex justify-end align-end mt-auto pb-2 px-8 ">
                            <h6 class="text-h6 item-price" >$ {{ product.price }}</h6>
                        </div>
                    </v-card>
                </v-item>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'uiProducts',
    data: () => ({
        products: [
            { id: 1, name: 'Pikachu 64', price: 250, img: '1.jpg' },
            { id: 2, name: 'Self Love Ducks', price: 250, img: '2.jpg' },
            { id: 3, name: 'Pochita', price: 250, img: '3.jpg' },
            { id: 4, name: 'GB Gengar', price: 250, img: '4.jpg' },
            { id: 5, name: 'EVA OXXO', price: 200, img: '5.jpg' },
            { id: 6, name: 'Kirby Norteño', price: 250, img: '6.jpg' },
            { id: 7, name: 'Majoras Mask', price: 250, img: '7.jpg' },
            { id: 8, name: 'Mi Hyliano Favorito', price: 250, img: '8.jpg' },
            { id: 9, name: 'Team Rocket', price: 250, img: '9.jpg' },
            { id: 10, name: 'Squirtle Squad', price: 250, img: '10.jpg' }
        ]
    }),
    methods: {
        goToProductDetails (productId) {
            //this.$router.push('/product')
            console.log("PRODUCT ID: ", productId)
            this.$router.push(`/product/${productId}`)
        }
    }

}
</script>

<style>
.section-title{
    font-family: 'Poppins', 'sans-serif';
}
</style>