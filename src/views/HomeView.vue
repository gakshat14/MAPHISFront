<script setup lang="ts">
import { landingPageData } from '../utils/constants';
import ResearcherCard from '../components/ResearcherCard.vue';
</script>

<template>
    <header id="home">
        <div class="navbar">
            <h1 id="logo">MAPHIS</h1>
            <nav>
                <ul id="navigation-container">
                    <!-- <li><a href="#home">Home</a></li>
                    <li v-for="section in sections" :key="section.id">
                        <a :href="`#${section.id}`">{{ section.heading }}</a>
                    </li> -->
                    <li id="login-button-container">
                        <router-link title="login" to="login">Login</router-link>
                    </li>
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
        <div class="universities clear-fix">
            <section>
                <h2>Participating Institute</h2>
                <ul>
                    <template
                        v-for="(institute, index) in landingPageData.participatingInstitute"
                        :key="`university_${index}`"
                    >
                        <li v-if="index <= 3">
                            <img :src="`/src/images/${institute.image}`" :alt="institute.name" />
                        </li>
                    </template>
                </ul>
            </section>
        </div>
    </header>
    <main>
        <div class="flex-container">
            <p>
                MAPHIS: Mapping History” is an international collaboration between researchers from the UK, France and
                Canada to recognise features embedded in historical maps and create the equivalent of Google Maps from
                the nineteenth century onward. The project is funded by Open Research Area (ORA) for the Social Sciences
                ANR-DFG-ESRC-SSHRC.
            </p>
            <section class="child-2">
                <h2>Researchers</h2>
                <ul>
                    <template v-for="(researcher, index) in landingPageData.researchers" :key="`researcher_${index}`">
                        <li>
                            <ResearcherCard
                                :isInline="true"
                                :name="researcher.name"
                                :designation="` (${researcher.designation})`"
                            />
                        </li>
                    </template>
                </ul>
            </section>
        </div>
    </main>
    <footer></footer>
</template>

<style>
:root {
    --border-radius: 0 10px 10px 0;
    --root-padding-left: 4rem;
    --root-padding-right: 4rem;
}
</style>

<style scoped>
header {
    z-index: 1000;
    background-image: url(/src/images/background.png);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position-y: 4rem;
    padding-bottom: 4rem;
}

header > .navbar {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    padding-left: var(--root-padding-left);
    padding-right: var(--root-padding-right);
}
#logo {
    flex-grow: 2;
}
/* nav {
    flex-grow: 1.2;
} */
nav > ul {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
}
li {
    list-style: none;
}

li > a {
    text-decoration: none;
    color: black;
    font-weight: 400;
}

li#login-button-container > a {
    background-color: #1c8568;
    color: white;
    padding: 10px 15px;
}

.content {
    display: flex;
    margin-top: 2rem;
    padding-left: var(--root-padding-left);
    padding-right: var(--root-padding-right);
}
.content h1 {
    font-size: 4.45rem;
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
    font-size: 1.5rem;
    margin: 0;
}
.content p {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 10px 0;
    max-width: 526px;
}

ul {
    padding: 0;
}
.universities {
    margin-top: 13rem;
}

.universities section {
    background: #fc8e61;
    float: right;
    width: 88%;
    padding: 20px;
    border-radius: 10px 0 0 10px;
}

.universities ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
}
.clear-fix::after {
    content: '';
    clear: both;
    display: table;
}

.universities img {
    width: 200px;
}

.researchers li {
    margin-top: 5px;
}

.flex-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    background-image: url(/src/images/Map_BG_2.png);
    background-blend-mode: multiply;
    background-color: #1b8264;
    padding: 1rem 0;
    padding-top: 1.6rem;
}

.flex-container p {
    max-width: 49%;
    color: #c4cbb6;
    line-height: 1.5;
}

.flex-container section {
    color: #fff;
}

.flex-container section h2 {
    margin: 0;
}

.flex-container section li {
    margin-top: 5px;
}

@media (min-width: 1440px) {
    .universities section {
        width: 60%;
    }
}
</style>
