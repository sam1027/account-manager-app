import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import { MoneyFormatCustom } from '../../utils/Mui';
import { _cycleCode, _dateCode, _accountCode, _incomeSourceCode, _monthCode, _bank, _cardCorp, _dateCodeCheckCardVersion, _cardType } from '../../utils/cmnCode';

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

function CardForm({dialogOpen, handleDialogClose}:IRegularIncomeForm) {
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
            <DialogTitle>카드 관리</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText> */}

                <TextField
                    id="cardType"
                    select
                    label="구분"
                    defaultValue={"1"}
                    margin="dense"
                    required
                    fullWidth
                    // style = {{width: 150}}
                >
                    {_cardType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="cardCorp"
                    select
                    label="카드사"
                    defaultValue={"1"}
                    margin="dense"
                    required
                    fullWidth
                    // style = {{width: 150}}
                >
                    {_cardCorp.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="cardName"
                    label="카드명"
                    required
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50}}
                />
                <TextField
                    id="paymentDate"
                    select
                    label="결제일"
                    defaultValue={new Date().getDate()}
                    style = {{width: 100}}
                    margin="normal"
                >
                    {
                        _dateCodeCheckCardVersion.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    id="account"
                    select
                    label="연결 계좌"
                    defaultValue={"1"}
                    margin="dense"
                    required
                    fullWidth
                    // style = {{width: 150}}
                >
                    {_accountCode.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CardForm;