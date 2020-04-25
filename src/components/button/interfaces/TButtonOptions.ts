import {ButtonType} from "@/components/button/interfaces/ButtonType";

export type TButtonOptions = TWarningButton | TDangerButton;

interface TBaseButton {
    title: string;
    type: ButtonType;
    callback: () => void;
    icon?: string;
}

export interface TWarningButton extends TBaseButton {
    type: ButtonType.WARNING;
}

export interface TDangerButton extends TBaseButton {
    type: ButtonType.DANGER;
}



export function isWarningButton(button: TBaseButton): button is TWarningButton {
    return button.type === ButtonType.WARNING;
}

export function isDangerButton(button: TBaseButton): button is TDangerButton {
    return button.type === ButtonType.DANGER;
}
