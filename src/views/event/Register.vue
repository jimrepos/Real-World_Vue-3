<template>
    <div v-if="event">
        <p>Register for the event here...</p>
        <button @click="register">Submit Details</button>
    </div>
</template>

<script>
    export default {
        name: 'EventRegister',
        props: ['event'],
        inject: ['GStore'],
        methods: {
            register() {
                // Set up a flash message
                this.GStore.flashMessage = 'You are successfully registered for ' + this.event.title;

                setTimeout(() => {
                    this.GStore.flashMessage = '';
                }, 3000);

                // Redirect back to the event details page (should be once successfully submitted)
                this.$router.push({
                    name: 'EventDetails',
                    params: {
                        id: this.event.id
                    }
                });
            }
        }
    }
</script>

<style scoped>
    button {
        background: #42b983;
        border: 1px solid #028953;
        border-radius: 5px;
        color: #fff;
        font-size: 1.2em;
        padding: 0.8em 1.5em;
        margin: 2em 0;
        cursor: pointer;
        font-weight: bold;
        text-shadow: 2px 2px 0px rgba(0,0,0,0.3);
        box-shadow: 0px 8px 15px rgba(0,0,0,0.3);
    }
</style>