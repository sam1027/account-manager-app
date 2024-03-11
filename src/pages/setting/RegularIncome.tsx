import React from 'react';
import { GridColDef, GridRowsProp, GridValueFormatterParams } from "@mui/x-data-grid";
import { randomCreatedDate, randomId } from "@mui/x-data-grid-generator";
import Grid, { EAddType, EGridType } from "../../components/Grid";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function RegularIncome() {
    const initialRows: GridRowsProp = [
        { id: randomId(), cycle: '1', month: 12, date: 23, amount: 20000, source: '1', finance: '1', content: '기타1' },
        { id: randomId(), cycle: '2', month: null, date: 23, amount: 1000, source: '2', finance: '2', content: '기타2' },
        { id: randomId(), cycle: '3', month: null, date: null, amount: 50000, source: '3', finance: '3', content: '기타3' },
    ];
    
    const columns: GridColDef[] = [
        { 
            field: 'cycle'
            , headerName: '실행 주기'
            , width: 150
            , editable: false
            , type: 'singleSelect'
            , valueOptions: [
                { value: '1', label: '매년' },
                { value: '2', label: '매달' },
                { value: '3', label: '매일' },
            ]
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
            field: 'source'
            , headerName: '소득원'
            , width: 150
            , editable: false
            , type: 'singleSelect'
            , valueOptions: [
                { value: '1', label: '월급' },
                { value: '2', label: '불로소득' },
                { value: '3', label: '부업' },
                { value: '4', label: '알바비' },
            ]
            , align: 'left'
        },
        // 카테고리 항목으로 관리
        { 
            field: 'finance'
            , headerName: '금융기관'
            , width: 150
            , editable: false
            , type: 'singleSelect'
            , valueOptions: [
                { value: '1', label: '국민은행' },
                { value: '2', label: '우리은행' },
                { value: '3', label: '현금' },
                { value: '4', label: '알바비' },
            ]
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
            <h1>RegularIncome</h1>

            <Grid 
                initialRows={initialRows} 
                columns={columns} 
                gridType={EGridType.TOOLBAR_MODIFY} 
                addType={EAddType.DIALOG} 
                handleDialogAddClick={handleDialogAddClick} 
            />

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                fullWidth={true}
                maxWidth={"sm"}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleDialogClose();
                    },
                }}
            >
                <DialogTitle>정기 수입</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RegularIncome;