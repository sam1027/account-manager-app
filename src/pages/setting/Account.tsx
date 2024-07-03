import React from 'react';
import Grid, { EAddType, EGridType } from '../../components/Grid';
import { randomId } from "@mui/x-data-grid-generator";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarContainer, GridSlots, GridRowSelectionModel, useGridApiContext } from "@mui/x-data-grid";
import { _bank } from '../../utils/cmnCode';
import AccountForm from './AccountForm';
import HelmetTitle from '../../components/HelmetTitle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAccount, getAccountList } from '../../api/account';
import { IAccount } from '../../types/accountType';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { GridRowModesModel } from '@mui/x-data-grid';

function Account() {
    const queryClient = useQueryClient();

    // 조회
    const { data, isLoading, refetch } = useQuery<IAccount[]>({
        queryKey: ['accountList'],
        queryFn: getAccountList,
    })

    // 삭제
    const DeleteRowsFn = useMutation({
        mutationFn: () => {
            const selectedRows = rowSelectionModel as string[]
            console.log(selectedRows)
            return deleteAccount(selectedRows);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accountList'] });
            refetch();
        },
        onError: () => {

        },
        onSettled: () => {

        }
    });

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ['accountList'] });
        refetch();
    };

    const handleDialogAddClick = () => {
        handleDialogOpen();
    }

    const handleDeleteRows = () => {
        DeleteRowsFn.mutate();
    }

    /** Grid */
    const columns: GridColDef[] = [
        {
            field: 'bk_nm'
            , headerName: '금융기관'
            , width: 150
            , editable: false
        },
        {
            field: 'acnt_nm'
            , headerName: '계좌명'
            , width: 150
            , editable: false
        },
        {
            field: 'acnt_no'
            , headerName: '계좌번호'
            , width: 200
            , editable: false
        },
        {
            field: 'acnt_owner'
            , headerName: '예금주'
            , width: 150
            , editable: false
        },
        {
            field: 'acnt_init_money'
            , headerName: '초기 잔액(원)'
            , type: 'number'
            , width: 150
            , editable: false
            , align: 'right'
        },
        {
            field: 'acnt_crnt_money'
            , headerName: '현재 잔액(원)'
            , type: 'number'
            , width: 150
            , editable: false
            , align: 'right'
        },
    ];

    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

    function EditToolbar() {
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleDialogAddClick}>
                    Add
                </Button>
                <Button color="primary" startIcon={<RemoveIcon />} onClick={handleDeleteRows}>
                    Delete
                </Button>
            </GridToolbarContainer>
        );
    }

    return (
        <div>
            <HelmetTitle title="설정 | 계좌 관리" />

            {
                !isLoading &&
                data &&
                <DataGrid
                    columns={columns}
                    rows={data}
                    autoHeight
                    slots={{
                        toolbar: EditToolbar as GridSlots['toolbar'],
                    }}
                    checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                />
                // <Grid 
                //     initialRows={data} 
                //     columns={columns} 
                //     gridType={EGridType.TOOLBAR_MODIFY} 
                //     addType={EAddType.DIALOG} 
                //     handleDialogAddClick={handleDialogAddClick} 
                // />
            }

            <AccountForm dialogOpen={dialogOpen} handleDialogClose={handleDialogClose} />
        </div>
    );
}

export default Account;