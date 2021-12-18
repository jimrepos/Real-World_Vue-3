<template>
    <div class="not-found">
        <h1>404 - {{ resource }} at <span class="slug">"{{ slug }}"</span> Not Found</h1>
        <p>
            Sorry, it appears that the page you are looking for no longer exists. <router-link :to="{ name: 'EventList' }">Back to the home page</router-link>
        </p>
        <p>
            Unfortunately, as the routing is performed by Vue, <strong>this page does not have a status code of 404.</strong>
        </p>
    </div>
</template>

<script>
    import { watchEffect } from 'vue'

    export default {
        name: 'NotFound',
        props: {
            resource: {
                type: String,
                required: true,
                default: 'page'
            }
        },
        data() {
            return {
                slug: null
            }
        },
        created() {
            watchEffect(() => {
                this.slug = this.$route.path
            })
        }
    }
</script>

<style scoped>
    .slug {
        font-style: italic;
    }
</style>