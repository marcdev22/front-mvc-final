<template>
    <v-app>
        <v-app-bar
            app
            elevation="4"
            class="px-12"
        >  
            <img 
                src="@/assets/img/acid-pop-dark.png" 
                width="168" 
                height="27" 
                alt=""
                class="img-logo" 
                @click="goToHome"
            />
            <v-spacer />
            <v-list 
                color="transparent" 
                class="d-flex justify-space-between py-0"
                flat
            >
                <v-list-item-group class="d-flex align-center">
                    <v-list-item
                        link
                        v-for="(item, index) in navMenu"
                        :key="index"
                        class="mx-2 hidden-sm-and-down"
                        @click="$vuetify.goTo(item.target, options)"
                    >
                        <v-list-item-title class="font-weight-bold">{{item.title}}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
                <v-menu
                    origin="center center"
                    transition="scale-transition"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            color="background"
                            icon
                        >
                            <v-icon>mdi-account-outline</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in userOptions"
                            :key="index"
                            :style="item.action === 'logout' ? 'color: red;' : ''"
                            @click="handleUserOptionClick(item.action)"
                        >
                            <v-list-item-content>
                                <div class="d-flex">
                                    <v-icon left v-html="item.icon"></v-icon>
                                    <v-list-item-title v-html="item.title"></v-list-item-title>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-btn 
                    color="background" 
                    icon
                    @click="goToCart"
                >
                    <v-icon>mdi-cart-outline</v-icon>
                </v-btn>
            </v-list>
        </v-app-bar>
        <v-main>
            <Nuxt />
        </v-main>
        <v-footer 
            color="background" 
            padless
            class="px-12"
        >
            <v-row class="mx-0 my-0">
                <v-col
                    cols="12"
                    sm="6"
                    class="d-flex align-center justify-center "
                >
                    <img 
                        src="@/assets/img/acid-pop-light.png" 
                        width="168" 
                        height="27" 
                        alt=""
                        class="img-logo" 
                        @click="goToHome"
                    />
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    class="text-center"
                >
                <v-btn
                    v-for="(item, index) in footerMenu"
                    :key="index"
                    color="white"
                    text
                    rounded
                    class="my-2"
                >
                    {{ item.title }}
                </v-btn>
                </v-col>
            </v-row>
        </v-footer>
        <uiSnackbar
            v-model="snackbar"
            :text="snackbarText"
            :color="snackbarColor"
            :timeout="3000"
        />
    </v-app>
</template>

<script>
import uiSnackbar from "@/components/ui-components/ui-snackbar";

export default {
    name: 'home',
    components: {
        uiSnackbar
    },
    data(){
        return {
            navMenu: [
                {title: 'Productos', target: "#products"},
                {title: 'Opiniones', target: "#opinions"},
                {title: 'Populares', target: "#popular"}
            ],
            defaultOptions: [
                { title: 'Iniciar sesión', icon: 'mdi-login', action: 'goToLogin' }
            ],
            loggeduserOptions: [
                { title: 'Editar cuenta', icon: 'mdi-account-cog-outline', action: 'logout' },
                { title: 'Cerrar sesión', icon: 'mdi-logout', action: 'logout' }
            ],
            footerMenu: [
                { title: 'Acerca de', },
                { title: 'Contacto' },
                { title: 'Términos'}
            ],
            snackbar: false,
            snackbarText: '',
            snackbarColor: 'info',
            userOptions: [],
        }
    },
    created () {
        this.updateOptions()
    },
    methods: {
        updateOptions() {
            if (typeof localStorage !== 'undefined') {
                const token = localStorage.getItem("token");
                this.userOptions = token ? this.loggeduserOptions : this.defaultOptions;
            }
        },
        goToHome () {
            this.$router.push('/home')
        },
        goToLogin () {
            this.$router.push('/')
        },
        goToCart () {
            this.$router.push('/my-cart')
            this.scrollToTop();
        },
        logout() {
            const token = localStorage.getItem("token");
            if (!token) {
                this.snackbarText = "No token found. Please log in first.";
                this.snackbarColor = "red";
                this.showSnackbar();
                this.$router.push("/");
                return;
            }

            const url = "/logout";
            this.$axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.removeItem("token");
                    this.$router.push("/");
                    this.snackbarText = "Logout successful.";
                    this.snackbarColor = "green";
                    this.showSnackbar();
                    this.updateOptions(); // Update options after logout
                }
            })
            .catch((err) => {
                this.snackbarText = "Logout failed. Please try again.";
                this.snackbarColor = "red";
                this.showSnackbar();
            });
        },
        showSnackbar() {
            this.snackbar = true;
            setTimeout(() => {
                this.snackbar = false;
            }, 3000); // Close the snackbar after 3 seconds
        },
        updateSnackbar(message, color) {
            this.snackbarText = message;
            this.snackbarColor = color;
            this.showSnackbar();
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Desplazamiento suave
            });
        },
        handleUserOptionClick(action) {
            if (action === 'logout') {
                this.logout();
            } else if (action === 'goToLogin') {
                this.goToLogin();
            }
        }
    },
    watch: {
        // Watch for changes in localStorage to update options dynamically
        userOptions: {
            handler() {
                this.updateOptions();
            },
            immediate: true
        }
    }
}
</script>

<style>
.img-logo:hover{
    cursor: pointer;
}
</style>