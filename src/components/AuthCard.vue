<script setup lang="ts">
interface IProps {
    name: 'login' | 'register';
    heading: string;
}
const props = defineProps<IProps>();
</script>

<template>
    <div class="card-container" :class="props.name === 'login' ? 'login-grad' : 'register-grad'">
        <article class="auth-card">
            <h1>{{ props.heading }}</h1>
            <slot></slot>
        </article>
        <slot name="footer"></slot>
    </div>
</template>

<style>
:root {
    --padding: 20px;
    --width: 33%;
}
div.card-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
}

div.card-container.login-grad {
    background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
}

div.card-container.register-grad {
    background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
}

article.auth-card {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: var(--width);
    -webkit-box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
    -moz-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
    padding: var(--padding);
    background: #fff;
}
.pure-form input.invalid {
    color: #b94a48;
    border-color: #e9322d;
}
</style>
