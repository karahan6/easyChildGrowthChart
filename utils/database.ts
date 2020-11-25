import * as SQLite from "expo-sqlite";
import { SQLError, SQLResultSet, SQLStatementErrorCallback, SQLTransaction, SQLTransactionErrorCallback, SQLVoidCallback } from "expo-sqlite";
import moment from "moment";
import { IChild } from "../models/IChild";

const db = SQLite.openDatabase("childGrowthDb");

export const createDatabase = () => {
    db.transaction(ts => {
        ts.executeSql(
            'create table if not exists Children ' +
            '( id INT PRIMARY KEY, ' +
            ' name TEXT, ' +
            ' birthDay TEXT, ' +
            ' gender INT, ' +
            ' notes TEXT,  ' +
            ' photo TEXT, ' +
            ' isSent boolean ' +
            ' );'
        );
        ts.executeSql(
            'create table if not exists Measurement' +
            '( id INT PRIMARY KEY,' +
            ' child_id INT,' +
            ' date TEXT,' +
            ' weight NUMERIC(10,2), ' +
            ' height INT, ' +
            ' head NUMERIC(10,2), ' +
            ' notes TEXT, ' +
            ' isSent boolean ' +
            ' );'
        );
    },(error: SQLError)=>{
        console.log("db create error: ",    error);
    } );
}

export const insertChild = (child: IChild): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        db.transaction(
            tx => {
                    const {name, birthDay, gender, notes, photo, isSent} = child
                    tx.executeSql("insert OR IGNORE into Children (name, birthDay, gender, notes, photo, isSent) values (?,?,?,?,?,?)",
                        [name, birthDay, gender, notes, photo, isSent])
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

export async function getChildren() {
    const rows = await executeCommand("select * from Children")
    return rows[0];
}

export function executeCommand(strSql:string, params = []): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(strSql, params,
                (_: SQLTransaction, resultSet: SQLResultSet) => {
                    resolve(resultSet.rows.item)
                },
                (_: SQLTransaction, error: SQLError) => {
                    reject(error);
                    return false;
                });
        })
        ;
    });
}
