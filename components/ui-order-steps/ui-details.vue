<template>
    <v-container>
        <div class="text-left pb-10">
            <h2 class="section-title py-4">Contacto</h2>
            <v-text-field
                v-model="userContact"
                label="Correo electrónico"
                outlined
                clearable
                hide-details
                :rules="[rules.required]"
            >
            </v-text-field>                    
        </div>
        <div class="text-left">
            <h2 class="section-title py-4">Dirección de entrega</h2>
            <v-form v-model="detailsForm">
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="name"
                            label="Nombre"
                            outlined
                            clearable
                            hide-details
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="lastName"
                            label="Apellido(s)"
                            outlined
                            clearable
                            hide-details
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="address"
                            label="Dirección y número"
                            outlined
                            clearable
                            hide-details
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="notes"
                            label="Notas adicionales (opcional)"
                            outlined
                            clearable
                            hide-details
                            :rules="[]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6" sm="12">
                        <v-text-field
                            v-model="country"
                            label="País/Región"
                            value="México"
                            outlined
                            hide-details
                            readonly
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6" sm="4">
                        <v-select
                            v-model="state"
                            label="Estado"
                            outlined
                            hide-details
                            :items="mex_states"
                            :rules="[rules.required]"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="6" sm="4">
                        <v-text-field
                            v-model="city"
                            label="Ciudad"
                            outlined
                            clearable
                            hide-details
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6" sm="4">
                        <v-text-field
                            v-model="postalCode"
                            type="number"
                            label="Código Postal"
                            outlined
                            clearable
                            hide-details="auto"
                            hide-spin-buttons
                            :rules="[rules.required, rules.pc_min]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6" class="pt-8">
                        <a 
                            class=""
                            @click="goToCart"
                        >
                            Regresar al carrito</a>
                    </v-col>
                    <v-col cols="6" class="pt-8">
                        <v-btn
                            color="primary"
                            height="48"
                            elevation="0"
                            block
                            :disabled="!detailsForm"
                            @click="$nuxt.$emit('changeStep', {
                                step: 3,
                                fullName: concatName(),
                                fullAddress: concatAddress(),
                                shipType: ''
                            })"
                        >
                            Ir a envío
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>    
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'uiDetails',
    data: () => ({
        detailsForm: false,
        name: '',
        lastName: '',
        notes: '',
        country: 'México',
        state: null,
        city: null,
        postalCode: null,
        fullAddress: "",
        mex_states: [
            "Aguascalientes",
            "Baja California",
            "Baja California Sur",
            "Campeche",
            "Chiapas",
            "Chihuahua",
            "Coahuila",
            "Colima",
            "Ciudad de México",
            "Durango",
            "Guanajuato",
            "Guerrero",
            "Hidalgo",
            "Jalisco",
            "México",
            "Michoacán",
            "Morelos",
            "Nayarit",
            "Nuevo León",
            "Oaxaca",
            "Puebla",
            "Querétaro",
            "Quintana Roo",
            "San Luis Potosí",
            "Sinaloa",
            "Sonora",
            "Tabasco",
            "Tamaulipas",
            "Tlaxcala",
            "Veracruz",
            "Yucatán",
            "Zacatecas"
        ],
        rules: {
            required: value => !!value || 'Campo requerido',
            pc_min: v => (v && v.length >= 5) || 'Al menos 5 caracteres'
        },
    }),
    mounted () {
        
    },
    methods: {
        goToCart () {
            this.$router.push('/my-cart')
        },
        concatName () {
            return `${this.name} ${this.lastName}`
        },
        concatAddress () {
            return `${this.address}, CP: ${this.postalCode}, ${this.city}, ${this.state}, ${this.country} `
        }

    }
}
</script>