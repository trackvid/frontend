import {TNavigationMenuItem} from "@/components/navigationMenu/interfaces/TNavigationMenuItem";
import {TButtonOptions} from "@/components/button/interfaces/TButtonOptions";

export interface TNavigationMenuOptions {
    items: TNavigationMenuItem[];
    buttons?: TButtonOptions[];
}
