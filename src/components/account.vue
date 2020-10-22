<template>

    <section class="hero is-medium">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-4">

                        <form>


                            <div class="field has-text-centered">
                                <img src="mouton.png" />
                            </div>


                            <div class="field">
                                <h1 class="title is-medium has-text-centered">Créez simplement un <span class="has-text-link">compte</span>.</h1>
                            </div>
                            <hr/>

                            <div class="field">
                                <label class="label">Adresse e-mail</label>
                                <div class="control">
                                    <input v-model="user.email" class="input is-medium" type="email"
                                           placeholder="michel@gmail.com">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Mot de passe</label>
                                <div class="control has-icons-right">
                                    <input v-model="user.password" class="input is-medium"
                                           v-bind:type="hide ? 'password' : 'text'"
                                           placeholder="...">
                                    <span v-on:click="display" class="icon is-small is-right pointer">
                                        <i v-if="hide" class="far fa-eye-slash"></i>
                                        <i v-else class="far fa-eye"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field has-margin-top has-text-centered">
                                <div class="control">
                                    <button type="submit" class="button  is-fullwidth is-medium is-link">Créer un compte</button>
                                </div>
                            </div>

                            <hr/>

                            <div class="field">
                                <p class="">Vous avez déjà un compte ? <router-link to="/">Connectez-vous ici.</router-link></p>
                            </div>

                        </form>

                    </div>
                </div>


            </div>
        </div>
    </section>
</template>

<script>
    import * as POST from "../api/post";

    export default {
        name: 'account',
        data: function () {
            return {
                user: {
                    email: '',
                    password: ''
                },
                hide: true
            }
        },
        methods: {
            create: async function() {
                const user = this.user;
                const response = await POST.create(user);
                if(response.success) {
                    console.log(response);
                } else {
                    console.log(response);
                }
            },
            display: function () {
                this.hide = !this.hide;
            }
        }
    }
</script>