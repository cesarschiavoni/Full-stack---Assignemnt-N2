import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { PriciEditionComponent } from './prici-edition/prici-edition.component';


const routes = [
    { path: '', component: PriciEditionComponent }
];

@NgModule({
    imports: [
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
        PriciEditionComponent
    ]
})
export class PriciModule { }