import React from 'react';
import DataTable, { DataTableProps } from '../../../sharedComponents/DataTable/DataTable';
import User from '../user.entity';

interface Props {
    data: User[];
    deleteUser: Function;
}

export default function UsersTable(props: Props) {
    const columns = [
        { title: 'Name', field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'Team', field: 'team' }
    ];

    const deleteFunction = (event: any, data: User | User[]) => {
        props.deleteUser(data);
    };

    const tableProps: DataTableProps<User> = {
        columns,
        data: props.data,
        editButton: false,
        deleteButton: true,
        pagination: true,
        deleteFunc: deleteFunction
    };
    return (
        <div>
            <DataTable {...tableProps} />
        </div>
    );
}
