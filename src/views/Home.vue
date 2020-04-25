import {ButtonType} from "@/components/button/interfaces/ButtonType";
<template>
    <div class="home">
        <header class="home-header">
            <NavigationMenu :nav-props="getNavigationMenuProperties()" />
        </header>
        <main class="home-body">
            <TrackButton class="track-button" size="40%"/>
        </main>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import TrackButton from "@/components/trackButton/TrackButton.vue";
    import {TButtonOptions} from "@/components/button/interfaces/TButtonOptions";
    import {ButtonType} from "@/components/button/interfaces/ButtonType";
    import NavigationMenu from "@/components/navigationMenu/NavigationMenu.vue";
    import {TNavigationMenuOptions} from "@/components/navigationMenu/interfaces/TNavigationMenuOptions";

    @Component({
        components: {
            TrackButton: TrackButton,
            NavigationMenu: NavigationMenu
        }
    })
    export default class Home extends Vue {

        public getButtonOptions(): TButtonOptions {
            return {
                title: 'test',
                callback: () => console.log('test'),
                type: ButtonType.WARNING
            }
        }
        getNavigationMenuProperties(): TNavigationMenuOptions {
            return {
                items: [
                    {name: 'Home', path: '/'},
                    {name: 'Details', path: '/details'}
                ],
                buttons: [
                    {title: 'Fetch data', callback: () => console.log('Fetching data...'), type: ButtonType.WARNING},
                    {title: 'I am sick', callback: () => console.log('Upload sick dataset'), type: ButtonType.DANGER},
                ]
            }
        }

    }
</script>

<style scoped lang="scss">
    .home {
        height: 100%;
    }
    .home-header {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }
    .home-body {
        height: 100%;
        display: flex;
        z-index: 1;
        justify-content: center;
        align-items: center;

        .track-button {
            flex: 1;
        }
    }
</style>
