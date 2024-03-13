import React from 'react';
import { GridColDef, GridRowsProp, GridValueFormatterParams } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import Grid, { EAddType, EGridType } from "../../components/Grid";
import { _cycleCode, _accountCode, _incomeSourceCode } from '../../utils/cmnCode';
import RegularIncomeForm from './RegularIncomeForm';

function RegularIncome() {
    const initialRows: GridRowsProp = [
        { id: randomId(), cycle: '1', month: 12, date: 23, amount: 20000, incomeSource: '1', account: '1', content: '기타1' },
        { id: randomId(), cycle: '2', month: null, date: 23, amount: 1000, incomeSource: '2', account: '2', content: '기타2' },
        { id: randomId(), cycle: '3', month: null, date: null, amount: 50000, incomeSource: '3', account: '3', content: '기타3' },
    ];

    const columns: GridColDef[] = [
        { 
            field: 'cycle'
            , headerName: '실행 주기'
            , width: 150
            , editable: false
            , type: 'singleSelect'
            , valueOptions: _cycleCode
        },
        { 
            field: 'month'
            , headerName: '월(Month)'
            , width: 150
            , editable: false
            , valueFormatter: (params: GridValueFormatterParams<number>) => {
                if (params.value == null) {
                  return '';
                }
                return `${params.value}월`;
            },
        },
        { 
            field: 'date'
            , headerName: '일(Date)'
            , width: 150
            , editable: false
            , valueFormatter: (params: GridValueFormatterParams<number>) => {
                if (params.value == null) {
                  return '';
                }
                return `${params.value}일`;
            },
        },
        { 
            field: 'amount'
            , headerName: '금액'
            , type: 'number'
            , width: 150
            , editable: false
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
            field: 'incomeSource'
            , headerName: '소득원'
            , width: 150
            , editable: false
            , type: 'singleSelect'
            , valueOptions: _incomeSourceCode
            , align: 'left'
        },
        // 카테고리 항목으로 관리
        { 
            field: 'account'
            , headerName: '입금계좌'
            , width: 150
            , editable: false
            , type: 'singleSelect'
            , valueOptions: _accountCode
            , align: 'left'
        },
        { 
            field: 'content'
            , headerName: '내용'
            , width: 300
            , editable: false
            , align: 'left'
        },
    ];

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogAddClick = () => {
        handleDialogOpen();
    }

    return (
        <div>
            <Grid 
                initialRows={initialRows} 
                columns={columns} 
                gridType={EGridType.TOOLBAR_MODIFY} 
                addType={EAddType.DIALOG} 
                handleDialogAddClick={handleDialogAddClick} 
            />

            <RegularIncomeForm dialogOpen={dialogOpen} handleDialogClose={handleDialogClose} />
        </div>
    );
}

export default RegularIncome;