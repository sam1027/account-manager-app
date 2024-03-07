import * as React from 'react';
import {
    randomCreatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
import Grid from '../components/Grid';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

const initialRows: GridRowsProp = [
    { id: randomId(), ocrDate: randomCreatedDate(), amount: '20000', expdWay: '현금(체크카드)', finance: '지갑', expdExpectDay: randomCreatedDate(), expdItem: '식비', content: '지출1'},
    { id: randomId(), ocrDate: randomCreatedDate(), amount: '8000', expdWay: '신용카드', finance: '지갑', expdExpectDay: randomCreatedDate(), expdItem: '식비', content: '지출2'},
    { id: randomId(), ocrDate: randomCreatedDate(), amount: '97000', expdWay: '현금(체크카드)', finance: '지갑', expdExpectDay: randomCreatedDate(), expdItem: '식비', content: '지출3'},
    { id: randomId(), ocrDate: randomCreatedDate(), amount: '6700', expdWay: '신용카드', finance: '지갑', expdExpectDay: randomCreatedDate(), expdItem: '식비', content: '지출4'},
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
        , width: 150
        , editable: true
        , align: 'right'
    },
    // 공통코드
    { 
        field: 'expdWay'
        , headerName: '지출 수단'
        , width: 150
        , editable: true
        , type: 'singleSelect'
        , valueOptions: ['신용카드', '현금(체크카드)']
        , align: 'left'
    },
    // 카테고리 항목으로 관리
    { 
        field: 'finance'
        , headerName: '금융처'
        , width: 150
        , editable: true
        , type: 'singleSelect'
        , valueOptions: ['국민은행','우리은행','지갑']
        , align: 'left'
    },
    // '현금'일 경우 발생일과 동일하고 '신용카드'일 경우 해당 신용카드 결제일이 표시됨.
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
        , valueOptions: ['식비','관리비','경조사','문화생활','생필품']
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
            <h1>지출</h1>

            <Grid initialRows={initialRows} columns={columns} />
        </div>
    );
}

export default Expenditure;