import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../../core/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {

  loadingService = inject(LoadingService);
}
