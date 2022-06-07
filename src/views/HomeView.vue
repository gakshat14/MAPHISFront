<script setup lang="ts">
console.log('In home');
</script>
<template>
    <header>
        <nav>
            <h1 id="logo">MAPHIS</h1>
            <ul id="navigation-container">
                <li><a href="">Home</a></li>
                <li><a href="">Mission</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Login</a></li>
            </ul>
        </nav>
        <div id="background">
            <img src="../images/Example_FM.png" alt="" />
            <img src="../images/Map_BG_2.png" alt="" />
        </div>
    </header>
    <main></main>
    <footer></footer>
</template>
<style>
nav {
    display: flex;
    justify-content: space-between;
}
#logo {
    flex-grow: 1;
}
#navigation-container {
    display: flex;
    flex-grow: 2;
    justify-content: space-between;
    align-items: center;
}
#navigation-container li {
    list-style: none;
}
#navigation-container a {
    text-decoration: none;
}
div#background {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    height: 100vh;
    z-index: 0;
    transform: rotate(-40deg);
    position: relative;
}
div#background img:nth-child(2) {
    margin-top: 30px;
}
</style>
