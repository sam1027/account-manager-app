import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import ListSubheader from '@mui/material/ListSubheader';
import { _categoryCode } from '../../utils/cmnCode';
import { Button, Divider, IconButton, Switch } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

function Category() {
    const [selectedCategory, setSelectedCategory] = React.useState("bank");
    
    function handleCategoryClick(id:string){
        setSelectedCategory(id);
    }

    return (
        <div style={{display: 'flex', alignItems: 'start', justifyContent: 'center'}}>
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
                                    selected={selectedCategory === item.id}
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
                        {_categoryCode.map(item => (
                            <>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <ClearIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={item.label} />
                                <Switch
                                    edge="end"
                                    // onChange={handleToggle('wifi')}
                                    // checked={checked.indexOf('wifi') !== -1}
                                    inputProps={{
                                        'aria-labelledby': 'switch-list-label-wifi',
                                    }}
                                />
                            </ListItem>
                            <Divider variant="middle" component="li" />
                            </>
                        ))}
                    </List>
                </nav>
            </Box>
        </div>
    );
}

export default Category;