<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center">
                <img src="~/assets/img/check_circle.svg" alt="">
            </v-col>
            <v-col 
                cols="12"
                class="text-center"    
            >
                <h2 class="section-title">Orden confirmada</h2>
                <p>
                    ¡Gracias por tu compra! Haremos lo posible para que tu pedido llegué
                    lo antes posible

                </p>
            </v-col>
            <v-col cols="3">
            </v-col>
            <v-col cols="6" class="text-center">
                <v-btn
                    color="primary"
                    height="48"
                    elevation="0"
                    block
                    @click="backToHome"         
                >
                    Volver al inicio
                </v-btn>
                <div
                    class="py-8 text-center"
                >
                    <a @click="generatePdf()">Imprimir recibo</a>
                </div>
            </v-col>
            <v-col cols="3">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
    name: 'uiConfirmation',
    props: {
        name: String,
        shipAddress: String,
        shippingType: String
    },
    methods: {
        backToHome () {
            this.$router.push('/home')
        },
        generatePdf(){
            const doc = new JsPDF()

            

            doc.setFontSize(24)
            doc.text("Recibo de compra", 10, 24)
            doc.setLineWidth(0.5)
            
            doc.setFontSize(16)
            doc.text(`Nombre: ${this.name}`, 10, 60)
            doc.text(`Dirección de destino: ${this.shipAddress}`, 10, 70);
            doc.text(`Tipo de envío: ${this.shippingType}`, 10, 80)
            doc.save('recibo_orden.pdf');
        }
    }
}
</script>