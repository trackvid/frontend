<template>
    <div class="home">
        <header class="home-header">
            <NavigationMenu :nav-props="getNavigationMenuProperties()"/>
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
    import {Utils} from "@/utils/Utils";
    import {TMeasurementsState} from "@/core/trackingService/interfaces/TMeasurementsState";
    import {TInfectionCase} from "@/store/state/TInfectionCase";

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
                    {title: 'Fetch data', callback: this.fetchData, type: ButtonType.WARNING},
                    {title: 'I am sick', callback: this.uploadDataset, type: ButtonType.DANGER},
                ]
            }
        }

        public getTrackingOptions(): TTrackServiceOptions {
            return {
                size: '40%',
                trackInterval: 60 * 1000
            }
        }

        private uploadDataset(): void {
            const key: string = 'measurements';
            const localDataset: TMeasurementsState[] = Utils.getLocalStorageData<TMeasurementsState[]>(key, []);
            fetch('http://localhost:9090/measurements', {
                method: 'post',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    measurements: localDataset
                })
            })
                .then(_res => console.log('Path has been send'))
        }

        private fetchData(): void {
            const key: string = 'measurements';
            const localDataset: TMeasurementsState[] = Utils.getLocalStorageData<TMeasurementsState[]>(key, []);
            fetch('http://localhost:9090/measurements/check', {
                method: 'put',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    measurements: localDataset
                })
            })
                .then(res => res.json())
                .then((res: TInfectionCase) => {
                    window.localStorage.setItem('cases', JSON.stringify(res));
                    console.log('Data fetched');
                })
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
