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
var PinchZoomDirective = (function () {
    function PinchZoomDirective(elementRef) {
        this.elementRef = elementRef;
        this.scale = 1;
        this.initialScale = 1;
        this.moveX = 0;
        this.moveY = 0;
        this.initialMoveX = 0;
        this.initialMoveY = 0;
        this.elem = this.elementRef.nativeElement;
    }
    PinchZoomDirective.prototype.touchstartHandler = function (event) {
        this.elem.style.transformOrigin = '0 0';
    };
    PinchZoomDirective.prototype.touchmoveHandler = function (event) {
        try {
            var touches = event.touches;
            // Swipe
            if (touches.length === 1 && this.scale > 1 && !this.eventType || this.eventType == 'swipe') {
                event.preventDefault();
                if (!this.eventType) {
                    this.startX = event.touches[0].pageX;
                    this.startY = event.touches[0].pageY;
                }
                this.eventType = 'swipe';
                this.moveX = this.initialMoveX + (event.touches[0].pageX - this.startX);
                this.moveY = this.initialMoveY + (event.touches[0].pageY - this.startY);
                this.transformElem(0);
            }
            // Pinch
            if (touches.length === 2 && !this.eventType || this.eventType == 'pinch') {
                event.preventDefault();
                if (!this.eventType) {
                    this.initialDistance = this.getDistance(touches);
                    this.moveXC = ((event.touches[0].pageX + event.touches[1].pageX) / 2) - this.initialMoveX;
                    this.moveYC = ((event.touches[0].pageY + event.touches[1].pageY) / 2) - this.initialMoveY;
                }
                this.eventType = 'pinch';
                this.distance = this.getDistance(touches);
                this.scale = this.initialScale * (this.distance / this.initialDistance);
                this.moveX = this.initialMoveX - (((this.distance / this.initialDistance) * this.moveXC) - this.moveXC);
                this.moveY = this.initialMoveY - (((this.distance / this.initialDistance) * this.moveYC) - this.moveYC);
                this.transformElem(0);
            }
        }
        catch (e) {
        }
    };
    PinchZoomDirective.prototype.touchendHandler = function (event) {
        var touches = event.touches;
        var img = this.elem.getElementsByTagName("img")[0];
        if (this.scale < 1) {
            this.scale = 1;
        }
        if (this.moveY > 0) {
            this.moveY = 0;
        }
        if (img && this.scale > 1) {
            var imgHeight = this.getElemHeight();
            var imgOffsetTop = ((imgHeight - this.elem.offsetHeight) * this.scale) / 2;
            if (imgHeight * this.scale < window.innerHeight) {
                this.moveY = (window.innerHeight - this.elem.offsetHeight * this.scale) / 2;
            }
            else if (this.eventType == 'swipe') {
                if (this.moveY > imgOffsetTop) {
                    this.moveY = imgOffsetTop;
                }
                else if ((imgHeight * this.scale + Math.abs(imgOffsetTop) - window.innerHeight) + this.moveY < 0) {
                    this.moveY = -(imgHeight * this.scale + Math.abs(imgOffsetTop) - window.innerHeight);
                }
            }
        }
        if (this.moveX > 0) {
            this.moveX = 0;
        }
        else if (this.moveX < this.elem.offsetWidth * (1 - this.scale)) {
            this.moveX = this.elem.offsetWidth * (1 - this.scale);
        }
        this.initialScale = this.scale;
        this.initialMoveX = this.moveX;
        this.initialMoveY = this.moveY;
        this.transformElem(200);
        this.eventType = 'touchend';
        if (touches.length == 0) {
            this.eventType = '';
        }
    };
    PinchZoomDirective.prototype.getDistance = function (touches) {
        return Math.sqrt(Math.pow(touches[0].pageX - touches[1].pageX, 2) + Math.pow(touches[0].pageY - touches[1].pageY, 2));
    };
    PinchZoomDirective.prototype.getElemHeight = function () {
        if (this.elem.getElementsByTagName("img")[0]) {
            return this.elem.getElementsByTagName("img")[0].offsetHeight;
        }
        else {
            return this.elem.offsetHeight;
        }
    };
    PinchZoomDirective.prototype.transformElem = function (duration) {
        if (duration === void 0) { duration = 50; }
        this.elem.style.transition = 'all ' + duration + 'ms';
        this.elem.style.transform = 'matrix(' + Number(this.scale) + ',' + 0 + ',' + 0 + ',' + Number(this.scale) + ',' + Number(this.moveX) + ',' + Number(this.moveY) + ')';
    };
    return PinchZoomDirective;
}());
__decorate([
    core_1.HostListener('touchstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PinchZoomDirective.prototype, "touchstartHandler", null);
__decorate([
    core_1.HostListener('touchmove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PinchZoomDirective.prototype, "touchmoveHandler", null);
__decorate([
    core_1.HostListener('touchend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PinchZoomDirective.prototype, "touchendHandler", null);
PinchZoomDirective = __decorate([
    core_1.Directive({
        selector: '[pinch-zoom]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], PinchZoomDirective);
exports.PinchZoomDirective = PinchZoomDirective;
//# sourceMappingURL=pinch-zoom.directive.js.map