import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Link, MenuItem } from '@mui/material';
import { _cycleCode, _dateCode, _accountCode, _incomeSourceCode, _monthCode, _bank, _cardCorp, _cardType } from '../../utils/cmnCode';
import { CARD_TYPE, ICode } from '../../types/codeType';
import { IAccount } from '../../types/accountType';
import { ICard } from '../../types/cardType';
import { useMutation } from '@tanstack/react-query';
import { insertCard } from '../../api/card';

interface IRegularIncomeForm {
    dialogOpen: boolean;
    handleDialogClose: () => void;
    cardTypeCodes?: ICode[];
    cardCorpCodes?: ICode[];
    accountList?: IAccount[];
}

function CardForm({ dialogOpen, handleDialogClose, cardTypeCodes, cardCorpCodes, accountList }: IRegularIncomeForm) {
    const [cardType, setCardType] = React.useState<string>(cardTypeCodes ? cardTypeCodes[0].cd_id : CARD_TYPE.CHECK);
    const [showAccountAlert, setShowAccountAlert] = React.useState(false);

    const handleCardTypeChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        if (!event.target.value) return;
        setCardType(event.target.value);
    }
    const handleAccountChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) return;
        setShowAccountAlert(false);
    }

    // 저장
    const InsertCardFn = useMutation({
        mutationFn: (obj: ICard) => insertCard(obj),
        onSuccess: () => {
            // 요청 성공
            // 요청 성공 시 해당 queryKey 유효성 제거
            handleDialogClose();
        },
        onError: () => {
            // 에러 발생 
        },
        onSettled: () => {
            // 결과에 관계 없이 무언가 실행됨
        }
    });

    const handleSaveClick = (obj: ICard) => {
        InsertCardFn.mutate(obj)
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
                    const formJson = Object.fromEntries((formData as any).entries()) as ICard;
                    console.log(formJson);

                    if (!formJson.acnt_id) {
                        setShowAccountAlert(true);
                        return;
                    }

                    handleSaveClick(formJson);
                },
            }}
        >
            <Alert
                hidden={!showAccountAlert}
                severity="warning"
                action={
                    <Button color="inherit" size="large" type='submit'>
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
                    id="card_type_cd"
                    name="card_type_cd"
                    select
                    label="구분"
                    defaultValue={cardTypeCodes ? cardTypeCodes[0].cd_id : null}
                    margin="dense"
                    required
                    fullWidth
                    // style = {{width: 150}}
                    onChange={handleCardTypeChangeEvent}
                >
                    {
                        cardTypeCodes &&
                        cardTypeCodes.map((option) => (
                            <MenuItem key={option.cd_id} value={option.cd_id}>
                                {option.cd_nm}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    id="card_corp_cd"
                    name="card_corp_cd"
                    select
                    label="카드사"
                    defaultValue={cardCorpCodes ? cardCorpCodes[0].cd_id : null}
                    margin="dense"
                    required
                    fullWidth
                // style = {{width: 150}}
                >
                    {
                        cardCorpCodes &&
                        cardCorpCodes.map((option) => (
                            <MenuItem key={option.cd_id} value={option.cd_id}>
                                {option.cd_nm}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    id="card_nm"
                    name="card_nm"
                    label="카드명"
                    required
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50 }}
                />
                {
                    cardType == CARD_TYPE.CREDIT ?
                        <TextField
                            id="card_pay_dt"
                            name="card_pay_dt"
                            select
                            required
                            label="결제일"
                            style={{ width: 100 }}
                            margin="normal"
                            defaultValue={1}
                        >
                            {_dateCode.map((option, idx) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        : null
                }
                <TextField
                    id="acnt_id"
                    name="acnt_id"
                    select
                    label="연결 계좌"
                    margin="dense"
                    fullWidth
                    // style = {{width: 150}}
                    onChange={handleAccountChangeEvent}
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
            </DialogContent>

            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CardForm;