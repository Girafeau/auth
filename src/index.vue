<template>
    <div>
        <authentication/>
    </div>
</template>

<script>
    import authentication from './components/authentication.vue';

    export default {
        name: 'index',
        components: {
            authentication
        }
    }
</script>

<style>
    @import './styles/main.css';
</style>
