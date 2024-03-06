import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DataGrid, GridRowsProp, GridColDef, GridRowModes, GridRowModesModel } from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
import { GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid/components';
import { GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel } from '@mui/x-data-grid/models';
import { Button } from '@mui/material';

const initialRows: GridRowsProp = [
    { id: randomId(), ocrDate: randomCreatedDate(), amount: '20000', source: '불로소득', finance: '우리은행', memo: '기타1' },
    { id: randomId(), ocrDate: randomCreatedDate(), amount: '1000', source: '월급', finance: '국민은행', memo: '기타2' },
    { id: randomId(), ocrDate: randomCreatedDate(), amount: '50000', source: '불로소득', finance: '현금', memo: '기타3' },
];
interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}
  
function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            Add record
        </Button>
        </GridToolbarContainer>
    );
}

function Income() {
    const columns: GridColDef[] = [
        { 
            field: 'ocrDate'
            , headerName: '발생일'
            , type: 'date'
            , width: 150
            , editable: true
        },
        { 
            field: 'amount'
            , headerName: '금액'
            , width: 150
            , editable: true
            , align: 'right'
        },
        { 
            field: 'source'
            , headerName: '소득원'
            , width: 150
            , editable: true
            , type: 'singleSelect'
            , valueOptions: ['월급','불로소득','부업','알바비']
            , align: 'left'
        },
        { 
            field: 'finance'
            , headerName: '금융처'
            , width: 150
            , editable: true
            , type: 'singleSelect'
            , valueOptions: ['국민은행','우리은행','현금']
            , align: 'left'
        },
        { 
            field: 'memo'
            , headerName: '메모'
            , width: 150
            , editable: true
            , align: 'left'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
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
    
    return (
        <div>
            <h1>Income</h1>
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
                checkboxSelection
                disableRowSelectionOnClick
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </div>
    );
}

export default Income;