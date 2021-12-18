<template>
    <div class="not-found">
        <h1>404 - <span class="slug">"{{ slug }}"</span> Not Found</h1>
        <p>
            Sorry, it appears that the page you are looking for no longer exists. <router-link :to="{ name: 'EventList' }">Click here to go home</router-link>
        </p>
        <p>
            Unfortunately, as the routing is performed by Vue, <strong>this page does not have a status code of 404.</strong>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'NotFound',
        data() {
            return {
                slug: null
            }
        },
        created() {
            this.slug = this.$route.path
        }
    }
</script>

<style scoped>
    .slug {
        font-style: italic;
    }
</style>