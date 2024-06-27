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
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { changeCodeUseYn, deleteCode, getCodeGrpList, getCodeList, insertCode } from '../../api/code';
import { ICode, ICodeGrp, ICodeParams } from '../../types/codeType';

function Category() {
    const queryClient = useQueryClient();
    const [codeGrpId, setCodeGrpId] = React.useState("");
    const [addFormOpen, setAddFormOpen] = React.useState(false);

    const {data:codeGrpList, isLoading:isCodegrplistLoading} = useQuery<ICodeGrp[]>({
        queryKey: ['codeGrpList'],
        queryFn: getCodeGrpList,
    });

    const {data:codeList, isLoading:isCodeListLoading, refetch} = useQuery<ICode[]>({
        queryKey: ['codeList'],
        queryFn: () => getCodeList(codeGrpId),
        enabled: false,
    });

    React.useEffect(() => {
        if(codeGrpId) refetch();
    }, [codeGrpId]);

    // 코드그룹 클릭 이벤트
    const handleCodeGrpClick = (id:string) => {
        setCodeGrpId(() => id);
    }

    const ChangeCodeUseYnFn = useMutation({
        mutationFn: ({codeId, useYn}:ICodeParams) => {
            return changeCodeUseYn(codeGrpId, codeId, useYn!)
        },
        onSuccess: () => { 
            // 요청 성공
            // 요청 성공 시 해당 queryKey 유효성 제거
            queryClient.invalidateQueries({queryKey: ['codeList']});
            refetch();
        },
        onError: () => { 
            // 에러 발생 
        },
        onSettled: () => {
            // 결과에 관계 없이 무언가 실행됨
        }
    });

    const DeleteCodeFn = useMutation({
        mutationFn: ({codeId}:ICodeParams) => {
            console.log("2: " + codeId)
            return deleteCode(codeGrpId, codeId);
        },
        onSuccess: () => { 
            // 요청 성공
            // 요청 성공 시 해당 queryKey 유효성 제거
            queryClient.invalidateQueries({queryKey: ['codeList']});
            refetch();
        },
        onError: () => { 
            // 에러 발생 
        },
        onSettled: () => {
            // 결과에 관계 없이 무언가 실행됨
        }
    })

    const InsertCodeFn = useMutation({
        mutationFn: (obj:ICodeParams) => {
            return insertCode(codeGrpId, obj.codeId, obj.codeName!);
        },
        onSuccess: () => { 
            // 요청 성공
            // 요청 성공 시 해당 queryKey 유효성 제거
            queryClient.invalidateQueries({queryKey: ['codeList']});
            handleAddFormClose();
            refetch();
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
        InsertCodeFn.mutate(obj);
    }

    const handleAddFormOpen = () => {
        setAddFormOpen(true);
    };

    const handleAddFormClose = () => {
        setAddFormOpen(false);
    };

    return (
        <div style={{display: 'flex', alignItems: 'start', justifyContent: 'center'}}>
            <HelmetTitle title="설정 | 카테고리 관리" />

            <Box sx={{ width: '50%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List 
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                카테고리
                            </ListSubheader>
                        }
                    >
                        {!isCodegrplistLoading && 
                        codeGrpList &&
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
                                하위 카테고리
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
                        !isCodeListLoading &&
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
                                    checked={item.use_yn == 'Y' ? true : false}
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
                        label="하위 카테고리 아이디"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="codeName"
                        name="codeName"
                        label="하위 카테고리 명"
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

export default Category;