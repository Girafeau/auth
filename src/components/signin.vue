<template>

    <section class="hero is-medium">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-4">

                        <form v-on:submit.prevent="authorize">


                          <div class="field has-text-centered">
                              <img src="mouton.png" />
                          </div>


                            <div class="field">
                                <h1 class="title is-medium has-text-centered">Connectez-<span class="has-text-link">vous</span>.</h1>
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
                                    <button type="submit" class="button  is-fullwidth is-medium is-link">Continuer</button>
                                </div>
                            </div>

                            <hr/>

                            <div class="field">
                                <p class="">Vous n'avez pas de compte ? <router-link to="/signup">Créez un compte.</router-link></p>
                            </div>



                        </form>

                    </div>
                </div>


            </div>
        </div>
    </section>
</template>

<script>
    import * as POST from '../api/post';

    const params = new URLSearchParams(window.location.search);

    export default {
        name: 'signin',
        data: function () {
            return {
                user: {
                    email: '',
                    password: ''
                },
                request: {
                    client_id: params.get('client_id'),
                    redirect_uri: params.get('redirect_uri'),
                    response_type: params.get('response_type'),
                    grant_type: params.get('grant_type'),
                    state: params.get('state')
                },
                hide: true
            }
        },
        methods: {
            authorize: async function () {
                const user = this.user;
                const request = this.request;
                const object = JSON.parse(JSON.stringify({
                    user: user,
                    request: request
                }));
                const response = await POST.authorize(object);
                if (response.success) {
                    const url = new URL(response.redirect_uri);
                    url.searchParams.append('authorization_code', response.authorization_code);
                    url.searchParams.append('state', response.state);
                    window.location.href = url.toString();
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
