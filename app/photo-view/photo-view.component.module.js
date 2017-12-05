"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var photo_detail_component_module_1 = require("./photo-detail/photo-detail.component.module");
var core_1 = require("@angular/core");
var photo_view_component_1 = require("./photo-view.component");
var ionic_angular_1 = require("ionic-angular");
var PhotoViewComponentModule = (function () {
    function PhotoViewComponentModule() {
    }
    return PhotoViewComponentModule;
}());
PhotoViewComponentModule = __decorate([
    core_1.NgModule({
        declarations: [photo_view_component_1.PhotoViewComponent
        ],
        imports: [ionic_angular_1.IonicPageModule.forChild(photo_view_component_1.PhotoViewComponent), photo_detail_component_module_1.PhotoDetailComponentModule],
        exports: [photo_view_component_1.PhotoViewComponent],
        providers: []
    })
], PhotoViewComponentModule);
exports.PhotoViewComponentModule = PhotoViewComponentModule;
//# sourceMappingURL=photo-view.component.module.js.map