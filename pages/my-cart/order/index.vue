<template>
    <v-row>
            <v-col class="px-12">
                <v-stepper 
                    v-model="orderSteps" 
                    alt-labels
                    elevation="0"
                >
                    <v-stepper-header>
                        <v-stepper-step class="pl-3" :complete="orderSteps > 1" step="1">
                            Carrito
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="orderSteps > 2" step="2">
                            Detalles
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="orderSteps > 3" step="3">
                            Envío
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step class="pr-3" :complete="orderSteps > 4" step="4">
                            Pago
                        </v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="2">
                            <ui-details />
                        </v-stepper-content>
                        <v-stepper-content step="3">
                            <ui-shipping :shipAddress="fullAddress" :name="fullName"/>
                        </v-stepper-content>
                        <v-stepper-content step="4">
                            <ui-payment :shipAddress="fullAddress" :shippingType="shipping" :name="fullName"/>
                        </v-stepper-content>
                        <v-stepper-content step="5">
                            <ui-confirmation :shipAddress="fullAddress" :shippingType="shipping" :name="fullName"/>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-col>
            <v-divider
                vertical
                class="hidden-sm-and-down"
            >
            </v-divider>
            <v-col class="hidden-sm-and-down" style="background-color: #F2F2F2;">
                <ui-receipt :shippingType="shipping"/>
            </v-col>
        </v-row>
</template>

<script>

import uiReceipt from '~/components/ui-order-steps/ui-receipt.vue'
import uiDetails from '~/components/ui-order-steps/ui-details.vue'
import uiShipping from '~/components/ui-order-steps/ui-shipping.vue'
import uiPayment from '~/components/ui-order-steps/ui-payment.vue'
import uiConfirmation from '~/components/ui-order-steps/ui-confirmation.vue'

export default {
    layout: 'order',
    components: {
        uiReceipt,
        uiDetails,
        uiShipping,
        uiPayment,
        uiConfirmation
    },
    data: () => ({
        orderSteps: 2,
        fullName: '',
        fullAddress: '',
        shipping: ''
    }),
    created () {
        this.$nuxt.$on('changeStep', ($event) => this.nextStep($event))
    },
    methods: {
        nextStep(data){
            console.log('TEST >>', data)
            this.orderSteps = data.step
            this.fullName = data.fullName
            this.fullAddress = data.fullAddress
            this.shipping = data.shipType
            console.log(this.fullAddress)
            
        }
    }
}
</script>

<style>

</style>