export interface ToDo {
    id?: number;                     // ID, die den Datensatz eindeutig identifiziert
    label: string;                  // Name bzw. Titel des ToDo Punktes
    status: boolean;                // Ist der ToDo Punkt erledigt oder nicht
    position?: number;               // Position des ToDo Punktes in der Liste
}
