import React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel, GridRowsProp, GridSlots, GridToolbarContainer } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import Grid, { EAddType, EGridType } from "../../components/Grid";
import { _cycleCode, _accountCode, _incomeSourceCode, _expdItemCode, _cardCode, _expdWayCode } from '../../utils/cmnCode';
import { Box, Button } from '@mui/material';
import RegularExpenditureForm from './RegularExpenditureForm';
import HelmetTitle from '../../components/HelmetTitle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useQuery } from '@tanstack/react-query';
import { CODE_GROUP_ID, ICode } from '../../types/codeType';
import { getCodeList, getCodeListByCodeGroup } from '../../api/code';
import { ICard } from '../../types/cardType';
import { getCardList } from '../../api/card';
import { useCodeStore } from '../../store/commonStore';
import { IAccount } from '../../types/accountType';
import { getAccountList } from '../../api/account';

function RegularExpenditure() {
    // 실행 주기 코드목록 조회
    const { data: cycleCodes } = useQuery<ICode[]>({
        queryKey: ['cycleCodes'],
        queryFn: () => getCodeListByCodeGroup(CODE_GROUP_ID.CYCLE),
    });

    // 결제 수단 코드목록 조회
    const { data: payMethodCodes } = useQuery<ICode[]>({
        queryKey: ['payMethodCodes'],
        queryFn: () => getCodeListByCodeGroup(CODE_GROUP_ID.PAY_METHOD),
    });

    // 결제 계좌 목록 조회
    const { data:accountList} = useQuery<IAccount[]>({
        queryKey: ['accountList'],
        queryFn: getAccountList,
    })

    // 결제 카드 목록 조회
    const { data:cardList} = useQuery<ICard[]>({
        queryKey: ['cardList'],
        queryFn: getCardList,
    })

    // 지출 항목 코드목록 조회
    const { data: expendTypeCodes } = useQuery<ICode[]>({
        queryKey: ['expendTypeCodes'],
        queryFn: () => getCodeListByCodeGroup(CODE_GROUP_ID.EXPEND_TYPE),
    });

    const data: GridRowsProp = [
        { 
            id: randomId(), 
            cycle: '1', 
            month: 12, 
            date: 23, 
            amount: 20000, 
            expdWay: 'card', 
            expdMethod: '1', 
            account: '1',
            expdItem: '1',
            content: '기타1', 
            isUse: true 
        },
        { 
            id: randomId(), 
            cycle: '2', 
            month: null, 
            date: 23, 
            amount: 20000, 
            expdWay: 'card', 
            expdMethod: '1', 
            account: '1',
            expdItem: '1',
            content: '기타1', 
            isUse: false 
        },
    ];

    const columns: GridColDef[] = [
        { 
            field: 'cycle'
            , headerName: '실행 주기'
            , width: 100
            , editable: false
            , type: 'singleSelect'
            , valueOptions: _cycleCode
        },
        { 
            field: 'month'
            , headerName: '월(Month)'
            , width: 100
            , editable: false
            // , valueFormatter: (params: GridValueFormatterParams<number>) => {
            //     if (params.value == null) {
            //       return '';
            //     }
            //     return `${params.value}월`;
            // },
        },
        { 
            field: 'date'
            , headerName: '일(Date)'
            , width: 100
            , editable: false
            // , valueFormatter: (params: GridValueFormatterParams<number>) => {
            //     if (params.value == null) {
            //       return '';
            //     }
            //     return `${params.value}일`;
            // },
        },
        { 
            field: 'amount'
            , headerName: '금액'
            , type: 'number'
            , width: 100
            , editable: false
            , align: 'right'
            // , valueFormatter: (params: GridValueFormatterParams<number>) => {
            //     if (params.value == null) {
            //       return '';
            //     }
            //     return `${params.value.toLocaleString()}`;
            // },
        },
        // 공통코드
        { 
            field: 'expdWay'
            , headerName: '결제 수단'
            , width: 150
            , editable: true
            , type: 'singleSelect'
            , valueOptions: _expdWayCode
            , align: 'left'
        },
        // 결재수단 '카드'인 경우만 활성화
        { 
            field: 'expdMethod'
            , headerName: '결제 카드'
            , width: 150
            , editable: true
            , type: 'singleSelect'
            , valueOptions: _cardCode
            , align: 'left'
        },
        // 결재수단 '현금'인 경우만 활성화
        // 결재 카드 선택하면 자동으로 연동됨
        { 
            field: 'account'
            , headerName: '결제 계좌'
            , width: 150
            , editable: true
            , type: 'singleSelect'
            , valueOptions: _accountCode
            , align: 'left'
        },
        // 카테고리 항목으로 관리
        { 
            field: 'expdItem'
            , headerName: '지출 항목'
            , width: 150
            , editable: true
            , type: 'singleSelect'
            , valueOptions: _expdItemCode
            , align: 'left'
        },
        { 
            field: 'content'
            , headerName: '내용'
            , width: 300
            , editable: false
            , align: 'left'
        },
        { 
            field: 'isUse'
            , headerName: '자동 반영'
            , type: 'boolean'
            , width: 100
            , editable: false
        },
    ];

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogAddClick = () => {
        handleDialogOpen();
    }

    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

    function EditToolbar() {
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleDialogAddClick}>
                    Add
                </Button>
                {/* <Button color="primary" startIcon={<RemoveIcon />} onClick={handleDeleteRows}>
                    Delete
                </Button> */}
            </GridToolbarContainer>
        );
    }

    return (
        <Box>
            <HelmetTitle title="설정 | 정기 지출" />

            <DataGrid
                columns={columns}
                rows={data}
                autoHeight
                slots={{
                    toolbar: EditToolbar  as GridSlots['toolbar'],
                }}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                // getRowId={(row) => row.card_id}
            />

            {/* <Grid 
                initialRows={initialRows} 
                columns={columns} 
                gridType={EGridType.TOOLBAR_MODIFY} 
                addType={EAddType.DIALOG} 
                handleDialogAddClick={handleDialogAddClick} 
            /> */}

            <RegularExpenditureForm 
                dialogOpen={dialogOpen} 
                handleDialogClose={handleDialogClose}
                cycleCodes={cycleCodes}
                payMethodCodes={payMethodCodes}
                cardList={cardList}
                expendTypeCodes={expendTypeCodes}
                accountList={accountList}
            />
        </Box>
    );
}

export default RegularExpenditure;