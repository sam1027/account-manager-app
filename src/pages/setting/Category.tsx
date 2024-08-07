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
import { deleteCode } from '../../api/code';
import { ICodeParams } from '../../types/codeType';
import { changeSubCatUseYn, deleteSubCat, getCatList, getSubCatList, insertSubCat } from '../../api/cat';
import { ICat, ISubCat, ISubCatUseYn } from '../../types/catType';

function Category() {
    const queryClient = useQueryClient();
    const [catId, setCatId] = React.useState("");
    const [addFormOpen, setAddFormOpen] = React.useState(false);

    const {data:catList, isLoading} = useQuery<ICat[]>({
        queryKey: ['catList'],
        queryFn: getCatList,

    });

    const {data:subCatList, refetch} = useQuery<ISubCat[]>({
        queryKey: ['subCatList'],
        queryFn: () => getSubCatList(catId),
        enabled: false,
    });

    React.useEffect(() => {
        if(catId) refetch();
    }, [catId]);

    React.useEffect(() => {
        if (catList && !isLoading) {
            setCatId(catList[0]?.cat_id);
        }
    }, [catList, isLoading]);

    // 코드그룹 클릭 이벤트
    const handleCatClick = (id:string) => {
        setCatId(() => id);
    }

    // 사용여부 변경
    const changeSubCatUseYnFn = useMutation({
        mutationFn: ({sub_cat_id, use_yn}:ISubCatUseYn) => {
            return changeSubCatUseYn(catId, sub_cat_id, use_yn);
        },
        onSuccess: () => { 
            // 요청 성공
            // 요청 성공 시 해당 queryKey 유효성 제거
            queryClient.invalidateQueries({queryKey: ['subCatList']});
            refetch();
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
        mutationFn: ({subCatId}:{subCatId:string}) => {
            return deleteSubCat(catId, subCatId);
        },
        onSuccess: () => { 
            // 요청 성공
            // 요청 성공 시 해당 queryKey 유효성 제거
            queryClient.invalidateQueries({queryKey: ['subCatList']});
            refetch();
        },
        onError: () => { 
            // 에러 발생 
        },
        onSettled: () => {
            // 결과에 관계 없이 무언가 실행됨
        }
    })

    // 추가
    const InsertSubCatFn = useMutation({
        mutationFn: (obj:ISubCat) => {
            return insertSubCat(catId, obj.sub_cat_nm);
        },
        onSuccess: () => { 
            // 요청 성공
            // 요청 성공 시 해당 queryKey 유효성 제거
            queryClient.invalidateQueries({queryKey: ['subCatList']});
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
        const sub_cat_id = event.target.id;
        const use_yn = checked ? "Y" : "N";
        changeSubCatUseYnFn.mutate({sub_cat_id, use_yn});
    }

    // 코드 - 삭제 이벤트
    const handleDeleteClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const subCatId = event.currentTarget.id;
        DeleteCodeFn.mutate({subCatId});
    }

    // 코드 - 추가 이벤트
    const handleSaveClick = (obj:ISubCat) => {
        InsertSubCatFn.mutate(obj);
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
                        {catList &&
                        catList.map(item => (
                            <ListItem key={item.cat_id} disablePadding>
                                <ListItemButton
                                    key={item.cat_id}
                                    selected={catId === item.cat_id}
                                    onClick={() => handleCatClick(item.cat_id)}
                                >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.cat_nm} />
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
                                {catId && <Button 
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
                        subCatList &&
                        subCatList.map(item => (
                            <>
                                <ListItem
                                    key={item.sub_cat_id}
                                    secondaryAction={
                                        item.is_system !== 'Y' &&
                                        <IconButton 
                                            id={item.sub_cat_id}
                                            edge="end" 
                                            aria-label="delete"
                                            onClick={handleDeleteClick}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText primary={item.sub_cat_nm} />
                                    {item.is_system !== 'Y' &&
                                    <Switch
                                        edge="end"
                                        id={item.sub_cat_id}
                                        onChange={handleIsUseChange}
                                        checked={item.use_yn === 'Y' ? true : false}
                                        inputProps={{
                                            'aria-labelledby': 'switch-list-label-wifi',
                                        }}
                                    />
                                    }
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
                        const formJson = Object.fromEntries((formData as any).entries()) as ISubCat;
                        handleSaveClick(formJson);
                    },
                }}
            >
                <DialogTitle>하위 카테고리</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="sub_cat_nm"
                        name="sub_cat_nm"
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