import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { SearchWalletsComponent } from "./search-wallets/search-wallets.component";
import { WalletsEditionComponent } from "./wallets-edition/wallets-edition.component";
import { WalletsListComponent } from "./wallets-list/wallets-list.component";
import { WalletsManagerComponent } from "./wallets-manager/wallets-manager.component";

const routes = [
    { path: '', component: WalletsManagerComponent },
    { path: ':operacion/:id', component: WalletsEditionComponent }
];

@NgModule({
    imports: [
        MatCheckboxModule,
        MatButtonModule,
        FormsModule,
        CommonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatCardModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        WalletsManagerComponent,
        WalletsEditionComponent,
        SearchWalletsComponent,
        WalletsListComponent,
    ]
})
export class WalletsModule { }