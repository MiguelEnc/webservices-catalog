import React, { forwardRef } from 'react';
import MaterialTable, { Action, Column, Icons, Localization, Options } from 'material-table';
import {
    ArrowDownward,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    FirstPage,
    LastPage,
    Search,
    ArrowForward
} from '@material-ui/icons';

export interface DataTableProps<RowData extends object> {
    columns: Column<RowData>[];
    data: RowData[];
    editButton: boolean;
    editFunc?: (event: any, data: RowData | RowData[]) => void;
    deleteButton: boolean;
    deleteFunc?: (event: any, data: RowData | RowData[]) => void;
    pagination?: boolean;
}

export default function DataTable<RowData extends object>({
    columns,
    data,
    editButton = false,
    editFunc = (event: any, data: any) => console.log('Edit CLicked'),
    deleteButton = false,
    deleteFunc = (event: any, data: any) => console.log('Delete CLicked'),
    pagination = true
}: DataTableProps<RowData>) {
    const tableIcons: Icons = {
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
    };

    let actions: Action<RowData>[] = [];
    if (editButton) {
        actions.push({
            icon: 'create',
            onClick: editFunc
        });
    }
    if (deleteButton) {
        actions.push({
            icon: 'delete',
            onClick: deleteFunc
        });
    }

    const options: Options<RowData> = {
        actionsColumnIndex: -1,
        pageSize: 5,
        pageSizeOptions: [5, 10, 15, 20],
        search: true,
        paging: pagination,
        draggable: false,
        showTitle: false,
        emptyRowsWhenPaging: false,
        headerStyle: {
            backgroundColor: 'rgba(249, 248, 245, 0.62)',
            fontWeight: 500,
            color: '#3d3d3d',
            borderTop: 0,
            cursor: 'pointer',
            lineHeight: 1.42857143,
            textAlign: 'left'
        }
    };

    const localization: Localization = {
        toolbar: {
            searchTooltip: '',
            searchPlaceholder: 'Search...'
        }
    };

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                localization={localization}
                actions={actions}
                options={options}
                columns={columns}
                icons={tableIcons}
                data={data}
            />
        </div>
    );
}
