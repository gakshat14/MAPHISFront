<script setup lang="ts">
export interface IProps {
    name: 'login' | 'register';
    heading: string;
}
const props = defineProps<IProps>();
</script>

<template>
    <div class="container">
        <div class="top-2">
            <aside>
                <h1 class="heading-text">MAPHIS</h1>
            </aside>
            <main class="card-container" :class="props.name === 'login' ? 'login-grad' : 'register-grad'">
                <article class="auth-card">
                    <h2>{{ props.heading }}</h2>
                    <slot></slot>
                </article>
                <slot name="footer"></slot>
            </main>
        </div>
    </div>
</template>

<style>
:root {
    --padding: 20px;
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
    padding: var(--padding);
    background: #fff;
}
.pure-form input.invalid {
    color: #b94a48;
    border-color: #e9322d;
}
.container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    padding: 0 250px;
}
div.top-2 {
    flex-grow: 1;
    display: flex;
    -webkit-box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
    -moz-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
    align-items: center;
    height: 100%;
    max-height: 40%;
}
aside {
    flex-grow: 2;
    display: flex;
    justify-content: center;
    height: 100%;
    background-image: url(/src/images/temp_back.jpg);
    align-items: center;
}
main {
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    max-width: 45%;
}
</style>
