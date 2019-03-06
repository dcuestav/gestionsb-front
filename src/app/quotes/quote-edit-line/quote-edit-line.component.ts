import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IProduct } from 'src/app/model/interfaces/product.interface';
import * as _ from 'lodash';
import { QuoteLine } from 'src/app/model/quote-line';

@Component({
  selector: 'app-quote-edit-line',
  templateUrl: './quote-edit-line.component.html',
  styleUrls: ['./quote-edit-line.component.scss']
})
export class QuoteEditLineComponent implements OnInit {

  @Input()
  quoteLine: QuoteLine;

  @Output()
  quoteLineChange = new EventEmitter<QuoteLine>();

  @Input()
  set sortedProducts(sortedProducts: IProduct[]) {
    this.products = sortedProducts;
    this.productNames = _.sortedUniq(sortedProducts.map( product => product.name ));
    this.filteredProductNames = this.productNames;
    this.updateOptionsFromProductName(this.form.get('productName').value, false);
  }

  @Output()
  totalUpdated = new EventEmitter<number>();

  private products: IProduct[];

  public productNames: string[];
  public filteredProductNames = [];
  public availableColors = [];
  public availableSizes = [];

  form = new FormGroup({
    id: new FormControl(null),
    lineNumber: new FormControl(0),
    productReference: new FormControl(''),
    productName: new FormControl(''),
    productColor: new FormControl(''),
    productSize: new FormControl(''),
    productComments: new FormControl(''),
    productPrice: new FormControl(0),
    quantity: new FormControl(1)
  });

  constructor() { }

  ngOnInit() {

    this.form.setValue(this.quoteLine);

    this.form.get('productName').valueChanges.subscribe( name => {

      const standarizedName = this.standarize(name);
      this.filteredProductNames = this.productNames.filter( productName => this.standarize(productName).indexOf(standarizedName) >= 0 );
      if (this.filteredProductNames.length === 0) {
        this.filteredProductNames = this.productNames;
      }

      if (this.productNames.indexOf(name) >= 0) {
        this.updateOptionsFromProductName(name, true);

      } else {
        this.availableColors = [];
        this.availableSizes = [];
      }
    });

    this.form.get('productColor').valueChanges.subscribe( productColor => {
      const productName = this.form.get('productName').value;
      const productSize = this.form.get('productSize').value;
      this.setProductPrice(productName, productColor, productSize);
    });

    this.form.get('productSize').valueChanges.subscribe( productSize => {
      const productName = this.form.get('productName').value;
      const productColor = this.form.get('productColor').value;
      this.setProductPrice(productName, productColor, productSize);
    });

    this.form.valueChanges.subscribe( value => {
      this.quoteLine.productReference = value.productReference;
      this.quoteLine.productName = value.productName;
      this.quoteLine.productColor = value.productColor;
      this.quoteLine.productSize = value.productSize;
      this.quoteLine.productComments = value.productComments;
      this.quoteLine.quantity = value.quantity;
      this.quoteLine.productPrice = value.productPrice;
      this.quoteLineChange.emit(this.quoteLine);
    });
  }

  private setProductPrice(name: string, color: string, size: string) {
    const selectedProduct = this.products.find( product =>
      product.name === name &&
      product.color === color &&
      product.size === size);

    if (selectedProduct) {
      this.form.get('productPrice').setValue(selectedProduct.price);
      this.form.get('productReference').setValue(selectedProduct.reference);
    } else {
      this.form.get('productReference').setValue('');
    }
  }

  private updateOptionsFromProductName(name: string, setDefaults= false) {
    const filteredProducts = this.products.filter( product => product.name === name);

    this.availableColors = _.sortedUniq(filteredProducts.map( product => product.color ));
    this.availableSizes = _.uniq(filteredProducts.map( product => product.size ));

    if (setDefaults) {
      this.form.get('productColor').setValue( this.availableColors.length ? this.availableColors[0] : '' );
      this.form.get('productSize').setValue( this.availableSizes.length ? this.availableSizes[0] : '' );
    }
  }

  private standarize(value: string) {
    let stdValue = value.toUpperCase();
    stdValue = stdValue.replace(/Á/g, 'A');
    stdValue = stdValue.replace(/É/g, 'E');
    stdValue = stdValue.replace(/Í/g, 'I');
    stdValue = stdValue.replace(/Ó/g, 'O');
    stdValue = stdValue.replace(/Ú/g, 'U');
    return stdValue;
  }

}
