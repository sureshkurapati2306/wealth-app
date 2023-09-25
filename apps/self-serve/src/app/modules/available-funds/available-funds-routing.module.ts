import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableFundsComponent } from './available-funds.component';
import { FundDetailComponent } from '../available-funds/fund-detail/fund-detail.component';
import { AvailableFundsResolver } from './available-funds.resolver';

const routes: Routes = [
    {
        path: '',
        component: AvailableFundsComponent,
        resolve: {
            fundsList: AvailableFundsResolver,
        },
        //Commenting for route to Fund details component
        // children: [
        //     {
        //         path: ':id',
        //         component: FundDetailComponent,
        //     },
        // ],
    },
    {
        path: 'fund-detail',
        component: FundDetailComponent,
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AvailableFundsRoutingModule {}

export const AVAILABLE_FUNDS_COMPONENTS = [AvailableFundsComponent];
