import { AntDesign as Icon } from "@expo/vector-icons";
import React, { Fragment, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Table, Row, Rows, Col, TableWrapper } from 'react-native-table-component';

import { View } from '../../components/Themed';
import { navigationService } from "../../navigation/NavigationService";
import { ChildrenList } from "./ChildrenList";
import { useStoreActions, useStoreState } from "../../store";
import { DATE_FORMAT } from "../../constants";
import { IMeasurement } from "../../models/IMeasurement";

// const tableHead = ['Date', 'Weight', 'Height', 'Head'];
// const flexArr = [3, 3, 3, 3];
// const tableData = [
//     [new Date().toLocaleDateString(), '2', 66, 41],
//     [new Date().toLocaleDateString(), '3', 76, 44],
//     [new Date().toLocaleDateString(), '4', 80, 47],
//     [new Date().toLocaleDateString(), '5', 85, 56]
// ];

const tableHead = ['Date', 'Weight', 'Height', 'Head', ''];
const tableData = [
  ['1', '2', '3'],
  ['a', 'b', 'c'],
  ['1', '2', '3'],
  ['a', 'b', 'c']
]
const widthArr = [100, 70, 70, 70, 50];
type MeasurementListProps = {
  childId: number
};

const MeasurementList = (props: MeasurementListProps) => {
  const measurements = useStoreState(store => store.measurement.measurements)[props.childId];
  const getMeasurementsByChildId = useStoreActions(actions => actions.measurement.getMeasurementsByChildId);
  useEffect(() => {
    getMeasurementsByChildId(props.childId);
  }, [])
  const editColumn = (data: IMeasurement, index: number) => (
    <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#f6f6f6" }}><Icon name="edit" />
    </View>);
  return (
    <View style={styles.mainContainer}>
      {/* {measurements && measurements.length > 0 && <Table borderStyle={{ borderBottomWidth: 2, borderBottomColor: '#cccbcb', borderTopColor: "white" }}>
                <Row data={tableHead}  flexArr={flexArr} />
                {
                    measurements.map((dataRow, index) => {
                        let data : any [] = [dataRow.date, dataRow.weight, dataRow.height, dataRow.head];
                        // data.push(<View style={{ justifyContent: "center", alignItems: "center", backgroundColor: index % 2 == 0 ? "white" : "#f6f6f6" }}><Icon name="edit" /></View>);
                        <Row
                            key={index}
                            data={data}  flexArr={flexArr} style={{ justifyContent: "center", alignContent: "center", marginBottom: 4, marginTop: 4, backgroundColor: (index % 2 === 1 ? "#f6f6f6" : "white") }} />
                    })}
            </Table>} */}
      {measurements && measurements.length > 0 && <Fragment>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
          <Row data={tableHead} style={styles.head} flexArr={widthArr} textStyle={styles.text} />
        </Table>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
          {measurements.map((rowData, index) => {
            let data: any = [moment(rowData.date).format(DATE_FORMAT), rowData.weight, rowData.height, rowData.head];
            data.push(<View style={{ justifyContent: "center", alignItems: "center", backgroundColor: index % 2 ? "#F7F6E7" : "white" }}>
              <Icon name="edit" onPress={() => navigationService.navigate("MeasurementFormScreen", { id: rowData.id, childId:props.childId }) }/>
            </View>);

            return <Row
              key={index}
              data={data}
              flexArr={widthArr}
              style={[styles.row, index % 2 ? { backgroundColor: '#F7F6E7' } : { backgroundColor: 'white' }]}
              textStyle={styles.text}
            />
          })
          }
        </Table>
      </Fragment>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-start',
  },
  // head: { height: 30, backgroundColor: "#cccbcb" },
  // headText: { fontSize: 14, fontWeight: "bold", color: "black", marginLeft: 5 },
  // text: { margin: 0, fontSize: 11, justifyContent: "center", marginLeft: 5 }
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  text: { textAlign: 'center' }
});

MeasurementList.propTypes = {
  childId: PropTypes.number
};
export default MeasurementList;