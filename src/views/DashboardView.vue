<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import LogoutButton from '../components/LogoutButton.vue';
import LeafLet from '../components/LeafLet.vue';

const user = useUserStore();
</script>

<template>
    <section class="dashboard-container">
        <div class="dashboard-menu">
            <header><h1>Maphis</h1></header>
            <main>all the controls will come here</main>
            <footer>
                <LogoutButton />
            </footer>
        </div>
        <div class="dashboard-application">
            <LeafLet />
        </div>
    </section>
</template>

<style>
section.dashboard-container {
    display: inline-flex;
    height: 100vh;
    width: 100vw;
}
div.dashboard-menu {
    flex-grow: 1;
    border-right: solid 1px #d5d5d5;
    display: flex;
    flex-direction: column;
}
div.dashboard-menu header {
    flex-grow: 0.1;
}
div.dashboard-menu main {
    flex-grow: 4;
}
div.dashboard-menu footer {
    flex-grow: 0.1;
    border-top: 1px solid #d5d5d5;
}
div.dashboard-application {
    flex-grow: 3;
}
header,
main,
footer {
    padding: 1px 5px;
}
</style>
