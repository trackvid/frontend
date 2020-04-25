<template>
    <div>
        <div class="button-wrapper" @click="toggleTracking">
            <div class="circle" :class="{'circle--start': isTrackingInActive(), 'circle--stop': isTrackingActive()}"><b>{{trackButtonState}}</b></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {TrackButtonState} from "@/components/trackButton/interface/TrackButtonState";
    import {TrackingService} from "@/core/trackingService/TrackingService";
    import {TGeoSuccess} from "@/core/trackingService/interfaces/TGeoSuccess";
    import {MeasurementsState, TLocation} from "@/store/state/MeasurementsState";
    import {Utils} from "@/utils/Utils";
    import {TTrackServiceOptions} from "@/components/trackButton/interface/TTrackServiceOptions";

    @Component
    export default class TrackButton extends Vue {
        @Prop() private trackingOptions!: TTrackServiceOptions;

        private static CIRCLE_WRAPPER_CLASS_NAME: string = 'button-wrapper';

        public trackButtonState: TrackButtonState = TrackButtonState.START;

        private readonly size: string;
        private readonly trackingInterval: number;
        private trackingService: TrackingService = new TrackingService(TrackButton.saveNewPosition, {timeout: 10000});
        private intervalPid: number = 0;

        constructor() {
            super();
            this.size = this.trackingOptions.size;
            this.trackingInterval = this.trackingOptions.trackInterval;
        }

        mounted(): void {
            const circleContainer: HTMLElement | null = this.$el.querySelector(`.${TrackButton.CIRCLE_WRAPPER_CLASS_NAME}`);
            if (circleContainer != null) {
                circleContainer.style.width = this.size;
            }
        }

        public toggleTracking(): void {
            if (this.trackButtonState === TrackButtonState.START) {
                this.trackButtonState = TrackButtonState.STOP;
                this.trackUser();
                return;
            }
            if (this.trackButtonState === TrackButtonState.STOP) {
                this.trackButtonState = TrackButtonState.START;
                clearInterval(this.intervalPid);
            }
        }

        private trackUser(): void {
            this.intervalPid = window.setInterval(this.trackingService.saveCurrentPosition.bind(this.trackingService), this.trackingInterval);

        }

        public isTrackingActive(): boolean {
            return this.trackButtonState === TrackButtonState.STOP;
        }

        public isTrackingInActive(): boolean {
            return this.trackButtonState === TrackButtonState.START;
        }

        private static saveNewPosition(newPosition: TGeoSuccess): void {
            const key: string = 'measurements';
            const measurements: MeasurementsState[] = Utils.getLocalStorageData<MeasurementsState[]>(key, []);
            const location: TLocation = {
                latitude: newPosition.latitude,
                longitude: newPosition.longitude
            };
            const date: string = Utils.buildDateString('-');
            const newItem: MeasurementsState = {
                location,
                date
            };
            measurements.push(newItem);
            window.localStorage.setItem(key, JSON.stringify(measurements));
        }
    }
</script>

<style scoped lang="scss">
    .button-wrapper {
        margin: auto;
    }

    .circle {
        color: var(--text-color-on-accent);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);

        position: relative;
        display: inline-block;
        width: 100%;
        height: 0;
        padding: 50% 0;
        border-radius: 50%;
        text-align: center;
        line-height: 0;
        font-size: 1.5em;

        cursor: pointer;
        transition: all 0.5s ease-in-out;

        &--start {
            background: var(--accent-color-one);
        }

        &--stop {
            background: var(--accent-color-two);
        }

        &:hover {
            transform: scale(1.2);
        }
    }

</style>
