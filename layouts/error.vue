<template>
    <v-app dark>
        <v-container class="error-container">
            <img src="~/assets/img/dino_error.png"  width="420" height="420" alt="">
            <h1 v-if="error.statusCode === 404">
                {{ pageNotFound }}
            </h1>
            <h1 v-else>
                {{ otherError }}
            </h1>
            <NuxtLink to="/home"> Regresar al inicio </NuxtLink>
        </v-container>
    </v-app>
</template>
  
<script>
  export default {
    name: 'EmptyLayout',
    layout: 'empty',
    props: {
      error: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        pageNotFound: '404 Not Found',
        otherError: 'An error occurred',
      }
    },
    head() {
      const title =
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError
      return {
        title,
      }
    },
  }
  </script>
  
  <style scoped>
  h1 {
    font-size: 2rem;
    color: #56B280;
  }

  .error-container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>