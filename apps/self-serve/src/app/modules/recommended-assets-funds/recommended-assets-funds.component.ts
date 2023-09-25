import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CartActions from '../../core/state/cart/cart.actions';
import * as fromStore from '../../core/state/reducers';
@Component({
  selector: 'cimb-recommended-assets-funds',
  templateUrl: './recommended-assets-funds.component.html',
  styleUrls: ['./recommended-assets-funds.component.scss'],
})
export class RecommendedAssetsFundsComponent  implements OnInit {
  constructor(
    private store: Store<fromStore.AppState>
  ) {
  }


  ngOnInit() {
    this.store.dispatch(
      new CartActions.ToggleCartFooter(
        false
      )
    );
    this.store.dispatch(
      new CartActions.ToggleCartIconHeader(
        false
      )
    );
  }
}
