<template>

    <section class="hero is-large">
        <div class="hero-body">
            <div class="container">
                <div class="columns">
                    <div class="column">

                        <form v-on:submit.prevent="authorize">



                            <div class="field">
                                <h1 class="title is-medium">Connectez-vous.</h1>
                                <p class="has-text-link">Saisissez vos informations de connexion pour accéder au service.</p>
                            </div>

                            <hr/>

                            <div class="field">
                                <label class="label">Adresse email</label>
                                <div class="control">
                                    <input v-model="user.email" class="input is-medium is-link" type="email"
                                           placeholder="jeanmichel@gmail.com">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Mot de passe</label>
                                <div class="control has-icons-right">
                                    <input v-model="user.password" class="input is-medium is-link"
                                           v-bind:type="hide ? 'password' : 'text'"
                                           placeholder="ça ne nous regarde pas">
                                    <span v-on:click="display" class="icon is-small is-right pointer">
                                        <i v-if="hide" class="far fa-eye-slash"></i>
                                        <i v-else class="far fa-eye"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <p></p>
                            </div>

                            <div class="field has-margin-top">
                                <div class="control">
                                    <button type="submit" class="button is-medium is-link is-light">Continuer</button>
                                </div>
                            </div>

                        </form>

                    </div>

                    <div class="column">
                      
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
        name: 'authentication',
        props: {
            msg: String
        },
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
                    window.location.href = url.toString();
                } else {
                    console.log(response)
                }
            },
            display: function () {
                this.hide = !this.hide;
            }
        }
    }
</script>
