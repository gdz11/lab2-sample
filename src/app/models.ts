


export enum StudentStatus{
    Active = "Active",
    Suspended = "Suspended",
    Terminated = "Terminated"
}

export enum Position {
    Professor = "Professor",
    AssociateProfessor = "AssociateProfessor",
    InvitedLecturer = "InvitedLecturer"
}

export interface Person {
    firstName: string;
    lastName: string;
    personalNumber: string;
}

export interface Student extends Person{
    gpa: number;
    status: StudentStatus;
}

export interface Lecturer extends Person {
    position: Position;
}

export type SortColumn = "firstName" | "lastName" | "personalNumber" | "gpa" | "status" | "none";

export type SortOrder = "ascending" | "descending" | "none";