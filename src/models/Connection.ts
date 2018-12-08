export interface Connection {
    key?: string;
    id?: string;
    timestamp: string;
    connected: boolean;
}
export class ConnectionFilters{
    public static isNotConnected(connection:Connection){
        return !connection.connected;
    }
    public static isConnected(connection:Connection){
        return connection.connected;
    }
}