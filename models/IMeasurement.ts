export interface IMeasurement{
    id: Number | undefined;
    childId: Number;
    date: string;
    weight: Number;
    height: Number;
    head: Number;
    note: string | undefined;
    isSent: Boolean;
}