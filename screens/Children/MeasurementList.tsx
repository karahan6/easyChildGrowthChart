import { AntDesign as Icon } from "@expo/vector-icons";
import React, {useEffect}  from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Table, Row, Rows } from 'react-native-table-component';

import { View } from '../../components/Themed';
import { navigationService } from "../../navigation/NavigationService";
import { ChildrenList } from "./ChildrenList";
import { useStoreActions, useStoreState } from "../../store";

const tableHead = ['Date', 'Weight', 'Height', 'Head'];
const flexArr = [3, 3, 3, 3, 2];
const tableData = [
    [new Date().toLocaleDateString(), '2', 66, 41, <View style={{ justifyContent: "center", alignItems: "center" }}><Icon name="edit" /></View>],
    [new Date().toLocaleDateString(), '3', 76, 44, <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#f6f6f6" }}><Icon name="edit" /></View>],
    [new Date().toLocaleDateString(), '4', 80, 47, <View style={{ justifyContent: "center", alignItems: "center" }}><Icon name="edit" /></View>],
    [new Date().toLocaleDateString(), '5', 85, 56, <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#f6f6f6" }}><Icon name="edit" /></View>]
];

type MeasurementListProps = {
    childId: number
};

const MeasurementList = (props: MeasurementListProps) => {
    const measurements = useStoreState(store => store.measurement.measurements)[props.childId];
    const getMeasurementsByChildId = useStoreActions(actions => actions.measurement.getMeasurementsByChildId);

    useEffect(()=>{
        getMeasurementsByChildId(props.childId);
    }, [])
    return (
        <View style={styles.mainContainer}>
            {measurements && measurements.length > 0 && <Table borderStyle={{ borderBottomWidth: 2, borderBottomColor: '#cccbcb', borderTopColor: "white" }}>
                <Row data={tableHead} style={styles.head} flexArr={flexArr} textStyle={styles.headText} />
                {
                    measurements.map((dataRow, index) => {
                        let data : any [] = [dataRow.date, dataRow.weight, dataRow.height, dataRow.head];
                        // data.push(<View style={{ justifyContent: "center", alignItems: "center", backgroundColor: index % 2 == 0 ? "white" : "#f6f6f6" }}><Icon name="edit" /></View>);
                        <Row
                            key={index}
                            data={data} textStyle={styles.text} flexArr={flexArr} style={{ justifyContent: "center", alignContent: "center", marginBottom: 4, marginTop: 4, backgroundColor: index % 2 === 1 ? "#f6f6f6" : "white" }} />
                    })}
            </Table>}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'flex-start',
    },
    head: { height: 30, backgroundColor: "#cccbcb" },
    headText: { fontSize: 14, fontWeight: "bold", color: "black", marginLeft: 5 },
    text: { margin: 0, fontSize: 11, justifyContent: "center", marginLeft: 5 }
});

MeasurementList.propTypes = {
    childId: PropTypes.number
};
export default MeasurementList;