import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild, Inject, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription, fromEvent, switchMap, timer } from 'rxjs';
import { map, pairwise, startWith, tap } from 'rxjs/operators'

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class CarouselComponent implements AfterViewInit, OnDestroy{
  
  slides = [
    {color: 'red', imageUrl: 'https://images.unsplash.com/photo-1573320021203-04c08915f24f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', trabajosSlide: 0},
    {color: 'green', imageUrl: 'https://images.unsplash.com/photo-1485409350190-f923525f26eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', trabajosSlide: 1},
    {color: 'yellow', imageUrl: 'https://images.unsplash.com/photo-1656530228783-dcb0a67c1d69?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', trabajosSlide: 2},
    {color: 'skyblue', imageUrl: 'https://images.unsplash.com/photo-1536173257297-533e34457207?q=80&w=2091&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', trabajosSlide: 0},
    {color: 'saddlebrown', imageUrl: 'https://images.unsplash.com/photo-1501547188-6a8b7cdcce6e?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', trabajosSlide: 1}
  ] 

  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;


  currentIndex: number = 0
  private scrollSubscription!: Subscription;
  private wheelSubscription!: Subscription;
  private resetSlideSubscription!: Subscription;
  private autoSlideSubscription!: Subscription;
  private autoSlideInterval = 5000;

  

  constructor (private cdr: ChangeDetectorRef, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private router: Router) {}

  ngAfterViewInit() {
    // this.carousel.nativeElement.addEventListener('scroll', this.onScroll.bind(this))
    // this.carouselWrapper.nativeElement.addEventListener('wheel', this.onWheel.bind(this))

    this.scrollSubscription = fromEvent<Event>(window, 'scroll').pipe(
      startWith(0),
      map(() => window.scrollY),
      pairwise(),
      map(([prevScroll, currScroll]) => currScroll === 0)
    ).subscribe(isAtTop => {
      this.isHidden = !isAtTop;
      this.cdr.markForCheck();
    });

    this.scrollSubscription = 
    fromEvent<Event>(this.carousel.nativeElement, 'scroll').subscribe(() => this.onScroll());

    this.wheelSubscription = 
    fromEvent<WheelEvent>(this.carouselWrapper.nativeElement, 'wheel').subscribe((event: WheelEvent) => this.onWheel(event));

    this.resetSlideSubscription = 
    fromEvent<Event>(this.carouselWrapper.nativeElement, 'click').subscribe(() => this.resetAutoSlide());

    this.startAutoSlide();

    this.startCarousel();

    this.duplicateFirstAndLastSlide();
    console.log(this.currentIndex)
  }

  ngOnDestroy() {

    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();

    if (this.wheelSubscription) this.wheelSubscription.unsubscribe();

    if (this.autoSlideSubscription) this.autoSlideSubscription.unsubscribe();

    if (this.resetSlideSubscription) this.resetSlideSubscription.unsubscribe();

  }

  onScroll() {
    const carouselElement = this.carousel.nativeElement;
    const scrollLeft = carouselElement.scrollLeft;
    const itemWidth = carouselElement.clientWidth;
    this.currentIndex = Math.round(scrollLeft / itemWidth)
  }
  onWheel(event: WheelEvent) {
    if (event.shiftKey) {
      event.preventDefault();
    }
  }

  startCarousel() {
    this.currentIndex = 1;
    this.carousel.nativeElement.scrollTo({
      left: this.carousel.nativeElement.clientWidth * this.currentIndex,
      behavior: 'auto'
    });
    this.scrollToCurrent();
  }

  prevImage() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
      this.scrollToCurrent();
    } else {
      this.currentIndex = this.carousel.nativeElement.childElementCount - 1;
      this.carousel.nativeElement.scrollTo({
        left: this.carousel.nativeElement.clientWidth * this.currentIndex
      })
      this.prevImage()
    }
  }

  nextImage() {
    if (this.currentIndex < this.carousel.nativeElement.childElementCount - 2) {
      this.currentIndex++;
      this.scrollToCurrent();
    } else {
      this.currentIndex = 0
      this.carousel.nativeElement.scrollTo({
        left: this.carousel.nativeElement.clientWidth * this.currentIndex
      })
      this.nextImage();
    }

  }

  toSlide(i: number) {
    if (this.currentIndex != i)
    {
      this.currentIndex = i;
      this.scrollToCurrent();
    }
  }

  scrollToCurrent() {
    const carouselElement = this.carousel.nativeElement;
    const itemWidth = carouselElement.clientWidth;
    carouselElement.scrollTo({
      left: this.currentIndex * itemWidth,
      behavior: 'smooth'
    })
    this.cdr.markForCheck();
  }

  startAutoSlide() {
    this.autoSlideSubscription = 
    timer(this.autoSlideInterval, this.autoSlideInterval).subscribe(() => this.nextImage())
  }

  resetAutoSlide() {
    if (this.autoSlideSubscription) {
      this.autoSlideSubscription.unsubscribe();
    };
    this.startAutoSlide();
  }

  duplicateFirstAndLastSlide() {
    const carouselElement = this.carousel.nativeElement;
    const firstSlideClone = carouselElement.firstElementChild.cloneNode(true);
    const lastSlideClone = carouselElement.lastElementChild.cloneNode(true);
    carouselElement.appendChild(firstSlideClone)
    carouselElement.insertBefore(lastSlideClone, carouselElement.firstElementChild);
  }

  isHidden: boolean = false

  scrollToUbicacion() {
    window.scrollBy({
      top: this.document.documentElement.clientHeight * 2,
      left: 0,
      behavior: 'smooth'
    })
  }

  navigateToTrabajos(index: number) {
    this.router.navigate(['/trabajos', index])
    console.log('ok')
  }

}
