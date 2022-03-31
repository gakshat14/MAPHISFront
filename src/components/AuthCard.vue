<script setup lang="ts">
interface IProps {
    name: 'login' | 'register';
}
const props = defineProps<IProps>();
</script>

<template>
    <article class="auth-card">
        <slot name="heading"></slot>
        <slot></slot>
    </article>
    <div class="footer">
        <slot name="footer"></slot>
    </div>
</template>

<style>
body {
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background: url(../assets/register.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    backdrop-filter: blur(3.7px);
}
article.auth-card {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 30%;
    -webkit-box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
    -moz-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
    padding: 20px;
    background: #fff;
}
</style>
