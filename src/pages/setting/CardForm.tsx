import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, AlertTitle, Link, MenuItem } from '@mui/material';
import { MoneyFormatCustom } from '../../utils/Mui';
import { _cycleCode, _dateCode, _accountCode, _incomeSourceCode, _monthCode, _bank, _cardCorp, _cardType } from '../../utils/cmnCode';

interface IDialogItem {
    cardType: string;
    cardCorp: string;
    cardName: string;
    paymentDate: string;
    account: string;
}

interface IRegularIncomeForm{
    dialogOpen: boolean;
    handleDialogClose: () => void;
}

function CardForm({dialogOpen, handleDialogClose}:IRegularIncomeForm) {
    const [cardType, setCardType] = React.useState("credit");
    const [showAccountAlert, setShowAccountAlert] = React.useState(false);

    const handleCardTypeChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        if(!event.target.value) return ;
        setCardType(event.target.value);
    }
    const handleAccountChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.value) return ;
        setShowAccountAlert(false);
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

                    if(!formJson.account) {
                        setShowAccountAlert(true);
                        return ;
                    }

                    handleDialogClose();
                },
            }}
        >
            <Alert 
                hidden={!showAccountAlert}
                severity="warning"
                action={
                    <Button color="inherit" size="large">
                      계속 진행
                    </Button>
                }
            >
                <Link href="/setting/account" color="inherit">연결 계좌</Link>를 선택하지 않으면 잔액에서 카드 결제액이 차감되지 않습니다. 계속 진행하시겠습니까?
            </Alert>

            <DialogTitle>카드 관리</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText> */}

                <TextField
                    id="cardType"
                    name="cardType"
                    select
                    label="구분"
                    defaultValue={"credit"}
                    margin="dense"
                    required
                    fullWidth
                    // style = {{width: 150}}
                    onChange={handleCardTypeChangeEvent}
                >
                    {_cardType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="cardCorp"
                    name="cardCorp"
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
                    name="cardName"
                    label="카드명"
                    required
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50}}
                />
                <TextField
                    id="paymentDate"
                    name="paymentDate"
                    select
                    required
                    hidden={cardType === 'check'}
                    label="결제일"
                    style = {{width: 100}}
                    margin="normal"
                >
                    {_dateCode.map((option, idx) => (
                        <MenuItem key={option.value} value={option.value} selected={idx === 0}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="account"
                    name="account"
                    select
                    label="연결 계좌"
                    margin="dense"
                    fullWidth
                    // style = {{width: 150}}
                    onChange={handleAccountChangeEvent}
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