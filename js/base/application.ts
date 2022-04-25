import { vec2 } from '../utils/math2d'

export enum EInputEventType {
  MOUSEEVENT,
  MOUSEDOWN,
  MOUSEUP,
  MOUSEMOVE,
  MOUSEDRAG,
  KEYBOARDEVENT,
  KEYUP,
  KEYDOWN,
  KEYPRESS,
  CLICK,
  TOUCHSTART,
  TOUCHMOVE,
  TOUCHEND
}

export class CanvasInputEvent {
  public altKey: boolean;
  public ctrlKey: boolean;
  public shiftKey: boolean;
  public type: EInputEventType;
  public constructor(type: EInputEventType, altkey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false) {
    this.altKey = altkey
    this.ctrlKey = ctrlKey
    this.shiftKey = shiftKey
    this.type = type
  }
}

export type TimerCallback = (id: number, data: any) => void;

class Timer {
  public id: number = -1
  public enabled: boolean = false
  public callback: TimerCallback;
  public callbackData: any = undefined;
  public countdown: number = 0;
  public timeout: number = 0;
  public onlyOnce: boolean = false;

  constructor(callback: TimerCallback) {
    this.callback = callback
  }
}

export class CanvasMouseEvent extends CanvasInputEvent {
  public button: number;
  public canvasPosition: vec2;
  public localPosition: vec2;
  public hasLocalPosition: boolean;

  public constructor(type: EInputEventType, canvasPos: vec2, button: number, altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false) {
    super(type, altKey, ctrlKey, shiftKey);
    this.canvasPosition = canvasPos
    this.button = button
    this.hasLocalPosition = false
    this.localPosition = vec2.create()
  }
}

export class CanvasKeyBoardEvent extends CanvasInputEvent {
  public key: string;
  public keyCode: number;
  public repeat: boolean;

  public constructor(type: EInputEventType, key: string, keyCode: number, repeat: boolean, altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false) {
    super(type, altKey, ctrlKey, shiftKey)
    this.key = key
    this.keyCode = keyCode
    this.repeat = repeat
  }
}

export class Application implements EventListenerObject {
  public timers: Timer[] = [];
  private _timerId: number = -1;
  private _fps: number = 0;
  public canvas: HTMLCanvasElement;
  public isSupportMouseMove: boolean;

  protected _isMouseDown: boolean;
  protected _start: boolean = false;
  protected _requestId: number = -1;
  protected _lastTime !: number;
  protected _startTime !: number;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.canvas.addEventListener('mousedown', this, false)
    this.canvas.addEventListener('mouseup', this, false)
    this.canvas.addEventListener('mousemove', this, false)

    this.canvas.addEventListener('click', this, false)
    this.canvas.addEventListener('touchstart', this, false)
    this.canvas.addEventListener('touchmove', this, false)
    this.canvas.addEventListener('touchend', this, false)

    window.addEventListener('keydown', this, false)
    window.addEventListener('keyup', this, false)
    window.addEventListener('keypress', this, false)
    this._isMouseDown = false
    this.isSupportMouseMove = false
  }

  public isRunning(): boolean {
    return this._start
  }

  public get fps(): number {
    return this._fps
  }

  public start(): void {
    if (!this._start) {
      this._start = true
      this._lastTime = -1
      this._startTime = -1
      this._requestId = requestAnimationFrame((msec: number) => {
        this.step(msec)
      })
    }
  }

  // msec => millsecond => 毫秒
  protected step(timeStamp: number): void {
    if (!this._start) return
    // 没理解前面这两个判断
    if (this._startTime === -1) {
      this._startTime = timeStamp
    }
    if (this._lastTime === -1) {
      this._lastTime = timeStamp
    }

    // elapsed 消失，过去的
    let elapsedMsec = timeStamp - this._startTime
    let intervalSec = (timeStamp - this._lastTime)

    if (intervalSec !== 0) {
      this._fps = 1000.0 / intervalSec
    }
    intervalSec /= 1000.0
    this._lastTime = timeStamp
    this._handleTimers(intervalSec)
    this.update(elapsedMsec, intervalSec)
    this.render()

    requestAnimationFrame(this.step.bind(this))
  }

  public stop(): void {
    if (this._start) {
      window.cancelAnimationFrame(this._requestId)
      this._requestId = -1
      this._lastTime = -1
      this._startTime = -1
      this._start = false
    }
  }

  public update(elapsedMsec: number, intervalSec: number): void {

  }

  public render(): void {

  }

  public handleEvent(evt: Event | TouchEvent): void {
    switch (evt.type) {
      case "click":
        this.dispatchClick(this._toCanvasMouseEvent(evt, EInputEventType.CLICK))
        break
      case "touchstart":
        this.dispatchTouchStart(evt as TouchEvent)
        break
      case "touchmove":
        this.dispatchTouchStart(evt as TouchEvent)
        break
      case "touchend":
        this.dispatchTouchEnd(evt as TouchEvent)
        break
      case "mousedown":
        this._isMouseDown = true
        this.dispatchMouseDown(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDOWN))
        break
      case "mouseup":
        this._isMouseDown = false;
        this.dispatchMouseUp(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEUP));
        break;
      case "mousemove":
        if (this.isSupportMouseMove) {
          this.dispatchMouseMove(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEMOVE));
        }
        if (this._isMouseDown) {
          this.dispatchMouseDrag(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDRAG));
        }
        break;
      case "keypress":
        this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYPRESS));
        break;
      case "keydown":
        this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYDOWN));
        break;
      case "keyup":
        this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYUP));
        break;
    }
  }

  protected dispatchClick(evt: Event | CanvasMouseEvent): void {
    return
  }

  protected dispatchTouchStart(evt: TouchEvent): void {
    return
  }

  protected dispatchTouchMove(evt: TouchEvent): void {
    return
  }

  protected dispatchTouchEnd(evt: TouchEvent): void {
    return
  }

  protected dispatchMouseDown(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchMouseUp(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchMouseMove(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchMouseDrag(evt: CanvasMouseEvent): void {
    return;
  }

  protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
    return;
  }

  protected dispatchKeyUp(evt: CanvasKeyBoardEvent): void {
    return;
  }

  protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void {
    return;
  }

  private _viewportToCanvasCoordinate(evt: MouseEvent): vec2 {
    if (!this.canvas) {
      alert("evt.target is null!")
      throw new Error("evt.target is null!")
    }

    const rect: ClientRect = this.canvas.getBoundingClientRect()

    if (evt.target) {
      let borderLeftWidth: number = 0
      let borderTopWidth: number = 0
      let paddingLeft: number = 0
      let paddingTop: number = 0
      let decl: CSSStyleDeclaration = window.getComputedStyle(evt.target as HTMLElement)
      let strNumber: string | null = decl.borderLeftWidth

      if (strNumber !== null) {
        borderLeftWidth = parseInt(strNumber, 10)
        borderTopWidth = parseInt(strNumber, 10)
      }
      if (decl.paddingLeft !== null) {
        paddingLeft = parseInt(decl.paddingLeft, 10)
      }
      if (decl.paddingTop !== null) {
        paddingTop = parseInt(decl.paddingTop, 10)
      }

      let x: number = evt.clientX - rect.left - borderLeftWidth - paddingLeft
      let y: number = evt.clientY - rect.top - borderTopWidth - paddingTop
      let pos: vec2 = vec2.create(x, y)

      if (evt.type === "mousedown") {
        // console.log(" borderLeftWidth : " + borderLeftWidth + " borderTopWidth : " + borderTopWidth);
        // console.log(" paddingLeft : " + paddingLeft + " paddingTop : " + paddingTop);
        // console.log(" 变换后的canvasPosition : " + pos.toString());
      }
      return pos
    }

    return vec2.create()
  }

  private _toCanvasMouseEvent(evt: Event, type: EInputEventType): CanvasMouseEvent {
    let event: MouseEvent = evt as MouseEvent
    let mousePosition: vec2 = this._viewportToCanvasCoordinate(event)
    let canvasMouseEvent: CanvasMouseEvent = new CanvasMouseEvent(type, mousePosition, event.button, event.altKey, event.ctrlKey, event.shiftKey)
    return canvasMouseEvent
  }

  private _toCanvasKeyBoardEvent(evt: Event, type: EInputEventType): CanvasKeyBoardEvent {
    let event: KeyboardEvent = evt as KeyboardEvent;
    let canvasKeyboardEvent: CanvasKeyBoardEvent = new CanvasKeyBoardEvent(type, event.key, event.keyCode, event.repeat, event.altKey, event.ctrlKey, event.shiftKey);
    return canvasKeyboardEvent;
  }

  private _handleTimers(intervalSec: number): void {
    for (let i = 0; i < this.timers.length; i++) {
      let timer: Timer = this.timers[i]
      if (timer.enabled === false) {
        continue
      }
      timer.countdown -= intervalSec
      if (timer.countdown < 0.0) {
        timer.callback(timer.id, timer.callbackData)
        if (timer.onlyOnce === false) {
          timer.countdown = timer.timeout
        } else {
          this.removeTimer(timer.id)
        }
      }
    }
  }

  public addTimer(callback: TimerCallback, timeout: number = 1.0, onlyOnce: boolean = false, data: any = undefined): number {
    let timer: Timer
    for (let i = 0; i < this.timers.length; i++) {
      let timer: Timer = this.timers[i]
      if (timer.enabled === false) {
        timer.callback = callback
        timer.callbackData = data
        timer.timeout = timeout
        timer.countdown = timeout
        timer.enabled = true
        timer.onlyOnce = onlyOnce
        return timer.id
      }
    }

    timer = new Timer(callback)
    timer.callbackData = data
    timer.timeout = timeout
    timer.countdown = timeout
    timer.enabled = true
    timer.id = ++this._timerId
    timer.onlyOnce = onlyOnce

    this.timers.push(timer)
    return timer.id
  }

  public removeTimer(id: number): boolean {
    let found: boolean = false
    for (let i = 0; i < this.timers.length; i++) {
      if (this.timers[i].id === id) {
        let timer: Timer = this.timers[i]
        timer.enabled = false
        found = true
        break
      }
    }
    return found
  }
}


export class Canvas2DApplication extends Application {
  public context2D: CanvasRenderingContext2D | null;
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.context2D = this.canvas.getContext('2d')
  }
}

export class WebGLApplication extends Application {
  public context3D: WebGLRenderingContext | RenderingContext |null;
  public constructor(canvas: HTMLCanvasElement, contextAttributes?: WebGLContextAttributes) {
    super(canvas)
    this.context3D = this.canvas.getContext('webgl', contextAttributes)
    if (this.context3D === null) {
      this.context3D = this.canvas.getContext("experimental-webgl", contextAttributes);
      if (this.context3D === null) {
        alert(" 无法创建WebGLRenderingContext上下文对象 ");
        throw new Error(" 无法创建WebGLRenderingContext上下文对象 ");
      }
    }
  }
}
