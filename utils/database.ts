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
            ' childId INT,' +
            ' date TEXT,' +
            ' weight NUMERIC(10,2), ' +
            ' height NUMERIC(10,2), ' +
            ' head NUMERIC(10,2), ' +
            ' note TEXT, ' +
            ' isSent boolean ' +
            ' );'
        );
    }, (error: SQLError) => {
        console.log("db create error: ", error);
    });
}

export const dropTable = (tableName: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("drop table if exists " + tableName);
            },
            (error: SQLError) => {
                console.log("db drop table error: ", error);
                reject(error)
            },
            () => {
                resolve()
            })
    });
}

export const saveChildToDB = (child: IChild): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        db.transaction(
            tx => {
                const { id, name, birthDay, gender, note, photo, isSent } = child;
                if (id) {
                    tx.executeSql("update Child set name = ?, birthDay = ?, gender = ?, note = ?, photo = ?, isSent = ? where id = ?",
                        [name, birthDay, gender, note, photo, isSent, id])
                }
                else {
                    tx.executeSql("insert into Child (name, birthDay, gender, note, photo, isSent) values (?,?,?,?,?,?)",
                        [name, birthDay, gender, note, photo, isSent]);
                }
            },
            (error: SQLError) => {
                console.log("db create error: ", error);
                reject(error)
            },
            () => {
                resolve()
            })
    });
}

export const saveMeasurementToDB = (measurement: IMeasurement): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        db.transaction(
            tx => {
                const { id, childId, date, weight, height, head, note, isSent } = measurement;
                if (id) {
                    tx.executeSql("update Measurement set childId = ?, date = ?, weight = ?, height = ?, head = ?, note = ?, isSent = ? where id = ?",
                        [childId, date, weight, height, head, note, isSent, id])
                }
                else {
                    tx.executeSql("insert OR IGNORE into Measurement (childId, date, weight, height, head, note, isSent) values (?,?,?,?,?,?,?)",
                        [childId, date, weight, height, head, note, isSent])
                }
            },
            (error: SQLError) => {
                console.log("db measurement insert error: ", error);
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
    const rows = await executeCommand("select * from Measurement where childId = " + childId);
    return rows;
}

export function executeCommand(strSql: string, params = []): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(strSql, params,
                (_: SQLTransaction, resultSet: SQLResultSet) => {
                    let list = [];
                    for (let i = 0; i < resultSet.rows.length; i++) {
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
