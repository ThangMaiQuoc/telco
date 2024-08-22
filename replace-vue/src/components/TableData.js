import React, { useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";

const TableData = ({ columns, data, scrollX, selected = false }) => {
   // const [_, setSearchText] = useState("");
   // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const searchInput = useRef(null);

   const handleSearch = (selectedKeys, confirm, _dataIndex) => {
      confirm();
      // setSearchText(selectedKeys[0]);
   };

   const handleReset = (clearFilters) => {
      clearFilters();
      // setSearchText("");
   };

   const getColumnSearchProps = (column) => ({
      ...column,
      filterSearch: column.filterSearch,
      filterDropdown: column.filterSearch
         ? ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
              <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                 <Input
                    ref={searchInput}
                    placeholder={`Search ${column.dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, column.dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                 />
                 <Space>
                    <Button
                       type="primary"
                       onClick={() => handleSearch(selectedKeys, confirm, column.dataIndex)}
                       icon={<SearchOutlined />}
                       size="small"
                       style={{ width: 90 }}
                    >
                       Search
                    </Button>
                    <Button
                       onClick={() => clearFilters && handleReset(clearFilters)}
                       size="small"
                       style={{ width: 90 }}
                    >
                       Reset
                    </Button>
                    {/* <Button
                       type="link"
                       size="small"
                       onClick={() => {
                          confirm({ closeDropdown: false });
                          setSearchText(selectedKeys[0]);
                       }}
                    >
                       Filter
                    </Button> */}
                    <Button
                       type="link"
                       size="small"
                       onClick={() => {
                          close();
                       }}
                    >
                       close
                    </Button>
                 </Space>
              </div>
           )
         : undefined,
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
      onFilter: (value, record) => record[column.dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
         if (visible) {
            setTimeout(() => {
               if (searchInput.current) {
                  searchInput?.current?.select();
               }
            }, 100);
         }
      },
      render: (text, record, index) => (column.render ? column.render(text, record, index) : text),
   });

   return (
      <Table
         columns={columns.map((col) => getColumnSearchProps(col))}
         dataSource={data}
         scroll={{ x: scrollX || 1300 }}
      />
   );
};

export default TableData;
