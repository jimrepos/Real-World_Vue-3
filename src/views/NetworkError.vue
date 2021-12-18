<template>
    <div class="networkError">
        <h1>Uh-Oh!</h1>
        <p>
            Looks like you're having some network issues, please <a href="#" @click="$router.go(-1)">click here</a> and try again.
        </p>
    </div>
</template>