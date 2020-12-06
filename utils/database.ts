import * as SQLite from "expo-sqlite";
import { SQLError, SQLResultSet, SQLStatementErrorCallback, SQLTransaction, SQLTransactionErrorCallback, SQLVoidCallback } from "expo-sqlite";
import moment from "moment";
import { IChild } from "../models/IChild";

const db = SQLite.openDatabase("childGrowthDb");

export const createDatabase = () => {
    db.transaction(ts => {
        ts.executeSql(
            'create table if not exists Children ' +
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
                    tx.executeSql("insert OR IGNORE into Children (name, birthDay, gender, note, photo, isSent) values (?,?,?,?,?,?)",
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

export async function getChildrenFromSqlite() {
    const rows = await executeCommand("select * from Children")
    return rows;
}

export async function getChildFromSqlite(id: Number) {
    const rows = await executeCommand("select * from Children where id = " + id);
    return rows[0];
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
