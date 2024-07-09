import {create} from "zustand";

import { getCodeList} from "../api/code";
import { CODE_GROUP_ID, ICode } from "../types/codeType";

interface ICodeStore {
    codeList : ICode[],
    fetch : {
        codeList : () => void,
    },
    action: {
        codeListByGrpId: (codeGrpId:string) => ICode[],
    },
    init: () => void,
}

export const useCodeStore = create<ICodeStore>((set, get) => ({
    codeList : [],
    fetch : {
        codeList : async () => {
            const codeList = await getCodeList();
            set({
                codeList : codeList
            })
        },
    },
    action: {
        codeListByGrpId: (codeGrpId:string) => {
             const allCodes = get().codeList;
             return allCodes.filter(code => code.cd_grp_id === codeGrpId);
        },
    },
    init: () => {
        set({codeList : []});
    },
}));