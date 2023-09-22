const Columns = [
    {
        title: 'firstName',
        dataIndex: 'firstName',
        key: 'firstName',
        render: text => <a>{text}</a>,
        inlineSize: true,
    },
    {
        title: 'lastName',
        dataIndex: 'lastName',
        key: 'lastName',
        inlineSize: true,
    },
    {
        title: 'phone',
        dataIndex: 'phone',
        key: 'phone',
        ellipsis: true,
    },
    {
        title: 'username',
        dataIndex: 'username',
        key: 'username',
        ellipsis: true,
    },
    {
        title: 'operation',
        dataIndex: 'operation',
        key: 'operation',
        ellipsis: true,
    },
];

export default Columns;