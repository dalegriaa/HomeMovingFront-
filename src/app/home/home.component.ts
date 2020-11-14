import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataProcessService} from '../services/input-data-process.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;
  selectedFile: File;
  documentNumber: number;
  constructor(private dataProcessService: DataProcessService, private formBuilder: FormBuilder) { 
 
  }

  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      documentNumber: ['', Validators.required],
      filetxt:['', Validators.required]
  });
  }
  get formControls() { return this.loginForm.controls; }

  submit(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
      this.setDataUser();
      this.dataProcessService.insertData(this.selectedFile, this.documentNumber).
      subscribe(data =>  
        this.downloadFile(data['Data']));
    } 
    
    onFileSelect(event) {
      let file = event.target.files[0]; // <--- File Object for future use.
      this.loginForm.controls['filetxt'].setValue(file ? file.name : ''); // <-- Set Value for Validation
      this.selectedFile= file;
  }
   setDataUser(): void {
      this.documentNumber =  this.loginForm.value.documentNumber;
   }

   downloadFile(b64encodedString: string) {
     debugger;
    if (b64encodedString) {
      
      var blob = this.base64ToBlob(b64encodedString, 'text/plain');
      saveAs(blob, "test");
    }
   }

   base64ToBlob(b64Data, contentType='', sliceSize=512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }
  
  }
