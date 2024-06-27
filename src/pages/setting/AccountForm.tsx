import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputAdornment, MenuItem } from '@mui/material';
import { MoneyFormatCustom } from '../../utils/Mui';
import { _cycleCode, _dateCode, _accountCode, _incomeSourceCode, _monthCode } from '../../utils/cmnCode';
import { useQuery } from '@tanstack/react-query';
import { ICode } from '../../types/codeType';
import { getCodeList } from '../../api/code';

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

function AccountForm({dialogOpen, handleDialogClose}:IRegularIncomeForm) {
    const {data:bankCodes, isLoading:isBankLoading} = useQuery<ICode[]>({
        queryKey: ['backCodes'],
        queryFn: () => getCodeList('CDG0004'),
    });

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
                    handleDialogClose();
                },
            }}
        >
            <DialogTitle>계좌 관리</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText> */}

                <TextField
                    id="bankSelect"
                    name='bank'
                    select
                    label="금융기관"
                    defaultValue={bankCodes ? bankCodes[0].cd_id : ""}
                    margin="dense"
                    required
                    fullWidth
                    style = {{width: 150}}
                >
                    {!isBankLoading &&
                    bankCodes &&
                    bankCodes.map((option) => (
                        <MenuItem key={option.cd_id} value={option.cd_id}>
                            {option.cd_nm}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="accountName"
                    name='accountName'
                    label="계좌명"
                    required
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50}}
                />
                <TextField
                    id="accountNumber"
                    name='accountNumber'
                    label="계좌번호"
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50}}
                />
                <TextField
                    id="accountOwner"
                    name='accountOwner'
                    label="예금주"
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50}}
                />
                <TextField
                    error={false}
                    autoFocus
                    margin="normal"
                    id="accountInitMoney"
                    name="accountInitMoney"
                    label="초기 잔액(원)"
                    fullWidth
                    variant="standard"
                    InputProps={{
                        inputComponent: MoneyFormatCustom as any,
                        startAdornment: <InputAdornment position="start">₩</InputAdornment>
                    }}
                    helperText="숫자를 입력해주세요."
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AccountForm;