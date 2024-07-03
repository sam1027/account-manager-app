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
import { QueryObserverResult, RefetchOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CODE_GROUP_ID, ICode } from '../../types/codeType';
import { getCodeList } from '../../api/code';
import { insertAccount } from '../../api/account';
import { IAccount } from '../../types/accountType';

interface IRegularIncomeForm {
    dialogOpen: boolean;
    handleDialogClose: () => void;
    bankCodes?: ICode[];
}

function AccountForm({ dialogOpen, handleDialogClose, bankCodes }: IRegularIncomeForm) {

    // 저장
    const InsertAccountFn = useMutation({
        mutationFn: (obj: IAccount) => insertAccount(obj),
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

    // 계좌 추가 이벤트
    const handleSaveClick = (obj: IAccount) => {
        InsertAccountFn.mutate(obj)
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
                    const formJson = Object.fromEntries((formData as any).entries()) as IAccount;
                    console.log(formJson);
                    handleSaveClick(formJson);
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
                    name='bk_id'
                    select
                    label="금융기관"
                    defaultValue={bankCodes ? bankCodes[0].cd_id : ""}
                    margin="dense"
                    required
                    fullWidth
                    style={{ width: 150 }}
                >
                    {
                        bankCodes &&
                        bankCodes.map((option) => (
                            <MenuItem key={option.cd_id} value={option.cd_id}>
                                {option.cd_nm}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    id="accountName"
                    name='acnt_nm'
                    label="계좌명"
                    required
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50 }}
                />
                <TextField
                    id="accountNumber"
                    name='acnt_no'
                    label="계좌번호"
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50 }}
                />
                <TextField
                    id="accountOwner"
                    name='acnt_owner'
                    label="예금주"
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50 }}
                />
                <TextField
                    error={false}
                    autoFocus
                    margin="normal"
                    id="accountInitMoney"
                    name="acnt_init_money"
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