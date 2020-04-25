import {ActionTree} from "vuex";
import {RootState} from "@/store/state/RootState";
import {Utils} from "@/utils/Utils";
import {TMeasurementsState} from "@/core/trackingService/interfaces/TMeasurementsState";
import {TInfectionCase} from "@/store/state/TInfectionCase";

export const actions: ActionTree<TInfectionCase[], RootState> = {
    fetchCases({commit}): void {
        const key: string = 'measurements';
        const localDataset: TMeasurementsState[] = Utils.getLocalStorageData<TMeasurementsState[]>(key, []);
        fetch('http://localhost:9090/measurements/check', {
            method: 'put',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                measurements: localDataset
            })
        })
            .then(res => res.json())
            .then(res => {

            })
    }
};
