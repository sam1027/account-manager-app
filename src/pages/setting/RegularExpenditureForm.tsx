import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, InputAdornment, MenuItem, Switch } from '@mui/material';
import { MoneyFormatCustom } from '../../utils/Mui';
import { _cycleCode, _dateCode, _accountCode, _incomeSourceCode, _monthCode, _expdWayCode, _cardCode, _expdItemCode } from '../../utils/cmnCode';
import { ICard } from '../../types/cardType';
import { CYCLE_TYPE, ICode, PAY_MTD_TYPE } from '../../types/codeType';
import { IAccount } from '../../types/accountType';

interface IDialogItem {
    cycle: string;
    month: string;
    date: string;
    amount: string;
    expdWay: string;
    expdMethod: string;
    account: string;
    expdItem: string;
    content: string;
    isUse: boolean;
}

interface IRegularExpenditureForm{
    dialogOpen: boolean;
    handleDialogClose: () => void;
    cardList?: ICard[];
    payMethodCodes?: ICode[];
    cycleCodes?: ICode[];
    expendTypeCodes?: ICode[];
    accountList?: IAccount[];
}

function RegularExpenditureForm({
    dialogOpen, 
    handleDialogClose,
    cardList,
    payMethodCodes,
    cycleCodes,
    expendTypeCodes,
    accountList,
}:IRegularExpenditureForm) {
    const [selectedCycle, setSelectedCycle] = React.useState("");
    const [expdWay, setExpdWay] = React.useState("");

    const handleCycleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCycle(event.target.value);
    }

    const handleExpdWayChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.value) return; 
        setExpdWay(event.target.value);
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
                    // handleDialogClose();
                },
            }}
        >
            <DialogTitle>정기 지출</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText> */}
                <TextField
                    id="cycle"
                    name="cycle"
                    select
                    label="실행 주기"
                    defaultValue={selectedCycle}
                    margin="dense"
                    fullWidth
                    style = {{width: 150}}
                    onChange={handleCycleChangeEvent}
                >
                    {
                        cycleCodes &&
                        cycleCodes.map((option) => (
                            <MenuItem key={option.cd_id} value={option.cd_id}>
                                {option.cd_nm}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    id="month"
                    name="month"
                    hidden={selectedCycle !== CYCLE_TYPE.EVERY_YEAR}
                    disabled={selectedCycle !== CYCLE_TYPE.EVERY_YEAR}
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
                    name="date"
                    hidden={selectedCycle === CYCLE_TYPE.EVERY_DAY}
                    disabled={selectedCycle === CYCLE_TYPE.EVERY_DAY}
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
                        startAdornment: <InputAdornment position="start">₩</InputAdornment>
                    }}
                    helperText="숫자를 입력해주세요."
                />
                <TextField
                    id="expdWay"
                    name="expdWay"
                    select
                    label="결제 수단"
                    defaultValue={expdWay}
                    margin="dense"
                    fullWidth
                    required
                    onChange={handleExpdWayChangeEvent}
                >
                    {
                        payMethodCodes &&
                        payMethodCodes.map((option) => (
                            <MenuItem key={option.cd_id} value={option.cd_id}>
                                {option.cd_nm}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    id="expdMethod"
                    name="expdMethod"
                    hidden={expdWay !== PAY_MTD_TYPE.CARD}
                    disabled={expdWay !== PAY_MTD_TYPE.CARD}
                    select
                    label="결제 카드"
                    margin="dense"
                    required
                    fullWidth
                >
                    {
                        cardList &&
                        cardList.map((option) => (
                            <MenuItem key={option.card_id} value={option.card_id}>
                                {option.card_nm}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    id="account"
                    name="account"
                    hidden={expdWay === PAY_MTD_TYPE.CARD}
                    disabled={expdWay === PAY_MTD_TYPE.CARD}
                    select
                    label="결제 계좌"
                    margin="dense"
                    required
                    fullWidth
                >
                    {
                        accountList && 
                        accountList.map((option) => (
                            <MenuItem key={option.acnt_id} value={option.acnt_id}>
                                {option.acnt_nm}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    id="expdItem"
                    name="expdItem"
                    select
                    label="지출 항목"
                    margin="dense"
                    required
                    fullWidth
                >
                    {
                        expendTypeCodes &&
                        expendTypeCodes.map((option) => (
                            <MenuItem key={option.cd_id} value={option.cd_id}>
                                {option.cd_nm}
                            </MenuItem>
                        ))
                    }   
                </TextField>
                <TextField
                    id="content"
                    name="content"
                    label="내용"
                    multiline
                    maxRows={4}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 300}}
                />
                <FormControlLabel 
                    control={
                        <Switch 
                            defaultChecked 
                        />
                    } 
                    name="isUse"
                    value={true}
                    label="자동반영" 
                    labelPlacement="start"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RegularExpenditureForm;