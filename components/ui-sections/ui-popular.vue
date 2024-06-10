<template>
    <v-container class="py-10">
        <h2 class="section-title text-center">Popular</h2>
        <p class="text-center">Nuestros productos más vendidos</p>
        <v-row class="products-container">
            <v-col
                v-for="(item, index) in products"
                :key="index"
                class="item-container"
            >
                <v-item>
                    <v-card
                        color=""  
                        height="400"
                        class="d-flex flex-column"
                        @click="goToProductDetails(item.id)"
                    >
                        <v-container class="px-4 pt-4">
                            <img
                                width="232"
                                height="232"
                                class="" 
                                :src="require(`@/assets/img/products/${item.img}`)"
                                alt=""
                            >
                            <v-card-text class="bold">
                                <h5 class="text-h5" >{{ item.name }}</h5>
                            </v-card-text>
                        </v-container>
                        <div class="d-flex justify-end align-end mt-auto pb-2 px-8 ">
                            <h6 class="text-h6 item-price" >$ {{ item.price }}</h6>
                        </div>    
                    </v-card>
                </v-item>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'uiPopular',
    data: () => ({
        products: [
            { id: 6, name: 'Kirby Norteño', price: 250, img: '6.jpg' },
            { id: 7, name: 'Majoras Mask', price: 250, img: '7.jpg' },
            { id: 9, name: 'Team Rocket', price: 250, img: '9.jpg' },
            { id: 2, name: 'Self Love Ducks', price: 250, img: '2.jpg' }
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
.products-container{
    flex-wrap: wrap;
    justify-content: center;
}

.item-container{
    max-width: 18rem; /*284px, 250px*/
    flex-basis: 16.5rem;
    flex-grow: 1;
}

.item-price{
    color: #56B280;
}
</style>