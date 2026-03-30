import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  constructor(private fb:FormBuilder,
              private router: Router) {

  }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      numeroConta: ['', [Validators.required]],
    });
  }
    onSubmit() {
    if (this.form.valid) {
      this.router.navigate([`transferencias/${this.form.get('numeroConta')?.value}`]);
    }
  }
}
