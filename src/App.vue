<template>
    <div id="app">
        <header class="home-header">
            <NavigationMenu :nav-props="getNavigationMenuProperties()"/>
        </header>
        <router-view/>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {TNavigationMenuOptions} from "@/components/navigationMenu/interfaces/TNavigationMenuOptions";
    import {ButtonType} from "@/components/button/interfaces/ButtonType";
    import {Utils} from "@/utils/Utils";
    import {TMeasurementsState} from "@/core/trackingService/interfaces/TMeasurementsState";
    import {TServerResponse} from "@/store/TServerResponse";
    import NavigationMenu from "@/components/navigationMenu/NavigationMenu.vue";
    import {TInfectionCase} from "@/components/infectionMap/interfaces/TInfectionCase";

    @Component({
        components: {
            NavigationMenu: NavigationMenu
        }
    })
    export default class App extends Vue{
        private static URL: string = 'http://localhost:9090';

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

        private uploadDataset(): void {
            const key: string = 'measurements';
            const localDataset: TMeasurementsState[] = Utils.getLocalStorageData<TMeasurementsState[]>(key, []);
            fetch(`${App.URL}/measurements`, {
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
            fetch(`${App.URL}/measurements/check`, {
                method: 'put',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    measurements: localDataset
                })
            })
                .then(res => res.json())
                .then((res: TServerResponse) => {
                    const mappedResponse: Map<string, TInfectionCase> = new Map<string, TInfectionCase>();
                    res.foundCaseList.forEach(serverCase => {
                        const key: string = `${serverCase.location.latitude}-${serverCase.location.longitude}`;
                        const storedCase: TInfectionCase | undefined = mappedResponse.get(key);
                        if (storedCase != null) {
                            storedCase.dates.push(serverCase.date);
                            storedCase.infections += serverCase.numberOfInfected;
                        } else {
                            const newCase: TInfectionCase = {
                                dates: [serverCase.date],
                                infections: serverCase.numberOfInfected
                            };
                            mappedResponse.set(key, newCase);
                        }
                    });
                    window.localStorage.setItem('cases', JSON.stringify(Array.from(mappedResponse.entries())));
                    console.log('Data fetched');
                })
        }
    }
</script>
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

  .home-header {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
  }
</style>
