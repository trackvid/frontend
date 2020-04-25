<template>
    <div class="action-button__wrapper" @click="callback">
        <label class="action-button"
               :class="{'action-button__warning': isWarning(), 'action-button__danger': isDanger()}">{{title}}</label>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {isDangerButton, isWarningButton, TButtonOptions} from "@/components/button/interfaces/TButtonOptions";

    @Component
    export default class ActionButton extends Vue {
        @Prop() private buttonOptions!: TButtonOptions;

        public title: string;
        public callback: () => void;
        public iconPath: string | null;

        constructor() {
            super();
            this.title = this.buttonOptions.title;
            this.callback = this.buttonOptions.callback;
            this.iconPath = this.buttonOptions.icon ?? null;
        }

        public isWarning(): boolean {
            return isWarningButton(this.buttonOptions);
        }

        public isDanger(): boolean {
            return isDangerButton(this.buttonOptions);
        }

    }
</script>

<style scoped lang="scss">
    .action-button__wrapper {
        padding: 10px;

        .action-button {
            color: var(--text-color-on-accent);
            cursor: pointer;
            font-weight: 100;
            padding: 20px;
            border-radius: 12px;
            display: inline-block;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 0 7px rgba(0, 0, 0, 0.5);

            &:hover {
                transform: perspective(300px) rotateY(45deg);
            }

            &__warning {
                background: var(--accent-color-one);
            }

            &__danger {
                background: var(--accent-color-two);
            }
        }
    }
</style>
