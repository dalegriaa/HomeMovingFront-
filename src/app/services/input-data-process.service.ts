import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class DataProcessService {
    private API_URL= environment.API_URL;
    constructor(private http: HttpClient) {
   
    }

    insertData(file: File, id: number) {
        const formData = new FormData();
        formData.append('fileselected',file);
        return this.http.post(this.API_URL+`/Home/InsertDataUser/${id}/${'fileselected'}`,
         formData);
    }

}


