<template>
    <div class="details">
        <main class="details-body">
            <InfectionMap/>
        </main>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import InfectionMap from "@/components/infectionMap/InfectionMap.vue";

    @Component({
        components: {
            InfectionMap: InfectionMap
        }
    })
    export default class Details extends Vue {

    }
</script>

<style scoped lang="scss">
    .details {
        height: 100%;
    }

    .details-body {
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
