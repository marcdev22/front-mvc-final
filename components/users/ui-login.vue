<template>
    <v-card width="348" flat class="py-10">
        <v-container>
            <v-card-text class="text-center">
                <img src="~/assets/img/acid-pop-dark.png" width="224" height="36" alt="">
                <h6 class="text-h6 py-4">
                    Bienvenido de nuevo
                </h6>
            </v-card-text>
            <v-form>
                <v-text-field
                    v-model="loginEmail"
                    label="Correo electrónico"
                    hint="example@email.com"
                    color="primary"
                    :rules="[rules.required]"
                    outlined
                    clearable
                >
                </v-text-field>
                <v-text-field
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="loginPassword"
                    label="Contraseña"
                    color="primary"
                    :type="showPass ? 'text' : 'password'"
                    :rules="[rules.required, rules.min]"
                    @click:append="showPass = !showPass"
                    outlined
                    clearable
                >
                </v-text-field>
            </v-form>
            <v-card-actions>
                <v-btn
                    height="48"
                    color="primary"
                    block
                    depressed
                    @click="loginUser"
                >
                    <span style="color: white;">Entrar</span>
                </v-btn>
            </v-card-actions>
            <v-card-text class="text-center">
                ¿No tienes una cuenta?
                <a color="primary" @click="signupDialog=true">Regístrate aquí</a>
            </v-card-text>
            <v-card-actions>
                <v-row>
                    <v-col>
                        <v-btn
                            color="secondary"
                            height="48"
                            class="mb-3" 
                            block
                            depressed
                        >
                            <div class="d-flex align-center">
                                <img src="~/assets/icons/google_logo.svg" width="24" alt="" srcset="">
                                <span class="mx-2 grey--text">
                                    Iniciar con Google
                                </span>
                            </div>
                        </v-btn>
                        <v-btn
                            color="secondary" 
                            height="48"
                            block
                            depressed
                            
                        >
                            <div class="d-flex align-center">
                                <img left src="~/assets/icons/microsoft_logo.svg" width="24" alt="" srcset="">
                                <span class="mx-2 grey--text">
                                    Iniciar con Microsoft
                                </span>
                            </div>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-container>
        <!--Sign Up Dialog-->
        <v-dialog
            v-model="signupDialog"
            width="448"
            persistent
        >
            <v-card width="448"  flat>
                <v-btn
                    icon
                    @click="signupDialog=false"
                >
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
                <v-container class="px-12">
                    <h2 class="text-center pb-8">Crea una nueva cuenta</h2>
                    <v-form>
                        <v-text-field
                            v-model="signupEmail"
                            label="Correo electrónico"
                            hint="example@email.com"
                            outlined
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="signupPassword"
                            label="Nueva contraseña"
                            color="primary"
                            hint="Al menos 8 caracteres"
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text' : 'password'"
                            :rules="[rules.required, rules.min]"
                            @click:append="showPass = !showPass"
                            outlined
                            clearable
                            counter
                        >
                        </v-text-field>
                    </v-form>
                    <v-checkbox v-model="checkTerms">
                        <template v-slot:label>
                            <div>
                                Estoy de acuerdo con los
                                <a href="">
                                    Términos y condiciones
                                </a>
                            </div>
                        </template>
                    </v-checkbox>
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            height="48"
                            block
                            depressed
                            :disabled="!checkTerms"
                            @click="addUser"
                        >
                            <span style="color: white;">Registrarme</span>
                        </v-btn>
                    </v-card-actions>

                </v-container>
            </v-card>
        </v-dialog>
        <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            top
            right
            timeout="3000"
        >
            {{ snackbar.message }}
            <v-btn color="white" text @click="snackbar.show = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-card>
</template>

<script>
export default {
    data () {
        return {
            loginEmail: null,
            loginPassword: null,
            signupEmail: null,
            signupPassword: null,
            signupDialog: false,
            showPass: false,
            checkTerms: false,
            snackbar: {
                show: false,
                message: "",
                color: "",
            },
            rules: {
                required: value => !!value || 'Campo requerido',
                min: v => (v && v.length >= 8) || 'Al menos 8 caracteres'
            }
        }
    },
    methods: {
        loginUser () {
            // this.$router.push('/home')
            
            const sendData = {
                email: this.loginEmail,
                password: this.loginPassword,
            };
            const url = "/login";
            this.$axios.post(url, sendData)
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    this.$router.push("/home");
                }
            })
            .catch((err) => {
                this.showSnackbar("Login failed. Please check your credentials.", "red");
            });
            
        },
        addUser () {
            // this.signupDialog = false
            console.log('¿JALA?')
            const sendData = {
                id: Date.now().toString(),
                email: this.signupEmail,
                password: this.signupPassword,
            };
            const url = "/signup";
            this.$axios.post(url, sendData)
            .then((res) => {
                if (res.data.message === "Usuario Registrado Satisfactoriamente") {
                    this.showSnackbar(res.data.message, "green");
                    this.signupDialog = false;
                }
            })
            .catch((err) => {
                this.showSnackbar("User not registered, something went wrong", "red");
            });
        }
    },
    showSnackbar(message, color) {
        this.snackbar.show = true;
        this.snackbar.message = message;
        this.snackbar.color = color;
    },
}
</script>