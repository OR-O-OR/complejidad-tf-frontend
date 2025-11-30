import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FileUploaderComponent } from '../../components/file-uploader/file-uploader.component';

@Component({
  selector: 'app-upload-dataset',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NavbarComponent,
    FileUploaderComponent
  ],
  templateUrl: './upload-dataset.component.html',
  styleUrl: './upload-dataset.component.scss'
})
export class UploadDatasetComponent {
  maxNodes: number = 2000;
  nodeCount: number = 1000;
}

