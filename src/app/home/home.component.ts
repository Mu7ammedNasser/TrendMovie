import {
  Component,
  ElementRef,
  OnInit,
  viewChild,
  ViewChild,
} from '@angular/core';
import { MoviesService } from '../movies.service';
import { Imovie } from '../imovie';
import { CeilPipe } from '../ceil.pipe';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CeilPipe, FormsModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  moviesData: Imovie[] = [];

  selectedImage: string = '';
  filteredMovies: Imovie[] = [];

  basicPath: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private _MoviesService: MoviesService) {}

  ngOnInit(): void {
    this._MoviesService.getMovies().subscribe({
      next: (res) => {
        console.log(res.results);
        this.moviesData = res.results;
        this.filteredMovies = res.results;
      },
    });
  }

  filterMovies(): void {
    let lowercaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredMovies = this.moviesData.filter((movie) =>
      (movie.title || movie.name).toLowerCase().includes(lowercaseSearchTerm)
    );
  }

  @ViewChild('details') movieCardRef!: ElementRef;
  @ViewChild('hideElement') movieCardExit!: ElementRef;

  getImageSrc(movie: Imovie): void {
    this.selectedImage = this.basicPath + movie.poster_path;
    this.movieCardRef.nativeElement.classList.remove('d-none');
    this.movieCardRef.nativeElement.classList.add('d-flex');
  }

  hideCard(): void {
    this.movieCardRef.nativeElement.classList.remove('d-flex');
    this.movieCardRef.nativeElement.classList.add('d-none');
  }
}
