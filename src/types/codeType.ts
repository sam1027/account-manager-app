export interface ICodeGrp {
	cd_grp_id: string;
	cd_grp_nm: string;
	cd_grp_en_nm?: string;
	cd_grp_desc?: string;
}

export interface ICode {
	cd_id: string;
	cd_grp_id: string;
	cd_nm: string;
	cd_en_nm?: string;
	use_yn: string;
	reg_dt: string;
	mod_dt: string;
}

export interface ICodeParams {
	codeId: string;
	codeName?: string;
	useYn?: string;
}

export const CODE_GROUP_ID = {
	PAY_METHOD: "CDG0001", // 결재 수단
	CYCLE: "CDG0002", // 주기
	INCOME_SOURCE: "CDG0003", // 소득원
	BANK: "CDG0004", // 금융기관
	CARD_TYPE: "CDG0005", // 카드 구분
	CARD_CORP: "CDG0006", // 카드사
	EXPEND_TYPE: "CDG0007", // 지출 항목
} as const;

type CODE_GROUP_ID = (typeof CODE_GROUP_ID)[keyof typeof CODE_GROUP_ID];

export const CARD_TYPE = {
	CREDIT: "CREDIT", // 신용카드
	CHECK: "CHECK", // 체크카드
} as const;

type CARD_TYPE = (typeof CARD_TYPE)[keyof typeof CARD_TYPE];

export const CYCLE_TYPE = {
	EVERY_DAY: "EDAY", // 매일
	EVERY_MONTH: "EMONTH", // 매달
	EVERY_YEAR: "EYEAR", // 매년
} as const;

type CYCLE_TYPE = (typeof CYCLE_TYPE)[keyof typeof CYCLE_TYPE];

export const PAY_MTD_TYPE = {
	ACCOUNT: "ACCOUNT", // 계좌이체
	CARD: "CARD", // 카드
	CASH: "CASH", // 현금
} as const;

type PAY_MTD_TYPE = (typeof PAY_MTD_TYPE)[keyof typeof PAY_MTD_TYPE];
