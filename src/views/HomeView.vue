<script setup lang="ts">
import { landingPageData } from '../utils/constants';
</script>

<template>
    <header>
        <div class="navbar">
            <h1 id="logo">MAPHIS</h1>
            <nav>
                <ul id="navigation-container">
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Researchers</a></li>
                    <li><a href="">Participating Universities</a></li>
                    <li id="login-button-container"><button type="button">Login</button></li>
                </ul>
            </nav>
        </div>
        <div class="content">
            <div>
                <h1>MAPHIS</h1>
                <h2 class="sub-heading">Mapping History</h2>
                <p class="sub-text">Using Machine Learning to understand city development</p>
            </div>
        </div>
    </header>
    <main>
        <section>
            <h1>About</h1>
            <p>
                MAPHIS: Mapping History” is an international collaboration between researchers from the UK, France and
                Canada to recognise features embedded in historical maps and create the equivalent of Google Maps from
                the nineteenth century onward. The project is funded by Open Research Area (ORA) for the Social Sciences
                ANR-DFG-ESRC-SSHRC.
            </p>
        </section>
        <section>
            <h1>Researchers</h1>
            <ul class="pure-g">
                <li class="pure-u-1-5" v-for="research in landingPageData.researchers" :key="research.name">
                    <p>{{ research.name }}</p>
                </li>
            </ul>
        </section>
        <section>
            <h1>Participating Universities</h1>
            <ul class="pure-g">
                <li
                    class="pure-u-1-5"
                    v-for="university in landingPageData.participatingInstitute"
                    :key="university.image"
                >
                    <img :src="`/src/images//${university.image}`" :alt="university.name" />
                </li>
            </ul>
        </section>
    </main>
    <footer></footer>
</template>

<style>
header {
    padding: 0 20px;
    height: 100vh;
    z-index: 1000;
}
header::before {
    background-image: url(/src/images/background.png);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position-y: 4rem;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    opacity: 0.35;
}
header > .navbar {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
nav > ul {
    display: inline-flex;
}
li {
    list-style: none;
    margin-right: 30px;
}

li > a {
    text-decoration: none;
    color: black;
    font-weight: 400;
}

li > button {
    background-color: #1c8568;
    color: white;
    border-color: transparent;
    border-radius: 4px;
}
.content {
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.content h1 {
    font-size: 6.45rem;
    font-family: 'Lora', serif;
    color: #9a3736;
    margin: 0;
}
.content h2,
.content p {
    font-family: 'Montserrat', sans-serif;
}
.content h2 {
    color: #fc8e61;
    font-weight: 700;
    font-size: 40px;
    margin: 0;
}
.content p {
    font-size: 24px;
    font-weight: 500;
    margin: 10px 0;
    max-width: 550px;
}
</style>
