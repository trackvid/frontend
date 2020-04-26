<template>
    <div class="map-container">
        <l-map class="map"
                :zoom="zoom"
                :center="center"
                :options="mapOptions"
        >
            <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            <l-marker v-for="location in locations" :lat-lng="getLocation(location)">
                <l-popup>
                    <div>
                        <b>Possible infections: {{getPossibleInfections(location)}}</b>
                        <div>
                            <b>Meeting dates:</b>
                            <ul v-for="date in getDates(location)">
                                <li>{{date}}</li>
                            </ul>
                        </div>
                    </div>
                </l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script lang="ts">
    import { latLng, LatLng, MapOptions } from "leaflet";
    import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
    import {Component, Vue} from "vue-property-decorator";
    import {TInfectionCase} from "@/components/infectionMap/interfaces/TInfectionCase";
    import {Utils} from "@/utils/Utils";
    import {TLocation} from "@/core/trackingService/interfaces/TLocation";
    import {StringLocationToLocation} from "@/converters/StringLocationToLocation";

    @Component({
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup
        }
    })
    export default class InfectionMap extends Vue {
        public zoom: number = 13;
        public center: LatLng = latLng(52.237049, 21.017532);
        public mapOptions: MapOptions = {
            zoomSnap: 0.5
        };
        public locations: string[];

        private cases: Map<string, TInfectionCase>;


        constructor() {
            super();
            this.cases = Utils.getLocalStorageMap<string, TInfectionCase>('cases');
            this.locations = Array.from(this.cases.keys());
            if (!Utils.isNullOrUndefinedOrEmpty(this.locations)) {
                this.center = this.getLocation(this.locations[0]);
            }
        }

        public getLocation(locationKey: string): LatLng {
            const location: TLocation = StringLocationToLocation.fromStringLocationToLocation(locationKey);
            return latLng(location.latitude, location.longitude);
        }

        public getPossibleInfections(locationKey: string): number | undefined {
            return this.cases.get(locationKey)?.infections;
        }

        public getDates(locationKey: string): string[] | undefined {
            return this.cases.get(locationKey)?.dates;
        }

    }
</script>

<style scoped lang="scss">
    .map-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 100px 40px;
        width: 100%;
        z-index: 1;

        .map {
            height: 100%;
            width: 100%;
            padding: 50px 0;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
        }
    }
</style>
