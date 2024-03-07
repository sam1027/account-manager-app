import * as React from 'react';
import {
    randomCreatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
import Grid from '../components/Grid';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

const initialRows: GridRowsProp = [
    { id: randomId(), ocrDate: randomCreatedDate(), amount: '20000', source: '불로소득', finance: '우리은행', content: '기타1' },
    { id: randomId(), ocrDate: randomCreatedDate(), amount: '1000', source: '월급', finance: '국민은행', content: '기타2' },
    { id: randomId(), ocrDate: randomCreatedDate(), amount: '50000', source: '불로소득', finance: '현금', content: '기타3' },
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
    // 카테고리 항목으로 관리
    { 
        field: 'source'
        , headerName: '소득원'
        , width: 150
        , editable: true
        , type: 'singleSelect'
        , valueOptions: ['월급','불로소득','부업','알바비']
        , align: 'left'
    },
    // 카테고리 항목으로 관리
    { 
        field: 'finance'
        , headerName: '금융처'
        , width: 150
        , editable: true
        , type: 'singleSelect'
        , valueOptions: ['국민은행','우리은행','현금']
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

function Income() {
    return (
        <div>
            <h1>수입</h1>

            <Grid initialRows={initialRows} columns={columns} />
        </div>
    );
}

export default Income;