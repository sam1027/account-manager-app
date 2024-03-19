import React from 'react';
import Grid, { EAddType, EGridType } from '../../components/Grid';
import { randomId } from "@mui/x-data-grid-generator";
import { GridColDef, GridRowsProp, GridValueFormatterParams } from "@mui/x-data-grid";
import { _bank, _cardCorp, _cardType } from '../../utils/cmnCode';
import CardForm from './CardForm';
import HelmetTitle from '../../components/HelmetTitle';

function Card() {
    const initialRows: GridRowsProp = [
        { id: randomId(), cardType: 'credit', cardCorp: '1', cardName: "성은 롯데 카드", paymentDate: "25", account: "생활비 계좌" },
        { id: randomId(), cardType: 'check', cardCorp: '2', cardName: "성은 삼성 카드", paymentDate: "25", account: "생활비 계좌" },
        { id: randomId(), cardType: 'credit', cardCorp: '3', cardName: "성은 현대 카드", paymentDate: "25", account: "생활비 계좌" },
    ];

    const columns: GridColDef[] = [
        { 
            field: 'cardType'
            , headerName: '구분'
            , width: 150
            , editable: false
            , type: 'singleSelect'
            , valueOptions: _cardType
        },
        { 
            field: 'cardCorp'
            , headerName: '카드사'
            , width: 150
            , editable: false
            , type: 'singleSelect'
            , valueOptions: _cardCorp
        },
        { 
            field: 'cardName'
            , headerName: '카드명'
            , width: 150
            , editable: false
        },
        { 
            field: 'paymentDate'
            , headerName: '결제일'
            , width: 150
            , editable: false
        },
        { 
            field: 'account'
            , headerName: '연결 계좌'
            , width: 150
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

    return (
        <div>
            <HelmetTitle title="설정 | 카드 관리" />

            <Grid 
                initialRows={initialRows} 
                columns={columns} 
                gridType={EGridType.TOOLBAR_MODIFY} 
                addType={EAddType.DIALOG} 
                handleDialogAddClick={handleDialogAddClick} 
            />

            <CardForm dialogOpen={dialogOpen} handleDialogClose={handleDialogClose} />
        </div>
    );
}

export default Card;