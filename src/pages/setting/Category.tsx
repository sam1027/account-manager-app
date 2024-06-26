import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import ListSubheader from '@mui/material/ListSubheader';
import { _bank, _cardCorp, _categoryCode, _expdItemCode, _incomeSourceCode } from '../../utils/cmnCode';
import { Button, Divider, IconButton, Switch } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import {useImmer} from 'use-immer';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { randomId } from '@mui/x-data-grid-generator';
import HelmetTitle from '../../components/HelmetTitle';
import { getAllUser } from '../../api/user';
import {useQuery} from '@tanstack/react-query';
import { changeCodeUseYn, getCodeGrpList, getCodeList } from '../../api/code';
import { ICode, ICodeGrp } from '../../types/codeType';

interface ISubCategory{
    id:string;
    label:string;
    isUse:boolean;
}

function Category() {
    const [codeGrpId, setCodeGrpId] = React.useState("");
    const [subCategory, updateSubCategory] = useImmer<ISubCategory[]>([]);
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
        refetch();
    }, [codeGrpId]);

    // 코드그룹 클릭 이벤트
    const handleCodeGrpClick = (id:string) => {
        setCodeGrpId(() => id);
    }

    // 하위 카테고리 - 사용유무 변경 이벤트
    const handleIsUseChange = async (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const codeId = event.target.id;
        const useYn = checked ? "Y" : "N";
        await changeCodeUseYn(codeGrpId, codeId, useYn);
        await refetch();
    }

    // 하위 카테고리 - 삭제 이벤트
    const handleDeleteClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        // updateSubCategory((subCategory) => {
        //     const targetIdx = subCategory.findIndex(item => item.id === event.currentTarget.id);
        //     subCategory.splice(targetIdx, 1);
        // });
    }

    // 하위 카테고리 - 추가 이벤트
    const handleSubCatSaveClick = ({value}:any) => {
        updateSubCategory((subCategory) => {
            subCategory.push({
                id: randomId(),
                label: value,
                isUse: true
            });
        });
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
                            <ListItem disablePadding>
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
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<AddIcon />}
                                    onClick={handleAddFormOpen}
                                >
                                    추가
                                </Button>
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
                                key={item.cd_id}
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
                        handleSubCatSaveClick(formJson);
                        handleAddFormClose();
                    },
                }}
            >
                <DialogTitle>하위 카테고리</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        하위 카테고리 명을 입력하세요.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="value"
                        name="value"
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