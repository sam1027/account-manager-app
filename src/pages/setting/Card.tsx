import React from 'react';
import Grid, { EAddType, EGridType } from '../../components/Grid';
import { randomId } from "@mui/x-data-grid-generator";
import { DataGrid, GridColDef, GridRowSelectionModel, GridRowsProp, GridSlots, GridToolbarContainer } from "@mui/x-data-grid";
import { _bank, _cardCorp, _cardType } from '../../utils/cmnCode';
import CardForm from './CardForm';
import HelmetTitle from '../../components/HelmetTitle';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CODE_GROUP_ID, ICode } from '../../types/codeType';
import { getCodeList } from '../../api/code';
import { getAccountList } from '../../api/account';
import { IAccount } from '../../types/accountType';
import { ICard } from '../../types/cardType';
import { deleteCard, getCardList } from '../../api/card';

function Card() {
    const queryClient = useQueryClient();

    // 카드구분 코드목록 조회
    const { data: cardTypeCodes } = useQuery<ICode[]>({
        queryKey: ['cardTypeCodes'],
        queryFn: () => getCodeList(CODE_GROUP_ID.CARD_TYPE),
    });

    // 카드사 코드목록 조회
    const { data: cardCorpCodes } = useQuery<ICode[]>({
        queryKey: ['cardCorpCodes'],
        queryFn: () => getCodeList(CODE_GROUP_ID.CARD_CORP),
    });

    // 계좌 목록 조회
    const { data: accountList } = useQuery<IAccount[]>({
        queryKey: ['accountList'],
        queryFn: getAccountList,
    });

    // 카드 목록 조회
    const { data, isLoading, refetch } = useQuery<ICard[]>({
        queryKey: ['cardList'],
        queryFn: getCardList,
    })

    // 삭제
    const DeleteRowsFn = useMutation({
        mutationFn: () => {
            const selectedRows = rowSelectionModel as string[]
            console.log(selectedRows)
            return deleteCard(selectedRows);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cardList'] });
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
        queryClient.invalidateQueries({ queryKey: ['cardList'] });
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
            field: 'card_type_nm'
            , headerName: '구분'
            , width: 150
            , editable: false
        },
        {
            field: 'card_corp_nm'
            , headerName: '카드사'
            , width: 150
            , editable: false
        },
        {
            field: 'card_nm'
            , headerName: '카드명'
            , width: 150
            , editable: false
        },
        {
            field: 'card_pay_dt'
            , headerName: '결제일'
            , width: 150
            , editable: false
            , type: 'number'
            , valueGetter: (value, row) => {
                if (!value) return;
                return `${value}일`;
            },
        },
        {
            field: 'acnt_nm'
            , headerName: '연결 계좌'
            , width: 150
            , editable: false
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
            <HelmetTitle title="설정 | 카드 관리" />

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
                    getRowId={(row) => row.card_id}
                />

            }

            {/* <Grid 
                initialRows={initialRows} 
                columns={columns} 
                gridType={EGridType.TOOLBAR_MODIFY} 
                addType={EAddType.DIALOG} 
                handleDialogAddClick={handleDialogAddClick} 
            /> */}

            <CardForm
                dialogOpen={dialogOpen}
                handleDialogClose={handleDialogClose}
                cardTypeCodes={cardTypeCodes}
                cardCorpCodes={cardCorpCodes}
                accountList={accountList}
            />
        </div>
    );
}

export default Card;