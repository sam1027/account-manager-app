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

interface ISubCategory{
    id:string;
    label:string;
    isUse:boolean;
}

function Category() {
    const [category, setCategory] = React.useState("bank");
    const [subCategory, updateSubCategory] = useImmer<ISubCategory[]>([]);
    const [addFormOpen, setAddFormOpen] = React.useState(false);

    React.useEffect(() => {
        findSubCatList();
    }, [category]);

    React.useEffect(() => {
        console.log('subCategory => ');
        console.log(subCategory);
    }, [subCategory]);
    
    // 카테고리 클릭 이벤트
    const handleCategoryClick = (id:string) => {
        setCategory(() => id);
    }

    // 하위 카테고리 - 목록 조회 함수
    const findSubCatList = () => {
        updateSubCategory((subCategory) => {
            subCategory.splice(0);
        });

        if(category === 'bank'){
            _bank.map((item, idx)=> {
                updateSubCategory((subCategory) => {
                    subCategory.push({
                        id: item.value,
                        label: item.label,
                        isUse: idx % 2 === 1
                    });
                });
            });
        }
        else if(category === 'cardCorp'){
            _cardCorp.map((item, idx)=> {
                updateSubCategory((subCategory) => {
                    subCategory.push({
                        id: item.value,
                        label: item.label,
                        isUse: idx % 2 === 1
                    });
                });
            });
        }
        else if(category === 'incomeSource'){
            _incomeSourceCode.map((item, idx)=> {
                updateSubCategory((subCategory) => {
                    subCategory.push({
                        id: item.value,
                        label: item.label,
                        isUse: idx % 2 === 1
                    });
                });
            });
        }
        else if(category === 'expdItem'){
            _expdItemCode.map((item, idx)=> {
                updateSubCategory((subCategory) => {
                    subCategory.push({
                        id: item.value,
                        label: item.label,
                        isUse: idx % 2 === 1
                    });
                });
            });
        }
    }

    // 하위 카테고리 - 사용유무 변경 이벤트
    const handleIsUseChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateSubCategory((subCategory) => {
            subCategory.map(item => {
                if(item.id === event.target.id) item.isUse = checked;
            })
        });
    }

    // 하위 카테고리 - 삭제 이벤트
    const handleDeleteClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        updateSubCategory((subCategory) => {
            const targetIdx = subCategory.findIndex(item => item.id === event.currentTarget.id);
            subCategory.splice(targetIdx, 1);
        });
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
                        {_categoryCode.map(item => (
                            <ListItem disablePadding>
                                <ListItemButton
                                    key={item.id}
                                    selected={category === item.id}
                                    onClick={() => handleCategoryClick(item.id)}
                                >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
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
                        {subCategory ? 
                            subCategory.map(item => (
                            <>
                                <ListItem
                                    secondaryAction={
                                        <IconButton 
                                            id={item.id}
                                            edge="end" 
                                            aria-label="delete"
                                            onClick={handleDeleteClick}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    }
                                    key={item.id}
                                >
                                    <ListItemText primary={item.label} />
                                    <Switch
                                        edge="end"
                                        id={item.id}
                                        onChange={handleIsUseChange}
                                        checked={item.isUse}
                                        inputProps={{
                                            'aria-labelledby': 'switch-list-label-wifi',
                                        }}
                                    />
                                </ListItem>
                                <Divider variant="middle" component="li" />
                            </>
                            ))
                        :
                            null
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