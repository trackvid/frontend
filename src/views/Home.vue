import {ButtonType} from "@/components/button/interfaces/ButtonType";
<template>
    <div class="home">
        <header class="home-header">
            <NavigationMenu :nav-props="getNavigationMenuProperties()" />
        </header>
        <main class="home-body">
            <TrackButton class="track-button" :tracking-options="getTrackingOptions()"/>
        </main>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import TrackButton from "@/components/trackButton/TrackButton.vue";
    import {ButtonType} from "@/components/button/interfaces/ButtonType";
    import NavigationMenu from "@/components/navigationMenu/NavigationMenu.vue";
    import {TNavigationMenuOptions} from "@/components/navigationMenu/interfaces/TNavigationMenuOptions";
    import {TTrackServiceOptions} from "@/components/trackButton/interface/TTrackServiceOptions";

    @Component({
        components: {
            TrackButton: TrackButton,
            NavigationMenu: NavigationMenu
        }
    })
    export default class Home extends Vue {

        public getNavigationMenuProperties(): TNavigationMenuOptions {
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

        public getTrackingOptions(): TTrackServiceOptions {
            return {
                size: '40%',
                trackInterval: 10000
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
