<script setup lang="ts">
import { landingPageData, sections } from '../utils/constants';
import ResearcherCard from '../components/ResearcherCard.vue';
</script>

<template>
    <div class="body">
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
            <div class="universities">
                <ul>
                    <template v-for="(researcher, index) in landingPageData.researchers" :key="`researcher_${index}`">
                        <li v-if="index <= 3">
                            <ResearcherCard
                                :isInline="false"
                                :name="researcher.name"
                                :designation="researcher.designation"
                            />
                        </li>
                    </template>
                </ul>
            </div>
            <div class="about-us">
                MAPHIS: Mapping History” is an international collaboration between researchers from the UK, France and
                Canada to recognise features embedded in historical maps and create the equivalent of Google Maps from
                the nineteenth century onward. The project is funded by Open Research Area (ORA) for the Social Sciences
                ANR-DFG-ESRC-SSHRC.
            </div>
            <section>
                <h2>Researchers</h2>
                <ul>
                    <template v-for="(researcher, index) in landingPageData.researchers" :key="`researcher_${index}`">
                        <li>
                            <ResearcherCard
                                :isInline="true"
                                :name="researcher.name"
                                :designation="researcher.designation"
                            />
                        </li>
                    </template>
                </ul>
            </section>
        </main>
        <footer></footer>
    </div>
</template>

<style>
.body {
    z-index: 1000;
    background-image: url(/src/images/background.png);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position-y: 4rem;
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
    display: flex;
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

.clearfix:after {
    content: '';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
}
.about-us {
    width: 50%;
}
ul {
    padding: 0;
}
.universities ul {
    background: #fc8e61;
    display: flex;
    float: right;
    padding: 0 10px;
}
</style>
