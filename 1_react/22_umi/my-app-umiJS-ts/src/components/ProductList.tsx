import React from 'react';
import { Table, Popconfirm, Button } from "antd";  //Popconfirm 气泡确认框
import { ColumnProps } from "antd/es/table"

export default ({ onDelete, products }): any => {
  console.log(onDelete, products);
  const columns: object[] = [ //表格的列
    { title: "Name", dataIndex: "name" },
    {
      title: "Actions",
      render: (test: any, record: any) => {
        /* 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并 */
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        )
      }
    }
  ]
  return (
    <Table dataSource={products} columns={columns} />
  );
}
