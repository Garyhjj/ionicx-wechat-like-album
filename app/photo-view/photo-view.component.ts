import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ModalController, ViewController, ActionSheetController, IonicPage } from 'ionic-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sg-photo-view',
  template: `<div class="container">
  <div *ngFor="let item of imgs;let i =index" (tap)="selectPhoto(i)">
    <div class="photo-container has-photo">
      <img [src]="item" alt="">
    </div>
  </div>
  <div *ngIf="myOpts.addable">
    <div class="photo-container" *ngIf="imgs.length<9" (tap)="addPhoto()">
      <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <line x1="15" y1="35" x2="55" y2="35" style="stroke:#ccc;stroke-width:1" />
        <line x1="35" y1="15" x2="35" y2="55" style="stroke:#ccc;stroke-width:1" />
      </svg>
    </div>
  </div>
</div>`,
  styles: [`
.container {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.photo-container {
  width: 70px;
  height: 70px;
  border: 1px solid #ccc;
  margin: 4px;
}
.photo-container.has-photo {
  border: none;
}
.photo-container.has-photo img {
  width: 100%;
  height: 100%;
}
`],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhotoViewComponent), multi: true, }],
})
export class PhotoViewComponent implements OnInit, ControlValueAccessor {

  private propagateChange = (_: any) => { };

  @Input()
  set opts(opts: any) {
    this.myOpts = Object.assign(this.myOpts, opts);
  }
  @Input()
  imgs: string[];
  outImgs: string[];

  myOpts = {
    addable: true,//是否能添加图片
    scanable: true,//是否进入能浏览图片
    removeable: true,//是否能移除图片
  }

  @Output()
  imgsChange = new EventEmitter<string[]>();

  @Output()
  addOnePicture = new EventEmitter<Function>();

  constructor(
    public modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    if (this.imgs) {

    } else {
      this.imgs = [];
    }
    this.bindEventForArray(this.imgs)
  }

  /**
   * 对能改变数组的方法添加钩子函数
   * 
   * @param {any[]} array 
   */
  bindEventForArray(array: any[]) {
    let fun = ['push', 'pop', 'sort', 'reverse', 'unshift', 'shift', 'splice'];
    fun.forEach((item) => {
      let _prototype = Array.prototype[item];
      let that = this;
      array[item] = function () {
        let new_value = _prototype.apply(this, arguments);
        that.outImgs = this.slice();
        that.emitChange(that.outImgs)
        return new_value;
      }
    })
  }

  /**
   * 给外部formControl写入数据
   * 
   * @param {*} value 
   */
  writeValue(value: any) {
    if (value != undefined) {
      if (value instanceof Array) {
        this.outImgs = value;
      } else {
        this.outImgs = [value];
      }
    } else {
      this.outImgs = [];
    }
    this.imgs = this.outImgs.slice();
    this.bindEventForArray(this.imgs)
  }

  /**
   * 把外面登记的监测change的函数赋值给this.propagateChange
   * 当内部数据改变时,可使用this.propagateChange(this.imgs.slice())去触发传递出去
   * @param {*} fn 
   */
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  /**
   * 也是一样注册然后调用当 touched 
   * @param {*} fn 
   */
  registerOnTouched(fn: any) { }

  /**
   * 添加图片
   */
  addPhoto() {
    let add = (img) => this.imgs.push(img);
    this.addOnePicture.emit(add);
  }

  /**
   * 选择图片，并用模态框展示
   * @param  {number} idx 当前图片的序号
   */
  selectPhoto(idx: number) {
    if (!this.myOpts.scanable) return
    this.presentProfileModal(idx);
  }

  /**
   * 初始化模态框
   * @param  {number} idx 当前图片的序号
   */
  presentProfileModal(idx: number) {
    let profileModal = this.modalCtrl.create(PhotoDetailComponent, { imgs: this.imgs, idx: idx, removeable: this.myOpts.removeable });
    profileModal.present();
  }

  /**
   * 把change冒泡到外部
   * 
   */
  emitChange(val: any) {
    this.imgsChange.emit(val);
    this.propagateChange(val)
  }
}
