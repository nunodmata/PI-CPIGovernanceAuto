import {Component, Inject, inject} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FlowElement, PackageDetailService} from "../../services/package-detail.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-jenkins-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './jenkins-dialog.component.html',
  styleUrl: './jenkins-dialog.component.scss'
})
export class JenkinsDialogComponent {
  private snackBar = inject(MatSnackBar);
  ruleFiles: string[] = ['RuleFile1', 'RuleFile2', 'RuleFile3'];
  flowElement!: FlowElement | null;

  ngOnInit() {
    this.dialogRef.updateSize('50%', '50%');

    const initialRuleFile = this.ruleFiles[0]; // You can set the initial branch as needed
    this.form.patchValue({ selectedRuleFile: initialRuleFile });

    // Access the flow element from the dialog data
    if (this.data && this.data.flowElement) {
      this.flowElement = this.data.flowElement;
    }
  }

  form: FormGroup = this.formBuilder.group({
    selectedRuleFile: [null, Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<JenkinsDialogComponent>,
    private formBuilder: FormBuilder,
    private packageDetailService: PackageDetailService,
  ) {}

  showSuccessToast(message: string): void {
    this.snackBar
      .open(message, 'Close', {
        duration: 5000,
        panelClass: 'success-toast',
      })
      .onAction()
      .subscribe(() => this.snackBar.dismiss());
  }

  closeDialog() {
    this.dialogRef.close();
  }

  enableJenkins() {
    if (this.flowElement) {
      const selectedBranch = this.form.value.selectedBranch;
      console.log('Selected Branch:', selectedBranch);

      this.packageDetailService.enableJenkins(
        this.flowElement.name,
        this.flowElement.version,
//        selectedRuleFile
      ).subscribe(
        (response) => {
          console.log('Jenkins enabled successfully');
          this.showSuccessToast('Jenkins enabled successfully');
        },
        (error) => {
          console.error('Error enabling Jenkins for the flow:', error);
        }
      );
    }

    this.closeDialog();
  }
}