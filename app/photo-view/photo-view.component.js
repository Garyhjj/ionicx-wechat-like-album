"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var photo_detail_component_1 = require("./photo-detail/photo-detail.component");
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var forms_1 = require("@angular/forms");
var PhotoViewComponent = PhotoViewComponent_1 = (function () {
    function PhotoViewComponent(modalCtrl, actionSheetCtrl) {
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.propagateChange = function (_) { };
        this.myOpts = {
            addable: true,
            scanable: true,
            removeable: true,
        };
        this.imgsChange = new core_1.EventEmitter();
        this.addOnePicture = new core_1.EventEmitter();
    }
    Object.defineProperty(PhotoViewComponent.prototype, "opts", {
        set: function (opts) {
            this.myOpts = Object.assign(this.myOpts, opts);
        },
        enumerable: true,
        configurable: true
    });
    PhotoViewComponent.prototype.ngOnInit = function () {
        if (this.imgs) {
        }
        else {
            this.imgs = [];
        }
        this.bindEventForArray(this.imgs);
    };
    /**
     * 对能改变数组的方法添加钩子函数
     *
     * @param {any[]} array
     */
    PhotoViewComponent.prototype.bindEventForArray = function (array) {
        var _this = this;
        var fun = ['push', 'pop', 'sort', 'reverse', 'unshift', 'shift', 'splice'];
        fun.forEach(function (item) {
            var _prototype = Array.prototype[item];
            var that = _this;
            array[item] = function () {
                var new_value = _prototype.apply(this, arguments);
                that.outImgs = this.slice();
                that.emitChange(that.outImgs);
                return new_value;
            };
        });
    };
    /**
     * 给外部formControl写入数据
     *
     * @param {*} value
     */
    PhotoViewComponent.prototype.writeValue = function (value) {
        if (value != undefined) {
            if (value instanceof Array) {
                this.outImgs = value;
            }
            else {
                this.outImgs = [value];
            }
        }
        else {
            this.outImgs = [];
        }
        this.imgs = this.outImgs.slice();
        this.bindEventForArray(this.imgs);
    };
    /**
     * 把外面登记的监测change的函数赋值给this.propagateChange
     * 当内部数据改变时,可使用this.propagateChange(this.imgs.slice())去触发传递出去
     * @param {*} fn
     */
    PhotoViewComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * 也是一样注册然后调用当 touched
     * @param {*} fn
     */
    PhotoViewComponent.prototype.registerOnTouched = function (fn) { };
    /**
     * 添加图片
     */
    PhotoViewComponent.prototype.addPhoto = function () {
        var _this = this;
        var add = function (img) { return _this.imgs.push(img); };
        this.addOnePicture.emit(add);
    };
    /**
     * 选择图片，并用模态框展示
     * @param  {number} idx 当前图片的序号
     */
    PhotoViewComponent.prototype.selectPhoto = function (idx) {
        if (!this.myOpts.scanable)
            return;
        this.presentProfileModal(idx);
    };
    /**
     * 初始化模态框
     * @param  {number} idx 当前图片的序号
     */
    PhotoViewComponent.prototype.presentProfileModal = function (idx) {
        var profileModal = this.modalCtrl.create(photo_detail_component_1.PhotoDetailComponent, { imgs: this.imgs, idx: idx, removeable: this.myOpts.removeable });
        profileModal.present();
    };
    /**
     * 把change冒泡到外部
     *
     */
    PhotoViewComponent.prototype.emitChange = function (val) {
        this.imgsChange.emit(val);
        this.propagateChange(val);
    };
    return PhotoViewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PhotoViewComponent.prototype, "opts", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], PhotoViewComponent.prototype, "imgs", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PhotoViewComponent.prototype, "imgsChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PhotoViewComponent.prototype, "addOnePicture", void 0);
PhotoViewComponent = PhotoViewComponent_1 = __decorate([
    core_1.Component({
        selector: 'sg-photo-view',
        template: "<div class=\"container\">\n  <div *ngFor=\"let item of imgs;let i =index\" (tap)=\"selectPhoto(i)\">\n    <div class=\"photo-container has-photo\">\n      <img [src]=\"item\" alt=\"\">\n    </div>\n  </div>\n  <div *ngIf=\"myOpts.addable\">\n    <div class=\"photo-container\" *ngIf=\"imgs.length<9\" (tap)=\"addPhoto()\">\n      <svg width=\"100%\" height=\"100%\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n        <line x1=\"15\" y1=\"35\" x2=\"55\" y2=\"35\" style=\"stroke:#ccc;stroke-width:1\" />\n        <line x1=\"35\" y1=\"15\" x2=\"35\" y2=\"55\" style=\"stroke:#ccc;stroke-width:1\" />\n      </svg>\n    </div>\n  </div>\n</div>",
        styles: ["\n.container {\n  overflow: hidden;\n  display: flex;\n  flex-wrap: wrap;\n}\n.photo-container {\n  width: 70px;\n  height: 70px;\n  border: 1px solid #ccc;\n  margin: 4px;\n}\n.photo-container.has-photo {\n  border: none;\n}\n.photo-container.has-photo img {\n  width: 100%;\n  height: 100%;\n}\n"],
        providers: [{ provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return PhotoViewComponent_1; }), multi: true, }],
    }),
    __metadata("design:paramtypes", [ionic_angular_1.ModalController,
        ionic_angular_1.ActionSheetController])
], PhotoViewComponent);
exports.PhotoViewComponent = PhotoViewComponent;
var PhotoViewComponent_1;
//# sourceMappingURL=photo-view.component.js.map