import React from 'react';
import DataTable, { DataTableProps } from '../../../sharedComponents/DataTable/DataTable';

export interface RowData {
    id?: string;
    domain: string;
    name: string;
}

interface Props {
    data: RowData[];
}

export default function ServicesTable(props: Props) {
    const columns = [
        {
            title: 'Domain',
            field: 'domain'
        },
        {
            title: 'Name',
            field: 'name'
        }
    ];

    const tableProps: DataTableProps<RowData> = {
        columns,
        data: props.data,
        editButton: true,
        pagination: true
    };

    return <DataTable {...tableProps} />;
}
