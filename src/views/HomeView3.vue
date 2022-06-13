<script setup lang="ts">
import { landingPageData, sections } from '../utils/constants';
</script>

<template>
    <header id="home">
        <div class="navbar">
            <h1 id="logo">MAPHIS</h1>
            <nav>
                <ul id="navigation-container">
                    <li><a href="#home">Home</a></li>
                    <li v-for="section in sections" :key="section.id">
                        <a :href="`#${section.id}`">{{ section.heading }}</a>
                    </li>
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
        <section :id="sections.about.id" class="section-container">
            <h2>{{ sections.about.heading }}</h2>
            <p>
                MAPHIS: Mapping History” is an international collaboration between researchers from the UK, France and
                Canada to recognise features embedded in historical maps and create the equivalent of Google Maps from
                the nineteenth century onward. The project is funded by Open Research Area (ORA) for the Social Sciences
                ANR-DFG-ESRC-SSHRC.
            </p>
        </section>
        <section :id="sections.researcher.id" class="section-container">
            <h2>{{ sections.researcher.heading }}</h2>
            <ul class="pure-g">
                <li
                    class="pure-u-1-1 pure-u-lg-1-5 pure-u-sm-1-1 pure-u-md-1-3"
                    v-for="research in landingPageData.researchers"
                    :key="research.name"
                >
                    <p>{{ research.name }}</p>
                    <p>({{ research.designation }})</p>
                </li>
            </ul>
        </section>
        <section :id="sections.participatingInstitute.id" class="section-container">
            <h2>{{ sections.participatingInstitute.heading }}</h2>
            <ul>
                <li v-for="university in landingPageData.participatingInstitute" :key="university.image">
                    <img :src="`src/images/${university.image}`" :alt="university.name" />
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
    background-image: url('../images/background.png');
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
    position: fixed;
    width: 100%;
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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.content h1 {
    font-size: 5.45rem;
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
    font-size: 2rem;
    margin: 0;
}
.content p {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 10px 0;
    max-width: 526px;
}
section.section-container {
    padding: 2.5rem 0 0;
    margin: 0 100px;
}
section > h2 {
    font-size: 20px;
}
section img {
    width: 200px;
}
#participating_institute ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
#participating_institute ul li {
    flex-grow: 1;
}
#researchers ul,
#participating_institute ul {
    padding: 0;
    margin: 0;
}
#about p {
    line-height: 1.5;
}
</style>
