import React from 'react';
import { GridColDef, GridRowsProp, GridValueFormatterParams } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import Grid, { EAddType, EGridType } from "../../components/Grid";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import { MoneyFormatCustom } from '../../utils/Mui';

interface IDialogItem {
    cycle: number;
    month: number;
    date: number;
    amount: number;
    source: number;
    finance: number;
    content: string;
}

function RegularIncome() {
    const initialRows: GridRowsProp = [
        { id: randomId(), cycle: '1', month: 12, date: 23, amount: 20000, incomeSource: '1', finance: '1', content: '기타1' },
        { id: randomId(), cycle: '2', month: null, date: 23, amount: 1000, incomeSource: '2', finance: '2', content: '기타2' },
        { id: randomId(), cycle: '3', month: null, date: null, amount: 50000, incomeSource: '3', finance: '3', content: '기타3' },
    ];

    const _cycleCode = [
        { value: '1', label: '매년' },
        { value: '2', label: '매달' },
        { value: '3', label: '매일' },
    ];
    const _monthCode = Array.from({ length: 12 }, (_, i) => ({ value: `${i+1}`, label: `${i+1}` }));
    const _dateCode = Array.from({ length: 31 }, (_, i) => ({ value: `${i+1}`, label: `${i+1}` }));
    const _incomeSourceCode = [
        { value: '1', label: '월급' },
        { value: '2', label: '불로소득' },
        { value: '3', label: '부업' },
        { value: '4', label: '알바비' },
    ];
    const _financeCode = [
        { value: '1', label: '국민은행' },
        { value: '2', label: '우리은행' },
        { value: '3', label: '현금' },
        { value: '4', label: '알바비' },
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
            field: 'finance'
            , headerName: '금융기관'
            , width: 150
            , editable: false
            , type: 'singleSelect'
            , valueOptions: _financeCode
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
    const [selectedCycle, setSelectedCycle] = React.useState("1");

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogAddClick = () => {
        handleDialogOpen();
    }

    const handleCycleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCycle(event.target.value);
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
                        const formJson = Object.fromEntries((formData as any).entries()) as IDialogItem;
                        console.log(formJson);
                        const amount = formJson.amount;
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
                        id="cycle"
                        select
                        label="실행 주기"
                        defaultValue={selectedCycle}
                        margin="dense"
                        fullWidth
                        style = {{width: 150}}
                        onChange={handleCycleChangeEvent}
                    >
                        {_cycleCode.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="month"
                        disabled={selectedCycle !== '1'}
                        select
                        label="월(Month)"
                        defaultValue={new Date().getMonth() + 1}
                        margin="dense"
                        style = {{width: 150, marginLeft: 10}}
                    >
                        {_monthCode.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="date"
                        disabled={selectedCycle === '3'}
                        select
                        label="일(Date)"
                        defaultValue={new Date().getDate()}
                        margin="dense"
                        style = {{width: 150, marginLeft: 10}}
                    >
                        {_dateCode.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        error={false}
                        autoFocus
                        required
                        margin="normal"
                        id="amount"
                        name="amount"
                        label="금액"
                        fullWidth
                        variant="standard"
                        InputProps={{
                            inputComponent: MoneyFormatCustom as any,
                        }}
                        helperText="숫자를 입력해주세요."
                    />
                    <TextField
                        id="incomeSource"
                        select
                        label="소득원"
                        defaultValue={"1"}
                        margin="normal"
                        style = {{width: 200}}
                    >
                        {_incomeSourceCode.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="finance"
                        select
                        label="금융기관"
                        defaultValue={"1"}
                        margin="normal"
                        style = {{width: 200, marginLeft: 10}}
                    >
                        {_financeCode.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="content"
                        label="내용"
                        multiline
                        maxRows={4}
                        fullWidth
                        margin="normal"
                        inputProps={{ maxLength: 300}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RegularIncome;