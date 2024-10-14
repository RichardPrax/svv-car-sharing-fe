import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';
import { Student } from '../../student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{

  constructor(private studentService: StudentService){}

  students: Student[] = [];

  ngOnInit(): void {
      this.studentService.getAllStudents().subscribe(data => {
        console.log(data);
        this.students = data}
      );
  }
}
