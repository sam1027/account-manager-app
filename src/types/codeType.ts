export interface ICodeGrp{
    cd_grp_id: string,
    cd_grp_nm: string,
    cd_grp_en_nm?: string,
    cd_grp_desc?: string,
}

export interface ICode{
    cd_id: string,
    cd_grp_id: string,
    cd_nm: string,
    cd_en_nm?: string,
    use_yn: string,
    delete_yn: string,
    reg_dt: string,
    mod_dt: string,
}