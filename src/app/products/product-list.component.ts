import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: "./product-list.component.html",
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Sevgilimin Hayatındakiler ve Sevgilimin Ozellikleri';
    imageWidth: number = 60;
    imageMargin: number = 2;
    showImage: boolean = false;

    private _listFilter: string = '';
    errorMessage: string = '';
    sub!: Subscription;

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter: ' , value);
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts : IProduct[] = [];

    products: IProduct[] = [];

      constructor(private productService : ProductService) {}


      ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
        });
        
      }


      toggleImage(): void {
        this.showImage = !this.showImage;
      }

      performFilter(filterBy: string) : IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
        product.name.toLocaleLowerCase().includes(filterBy));
      }

      onRatingClicked(message: string) : void {
        this.pageTitle = message;
      }

      ngOnDestroy(): void {
        this.sub.unsubscribe();
      }

}