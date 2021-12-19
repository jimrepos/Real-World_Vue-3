<template>
    <div v-if="event">
        <p>Edit the event here...</p>
    </div>
</template>

<script>
    export default {
        name: 'EventDetails',
        props: ['event'],
        data() {
            return {
                unsavedChanges: true
            }
        },
        beforeRouteLeave(routeTo, routeFrom, next) {
            if (this.unsavedChanges) {
                const answer = window.confirm('Are you sure you want to leave? You have unsaved changes.');
                if (answer) {
                    next();
                } else {
                    next(false);
                }
            } else {
                next();
            }
        }
    }
</script>