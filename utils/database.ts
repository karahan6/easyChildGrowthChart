import * as SQLite from "expo-sqlite";
import { SQLError, SQLResultSet, SQLStatementErrorCallback, SQLTransaction, SQLTransactionErrorCallback, SQLVoidCallback } from "expo-sqlite";
import moment from "moment";
import { IChild } from "../models/IChild";
import { IMeasurement } from "../models/IMeasurement";

const db = SQLite.openDatabase("childGrowthDb");

export const createDatabase = () => {
    db.transaction(ts => {
        ts.executeSql(
            'create table if not exists Child ' +
            '( id INTEGER PRIMARY KEY, ' +
            ' name TEXT, ' +
            ' birthDay TEXT, ' +
            ' gender INT, ' +
            ' note TEXT,  ' +
            ' photo TEXT, ' +
            ' isSent boolean ' +
            ' );'
        );
        ts.executeSql(
            'create table if not exists Measurement' +
            '( id INTEGER PRIMARY KEY,' +
            ' child_id INT,' +
            ' date TEXT,' +
            ' weight NUMERIC(10,2), ' +
            ' height NUMERIC(10,2), ' +
            ' head NUMERIC(10,2), ' +
            ' notes TEXT, ' +
            ' is_sent boolean ' +
            ' );'
        );
    },(error: SQLError)=>{
        console.log("db create error: ",    error);
    } );
}

export const dropTable = (tableName: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("drop table if exists " + tableName);
            },
            (error: SQLError)=>{
                console.log("db drop table error: ",    error);
                reject(error)
            },
            () => {
                resolve()
            })
    });
} 

export const insertChild = (child: IChild): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        db.transaction(
            tx => {
                    const {name, birthDay, gender, note, photo, isSent} = child
                    tx.executeSql("insert OR IGNORE into Child (name, birthDay, gender, note, photo, isSent) values (?,?,?,?,?,?)",
                        [name, birthDay, gender, note, photo, isSent])
            },
            (error: SQLError)=>{
                console.log("db create error: ",    error);
                reject(error)
            },
            () => {
                resolve()
            })
    });
}

export const insertMeasurement = (measurement: IMeasurement): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        db.transaction(
            tx => {
                    const {childId, date, weight, height, head, note, isSent} = measurement
                    tx.executeSql("insert OR IGNORE into Measurement (child_id, date, weight, height, head, note, is_sent) values (?,?,?,?,?,?)",
                        [childId, date, weight, height, head, note, isSent])
            },
            (error: SQLError)=>{
                console.log("db measurement insert error: ",    error);
                reject(error)
            },
            () => {
                resolve()
            })
    });
}

export async function getChildrenFromDb() {
    const rows = await executeCommand("select * from Child")
    return rows;
}

export async function getChildFromDb(id: Number) {
    const rows = await executeCommand("select * from Child where id = " + id);
    return rows[0];
}

export async function getMeasurementsFromDb() {
    const rows = await executeCommand("select * from Measurement")
    return rows;
}

export async function getMeasurementFromDb(id: Number) {
    const rows = await executeCommand("select * from Measurement where id = " + id);
    return rows[0];
}

export async function getMeasurementsByChildIdFromDb(childId: Number) {
    const rows = await executeCommand("select * from Measurement where child_id = " + childId);
    return rows;
}

export function executeCommand(strSql:string, params = []): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(strSql, params,
                (_: SQLTransaction, resultSet: SQLResultSet) => {
                    let list = [];
                    for(let i = 0; i < resultSet.rows.length; i++){
                        list.push(resultSet.rows.item(i));
                    }
                    resolve(list);
                },
                (_: SQLTransaction, error: SQLError) => {
                    reject(error);
                    return false;
                });
        })
        ;
    });
}
