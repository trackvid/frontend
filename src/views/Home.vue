<template>
    <div class="home">
        <main class="home-body">
            <TrackButton class="track-button" :tracking-options="getTrackingOptions()"/>
        </main>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import TrackButton from "@/components/trackButton/TrackButton.vue";
    import {TTrackServiceOptions} from "@/components/trackButton/interface/TTrackServiceOptions";

    @Component({
        components: {
            TrackButton: TrackButton
        }
    })
    export default class Home extends Vue {

        public getTrackingOptions(): TTrackServiceOptions {
            return {
                size: '40%',
                trackInterval: 60 * 1000
            }
        }

    }
</script>

<style scoped lang="scss">
    .home {
        height: 100%;
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
