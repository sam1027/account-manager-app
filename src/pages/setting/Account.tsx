import React from 'react';
import Grid, { EAddType, EGridType } from '../../components/Grid';
import { randomId } from "@mui/x-data-grid-generator";
import { GridColDef, GridRowsProp, GridValueFormatterParams } from "@mui/x-data-grid";
import { _bank } from '../../utils/cmnCode';
import AccountForm from './AccountForm';

function Account() {
    const initialRows: GridRowsProp = [
        { id: randomId(), bank: '1', accountName: "성은 용돈 계좌", accountNumber: "102-324-229348", accountOwner: "유성은", firstBalance: 120000, currentBalance: 4323000 },
        { id: randomId(), bank: '2', accountName: "성은 용돈 계좌", accountNumber: "102-324-229348", accountOwner: "유성은", firstBalance: 120000, currentBalance: 4323000 },
        { id: randomId(), bank: '3', accountName: "성은 용돈 계좌", accountNumber: "102-324-229348", accountOwner: "유성은", firstBalance: 120000, currentBalance: 4323000 },
    ];

    const columns: GridColDef[] = [
        { 
            field: 'bank'
            , headerName: '금융기관'
            , width: 150
            , editable: false
            , type: 'singleSelect'
            , valueOptions: _bank
        },
        { 
            field: 'accountName'
            , headerName: '계좌명'
            , width: 150
            , editable: false
        },
        { 
            field: 'accountNumber'
            , headerName: '계좌번호'
            , width: 200
            , editable: false
        },
        { 
            field: 'accountOwner'
            , headerName: '예금주'
            , width: 150
            , editable: false
        },
        { 
            field: 'firstBalance'
            , headerName: '초기 잔액(원)'
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
        { 
            field: 'currentBalance'
            , headerName: '현재 잔액(원)'
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

            <AccountForm dialogOpen={dialogOpen} handleDialogClose={handleDialogClose} />
        </div>
    );
}

export default Account;