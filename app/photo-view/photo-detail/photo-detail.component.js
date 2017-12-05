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
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
// @IonicPage()
var PhotoDetailComponent = (function () {
    function PhotoDetailComponent(viewCtr, params, alertCtrl) {
        this.viewCtr = viewCtr;
        this.params = params;
        this.alertCtrl = alertCtrl;
        this.idx = 0; // 目前显示图片的序号
        this.currentPosition = 0; // 目前偏移的位置
    }
    PhotoDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getScreenWidth();
        this.imgs = this.params.data.imgs || [];
        this.idx = this.params.data.idx || 0;
        this.removeable = this.params.get('removeable');
        this.switch(this.idx);
        window.addEventListener('resize', this.f = function () { _this.throttle(_this.resizeCallback, _this, [], 50); });
    };
    PhotoDetailComponent.prototype.resizeCallback = function () {
        this.getScreenWidth();
        this.switch(this.idx);
    };
    PhotoDetailComponent.prototype.getScreenWidth = function () {
        this.whole = this.photoView.nativeElement.clientWidth;
    };
    PhotoDetailComponent.prototype.ngOnDestroy = function () {
        window.removeEventListener('resize', this.f);
    };
    /**
     * 返回
     */
    PhotoDetailComponent.prototype.exit = function () {
        this.viewCtr.dismiss();
    };
    /**
     * 删除
     */
    PhotoDetailComponent.prototype.delete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: "\u63D0\u793A",
            message: "\u8981\u5220\u9664\u8FD9\u5F20\u56FE\u7247\u5417?",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                    }
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.imgs.splice(_this.idx, 1);
                        _this.idx = _this.idx > _this.imgs.length - 1 ? --_this.idx : _this.idx;
                        if (_this.idx === -1) {
                            _this.viewCtr.dismiss();
                        }
                        else {
                            _this.switch(_this.idx);
                        }
                    }
                }
            ]
        });
        confirm.present();
    };
    /**
     * 拖动开始
     * @param  {Event}    e 事件
     */
    PhotoDetailComponent.prototype.draftStart = function (e) {
        this.pageX = e.touches[0].pageX;
        this.timeStart = e.timeStamp;
    };
    /**
     * 拖动中
     * @param  {Event}    e 事件
     */
    PhotoDetailComponent.prototype.draft = function (e) {
        this.move = e.touches[0].pageX - this.pageX;
        this.photoView.nativeElement.style.transform = 'translateX(' + (this.currentPosition + this.move / 2) + 'px' + ')';
    };
    /**
     * 拖动结束
     * @param  {Event}    e 事件
     */
    PhotoDetailComponent.prototype.draftEnd = function (e) {
        var length = this.imgs.length;
        var last = this.idx;
        if (e.timeStamp - this.timeStart < 1500 && Math.abs(this.move) > 50) {
            if (this.move > 0) {
                this.idx--;
            }
            else {
                this.idx++;
            }
            this.idx = Math.min(this.idx, length - 1);
            this.idx = Math.max(0, this.idx);
        }
        this.switch(this.idx, last);
    };
    /**
     * 根据选择的序号移动图片容器
     * @param  {number} idx 选择的图片的序号
     */
    PhotoDetailComponent.prototype.switch = function (idx, last) {
        if (last === void 0) { last = -1; }
        if (last > -1 && last !== idx) {
            var lastImg = this.photoView.nativeElement.getElementsByClassName('img')[last];
            lastImg.style.transition = '';
            lastImg.style.transformOrigin = '0 0';
            lastImg.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
        }
        var margin = 6;
        this.currentPosition = -((this.whole + margin) * (idx));
        this.photoView.nativeElement.style.transform = 'translateX(' + this.currentPosition + 'px' + ')';
    };
    /**
     *  节流，限制事件的触发频率
     *
     * @param {*} 方法
     * @param {Object} 上下文
     * @param {any[]} 需要传入的参数
     * @param {number} [during=100] 间隔的时间
     */
    PhotoDetailComponent.prototype.throttle = function (method, context, args, during) {
        if (args === void 0) { args = []; }
        if (during === void 0) { during = 100; }
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call.apply(method, [context].concat(args));
        }, during);
    };
    return PhotoDetailComponent;
}());
__decorate([
    core_1.ViewChild('photoView'),
    __metadata("design:type", Object)
], PhotoDetailComponent.prototype, "photoView", void 0);
PhotoDetailComponent = __decorate([
    core_1.Component({
        selector: 'sg-photo-detail',
        template: "<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{(this.idx+1)+' / '+this.imgs.length}}\n    </ion-title>\n    <ion-buttons>\n      <button ion-button (tap)=\"exit()\">\u8FD4\u56DE</button>\n    </ion-buttons>\n    <ion-buttons end *ngIf=\"removeable\">\n      <button ion-button (tap)=\"delete()\" class=\"iconfontyyy\">&#xe643;</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div class=\"container\" #photoView>\n    <div class=\"img\" *ngFor=\"let item of imgs\" (touchend)=\"draftEnd($event)\" (touchstart)=\"draftStart($event)\" (touchmove)=\"draft($event)\" pinch-zoom>\n      <img [src]=\"item\" alt=\"\">\n    </div>\n  </div>\n</ion-content>\n",
        styles: ["\nion-content {\n  background-color: #000!important;\n}\n.container {\n  display: flex;\n  height: 100%;\n  align-items: center;\n}\n.container .img {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  flex-shrink: 0;\n  margin-right: 6px;\n}\n/* \u5B9A\u7FA9\u963F\u91CC\u5716\u5EAB */\n@font-face {\n  font-family: 'iconfontyyy';\n  /* project id 234366 */\n  src: url('https://at.alicdn.com/t/font_234366_fox554rgo8ddkj4i.eot');\n  src: url('https://at.alicdn.com/t/font_234366_fox554rgo8ddkj4i.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_234366_fox554rgo8ddkj4i.woff') format('woff'), url('https://at.alicdn.com/t/font_234366_fox554rgo8ddkj4i.ttf') format('truetype'), url('https://at.alicdn.com/t/font_234366_fox554rgo8ddkj4i.svg#iconfont') format('svg');\n}\n.iconfontyyy {\n  font-family: \"iconfontyyy\" !important;\n  font-size: 15px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale;\n}\n"]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.ViewController,
        ionic_angular_1.NavParams,
        ionic_angular_1.AlertController])
], PhotoDetailComponent);
exports.PhotoDetailComponent = PhotoDetailComponent;
//# sourceMappingURL=photo-detail.component.js.map