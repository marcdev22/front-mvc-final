<template>
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        :color="snackColor"
    >
        {{ text }}
        <v-btn
            color="primary"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
            Cerrar
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    name: 'uiSnackbar',
    data: () => ({
        snackbar: false,
    }),
    props: {
        attrs: {
            type: Object,
            default: () => ({})
        },
        snackColor: {
            type: String,
            default: 'info'
        },
        text: {
            type: String,
            required: true
        },
        timeout: {
            type: Number,
            default: 5000
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value(val) {
            this.snackbar = val;
        },
        snackbar(val) {
            this.$emit('input', val);
        }
    },
    mounted() {
        this.snackbar = this.value;
    }
}
</script>