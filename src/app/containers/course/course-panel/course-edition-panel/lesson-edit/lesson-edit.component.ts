import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { LessonModel } from 'src/app/core/models/education/lesson/lesson.model';
import { ServerModel } from 'src/app/core/models/common/server/server.model';
import { LessonService } from 'src/app/core/services/education/lesson-service/lesson.service';
import { CloudModel } from 'src/app/core/models/common/cloud/cloud.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { CloudParameters } from 'src/app/core/models/common/cloud/parameters.model';
@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss']
})
export class LessonEditComponent implements OnInit {

  @Input() assets: CloudModel[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  baseUrl = environment.apiUrl;

  public response: { dbPath: '' };
  public isCreate: boolean;
  private serverAsset: ServerModel;

  public serverAssetName: string;
  public url: string;
  public userId: number;
  public lessonId: number;

  LessonForm: FormGroup;
  LessonObject: LessonModel;
  newLessonId: number;
  userID: number;

  // ServerForm: FormGroup;
  // ServerObject: ServerModel;

  AssetForm: FormGroup;
  AssetObject: CloudModel;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private lessonService: LessonService,
    private http: HttpClient,
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}
  public uploadFinished = event => {
    this.response = event;
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44345/api/${serverPath}`;
  }

  ngOnInit() {
    this.userID = + localStorage.getItem('userID');
    this.initializeUploader();
    this.createAddLessonForm();
    // this.createAddServerAssetForm();
    this.createAddCloudAssetForm();
    this.isCreate = true;

  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  initializeUploader() {

  
    console.log(localStorage.getItem('lessonId'));
    this.uploader = new FileUploader({
      url: this.baseUrl + 'cloudupload/' + this.userID + '/' + localStorage.getItem('lessonId'),
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image', 'pdf', 'video'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 1000 * 1024 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;

    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: CloudModel = JSON.parse(response);
        this.alertifyService.success('Plik został wysłany');
        const asset = {
          name: res.assetName,
          type: res.type,
          url: res.url,
          publicId: res.publicId,
          userId: res.userId,
          lessonId: res.lessonId
        };
      }
    };
  }

  createAddLessonForm() {
    this.LessonForm = this.formBuilder.group({
      lessonTitle: [''],
      priority: [],
      courseId: [3]
    });
  }
  // createAddServerAssetForm() {
  //   this.ServerForm = this.formBuilder.group({
  //     serverAssetName: [''],
  //     url: [this.response.dbPath],
  //     userId: [],
  //     lessonId: []
  //   });
  // }
  createAddCloudAssetForm() {
    this.AssetForm = this.formBuilder.group({
      assetName: [''],
      url: [],
      userId: [this.userID],
      lessonId: [this.newLessonId]
    });
  }

  addLesson() {
    if (this.LessonForm.valid) {
      this.LessonObject = Object.assign({}, this.LessonForm.value);
      this.lessonService.addLesson(this.LessonObject).subscribe(
        (response) => {
          // this.ngOnInit();
          console.log(response);
          this.newLessonId = + response;
          localStorage.removeItem('lessonId');
          localStorage.setItem('lessonId',  String(this.newLessonId));
          this.alertify.success('Lekcja została utworzona');
        },
        error => {
          console.log(error);
          this.alertify.error(error);
        }
      );
    }
  }
  addCloudAsset() {
    if (this.AssetForm.valid) {
      this.AssetObject = Object.assign({}, this.AssetForm.value);
      this.lessonService.addCloudAsset(this.AssetObject).subscribe(
        () => {
          // this.ngOnInit();
          this.alertify.success('Link został dodany');
        },
        error => {
          console.log(error);
          this.alertify.error(error);
        }
      );
    }
  }
  contain(imagePath: string) {
    if (imagePath.includes('http')) {
      return true;
    } else {
      return false;
    }
  }
  public onCreate = () => {
    this.serverAsset = {
      serverAssetName: this.serverAssetName,
      url: this.response.dbPath,
      userId: this.userID,
      lessonId: this.newLessonId
    },
    this.lessonService.addServerAsset(this.serverAsset).subscribe(
      () => {
        // this.ngOnInit();
        this.alertify.success('Materiał został dodany');
      },
      error => {
        console.log(error);
        this.alertify.error(error);
      }
    );
  }

  // public uploadFinished = event => {
  //   this.response = event;
  // }
  // public createImgPath = (serverPath: string) => {
  //   return `http://educourseapi.azurewebsites.net/${serverPath}`;
  // }
}
