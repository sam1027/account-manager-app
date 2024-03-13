import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import { MoneyFormatCustom } from '../../utils/Mui';
import { _cycleCode, _dateCode, _accountCode, _incomeSourceCode, _monthCode } from '../../utils/cmnCode';

interface IDialogItem {
    cycle: number;
    month: number;
    date: number;
    amount: number;
    source: number;
    finance: number;
    content: string;
}

interface IRegularIncomeForm{
    dialogOpen: boolean;
    handleDialogClose: () => void;
}

function RegularIncomeForm({dialogOpen, handleDialogClose}:IRegularIncomeForm) {
    const [selectedCycle, setSelectedCycle] = React.useState("1");

    const handleCycleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCycle(event.target.value);
    }

    return (
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
                    id="account"
                    select
                    label="입금계좌"
                    defaultValue={"1"}
                    margin="normal"
                    style = {{width: 200, marginLeft: 10}}
                >
                    {_accountCode.map((option) => (
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
    );
}

export default RegularIncomeForm;