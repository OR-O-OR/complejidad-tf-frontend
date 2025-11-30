import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { GraphPreviewComponent } from '../../components/graph-preview/graph-preview.component';

@Component({
  selector: 'app-graph-viewer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    NavbarComponent,
    GraphPreviewComponent
  ],
  templateUrl: './graph-viewer.component.html',
  styleUrl: './graph-viewer.component.scss'
})
export class GraphViewerComponent {
  nodeSearch: string = '';
  nodeSize: number = 50;
  colorByCentrality: boolean = true;

  formatLabel(value: number): string {
    return `${value}px`;
  }
}

