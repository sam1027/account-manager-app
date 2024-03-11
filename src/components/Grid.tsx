import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DataGrid, GridRowsProp, GridColDef, GridRowModes, GridRowModesModel } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid/components';
import { GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowSelectionModel } from '@mui/x-data-grid/models';
import { Button } from '@mui/material';

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
    rowSelectionModel: GridRowSelectionModel;
    addType: EAddType;
    handleDialogAddClick: () => void;
}
  
function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel, rowSelectionModel, addType, handleDialogAddClick } = props;

    const handleAddNewRowClick = () => {
        if(addType === EAddType.NEW_ROW){
            const id = randomId();
            setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
            }));
        }else{
            handleDialogAddClick();
        }
    };

    const handleDelCheckedRowClick = () => {
        if(rowSelectionModel.length === 0) return ;

        rowSelectionModel.map(id => {
            setRows((oldRows) => [...oldRows.filter(row => row.id !== id)]);
            setRowModesModel((oldModel) => {
                delete oldModel[id];
                return {...oldModel};
            });
        });
    };

    const handleSaveClick = () => {
        console.log('Save')
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleAddNewRowClick}>
                Add
            </Button>
            <Button color="primary" startIcon={<DeleteIcon />} onClick={handleDelCheckedRowClick}>
                Delete
            </Button>
            <Button color="primary" startIcon={<SaveIcon />} onClick={handleSaveClick}>
                Save
            </Button>
        </GridToolbarContainer>
    );
}

export enum EGridType {
    ONLY_READ,
    INLINE_MODIFY,
    TOOLBAR_MODIFY,
    INLINE_TOOLBAR_MODIFY,
}

export enum EAddType {
    NEW_ROW,
    DIALOG,
}

interface IGrid {
    initialRows: GridRowsProp;
    columns: GridColDef[];
    gridType: EGridType;
    addType?: EAddType;
    handleDialogAddClick?: () => void;
}

function Grid({initialRows, columns, gridType, addType=EAddType.NEW_ROW, handleDialogAddClick}:IGrid) {
    if(gridType === EGridType.INLINE_MODIFY || gridType === EGridType.INLINE_TOOLBAR_MODIFY){
        columns = [
            ...columns,
            {
                field: 'actions',
                type: 'actions',
                headerName: '설정',
                width: 100,
                cellClassName: 'actions',
                getActions: ({ id }) => {
                  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
          
                  if (isInEditMode) {
                    return [
                      <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        sx={{
                          color: 'primary.main',
                        }}
                        onClick={handleSaveClick(id)}
                      />,
                      <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                      />,
                    ];
                  }
          
                  return [
                    <GridActionsCellItem
                      icon={<EditIcon />}
                      label="Edit"
                      className="textPrimary"
                      onClick={handleEditClick(id)}
                      color="inherit"
                    />,
                    <GridActionsCellItem
                      icon={<DeleteIcon />}
                      label="Delete"
                      onClick={handleDeleteClick(id)}
                      color="inherit"
                    />,
                  ];
                },
            },
        ];
    }
    
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
      };
    
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

    return (
        <DataGrid 
            autoHeight 
            rows={rows} 
            columns={columns} 
            editMode="row"
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 50,
                    },
                },
            }}
            pageSizeOptions={[50, 100, 200]}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
                toolbar: (gridType === EGridType.TOOLBAR_MODIFY || gridType === EGridType.INLINE_TOOLBAR_MODIFY) ? EditToolbar : null,
            }}
            slotProps={{
                toolbar: { setRows, setRowModesModel, rowSelectionModel, addType, handleDialogAddClick },
            }}
            checkboxSelection
            disableRowSelectionOnClick
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
            }}
        />
    );
}

export default Grid;