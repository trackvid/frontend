<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
  @import "styles/css-reset";
  @import "styles/color.variables";
    * {
        box-sizing: border-box;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        height: 100vh;
        background-color: var(--primary-color-light);
        color: var(--text-color-on-primary);
    }

    #nav {
        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: var(--accent-color-one);
            }
        }
    }
</style>
