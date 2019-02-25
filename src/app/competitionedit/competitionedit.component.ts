import {Component, OnInit, TemplateRef} from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Http} from "@angular/http";
import {Router, ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {moment} from "ngx-bootstrap/chronos/test/chain";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-competitionedit',
  templateUrl: './competitionedit.component.html',
  styleUrls: ['./competitionedit.component.css'],
  providers: [Commonservices]
})
export class CompetitioneditComponent implements OnInit {
  public dataForm: FormGroup;
  public fb;
  public compid;
  public is_error;
  public serverurl;
  public siteurl;
  public fileurl;
  public uploadurl;
  public formval;
  public formvalstartdate;
  public formvalenddate;
  public formvalendbgimage;
  public base64image;
  public rawimage;
  public image;
  public image1;
  public image2;
  public imageloading;
  public imageserror:boolean;
  public selectedFile:File;
  modalRef: BsModalRef;
  constructor(fb: FormBuilder,private _commonservices : Commonservices,private _http: Http,private router: Router,private modalService: BsModalService,private sanitizer:DomSanitizer,private route:ActivatedRoute) {
    this.fb = fb;
    this.image = '';
    this.image1 = '';
    this.siteurl=_commonservices.siteurl;
    this.serverurl=_commonservices.url;
    this.fileurl=_commonservices.fileurl;
    this.uploadurl=_commonservices.uploadncropurl;
    this.imageserror = false;

    this.route.params.subscribe(params=>{
      this.compid = params['id'];
      this.getCompetitionDetails();
    });
  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      competitionname: ["", Validators.required],
      description: ["", Validators.required],
      startdate: ["", CompetitioneditComponent.validateDate],
      enddate: ["", CompetitioneditComponent.validateDate],
    });
  }

  getCompetitionDetails(){
    var link =this.serverurl+'competitiondetails';
    var data = {_id: this.compid};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          if (result.status == 'success' && typeof(result.item) != 'undefined'){
            let userdet = result.item;
            this.dataForm.controls['competitionname'].setValue(userdet.competitionname);
            this.dataForm.controls['description'].setValue(userdet.description);
            this.dataForm.controls['startdate'].setValue(moment.unix(userdet.startdate).toDate());
            this.dataForm.controls['enddate'].setValue(moment.unix(userdet.enddate).toDate());
            this.image = userdet.image;
            this.image1 = userdet.image1;
            this.image2 = userdet.image2;
          }
        },error => {
          console.log("Oooops!");
        });

  }

  static validateDate(control: FormControl) {
    if (control.value === '') {
      return { blankdate: true };
    }
    if (!moment(control.value).isValid()) {
      return { invaliddate: true };
    }
  }

  onFileChanged(event) {
    this.imageloading = 'line-loader.gif';
    this.image = '';
    this.image1 = '';
    this.image2 = '';
    this.imageserror = false;
    this.selectedFile = event.target.files[0];

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);

    this._http.post(this.uploadurl, uploadData)
        .subscribe(event => {
          this.imageloading = '';
          var res = event.json();
          if(res.error_code == 0){
            this.image = res.filename;
            this.image1 = res.filename1;
            this.image2 = res.filename2;
          }else{
            this.imageserror = true;
          }
        }, error => {
          this.imageserror = true;
          this.imageloading = '';
        });
  }

  dosubmit(formval){
    this.imageserror = false;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if(this.image == ''){
      this.imageserror = true;
      return true;
    }
    if (this.dataForm.valid) {
      var link = this.serverurl+'updatecompetition';
      var data = {
        _id: this.compid,
        competitionname: formval.competitionname,
        description: formval.description,
        startdate: moment(formval.startdate).unix(),
        enddate: moment(formval.enddate).unix(),
        image: this.image,
        image1: this.image1,
        image2: this.image2,
      };

      this._http.post(link, data)
          .subscribe(res => {
            var result = res.json();
            if(result.status=='success'){
              this.router.navigate(['/competition-list']);
            }
            else {
              this.is_error= result.msg;
            }
          }, error => {
            console.log("Oooops!");
          });
    }
  }

  cropimg1(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.rawimage = '';
    let link = this.siteurl+'getbase64image.php';
    let data = {fileurl: this.image};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.text();
          this.rawimage = result;
        }, error => {
          console.log("Oooops!");
        });
  }

  cropimg2(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.rawimage = '';
    let link = this.siteurl+'getbase64image.php';
    let data = {fileurl: this.image};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.text();
          this.rawimage = result;
        }, error => {
          console.log("Oooops!");
        });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.base64image = event.base64;
  }

  crop1(){
    this.rawimage = '';
    let link = this.siteurl+'saveCropImage.php';
    let data = {filename: this.image,base64image:this.base64image,cropwidth:1540,cropheight:421};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.text();
          this.image1 = '';
          this.image1 = result;
          this.modalRef.hide();
        }, error => {
          console.log("Oooops!");
        });
  }

  crop2(){
    this.rawimage = '';
    let link = this.siteurl+'saveCropImage.php';
    let data = {filename: this.image,base64image:this.base64image,cropwidth:634,cropheight:421};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.text();
          this.image2 = '';
          this.image2 = result;
          this.modalRef.hide();
        }, error => {
          console.log("Oooops!");
        });
  }

  previewcomp(template: TemplateRef<any>,formval){
    this.formval = formval;
    this.formvalstartdate = moment(formval.startdate).format('Do MMM YYYY');
    this.formvalenddate = moment(formval.enddate).format('Do MMM YYYY');
    this.formvalendbgimage = this.sanitizer.bypassSecurityTrustStyle('url('+this.fileurl+this.image1+')  no-repeat left 7% bottom');
    this.imageserror = false;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if(this.image1 == ''){
      this.imageserror = true;
      return true;
    }
    if (this.dataForm.valid) {
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    }
  }
  close(): void {
    this.modalRef.hide();
  }
}
