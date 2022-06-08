<script setup lang="ts">
console.log('In home');
</script>
<template>
    <div class="wrapper">
        <div id="content">
            <header>
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
            </header>
        </div>
        <div id="background">
            <img class="reduced-image" src="../images/Example_FM.png" alt="" />
            <img src="../images/Map_BG_2.png" alt="" />
        </div>
    </div>
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
    flex-grow: 1;
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
    z-index: 0;
    transform: rotate(-40deg);
    position: absolute;
    width: 86vw;
    left: 1.3rem;
}
div#background img:nth-child(2) {
    margin-top: 30px;
}
div.wrapper {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
}
img.reduced-image {
    opacity: 0.4;
    transform: translate(-35rem, 10px);
}
header {
    padding: 0 30px;
}
li#login-button-container button {
    color: white;
    padding: 6px 15px;
    border-radius: 50%;
    background: #1c8568;
    border-radius: 10px;
    border: none;
}
li a {
    color: #000;
}
li a,
li button {
    font-weight: 400;
}
</style>
