<script setup lang="ts">
export interface IProps {
    name: 'login' | 'register';
    heading: string;
}
const props = defineProps<IProps>();
</script>

<template>
    <div class="container">
        <main>
            <article class="auth-card">
                <h2>{{ props.heading }}</h2>
                <slot></slot>
            </article>
            <slot name="footer"></slot>
        </main>
        <aside>
            <h1 class="heading-text">MAPHIS</h1>
        </aside>
    </div>
</template>

<style>
:root {
    --padding: 20px;
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
    flex-direction: row-reverse;
    flex-wrap: wrap-reverse;
}
aside {
    background-image: url(@/images/temp_back.jpg);
    height: 100vh;
    flex-grow: 4;
    display: flex;
    justify-content: center;
    align-items: center;
}
main {
    flex-grow: 1;
    flex-basis: 30vw;
}
</style>
