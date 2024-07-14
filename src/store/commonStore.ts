import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

import { getCodeGrpList, getCodeList} from "../api/code";
import { CODE_GROUP_ID, ICode, ICodeGrp } from "../types/codeType";

interface ICodeGrpStore {
    codeGrpList : ICodeGrp[],
    fetch : {
        storeCodeGrpList : () => void,
    },
    init: () => void,
}

interface ICodeStore {
    codeList : ICode[],
    fetch : {
        storeCodeList : () => void,
    },
    action: {
        getCodeListByGrpId: (codeGrpId:string) => ICode[],
        getCodeByGrpIdAndCodeId: (codeGrpId:string, codeId:string) => ICode[],
    },
    init: () => void,
}

export const useCodeGrpStore = create(
    persist<ICodeGrpStore>(
        (set, get) => ({
            codeGrpList : [],
            fetch : {
                storeCodeGrpList: async () => {
                    const codeGrpList = await getCodeGrpList();
                    set({
                        codeGrpList : codeGrpList
                    })
                },
            },
            init: () => {
                set({codeGrpList : []});
            },
        }),
        { 
            name: "codeGrpStore", 
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useCodeStore = create<ICodeStore>((set, get) => ({
    codeList : [],
    fetch : {
        storeCodeList : async () => {
            const codeList = await getCodeList();
            set({
                codeList : codeList
            })
        },
    },
    action: {
        getCodeListByGrpId: (codeGrpId:string) => {
             const allCodes = get().codeList;
             return allCodes.filter(code => code.cd_grp_id === codeGrpId);
        },
        getCodeByGrpIdAndCodeId: (codeGrpId:string, codeId:string) => {
             const allCodes = get().codeList;
             return allCodes.filter(code => code.cd_grp_id === codeGrpId && code.cd_id === codeId);
        },
    },
    init: () => {
        set({codeList : []});
    },
}));