<template>
    <div>
        <img v-if="!isNavVisible" @click="toggleNavigationMenu" class="hamburger-menu" src="../../assets/icons/hamburger.svg" alt="open menu">
        <nav v-if="isNavVisible">
            <img @click="toggleNavigationMenu" class="hamburger-menu" src="../../assets/icons/close.svg" alt="close menu">
            <ul>
                <li class="nav-item" v-for="item in items" @click="toggleNavigationMenu">
                    <router-link class="nav-item__content" :to="item.path">{{item.name}}</router-link>
                </li>
            </ul>
            <section class="nav-buttons">
                <ActionButton v-for="button in buttons" :button-options="button"/>
            </section>
        </nav>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {TNavigationMenuOptions} from "@/components/navigationMenu/interfaces/TNavigationMenuOptions";
    import {TNavigationMenuItem} from "@/components/navigationMenu/interfaces/TNavigationMenuItem";
    import {TButtonOptions} from "@/components/button/interfaces/TButtonOptions";
    import ActionButton from "@/components/button/ActionButton.vue";

    @Component({
        components: {
            ActionButton: ActionButton
        }
    })
    export default class NavigationMenu extends Vue {
        @Prop() private navProps!: TNavigationMenuOptions;

        public items: TNavigationMenuItem[];
        public buttons: TButtonOptions[];
        public isNavVisible: boolean = false;

        constructor() {
            super();
            this.items = this.navProps.items;
            this.buttons = this.navProps.buttons ?? [];
        }

        public toggleNavigationMenu(): void {
            this.isNavVisible = !this.isNavVisible;
        }
    }
</script>

<style scoped lang="scss">
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    li {
        margin: 0;
        padding: 0;
    }
    a {
        font-weight: bold;
        text-decoration: none;
        color: var(--text-color-on-primary);

        &.router-link-exact-active {
            color: var(--accent-color-one);
        }
    }
    nav {
        width: 70vw;
        height: 100vh;
        background-color: var(--primary-color-dark);
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    }
    .hamburger-menu {
        padding: 30px 0 0 30px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
            transform: scale(1.05);
        }
    }
    .nav-item {
        padding: 30px 0;
        transition: all 0.3s ease-in-out;

        &__content {
            font-size: 2.5em;
        }

        &:hover {
            transform: scale(1.1);
        }

        a {
            transition: all 0.3s ease-in-out;

            &:hover {
                color: var(--accent-color-one);
            }
        }

    }
    .nav-buttons {
        padding-top: 80px;
    }
</style>
