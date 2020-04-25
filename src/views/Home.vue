<template>
    <div class="home">
        <main class="home-body">
            <TrackButton class="track-button" size="40%"/>
        </main>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import TrackButton from "@/components/trackButton/TrackButton.vue";

    @Component({
        components: {
            TrackButton: TrackButton
        }
    })
    export default class Home extends Vue {

    }
</script>

<style scoped lang="scss">
    .home {
        height: 100%;
    }
    .home-body {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .track-button {
            flex: 1;
        }
    }
</style>
