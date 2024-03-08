import { GridColDef, GridRowsProp, GridValueFormatterParams } from "@mui/x-data-grid";
import { randomCreatedDate, randomId } from "@mui/x-data-grid-generator";
import Grid, { EGridType } from "../../components/Grid";

function RegularIncome() {
    const initialRows: GridRowsProp = [
        { id: randomId(), ocrDate: randomCreatedDate(), amount: 20000, source: '1', finance: '1', content: '기타1' },
        { id: randomId(), ocrDate: randomCreatedDate(), amount: 1000, source: '2', finance: '2', content: '기타2' },
        { id: randomId(), ocrDate: randomCreatedDate(), amount: 50000, source: '3', finance: '3', content: '기타3' },
    ];
    
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
            , type: 'number'
            , width: 150
            , editable: true
            , align: 'right'
            , valueFormatter: (params: GridValueFormatterParams<number>) => {
                if (params.value == null) {
                  return '';
                }
                return `${params.value.toLocaleString()}`;
            },
        },
        // 카테고리 항목으로 관리
        { 
            field: 'source'
            , headerName: '소득원'
            , width: 150
            , editable: true
            , type: 'singleSelect'
            , valueOptions: [
                { value: '1', label: '월급' },
                { value: '2', label: '불로소득' },
                { value: '3', label: '부업' },
                { value: '4', label: '알바비' },
            ]
            , align: 'left'
        },
        // 카테고리 항목으로 관리
        { 
            field: 'finance'
            , headerName: '금융기관'
            , width: 150
            , editable: true
            , type: 'singleSelect'
            , valueOptions: [
                { value: '1', label: '국민은행' },
                { value: '2', label: '우리은행' },
                { value: '3', label: '현금' },
                { value: '4', label: '알바비' },
            ]
            , align: 'left'
        },
        { 
            field: 'content'
            , headerName: '내용'
            , width: 300
            , editable: true
            , align: 'left'
        },
    ];

    return (
        <div>
            <h1>RegularIncome</h1>

            <Grid initialRows={initialRows} columns={columns} gridType={EGridType.TOOLBAR_MODIFY} />
        </div>
    );
}

export default RegularIncome;