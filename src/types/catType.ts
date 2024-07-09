export interface ICat {
	cat_id: string;
	cat_nm: string;
	cat_desc?: string;
}

export interface ISubCat {
	cat_id: string;
	sub_cat_id: string;
	sub_cat_nm: string;
	use_yn: string;
	user_id: string;
	is_system: string;
	reg_dt?: string;
	mod_dt?: string;
}

export interface ISubCatUseYn {
	sub_cat_id: string;
	use_yn: string;
}