import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';

// @IonicPage()
@Component({
  selector: 'sg-photo-detail',
  template: `<ion-header>
  <ion-navbar>
    <ion-title>
      {{(this.idx+1)+' / '+this.imgs.length}}
    </ion-title>
    <ion-buttons>
      <button ion-button (tap)="exit()">返回</button>
    </ion-buttons>
    <ion-buttons end *ngIf="removeable">
      <button ion-button (tap)="delete()" class="iconfontyyy">&#xe643;</button>
    </ion-buttons>
  </ion-navbar>
</ion-header>
<ion-content>
  <div class="container" #photoView>
    <div class="img" *ngFor="let item of imgs" (touchend)="draftEnd($event)" (touchstart)="draftStart($event)" (touchmove)="draft($event)" pinch-zoom>
      <img [src]="item" alt="">
    </div>
  </div>
</ion-content>
`,
  styles: [`
ion-content {
  background-color: #000!important;
}
.container {
  display: flex;
  height: 100%;
  align-items: center;
}
.container .img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-shrink: 0;
  margin-right: 6px;
}
/* 定義阿里圖庫 */
@font-face {
  font-family: 'iconfontyyy';
  /* project id 234366 */
  src: url('https://at.alicdn.com/t/font_234366_fox554rgo8ddkj4i.eot');
  src: url('https://at.alicdn.com/t/font_234366_fox554rgo8ddkj4i.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_234366_fox554rgo8ddkj4i.woff') format('woff'), url('https://at.alicdn.com/t/font_234366_fox554rgo8ddkj4i.ttf') format('truetype'), url('https://at.alicdn.com/t/font_234366_fox554rgo8ddkj4i.svg#iconfont') format('svg');
}
.iconfontyyy {
  font-family: "iconfontyyy" !important;
  font-size: 15px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
`]
})
export class PhotoDetailComponent implements OnInit, OnDestroy {

  imgs: string[];
  removeable: boolean // 是否可移除
  pageX: number;// 记录开始按的X位置
  idx: number = 0; // 目前显示图片的序号
  timeStart: number; // 记录开始按的X时间
  move: number; // 记录拖动的的横向距离
  currentPosition: number = 0; // 目前偏移的位置
  whole: number; // 屏幕的宽度
  f: any;
  @ViewChild('photoView') photoView: any;
  constructor(
    private viewCtr: ViewController,
    private params: NavParams,
    private alertCtrl: AlertController,
  ) { }


  ngOnInit() {
    this.getScreenWidth();
    this.imgs = this.params.data.imgs || [];
    this.idx = this.params.data.idx || 0;
    this.removeable = this.params.get('removeable');
    this.switch(this.idx);
    window.addEventListener('resize', this.f = () => { this.throttle(this.resizeCallback, this, [], 50) });
  }

  resizeCallback() {
    this.getScreenWidth();
    this.switch(this.idx);
  }

  getScreenWidth() {
    this.whole = this.photoView.nativeElement.clientWidth;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.f);
  }
  /**
   * 返回
   */
  exit() {
    this.viewCtr.dismiss()
  }

  /**
   * 删除
   */
  delete() {
    let confirm = this.alertCtrl.create({
      title: `提示`,
      message: `要删除这张图片吗?`,
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确定',
          handler: () => {
            this.imgs.splice(this.idx, 1);
            this.idx = this.idx > this.imgs.length - 1 ? --this.idx : this.idx;
            if (this.idx === -1) {
              this.viewCtr.dismiss();
            } else {
              this.switch(this.idx)
            }
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * 拖动开始
   * @param  {Event}    e 事件
   */
  draftStart(e: any) {
    this.pageX = e.touches[0].pageX;
    this.timeStart = e.timeStamp;
  }

  /**
   * 拖动中
   * @param  {Event}    e 事件
   */
  draft(e: any) {
    this.move = e.touches[0].pageX - this.pageX;
    this.photoView.nativeElement.style.transform = 'translateX(' + (this.currentPosition + this.move / 2) + 'px' + ')';
  }

  /**
   * 拖动结束
   * @param  {Event}    e 事件
   */
  draftEnd(e: any) {
    let length = this.imgs.length;
    let last = this.idx;
    if (e.timeStamp - this.timeStart < 1500 && Math.abs(this.move) > 50) {
      if (this.move > 0) {
        this.idx--;
      } else {
        this.idx++;
      }
      this.idx = Math.min(this.idx, length - 1);
      this.idx = Math.max(0, this.idx);

    }
    this.switch(this.idx, last);
  }

  /**
   * 根据选择的序号移动图片容器
   * @param  {number} idx 选择的图片的序号
   */
  switch(idx: number, last: number = -1) {
    if (last > -1 && last !== idx) {
      let lastImg = this.photoView.nativeElement.getElementsByClassName('img')[last];
      lastImg.style.transition = '';
      lastImg.style.transformOrigin = '0 0';
      lastImg.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
    }

    let margin: number = 6;
    this.currentPosition = -((this.whole + margin) * (idx));
    this.photoView.nativeElement.style.transform = 'translateX(' + this.currentPosition + 'px' + ')';
  }

  /**
   *  节流，限制事件的触发频率
   * 
   * @param {*} 方法 
   * @param {Object} 上下文 
   * @param {any[]} 需要传入的参数 
   * @param {number} [during=100] 间隔的时间 
   */
  throttle(method: any, context: Object, args: any[] = [], during: number = 100) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
      method.call(context, ...args);
    }, during);
  }
}
