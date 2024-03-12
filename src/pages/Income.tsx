import * as React from 'react';
import {
    randomCreatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
import Grid, { EGridType } from '../components/Grid';
import { GridColDef, GridRowsProp, GridValueFormatterParams } from '@mui/x-data-grid';
import { _accountCode, _incomeSourceCode } from '../utils/cmnCode';

const initialRows: GridRowsProp = [
    { id: randomId(), ocrDate: randomCreatedDate(), amount: 20000, source: '1', account: '1', content: '기타1' },
    { id: randomId(), ocrDate: randomCreatedDate(), amount: 1000, source: '2', account: '2', content: '기타2' },
    { id: randomId(), ocrDate: randomCreatedDate(), amount: 50000, source: '3', account: '3', content: '기타3' },
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
        , valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
              return '';
            }
            return `${params.value.toLocaleString()}`;
        },
    },
    // 카테고리 항목으로 관리
    { 
        field: 'source'
        , headerName: '소득원'
        , width: 150
        , editable: true
        , type: 'singleSelect'
        , valueOptions: _incomeSourceCode
        , align: 'left'
    },
    // 카테고리 항목으로 관리
    { 
        field: 'account'
        , headerName: '입금계좌'
        , width: 150
        , editable: true
        , type: 'singleSelect'
        , valueOptions: _accountCode
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

            <Grid initialRows={initialRows} columns={columns} gridType={EGridType.INLINE_TOOLBAR_MODIFY} />
        </div>
    );
}

export default Income;