import React from 'react';
import MaterialTable, { Action, Column, Localization, Options } from 'material-table';

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
    let actions: Action<RowData>[] = [];
    if (editButton) {
        actions.push({
            icon: 'create',
            tooltip: 'Edit',
            onClick: editFunc
        });
    }
    if (deleteButton) {
        actions.push({
            icon: 'delete',
            tooltip: 'Delete',
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
                data={data}
            />
        </div>
    );
}
