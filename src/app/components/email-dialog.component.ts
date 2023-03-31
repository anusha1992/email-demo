import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { EmailService } from '../services/email.service';

export interface Email {
  emailId: string;
  invalid: boolean;
}

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css'],
})
export class EmailDialogComponent {
  form: FormGroup = new FormGroup({});
  defaultEmailBody: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  isDisabled = false;
  readonly separatorKeysCodes: number[] = [13, 188];

  emails: Email[] = [];
  constructor(private fb: FormBuilder, private emailService: EmailService) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      emailToControl: [[], [Validators.required]],
      emailSubjectControl: [null, [Validators.required]],
    });

    this.defaultEmailBody = `Dear $firstname $lastname,
    Welcome to Mindtree's Interview. 
    We are glad that you are interested to join mindtree.
    All the very best to you`;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const emailFormControl = this.form.controls['emailToControl'];

    // Add our email
    if (event.value) {
      if (this.validateEmail(event.value)) {
        this.emails.push({ emailId: event.value, invalid: false });
        this.isDisabled = false;
      } else {
        this.emails.push({ emailId: event.value, invalid: true });
        this.isDisabled = true;
      }
      emailFormControl.setValue([this.emails]);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(email: Email): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  private validateEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  submitEmailForm(form: FormGroup) {
    if (form.valid) {
      this.emailService.saveEmailForm(form);
    }
  }
}
