/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, expect, it, inject, beforeEachProviders } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { provide } from '@angular/core';
import { UploadButtonComponent } from './upload-button.component';
import { AlfrescoTranslationService } from 'ng2-alfresco-core';
import { TranslationMock } from '../assets/translation.service.mock';
import { UploadServiceMock } from '../assets/upload.service.mock';
import { UploadService } from '../services/upload.service';

describe('AlfrescoUploadButton', () => {

    beforeEachProviders(() => {
        return [
            provide(AlfrescoTranslationService, {useClass: TranslationMock}),
            provide(UploadService, {useClass: UploadServiceMock})
        ];
    });

    it('should render upload-single-file button as default',
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(UploadButtonComponent)
                .then((fixture) => {
                    let component = fixture.componentInstance;
                    component.multipleFiles = false;
                    let compiled = fixture.debugElement.nativeElement;
                    fixture.detectChanges();
                    expect(compiled.querySelector('#upload-single-file')).toBeDefined();
                });
        }));

    it('should render upload-multiple-file button if multipleFiles is true',
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(UploadButtonComponent)
                .then((fixture) => {
                    let component = fixture.componentInstance;
                    component.multipleFiles = true;
                    let compiled = fixture.debugElement.nativeElement;
                    fixture.detectChanges();
                    expect(compiled.querySelector('#upload-multiple-files')).toBeDefined();
                });
        }));

    it('should render an uploadFolder button if uploadFolder is true',
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(UploadButtonComponent)
                .then((fixture) => {
                    let component = fixture.componentInstance;
                    component.uploadFolder = true;
                    let compiled = fixture.debugElement.nativeElement;
                    fixture.detectChanges();
                    expect(compiled.querySelector('#uploadFolder')).toBeDefined();
                });
        }));

    it('should call onFilesAdded method', inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb
            .createAsync(UploadButtonComponent)
            .then((fixture) => {
                let component = fixture.componentInstance;
                component.onFilesAdded = jasmine.createSpy('onFilesAdded');

                fixture.detectChanges();

                let fakeEvent = {
                    currentTarget: {files: [{name: 'fake-name', size: 10}]}
                };

                component.onFilesAdded(fakeEvent);
                expect(component.onFilesAdded).toHaveBeenCalledWith(fakeEvent);
            });
    }));

    it('should render dialog box with css class show',
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(UploadButtonComponent)
                .then((fixture) => {
                    let component = fixture.componentInstance;
                    fixture.detectChanges();
                    let compiled = fixture.debugElement.nativeElement;

                    component._showDialog();
                    fixture.detectChanges();
                    expect(compiled.querySelector('.file-dialog').getAttribute('class')).toEqual('file-dialog show');
                });
        }));
});

