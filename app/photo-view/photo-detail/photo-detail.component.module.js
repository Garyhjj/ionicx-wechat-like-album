"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var directives_module_1 = require("../directives/directives.module");
var core_1 = require("@angular/core");
var photo_detail_component_1 = require("./photo-detail.component");
var ionic_angular_1 = require("ionic-angular");
var PhotoDetailComponentModule = (function () {
    function PhotoDetailComponentModule() {
    }
    return PhotoDetailComponentModule;
}());
PhotoDetailComponentModule = __decorate([
    core_1.NgModule({
        declarations: [photo_detail_component_1.PhotoDetailComponent],
        imports: [ionic_angular_1.IonicPageModule.forChild(photo_detail_component_1.PhotoDetailComponent), directives_module_1.DirectivesModule],
        exports: [photo_detail_component_1.PhotoDetailComponent],
        entryComponents: [
            photo_detail_component_1.PhotoDetailComponent
        ]
    })
], PhotoDetailComponentModule);
exports.PhotoDetailComponentModule = PhotoDetailComponentModule;
//# sourceMappingURL=photo-detail.component.module.js.map