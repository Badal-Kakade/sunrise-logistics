import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
const screenWidth = Dimensions.get('window').width;

const TableView = ({data, headerData, perPageCount}) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([perPageCount]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const[items, setItems] = useState([]);
  useEffect(()=>{
    setItems(data);
  },[data]);


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  },[itemsPerPage]);


  return (
    <DataTable style={styles.table_view}>
      <DataTable.Header>
        {headerData.map((value, index)=>(
          <DataTable.Title key={index} style={styles.col_view}>{value}</DataTable.Title>
        ))}
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.log_id}>
          {Object.entries(item).map(([key, value]) => {
            if (key !== 'log_id') { // Skip displaying log_id if not needed
              return (
                <DataTable.Cell style={styles.data_cell} key={key}>
                  {value || '—'}
                </DataTable.Cell>
              );
            }
          })}
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        // numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        // selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default TableView;

const styles = StyleSheet.create({
    table_view: { width: screenWidth - 30, backgroundColor: 'white', alignSelf: 'center', marginTop: 10, borderRadius: 8, overflow: 'hidden', elevation: 2, // adds subtle shadow for Android
      },
    col_view: {width: '20%'},
    data_cell:{marginHorizontal:1,},
});
