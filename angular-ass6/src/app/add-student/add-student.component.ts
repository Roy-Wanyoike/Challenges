import { Component } from '@angular/core';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  students =[{
    studentName: 'Student Name',
    studentID: '1234',
    studentFees: 4500
  }]

  submit(data: any): void {
    
    let studentName = data.studentName
    let studentID = data.studentID
    let studentFees = data.balanceFees


    this.students.push({studentName:studentName, studentID:studentID, studentFees:studentFees});
    console.log(this.students);
    }
    

}
