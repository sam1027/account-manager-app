import * as React from 'react';
import {
    randomCreatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
import Grid, { EGridType } from '../components/Grid';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { _accountCode, _cardCode, _expdItemCode, _expdWayCode } from '../utils/cmnCode';
import HelmetTitle from '../components/HelmetTitle';

const initialRows: GridRowsProp = [
    { id: randomId(), ocrDate: randomCreatedDate(), amount: 20000, expdWay: 'card', expdMethod: '1', account: '1', expdExpectDay: randomCreatedDate(), expdItem: '1', content: '지출1'},
    { id: randomId(), ocrDate: randomCreatedDate(), amount: 8000, expdWay: 'account', expdMethod: '', account: '2', expdExpectDay: randomCreatedDate(), expdItem: '2', content: '지출2'},
    { id: randomId(), ocrDate: randomCreatedDate(), amount: 97000, expdWay: 'card', expdMethod: '1', account: '3', expdExpectDay: randomCreatedDate(), expdItem: '3', content: '지출3'},
    { id: randomId(), ocrDate: randomCreatedDate(), amount: 6700, expdWay: 'account', expdMethod: '', account: '2', expdExpectDay: randomCreatedDate(), expdItem: '4', content: '지출4'},
];

const columns: GridColDef[] = [
    { 
        field: 'ocrDate'
        , headerName: '발생일'
        , type: 'date'
        , width: 150
        , editable: true
    },
    { 
        field: 'amount'
        , headerName: '금액'
        , type: 'number'
        , width: 150
        , editable: true
        , align: 'right'
        // , valueFormatter: (params: GridValueFormatterParams<number>) => {
        //     if (params.value == null) {
        //       return '';
        //     }
        //     return `${params.value.toLocaleString()}`;
        // },
    },
    // 공통코드
    { 
        field: 'expdWay'
        , headerName: '결제 수단'
        , width: 150
        , editable: true
        , type: 'singleSelect'
        , valueOptions: _expdWayCode
        , align: 'left'
    },
    // 결재수단 '카드'인 경우만 활성화
    { 
        field: 'expdMethod'
        , headerName: '결제 카드'
        , width: 150
        , editable: true
        , type: 'singleSelect'
        , valueOptions: _cardCode
        , align: 'left'
    },
    // 결재수단 '현금'인 경우만 활성화
    // 결재 카드 선택하면 자동으로 연동됨
    { 
        field: 'account'
        , headerName: '결제 계좌'
        , width: 150
        , editable: true
        , type: 'singleSelect'
        , valueOptions: _accountCode
        , align: 'left'
    },
    // '현금'일 경우 발생일과 동일하고 '카드'일 경우 해당 카드 결제일이 표시됨.
    // 해당 컴포넌트 내에서 수정불가. 설정의 '신용카드 관리'에서 결제일 수정 가능.
    { 
        field: 'expdExpectDay'
        , headerName: '결제일'
        , type: 'date'
        , width: 150
        , editable: false
    },
    // 카테고리 항목으로 관리
    { 
        field: 'expdItem'
        , headerName: '지출 항목'
        , width: 150
        , editable: true
        , type: 'singleSelect'
        , valueOptions: _expdItemCode
        , align: 'left'
    },
    { 
        field: 'content'
        , headerName: '내용'
        , width: 300
        , editable: true
        , align: 'left'
    },
];

function Expenditure() {
    return (
        <div>
            <HelmetTitle title="지출" />

            <Grid initialRows={initialRows} columns={columns} gridType={EGridType.INLINE_TOOLBAR_MODIFY} />
        </div>
    );
}

export default Expenditure;