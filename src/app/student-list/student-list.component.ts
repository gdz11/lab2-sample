import { Component, OnInit } from '@angular/core';
import { SortColumn, SortOrder, Student, StudentStatus } from '../models';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[];

  sortField: SortColumn = "none";

  sortOrder: SortOrder = "none";

  sortList(column: SortColumn) {

    if (this.sortField == column && this.sortOrder != 'none') {
      //list is already sorted, need to reverse order
      this.sortOrder = this.sortOrder == 'ascending' ? 'descending' : 'ascending';
    }
    else {
      //if list is not already sorted by this column, default order is ascending
      this.sortOrder = 'ascending';
    }

    //update sortField with new value
    this.sortField = column;

    this.students.sort((a, b) => {
      let fieldA = this.extractField(a, column);
      let fieldB = this.extractField(b, column);

      let result = 0;

      if (this.sortOrder == 'ascending') {
        if (fieldA > fieldB)
          result = 1;
        else if (fieldA < fieldB)
          result = -1;
      }
      else {
        if (fieldA > fieldB)
          result = -1;
        else if (fieldA < fieldB)
          result = 1;
      }

      
      return result;

    });
  }

  
  public get sortMarker() : string {
    let result = '';
    if(this.sortOrder == 'ascending'){
      result = '+';
    }
    else if(this.sortOrder == 'descending') {
      result = '-'
    }

    return result;
  }

  


  extractField(item: Student, column: SortColumn): string | number | Student {

    let result: string | number | StudentStatus;

    switch (column) {
      case 'firstName':
        {
          result = item.firstName;
          break;
        }
      case 'lastName':
        {
          result = item.lastName;
          break;
        }
      case 'personalNumber':
        {
          result = item.personalNumber;
          break;
        }
      case 'gpa':
        {
          result = item.gpa;
          break;
        }
      case 'status':
        {
          result = item.status;
          break;
        }
      default:
        {
          throw Error("Invalid column");
          alert("Invalid column");
        }
    }

    return result;
  }


  shuffleSimple(){

    for(let i=this.students.length-1; i >=0; i--){
      let randomIndex = Math.floor(Math.random()*i);
      let tmp = this.students[randomIndex];
      this.students[randomIndex] = this.students[i];
      this.students[i] = tmp;
    }

    this.sortField = "none";
    this.sortOrder = "none";
  }

  shuffleAvanced() {
    this.students = this.students
      .map(c => ({ student: c, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map(c => c.student);
    
    this.sortField = "none";
    this.sortOrder = "none";
  }


  constructor() {

    //initialize with some data, in real world application we would fetch this data from server using ajax
    this.students = [
      {
        firstName: "name2",
        lastName: "lastname2",
        personalNumber: "12345678911",
        gpa: 2,
        status: StudentStatus.Active
      },
      {
        firstName: "name1",
        lastName: "lastname1",
        personalNumber: "12345678910",
        gpa: 3,
        status: StudentStatus.Active
      },
      {
        firstName: "name3",
        lastName: "lastname3",
        personalNumber: "12345678912",
        gpa: 2.5,
        status: StudentStatus.Terminated
      },
      {
        firstName: "name4",
        lastName: "lastname4",
        personalNumber: "12345678913",
        gpa: 2.8,
        status: StudentStatus.Suspended
      },
      {
        firstName: 'test',
        lastName: 'test',
        gpa: 3,
        personalNumber: '12345678915',
        status: StudentStatus.Active
      }
    ]
  }

  ngOnInit(): void {
  }

}
