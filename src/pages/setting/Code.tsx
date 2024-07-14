import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import ListSubheader from '@mui/material/ListSubheader';
import { Button, Divider, IconButton, Switch } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HelmetTitle from '../../components/HelmetTitle';
import {useMutation} from '@tanstack/react-query';
import { changeCodeUseYn, deleteCode, insertCode } from '../../api/code';
import { ICode, ICodeGrp, ICodeParams } from '../../types/codeType';
import { useCodeGrpStore, useCodeStore } from '../../store/commonStore';
import { isOnlyEnglish } from '../../utils/common';

function Code() {
    const codeGrpStore = useCodeGrpStore();
    const codeStore = useCodeStore();
    const [codeGrpId, setCodeGrpId] = React.useState("");
    const [addFormOpen, setAddFormOpen] = React.useState(false);
    const [codeGrpList, setCodeGrpList] = React.useState<ICodeGrp[]>([]);
    const [codeList, setCodeList] = React.useState<ICode[]>([]);

    React.useEffect(() => {
        if(codeGrpStore.codeGrpList.length > 0) {
            setCodeGrpList(codeGrpStore.codeGrpList);
            setCodeGrpId(codeGrpStore.codeGrpList[0]?.cd_grp_id);
        }
    }, []);

    React.useEffect(() => {
        if(codeGrpId) getCodeListByCodeGroup();
    }, [codeGrpId]);

    const getCodeListByCodeGroup = async () => {
        await codeStore.fetch.storeCodeList();
        const result = await codeStore.action.getCodeListByGrpId(codeGrpId);
        setCodeList(result);
    }

    // 코드그룹 클릭 이벤트
    const handleCodeGrpClick = (id:string) => {
        setCodeGrpId(() => id);
    }

    // 사용여부 변경
    const ChangeCodeUseYnFn = useMutation({
        mutationFn: ({codeId, useYn}:ICodeParams) => {
            return changeCodeUseYn(codeGrpId, codeId, useYn!)
        },
        onSuccess: () => { 
            getCodeListByCodeGroup();
        },
        onError: () => { 
            // 에러 발생 
        },
        onSettled: () => {
            // 결과에 관계 없이 무언가 실행됨
        }
    });

    // 삭제
    const DeleteCodeFn = useMutation({
        mutationFn: ({codeId}:ICodeParams) => {
            return deleteCode(codeGrpId, codeId);
        },
        onSuccess: () => { 
            getCodeListByCodeGroup();
        },
        onError: () => { 
            // 에러 발생 
        },
        onSettled: () => {
            // 결과에 관계 없이 무언가 실행됨
        }
    })

    // 추가
    const InsertCodeFn = useMutation({
        mutationFn: (obj:ICodeParams) => {
            return insertCode(codeGrpId, obj.codeId, obj.codeName!);
        },
        onSuccess: () => { 
            handleAddFormClose();
            getCodeListByCodeGroup();
        },
        onError: () => { 
            // 에러 발생 
        },
        onSettled: () => {
            // 결과에 관계 없이 무언가 실행됨
        }
    })

    // 코드 - 사용유무 변경 이벤트
    const handleIsUseChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const codeId = event.target.id;
        const useYn = checked ? "Y" : "N";
        ChangeCodeUseYnFn.mutate({codeId, useYn});
    }

    // 코드 - 삭제 이벤트
    const handleDeleteClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const codeId = event.currentTarget.id;
        DeleteCodeFn.mutate({codeId});
    }

    // 코드 - 추가 이벤트
    const handleCodeSaveClick = (obj:ICodeParams) => {
        /* validate */
        if(!isOnlyEnglish(obj.codeId)){
            alert("영어로만 코드아이디를 입력하세요.");
            return; 
        }else{
            obj.codeId = obj.codeId.toUpperCase();
        }

        if(isCodeIdDupl(obj.codeId).length > 0) {
            alert("코드아이디 중복입니다.");
            return;
        } 

        InsertCodeFn.mutate(obj);
    }

    // 코드ID 중복체크
    const isCodeIdDupl = (codeId:string) => {
        console.log('codeIdDupl', codeId);
        const result = codeStore.action.getCodeByGrpIdAndCodeId(codeGrpId, codeId);
        console.log('isCodeIdDupl result', result);
        return result;
    }

    const handleAddFormOpen = () => {
        setAddFormOpen(true);
    };

    const handleAddFormClose = () => {
        setAddFormOpen(false);
    };

    return (
        <div style={{display: 'flex', alignItems: 'start', justifyContent: 'center'}}>
            <HelmetTitle title="설정 | 코드 관리" />

            <Box sx={{ width: '50%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List 
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                코드
                            </ListSubheader>
                        }
                    >
                        {codeGrpList &&
                        codeGrpList.map(item => (
                            <ListItem key={item.cd_grp_id} disablePadding>
                                <ListItemButton
                                    key={item.cd_grp_id}
                                    selected={codeGrpId === item.cd_grp_id}
                                    onClick={() => handleCodeGrpClick(item.cd_grp_id)}
                                >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.cd_grp_nm} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </nav>
            </Box>
            <Box sx={{ width: '50%', maxWidth: 500, bgcolor: 'background.paper', marginLeft: '150px' }}>
                <nav aria-label="main mailbox folders">
                    <List
                        subheader={
                            <ListSubheader 
                                component="div" 
                                id="nested-list-subheader" 
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                하위 코드
                                {codeGrpId && <Button 
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<AddIcon />}
                                    onClick={handleAddFormOpen}
                                >
                                    추가
                                </Button>}
                            </ListSubheader>
                        }
                        sx={{
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            // borderRadius: 2,
                            // border: '1px solid',
                            // borderColor: 'divider',
                        }}
                        dense={true}
                    >
                        {
                        codeList &&
                        codeList.map(item => (
                            <>
                            <ListItem
                                key={item.cd_id}
                                secondaryAction={
                                    <IconButton 
                                        id={item.cd_id}
                                        edge="end" 
                                        aria-label="delete"
                                        onClick={handleDeleteClick}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={item.cd_nm} />
                                <Switch
                                    edge="end"
                                    id={item.cd_id}
                                    onChange={handleIsUseChange}
                                    checked={item.use_yn === 'Y' ? true : false}
                                    inputProps={{
                                        'aria-labelledby': 'switch-list-label-wifi',
                                    }}
                                />
                            </ListItem>
                            <Divider variant="middle" component="li" />
                        </>
                        ))
                        }
                    </List>
                </nav>
            </Box>

            <Dialog
                open={addFormOpen}
                onClose={handleAddFormClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const params:ICodeParams = JSON.parse(JSON.stringify(formJson));
                        handleCodeSaveClick(params);
                    },
                }}
            >
                <DialogTitle>하위 카테고리</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="codeId"
                        name="codeId"
                        label="하위 코드 아이디"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="codeName"
                        name="codeName"
                        label="하위 코드명"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddFormClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Code;