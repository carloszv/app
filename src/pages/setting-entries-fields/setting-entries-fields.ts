import { SettingService } from './../../providers/setting-service';
import { AlertService } from './../../providers/alert-service';
import { ModelService } from './../../providers/model-service';
import { AuthService } from './../../providers/auth-service';
import { LoadingService } from './../../providers/loading-service';
import { MetadataField } from './../../models/metadata-field';
import { Component } from '@angular/core';


@Component({
  selector: 'page-setting-entries-fields',
  templateUrl: 'setting-entries-fields.html',
})
export class SettingEntriesFieldsPage {

  tableName: string;
  archiveName: string = 'workflow_db1';
  fields: MetadataField[];

  constructor(public loadingService: LoadingService, public authService: AuthService, public modelService: ModelService, public alertService: AlertService, public settingService: SettingService) { }


  ionViewDidLoad() {
    this.loadingService.subscribeWithLoading(this.modelService.getMetadataFieldsOfParentImageTable(this.authService.currentCredential, this.archiveName),
      tableFields => {
        this.tableName = tableFields.name;
        this.fields = tableFields.fields;
        this.fields.forEach(field => this.settingService.getFieldState(this.archiveName, this.tableName, field.name).subscribe(active => field.active = active));
      },
      err => {
        this.alertService.showError('Beim Laden der Feldinformationen ist ein Fehler aufgetreten.');
      });
  }

  fieldToggled(field: MetadataField) {
    this.settingService.setFieldState(this.archiveName, this.tableName, field.name, field.active);
  }
}
