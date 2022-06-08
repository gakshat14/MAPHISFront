<script setup lang="ts">
console.log('In home');
</script>
<template>
    <header class="wrapper">
        <nav>
            <h1 id="logo">MAPHIS</h1>
            <ul id="navigation-container">
                <li><a href="">Home</a></li>
                <li><a href="">Mission</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="">About</a></li>
                <li id="login-button-container"><button type="button">Login</button></li>
            </ul>
        </nav>
        <div id="background">
            <img class="reduced-image" src="../images/Example_FM.png" alt="" />
            <img src="../images/Map_BG_2.png" alt="" />
        </div>
    </header>
    <main style="height: 100vh"></main>
</template>
<style>
header.wrapper {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
}
div#background {
    display: flex;
    flex-direction: column;
    z-index: 0;
    transform: rotate(-40deg);
    position: absolute;
    width: 86vw;
    left: 1.3rem;
}
div#background img:nth-child(2) {
    margin-top: 30px;
}
img.reduced-image {
    opacity: 0.4;
    transform: translate(-35rem, 10px);
}
</style>
