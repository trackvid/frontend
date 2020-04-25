<template>
    <div>
        <div class="button-wrapper">
          <div class="circle"><b>{{trackButtonText}}</b></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {TrackButtonState} from "@/components/trackButton/TrackButtonState";

    @Component
    export default class TrackButton extends Vue {
        @Prop() private size!: string;

        private static CIRCLE_WRAPPER_CLASS_NAME = 'button-wrapper';

        public trackButtonText: TrackButtonState = TrackButtonState.START;

        constructor() {
            super();
        }

        mounted(): void {
            const circleContainer: HTMLElement | null = this.$el.querySelector(`.${TrackButton.CIRCLE_WRAPPER_CLASS_NAME}`);
            if (circleContainer != null) {
                circleContainer.style.width = this.size;
            }
        }
    }
</script>

<style scoped lang="scss">
    .button-wrapper {
      margin: auto;
    }

    .circle {
        background: var(--accent-color-one);
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
    }

    .circle:hover {
        transform: scale(1.1);
    }
</style>
