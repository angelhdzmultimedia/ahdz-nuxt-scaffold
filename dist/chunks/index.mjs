import { rm, mkdir as mkdir$2, readFile, writeFile } from 'node:fs/promises';
import { statSync, promises, createReadStream, existsSync, readdirSync as readdirSync$1, createWriteStream } from 'node:fs';
import { c as commonjsGlobal } from '../shared/scaffold.2155838d.mjs';
import require$$0 from 'events';
import require$$0$1 from 'stream';
import require$$2 from 'string_decoder';
import require$$0$3 from 'assert';
import require$$1 from 'buffer';
import require$$0$2 from 'zlib';
import require$$0$4 from 'path';
import require$$0__default from 'fs';
import { y as yallist, r as resolve$1, d as dirname$3 } from './add.mjs';
import require$$9 from 'process';
import require$$0$5 from 'util';
import require$$0$6 from 'crypto';
import se, { PassThrough, pipeline } from 'node:stream';
import 'node:child_process';
import { homedir } from 'node:os';
import { promisify as promisify$1, deprecate, types as types$2 } from 'node:util';
import Rt from 'node:http';
import Ka from 'node:https';
import nt from 'node:zlib';
import { Buffer as Buffer$2 } from 'node:buffer';
import { format } from 'node:url';
import { isIP } from 'node:net';
import { basename } from 'node:path';

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!_isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (_isPlainObject(value) && _isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function _isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();

// turn tar(1) style args like `C` into the more verbose things like `cwd`

const argmap = new Map([
  ['C', 'cwd'],
  ['f', 'file'],
  ['z', 'gzip'],
  ['P', 'preservePaths'],
  ['U', 'unlink'],
  ['strip-components', 'strip'],
  ['stripComponents', 'strip'],
  ['keep-newer', 'newer'],
  ['keepNewer', 'newer'],
  ['keep-newer-files', 'newer'],
  ['keepNewerFiles', 'newer'],
  ['k', 'keep'],
  ['keep-existing', 'keep'],
  ['keepExisting', 'keep'],
  ['m', 'noMtime'],
  ['no-mtime', 'noMtime'],
  ['p', 'preserveOwner'],
  ['L', 'follow'],
  ['h', 'follow'],
]);

var highLevelOpt = opt => opt ? Object.keys(opt).map(k => [
  argmap.has(k) ? argmap.get(k) : k, opt[k],
]).reduce((set, kv) => (set[kv[0]] = kv[1], set), Object.create(null)) : {};

var minipass$1 = {};

const proc$1 =
  typeof process === 'object' && process
    ? process
    : {
        stdout: null,
        stderr: null,
      };
const EE$3 = require$$0;
const Stream$1 = require$$0$1;
const stringdecoder = require$$2;
const SD$1 = stringdecoder.StringDecoder;

const EOF$2 = Symbol('EOF');
const MAYBE_EMIT_END$1 = Symbol('maybeEmitEnd');
const EMITTED_END$1 = Symbol('emittedEnd');
const EMITTING_END$1 = Symbol('emittingEnd');
const EMITTED_ERROR$1 = Symbol('emittedError');
const CLOSED$1 = Symbol('closed');
const READ$2 = Symbol('read');
const FLUSH$1 = Symbol('flush');
const FLUSHCHUNK$1 = Symbol('flushChunk');
const ENCODING$1 = Symbol('encoding');
const DECODER$1 = Symbol('decoder');
const FLOWING$1 = Symbol('flowing');
const PAUSED$1 = Symbol('paused');
const RESUME$1 = Symbol('resume');
const BUFFER$1 = Symbol('buffer');
const PIPES = Symbol('pipes');
const BUFFERLENGTH$1 = Symbol('bufferLength');
const BUFFERPUSH$1 = Symbol('bufferPush');
const BUFFERSHIFT$1 = Symbol('bufferShift');
const OBJECTMODE$1 = Symbol('objectMode');
// internal event when stream is destroyed
const DESTROYED$1 = Symbol('destroyed');
// internal event when stream has an error
const ERROR = Symbol('error');
const EMITDATA$1 = Symbol('emitData');
const EMITEND$1 = Symbol('emitEnd');
const EMITEND2$1 = Symbol('emitEnd2');
const ASYNC$1 = Symbol('async');
const ABORT = Symbol('abort');
const ABORTED$1 = Symbol('aborted');
const SIGNAL = Symbol('signal');

const defer$1 = fn => Promise.resolve().then(fn);

// TODO remove when Node v8 support drops
const doIter$1 = commonjsGlobal._MP_NO_ITERATOR_SYMBOLS_ !== '1';
const ASYNCITERATOR$1 =
  (doIter$1 && Symbol.asyncIterator) || Symbol('asyncIterator not implemented');
const ITERATOR$1 =
  (doIter$1 && Symbol.iterator) || Symbol('iterator not implemented');

// events that mean 'the stream is over'
// these are treated specially, and re-emitted
// if they are listened for after emitting.
const isEndish$1 = ev => ev === 'end' || ev === 'finish' || ev === 'prefinish';

const isArrayBuffer$1 = b =>
  b instanceof ArrayBuffer ||
  (typeof b === 'object' &&
    b.constructor &&
    b.constructor.name === 'ArrayBuffer' &&
    b.byteLength >= 0);

const isArrayBufferView$1 = b => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);

let Pipe$1 = class Pipe {
  constructor(src, dest, opts) {
    this.src = src;
    this.dest = dest;
    this.opts = opts;
    this.ondrain = () => src[RESUME$1]();
    dest.on('drain', this.ondrain);
  }
  unpipe() {
    this.dest.removeListener('drain', this.ondrain);
  }
  // istanbul ignore next - only here for the prototype
  proxyErrors() {}
  end() {
    this.unpipe();
    if (this.opts.end) this.dest.end();
  }
};

let PipeProxyErrors$1 = class PipeProxyErrors extends Pipe$1 {
  unpipe() {
    this.src.removeListener('error', this.proxyErrors);
    super.unpipe();
  }
  constructor(src, dest, opts) {
    super(src, dest, opts);
    this.proxyErrors = er => dest.emit('error', er);
    src.on('error', this.proxyErrors);
  }
};

let Minipass$4 = class Minipass extends Stream$1 {
  constructor(options) {
    super();
    this[FLOWING$1] = false;
    // whether we're explicitly paused
    this[PAUSED$1] = false;
    this[PIPES] = [];
    this[BUFFER$1] = [];
    this[OBJECTMODE$1] = (options && options.objectMode) || false;
    if (this[OBJECTMODE$1]) this[ENCODING$1] = null;
    else this[ENCODING$1] = (options && options.encoding) || null;
    if (this[ENCODING$1] === 'buffer') this[ENCODING$1] = null;
    this[ASYNC$1] = (options && !!options.async) || false;
    this[DECODER$1] = this[ENCODING$1] ? new SD$1(this[ENCODING$1]) : null;
    this[EOF$2] = false;
    this[EMITTED_END$1] = false;
    this[EMITTING_END$1] = false;
    this[CLOSED$1] = false;
    this[EMITTED_ERROR$1] = null;
    this.writable = true;
    this.readable = true;
    this[BUFFERLENGTH$1] = 0;
    this[DESTROYED$1] = false;
    if (options && options.debugExposeBuffer === true) {
      Object.defineProperty(this, 'buffer', { get: () => this[BUFFER$1] });
    }
    if (options && options.debugExposePipes === true) {
      Object.defineProperty(this, 'pipes', { get: () => this[PIPES] });
    }
    this[SIGNAL] = options && options.signal;
    this[ABORTED$1] = false;
    if (this[SIGNAL]) {
      this[SIGNAL].addEventListener('abort', () => this[ABORT]());
      if (this[SIGNAL].aborted) {
        this[ABORT]();
      }
    }
  }

  get bufferLength() {
    return this[BUFFERLENGTH$1]
  }

  get encoding() {
    return this[ENCODING$1]
  }
  set encoding(enc) {
    if (this[OBJECTMODE$1]) throw new Error('cannot set encoding in objectMode')

    if (
      this[ENCODING$1] &&
      enc !== this[ENCODING$1] &&
      ((this[DECODER$1] && this[DECODER$1].lastNeed) || this[BUFFERLENGTH$1])
    )
      throw new Error('cannot change encoding')

    if (this[ENCODING$1] !== enc) {
      this[DECODER$1] = enc ? new SD$1(enc) : null;
      if (this[BUFFER$1].length)
        this[BUFFER$1] = this[BUFFER$1].map(chunk => this[DECODER$1].write(chunk));
    }

    this[ENCODING$1] = enc;
  }

  setEncoding(enc) {
    this.encoding = enc;
  }

  get objectMode() {
    return this[OBJECTMODE$1]
  }
  set objectMode(om) {
    this[OBJECTMODE$1] = this[OBJECTMODE$1] || !!om;
  }

  get ['async']() {
    return this[ASYNC$1]
  }
  set ['async'](a) {
    this[ASYNC$1] = this[ASYNC$1] || !!a;
  }

  // drop everything and get out of the flow completely
  [ABORT]() {
    this[ABORTED$1] = true;
    this.emit('abort', this[SIGNAL].reason);
    this.destroy(this[SIGNAL].reason);
  }

  get aborted() {
    return this[ABORTED$1]
  }
  set aborted(_) {}

  write(chunk, encoding, cb) {
    if (this[ABORTED$1]) return false
    if (this[EOF$2]) throw new Error('write after end')

    if (this[DESTROYED$1]) {
      this.emit(
        'error',
        Object.assign(
          new Error('Cannot call write after a stream was destroyed'),
          { code: 'ERR_STREAM_DESTROYED' }
        )
      );
      return true
    }

    if (typeof encoding === 'function') (cb = encoding), (encoding = 'utf8');

    if (!encoding) encoding = 'utf8';

    const fn = this[ASYNC$1] ? defer$1 : f => f();

    // convert array buffers and typed array views into buffers
    // at some point in the future, we may want to do the opposite!
    // leave strings and buffers as-is
    // anything else switches us into object mode
    if (!this[OBJECTMODE$1] && !Buffer.isBuffer(chunk)) {
      if (isArrayBufferView$1(chunk))
        chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
      else if (isArrayBuffer$1(chunk)) chunk = Buffer.from(chunk);
      else if (typeof chunk !== 'string')
        // use the setter so we throw if we have encoding set
        this.objectMode = true;
    }

    // handle object mode up front, since it's simpler
    // this yields better performance, fewer checks later.
    if (this[OBJECTMODE$1]) {
      /* istanbul ignore if - maybe impossible? */
      if (this.flowing && this[BUFFERLENGTH$1] !== 0) this[FLUSH$1](true);

      if (this.flowing) this.emit('data', chunk);
      else this[BUFFERPUSH$1](chunk);

      if (this[BUFFERLENGTH$1] !== 0) this.emit('readable');

      if (cb) fn(cb);

      return this.flowing
    }

    // at this point the chunk is a buffer or string
    // don't buffer it up or send it to the decoder
    if (!chunk.length) {
      if (this[BUFFERLENGTH$1] !== 0) this.emit('readable');
      if (cb) fn(cb);
      return this.flowing
    }

    // fast-path writing strings of same encoding to a stream with
    // an empty buffer, skipping the buffer/decoder dance
    if (
      typeof chunk === 'string' &&
      // unless it is a string already ready for us to use
      !(encoding === this[ENCODING$1] && !this[DECODER$1].lastNeed)
    ) {
      chunk = Buffer.from(chunk, encoding);
    }

    if (Buffer.isBuffer(chunk) && this[ENCODING$1])
      chunk = this[DECODER$1].write(chunk);

    // Note: flushing CAN potentially switch us into not-flowing mode
    if (this.flowing && this[BUFFERLENGTH$1] !== 0) this[FLUSH$1](true);

    if (this.flowing) this.emit('data', chunk);
    else this[BUFFERPUSH$1](chunk);

    if (this[BUFFERLENGTH$1] !== 0) this.emit('readable');

    if (cb) fn(cb);

    return this.flowing
  }

  read(n) {
    if (this[DESTROYED$1]) return null

    if (this[BUFFERLENGTH$1] === 0 || n === 0 || n > this[BUFFERLENGTH$1]) {
      this[MAYBE_EMIT_END$1]();
      return null
    }

    if (this[OBJECTMODE$1]) n = null;

    if (this[BUFFER$1].length > 1 && !this[OBJECTMODE$1]) {
      if (this.encoding) this[BUFFER$1] = [this[BUFFER$1].join('')];
      else this[BUFFER$1] = [Buffer.concat(this[BUFFER$1], this[BUFFERLENGTH$1])];
    }

    const ret = this[READ$2](n || null, this[BUFFER$1][0]);
    this[MAYBE_EMIT_END$1]();
    return ret
  }

  [READ$2](n, chunk) {
    if (n === chunk.length || n === null) this[BUFFERSHIFT$1]();
    else {
      this[BUFFER$1][0] = chunk.slice(n);
      chunk = chunk.slice(0, n);
      this[BUFFERLENGTH$1] -= n;
    }

    this.emit('data', chunk);

    if (!this[BUFFER$1].length && !this[EOF$2]) this.emit('drain');

    return chunk
  }

  end(chunk, encoding, cb) {
    if (typeof chunk === 'function') (cb = chunk), (chunk = null);
    if (typeof encoding === 'function') (cb = encoding), (encoding = 'utf8');
    if (chunk) this.write(chunk, encoding);
    if (cb) this.once('end', cb);
    this[EOF$2] = true;
    this.writable = false;

    // if we haven't written anything, then go ahead and emit,
    // even if we're not reading.
    // we'll re-emit if a new 'end' listener is added anyway.
    // This makes MP more suitable to write-only use cases.
    if (this.flowing || !this[PAUSED$1]) this[MAYBE_EMIT_END$1]();
    return this
  }

  // don't let the internal resume be overwritten
  [RESUME$1]() {
    if (this[DESTROYED$1]) return

    this[PAUSED$1] = false;
    this[FLOWING$1] = true;
    this.emit('resume');
    if (this[BUFFER$1].length) this[FLUSH$1]();
    else if (this[EOF$2]) this[MAYBE_EMIT_END$1]();
    else this.emit('drain');
  }

  resume() {
    return this[RESUME$1]()
  }

  pause() {
    this[FLOWING$1] = false;
    this[PAUSED$1] = true;
  }

  get destroyed() {
    return this[DESTROYED$1]
  }

  get flowing() {
    return this[FLOWING$1]
  }

  get paused() {
    return this[PAUSED$1]
  }

  [BUFFERPUSH$1](chunk) {
    if (this[OBJECTMODE$1]) this[BUFFERLENGTH$1] += 1;
    else this[BUFFERLENGTH$1] += chunk.length;
    this[BUFFER$1].push(chunk);
  }

  [BUFFERSHIFT$1]() {
    if (this[OBJECTMODE$1]) this[BUFFERLENGTH$1] -= 1;
    else this[BUFFERLENGTH$1] -= this[BUFFER$1][0].length;
    return this[BUFFER$1].shift()
  }

  [FLUSH$1](noDrain) {
    do {} while (this[FLUSHCHUNK$1](this[BUFFERSHIFT$1]()) && this[BUFFER$1].length)

    if (!noDrain && !this[BUFFER$1].length && !this[EOF$2]) this.emit('drain');
  }

  [FLUSHCHUNK$1](chunk) {
    this.emit('data', chunk);
    return this.flowing
  }

  pipe(dest, opts) {
    if (this[DESTROYED$1]) return

    const ended = this[EMITTED_END$1];
    opts = opts || {};
    if (dest === proc$1.stdout || dest === proc$1.stderr) opts.end = false;
    else opts.end = opts.end !== false;
    opts.proxyErrors = !!opts.proxyErrors;

    // piping an ended stream ends immediately
    if (ended) {
      if (opts.end) dest.end();
    } else {
      this[PIPES].push(
        !opts.proxyErrors
          ? new Pipe$1(this, dest, opts)
          : new PipeProxyErrors$1(this, dest, opts)
      );
      if (this[ASYNC$1]) defer$1(() => this[RESUME$1]());
      else this[RESUME$1]();
    }

    return dest
  }

  unpipe(dest) {
    const p = this[PIPES].find(p => p.dest === dest);
    if (p) {
      this[PIPES].splice(this[PIPES].indexOf(p), 1);
      p.unpipe();
    }
  }

  addListener(ev, fn) {
    return this.on(ev, fn)
  }

  on(ev, fn) {
    const ret = super.on(ev, fn);
    if (ev === 'data' && !this[PIPES].length && !this.flowing) this[RESUME$1]();
    else if (ev === 'readable' && this[BUFFERLENGTH$1] !== 0)
      super.emit('readable');
    else if (isEndish$1(ev) && this[EMITTED_END$1]) {
      super.emit(ev);
      this.removeAllListeners(ev);
    } else if (ev === 'error' && this[EMITTED_ERROR$1]) {
      if (this[ASYNC$1]) defer$1(() => fn.call(this, this[EMITTED_ERROR$1]));
      else fn.call(this, this[EMITTED_ERROR$1]);
    }
    return ret
  }

  get emittedEnd() {
    return this[EMITTED_END$1]
  }

  [MAYBE_EMIT_END$1]() {
    if (
      !this[EMITTING_END$1] &&
      !this[EMITTED_END$1] &&
      !this[DESTROYED$1] &&
      this[BUFFER$1].length === 0 &&
      this[EOF$2]
    ) {
      this[EMITTING_END$1] = true;
      this.emit('end');
      this.emit('prefinish');
      this.emit('finish');
      if (this[CLOSED$1]) this.emit('close');
      this[EMITTING_END$1] = false;
    }
  }

  emit(ev, data, ...extra) {
    // error and close are only events allowed after calling destroy()
    if (ev !== 'error' && ev !== 'close' && ev !== DESTROYED$1 && this[DESTROYED$1])
      return
    else if (ev === 'data') {
      return !this[OBJECTMODE$1] && !data
        ? false
        : this[ASYNC$1]
        ? defer$1(() => this[EMITDATA$1](data))
        : this[EMITDATA$1](data)
    } else if (ev === 'end') {
      return this[EMITEND$1]()
    } else if (ev === 'close') {
      this[CLOSED$1] = true;
      // don't emit close before 'end' and 'finish'
      if (!this[EMITTED_END$1] && !this[DESTROYED$1]) return
      const ret = super.emit('close');
      this.removeAllListeners('close');
      return ret
    } else if (ev === 'error') {
      this[EMITTED_ERROR$1] = data;
      super.emit(ERROR, data);
      const ret =
        !this[SIGNAL] || this.listeners('error').length
          ? super.emit('error', data)
          : false;
      this[MAYBE_EMIT_END$1]();
      return ret
    } else if (ev === 'resume') {
      const ret = super.emit('resume');
      this[MAYBE_EMIT_END$1]();
      return ret
    } else if (ev === 'finish' || ev === 'prefinish') {
      const ret = super.emit(ev);
      this.removeAllListeners(ev);
      return ret
    }

    // Some other unknown event
    const ret = super.emit(ev, data, ...extra);
    this[MAYBE_EMIT_END$1]();
    return ret
  }

  [EMITDATA$1](data) {
    for (const p of this[PIPES]) {
      if (p.dest.write(data) === false) this.pause();
    }
    const ret = super.emit('data', data);
    this[MAYBE_EMIT_END$1]();
    return ret
  }

  [EMITEND$1]() {
    if (this[EMITTED_END$1]) return

    this[EMITTED_END$1] = true;
    this.readable = false;
    if (this[ASYNC$1]) defer$1(() => this[EMITEND2$1]());
    else this[EMITEND2$1]();
  }

  [EMITEND2$1]() {
    if (this[DECODER$1]) {
      const data = this[DECODER$1].end();
      if (data) {
        for (const p of this[PIPES]) {
          p.dest.write(data);
        }
        super.emit('data', data);
      }
    }

    for (const p of this[PIPES]) {
      p.end();
    }
    const ret = super.emit('end');
    this.removeAllListeners('end');
    return ret
  }

  // const all = await stream.collect()
  collect() {
    const buf = [];
    if (!this[OBJECTMODE$1]) buf.dataLength = 0;
    // set the promise first, in case an error is raised
    // by triggering the flow here.
    const p = this.promise();
    this.on('data', c => {
      buf.push(c);
      if (!this[OBJECTMODE$1]) buf.dataLength += c.length;
    });
    return p.then(() => buf)
  }

  // const data = await stream.concat()
  concat() {
    return this[OBJECTMODE$1]
      ? Promise.reject(new Error('cannot concat in objectMode'))
      : this.collect().then(buf =>
          this[OBJECTMODE$1]
            ? Promise.reject(new Error('cannot concat in objectMode'))
            : this[ENCODING$1]
            ? buf.join('')
            : Buffer.concat(buf, buf.dataLength)
        )
  }

  // stream.promise().then(() => done, er => emitted error)
  promise() {
    return new Promise((resolve, reject) => {
      this.on(DESTROYED$1, () => reject(new Error('stream destroyed')));
      this.on('error', er => reject(er));
      this.on('end', () => resolve());
    })
  }

  // for await (let chunk of stream)
  [ASYNCITERATOR$1]() {
    let stopped = false;
    const stop = () => {
      this.pause();
      stopped = true;
      return Promise.resolve({ done: true })
    };
    const next = () => {
      if (stopped) return stop()
      const res = this.read();
      if (res !== null) return Promise.resolve({ done: false, value: res })

      if (this[EOF$2]) return stop()

      let resolve = null;
      let reject = null;
      const onerr = er => {
        this.removeListener('data', ondata);
        this.removeListener('end', onend);
        this.removeListener(DESTROYED$1, ondestroy);
        stop();
        reject(er);
      };
      const ondata = value => {
        this.removeListener('error', onerr);
        this.removeListener('end', onend);
        this.removeListener(DESTROYED$1, ondestroy);
        this.pause();
        resolve({ value: value, done: !!this[EOF$2] });
      };
      const onend = () => {
        this.removeListener('error', onerr);
        this.removeListener('data', ondata);
        this.removeListener(DESTROYED$1, ondestroy);
        stop();
        resolve({ done: true });
      };
      const ondestroy = () => onerr(new Error('stream destroyed'));
      return new Promise((res, rej) => {
        reject = rej;
        resolve = res;
        this.once(DESTROYED$1, ondestroy);
        this.once('error', onerr);
        this.once('end', onend);
        this.once('data', ondata);
      })
    };

    return {
      next,
      throw: stop,
      return: stop,
      [ASYNCITERATOR$1]() {
        return this
      },
    }
  }

  // for (let chunk of stream)
  [ITERATOR$1]() {
    let stopped = false;
    const stop = () => {
      this.pause();
      this.removeListener(ERROR, stop);
      this.removeListener(DESTROYED$1, stop);
      this.removeListener('end', stop);
      stopped = true;
      return { done: true }
    };

    const next = () => {
      if (stopped) return stop()
      const value = this.read();
      return value === null ? stop() : { value }
    };
    this.once('end', stop);
    this.once(ERROR, stop);
    this.once(DESTROYED$1, stop);

    return {
      next,
      throw: stop,
      return: stop,
      [ITERATOR$1]() {
        return this
      },
    }
  }

  destroy(er) {
    if (this[DESTROYED$1]) {
      if (er) this.emit('error', er);
      else this.emit(DESTROYED$1);
      return this
    }

    this[DESTROYED$1] = true;

    // throw away all buffered data, it's never coming out
    this[BUFFER$1].length = 0;
    this[BUFFERLENGTH$1] = 0;

    if (typeof this.close === 'function' && !this[CLOSED$1]) this.close();

    if (er) this.emit('error', er);
    // if no error to emit, still reject pending promises
    else this.emit(DESTROYED$1);

    return this
  }

  static isStream(s) {
    return (
      !!s &&
      (s instanceof Minipass ||
        s instanceof Stream$1 ||
        (s instanceof EE$3 &&
          // readable
          (typeof s.pipe === 'function' ||
            // writable
            (typeof s.write === 'function' && typeof s.end === 'function'))))
    )
  }
};

minipass$1.Minipass = Minipass$4;

var minizlib = {};

// Update with any zlib constants that are added or changed in the future.
// Node v6 didn't export this, so we just hard code the version and rely
// on all the other hard-coded values from zlib v4736.  When node v6
// support drops, we can just export the realZlibConstants object.
const realZlibConstants = require$$0$2.constants ||
  /* istanbul ignore next */ { ZLIB_VERNUM: 4736 };

var constants$1 = Object.freeze(Object.assign(Object.create(null), {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_VERSION_ERROR: -6,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  DEFLATE: 1,
  INFLATE: 2,
  GZIP: 3,
  GUNZIP: 4,
  DEFLATERAW: 5,
  INFLATERAW: 6,
  UNZIP: 7,
  BROTLI_DECODE: 8,
  BROTLI_ENCODE: 9,
  Z_MIN_WINDOWBITS: 8,
  Z_MAX_WINDOWBITS: 15,
  Z_DEFAULT_WINDOWBITS: 15,
  Z_MIN_CHUNK: 64,
  Z_MAX_CHUNK: Infinity,
  Z_DEFAULT_CHUNK: 16384,
  Z_MIN_MEMLEVEL: 1,
  Z_MAX_MEMLEVEL: 9,
  Z_DEFAULT_MEMLEVEL: 8,
  Z_MIN_LEVEL: -1,
  Z_MAX_LEVEL: 9,
  Z_DEFAULT_LEVEL: -1,
  BROTLI_OPERATION_PROCESS: 0,
  BROTLI_OPERATION_FLUSH: 1,
  BROTLI_OPERATION_FINISH: 2,
  BROTLI_OPERATION_EMIT_METADATA: 3,
  BROTLI_MODE_GENERIC: 0,
  BROTLI_MODE_TEXT: 1,
  BROTLI_MODE_FONT: 2,
  BROTLI_DEFAULT_MODE: 0,
  BROTLI_MIN_QUALITY: 0,
  BROTLI_MAX_QUALITY: 11,
  BROTLI_DEFAULT_QUALITY: 11,
  BROTLI_MIN_WINDOW_BITS: 10,
  BROTLI_MAX_WINDOW_BITS: 24,
  BROTLI_LARGE_MAX_WINDOW_BITS: 30,
  BROTLI_DEFAULT_WINDOW: 22,
  BROTLI_MIN_INPUT_BLOCK_BITS: 16,
  BROTLI_MAX_INPUT_BLOCK_BITS: 24,
  BROTLI_PARAM_MODE: 0,
  BROTLI_PARAM_QUALITY: 1,
  BROTLI_PARAM_LGWIN: 2,
  BROTLI_PARAM_LGBLOCK: 3,
  BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
  BROTLI_PARAM_SIZE_HINT: 5,
  BROTLI_PARAM_LARGE_WINDOW: 6,
  BROTLI_PARAM_NPOSTFIX: 7,
  BROTLI_PARAM_NDIRECT: 8,
  BROTLI_DECODER_RESULT_ERROR: 0,
  BROTLI_DECODER_RESULT_SUCCESS: 1,
  BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
  BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
  BROTLI_DECODER_NO_ERROR: 0,
  BROTLI_DECODER_SUCCESS: 1,
  BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
  BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
  BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
  BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
  BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
  BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
  BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
  BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
  BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
  BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
  BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
  BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
  BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
  BROTLI_DECODER_ERROR_UNREACHABLE: -31,
}, realZlibConstants));

const proc = typeof process === 'object' && process ? process : {
  stdout: null,
  stderr: null,
};
const EE$2 = require$$0;
const Stream = require$$0$1;
const SD = require$$2.StringDecoder;

const EOF$1 = Symbol('EOF');
const MAYBE_EMIT_END = Symbol('maybeEmitEnd');
const EMITTED_END = Symbol('emittedEnd');
const EMITTING_END = Symbol('emittingEnd');
const EMITTED_ERROR = Symbol('emittedError');
const CLOSED = Symbol('closed');
const READ$1 = Symbol('read');
const FLUSH = Symbol('flush');
const FLUSHCHUNK = Symbol('flushChunk');
const ENCODING = Symbol('encoding');
const DECODER = Symbol('decoder');
const FLOWING = Symbol('flowing');
const PAUSED = Symbol('paused');
const RESUME = Symbol('resume');
const BUFFERLENGTH = Symbol('bufferLength');
const BUFFERPUSH = Symbol('bufferPush');
const BUFFERSHIFT = Symbol('bufferShift');
const OBJECTMODE = Symbol('objectMode');
const DESTROYED = Symbol('destroyed');
const EMITDATA = Symbol('emitData');
const EMITEND = Symbol('emitEnd');
const EMITEND2 = Symbol('emitEnd2');
const ASYNC = Symbol('async');

const defer = fn => Promise.resolve().then(fn);

// TODO remove when Node v8 support drops
const doIter = commonjsGlobal._MP_NO_ITERATOR_SYMBOLS_  !== '1';
const ASYNCITERATOR = doIter && Symbol.asyncIterator
  || Symbol('asyncIterator not implemented');
const ITERATOR = doIter && Symbol.iterator
  || Symbol('iterator not implemented');

// events that mean 'the stream is over'
// these are treated specially, and re-emitted
// if they are listened for after emitting.
const isEndish = ev =>
  ev === 'end' ||
  ev === 'finish' ||
  ev === 'prefinish';

const isArrayBuffer = b => b instanceof ArrayBuffer ||
  typeof b === 'object' &&
  b.constructor &&
  b.constructor.name === 'ArrayBuffer' &&
  b.byteLength >= 0;

const isArrayBufferView = b => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);

class Pipe {
  constructor (src, dest, opts) {
    this.src = src;
    this.dest = dest;
    this.opts = opts;
    this.ondrain = () => src[RESUME]();
    dest.on('drain', this.ondrain);
  }
  unpipe () {
    this.dest.removeListener('drain', this.ondrain);
  }
  // istanbul ignore next - only here for the prototype
  proxyErrors () {}
  end () {
    this.unpipe();
    if (this.opts.end)
      this.dest.end();
  }
}

class PipeProxyErrors extends Pipe {
  unpipe () {
    this.src.removeListener('error', this.proxyErrors);
    super.unpipe();
  }
  constructor (src, dest, opts) {
    super(src, dest, opts);
    this.proxyErrors = er => dest.emit('error', er);
    src.on('error', this.proxyErrors);
  }
}

var minipass = class Minipass extends Stream {
  constructor (options) {
    super();
    this[FLOWING] = false;
    // whether we're explicitly paused
    this[PAUSED] = false;
    this.pipes = [];
    this.buffer = [];
    this[OBJECTMODE] = options && options.objectMode || false;
    if (this[OBJECTMODE])
      this[ENCODING] = null;
    else
      this[ENCODING] = options && options.encoding || null;
    if (this[ENCODING] === 'buffer')
      this[ENCODING] = null;
    this[ASYNC] = options && !!options.async || false;
    this[DECODER] = this[ENCODING] ? new SD(this[ENCODING]) : null;
    this[EOF$1] = false;
    this[EMITTED_END] = false;
    this[EMITTING_END] = false;
    this[CLOSED] = false;
    this[EMITTED_ERROR] = null;
    this.writable = true;
    this.readable = true;
    this[BUFFERLENGTH] = 0;
    this[DESTROYED] = false;
  }

  get bufferLength () { return this[BUFFERLENGTH] }

  get encoding () { return this[ENCODING] }
  set encoding (enc) {
    if (this[OBJECTMODE])
      throw new Error('cannot set encoding in objectMode')

    if (this[ENCODING] && enc !== this[ENCODING] &&
        (this[DECODER] && this[DECODER].lastNeed || this[BUFFERLENGTH]))
      throw new Error('cannot change encoding')

    if (this[ENCODING] !== enc) {
      this[DECODER] = enc ? new SD(enc) : null;
      if (this.buffer.length)
        this.buffer = this.buffer.map(chunk => this[DECODER].write(chunk));
    }

    this[ENCODING] = enc;
  }

  setEncoding (enc) {
    this.encoding = enc;
  }

  get objectMode () { return this[OBJECTMODE] }
  set objectMode (om) { this[OBJECTMODE] = this[OBJECTMODE] || !!om; }

  get ['async'] () { return this[ASYNC] }
  set ['async'] (a) { this[ASYNC] = this[ASYNC] || !!a; }

  write (chunk, encoding, cb) {
    if (this[EOF$1])
      throw new Error('write after end')

    if (this[DESTROYED]) {
      this.emit('error', Object.assign(
        new Error('Cannot call write after a stream was destroyed'),
        { code: 'ERR_STREAM_DESTROYED' }
      ));
      return true
    }

    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8';

    if (!encoding)
      encoding = 'utf8';

    const fn = this[ASYNC] ? defer : f => f();

    // convert array buffers and typed array views into buffers
    // at some point in the future, we may want to do the opposite!
    // leave strings and buffers as-is
    // anything else switches us into object mode
    if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
      if (isArrayBufferView(chunk))
        chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
      else if (isArrayBuffer(chunk))
        chunk = Buffer.from(chunk);
      else if (typeof chunk !== 'string')
        // use the setter so we throw if we have encoding set
        this.objectMode = true;
    }

    // handle object mode up front, since it's simpler
    // this yields better performance, fewer checks later.
    if (this[OBJECTMODE]) {
      /* istanbul ignore if - maybe impossible? */
      if (this.flowing && this[BUFFERLENGTH] !== 0)
        this[FLUSH](true);

      if (this.flowing)
        this.emit('data', chunk);
      else
        this[BUFFERPUSH](chunk);

      if (this[BUFFERLENGTH] !== 0)
        this.emit('readable');

      if (cb)
        fn(cb);

      return this.flowing
    }

    // at this point the chunk is a buffer or string
    // don't buffer it up or send it to the decoder
    if (!chunk.length) {
      if (this[BUFFERLENGTH] !== 0)
        this.emit('readable');
      if (cb)
        fn(cb);
      return this.flowing
    }

    // fast-path writing strings of same encoding to a stream with
    // an empty buffer, skipping the buffer/decoder dance
    if (typeof chunk === 'string' &&
        // unless it is a string already ready for us to use
        !(encoding === this[ENCODING] && !this[DECODER].lastNeed)) {
      chunk = Buffer.from(chunk, encoding);
    }

    if (Buffer.isBuffer(chunk) && this[ENCODING])
      chunk = this[DECODER].write(chunk);

    // Note: flushing CAN potentially switch us into not-flowing mode
    if (this.flowing && this[BUFFERLENGTH] !== 0)
      this[FLUSH](true);

    if (this.flowing)
      this.emit('data', chunk);
    else
      this[BUFFERPUSH](chunk);

    if (this[BUFFERLENGTH] !== 0)
      this.emit('readable');

    if (cb)
      fn(cb);

    return this.flowing
  }

  read (n) {
    if (this[DESTROYED])
      return null

    if (this[BUFFERLENGTH] === 0 || n === 0 || n > this[BUFFERLENGTH]) {
      this[MAYBE_EMIT_END]();
      return null
    }

    if (this[OBJECTMODE])
      n = null;

    if (this.buffer.length > 1 && !this[OBJECTMODE]) {
      if (this.encoding)
        this.buffer = [this.buffer.join('')];
      else
        this.buffer = [Buffer.concat(this.buffer, this[BUFFERLENGTH])];
    }

    const ret = this[READ$1](n || null, this.buffer[0]);
    this[MAYBE_EMIT_END]();
    return ret
  }

  [READ$1] (n, chunk) {
    if (n === chunk.length || n === null)
      this[BUFFERSHIFT]();
    else {
      this.buffer[0] = chunk.slice(n);
      chunk = chunk.slice(0, n);
      this[BUFFERLENGTH] -= n;
    }

    this.emit('data', chunk);

    if (!this.buffer.length && !this[EOF$1])
      this.emit('drain');

    return chunk
  }

  end (chunk, encoding, cb) {
    if (typeof chunk === 'function')
      cb = chunk, chunk = null;
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8';
    if (chunk)
      this.write(chunk, encoding);
    if (cb)
      this.once('end', cb);
    this[EOF$1] = true;
    this.writable = false;

    // if we haven't written anything, then go ahead and emit,
    // even if we're not reading.
    // we'll re-emit if a new 'end' listener is added anyway.
    // This makes MP more suitable to write-only use cases.
    if (this.flowing || !this[PAUSED])
      this[MAYBE_EMIT_END]();
    return this
  }

  // don't let the internal resume be overwritten
  [RESUME] () {
    if (this[DESTROYED])
      return

    this[PAUSED] = false;
    this[FLOWING] = true;
    this.emit('resume');
    if (this.buffer.length)
      this[FLUSH]();
    else if (this[EOF$1])
      this[MAYBE_EMIT_END]();
    else
      this.emit('drain');
  }

  resume () {
    return this[RESUME]()
  }

  pause () {
    this[FLOWING] = false;
    this[PAUSED] = true;
  }

  get destroyed () {
    return this[DESTROYED]
  }

  get flowing () {
    return this[FLOWING]
  }

  get paused () {
    return this[PAUSED]
  }

  [BUFFERPUSH] (chunk) {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] += 1;
    else
      this[BUFFERLENGTH] += chunk.length;
    this.buffer.push(chunk);
  }

  [BUFFERSHIFT] () {
    if (this.buffer.length) {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] -= 1;
      else
        this[BUFFERLENGTH] -= this.buffer[0].length;
    }
    return this.buffer.shift()
  }

  [FLUSH] (noDrain) {
    do {} while (this[FLUSHCHUNK](this[BUFFERSHIFT]()))

    if (!noDrain && !this.buffer.length && !this[EOF$1])
      this.emit('drain');
  }

  [FLUSHCHUNK] (chunk) {
    return chunk ? (this.emit('data', chunk), this.flowing) : false
  }

  pipe (dest, opts) {
    if (this[DESTROYED])
      return

    const ended = this[EMITTED_END];
    opts = opts || {};
    if (dest === proc.stdout || dest === proc.stderr)
      opts.end = false;
    else
      opts.end = opts.end !== false;
    opts.proxyErrors = !!opts.proxyErrors;

    // piping an ended stream ends immediately
    if (ended) {
      if (opts.end)
        dest.end();
    } else {
      this.pipes.push(!opts.proxyErrors ? new Pipe(this, dest, opts)
        : new PipeProxyErrors(this, dest, opts));
      if (this[ASYNC])
        defer(() => this[RESUME]());
      else
        this[RESUME]();
    }

    return dest
  }

  unpipe (dest) {
    const p = this.pipes.find(p => p.dest === dest);
    if (p) {
      this.pipes.splice(this.pipes.indexOf(p), 1);
      p.unpipe();
    }
  }

  addListener (ev, fn) {
    return this.on(ev, fn)
  }

  on (ev, fn) {
    const ret = super.on(ev, fn);
    if (ev === 'data' && !this.pipes.length && !this.flowing)
      this[RESUME]();
    else if (ev === 'readable' && this[BUFFERLENGTH] !== 0)
      super.emit('readable');
    else if (isEndish(ev) && this[EMITTED_END]) {
      super.emit(ev);
      this.removeAllListeners(ev);
    } else if (ev === 'error' && this[EMITTED_ERROR]) {
      if (this[ASYNC])
        defer(() => fn.call(this, this[EMITTED_ERROR]));
      else
        fn.call(this, this[EMITTED_ERROR]);
    }
    return ret
  }

  get emittedEnd () {
    return this[EMITTED_END]
  }

  [MAYBE_EMIT_END] () {
    if (!this[EMITTING_END] &&
        !this[EMITTED_END] &&
        !this[DESTROYED] &&
        this.buffer.length === 0 &&
        this[EOF$1]) {
      this[EMITTING_END] = true;
      this.emit('end');
      this.emit('prefinish');
      this.emit('finish');
      if (this[CLOSED])
        this.emit('close');
      this[EMITTING_END] = false;
    }
  }

  emit (ev, data, ...extra) {
    // error and close are only events allowed after calling destroy()
    if (ev !== 'error' && ev !== 'close' && ev !== DESTROYED && this[DESTROYED])
      return
    else if (ev === 'data') {
      return !data ? false
        : this[ASYNC] ? defer(() => this[EMITDATA](data))
        : this[EMITDATA](data)
    } else if (ev === 'end') {
      return this[EMITEND]()
    } else if (ev === 'close') {
      this[CLOSED] = true;
      // don't emit close before 'end' and 'finish'
      if (!this[EMITTED_END] && !this[DESTROYED])
        return
      const ret = super.emit('close');
      this.removeAllListeners('close');
      return ret
    } else if (ev === 'error') {
      this[EMITTED_ERROR] = data;
      const ret = super.emit('error', data);
      this[MAYBE_EMIT_END]();
      return ret
    } else if (ev === 'resume') {
      const ret = super.emit('resume');
      this[MAYBE_EMIT_END]();
      return ret
    } else if (ev === 'finish' || ev === 'prefinish') {
      const ret = super.emit(ev);
      this.removeAllListeners(ev);
      return ret
    }

    // Some other unknown event
    const ret = super.emit(ev, data, ...extra);
    this[MAYBE_EMIT_END]();
    return ret
  }

  [EMITDATA] (data) {
    for (const p of this.pipes) {
      if (p.dest.write(data) === false)
        this.pause();
    }
    const ret = super.emit('data', data);
    this[MAYBE_EMIT_END]();
    return ret
  }

  [EMITEND] () {
    if (this[EMITTED_END])
      return

    this[EMITTED_END] = true;
    this.readable = false;
    if (this[ASYNC])
      defer(() => this[EMITEND2]());
    else
      this[EMITEND2]();
  }

  [EMITEND2] () {
    if (this[DECODER]) {
      const data = this[DECODER].end();
      if (data) {
        for (const p of this.pipes) {
          p.dest.write(data);
        }
        super.emit('data', data);
      }
    }

    for (const p of this.pipes) {
      p.end();
    }
    const ret = super.emit('end');
    this.removeAllListeners('end');
    return ret
  }

  // const all = await stream.collect()
  collect () {
    const buf = [];
    if (!this[OBJECTMODE])
      buf.dataLength = 0;
    // set the promise first, in case an error is raised
    // by triggering the flow here.
    const p = this.promise();
    this.on('data', c => {
      buf.push(c);
      if (!this[OBJECTMODE])
        buf.dataLength += c.length;
    });
    return p.then(() => buf)
  }

  // const data = await stream.concat()
  concat () {
    return this[OBJECTMODE]
      ? Promise.reject(new Error('cannot concat in objectMode'))
      : this.collect().then(buf =>
          this[OBJECTMODE]
            ? Promise.reject(new Error('cannot concat in objectMode'))
            : this[ENCODING] ? buf.join('') : Buffer.concat(buf, buf.dataLength))
  }

  // stream.promise().then(() => done, er => emitted error)
  promise () {
    return new Promise((resolve, reject) => {
      this.on(DESTROYED, () => reject(new Error('stream destroyed')));
      this.on('error', er => reject(er));
      this.on('end', () => resolve());
    })
  }

  // for await (let chunk of stream)
  [ASYNCITERATOR] () {
    const next = () => {
      const res = this.read();
      if (res !== null)
        return Promise.resolve({ done: false, value: res })

      if (this[EOF$1])
        return Promise.resolve({ done: true })

      let resolve = null;
      let reject = null;
      const onerr = er => {
        this.removeListener('data', ondata);
        this.removeListener('end', onend);
        reject(er);
      };
      const ondata = value => {
        this.removeListener('error', onerr);
        this.removeListener('end', onend);
        this.pause();
        resolve({ value: value, done: !!this[EOF$1] });
      };
      const onend = () => {
        this.removeListener('error', onerr);
        this.removeListener('data', ondata);
        resolve({ done: true });
      };
      const ondestroy = () => onerr(new Error('stream destroyed'));
      return new Promise((res, rej) => {
        reject = rej;
        resolve = res;
        this.once(DESTROYED, ondestroy);
        this.once('error', onerr);
        this.once('end', onend);
        this.once('data', ondata);
      })
    };

    return { next }
  }

  // for (let chunk of stream)
  [ITERATOR] () {
    const next = () => {
      const value = this.read();
      const done = value === null;
      return { value, done }
    };
    return { next }
  }

  destroy (er) {
    if (this[DESTROYED]) {
      if (er)
        this.emit('error', er);
      else
        this.emit(DESTROYED);
      return this
    }

    this[DESTROYED] = true;

    // throw away all buffered data, it's never coming out
    this.buffer.length = 0;
    this[BUFFERLENGTH] = 0;

    if (typeof this.close === 'function' && !this[CLOSED])
      this.close();

    if (er)
      this.emit('error', er);
    else // if no error to emit, still reject pending promises
      this.emit(DESTROYED);

    return this
  }

  static isStream (s) {
    return !!s && (s instanceof Minipass || s instanceof Stream ||
      s instanceof EE$2 && (
        typeof s.pipe === 'function' || // readable
        (typeof s.write === 'function' && typeof s.end === 'function') // writable
      ))
  }
};

const assert$2 = require$$0$3;
const Buffer$1 = require$$1.Buffer;
const realZlib = require$$0$2;

const constants = minizlib.constants = constants$1;
const Minipass$3 = minipass;

const OriginalBufferConcat = Buffer$1.concat;

const _superWrite = Symbol('_superWrite');
class ZlibError extends Error {
  constructor (err) {
    super('zlib: ' + err.message);
    this.code = err.code;
    this.errno = err.errno;
    /* istanbul ignore if */
    if (!this.code)
      this.code = 'ZLIB_ERROR';

    this.message = 'zlib: ' + err.message;
    Error.captureStackTrace(this, this.constructor);
  }

  get name () {
    return 'ZlibError'
  }
}

// the Zlib class they all inherit from
// This thing manages the queue of requests, and returns
// true or false if there is anything in the queue when
// you call the .write() method.
const _opts = Symbol('opts');
const _flushFlag = Symbol('flushFlag');
const _finishFlushFlag = Symbol('finishFlushFlag');
const _fullFlushFlag = Symbol('fullFlushFlag');
const _handle = Symbol('handle');
const _onError = Symbol('onError');
const _sawError = Symbol('sawError');
const _level = Symbol('level');
const _strategy = Symbol('strategy');
const _ended$1 = Symbol('ended');

class ZlibBase extends Minipass$3 {
  constructor (opts, mode) {
    if (!opts || typeof opts !== 'object')
      throw new TypeError('invalid options for ZlibBase constructor')

    super(opts);
    this[_sawError] = false;
    this[_ended$1] = false;
    this[_opts] = opts;

    this[_flushFlag] = opts.flush;
    this[_finishFlushFlag] = opts.finishFlush;
    // this will throw if any options are invalid for the class selected
    try {
      this[_handle] = new realZlib[mode](opts);
    } catch (er) {
      // make sure that all errors get decorated properly
      throw new ZlibError(er)
    }

    this[_onError] = (err) => {
      // no sense raising multiple errors, since we abort on the first one.
      if (this[_sawError])
        return

      this[_sawError] = true;

      // there is no way to cleanly recover.
      // continuing only obscures problems.
      this.close();
      this.emit('error', err);
    };

    this[_handle].on('error', er => this[_onError](new ZlibError(er)));
    this.once('end', () => this.close);
  }

  close () {
    if (this[_handle]) {
      this[_handle].close();
      this[_handle] = null;
      this.emit('close');
    }
  }

  reset () {
    if (!this[_sawError]) {
      assert$2(this[_handle], 'zlib binding closed');
      return this[_handle].reset()
    }
  }

  flush (flushFlag) {
    if (this.ended)
      return

    if (typeof flushFlag !== 'number')
      flushFlag = this[_fullFlushFlag];
    this.write(Object.assign(Buffer$1.alloc(0), { [_flushFlag]: flushFlag }));
  }

  end (chunk, encoding, cb) {
    if (chunk)
      this.write(chunk, encoding);
    this.flush(this[_finishFlushFlag]);
    this[_ended$1] = true;
    return super.end(null, null, cb)
  }

  get ended () {
    return this[_ended$1]
  }

  write (chunk, encoding, cb) {
    // process the chunk using the sync process
    // then super.write() all the outputted chunks
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8';

    if (typeof chunk === 'string')
      chunk = Buffer$1.from(chunk, encoding);

    if (this[_sawError])
      return
    assert$2(this[_handle], 'zlib binding closed');

    // _processChunk tries to .close() the native handle after it's done, so we
    // intercept that by temporarily making it a no-op.
    const nativeHandle = this[_handle]._handle;
    const originalNativeClose = nativeHandle.close;
    nativeHandle.close = () => {};
    const originalClose = this[_handle].close;
    this[_handle].close = () => {};
    // It also calls `Buffer.concat()` at the end, which may be convenient
    // for some, but which we are not interested in as it slows us down.
    Buffer$1.concat = (args) => args;
    let result;
    try {
      const flushFlag = typeof chunk[_flushFlag] === 'number'
        ? chunk[_flushFlag] : this[_flushFlag];
      result = this[_handle]._processChunk(chunk, flushFlag);
      // if we don't throw, reset it back how it was
      Buffer$1.concat = OriginalBufferConcat;
    } catch (err) {
      // or if we do, put Buffer.concat() back before we emit error
      // Error events call into user code, which may call Buffer.concat()
      Buffer$1.concat = OriginalBufferConcat;
      this[_onError](new ZlibError(err));
    } finally {
      if (this[_handle]) {
        // Core zlib resets `_handle` to null after attempting to close the
        // native handle. Our no-op handler prevented actual closure, but we
        // need to restore the `._handle` property.
        this[_handle]._handle = nativeHandle;
        nativeHandle.close = originalNativeClose;
        this[_handle].close = originalClose;
        // `_processChunk()` adds an 'error' listener. If we don't remove it
        // after each call, these handlers start piling up.
        this[_handle].removeAllListeners('error');
        // make sure OUR error listener is still attached tho
      }
    }

    if (this[_handle])
      this[_handle].on('error', er => this[_onError](new ZlibError(er)));

    let writeReturn;
    if (result) {
      if (Array.isArray(result) && result.length > 0) {
        // The first buffer is always `handle._outBuffer`, which would be
        // re-used for later invocations; so, we always have to copy that one.
        writeReturn = this[_superWrite](Buffer$1.from(result[0]));
        for (let i = 1; i < result.length; i++) {
          writeReturn = this[_superWrite](result[i]);
        }
      } else {
        writeReturn = this[_superWrite](Buffer$1.from(result));
      }
    }

    if (cb)
      cb();
    return writeReturn
  }

  [_superWrite] (data) {
    return super.write(data)
  }
}

class Zlib extends ZlibBase {
  constructor (opts, mode) {
    opts = opts || {};

    opts.flush = opts.flush || constants.Z_NO_FLUSH;
    opts.finishFlush = opts.finishFlush || constants.Z_FINISH;
    super(opts, mode);

    this[_fullFlushFlag] = constants.Z_FULL_FLUSH;
    this[_level] = opts.level;
    this[_strategy] = opts.strategy;
  }

  params (level, strategy) {
    if (this[_sawError])
      return

    if (!this[_handle])
      throw new Error('cannot switch params when binding is closed')

    // no way to test this without also not supporting params at all
    /* istanbul ignore if */
    if (!this[_handle].params)
      throw new Error('not supported in this implementation')

    if (this[_level] !== level || this[_strategy] !== strategy) {
      this.flush(constants.Z_SYNC_FLUSH);
      assert$2(this[_handle], 'zlib binding closed');
      // .params() calls .flush(), but the latter is always async in the
      // core zlib. We override .flush() temporarily to intercept that and
      // flush synchronously.
      const origFlush = this[_handle].flush;
      this[_handle].flush = (flushFlag, cb) => {
        this.flush(flushFlag);
        cb();
      };
      try {
        this[_handle].params(level, strategy);
      } finally {
        this[_handle].flush = origFlush;
      }
      /* istanbul ignore else */
      if (this[_handle]) {
        this[_level] = level;
        this[_strategy] = strategy;
      }
    }
  }
}

// minimal 2-byte header
class Deflate extends Zlib {
  constructor (opts) {
    super(opts, 'Deflate');
  }
}

class Inflate extends Zlib {
  constructor (opts) {
    super(opts, 'Inflate');
  }
}

// gzip - bigger header, same deflate compression
const _portable = Symbol('_portable');
class Gzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gzip');
    this[_portable] = opts && !!opts.portable;
  }

  [_superWrite] (data) {
    if (!this[_portable])
      return super[_superWrite](data)

    // we'll always get the header emitted in one first chunk
    // overwrite the OS indicator byte with 0xFF
    this[_portable] = false;
    data[9] = 255;
    return super[_superWrite](data)
  }
}

class Gunzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gunzip');
  }
}

// raw - no header
class DeflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'DeflateRaw');
  }
}

class InflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'InflateRaw');
  }
}

// auto-detect header.
class Unzip extends Zlib {
  constructor (opts) {
    super(opts, 'Unzip');
  }
}

class Brotli extends ZlibBase {
  constructor (opts, mode) {
    opts = opts || {};

    opts.flush = opts.flush || constants.BROTLI_OPERATION_PROCESS;
    opts.finishFlush = opts.finishFlush || constants.BROTLI_OPERATION_FINISH;

    super(opts, mode);

    this[_fullFlushFlag] = constants.BROTLI_OPERATION_FLUSH;
  }
}

class BrotliCompress extends Brotli {
  constructor (opts) {
    super(opts, 'BrotliCompress');
  }
}

class BrotliDecompress extends Brotli {
  constructor (opts) {
    super(opts, 'BrotliDecompress');
  }
}

minizlib.Deflate = Deflate;
minizlib.Inflate = Inflate;
minizlib.Gzip = Gzip;
minizlib.Gunzip = Gunzip;
minizlib.DeflateRaw = DeflateRaw;
minizlib.InflateRaw = InflateRaw;
minizlib.Unzip = Unzip;
/* istanbul ignore else */
if (typeof realZlib.BrotliCompress === 'function') {
  minizlib.BrotliCompress = BrotliCompress;
  minizlib.BrotliDecompress = BrotliDecompress;
} else {
  minizlib.BrotliCompress = minizlib.BrotliDecompress = class {
    constructor () {
      throw new Error('Brotli is not supported in this version of Node.js')
    }
  };
}

// on windows, either \ or / are valid directory separators.
// on unix, \ is a valid character in filenames.
// so, on windows, and only on windows, we replace all \ chars with /,
// so that we can use / as our one and only directory separator char.

const platform$4 = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
var normalizeWindowsPath = platform$4 !== 'win32' ? p => p
  : p => p && p.replace(/\\/g, '/');

const { Minipass: Minipass$2 } = minipass$1;
const normPath$4 = normalizeWindowsPath;

const SLURP$1 = Symbol('slurp');
var readEntry = class ReadEntry extends Minipass$2 {
  constructor (header, ex, gex) {
    super();
    // read entries always start life paused.  this is to avoid the
    // situation where Minipass's auto-ending empty streams results
    // in an entry ending before we're ready for it.
    this.pause();
    this.extended = ex;
    this.globalExtended = gex;
    this.header = header;
    this.startBlockSize = 512 * Math.ceil(header.size / 512);
    this.blockRemain = this.startBlockSize;
    this.remain = header.size;
    this.type = header.type;
    this.meta = false;
    this.ignore = false;
    switch (this.type) {
      case 'File':
      case 'OldFile':
      case 'Link':
      case 'SymbolicLink':
      case 'CharacterDevice':
      case 'BlockDevice':
      case 'Directory':
      case 'FIFO':
      case 'ContiguousFile':
      case 'GNUDumpDir':
        break

      case 'NextFileHasLongLinkpath':
      case 'NextFileHasLongPath':
      case 'OldGnuLongPath':
      case 'GlobalExtendedHeader':
      case 'ExtendedHeader':
      case 'OldExtendedHeader':
        this.meta = true;
        break

      // NOTE: gnutar and bsdtar treat unrecognized types as 'File'
      // it may be worth doing the same, but with a warning.
      default:
        this.ignore = true;
    }

    this.path = normPath$4(header.path);
    this.mode = header.mode;
    if (this.mode) {
      this.mode = this.mode & 0o7777;
    }
    this.uid = header.uid;
    this.gid = header.gid;
    this.uname = header.uname;
    this.gname = header.gname;
    this.size = header.size;
    this.mtime = header.mtime;
    this.atime = header.atime;
    this.ctime = header.ctime;
    this.linkpath = normPath$4(header.linkpath);
    this.uname = header.uname;
    this.gname = header.gname;

    if (ex) {
      this[SLURP$1](ex);
    }
    if (gex) {
      this[SLURP$1](gex, true);
    }
  }

  write (data) {
    const writeLen = data.length;
    if (writeLen > this.blockRemain) {
      throw new Error('writing more to entry than is appropriate')
    }

    const r = this.remain;
    const br = this.blockRemain;
    this.remain = Math.max(0, r - writeLen);
    this.blockRemain = Math.max(0, br - writeLen);
    if (this.ignore) {
      return true
    }

    if (r >= writeLen) {
      return super.write(data)
    }

    // r < writeLen
    return super.write(data.slice(0, r))
  }

  [SLURP$1] (ex, global) {
    for (const k in ex) {
      // we slurp in everything except for the path attribute in
      // a global extended header, because that's weird.
      if (ex[k] !== null && ex[k] !== undefined &&
          !(global && k === 'path')) {
        this[k] = k === 'path' || k === 'linkpath' ? normPath$4(ex[k]) : ex[k];
      }
    }
  }
};

var types$1 = {};

(function (exports) {
	// map types from key to human-friendly name
	exports.name = new Map([
	  ['0', 'File'],
	  // same as File
	  ['', 'OldFile'],
	  ['1', 'Link'],
	  ['2', 'SymbolicLink'],
	  // Devices and FIFOs aren't fully supported
	  // they are parsed, but skipped when unpacking
	  ['3', 'CharacterDevice'],
	  ['4', 'BlockDevice'],
	  ['5', 'Directory'],
	  ['6', 'FIFO'],
	  // same as File
	  ['7', 'ContiguousFile'],
	  // pax headers
	  ['g', 'GlobalExtendedHeader'],
	  ['x', 'ExtendedHeader'],
	  // vendor-specific stuff
	  // skip
	  ['A', 'SolarisACL'],
	  // like 5, but with data, which should be skipped
	  ['D', 'GNUDumpDir'],
	  // metadata only, skip
	  ['I', 'Inode'],
	  // data = link path of next file
	  ['K', 'NextFileHasLongLinkpath'],
	  // data = path of next file
	  ['L', 'NextFileHasLongPath'],
	  // skip
	  ['M', 'ContinuationFile'],
	  // like L
	  ['N', 'OldGnuLongPath'],
	  // skip
	  ['S', 'SparseFile'],
	  // skip
	  ['V', 'TapeVolumeHeader'],
	  // like x
	  ['X', 'OldExtendedHeader'],
	]);

	// map the other direction
	exports.code = new Map(Array.from(exports.name).map(kv => [kv[1], kv[0]])); 
} (types$1));

// Tar can encode large and negative numbers using a leading byte of
// 0xff for negative, and 0x80 for positive.

const encode = (num, buf) => {
  if (!Number.isSafeInteger(num)) {
  // The number is so large that javascript cannot represent it with integer
  // precision.
    throw Error('cannot encode number outside of javascript safe integer range')
  } else if (num < 0) {
    encodeNegative(num, buf);
  } else {
    encodePositive(num, buf);
  }
  return buf
};

const encodePositive = (num, buf) => {
  buf[0] = 0x80;

  for (var i = buf.length; i > 1; i--) {
    buf[i - 1] = num & 0xff;
    num = Math.floor(num / 0x100);
  }
};

const encodeNegative = (num, buf) => {
  buf[0] = 0xff;
  var flipped = false;
  num = num * -1;
  for (var i = buf.length; i > 1; i--) {
    var byte = num & 0xff;
    num = Math.floor(num / 0x100);
    if (flipped) {
      buf[i - 1] = onesComp(byte);
    } else if (byte === 0) {
      buf[i - 1] = 0;
    } else {
      flipped = true;
      buf[i - 1] = twosComp(byte);
    }
  }
};

const parse$3 = (buf) => {
  const pre = buf[0];
  const value = pre === 0x80 ? pos(buf.slice(1, buf.length))
    : pre === 0xff ? twos(buf)
    : null;
  if (value === null) {
    throw Error('invalid base256 encoding')
  }

  if (!Number.isSafeInteger(value)) {
  // The number is so large that javascript cannot represent it with integer
  // precision.
    throw Error('parsed number outside of javascript safe integer range')
  }

  return value
};

const twos = (buf) => {
  var len = buf.length;
  var sum = 0;
  var flipped = false;
  for (var i = len - 1; i > -1; i--) {
    var byte = buf[i];
    var f;
    if (flipped) {
      f = onesComp(byte);
    } else if (byte === 0) {
      f = byte;
    } else {
      flipped = true;
      f = twosComp(byte);
    }
    if (f !== 0) {
      sum -= f * Math.pow(256, len - i - 1);
    }
  }
  return sum
};

const pos = (buf) => {
  var len = buf.length;
  var sum = 0;
  for (var i = len - 1; i > -1; i--) {
    var byte = buf[i];
    if (byte !== 0) {
      sum += byte * Math.pow(256, len - i - 1);
    }
  }
  return sum
};

const onesComp = byte => (0xff ^ byte) & 0xff;

const twosComp = byte => ((0xff ^ byte) + 1) & 0xff;

var largeNumbers = {
  encode,
  parse: parse$3,
};

// parse a 512-byte header block to a data object, or vice-versa
// encode returns `true` if a pax extended header is needed, because
// the data could not be faithfully encoded in a simple header.
// (Also, check header.needPax to see if it needs a pax header.)

const types = types$1;
const pathModule = require$$0$4.posix;
const large = largeNumbers;

const SLURP = Symbol('slurp');
const TYPE = Symbol('type');

let Header$3 = class Header {
  constructor (data, off, ex, gex) {
    this.cksumValid = false;
    this.needPax = false;
    this.nullBlock = false;

    this.block = null;
    this.path = null;
    this.mode = null;
    this.uid = null;
    this.gid = null;
    this.size = null;
    this.mtime = null;
    this.cksum = null;
    this[TYPE] = '0';
    this.linkpath = null;
    this.uname = null;
    this.gname = null;
    this.devmaj = 0;
    this.devmin = 0;
    this.atime = null;
    this.ctime = null;

    if (Buffer.isBuffer(data)) {
      this.decode(data, off || 0, ex, gex);
    } else if (data) {
      this.set(data);
    }
  }

  decode (buf, off, ex, gex) {
    if (!off) {
      off = 0;
    }

    if (!buf || !(buf.length >= off + 512)) {
      throw new Error('need 512 bytes for header')
    }

    this.path = decString(buf, off, 100);
    this.mode = decNumber(buf, off + 100, 8);
    this.uid = decNumber(buf, off + 108, 8);
    this.gid = decNumber(buf, off + 116, 8);
    this.size = decNumber(buf, off + 124, 12);
    this.mtime = decDate(buf, off + 136, 12);
    this.cksum = decNumber(buf, off + 148, 12);

    // if we have extended or global extended headers, apply them now
    // See https://github.com/npm/node-tar/pull/187
    this[SLURP](ex);
    this[SLURP](gex, true);

    // old tar versions marked dirs as a file with a trailing /
    this[TYPE] = decString(buf, off + 156, 1);
    if (this[TYPE] === '') {
      this[TYPE] = '0';
    }
    if (this[TYPE] === '0' && this.path.slice(-1) === '/') {
      this[TYPE] = '5';
    }

    // tar implementations sometimes incorrectly put the stat(dir).size
    // as the size in the tarball, even though Directory entries are
    // not able to have any body at all.  In the very rare chance that
    // it actually DOES have a body, we weren't going to do anything with
    // it anyway, and it'll just be a warning about an invalid header.
    if (this[TYPE] === '5') {
      this.size = 0;
    }

    this.linkpath = decString(buf, off + 157, 100);
    if (buf.slice(off + 257, off + 265).toString() === 'ustar\u000000') {
      this.uname = decString(buf, off + 265, 32);
      this.gname = decString(buf, off + 297, 32);
      this.devmaj = decNumber(buf, off + 329, 8);
      this.devmin = decNumber(buf, off + 337, 8);
      if (buf[off + 475] !== 0) {
        // definitely a prefix, definitely >130 chars.
        const prefix = decString(buf, off + 345, 155);
        this.path = prefix + '/' + this.path;
      } else {
        const prefix = decString(buf, off + 345, 130);
        if (prefix) {
          this.path = prefix + '/' + this.path;
        }
        this.atime = decDate(buf, off + 476, 12);
        this.ctime = decDate(buf, off + 488, 12);
      }
    }

    let sum = 8 * 0x20;
    for (let i = off; i < off + 148; i++) {
      sum += buf[i];
    }

    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i];
    }

    this.cksumValid = sum === this.cksum;
    if (this.cksum === null && sum === 8 * 0x20) {
      this.nullBlock = true;
    }
  }

  [SLURP] (ex, global) {
    for (const k in ex) {
      // we slurp in everything except for the path attribute in
      // a global extended header, because that's weird.
      if (ex[k] !== null && ex[k] !== undefined &&
          !(global && k === 'path')) {
        this[k] = ex[k];
      }
    }
  }

  encode (buf, off) {
    if (!buf) {
      buf = this.block = Buffer.alloc(512);
      off = 0;
    }

    if (!off) {
      off = 0;
    }

    if (!(buf.length >= off + 512)) {
      throw new Error('need 512 bytes for header')
    }

    const prefixSize = this.ctime || this.atime ? 130 : 155;
    const split = splitPrefix(this.path || '', prefixSize);
    const path = split[0];
    const prefix = split[1];
    this.needPax = split[2];

    this.needPax = encString(buf, off, 100, path) || this.needPax;
    this.needPax = encNumber(buf, off + 100, 8, this.mode) || this.needPax;
    this.needPax = encNumber(buf, off + 108, 8, this.uid) || this.needPax;
    this.needPax = encNumber(buf, off + 116, 8, this.gid) || this.needPax;
    this.needPax = encNumber(buf, off + 124, 12, this.size) || this.needPax;
    this.needPax = encDate(buf, off + 136, 12, this.mtime) || this.needPax;
    buf[off + 156] = this[TYPE].charCodeAt(0);
    this.needPax = encString(buf, off + 157, 100, this.linkpath) || this.needPax;
    buf.write('ustar\u000000', off + 257, 8);
    this.needPax = encString(buf, off + 265, 32, this.uname) || this.needPax;
    this.needPax = encString(buf, off + 297, 32, this.gname) || this.needPax;
    this.needPax = encNumber(buf, off + 329, 8, this.devmaj) || this.needPax;
    this.needPax = encNumber(buf, off + 337, 8, this.devmin) || this.needPax;
    this.needPax = encString(buf, off + 345, prefixSize, prefix) || this.needPax;
    if (buf[off + 475] !== 0) {
      this.needPax = encString(buf, off + 345, 155, prefix) || this.needPax;
    } else {
      this.needPax = encString(buf, off + 345, 130, prefix) || this.needPax;
      this.needPax = encDate(buf, off + 476, 12, this.atime) || this.needPax;
      this.needPax = encDate(buf, off + 488, 12, this.ctime) || this.needPax;
    }

    let sum = 8 * 0x20;
    for (let i = off; i < off + 148; i++) {
      sum += buf[i];
    }

    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i];
    }

    this.cksum = sum;
    encNumber(buf, off + 148, 8, this.cksum);
    this.cksumValid = true;

    return this.needPax
  }

  set (data) {
    for (const i in data) {
      if (data[i] !== null && data[i] !== undefined) {
        this[i] = data[i];
      }
    }
  }

  get type () {
    return types.name.get(this[TYPE]) || this[TYPE]
  }

  get typeKey () {
    return this[TYPE]
  }

  set type (type) {
    if (types.code.has(type)) {
      this[TYPE] = types.code.get(type);
    } else {
      this[TYPE] = type;
    }
  }
};

const splitPrefix = (p, prefixSize) => {
  const pathSize = 100;
  let pp = p;
  let prefix = '';
  let ret;
  const root = pathModule.parse(p).root || '.';

  if (Buffer.byteLength(pp) < pathSize) {
    ret = [pp, prefix, false];
  } else {
    // first set prefix to the dir, and path to the base
    prefix = pathModule.dirname(pp);
    pp = pathModule.basename(pp);

    do {
      if (Buffer.byteLength(pp) <= pathSize &&
          Buffer.byteLength(prefix) <= prefixSize) {
        // both fit!
        ret = [pp, prefix, false];
      } else if (Buffer.byteLength(pp) > pathSize &&
          Buffer.byteLength(prefix) <= prefixSize) {
        // prefix fits in prefix, but path doesn't fit in path
        ret = [pp.slice(0, pathSize - 1), prefix, true];
      } else {
        // make path take a bit from prefix
        pp = pathModule.join(pathModule.basename(prefix), pp);
        prefix = pathModule.dirname(prefix);
      }
    } while (prefix !== root && !ret)

    // at this point, found no resolution, just truncate
    if (!ret) {
      ret = [p.slice(0, pathSize - 1), '', true];
    }
  }
  return ret
};

const decString = (buf, off, size) =>
  buf.slice(off, off + size).toString('utf8').replace(/\0.*/, '');

const decDate = (buf, off, size) =>
  numToDate(decNumber(buf, off, size));

const numToDate = num => num === null ? null : new Date(num * 1000);

const decNumber = (buf, off, size) =>
  buf[off] & 0x80 ? large.parse(buf.slice(off, off + size))
  : decSmallNumber(buf, off, size);

const nanNull = value => isNaN(value) ? null : value;

const decSmallNumber = (buf, off, size) =>
  nanNull(parseInt(
    buf.slice(off, off + size)
      .toString('utf8').replace(/\0.*$/, '').trim(), 8));

// the maximum encodable as a null-terminated octal, by field size
const MAXNUM = {
  12: 0o77777777777,
  8: 0o7777777,
};

const encNumber = (buf, off, size, number) =>
  number === null ? false :
  number > MAXNUM[size] || number < 0
    ? (large.encode(number, buf.slice(off, off + size)), true)
    : (encSmallNumber(buf, off, size, number), false);

const encSmallNumber = (buf, off, size, number) =>
  buf.write(octalString(number, size), off, size, 'ascii');

const octalString = (number, size) =>
  padOctal(Math.floor(number).toString(8), size);

const padOctal = (string, size) =>
  (string.length === size - 1 ? string
  : new Array(size - string.length - 1).join('0') + string + ' ') + '\0';

const encDate = (buf, off, size, date) =>
  date === null ? false :
  encNumber(buf, off, size, date.getTime() / 1000);

// enough to fill the longest string we've got
const NULLS = new Array(156).join('\0');
// pad with nulls, return true if it's longer or non-ascii
const encString = (buf, off, size, string) =>
  string === null ? false :
  (buf.write(string + NULLS, off, size, 'utf8'),
  string.length !== Buffer.byteLength(string) || string.length > size);

var header = Header$3;

const Header$2 = header;
const path$6 = require$$0$4;

let Pax$2 = class Pax {
  constructor (obj, global) {
    this.atime = obj.atime || null;
    this.charset = obj.charset || null;
    this.comment = obj.comment || null;
    this.ctime = obj.ctime || null;
    this.gid = obj.gid || null;
    this.gname = obj.gname || null;
    this.linkpath = obj.linkpath || null;
    this.mtime = obj.mtime || null;
    this.path = obj.path || null;
    this.size = obj.size || null;
    this.uid = obj.uid || null;
    this.uname = obj.uname || null;
    this.dev = obj.dev || null;
    this.ino = obj.ino || null;
    this.nlink = obj.nlink || null;
    this.global = global || false;
  }

  encode () {
    const body = this.encodeBody();
    if (body === '') {
      return null
    }

    const bodyLen = Buffer.byteLength(body);
    // round up to 512 bytes
    // add 512 for header
    const bufLen = 512 * Math.ceil(1 + bodyLen / 512);
    const buf = Buffer.allocUnsafe(bufLen);

    // 0-fill the header section, it might not hit every field
    for (let i = 0; i < 512; i++) {
      buf[i] = 0;
    }

    new Header$2({
      // XXX split the path
      // then the path should be PaxHeader + basename, but less than 99,
      // prepend with the dirname
      path: ('PaxHeader/' + path$6.basename(this.path)).slice(0, 99),
      mode: this.mode || 0o644,
      uid: this.uid || null,
      gid: this.gid || null,
      size: bodyLen,
      mtime: this.mtime || null,
      type: this.global ? 'GlobalExtendedHeader' : 'ExtendedHeader',
      linkpath: '',
      uname: this.uname || '',
      gname: this.gname || '',
      devmaj: 0,
      devmin: 0,
      atime: this.atime || null,
      ctime: this.ctime || null,
    }).encode(buf);

    buf.write(body, 512, bodyLen, 'utf8');

    // null pad after the body
    for (let i = bodyLen + 512; i < buf.length; i++) {
      buf[i] = 0;
    }

    return buf
  }

  encodeBody () {
    return (
      this.encodeField('path') +
      this.encodeField('ctime') +
      this.encodeField('atime') +
      this.encodeField('dev') +
      this.encodeField('ino') +
      this.encodeField('nlink') +
      this.encodeField('charset') +
      this.encodeField('comment') +
      this.encodeField('gid') +
      this.encodeField('gname') +
      this.encodeField('linkpath') +
      this.encodeField('mtime') +
      this.encodeField('size') +
      this.encodeField('uid') +
      this.encodeField('uname')
    )
  }

  encodeField (field) {
    if (this[field] === null || this[field] === undefined) {
      return ''
    }
    const v = this[field] instanceof Date ? this[field].getTime() / 1000
      : this[field];
    const s = ' ' +
      (field === 'dev' || field === 'ino' || field === 'nlink'
        ? 'SCHILY.' : '') +
      field + '=' + v + '\n';
    const byteLen = Buffer.byteLength(s);
    // the digits includes the length of the digits in ascii base-10
    // so if it's 9 characters, then adding 1 for the 9 makes it 10
    // which makes it 11 chars.
    let digits = Math.floor(Math.log(byteLen) / Math.log(10)) + 1;
    if (byteLen + digits >= Math.pow(10, digits)) {
      digits += 1;
    }
    const len = digits + byteLen;
    return len + s
  }
};

Pax$2.parse = (string, ex, g) => new Pax$2(merge(parseKV(string), ex), g);

const merge = (a, b) =>
  b ? Object.keys(a).reduce((s, k) => (s[k] = a[k], s), b) : a;

const parseKV = string =>
  string
    .replace(/\n$/, '')
    .split('\n')
    .reduce(parseKVLine, Object.create(null));

const parseKVLine = (set, line) => {
  const n = parseInt(line, 10);

  // XXX Values with \n in them will fail this.
  // Refactor to not be a naive line-by-line parse.
  if (n !== Buffer.byteLength(line) + 1) {
    return set
  }

  line = line.slice((n + ' ').length);
  const kv = line.split('=');
  const k = kv.shift().replace(/^SCHILY\.(dev|ino|nlink)/, '$1');
  if (!k) {
    return set
  }

  const v = kv.join('=');
  set[k] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(k)
    ? new Date(v * 1000)
    : /^[0-9]+$/.test(v) ? +v
    : v;
  return set
};

var pax = Pax$2;

// warning: extremely hot code path.
// This has been meticulously optimized for use
// within npm install on large package trees.
// Do not edit without careful benchmarking.
var stripTrailingSlashes = str => {
  let i = str.length - 1;
  let slashesStart = -1;
  while (i > -1 && str.charAt(i) === '/') {
    slashesStart = i;
    i--;
  }
  return slashesStart === -1 ? str : str.slice(0, slashesStart)
};

var warnMixin = Base => class extends Base {
  warn (code, message, data = {}) {
    if (this.file) {
      data.file = this.file;
    }
    if (this.cwd) {
      data.cwd = this.cwd;
    }
    data.code = message instanceof Error && message.code || code;
    data.tarCode = code;
    if (!this.strict && data.recoverable !== false) {
      if (message instanceof Error) {
        data = Object.assign(message, data);
        message = message.message;
      }
      this.emit('warn', data.tarCode, message, data);
    } else if (message instanceof Error) {
      this.emit('error', Object.assign(message, data));
    } else {
      this.emit('error', Object.assign(new Error(`${code}: ${message}`), data));
    }
  }
};

// When writing files on Windows, translate the characters to their
// 0xf000 higher-encoded versions.

const raw = [
  '|',
  '<',
  '>',
  '?',
  ':',
];

const win = raw.map(char =>
  String.fromCharCode(0xf000 + char.charCodeAt(0)));

const toWin = new Map(raw.map((char, i) => [char, win[i]]));
const toRaw = new Map(win.map((char, i) => [char, raw[i]]));

var winchars$1 = {
  encode: s => raw.reduce((s, c) => s.split(c).join(toWin.get(c)), s),
  decode: s => win.reduce((s, c) => s.split(c).join(toRaw.get(c)), s),
};

// unix absolute paths are also absolute on win32, so we use this for both
const { isAbsolute, parse: parse$2 } = require$$0$4.win32;

// returns [root, stripped]
// Note that windows will think that //x/y/z/a has a "root" of //x/y, and in
// those cases, we want to sanitize it to x/y/z/a, not z/a, so we strip /
// explicitly if it's the first character.
// drive-specific relative paths on Windows get their root stripped off even
// though they are not absolute, so `c:../foo` becomes ['c:', '../foo']
var stripAbsolutePath$2 = path => {
  let r = '';

  let parsed = parse$2(path);
  while (isAbsolute(path) || parsed.root) {
    // windows will think that //x/y/z has a "root" of //x/y/
    // but strip the //?/C:/ off of //?/C:/path
    const root = path.charAt(0) === '/' && path.slice(0, 4) !== '//?/' ? '/'
      : parsed.root;
    path = path.slice(root.length);
    r += root;
    parsed = parse$2(path);
  }
  return [r, path]
};

var modeFix$1;
var hasRequiredModeFix;

function requireModeFix () {
	if (hasRequiredModeFix) return modeFix$1;
	hasRequiredModeFix = 1;
	modeFix$1 = (mode, isDir, portable) => {
	  mode &= 0o7777;

	  // in portable mode, use the minimum reasonable umask
	  // if this system creates files with 0o664 by default
	  // (as some linux distros do), then we'll write the
	  // archive with 0o644 instead.  Also, don't ever create
	  // a file that is not readable/writable by the owner.
	  if (portable) {
	    mode = (mode | 0o600) & ~0o22;
	  }

	  // if dirs are readable, then they should be listable
	  if (isDir) {
	    if (mode & 0o400) {
	      mode |= 0o100;
	    }
	    if (mode & 0o40) {
	      mode |= 0o10;
	    }
	    if (mode & 0o4) {
	      mode |= 0o1;
	    }
	  }
	  return mode
	};
	return modeFix$1;
}

const { Minipass: Minipass$1 } = minipass$1;
const Pax$1 = pax;
const Header$1 = header;
const fs$a = require$$0__default;
const path$5 = require$$0$4;
const normPath$3 = normalizeWindowsPath;
const stripSlash$2 = stripTrailingSlashes;

const prefixPath = (path, prefix) => {
  if (!prefix) {
    return normPath$3(path)
  }
  path = normPath$3(path).replace(/^\.(\/|$)/, '');
  return stripSlash$2(prefix) + '/' + path
};

const maxReadSize = 16 * 1024 * 1024;
const PROCESS$1 = Symbol('process');
const FILE$1 = Symbol('file');
const DIRECTORY$1 = Symbol('directory');
const SYMLINK$1 = Symbol('symlink');
const HARDLINK$1 = Symbol('hardlink');
const HEADER = Symbol('header');
const READ = Symbol('read');
const LSTAT = Symbol('lstat');
const ONLSTAT = Symbol('onlstat');
const ONREAD = Symbol('onread');
const ONREADLINK = Symbol('onreadlink');
const OPENFILE = Symbol('openfile');
const ONOPENFILE = Symbol('onopenfile');
const CLOSE = Symbol('close');
const MODE = Symbol('mode');
const AWAITDRAIN = Symbol('awaitDrain');
const ONDRAIN$1 = Symbol('ondrain');
const PREFIX = Symbol('prefix');
const HAD_ERROR = Symbol('hadError');
const warner$2 = warnMixin;
const winchars = winchars$1;
const stripAbsolutePath$1 = stripAbsolutePath$2;

const modeFix = requireModeFix();

const WriteEntry$1 = warner$2(class WriteEntry extends Minipass$1 {
  constructor (p, opt) {
    opt = opt || {};
    super(opt);
    if (typeof p !== 'string') {
      throw new TypeError('path is required')
    }
    this.path = normPath$3(p);
    // suppress atime, ctime, uid, gid, uname, gname
    this.portable = !!opt.portable;
    // until node has builtin pwnam functions, this'll have to do
    this.myuid = process.getuid && process.getuid() || 0;
    this.myuser = process.env.USER || '';
    this.maxReadSize = opt.maxReadSize || maxReadSize;
    this.linkCache = opt.linkCache || new Map();
    this.statCache = opt.statCache || new Map();
    this.preservePaths = !!opt.preservePaths;
    this.cwd = normPath$3(opt.cwd || process.cwd());
    this.strict = !!opt.strict;
    this.noPax = !!opt.noPax;
    this.noMtime = !!opt.noMtime;
    this.mtime = opt.mtime || null;
    this.prefix = opt.prefix ? normPath$3(opt.prefix) : null;

    this.fd = null;
    this.blockLen = null;
    this.blockRemain = null;
    this.buf = null;
    this.offset = null;
    this.length = null;
    this.pos = null;
    this.remain = null;

    if (typeof opt.onwarn === 'function') {
      this.on('warn', opt.onwarn);
    }

    let pathWarn = false;
    if (!this.preservePaths) {
      const [root, stripped] = stripAbsolutePath$1(this.path);
      if (root) {
        this.path = stripped;
        pathWarn = root;
      }
    }

    this.win32 = !!opt.win32 || process.platform === 'win32';
    if (this.win32) {
      // force the \ to / normalization, since we might not *actually*
      // be on windows, but want \ to be considered a path separator.
      this.path = winchars.decode(this.path.replace(/\\/g, '/'));
      p = p.replace(/\\/g, '/');
    }

    this.absolute = normPath$3(opt.absolute || path$5.resolve(this.cwd, p));

    if (this.path === '') {
      this.path = './';
    }

    if (pathWarn) {
      this.warn('TAR_ENTRY_INFO', `stripping ${pathWarn} from absolute path`, {
        entry: this,
        path: pathWarn + this.path,
      });
    }

    if (this.statCache.has(this.absolute)) {
      this[ONLSTAT](this.statCache.get(this.absolute));
    } else {
      this[LSTAT]();
    }
  }

  emit (ev, ...data) {
    if (ev === 'error') {
      this[HAD_ERROR] = true;
    }
    return super.emit(ev, ...data)
  }

  [LSTAT] () {
    fs$a.lstat(this.absolute, (er, stat) => {
      if (er) {
        return this.emit('error', er)
      }
      this[ONLSTAT](stat);
    });
  }

  [ONLSTAT] (stat) {
    this.statCache.set(this.absolute, stat);
    this.stat = stat;
    if (!stat.isFile()) {
      stat.size = 0;
    }
    this.type = getType(stat);
    this.emit('stat', stat);
    this[PROCESS$1]();
  }

  [PROCESS$1] () {
    switch (this.type) {
      case 'File': return this[FILE$1]()
      case 'Directory': return this[DIRECTORY$1]()
      case 'SymbolicLink': return this[SYMLINK$1]()
      // unsupported types are ignored.
      default: return this.end()
    }
  }

  [MODE] (mode) {
    return modeFix(mode, this.type === 'Directory', this.portable)
  }

  [PREFIX] (path) {
    return prefixPath(path, this.prefix)
  }

  [HEADER] () {
    if (this.type === 'Directory' && this.portable) {
      this.noMtime = true;
    }

    this.header = new Header$1({
      path: this[PREFIX](this.path),
      // only apply the prefix to hard links.
      linkpath: this.type === 'Link' ? this[PREFIX](this.linkpath)
      : this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this[MODE](this.stat.mode),
      uid: this.portable ? null : this.stat.uid,
      gid: this.portable ? null : this.stat.gid,
      size: this.stat.size,
      mtime: this.noMtime ? null : this.mtime || this.stat.mtime,
      type: this.type,
      uname: this.portable ? null :
      this.stat.uid === this.myuid ? this.myuser : '',
      atime: this.portable ? null : this.stat.atime,
      ctime: this.portable ? null : this.stat.ctime,
    });

    if (this.header.encode() && !this.noPax) {
      super.write(new Pax$1({
        atime: this.portable ? null : this.header.atime,
        ctime: this.portable ? null : this.header.ctime,
        gid: this.portable ? null : this.header.gid,
        mtime: this.noMtime ? null : this.mtime || this.header.mtime,
        path: this[PREFIX](this.path),
        linkpath: this.type === 'Link' ? this[PREFIX](this.linkpath)
        : this.linkpath,
        size: this.header.size,
        uid: this.portable ? null : this.header.uid,
        uname: this.portable ? null : this.header.uname,
        dev: this.portable ? null : this.stat.dev,
        ino: this.portable ? null : this.stat.ino,
        nlink: this.portable ? null : this.stat.nlink,
      }).encode());
    }
    super.write(this.header.block);
  }

  [DIRECTORY$1] () {
    if (this.path.slice(-1) !== '/') {
      this.path += '/';
    }
    this.stat.size = 0;
    this[HEADER]();
    this.end();
  }

  [SYMLINK$1] () {
    fs$a.readlink(this.absolute, (er, linkpath) => {
      if (er) {
        return this.emit('error', er)
      }
      this[ONREADLINK](linkpath);
    });
  }

  [ONREADLINK] (linkpath) {
    this.linkpath = normPath$3(linkpath);
    this[HEADER]();
    this.end();
  }

  [HARDLINK$1] (linkpath) {
    this.type = 'Link';
    this.linkpath = normPath$3(path$5.relative(this.cwd, linkpath));
    this.stat.size = 0;
    this[HEADER]();
    this.end();
  }

  [FILE$1] () {
    if (this.stat.nlink > 1) {
      const linkKey = this.stat.dev + ':' + this.stat.ino;
      if (this.linkCache.has(linkKey)) {
        const linkpath = this.linkCache.get(linkKey);
        if (linkpath.indexOf(this.cwd) === 0) {
          return this[HARDLINK$1](linkpath)
        }
      }
      this.linkCache.set(linkKey, this.absolute);
    }

    this[HEADER]();
    if (this.stat.size === 0) {
      return this.end()
    }

    this[OPENFILE]();
  }

  [OPENFILE] () {
    fs$a.open(this.absolute, 'r', (er, fd) => {
      if (er) {
        return this.emit('error', er)
      }
      this[ONOPENFILE](fd);
    });
  }

  [ONOPENFILE] (fd) {
    this.fd = fd;
    if (this[HAD_ERROR]) {
      return this[CLOSE]()
    }

    this.blockLen = 512 * Math.ceil(this.stat.size / 512);
    this.blockRemain = this.blockLen;
    const bufLen = Math.min(this.blockLen, this.maxReadSize);
    this.buf = Buffer.allocUnsafe(bufLen);
    this.offset = 0;
    this.pos = 0;
    this.remain = this.stat.size;
    this.length = this.buf.length;
    this[READ]();
  }

  [READ] () {
    const { fd, buf, offset, length, pos } = this;
    fs$a.read(fd, buf, offset, length, pos, (er, bytesRead) => {
      if (er) {
        // ignoring the error from close(2) is a bad practice, but at
        // this point we already have an error, don't need another one
        return this[CLOSE](() => this.emit('error', er))
      }
      this[ONREAD](bytesRead);
    });
  }

  [CLOSE] (cb) {
    fs$a.close(this.fd, cb);
  }

  [ONREAD] (bytesRead) {
    if (bytesRead <= 0 && this.remain > 0) {
      const er = new Error('encountered unexpected EOF');
      er.path = this.absolute;
      er.syscall = 'read';
      er.code = 'EOF';
      return this[CLOSE](() => this.emit('error', er))
    }

    if (bytesRead > this.remain) {
      const er = new Error('did not encounter expected EOF');
      er.path = this.absolute;
      er.syscall = 'read';
      er.code = 'EOF';
      return this[CLOSE](() => this.emit('error', er))
    }

    // null out the rest of the buffer, if we could fit the block padding
    // at the end of this loop, we've incremented bytesRead and this.remain
    // to be incremented up to the blockRemain level, as if we had expected
    // to get a null-padded file, and read it until the end.  then we will
    // decrement both remain and blockRemain by bytesRead, and know that we
    // reached the expected EOF, without any null buffer to append.
    if (bytesRead === this.remain) {
      for (let i = bytesRead; i < this.length && bytesRead < this.blockRemain; i++) {
        this.buf[i + this.offset] = 0;
        bytesRead++;
        this.remain++;
      }
    }

    const writeBuf = this.offset === 0 && bytesRead === this.buf.length ?
      this.buf : this.buf.slice(this.offset, this.offset + bytesRead);

    const flushed = this.write(writeBuf);
    if (!flushed) {
      this[AWAITDRAIN](() => this[ONDRAIN$1]());
    } else {
      this[ONDRAIN$1]();
    }
  }

  [AWAITDRAIN] (cb) {
    this.once('drain', cb);
  }

  write (writeBuf) {
    if (this.blockRemain < writeBuf.length) {
      const er = new Error('writing more data than expected');
      er.path = this.absolute;
      return this.emit('error', er)
    }
    this.remain -= writeBuf.length;
    this.blockRemain -= writeBuf.length;
    this.pos += writeBuf.length;
    this.offset += writeBuf.length;
    return super.write(writeBuf)
  }

  [ONDRAIN$1] () {
    if (!this.remain) {
      if (this.blockRemain) {
        super.write(Buffer.alloc(this.blockRemain));
      }
      return this[CLOSE](er => er ? this.emit('error', er) : this.end())
    }

    if (this.offset >= this.length) {
      // if we only have a smaller bit left to read, alloc a smaller buffer
      // otherwise, keep it the same length it was before.
      this.buf = Buffer.allocUnsafe(Math.min(this.blockRemain, this.buf.length));
      this.offset = 0;
    }
    this.length = this.buf.length - this.offset;
    this[READ]();
  }
});

let WriteEntrySync$1 = class WriteEntrySync extends WriteEntry$1 {
  [LSTAT] () {
    this[ONLSTAT](fs$a.lstatSync(this.absolute));
  }

  [SYMLINK$1] () {
    this[ONREADLINK](fs$a.readlinkSync(this.absolute));
  }

  [OPENFILE] () {
    this[ONOPENFILE](fs$a.openSync(this.absolute, 'r'));
  }

  [READ] () {
    let threw = true;
    try {
      const { fd, buf, offset, length, pos } = this;
      const bytesRead = fs$a.readSync(fd, buf, offset, length, pos);
      this[ONREAD](bytesRead);
      threw = false;
    } finally {
      // ignoring the error from close(2) is a bad practice, but at
      // this point we already have an error, don't need another one
      if (threw) {
        try {
          this[CLOSE](() => {});
        } catch (er) {}
      }
    }
  }

  [AWAITDRAIN] (cb) {
    cb();
  }

  [CLOSE] (cb) {
    fs$a.closeSync(this.fd);
    cb();
  }
};

const WriteEntryTar$1 = warner$2(class WriteEntryTar extends Minipass$1 {
  constructor (readEntry, opt) {
    opt = opt || {};
    super(opt);
    this.preservePaths = !!opt.preservePaths;
    this.portable = !!opt.portable;
    this.strict = !!opt.strict;
    this.noPax = !!opt.noPax;
    this.noMtime = !!opt.noMtime;

    this.readEntry = readEntry;
    this.type = readEntry.type;
    if (this.type === 'Directory' && this.portable) {
      this.noMtime = true;
    }

    this.prefix = opt.prefix || null;

    this.path = normPath$3(readEntry.path);
    this.mode = this[MODE](readEntry.mode);
    this.uid = this.portable ? null : readEntry.uid;
    this.gid = this.portable ? null : readEntry.gid;
    this.uname = this.portable ? null : readEntry.uname;
    this.gname = this.portable ? null : readEntry.gname;
    this.size = readEntry.size;
    this.mtime = this.noMtime ? null : opt.mtime || readEntry.mtime;
    this.atime = this.portable ? null : readEntry.atime;
    this.ctime = this.portable ? null : readEntry.ctime;
    this.linkpath = normPath$3(readEntry.linkpath);

    if (typeof opt.onwarn === 'function') {
      this.on('warn', opt.onwarn);
    }

    let pathWarn = false;
    if (!this.preservePaths) {
      const [root, stripped] = stripAbsolutePath$1(this.path);
      if (root) {
        this.path = stripped;
        pathWarn = root;
      }
    }

    this.remain = readEntry.size;
    this.blockRemain = readEntry.startBlockSize;

    this.header = new Header$1({
      path: this[PREFIX](this.path),
      linkpath: this.type === 'Link' ? this[PREFIX](this.linkpath)
      : this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this.mode,
      uid: this.portable ? null : this.uid,
      gid: this.portable ? null : this.gid,
      size: this.size,
      mtime: this.noMtime ? null : this.mtime,
      type: this.type,
      uname: this.portable ? null : this.uname,
      atime: this.portable ? null : this.atime,
      ctime: this.portable ? null : this.ctime,
    });

    if (pathWarn) {
      this.warn('TAR_ENTRY_INFO', `stripping ${pathWarn} from absolute path`, {
        entry: this,
        path: pathWarn + this.path,
      });
    }

    if (this.header.encode() && !this.noPax) {
      super.write(new Pax$1({
        atime: this.portable ? null : this.atime,
        ctime: this.portable ? null : this.ctime,
        gid: this.portable ? null : this.gid,
        mtime: this.noMtime ? null : this.mtime,
        path: this[PREFIX](this.path),
        linkpath: this.type === 'Link' ? this[PREFIX](this.linkpath)
        : this.linkpath,
        size: this.size,
        uid: this.portable ? null : this.uid,
        uname: this.portable ? null : this.uname,
        dev: this.portable ? null : this.readEntry.dev,
        ino: this.portable ? null : this.readEntry.ino,
        nlink: this.portable ? null : this.readEntry.nlink,
      }).encode());
    }

    super.write(this.header.block);
    readEntry.pipe(this);
  }

  [PREFIX] (path) {
    return prefixPath(path, this.prefix)
  }

  [MODE] (mode) {
    return modeFix(mode, this.type === 'Directory', this.portable)
  }

  write (data) {
    const writeLen = data.length;
    if (writeLen > this.blockRemain) {
      throw new Error('writing more to entry than is appropriate')
    }
    this.blockRemain -= writeLen;
    return super.write(data)
  }

  end () {
    if (this.blockRemain) {
      super.write(Buffer.alloc(this.blockRemain));
    }
    return super.end()
  }
});

WriteEntry$1.Sync = WriteEntrySync$1;
WriteEntry$1.Tar = WriteEntryTar$1;

const getType = stat =>
  stat.isFile() ? 'File'
  : stat.isDirectory() ? 'Directory'
  : stat.isSymbolicLink() ? 'SymbolicLink'
  : 'Unsupported';

var writeEntry = WriteEntry$1;

// A readable tar stream creator
// Technically, this is a transform stream that you write paths into,
// and tar format comes out of.
// The `add()` method is like `write()` but returns this,
// and end() return `this` as well, so you can
// do `new Pack(opt).add('files').add('dir').end().pipe(output)
// You could also do something like:
// streamOfPaths().pipe(new Pack()).pipe(new fs.WriteStream('out.tar'))

class PackJob {
  constructor (path, absolute) {
    this.path = path || './';
    this.absolute = absolute;
    this.entry = null;
    this.stat = null;
    this.readdir = null;
    this.pending = false;
    this.ignore = false;
    this.piped = false;
  }
}

const { Minipass } = minipass$1;
const zlib$1 = minizlib;
const ReadEntry = readEntry;
const WriteEntry = writeEntry;
const WriteEntrySync = WriteEntry.Sync;
const WriteEntryTar = WriteEntry.Tar;
const Yallist$1 = yallist;
const EOF = Buffer.alloc(1024);
const ONSTAT = Symbol('onStat');
const ENDED$2 = Symbol('ended');
const QUEUE$1 = Symbol('queue');
const CURRENT = Symbol('current');
const PROCESS = Symbol('process');
const PROCESSING = Symbol('processing');
const PROCESSJOB = Symbol('processJob');
const JOBS = Symbol('jobs');
const JOBDONE = Symbol('jobDone');
const ADDFSENTRY = Symbol('addFSEntry');
const ADDTARENTRY = Symbol('addTarEntry');
const STAT = Symbol('stat');
const READDIR = Symbol('readdir');
const ONREADDIR = Symbol('onreaddir');
const PIPE = Symbol('pipe');
const ENTRY = Symbol('entry');
const ENTRYOPT = Symbol('entryOpt');
const WRITEENTRYCLASS = Symbol('writeEntryClass');
const WRITE = Symbol('write');
const ONDRAIN = Symbol('ondrain');

const fs$9 = require$$0__default;
const path$4 = require$$0$4;
const warner$1 = warnMixin;
const normPath$2 = normalizeWindowsPath;

const Pack = warner$1(class Pack extends Minipass {
  constructor (opt) {
    super(opt);
    opt = opt || Object.create(null);
    this.opt = opt;
    this.file = opt.file || '';
    this.cwd = opt.cwd || process.cwd();
    this.maxReadSize = opt.maxReadSize;
    this.preservePaths = !!opt.preservePaths;
    this.strict = !!opt.strict;
    this.noPax = !!opt.noPax;
    this.prefix = normPath$2(opt.prefix || '');
    this.linkCache = opt.linkCache || new Map();
    this.statCache = opt.statCache || new Map();
    this.readdirCache = opt.readdirCache || new Map();

    this[WRITEENTRYCLASS] = WriteEntry;
    if (typeof opt.onwarn === 'function') {
      this.on('warn', opt.onwarn);
    }

    this.portable = !!opt.portable;
    this.zip = null;

    if (opt.gzip || opt.brotli) {
      if (opt.gzip && opt.brotli) {
        throw new TypeError('gzip and brotli are mutually exclusive')
      }
      if (opt.gzip) {
        if (typeof opt.gzip !== 'object') {
          opt.gzip = {};
        }
        if (this.portable) {
          opt.gzip.portable = true;
        }
        this.zip = new zlib$1.Gzip(opt.gzip);
      }
      if (opt.brotli) {
        if (typeof opt.brotli !== 'object') {
          opt.brotli = {};
        }
        this.zip = new zlib$1.BrotliCompress(opt.brotli);
      }
      this.zip.on('data', chunk => super.write(chunk));
      this.zip.on('end', _ => super.end());
      this.zip.on('drain', _ => this[ONDRAIN]());
      this.on('resume', _ => this.zip.resume());
    } else {
      this.on('drain', this[ONDRAIN]);
    }

    this.noDirRecurse = !!opt.noDirRecurse;
    this.follow = !!opt.follow;
    this.noMtime = !!opt.noMtime;
    this.mtime = opt.mtime || null;

    this.filter = typeof opt.filter === 'function' ? opt.filter : _ => true;

    this[QUEUE$1] = new Yallist$1();
    this[JOBS] = 0;
    this.jobs = +opt.jobs || 4;
    this[PROCESSING] = false;
    this[ENDED$2] = false;
  }

  [WRITE] (chunk) {
    return super.write(chunk)
  }

  add (path) {
    this.write(path);
    return this
  }

  end (path) {
    if (path) {
      this.write(path);
    }
    this[ENDED$2] = true;
    this[PROCESS]();
    return this
  }

  write (path) {
    if (this[ENDED$2]) {
      throw new Error('write after end')
    }

    if (path instanceof ReadEntry) {
      this[ADDTARENTRY](path);
    } else {
      this[ADDFSENTRY](path);
    }
    return this.flowing
  }

  [ADDTARENTRY] (p) {
    const absolute = normPath$2(path$4.resolve(this.cwd, p.path));
    // in this case, we don't have to wait for the stat
    if (!this.filter(p.path, p)) {
      p.resume();
    } else {
      const job = new PackJob(p.path, absolute, false);
      job.entry = new WriteEntryTar(p, this[ENTRYOPT](job));
      job.entry.on('end', _ => this[JOBDONE](job));
      this[JOBS] += 1;
      this[QUEUE$1].push(job);
    }

    this[PROCESS]();
  }

  [ADDFSENTRY] (p) {
    const absolute = normPath$2(path$4.resolve(this.cwd, p));
    this[QUEUE$1].push(new PackJob(p, absolute));
    this[PROCESS]();
  }

  [STAT] (job) {
    job.pending = true;
    this[JOBS] += 1;
    const stat = this.follow ? 'stat' : 'lstat';
    fs$9[stat](job.absolute, (er, stat) => {
      job.pending = false;
      this[JOBS] -= 1;
      if (er) {
        this.emit('error', er);
      } else {
        this[ONSTAT](job, stat);
      }
    });
  }

  [ONSTAT] (job, stat) {
    this.statCache.set(job.absolute, stat);
    job.stat = stat;

    // now we have the stat, we can filter it.
    if (!this.filter(job.path, stat)) {
      job.ignore = true;
    }

    this[PROCESS]();
  }

  [READDIR] (job) {
    job.pending = true;
    this[JOBS] += 1;
    fs$9.readdir(job.absolute, (er, entries) => {
      job.pending = false;
      this[JOBS] -= 1;
      if (er) {
        return this.emit('error', er)
      }
      this[ONREADDIR](job, entries);
    });
  }

  [ONREADDIR] (job, entries) {
    this.readdirCache.set(job.absolute, entries);
    job.readdir = entries;
    this[PROCESS]();
  }

  [PROCESS] () {
    if (this[PROCESSING]) {
      return
    }

    this[PROCESSING] = true;
    for (let w = this[QUEUE$1].head;
      w !== null && this[JOBS] < this.jobs;
      w = w.next) {
      this[PROCESSJOB](w.value);
      if (w.value.ignore) {
        const p = w.next;
        this[QUEUE$1].removeNode(w);
        w.next = p;
      }
    }

    this[PROCESSING] = false;

    if (this[ENDED$2] && !this[QUEUE$1].length && this[JOBS] === 0) {
      if (this.zip) {
        this.zip.end(EOF);
      } else {
        super.write(EOF);
        super.end();
      }
    }
  }

  get [CURRENT] () {
    return this[QUEUE$1] && this[QUEUE$1].head && this[QUEUE$1].head.value
  }

  [JOBDONE] (job) {
    this[QUEUE$1].shift();
    this[JOBS] -= 1;
    this[PROCESS]();
  }

  [PROCESSJOB] (job) {
    if (job.pending) {
      return
    }

    if (job.entry) {
      if (job === this[CURRENT] && !job.piped) {
        this[PIPE](job);
      }
      return
    }

    if (!job.stat) {
      if (this.statCache.has(job.absolute)) {
        this[ONSTAT](job, this.statCache.get(job.absolute));
      } else {
        this[STAT](job);
      }
    }
    if (!job.stat) {
      return
    }

    // filtered out!
    if (job.ignore) {
      return
    }

    if (!this.noDirRecurse && job.stat.isDirectory() && !job.readdir) {
      if (this.readdirCache.has(job.absolute)) {
        this[ONREADDIR](job, this.readdirCache.get(job.absolute));
      } else {
        this[READDIR](job);
      }
      if (!job.readdir) {
        return
      }
    }

    // we know it doesn't have an entry, because that got checked above
    job.entry = this[ENTRY](job);
    if (!job.entry) {
      job.ignore = true;
      return
    }

    if (job === this[CURRENT] && !job.piped) {
      this[PIPE](job);
    }
  }

  [ENTRYOPT] (job) {
    return {
      onwarn: (code, msg, data) => this.warn(code, msg, data),
      noPax: this.noPax,
      cwd: this.cwd,
      absolute: job.absolute,
      preservePaths: this.preservePaths,
      maxReadSize: this.maxReadSize,
      strict: this.strict,
      portable: this.portable,
      linkCache: this.linkCache,
      statCache: this.statCache,
      noMtime: this.noMtime,
      mtime: this.mtime,
      prefix: this.prefix,
    }
  }

  [ENTRY] (job) {
    this[JOBS] += 1;
    try {
      return new this[WRITEENTRYCLASS](job.path, this[ENTRYOPT](job))
        .on('end', () => this[JOBDONE](job))
        .on('error', er => this.emit('error', er))
    } catch (er) {
      this.emit('error', er);
    }
  }

  [ONDRAIN] () {
    if (this[CURRENT] && this[CURRENT].entry) {
      this[CURRENT].entry.resume();
    }
  }

  // like .pipe() but using super, because our write() is special
  [PIPE] (job) {
    job.piped = true;

    if (job.readdir) {
      job.readdir.forEach(entry => {
        const p = job.path;
        const base = p === './' ? '' : p.replace(/\/*$/, '/');
        this[ADDFSENTRY](base + entry);
      });
    }

    const source = job.entry;
    const zip = this.zip;

    if (zip) {
      source.on('data', chunk => {
        if (!zip.write(chunk)) {
          source.pause();
        }
      });
    } else {
      source.on('data', chunk => {
        if (!super.write(chunk)) {
          source.pause();
        }
      });
    }
  }

  pause () {
    if (this.zip) {
      this.zip.pause();
    }
    return super.pause()
  }
});

class PackSync extends Pack {
  constructor (opt) {
    super(opt);
    this[WRITEENTRYCLASS] = WriteEntrySync;
  }

  // pause/resume are no-ops in sync streams.
  pause () {}
  resume () {}

  [STAT] (job) {
    const stat = this.follow ? 'statSync' : 'lstatSync';
    this[ONSTAT](job, fs$9[stat](job.absolute));
  }

  [READDIR] (job, stat) {
    this[ONREADDIR](job, fs$9.readdirSync(job.absolute));
  }

  // gotta get it all in this tick
  [PIPE] (job) {
    const source = job.entry;
    const zip = this.zip;

    if (job.readdir) {
      job.readdir.forEach(entry => {
        const p = job.path;
        const base = p === './' ? '' : p.replace(/\/*$/, '/');
        this[ADDFSENTRY](base + entry);
      });
    }

    if (zip) {
      source.on('data', chunk => {
        zip.write(chunk);
      });
    } else {
      source.on('data', chunk => {
        super[WRITE](chunk);
      });
    }
  }
}

Pack.Sync = PackSync;

var fsMinipass = {};

const MiniPass = minipass;
const EE$1 = require$$0.EventEmitter;
const fs$8 = require$$0__default;

let writev = fs$8.writev;
/* istanbul ignore next */
if (!writev) {
  // This entire block can be removed if support for earlier than Node.js
  // 12.9.0 is not needed.
  const binding = process.binding('fs');
  const FSReqWrap = binding.FSReqWrap || binding.FSReqCallback;

  writev = (fd, iovec, pos, cb) => {
    const done = (er, bw) => cb(er, bw, iovec);
    const req = new FSReqWrap();
    req.oncomplete = done;
    binding.writeBuffers(fd, iovec, pos, req);
  };
}

const _autoClose = Symbol('_autoClose');
const _close = Symbol('_close');
const _ended = Symbol('_ended');
const _fd = Symbol('_fd');
const _finished = Symbol('_finished');
const _flags = Symbol('_flags');
const _flush = Symbol('_flush');
const _handleChunk = Symbol('_handleChunk');
const _makeBuf = Symbol('_makeBuf');
const _mode = Symbol('_mode');
const _needDrain = Symbol('_needDrain');
const _onerror = Symbol('_onerror');
const _onopen = Symbol('_onopen');
const _onread = Symbol('_onread');
const _onwrite = Symbol('_onwrite');
const _open = Symbol('_open');
const _path = Symbol('_path');
const _pos = Symbol('_pos');
const _queue = Symbol('_queue');
const _read = Symbol('_read');
const _readSize = Symbol('_readSize');
const _reading = Symbol('_reading');
const _remain = Symbol('_remain');
const _size = Symbol('_size');
const _write = Symbol('_write');
const _writing = Symbol('_writing');
const _defaultFlag = Symbol('_defaultFlag');
const _errored = Symbol('_errored');

class ReadStream extends MiniPass {
  constructor (path, opt) {
    opt = opt || {};
    super(opt);

    this.readable = true;
    this.writable = false;

    if (typeof path !== 'string')
      throw new TypeError('path must be a string')

    this[_errored] = false;
    this[_fd] = typeof opt.fd === 'number' ? opt.fd : null;
    this[_path] = path;
    this[_readSize] = opt.readSize || 16*1024*1024;
    this[_reading] = false;
    this[_size] = typeof opt.size === 'number' ? opt.size : Infinity;
    this[_remain] = this[_size];
    this[_autoClose] = typeof opt.autoClose === 'boolean' ?
      opt.autoClose : true;

    if (typeof this[_fd] === 'number')
      this[_read]();
    else
      this[_open]();
  }

  get fd () { return this[_fd] }
  get path () { return this[_path] }

  write () {
    throw new TypeError('this is a readable stream')
  }

  end () {
    throw new TypeError('this is a readable stream')
  }

  [_open] () {
    fs$8.open(this[_path], 'r', (er, fd) => this[_onopen](er, fd));
  }

  [_onopen] (er, fd) {
    if (er)
      this[_onerror](er);
    else {
      this[_fd] = fd;
      this.emit('open', fd);
      this[_read]();
    }
  }

  [_makeBuf] () {
    return Buffer.allocUnsafe(Math.min(this[_readSize], this[_remain]))
  }

  [_read] () {
    if (!this[_reading]) {
      this[_reading] = true;
      const buf = this[_makeBuf]();
      /* istanbul ignore if */
      if (buf.length === 0)
        return process.nextTick(() => this[_onread](null, 0, buf))
      fs$8.read(this[_fd], buf, 0, buf.length, null, (er, br, buf) =>
        this[_onread](er, br, buf));
    }
  }

  [_onread] (er, br, buf) {
    this[_reading] = false;
    if (er)
      this[_onerror](er);
    else if (this[_handleChunk](br, buf))
      this[_read]();
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd];
      this[_fd] = null;
      fs$8.close(fd, er => er ? this.emit('error', er) : this.emit('close'));
    }
  }

  [_onerror] (er) {
    this[_reading] = true;
    this[_close]();
    this.emit('error', er);
  }

  [_handleChunk] (br, buf) {
    let ret = false;
    // no effect if infinite
    this[_remain] -= br;
    if (br > 0)
      ret = super.write(br < buf.length ? buf.slice(0, br) : buf);

    if (br === 0 || this[_remain] <= 0) {
      ret = false;
      this[_close]();
      super.end();
    }

    return ret
  }

  emit (ev, data) {
    switch (ev) {
      case 'prefinish':
      case 'finish':
        break

      case 'drain':
        if (typeof this[_fd] === 'number')
          this[_read]();
        break

      case 'error':
        if (this[_errored])
          return
        this[_errored] = true;
        return super.emit(ev, data)

      default:
        return super.emit(ev, data)
    }
  }
}

class ReadStreamSync extends ReadStream {
  [_open] () {
    let threw = true;
    try {
      this[_onopen](null, fs$8.openSync(this[_path], 'r'));
      threw = false;
    } finally {
      if (threw)
        this[_close]();
    }
  }

  [_read] () {
    let threw = true;
    try {
      if (!this[_reading]) {
        this[_reading] = true;
        do {
          const buf = this[_makeBuf]();
          /* istanbul ignore next */
          const br = buf.length === 0 ? 0
            : fs$8.readSync(this[_fd], buf, 0, buf.length, null);
          if (!this[_handleChunk](br, buf))
            break
        } while (true)
        this[_reading] = false;
      }
      threw = false;
    } finally {
      if (threw)
        this[_close]();
    }
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd];
      this[_fd] = null;
      fs$8.closeSync(fd);
      this.emit('close');
    }
  }
}

class WriteStream extends EE$1 {
  constructor (path, opt) {
    opt = opt || {};
    super(opt);
    this.readable = false;
    this.writable = true;
    this[_errored] = false;
    this[_writing] = false;
    this[_ended] = false;
    this[_needDrain] = false;
    this[_queue] = [];
    this[_path] = path;
    this[_fd] = typeof opt.fd === 'number' ? opt.fd : null;
    this[_mode] = opt.mode === undefined ? 0o666 : opt.mode;
    this[_pos] = typeof opt.start === 'number' ? opt.start : null;
    this[_autoClose] = typeof opt.autoClose === 'boolean' ?
      opt.autoClose : true;

    // truncating makes no sense when writing into the middle
    const defaultFlag = this[_pos] !== null ? 'r+' : 'w';
    this[_defaultFlag] = opt.flags === undefined;
    this[_flags] = this[_defaultFlag] ? defaultFlag : opt.flags;

    if (this[_fd] === null)
      this[_open]();
  }

  emit (ev, data) {
    if (ev === 'error') {
      if (this[_errored])
        return
      this[_errored] = true;
    }
    return super.emit(ev, data)
  }


  get fd () { return this[_fd] }
  get path () { return this[_path] }

  [_onerror] (er) {
    this[_close]();
    this[_writing] = true;
    this.emit('error', er);
  }

  [_open] () {
    fs$8.open(this[_path], this[_flags], this[_mode],
      (er, fd) => this[_onopen](er, fd));
  }

  [_onopen] (er, fd) {
    if (this[_defaultFlag] &&
        this[_flags] === 'r+' &&
        er && er.code === 'ENOENT') {
      this[_flags] = 'w';
      this[_open]();
    } else if (er)
      this[_onerror](er);
    else {
      this[_fd] = fd;
      this.emit('open', fd);
      this[_flush]();
    }
  }

  end (buf, enc) {
    if (buf)
      this.write(buf, enc);

    this[_ended] = true;

    // synthetic after-write logic, where drain/finish live
    if (!this[_writing] && !this[_queue].length &&
        typeof this[_fd] === 'number')
      this[_onwrite](null, 0);
    return this
  }

  write (buf, enc) {
    if (typeof buf === 'string')
      buf = Buffer.from(buf, enc);

    if (this[_ended]) {
      this.emit('error', new Error('write() after end()'));
      return false
    }

    if (this[_fd] === null || this[_writing] || this[_queue].length) {
      this[_queue].push(buf);
      this[_needDrain] = true;
      return false
    }

    this[_writing] = true;
    this[_write](buf);
    return true
  }

  [_write] (buf) {
    fs$8.write(this[_fd], buf, 0, buf.length, this[_pos], (er, bw) =>
      this[_onwrite](er, bw));
  }

  [_onwrite] (er, bw) {
    if (er)
      this[_onerror](er);
    else {
      if (this[_pos] !== null)
        this[_pos] += bw;
      if (this[_queue].length)
        this[_flush]();
      else {
        this[_writing] = false;

        if (this[_ended] && !this[_finished]) {
          this[_finished] = true;
          this[_close]();
          this.emit('finish');
        } else if (this[_needDrain]) {
          this[_needDrain] = false;
          this.emit('drain');
        }
      }
    }
  }

  [_flush] () {
    if (this[_queue].length === 0) {
      if (this[_ended])
        this[_onwrite](null, 0);
    } else if (this[_queue].length === 1)
      this[_write](this[_queue].pop());
    else {
      const iovec = this[_queue];
      this[_queue] = [];
      writev(this[_fd], iovec, this[_pos],
        (er, bw) => this[_onwrite](er, bw));
    }
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd];
      this[_fd] = null;
      fs$8.close(fd, er => er ? this.emit('error', er) : this.emit('close'));
    }
  }
}

class WriteStreamSync extends WriteStream {
  [_open] () {
    let fd;
    // only wrap in a try{} block if we know we'll retry, to avoid
    // the rethrow obscuring the error's source frame in most cases.
    if (this[_defaultFlag] && this[_flags] === 'r+') {
      try {
        fd = fs$8.openSync(this[_path], this[_flags], this[_mode]);
      } catch (er) {
        if (er.code === 'ENOENT') {
          this[_flags] = 'w';
          return this[_open]()
        } else
          throw er
      }
    } else
      fd = fs$8.openSync(this[_path], this[_flags], this[_mode]);

    this[_onopen](null, fd);
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd];
      this[_fd] = null;
      fs$8.closeSync(fd);
      this.emit('close');
    }
  }

  [_write] (buf) {
    // throw the original, but try to close if it fails
    let threw = true;
    try {
      this[_onwrite](null,
        fs$8.writeSync(this[_fd], buf, 0, buf.length, this[_pos]));
      threw = false;
    } finally {
      if (threw)
        try { this[_close](); } catch (_) {}
    }
  }
}

fsMinipass.ReadStream = ReadStream;
fsMinipass.ReadStreamSync = ReadStreamSync;

fsMinipass.WriteStream = WriteStream;
fsMinipass.WriteStreamSync = WriteStreamSync;

// this[BUFFER] is the remainder of a chunk if we're waiting for
// the full 512 bytes of a header to come in.  We will Buffer.concat()
// it to the next write(), which is a mem copy, but a small one.
//
// this[QUEUE] is a Yallist of entries that haven't been emitted
// yet this can only get filled up if the user keeps write()ing after
// a write() returns false, or does a write() with more than one entry
//
// We don't buffer chunks, we always parse them and either create an
// entry, or push it into the active entry.  The ReadEntry class knows
// to throw data away if .ignore=true
//
// Shift entry off the buffer when it emits 'end', and emit 'entry' for
// the next one in the list.
//
// At any time, we're pushing body chunks into the entry at WRITEENTRY,
// and waiting for 'end' on the entry at READENTRY
//
// ignored entries get .resume() called on them straight away

const warner = warnMixin;
const Header = header;
const EE = require$$0;
const Yallist = yallist;
const maxMetaEntrySize = 1024 * 1024;
const Entry = readEntry;
const Pax = pax;
const zlib = minizlib;
const { nextTick } = require$$9;

const gzipHeader = Buffer.from([0x1f, 0x8b]);
const STATE = Symbol('state');
const WRITEENTRY = Symbol('writeEntry');
const READENTRY = Symbol('readEntry');
const NEXTENTRY = Symbol('nextEntry');
const PROCESSENTRY = Symbol('processEntry');
const EX = Symbol('extendedHeader');
const GEX = Symbol('globalExtendedHeader');
const META = Symbol('meta');
const EMITMETA = Symbol('emitMeta');
const BUFFER = Symbol('buffer');
const QUEUE = Symbol('queue');
const ENDED$1 = Symbol('ended');
const EMITTEDEND = Symbol('emittedEnd');
const EMIT = Symbol('emit');
const UNZIP = Symbol('unzip');
const CONSUMECHUNK = Symbol('consumeChunk');
const CONSUMECHUNKSUB = Symbol('consumeChunkSub');
const CONSUMEBODY = Symbol('consumeBody');
const CONSUMEMETA = Symbol('consumeMeta');
const CONSUMEHEADER = Symbol('consumeHeader');
const CONSUMING = Symbol('consuming');
const BUFFERCONCAT = Symbol('bufferConcat');
const MAYBEEND = Symbol('maybeEnd');
const WRITING = Symbol('writing');
const ABORTED = Symbol('aborted');
const DONE = Symbol('onDone');
const SAW_VALID_ENTRY = Symbol('sawValidEntry');
const SAW_NULL_BLOCK = Symbol('sawNullBlock');
const SAW_EOF = Symbol('sawEOF');
const CLOSESTREAM = Symbol('closeStream');

const noop = _ => true;

var parse$1 = warner(class Parser extends EE {
  constructor (opt) {
    opt = opt || {};
    super(opt);

    this.file = opt.file || '';

    // set to boolean false when an entry starts.  1024 bytes of \0
    // is technically a valid tarball, albeit a boring one.
    this[SAW_VALID_ENTRY] = null;

    // these BADARCHIVE errors can't be detected early. listen on DONE.
    this.on(DONE, _ => {
      if (this[STATE] === 'begin' || this[SAW_VALID_ENTRY] === false) {
        // either less than 1 block of data, or all entries were invalid.
        // Either way, probably not even a tarball.
        this.warn('TAR_BAD_ARCHIVE', 'Unrecognized archive format');
      }
    });

    if (opt.ondone) {
      this.on(DONE, opt.ondone);
    } else {
      this.on(DONE, _ => {
        this.emit('prefinish');
        this.emit('finish');
        this.emit('end');
      });
    }

    this.strict = !!opt.strict;
    this.maxMetaEntrySize = opt.maxMetaEntrySize || maxMetaEntrySize;
    this.filter = typeof opt.filter === 'function' ? opt.filter : noop;
    // Unlike gzip, brotli doesn't have any magic bytes to identify it
    // Users need to explicitly tell us they're extracting a brotli file
    // Or we infer from the file extension
    const isTBR = (opt.file && (
        opt.file.endsWith('.tar.br') || opt.file.endsWith('.tbr')));
    // if it's a tbr file it MIGHT be brotli, but we don't know until
    // we look at it and verify it's not a valid tar file.
    this.brotli = !opt.gzip && opt.brotli !== undefined ? opt.brotli
      : isTBR ? undefined
      : false;

    // have to set this so that streams are ok piping into it
    this.writable = true;
    this.readable = false;

    this[QUEUE] = new Yallist();
    this[BUFFER] = null;
    this[READENTRY] = null;
    this[WRITEENTRY] = null;
    this[STATE] = 'begin';
    this[META] = '';
    this[EX] = null;
    this[GEX] = null;
    this[ENDED$1] = false;
    this[UNZIP] = null;
    this[ABORTED] = false;
    this[SAW_NULL_BLOCK] = false;
    this[SAW_EOF] = false;

    this.on('end', () => this[CLOSESTREAM]());

    if (typeof opt.onwarn === 'function') {
      this.on('warn', opt.onwarn);
    }
    if (typeof opt.onentry === 'function') {
      this.on('entry', opt.onentry);
    }
  }

  [CONSUMEHEADER] (chunk, position) {
    if (this[SAW_VALID_ENTRY] === null) {
      this[SAW_VALID_ENTRY] = false;
    }
    let header;
    try {
      header = new Header(chunk, position, this[EX], this[GEX]);
    } catch (er) {
      return this.warn('TAR_ENTRY_INVALID', er)
    }

    if (header.nullBlock) {
      if (this[SAW_NULL_BLOCK]) {
        this[SAW_EOF] = true;
        // ending an archive with no entries.  pointless, but legal.
        if (this[STATE] === 'begin') {
          this[STATE] = 'header';
        }
        this[EMIT]('eof');
      } else {
        this[SAW_NULL_BLOCK] = true;
        this[EMIT]('nullBlock');
      }
    } else {
      this[SAW_NULL_BLOCK] = false;
      if (!header.cksumValid) {
        this.warn('TAR_ENTRY_INVALID', 'checksum failure', { header });
      } else if (!header.path) {
        this.warn('TAR_ENTRY_INVALID', 'path is required', { header });
      } else {
        const type = header.type;
        if (/^(Symbolic)?Link$/.test(type) && !header.linkpath) {
          this.warn('TAR_ENTRY_INVALID', 'linkpath required', { header });
        } else if (!/^(Symbolic)?Link$/.test(type) && header.linkpath) {
          this.warn('TAR_ENTRY_INVALID', 'linkpath forbidden', { header });
        } else {
          const entry = this[WRITEENTRY] = new Entry(header, this[EX], this[GEX]);

          // we do this for meta & ignored entries as well, because they
          // are still valid tar, or else we wouldn't know to ignore them
          if (!this[SAW_VALID_ENTRY]) {
            if (entry.remain) {
              // this might be the one!
              const onend = () => {
                if (!entry.invalid) {
                  this[SAW_VALID_ENTRY] = true;
                }
              };
              entry.on('end', onend);
            } else {
              this[SAW_VALID_ENTRY] = true;
            }
          }

          if (entry.meta) {
            if (entry.size > this.maxMetaEntrySize) {
              entry.ignore = true;
              this[EMIT]('ignoredEntry', entry);
              this[STATE] = 'ignore';
              entry.resume();
            } else if (entry.size > 0) {
              this[META] = '';
              entry.on('data', c => this[META] += c);
              this[STATE] = 'meta';
            }
          } else {
            this[EX] = null;
            entry.ignore = entry.ignore || !this.filter(entry.path, entry);

            if (entry.ignore) {
              // probably valid, just not something we care about
              this[EMIT]('ignoredEntry', entry);
              this[STATE] = entry.remain ? 'ignore' : 'header';
              entry.resume();
            } else {
              if (entry.remain) {
                this[STATE] = 'body';
              } else {
                this[STATE] = 'header';
                entry.end();
              }

              if (!this[READENTRY]) {
                this[QUEUE].push(entry);
                this[NEXTENTRY]();
              } else {
                this[QUEUE].push(entry);
              }
            }
          }
        }
      }
    }
  }

  [CLOSESTREAM] () {
    nextTick(() => this.emit('close'));
  }

  [PROCESSENTRY] (entry) {
    let go = true;

    if (!entry) {
      this[READENTRY] = null;
      go = false;
    } else if (Array.isArray(entry)) {
      this.emit.apply(this, entry);
    } else {
      this[READENTRY] = entry;
      this.emit('entry', entry);
      if (!entry.emittedEnd) {
        entry.on('end', _ => this[NEXTENTRY]());
        go = false;
      }
    }

    return go
  }

  [NEXTENTRY] () {
    do {} while (this[PROCESSENTRY](this[QUEUE].shift()))

    if (!this[QUEUE].length) {
      // At this point, there's nothing in the queue, but we may have an
      // entry which is being consumed (readEntry).
      // If we don't, then we definitely can handle more data.
      // If we do, and either it's flowing, or it has never had any data
      // written to it, then it needs more.
      // The only other possibility is that it has returned false from a
      // write() call, so we wait for the next drain to continue.
      const re = this[READENTRY];
      const drainNow = !re || re.flowing || re.size === re.remain;
      if (drainNow) {
        if (!this[WRITING]) {
          this.emit('drain');
        }
      } else {
        re.once('drain', _ => this.emit('drain'));
      }
    }
  }

  [CONSUMEBODY] (chunk, position) {
    // write up to but no  more than writeEntry.blockRemain
    const entry = this[WRITEENTRY];
    const br = entry.blockRemain;
    const c = (br >= chunk.length && position === 0) ? chunk
      : chunk.slice(position, position + br);

    entry.write(c);

    if (!entry.blockRemain) {
      this[STATE] = 'header';
      this[WRITEENTRY] = null;
      entry.end();
    }

    return c.length
  }

  [CONSUMEMETA] (chunk, position) {
    const entry = this[WRITEENTRY];
    const ret = this[CONSUMEBODY](chunk, position);

    // if we finished, then the entry is reset
    if (!this[WRITEENTRY]) {
      this[EMITMETA](entry);
    }

    return ret
  }

  [EMIT] (ev, data, extra) {
    if (!this[QUEUE].length && !this[READENTRY]) {
      this.emit(ev, data, extra);
    } else {
      this[QUEUE].push([ev, data, extra]);
    }
  }

  [EMITMETA] (entry) {
    this[EMIT]('meta', this[META]);
    switch (entry.type) {
      case 'ExtendedHeader':
      case 'OldExtendedHeader':
        this[EX] = Pax.parse(this[META], this[EX], false);
        break

      case 'GlobalExtendedHeader':
        this[GEX] = Pax.parse(this[META], this[GEX], true);
        break

      case 'NextFileHasLongPath':
      case 'OldGnuLongPath':
        this[EX] = this[EX] || Object.create(null);
        this[EX].path = this[META].replace(/\0.*/, '');
        break

      case 'NextFileHasLongLinkpath':
        this[EX] = this[EX] || Object.create(null);
        this[EX].linkpath = this[META].replace(/\0.*/, '');
        break

      /* istanbul ignore next */
      default: throw new Error('unknown meta: ' + entry.type)
    }
  }

  abort (error) {
    this[ABORTED] = true;
    this.emit('abort', error);
    // always throws, even in non-strict mode
    this.warn('TAR_ABORT', error, { recoverable: false });
  }

  write (chunk) {
    if (this[ABORTED]) {
      return
    }

    // first write, might be gzipped
    const needSniff = this[UNZIP] === null ||
      this.brotli === undefined && this[UNZIP] === false;
    if (needSniff && chunk) {
      if (this[BUFFER]) {
        chunk = Buffer.concat([this[BUFFER], chunk]);
        this[BUFFER] = null;
      }
      if (chunk.length < gzipHeader.length) {
        this[BUFFER] = chunk;
        return true
      }

      // look for gzip header
      for (let i = 0; this[UNZIP] === null && i < gzipHeader.length; i++) {
        if (chunk[i] !== gzipHeader[i]) {
          this[UNZIP] = false;
        }
      }

      const maybeBrotli = this.brotli === undefined;
      if (this[UNZIP] === false && maybeBrotli) {
        // read the first header to see if it's a valid tar file. If so,
        // we can safely assume that it's not actually brotli, despite the
        // .tbr or .tar.br file extension.
        // if we ended before getting a full chunk, yes, def brotli
        if (chunk.length < 512) {
          if (this[ENDED$1]) {
            this.brotli = true;
          } else {
            this[BUFFER] = chunk;
            return true
          }
        } else {
          // if it's tar, it's pretty reliably not brotli, chances of
          // that happening are astronomical.
          try {
            new Header(chunk.slice(0, 512));
            this.brotli = false;
          } catch (_) {
            this.brotli = true;
          }
        }
      }

      if (this[UNZIP] === null || (this[UNZIP] === false && this.brotli)) {
        const ended = this[ENDED$1];
        this[ENDED$1] = false;
        this[UNZIP] = this[UNZIP] === null
          ? new zlib.Unzip()
          : new zlib.BrotliDecompress();
        this[UNZIP].on('data', chunk => this[CONSUMECHUNK](chunk));
        this[UNZIP].on('error', er => this.abort(er));
        this[UNZIP].on('end', _ => {
          this[ENDED$1] = true;
          this[CONSUMECHUNK]();
        });
        this[WRITING] = true;
        const ret = this[UNZIP][ended ? 'end' : 'write'](chunk);
        this[WRITING] = false;
        return ret
      }
    }

    this[WRITING] = true;
    if (this[UNZIP]) {
      this[UNZIP].write(chunk);
    } else {
      this[CONSUMECHUNK](chunk);
    }
    this[WRITING] = false;

    // return false if there's a queue, or if the current entry isn't flowing
    const ret =
      this[QUEUE].length ? false :
      this[READENTRY] ? this[READENTRY].flowing :
      true;

    // if we have no queue, then that means a clogged READENTRY
    if (!ret && !this[QUEUE].length) {
      this[READENTRY].once('drain', _ => this.emit('drain'));
    }

    return ret
  }

  [BUFFERCONCAT] (c) {
    if (c && !this[ABORTED]) {
      this[BUFFER] = this[BUFFER] ? Buffer.concat([this[BUFFER], c]) : c;
    }
  }

  [MAYBEEND] () {
    if (this[ENDED$1] &&
        !this[EMITTEDEND] &&
        !this[ABORTED] &&
        !this[CONSUMING]) {
      this[EMITTEDEND] = true;
      const entry = this[WRITEENTRY];
      if (entry && entry.blockRemain) {
        // truncated, likely a damaged file
        const have = this[BUFFER] ? this[BUFFER].length : 0;
        this.warn('TAR_BAD_ARCHIVE', `Truncated input (needed ${
          entry.blockRemain} more bytes, only ${have} available)`, { entry });
        if (this[BUFFER]) {
          entry.write(this[BUFFER]);
        }
        entry.end();
      }
      this[EMIT](DONE);
    }
  }

  [CONSUMECHUNK] (chunk) {
    if (this[CONSUMING]) {
      this[BUFFERCONCAT](chunk);
    } else if (!chunk && !this[BUFFER]) {
      this[MAYBEEND]();
    } else {
      this[CONSUMING] = true;
      if (this[BUFFER]) {
        this[BUFFERCONCAT](chunk);
        const c = this[BUFFER];
        this[BUFFER] = null;
        this[CONSUMECHUNKSUB](c);
      } else {
        this[CONSUMECHUNKSUB](chunk);
      }

      while (this[BUFFER] &&
          this[BUFFER].length >= 512 &&
          !this[ABORTED] &&
          !this[SAW_EOF]) {
        const c = this[BUFFER];
        this[BUFFER] = null;
        this[CONSUMECHUNKSUB](c);
      }
      this[CONSUMING] = false;
    }

    if (!this[BUFFER] || this[ENDED$1]) {
      this[MAYBEEND]();
    }
  }

  [CONSUMECHUNKSUB] (chunk) {
    // we know that we are in CONSUMING mode, so anything written goes into
    // the buffer.  Advance the position and put any remainder in the buffer.
    let position = 0;
    const length = chunk.length;
    while (position + 512 <= length && !this[ABORTED] && !this[SAW_EOF]) {
      switch (this[STATE]) {
        case 'begin':
        case 'header':
          this[CONSUMEHEADER](chunk, position);
          position += 512;
          break

        case 'ignore':
        case 'body':
          position += this[CONSUMEBODY](chunk, position);
          break

        case 'meta':
          position += this[CONSUMEMETA](chunk, position);
          break

        /* istanbul ignore next */
        default:
          throw new Error('invalid state: ' + this[STATE])
      }
    }

    if (position < length) {
      if (this[BUFFER]) {
        this[BUFFER] = Buffer.concat([chunk.slice(position), this[BUFFER]]);
      } else {
        this[BUFFER] = chunk.slice(position);
      }
    }
  }

  end (chunk) {
    if (!this[ABORTED]) {
      if (this[UNZIP]) {
        this[UNZIP].end(chunk);
      } else {
        this[ENDED$1] = true;
        if (this.brotli === undefined) chunk = chunk || Buffer.alloc(0);
        this.write(chunk);
      }
    }
  }
});

var mkdir$1 = {exports: {}};

const { promisify } = require$$0$5;
const fs$7 = require$$0__default;
const optsArg$1 = opts => {
  if (!opts)
    opts = { mode: 0o777, fs: fs$7 };
  else if (typeof opts === 'object')
    opts = { mode: 0o777, fs: fs$7, ...opts };
  else if (typeof opts === 'number')
    opts = { mode: opts, fs: fs$7 };
  else if (typeof opts === 'string')
    opts = { mode: parseInt(opts, 8), fs: fs$7 };
  else
    throw new TypeError('invalid options argument')

  opts.mkdir = opts.mkdir || opts.fs.mkdir || fs$7.mkdir;
  opts.mkdirAsync = promisify(opts.mkdir);
  opts.stat = opts.stat || opts.fs.stat || fs$7.stat;
  opts.statAsync = promisify(opts.stat);
  opts.statSync = opts.statSync || opts.fs.statSync || fs$7.statSync;
  opts.mkdirSync = opts.mkdirSync || opts.fs.mkdirSync || fs$7.mkdirSync;
  return opts
};
var optsArg_1 = optsArg$1;

const platform$3 = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform;
const { resolve, parse } = require$$0$4;
const pathArg$1 = path => {
  if (/\0/.test(path)) {
    // simulate same failure that node raises
    throw Object.assign(
      new TypeError('path must be a string without null bytes'),
      {
        path,
        code: 'ERR_INVALID_ARG_VALUE',
      }
    )
  }

  path = resolve(path);
  if (platform$3 === 'win32') {
    const badWinChars = /[*|"<>?:]/;
    const {root} = parse(path);
    if (badWinChars.test(path.substr(root.length))) {
      throw Object.assign(new Error('Illegal characters in path.'), {
        path,
        code: 'EINVAL',
      })
    }
  }

  return path
};
var pathArg_1 = pathArg$1;

const {dirname: dirname$2} = require$$0$4;

const findMade$1 = (opts, parent, path = undefined) => {
  // we never want the 'made' return value to be a root directory
  if (path === parent)
    return Promise.resolve()

  return opts.statAsync(parent).then(
    st => st.isDirectory() ? path : undefined, // will fail later
    er => er.code === 'ENOENT'
      ? findMade$1(opts, dirname$2(parent), parent)
      : undefined
  )
};

const findMadeSync$1 = (opts, parent, path = undefined) => {
  if (path === parent)
    return undefined

  try {
    return opts.statSync(parent).isDirectory() ? path : undefined
  } catch (er) {
    return er.code === 'ENOENT'
      ? findMadeSync$1(opts, dirname$2(parent), parent)
      : undefined
  }
};

var findMade_1 = {findMade: findMade$1, findMadeSync: findMadeSync$1};

const {dirname: dirname$1} = require$$0$4;

const mkdirpManual$2 = (path, opts, made) => {
  opts.recursive = false;
  const parent = dirname$1(path);
  if (parent === path) {
    return opts.mkdirAsync(path, opts).catch(er => {
      // swallowed by recursive implementation on posix systems
      // any other error is a failure
      if (er.code !== 'EISDIR')
        throw er
    })
  }

  return opts.mkdirAsync(path, opts).then(() => made || path, er => {
    if (er.code === 'ENOENT')
      return mkdirpManual$2(parent, opts)
        .then(made => mkdirpManual$2(path, opts, made))
    if (er.code !== 'EEXIST' && er.code !== 'EROFS')
      throw er
    return opts.statAsync(path).then(st => {
      if (st.isDirectory())
        return made
      else
        throw er
    }, () => { throw er })
  })
};

const mkdirpManualSync$2 = (path, opts, made) => {
  const parent = dirname$1(path);
  opts.recursive = false;

  if (parent === path) {
    try {
      return opts.mkdirSync(path, opts)
    } catch (er) {
      // swallowed by recursive implementation on posix systems
      // any other error is a failure
      if (er.code !== 'EISDIR')
        throw er
      else
        return
    }
  }

  try {
    opts.mkdirSync(path, opts);
    return made || path
  } catch (er) {
    if (er.code === 'ENOENT')
      return mkdirpManualSync$2(path, opts, mkdirpManualSync$2(parent, opts, made))
    if (er.code !== 'EEXIST' && er.code !== 'EROFS')
      throw er
    try {
      if (!opts.statSync(path).isDirectory())
        throw er
    } catch (_) {
      throw er
    }
  }
};

var mkdirpManual_1 = {mkdirpManual: mkdirpManual$2, mkdirpManualSync: mkdirpManualSync$2};

const {dirname} = require$$0$4;
const {findMade, findMadeSync} = findMade_1;
const {mkdirpManual: mkdirpManual$1, mkdirpManualSync: mkdirpManualSync$1} = mkdirpManual_1;

const mkdirpNative$1 = (path, opts) => {
  opts.recursive = true;
  const parent = dirname(path);
  if (parent === path)
    return opts.mkdirAsync(path, opts)

  return findMade(opts, path).then(made =>
    opts.mkdirAsync(path, opts).then(() => made)
    .catch(er => {
      if (er.code === 'ENOENT')
        return mkdirpManual$1(path, opts)
      else
        throw er
    }))
};

const mkdirpNativeSync$1 = (path, opts) => {
  opts.recursive = true;
  const parent = dirname(path);
  if (parent === path)
    return opts.mkdirSync(path, opts)

  const made = findMadeSync(opts, path);
  try {
    opts.mkdirSync(path, opts);
    return made
  } catch (er) {
    if (er.code === 'ENOENT')
      return mkdirpManualSync$1(path, opts)
    else
      throw er
  }
};

var mkdirpNative_1 = {mkdirpNative: mkdirpNative$1, mkdirpNativeSync: mkdirpNativeSync$1};

const fs$6 = require$$0__default;

const version = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version;
const versArr = version.replace(/^v/, '').split('.');
const hasNative = +versArr[0] > 10 || +versArr[0] === 10 && +versArr[1] >= 12;

const useNative$1 = !hasNative ? () => false : opts => opts.mkdir === fs$6.mkdir;
const useNativeSync$1 = !hasNative ? () => false : opts => opts.mkdirSync === fs$6.mkdirSync;

var useNative_1 = {useNative: useNative$1, useNativeSync: useNativeSync$1};

const optsArg = optsArg_1;
const pathArg = pathArg_1;

const {mkdirpNative, mkdirpNativeSync} = mkdirpNative_1;
const {mkdirpManual, mkdirpManualSync} = mkdirpManual_1;
const {useNative, useNativeSync} = useNative_1;


const mkdirp$1 = (path, opts) => {
  path = pathArg(path);
  opts = optsArg(opts);
  return useNative(opts)
    ? mkdirpNative(path, opts)
    : mkdirpManual(path, opts)
};

const mkdirpSync = (path, opts) => {
  path = pathArg(path);
  opts = optsArg(opts);
  return useNativeSync(opts)
    ? mkdirpNativeSync(path, opts)
    : mkdirpManualSync(path, opts)
};

mkdirp$1.sync = mkdirpSync;
mkdirp$1.native = (path, opts) => mkdirpNative(pathArg(path), optsArg(opts));
mkdirp$1.manual = (path, opts) => mkdirpManual(pathArg(path), optsArg(opts));
mkdirp$1.nativeSync = (path, opts) => mkdirpNativeSync(pathArg(path), optsArg(opts));
mkdirp$1.manualSync = (path, opts) => mkdirpManualSync(pathArg(path), optsArg(opts));

var mkdirp_1 = mkdirp$1;

const fs$5 = require$$0__default;
const path$3 = require$$0$4;

/* istanbul ignore next */
const LCHOWN = fs$5.lchown ? 'lchown' : 'chown';
/* istanbul ignore next */
const LCHOWNSYNC = fs$5.lchownSync ? 'lchownSync' : 'chownSync';

/* istanbul ignore next */
const needEISDIRHandled = fs$5.lchown &&
  !process.version.match(/v1[1-9]+\./) &&
  !process.version.match(/v10\.[6-9]/);

const lchownSync = (path, uid, gid) => {
  try {
    return fs$5[LCHOWNSYNC](path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
};

/* istanbul ignore next */
const chownSync = (path, uid, gid) => {
  try {
    return fs$5.chownSync(path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
};

/* istanbul ignore next */
const handleEISDIR =
  needEISDIRHandled ? (path, uid, gid, cb) => er => {
    // Node prior to v10 had a very questionable implementation of
    // fs.lchown, which would always try to call fs.open on a directory
    // Fall back to fs.chown in those cases.
    if (!er || er.code !== 'EISDIR')
      cb(er);
    else
      fs$5.chown(path, uid, gid, cb);
  }
  : (_, __, ___, cb) => cb;

/* istanbul ignore next */
const handleEISDirSync =
  needEISDIRHandled ? (path, uid, gid) => {
    try {
      return lchownSync(path, uid, gid)
    } catch (er) {
      if (er.code !== 'EISDIR')
        throw er
      chownSync(path, uid, gid);
    }
  }
  : (path, uid, gid) => lchownSync(path, uid, gid);

// fs.readdir could only accept an options object as of node v6
const nodeVersion = process.version;
let readdir = (path, options, cb) => fs$5.readdir(path, options, cb);
let readdirSync = (path, options) => fs$5.readdirSync(path, options);
/* istanbul ignore next */
if (/^v4\./.test(nodeVersion))
  readdir = (path, options, cb) => fs$5.readdir(path, cb);

const chown = (cpath, uid, gid, cb) => {
  fs$5[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, er => {
    // Skip ENOENT error
    cb(er && er.code !== 'ENOENT' ? er : null);
  }));
};

const chownrKid = (p, child, uid, gid, cb) => {
  if (typeof child === 'string')
    return fs$5.lstat(path$3.resolve(p, child), (er, stats) => {
      // Skip ENOENT error
      if (er)
        return cb(er.code !== 'ENOENT' ? er : null)
      stats.name = child;
      chownrKid(p, stats, uid, gid, cb);
    })

  if (child.isDirectory()) {
    chownr$1(path$3.resolve(p, child.name), uid, gid, er => {
      if (er)
        return cb(er)
      const cpath = path$3.resolve(p, child.name);
      chown(cpath, uid, gid, cb);
    });
  } else {
    const cpath = path$3.resolve(p, child.name);
    chown(cpath, uid, gid, cb);
  }
};


const chownr$1 = (p, uid, gid, cb) => {
  readdir(p, { withFileTypes: true }, (er, children) => {
    // any error other than ENOTDIR or ENOTSUP means it's not readable,
    // or doesn't exist.  give up.
    if (er) {
      if (er.code === 'ENOENT')
        return cb()
      else if (er.code !== 'ENOTDIR' && er.code !== 'ENOTSUP')
        return cb(er)
    }
    if (er || !children.length)
      return chown(p, uid, gid, cb)

    let len = children.length;
    let errState = null;
    const then = er => {
      if (errState)
        return
      if (er)
        return cb(errState = er)
      if (-- len === 0)
        return chown(p, uid, gid, cb)
    };

    children.forEach(child => chownrKid(p, child, uid, gid, then));
  });
};

const chownrKidSync = (p, child, uid, gid) => {
  if (typeof child === 'string') {
    try {
      const stats = fs$5.lstatSync(path$3.resolve(p, child));
      stats.name = child;
      child = stats;
    } catch (er) {
      if (er.code === 'ENOENT')
        return
      else
        throw er
    }
  }

  if (child.isDirectory())
    chownrSync(path$3.resolve(p, child.name), uid, gid);

  handleEISDirSync(path$3.resolve(p, child.name), uid, gid);
};

const chownrSync = (p, uid, gid) => {
  let children;
  try {
    children = readdirSync(p, { withFileTypes: true });
  } catch (er) {
    if (er.code === 'ENOENT')
      return
    else if (er.code === 'ENOTDIR' || er.code === 'ENOTSUP')
      return handleEISDirSync(p, uid, gid)
    else
      throw er
  }

  if (children && children.length)
    children.forEach(child => chownrKidSync(p, child, uid, gid));

  return handleEISDirSync(p, uid, gid)
};

var chownr_1 = chownr$1;
chownr$1.sync = chownrSync;

// wrapper around mkdirp for tar's needs.

// TODO: This should probably be a class, not functionally
// passing around state in a gazillion args.

const mkdirp = mkdirp_1;
const fs$4 = require$$0__default;
const path$2 = require$$0$4;
const chownr = chownr_1;
const normPath$1 = normalizeWindowsPath;

class SymlinkError extends Error {
  constructor (symlink, path) {
    super('Cannot extract through symbolic link');
    this.path = path;
    this.symlink = symlink;
  }

  get name () {
    return 'SylinkError'
  }
}

class CwdError extends Error {
  constructor (path, code) {
    super(code + ': Cannot cd into \'' + path + '\'');
    this.path = path;
    this.code = code;
  }

  get name () {
    return 'CwdError'
  }
}

const cGet = (cache, key) => cache.get(normPath$1(key));
const cSet = (cache, key, val) => cache.set(normPath$1(key), val);

const checkCwd = (dir, cb) => {
  fs$4.stat(dir, (er, st) => {
    if (er || !st.isDirectory()) {
      er = new CwdError(dir, er && er.code || 'ENOTDIR');
    }
    cb(er);
  });
};

mkdir$1.exports = (dir, opt, cb) => {
  dir = normPath$1(dir);

  // if there's any overlap between mask and mode,
  // then we'll need an explicit chmod
  const umask = opt.umask;
  const mode = opt.mode | 0o0700;
  const needChmod = (mode & umask) !== 0;

  const uid = opt.uid;
  const gid = opt.gid;
  const doChown = typeof uid === 'number' &&
    typeof gid === 'number' &&
    (uid !== opt.processUid || gid !== opt.processGid);

  const preserve = opt.preserve;
  const unlink = opt.unlink;
  const cache = opt.cache;
  const cwd = normPath$1(opt.cwd);

  const done = (er, created) => {
    if (er) {
      cb(er);
    } else {
      cSet(cache, dir, true);
      if (created && doChown) {
        chownr(created, uid, gid, er => done(er));
      } else if (needChmod) {
        fs$4.chmod(dir, mode, cb);
      } else {
        cb();
      }
    }
  };

  if (cache && cGet(cache, dir) === true) {
    return done()
  }

  if (dir === cwd) {
    return checkCwd(dir, done)
  }

  if (preserve) {
    return mkdirp(dir, { mode }).then(made => done(null, made), done)
  }

  const sub = normPath$1(path$2.relative(cwd, dir));
  const parts = sub.split('/');
  mkdir_(cwd, parts, mode, cache, unlink, cwd, null, done);
};

const mkdir_ = (base, parts, mode, cache, unlink, cwd, created, cb) => {
  if (!parts.length) {
    return cb(null, created)
  }
  const p = parts.shift();
  const part = normPath$1(path$2.resolve(base + '/' + p));
  if (cGet(cache, part)) {
    return mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
  }
  fs$4.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb));
};

const onmkdir = (part, parts, mode, cache, unlink, cwd, created, cb) => er => {
  if (er) {
    fs$4.lstat(part, (statEr, st) => {
      if (statEr) {
        statEr.path = statEr.path && normPath$1(statEr.path);
        cb(statEr);
      } else if (st.isDirectory()) {
        mkdir_(part, parts, mode, cache, unlink, cwd, created, cb);
      } else if (unlink) {
        fs$4.unlink(part, er => {
          if (er) {
            return cb(er)
          }
          fs$4.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb));
        });
      } else if (st.isSymbolicLink()) {
        return cb(new SymlinkError(part, part + '/' + parts.join('/')))
      } else {
        cb(er);
      }
    });
  } else {
    created = created || part;
    mkdir_(part, parts, mode, cache, unlink, cwd, created, cb);
  }
};

const checkCwdSync = dir => {
  let ok = false;
  let code = 'ENOTDIR';
  try {
    ok = fs$4.statSync(dir).isDirectory();
  } catch (er) {
    code = er.code;
  } finally {
    if (!ok) {
      throw new CwdError(dir, code)
    }
  }
};

mkdir$1.exports.sync = (dir, opt) => {
  dir = normPath$1(dir);
  // if there's any overlap between mask and mode,
  // then we'll need an explicit chmod
  const umask = opt.umask;
  const mode = opt.mode | 0o0700;
  const needChmod = (mode & umask) !== 0;

  const uid = opt.uid;
  const gid = opt.gid;
  const doChown = typeof uid === 'number' &&
    typeof gid === 'number' &&
    (uid !== opt.processUid || gid !== opt.processGid);

  const preserve = opt.preserve;
  const unlink = opt.unlink;
  const cache = opt.cache;
  const cwd = normPath$1(opt.cwd);

  const done = (created) => {
    cSet(cache, dir, true);
    if (created && doChown) {
      chownr.sync(created, uid, gid);
    }
    if (needChmod) {
      fs$4.chmodSync(dir, mode);
    }
  };

  if (cache && cGet(cache, dir) === true) {
    return done()
  }

  if (dir === cwd) {
    checkCwdSync(cwd);
    return done()
  }

  if (preserve) {
    return done(mkdirp.sync(dir, mode))
  }

  const sub = normPath$1(path$2.relative(cwd, dir));
  const parts = sub.split('/');
  let created = null;
  for (let p = parts.shift(), part = cwd;
    p && (part += '/' + p);
    p = parts.shift()) {
    part = normPath$1(path$2.resolve(part));
    if (cGet(cache, part)) {
      continue
    }

    try {
      fs$4.mkdirSync(part, mode);
      created = created || part;
      cSet(cache, part, true);
    } catch (er) {
      const st = fs$4.lstatSync(part);
      if (st.isDirectory()) {
        cSet(cache, part, true);
        continue
      } else if (unlink) {
        fs$4.unlinkSync(part);
        fs$4.mkdirSync(part, mode);
        created = created || part;
        cSet(cache, part, true);
        continue
      } else if (st.isSymbolicLink()) {
        return new SymlinkError(part, part + '/' + parts.join('/'))
      }
    }
  }

  return done(created)
};

var mkdirExports = mkdir$1.exports;

// warning: extremely hot code path.
// This has been meticulously optimized for use
// within npm install on large package trees.
// Do not edit without careful benchmarking.
const normalizeCache = Object.create(null);
const { hasOwnProperty } = Object.prototype;
var normalizeUnicode = s => {
  if (!hasOwnProperty.call(normalizeCache, s)) {
    normalizeCache[s] = s.normalize('NFD');
  }
  return normalizeCache[s]
};

// A path exclusive reservation system
// reserve([list, of, paths], fn)
// When the fn is first in line for all its paths, it
// is called with a cb that clears the reservation.
//
// Used by async unpack to avoid clobbering paths in use,
// while still allowing maximal safe parallelization.

const assert$1 = require$$0$3;
const normalize$1 = normalizeUnicode;
const stripSlashes = stripTrailingSlashes;
const { join } = require$$0$4;

const platform$2 = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
const isWindows$2 = platform$2 === 'win32';

var pathReservations$1 = () => {
  // path => [function or Set]
  // A Set object means a directory reservation
  // A fn is a direct reservation on that path
  const queues = new Map();

  // fn => {paths:[path,...], dirs:[path, ...]}
  const reservations = new Map();

  // return a set of parent dirs for a given path
  // '/a/b/c/d' -> ['/', '/a', '/a/b', '/a/b/c', '/a/b/c/d']
  const getDirs = path => {
    const dirs = path.split('/').slice(0, -1).reduce((set, path) => {
      if (set.length) {
        path = join(set[set.length - 1], path);
      }
      set.push(path || '/');
      return set
    }, []);
    return dirs
  };

  // functions currently running
  const running = new Set();

  // return the queues for each path the function cares about
  // fn => {paths, dirs}
  const getQueues = fn => {
    const res = reservations.get(fn);
    /* istanbul ignore if - unpossible */
    if (!res) {
      throw new Error('function does not have any path reservations')
    }
    return {
      paths: res.paths.map(path => queues.get(path)),
      dirs: [...res.dirs].map(path => queues.get(path)),
    }
  };

  // check if fn is first in line for all its paths, and is
  // included in the first set for all its dir queues
  const check = fn => {
    const { paths, dirs } = getQueues(fn);
    return paths.every(q => q[0] === fn) &&
      dirs.every(q => q[0] instanceof Set && q[0].has(fn))
  };

  // run the function if it's first in line and not already running
  const run = fn => {
    if (running.has(fn) || !check(fn)) {
      return false
    }
    running.add(fn);
    fn(() => clear(fn));
    return true
  };

  const clear = fn => {
    if (!running.has(fn)) {
      return false
    }

    const { paths, dirs } = reservations.get(fn);
    const next = new Set();

    paths.forEach(path => {
      const q = queues.get(path);
      assert$1.equal(q[0], fn);
      if (q.length === 1) {
        queues.delete(path);
      } else {
        q.shift();
        if (typeof q[0] === 'function') {
          next.add(q[0]);
        } else {
          q[0].forEach(fn => next.add(fn));
        }
      }
    });

    dirs.forEach(dir => {
      const q = queues.get(dir);
      assert$1(q[0] instanceof Set);
      if (q[0].size === 1 && q.length === 1) {
        queues.delete(dir);
      } else if (q[0].size === 1) {
        q.shift();

        // must be a function or else the Set would've been reused
        next.add(q[0]);
      } else {
        q[0].delete(fn);
      }
    });
    running.delete(fn);

    next.forEach(fn => run(fn));
    return true
  };

  const reserve = (paths, fn) => {
    // collide on matches across case and unicode normalization
    // On windows, thanks to the magic of 8.3 shortnames, it is fundamentally
    // impossible to determine whether two paths refer to the same thing on
    // disk, without asking the kernel for a shortname.
    // So, we just pretend that every path matches every other path here,
    // effectively removing all parallelization on windows.
    paths = isWindows$2 ? ['win32 parallelization disabled'] : paths.map(p => {
      // don't need normPath, because we skip this entirely for windows
      return stripSlashes(join(normalize$1(p))).toLowerCase()
    });

    const dirs = new Set(
      paths.map(path => getDirs(path)).reduce((a, b) => a.concat(b))
    );
    reservations.set(fn, { dirs, paths });
    paths.forEach(path => {
      const q = queues.get(path);
      if (!q) {
        queues.set(path, [fn]);
      } else {
        q.push(fn);
      }
    });
    dirs.forEach(dir => {
      const q = queues.get(dir);
      if (!q) {
        queues.set(dir, [new Set([fn])]);
      } else if (q[q.length - 1] instanceof Set) {
        q[q.length - 1].add(fn);
      } else {
        q.push(new Set([fn]));
      }
    });

    return run(fn)
  };

  return { check, reserve }
};

// Get the appropriate flag to use for creating files
// We use fmap on Windows platforms for files less than
// 512kb.  This is a fairly low limit, but avoids making
// things slower in some cases.  Since most of what this
// library is used for is extracting tarballs of many
// relatively small files in npm packages and the like,
// it can be a big boost on Windows platforms.
// Only supported in Node v12.9.0 and above.
const platform$1 = process.env.__FAKE_PLATFORM__ || process.platform;
const isWindows$1 = platform$1 === 'win32';
const fs$3 = commonjsGlobal.__FAKE_TESTING_FS__ || require$$0__default;

/* istanbul ignore next */
const { O_CREAT, O_TRUNC, O_WRONLY, UV_FS_O_FILEMAP = 0 } = fs$3.constants;

const fMapEnabled = isWindows$1 && !!UV_FS_O_FILEMAP;
const fMapLimit = 512 * 1024;
const fMapFlag = UV_FS_O_FILEMAP | O_TRUNC | O_CREAT | O_WRONLY;
var getWriteFlag = !fMapEnabled ? () => 'w'
  : size => size < fMapLimit ? fMapFlag : 'w';

// the PEND/UNPEND stuff tracks whether we're ready to emit end/close yet.
// but the path reservations are required to avoid race conditions where
// parallelized unpack ops may mess with one another, due to dependencies
// (like a Link depending on its target) or destructive operations (like
// clobbering an fs object to create one of a different type.)

const assert = require$$0$3;
const Parser = parse$1;
const fs$2 = require$$0__default;
const fsm$1 = fsMinipass;
const path$1 = require$$0$4;
const mkdir = mkdirExports;
const wc = winchars$1;
const pathReservations = pathReservations$1;
const stripAbsolutePath = stripAbsolutePath$2;
const normPath = normalizeWindowsPath;
const stripSlash$1 = stripTrailingSlashes;
const normalize = normalizeUnicode;

const ONENTRY = Symbol('onEntry');
const CHECKFS = Symbol('checkFs');
const CHECKFS2 = Symbol('checkFs2');
const PRUNECACHE = Symbol('pruneCache');
const ISREUSABLE = Symbol('isReusable');
const MAKEFS = Symbol('makeFs');
const FILE = Symbol('file');
const DIRECTORY = Symbol('directory');
const LINK = Symbol('link');
const SYMLINK = Symbol('symlink');
const HARDLINK = Symbol('hardlink');
const UNSUPPORTED = Symbol('unsupported');
const CHECKPATH = Symbol('checkPath');
const MKDIR = Symbol('mkdir');
const ONERROR = Symbol('onError');
const PENDING = Symbol('pending');
const PEND = Symbol('pend');
const UNPEND = Symbol('unpend');
const ENDED = Symbol('ended');
const MAYBECLOSE = Symbol('maybeClose');
const SKIP = Symbol('skip');
const DOCHOWN = Symbol('doChown');
const UID = Symbol('uid');
const GID = Symbol('gid');
const CHECKED_CWD = Symbol('checkedCwd');
const crypto = require$$0$6;
const getFlag = getWriteFlag;
const platform = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
const isWindows = platform === 'win32';

// Unlinks on Windows are not atomic.
//
// This means that if you have a file entry, followed by another
// file entry with an identical name, and you cannot re-use the file
// (because it's a hardlink, or because unlink:true is set, or it's
// Windows, which does not have useful nlink values), then the unlink
// will be committed to the disk AFTER the new file has been written
// over the old one, deleting the new file.
//
// To work around this, on Windows systems, we rename the file and then
// delete the renamed file.  It's a sloppy kludge, but frankly, I do not
// know of a better way to do this, given windows' non-atomic unlink
// semantics.
//
// See: https://github.com/npm/node-tar/issues/183
/* istanbul ignore next */
const unlinkFile = (path, cb) => {
  if (!isWindows) {
    return fs$2.unlink(path, cb)
  }

  const name = path + '.DELETE.' + crypto.randomBytes(16).toString('hex');
  fs$2.rename(path, name, er => {
    if (er) {
      return cb(er)
    }
    fs$2.unlink(name, cb);
  });
};

/* istanbul ignore next */
const unlinkFileSync = path => {
  if (!isWindows) {
    return fs$2.unlinkSync(path)
  }

  const name = path + '.DELETE.' + crypto.randomBytes(16).toString('hex');
  fs$2.renameSync(path, name);
  fs$2.unlinkSync(name);
};

// this.gid, entry.gid, this.processUid
const uint32 = (a, b, c) =>
  a === a >>> 0 ? a
  : b === b >>> 0 ? b
  : c;

// clear the cache if it's a case-insensitive unicode-squashing match.
// we can't know if the current file system is case-sensitive or supports
// unicode fully, so we check for similarity on the maximally compatible
// representation.  Err on the side of pruning, since all it's doing is
// preventing lstats, and it's not the end of the world if we get a false
// positive.
// Note that on windows, we always drop the entire cache whenever a
// symbolic link is encountered, because 8.3 filenames are impossible
// to reason about, and collisions are hazards rather than just failures.
const cacheKeyNormalize = path => stripSlash$1(normPath(normalize(path)))
  .toLowerCase();

const pruneCache = (cache, abs) => {
  abs = cacheKeyNormalize(abs);
  for (const path of cache.keys()) {
    const pnorm = cacheKeyNormalize(path);
    if (pnorm === abs || pnorm.indexOf(abs + '/') === 0) {
      cache.delete(path);
    }
  }
};

const dropCache = cache => {
  for (const key of cache.keys()) {
    cache.delete(key);
  }
};

let Unpack$1 = class Unpack extends Parser {
  constructor (opt) {
    if (!opt) {
      opt = {};
    }

    opt.ondone = _ => {
      this[ENDED] = true;
      this[MAYBECLOSE]();
    };

    super(opt);

    this[CHECKED_CWD] = false;

    this.reservations = pathReservations();

    this.transform = typeof opt.transform === 'function' ? opt.transform : null;

    this.writable = true;
    this.readable = false;

    this[PENDING] = 0;
    this[ENDED] = false;

    this.dirCache = opt.dirCache || new Map();

    if (typeof opt.uid === 'number' || typeof opt.gid === 'number') {
      // need both or neither
      if (typeof opt.uid !== 'number' || typeof opt.gid !== 'number') {
        throw new TypeError('cannot set owner without number uid and gid')
      }
      if (opt.preserveOwner) {
        throw new TypeError(
          'cannot preserve owner in archive and also set owner explicitly')
      }
      this.uid = opt.uid;
      this.gid = opt.gid;
      this.setOwner = true;
    } else {
      this.uid = null;
      this.gid = null;
      this.setOwner = false;
    }

    // default true for root
    if (opt.preserveOwner === undefined && typeof opt.uid !== 'number') {
      this.preserveOwner = process.getuid && process.getuid() === 0;
    } else {
      this.preserveOwner = !!opt.preserveOwner;
    }

    this.processUid = (this.preserveOwner || this.setOwner) && process.getuid ?
      process.getuid() : null;
    this.processGid = (this.preserveOwner || this.setOwner) && process.getgid ?
      process.getgid() : null;

    // mostly just for testing, but useful in some cases.
    // Forcibly trigger a chown on every entry, no matter what
    this.forceChown = opt.forceChown === true;

    // turn ><?| in filenames into 0xf000-higher encoded forms
    this.win32 = !!opt.win32 || isWindows;

    // do not unpack over files that are newer than what's in the archive
    this.newer = !!opt.newer;

    // do not unpack over ANY files
    this.keep = !!opt.keep;

    // do not set mtime/atime of extracted entries
    this.noMtime = !!opt.noMtime;

    // allow .., absolute path entries, and unpacking through symlinks
    // without this, warn and skip .., relativize absolutes, and error
    // on symlinks in extraction path
    this.preservePaths = !!opt.preservePaths;

    // unlink files and links before writing. This breaks existing hard
    // links, and removes symlink directories rather than erroring
    this.unlink = !!opt.unlink;

    this.cwd = normPath(path$1.resolve(opt.cwd || process.cwd()));
    this.strip = +opt.strip || 0;
    // if we're not chmodding, then we don't need the process umask
    this.processUmask = opt.noChmod ? 0 : process.umask();
    this.umask = typeof opt.umask === 'number' ? opt.umask : this.processUmask;

    // default mode for dirs created as parents
    this.dmode = opt.dmode || (0o0777 & (~this.umask));
    this.fmode = opt.fmode || (0o0666 & (~this.umask));

    this.on('entry', entry => this[ONENTRY](entry));
  }

  // a bad or damaged archive is a warning for Parser, but an error
  // when extracting.  Mark those errors as unrecoverable, because
  // the Unpack contract cannot be met.
  warn (code, msg, data = {}) {
    if (code === 'TAR_BAD_ARCHIVE' || code === 'TAR_ABORT') {
      data.recoverable = false;
    }
    return super.warn(code, msg, data)
  }

  [MAYBECLOSE] () {
    if (this[ENDED] && this[PENDING] === 0) {
      this.emit('prefinish');
      this.emit('finish');
      this.emit('end');
    }
  }

  [CHECKPATH] (entry) {
    if (this.strip) {
      const parts = normPath(entry.path).split('/');
      if (parts.length < this.strip) {
        return false
      }
      entry.path = parts.slice(this.strip).join('/');

      if (entry.type === 'Link') {
        const linkparts = normPath(entry.linkpath).split('/');
        if (linkparts.length >= this.strip) {
          entry.linkpath = linkparts.slice(this.strip).join('/');
        } else {
          return false
        }
      }
    }

    if (!this.preservePaths) {
      const p = normPath(entry.path);
      const parts = p.split('/');
      if (parts.includes('..') || isWindows && /^[a-z]:\.\.$/i.test(parts[0])) {
        this.warn('TAR_ENTRY_ERROR', `path contains '..'`, {
          entry,
          path: p,
        });
        return false
      }

      // strip off the root
      const [root, stripped] = stripAbsolutePath(p);
      if (root) {
        entry.path = stripped;
        this.warn('TAR_ENTRY_INFO', `stripping ${root} from absolute path`, {
          entry,
          path: p,
        });
      }
    }

    if (path$1.isAbsolute(entry.path)) {
      entry.absolute = normPath(path$1.resolve(entry.path));
    } else {
      entry.absolute = normPath(path$1.resolve(this.cwd, entry.path));
    }

    // if we somehow ended up with a path that escapes the cwd, and we are
    // not in preservePaths mode, then something is fishy!  This should have
    // been prevented above, so ignore this for coverage.
    /* istanbul ignore if - defense in depth */
    if (!this.preservePaths &&
        entry.absolute.indexOf(this.cwd + '/') !== 0 &&
        entry.absolute !== this.cwd) {
      this.warn('TAR_ENTRY_ERROR', 'path escaped extraction target', {
        entry,
        path: normPath(entry.path),
        resolvedPath: entry.absolute,
        cwd: this.cwd,
      });
      return false
    }

    // an archive can set properties on the extraction directory, but it
    // may not replace the cwd with a different kind of thing entirely.
    if (entry.absolute === this.cwd &&
        entry.type !== 'Directory' &&
        entry.type !== 'GNUDumpDir') {
      return false
    }

    // only encode : chars that aren't drive letter indicators
    if (this.win32) {
      const { root: aRoot } = path$1.win32.parse(entry.absolute);
      entry.absolute = aRoot + wc.encode(entry.absolute.slice(aRoot.length));
      const { root: pRoot } = path$1.win32.parse(entry.path);
      entry.path = pRoot + wc.encode(entry.path.slice(pRoot.length));
    }

    return true
  }

  [ONENTRY] (entry) {
    if (!this[CHECKPATH](entry)) {
      return entry.resume()
    }

    assert.equal(typeof entry.absolute, 'string');

    switch (entry.type) {
      case 'Directory':
      case 'GNUDumpDir':
        if (entry.mode) {
          entry.mode = entry.mode | 0o700;
        }

      // eslint-disable-next-line no-fallthrough
      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
      case 'Link':
      case 'SymbolicLink':
        return this[CHECKFS](entry)

      case 'CharacterDevice':
      case 'BlockDevice':
      case 'FIFO':
      default:
        return this[UNSUPPORTED](entry)
    }
  }

  [ONERROR] (er, entry) {
    // Cwd has to exist, or else nothing works. That's serious.
    // Other errors are warnings, which raise the error in strict
    // mode, but otherwise continue on.
    if (er.name === 'CwdError') {
      this.emit('error', er);
    } else {
      this.warn('TAR_ENTRY_ERROR', er, { entry });
      this[UNPEND]();
      entry.resume();
    }
  }

  [MKDIR] (dir, mode, cb) {
    mkdir(normPath(dir), {
      uid: this.uid,
      gid: this.gid,
      processUid: this.processUid,
      processGid: this.processGid,
      umask: this.processUmask,
      preserve: this.preservePaths,
      unlink: this.unlink,
      cache: this.dirCache,
      cwd: this.cwd,
      mode: mode,
      noChmod: this.noChmod,
    }, cb);
  }

  [DOCHOWN] (entry) {
    // in preserve owner mode, chown if the entry doesn't match process
    // in set owner mode, chown if setting doesn't match process
    return this.forceChown ||
      this.preserveOwner &&
      (typeof entry.uid === 'number' && entry.uid !== this.processUid ||
        typeof entry.gid === 'number' && entry.gid !== this.processGid)
      ||
      (typeof this.uid === 'number' && this.uid !== this.processUid ||
        typeof this.gid === 'number' && this.gid !== this.processGid)
  }

  [UID] (entry) {
    return uint32(this.uid, entry.uid, this.processUid)
  }

  [GID] (entry) {
    return uint32(this.gid, entry.gid, this.processGid)
  }

  [FILE] (entry, fullyDone) {
    const mode = entry.mode & 0o7777 || this.fmode;
    const stream = new fsm$1.WriteStream(entry.absolute, {
      flags: getFlag(entry.size),
      mode: mode,
      autoClose: false,
    });
    stream.on('error', er => {
      if (stream.fd) {
        fs$2.close(stream.fd, () => {});
      }

      // flush all the data out so that we aren't left hanging
      // if the error wasn't actually fatal.  otherwise the parse
      // is blocked, and we never proceed.
      stream.write = () => true;
      this[ONERROR](er, entry);
      fullyDone();
    });

    let actions = 1;
    const done = er => {
      if (er) {
        /* istanbul ignore else - we should always have a fd by now */
        if (stream.fd) {
          fs$2.close(stream.fd, () => {});
        }

        this[ONERROR](er, entry);
        fullyDone();
        return
      }

      if (--actions === 0) {
        fs$2.close(stream.fd, er => {
          if (er) {
            this[ONERROR](er, entry);
          } else {
            this[UNPEND]();
          }
          fullyDone();
        });
      }
    };

    stream.on('finish', _ => {
      // if futimes fails, try utimes
      // if utimes fails, fail with the original error
      // same for fchown/chown
      const abs = entry.absolute;
      const fd = stream.fd;

      if (entry.mtime && !this.noMtime) {
        actions++;
        const atime = entry.atime || new Date();
        const mtime = entry.mtime;
        fs$2.futimes(fd, atime, mtime, er =>
          er ? fs$2.utimes(abs, atime, mtime, er2 => done(er2 && er))
          : done());
      }

      if (this[DOCHOWN](entry)) {
        actions++;
        const uid = this[UID](entry);
        const gid = this[GID](entry);
        fs$2.fchown(fd, uid, gid, er =>
          er ? fs$2.chown(abs, uid, gid, er2 => done(er2 && er))
          : done());
      }

      done();
    });

    const tx = this.transform ? this.transform(entry) || entry : entry;
    if (tx !== entry) {
      tx.on('error', er => {
        this[ONERROR](er, entry);
        fullyDone();
      });
      entry.pipe(tx);
    }
    tx.pipe(stream);
  }

  [DIRECTORY] (entry, fullyDone) {
    const mode = entry.mode & 0o7777 || this.dmode;
    this[MKDIR](entry.absolute, mode, er => {
      if (er) {
        this[ONERROR](er, entry);
        fullyDone();
        return
      }

      let actions = 1;
      const done = _ => {
        if (--actions === 0) {
          fullyDone();
          this[UNPEND]();
          entry.resume();
        }
      };

      if (entry.mtime && !this.noMtime) {
        actions++;
        fs$2.utimes(entry.absolute, entry.atime || new Date(), entry.mtime, done);
      }

      if (this[DOCHOWN](entry)) {
        actions++;
        fs$2.chown(entry.absolute, this[UID](entry), this[GID](entry), done);
      }

      done();
    });
  }

  [UNSUPPORTED] (entry) {
    entry.unsupported = true;
    this.warn('TAR_ENTRY_UNSUPPORTED',
      `unsupported entry type: ${entry.type}`, { entry });
    entry.resume();
  }

  [SYMLINK] (entry, done) {
    this[LINK](entry, entry.linkpath, 'symlink', done);
  }

  [HARDLINK] (entry, done) {
    const linkpath = normPath(path$1.resolve(this.cwd, entry.linkpath));
    this[LINK](entry, linkpath, 'link', done);
  }

  [PEND] () {
    this[PENDING]++;
  }

  [UNPEND] () {
    this[PENDING]--;
    this[MAYBECLOSE]();
  }

  [SKIP] (entry) {
    this[UNPEND]();
    entry.resume();
  }

  // Check if we can reuse an existing filesystem entry safely and
  // overwrite it, rather than unlinking and recreating
  // Windows doesn't report a useful nlink, so we just never reuse entries
  [ISREUSABLE] (entry, st) {
    return entry.type === 'File' &&
      !this.unlink &&
      st.isFile() &&
      st.nlink <= 1 &&
      !isWindows
  }

  // check if a thing is there, and if so, try to clobber it
  [CHECKFS] (entry) {
    this[PEND]();
    const paths = [entry.path];
    if (entry.linkpath) {
      paths.push(entry.linkpath);
    }
    this.reservations.reserve(paths, done => this[CHECKFS2](entry, done));
  }

  [PRUNECACHE] (entry) {
    // if we are not creating a directory, and the path is in the dirCache,
    // then that means we are about to delete the directory we created
    // previously, and it is no longer going to be a directory, and neither
    // is any of its children.
    // If a symbolic link is encountered, all bets are off.  There is no
    // reasonable way to sanitize the cache in such a way we will be able to
    // avoid having filesystem collisions.  If this happens with a non-symlink
    // entry, it'll just fail to unpack, but a symlink to a directory, using an
    // 8.3 shortname or certain unicode attacks, can evade detection and lead
    // to arbitrary writes to anywhere on the system.
    if (entry.type === 'SymbolicLink') {
      dropCache(this.dirCache);
    } else if (entry.type !== 'Directory') {
      pruneCache(this.dirCache, entry.absolute);
    }
  }

  [CHECKFS2] (entry, fullyDone) {
    this[PRUNECACHE](entry);

    const done = er => {
      this[PRUNECACHE](entry);
      fullyDone(er);
    };

    const checkCwd = () => {
      this[MKDIR](this.cwd, this.dmode, er => {
        if (er) {
          this[ONERROR](er, entry);
          done();
          return
        }
        this[CHECKED_CWD] = true;
        start();
      });
    };

    const start = () => {
      if (entry.absolute !== this.cwd) {
        const parent = normPath(path$1.dirname(entry.absolute));
        if (parent !== this.cwd) {
          return this[MKDIR](parent, this.dmode, er => {
            if (er) {
              this[ONERROR](er, entry);
              done();
              return
            }
            afterMakeParent();
          })
        }
      }
      afterMakeParent();
    };

    const afterMakeParent = () => {
      fs$2.lstat(entry.absolute, (lstatEr, st) => {
        if (st && (this.keep || this.newer && st.mtime > entry.mtime)) {
          this[SKIP](entry);
          done();
          return
        }
        if (lstatEr || this[ISREUSABLE](entry, st)) {
          return this[MAKEFS](null, entry, done)
        }

        if (st.isDirectory()) {
          if (entry.type === 'Directory') {
            const needChmod = !this.noChmod &&
              entry.mode &&
              (st.mode & 0o7777) !== entry.mode;
            const afterChmod = er => this[MAKEFS](er, entry, done);
            if (!needChmod) {
              return afterChmod()
            }
            return fs$2.chmod(entry.absolute, entry.mode, afterChmod)
          }
          // Not a dir entry, have to remove it.
          // NB: the only way to end up with an entry that is the cwd
          // itself, in such a way that == does not detect, is a
          // tricky windows absolute path with UNC or 8.3 parts (and
          // preservePaths:true, or else it will have been stripped).
          // In that case, the user has opted out of path protections
          // explicitly, so if they blow away the cwd, c'est la vie.
          if (entry.absolute !== this.cwd) {
            return fs$2.rmdir(entry.absolute, er =>
              this[MAKEFS](er, entry, done))
          }
        }

        // not a dir, and not reusable
        // don't remove if the cwd, we want that error
        if (entry.absolute === this.cwd) {
          return this[MAKEFS](null, entry, done)
        }

        unlinkFile(entry.absolute, er =>
          this[MAKEFS](er, entry, done));
      });
    };

    if (this[CHECKED_CWD]) {
      start();
    } else {
      checkCwd();
    }
  }

  [MAKEFS] (er, entry, done) {
    if (er) {
      this[ONERROR](er, entry);
      done();
      return
    }

    switch (entry.type) {
      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
        return this[FILE](entry, done)

      case 'Link':
        return this[HARDLINK](entry, done)

      case 'SymbolicLink':
        return this[SYMLINK](entry, done)

      case 'Directory':
      case 'GNUDumpDir':
        return this[DIRECTORY](entry, done)
    }
  }

  [LINK] (entry, linkpath, link, done) {
    // XXX: get the type ('symlink' or 'junction') for windows
    fs$2[link](linkpath, entry.absolute, er => {
      if (er) {
        this[ONERROR](er, entry);
      } else {
        this[UNPEND]();
        entry.resume();
      }
      done();
    });
  }
};

const callSync = fn => {
  try {
    return [null, fn()]
  } catch (er) {
    return [er, null]
  }
};
class UnpackSync extends Unpack$1 {
  [MAKEFS] (er, entry) {
    return super[MAKEFS](er, entry, () => {})
  }

  [CHECKFS] (entry) {
    this[PRUNECACHE](entry);

    if (!this[CHECKED_CWD]) {
      const er = this[MKDIR](this.cwd, this.dmode);
      if (er) {
        return this[ONERROR](er, entry)
      }
      this[CHECKED_CWD] = true;
    }

    // don't bother to make the parent if the current entry is the cwd,
    // we've already checked it.
    if (entry.absolute !== this.cwd) {
      const parent = normPath(path$1.dirname(entry.absolute));
      if (parent !== this.cwd) {
        const mkParent = this[MKDIR](parent, this.dmode);
        if (mkParent) {
          return this[ONERROR](mkParent, entry)
        }
      }
    }

    const [lstatEr, st] = callSync(() => fs$2.lstatSync(entry.absolute));
    if (st && (this.keep || this.newer && st.mtime > entry.mtime)) {
      return this[SKIP](entry)
    }

    if (lstatEr || this[ISREUSABLE](entry, st)) {
      return this[MAKEFS](null, entry)
    }

    if (st.isDirectory()) {
      if (entry.type === 'Directory') {
        const needChmod = !this.noChmod &&
          entry.mode &&
          (st.mode & 0o7777) !== entry.mode;
        const [er] = needChmod ? callSync(() => {
          fs$2.chmodSync(entry.absolute, entry.mode);
        }) : [];
        return this[MAKEFS](er, entry)
      }
      // not a dir entry, have to remove it
      const [er] = callSync(() => fs$2.rmdirSync(entry.absolute));
      this[MAKEFS](er, entry);
    }

    // not a dir, and not reusable.
    // don't remove if it's the cwd, since we want that error.
    const [er] = entry.absolute === this.cwd ? []
      : callSync(() => unlinkFileSync(entry.absolute));
    this[MAKEFS](er, entry);
  }

  [FILE] (entry, done) {
    const mode = entry.mode & 0o7777 || this.fmode;

    const oner = er => {
      let closeError;
      try {
        fs$2.closeSync(fd);
      } catch (e) {
        closeError = e;
      }
      if (er || closeError) {
        this[ONERROR](er || closeError, entry);
      }
      done();
    };

    let fd;
    try {
      fd = fs$2.openSync(entry.absolute, getFlag(entry.size), mode);
    } catch (er) {
      return oner(er)
    }
    const tx = this.transform ? this.transform(entry) || entry : entry;
    if (tx !== entry) {
      tx.on('error', er => this[ONERROR](er, entry));
      entry.pipe(tx);
    }

    tx.on('data', chunk => {
      try {
        fs$2.writeSync(fd, chunk, 0, chunk.length);
      } catch (er) {
        oner(er);
      }
    });

    tx.on('end', _ => {
      let er = null;
      // try both, falling futimes back to utimes
      // if either fails, handle the first error
      if (entry.mtime && !this.noMtime) {
        const atime = entry.atime || new Date();
        const mtime = entry.mtime;
        try {
          fs$2.futimesSync(fd, atime, mtime);
        } catch (futimeser) {
          try {
            fs$2.utimesSync(entry.absolute, atime, mtime);
          } catch (utimeser) {
            er = futimeser;
          }
        }
      }

      if (this[DOCHOWN](entry)) {
        const uid = this[UID](entry);
        const gid = this[GID](entry);

        try {
          fs$2.fchownSync(fd, uid, gid);
        } catch (fchowner) {
          try {
            fs$2.chownSync(entry.absolute, uid, gid);
          } catch (chowner) {
            er = er || fchowner;
          }
        }
      }

      oner(er);
    });
  }

  [DIRECTORY] (entry, done) {
    const mode = entry.mode & 0o7777 || this.dmode;
    const er = this[MKDIR](entry.absolute, mode);
    if (er) {
      this[ONERROR](er, entry);
      done();
      return
    }
    if (entry.mtime && !this.noMtime) {
      try {
        fs$2.utimesSync(entry.absolute, entry.atime || new Date(), entry.mtime);
      } catch (er) {}
    }
    if (this[DOCHOWN](entry)) {
      try {
        fs$2.chownSync(entry.absolute, this[UID](entry), this[GID](entry));
      } catch (er) {}
    }
    done();
    entry.resume();
  }

  [MKDIR] (dir, mode) {
    try {
      return mkdir.sync(normPath(dir), {
        uid: this.uid,
        gid: this.gid,
        processUid: this.processUid,
        processGid: this.processGid,
        umask: this.processUmask,
        preserve: this.preservePaths,
        unlink: this.unlink,
        cache: this.dirCache,
        cwd: this.cwd,
        mode: mode,
      })
    } catch (er) {
      return er
    }
  }

  [LINK] (entry, linkpath, link, done) {
    try {
      fs$2[link + 'Sync'](linkpath, entry.absolute);
      done();
      entry.resume();
    } catch (er) {
      return this[ONERROR](er, entry)
    }
  }
}

Unpack$1.Sync = UnpackSync;
var unpack = Unpack$1;

// tar -x
const hlo = highLevelOpt;
const Unpack = unpack;
const fs$1 = require$$0__default;
const fsm = fsMinipass;
const path = require$$0$4;
const stripSlash = stripTrailingSlashes;

var extract_1 = (opt_, files, cb) => {
  if (typeof opt_ === 'function') {
    cb = opt_, files = null, opt_ = {};
  } else if (Array.isArray(opt_)) {
    files = opt_, opt_ = {};
  }

  if (typeof files === 'function') {
    cb = files, files = null;
  }

  if (!files) {
    files = [];
  } else {
    files = Array.from(files);
  }

  const opt = hlo(opt_);

  if (opt.sync && typeof cb === 'function') {
    throw new TypeError('callback not supported for sync tar functions')
  }

  if (!opt.file && typeof cb === 'function') {
    throw new TypeError('callback only supported with file option')
  }

  if (files.length) {
    filesFilter(opt, files);
  }

  return opt.file && opt.sync ? extractFileSync(opt)
    : opt.file ? extractFile(opt, cb)
    : opt.sync ? extractSync(opt)
    : extract$1(opt)
};

// construct a filter that limits the file entries listed
// include child entries if a dir is included
const filesFilter = (opt, files) => {
  const map = new Map(files.map(f => [stripSlash(f), true]));
  const filter = opt.filter;

  const mapHas = (file, r) => {
    const root = r || path.parse(file).root || '.';
    const ret = file === root ? false
      : map.has(file) ? map.get(file)
      : mapHas(path.dirname(file), root);

    map.set(file, ret);
    return ret
  };

  opt.filter = filter
    ? (file, entry) => filter(file, entry) && mapHas(stripSlash(file))
    : file => mapHas(stripSlash(file));
};

const extractFileSync = opt => {
  const u = new Unpack.Sync(opt);

  const file = opt.file;
  const stat = fs$1.statSync(file);
  // This trades a zero-byte read() syscall for a stat
  // However, it will usually result in less memory allocation
  const readSize = opt.maxReadSize || 16 * 1024 * 1024;
  const stream = new fsm.ReadStreamSync(file, {
    readSize: readSize,
    size: stat.size,
  });
  stream.pipe(u);
};

const extractFile = (opt, cb) => {
  const u = new Unpack(opt);
  const readSize = opt.maxReadSize || 16 * 1024 * 1024;

  const file = opt.file;
  const p = new Promise((resolve, reject) => {
    u.on('error', reject);
    u.on('close', resolve);

    // This trades a zero-byte read() syscall for a stat
    // However, it will usually result in less memory allocation
    fs$1.stat(file, (er, stat) => {
      if (er) {
        reject(er);
      } else {
        const stream = new fsm.ReadStream(file, {
          readSize: readSize,
          size: stat.size,
        });
        stream.on('error', reject);
        stream.pipe(u);
      }
    });
  });
  return cb ? p.then(cb, cb) : p
};

const extractSync = opt => new Unpack.Sync(opt);

const extract$1 = opt => new Unpack(opt);

var extract;
extract = extract_1;

var Za=Object.defineProperty;var n=(i,o)=>Za(i,"name",{value:o,configurable:!0});var Ko=(i,o,a)=>{if(!o.has(i))throw TypeError("Cannot "+a)};var k=(i,o,a)=>(Ko(i,o,"read from private field"),a?a.call(i):o.get(i)),ae=(i,o,a)=>{if(o.has(i))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(i):o.set(i,a);},Y=(i,o,a,l)=>(Ko(i,o,"write to private field"),l?l.call(i,a):o.set(i,a),a);var me,vt,ct,wr,xe,Et,At,Wt,G,Bt,Ue,Ne,kt;function os(i){if(!/^data:/i.test(i))throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');i=i.replace(/\r?\n/g,"");const o=i.indexOf(",");if(o===-1||o<=4)throw new TypeError("malformed data: URI");const a=i.substring(5,o).split(";");let l="",u=!1;const d=a[0]||"text/plain";let p=d;for(let I=1;I<a.length;I++)a[I]==="base64"?u=!0:a[I]&&(p+=`;${a[I]}`,a[I].indexOf("charset=")===0&&(l=a[I].substring(8)));!a[0]&&!l.length&&(p+=";charset=US-ASCII",l="US-ASCII");const m=u?"base64":"ascii",C=unescape(i.substring(o+1)),S=Buffer.from(C,m);return S.type=d,S.typeFull=p,S.charset=l,S}n(os,"dataUriToBuffer");var _n=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function is(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}n(is,"getDefaultExportFromCjs");var cr={exports:{}},Xo;function as(){return Xo||(Xo=1,function(i,o){(function(a,l){l(o);})(_n,function(a){const l=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol:e=>`Symbol(${e})`;function u(){}n(u,"noop");function d(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof _n<"u")return _n}n(d,"getGlobals");const p=d();function m(e){return typeof e=="object"&&e!==null||typeof e=="function"}n(m,"typeIsObject");const C=u,S=Promise,I=Promise.prototype.then,re=Promise.resolve.bind(S),L=Promise.reject.bind(S);function E(e){return new S(e)}n(E,"newPromise");function b(e){return re(e)}n(b,"promiseResolvedWith");function g(e){return L(e)}n(g,"promiseRejectedWith");function A(e,t,r){return I.call(e,t,r)}n(A,"PerformPromiseThen");function q(e,t,r){A(A(e,t,r),void 0,C);}n(q,"uponPromise");function ne(e,t){q(e,t);}n(ne,"uponFulfillment");function dt(e,t){q(e,void 0,t);}n(dt,"uponRejection");function O(e,t,r){return A(e,t,r)}n(O,"transformPromiseWith");function $(e){A(e,void 0,C);}n($,"setPromiseIsHandledToTrue");const F=(()=>{const e=p&&p.queueMicrotask;if(typeof e=="function")return e;const t=b(void 0);return r=>A(t,r)})();function ve(e,t,r){if(typeof e!="function")throw new TypeError("Argument is not a function");return Function.prototype.apply.call(e,t,r)}n(ve,"reflectCall");function ue(e,t,r){try{return b(ve(e,t,r))}catch(s){return g(s)}}n(ue,"promiseCall");const jn=16384,rn=class rn{constructor(){this._cursor=0,this._size=0,this._front={_elements:[],_next:void 0},this._back=this._front,this._cursor=0,this._size=0;}get length(){return this._size}push(t){const r=this._back;let s=r;r._elements.length===jn-1&&(s={_elements:[],_next:void 0}),r._elements.push(t),s!==r&&(this._back=s,r._next=s),++this._size;}shift(){const t=this._front;let r=t;const s=this._cursor;let f=s+1;const c=t._elements,h=c[s];return f===jn&&(r=t._next,f=0),--this._size,this._cursor=f,t!==r&&(this._front=r),c[s]=void 0,h}forEach(t){let r=this._cursor,s=this._front,f=s._elements;for(;(r!==f.length||s._next!==void 0)&&!(r===f.length&&(s=s._next,f=s._elements,r=0,f.length===0));)t(f[r]),++r;}peek(){const t=this._front,r=this._cursor;return t._elements[r]}};n(rn,"SimpleQueue");let x=rn;function Fn(e,t){e._ownerReadableStream=t,t._reader=e,t._state==="readable"?vr(e):t._state==="closed"?Pi(e):In(e,t._storedError);}n(Fn,"ReadableStreamReaderGenericInitialize");function Pr(e,t){const r=e._ownerReadableStream;return J(r,t)}n(Pr,"ReadableStreamReaderGenericCancel");function fe(e){e._ownerReadableStream._state==="readable"?Er(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")):vi(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")),e._ownerReadableStream._reader=void 0,e._ownerReadableStream=void 0;}n(fe,"ReadableStreamReaderGenericRelease");function He(e){return new TypeError("Cannot "+e+" a stream using a released reader")}n(He,"readerLockException");function vr(e){e._closedPromise=E((t,r)=>{e._closedPromise_resolve=t,e._closedPromise_reject=r;});}n(vr,"defaultReaderClosedPromiseInitialize");function In(e,t){vr(e),Er(e,t);}n(In,"defaultReaderClosedPromiseInitializeAsRejected");function Pi(e){vr(e),Ln(e);}n(Pi,"defaultReaderClosedPromiseInitializeAsResolved");function Er(e,t){e._closedPromise_reject!==void 0&&($(e._closedPromise),e._closedPromise_reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0);}n(Er,"defaultReaderClosedPromiseReject");function vi(e,t){In(e,t);}n(vi,"defaultReaderClosedPromiseResetToRejected");function Ln(e){e._closedPromise_resolve!==void 0&&(e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0);}n(Ln,"defaultReaderClosedPromiseResolve");const $n=l("[[AbortSteps]]"),Dn=l("[[ErrorSteps]]"),Ar=l("[[CancelSteps]]"),Wr=l("[[PullSteps]]"),Mn=Number.isFinite||function(e){return typeof e=="number"&&isFinite(e)},Ei=Math.trunc||function(e){return e<0?Math.ceil(e):Math.floor(e)};function Ai(e){return typeof e=="object"||typeof e=="function"}n(Ai,"isDictionary");function ce(e,t){if(e!==void 0&&!Ai(e))throw new TypeError(`${t} is not an object.`)}n(ce,"assertDictionary");function Z(e,t){if(typeof e!="function")throw new TypeError(`${t} is not a function.`)}n(Z,"assertFunction");function Wi(e){return typeof e=="object"&&e!==null||typeof e=="function"}n(Wi,"isObject");function Un(e,t){if(!Wi(e))throw new TypeError(`${t} is not an object.`)}n(Un,"assertObject");function de(e,t,r){if(e===void 0)throw new TypeError(`Parameter ${t} is required in '${r}'.`)}n(de,"assertRequiredArgument");function Br(e,t,r){if(e===void 0)throw new TypeError(`${t} is required in '${r}'.`)}n(Br,"assertRequiredField");function kr(e){return Number(e)}n(kr,"convertUnrestrictedDouble");function Nn(e){return e===0?0:e}n(Nn,"censorNegativeZero");function Bi(e){return Nn(Ei(e))}n(Bi,"integerPart");function xn(e,t){const s=Number.MAX_SAFE_INTEGER;let f=Number(e);if(f=Nn(f),!Mn(f))throw new TypeError(`${t} is not a finite number`);if(f=Bi(f),f<0||f>s)throw new TypeError(`${t} is outside the accepted range of 0 to ${s}, inclusive`);return !Mn(f)||f===0?0:f}n(xn,"convertUnsignedLongLongWithEnforceRange");function Or(e,t){if(!Te(e))throw new TypeError(`${t} is not a ReadableStream.`)}n(Or,"assertReadableStream");function Ve(e){return new Ee(e)}n(Ve,"AcquireReadableStreamDefaultReader");function Hn(e,t){e._reader._readRequests.push(t);}n(Hn,"ReadableStreamAddReadRequest");function qr(e,t,r){const f=e._reader._readRequests.shift();r?f._closeSteps():f._chunkSteps(t);}n(qr,"ReadableStreamFulfillReadRequest");function Ot(e){return e._reader._readRequests.length}n(Ot,"ReadableStreamGetNumReadRequests");function Vn(e){const t=e._reader;return !(t===void 0||!ye(t))}n(Vn,"ReadableStreamHasDefaultReader");const nn=class nn{constructor(t){if(de(t,1,"ReadableStreamDefaultReader"),Or(t,"First parameter"),Ce(t))throw new TypeError("This stream has already been locked for exclusive reading by another reader");Fn(this,t),this._readRequests=new x;}get closed(){return ye(this)?this._closedPromise:g(qt("closed"))}cancel(t=void 0){return ye(this)?this._ownerReadableStream===void 0?g(He("cancel")):Pr(this,t):g(qt("cancel"))}read(){if(!ye(this))return g(qt("read"));if(this._ownerReadableStream===void 0)return g(He("read from"));let t,r;const s=E((c,h)=>{t=c,r=h;});return ht(this,{_chunkSteps:c=>t({value:c,done:!1}),_closeSteps:()=>t({value:void 0,done:!0}),_errorSteps:c=>r(c)}),s}releaseLock(){if(!ye(this))throw qt("releaseLock");if(this._ownerReadableStream!==void 0){if(this._readRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");fe(this);}}};n(nn,"ReadableStreamDefaultReader");let Ee=nn;Object.defineProperties(Ee.prototype,{cancel:{enumerable:!0},read:{enumerable:!0},releaseLock:{enumerable:!0},closed:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(Ee.prototype,l.toStringTag,{value:"ReadableStreamDefaultReader",configurable:!0});function ye(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_readRequests")?!1:e instanceof Ee}n(ye,"IsReadableStreamDefaultReader");function ht(e,t){const r=e._ownerReadableStream;r._disturbed=!0,r._state==="closed"?t._closeSteps():r._state==="errored"?t._errorSteps(r._storedError):r._readableStreamController[Wr](t);}n(ht,"ReadableStreamDefaultReaderRead");function qt(e){return new TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`)}n(qt,"defaultReaderBrandCheckException");const Qn=Object.getPrototypeOf(Object.getPrototypeOf(async function*(){}).prototype),on=class on{constructor(t,r){this._ongoingPromise=void 0,this._isFinished=!1,this._reader=t,this._preventCancel=r;}next(){const t=n(()=>this._nextSteps(),"nextSteps");return this._ongoingPromise=this._ongoingPromise?O(this._ongoingPromise,t,t):t(),this._ongoingPromise}return(t){const r=n(()=>this._returnSteps(t),"returnSteps");return this._ongoingPromise?O(this._ongoingPromise,r,r):r()}_nextSteps(){if(this._isFinished)return Promise.resolve({value:void 0,done:!0});const t=this._reader;if(t._ownerReadableStream===void 0)return g(He("iterate"));let r,s;const f=E((h,y)=>{r=h,s=y;});return ht(t,{_chunkSteps:h=>{this._ongoingPromise=void 0,F(()=>r({value:h,done:!1}));},_closeSteps:()=>{this._ongoingPromise=void 0,this._isFinished=!0,fe(t),r({value:void 0,done:!0});},_errorSteps:h=>{this._ongoingPromise=void 0,this._isFinished=!0,fe(t),s(h);}}),f}_returnSteps(t){if(this._isFinished)return Promise.resolve({value:t,done:!0});this._isFinished=!0;const r=this._reader;if(r._ownerReadableStream===void 0)return g(He("finish iterating"));if(!this._preventCancel){const s=Pr(r,t);return fe(r),O(s,()=>({value:t,done:!0}))}return fe(r),b({value:t,done:!0})}};n(on,"ReadableStreamAsyncIteratorImpl");let zt=on;const Yn={next(){return Gn(this)?this._asyncIteratorImpl.next():g(Zn("next"))},return(e){return Gn(this)?this._asyncIteratorImpl.return(e):g(Zn("return"))}};Qn!==void 0&&Object.setPrototypeOf(Yn,Qn);function ki(e,t){const r=Ve(e),s=new zt(r,t),f=Object.create(Yn);return f._asyncIteratorImpl=s,f}n(ki,"AcquireReadableStreamAsyncIterator");function Gn(e){if(!m(e)||!Object.prototype.hasOwnProperty.call(e,"_asyncIteratorImpl"))return !1;try{return e._asyncIteratorImpl instanceof zt}catch{return !1}}n(Gn,"IsReadableStreamAsyncIterator");function Zn(e){return new TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`)}n(Zn,"streamAsyncIteratorBrandCheckException");const Kn=Number.isNaN||function(e){return e!==e};function pt(e){return e.slice()}n(pt,"CreateArrayFromList");function Jn(e,t,r,s,f){new Uint8Array(e).set(new Uint8Array(r,s,f),t);}n(Jn,"CopyDataBlockBytes");function Ks(e){return e}n(Ks,"TransferArrayBuffer");function jt(e){return !1}n(jt,"IsDetachedBuffer");function Xn(e,t,r){if(e.slice)return e.slice(t,r);const s=r-t,f=new ArrayBuffer(s);return Jn(f,0,e,t,s),f}n(Xn,"ArrayBufferSlice");function Oi(e){return !(typeof e!="number"||Kn(e)||e<0)}n(Oi,"IsNonNegativeNumber");function eo(e){const t=Xn(e.buffer,e.byteOffset,e.byteOffset+e.byteLength);return new Uint8Array(t)}n(eo,"CloneAsUint8Array");function zr(e){const t=e._queue.shift();return e._queueTotalSize-=t.size,e._queueTotalSize<0&&(e._queueTotalSize=0),t.value}n(zr,"DequeueValue");function jr(e,t,r){if(!Oi(r)||r===1/0)throw new RangeError("Size must be a finite, non-NaN, non-negative number.");e._queue.push({value:t,size:r}),e._queueTotalSize+=r;}n(jr,"EnqueueValueWithSize");function qi(e){return e._queue.peek().value}n(qi,"PeekQueueValue");function ge(e){e._queue=new x,e._queueTotalSize=0;}n(ge,"ResetQueue");const an=class an{constructor(){throw new TypeError("Illegal constructor")}get view(){if(!Fr(this))throw Dr("view");return this._view}respond(t){if(!Fr(this))throw Dr("respond");if(de(t,1,"respond"),t=xn(t,"First parameter"),this._associatedReadableByteStreamController===void 0)throw new TypeError("This BYOB request has been invalidated");jt(this._view.buffer),Dt(this._associatedReadableByteStreamController,t);}respondWithNewView(t){if(!Fr(this))throw Dr("respondWithNewView");if(de(t,1,"respondWithNewView"),!ArrayBuffer.isView(t))throw new TypeError("You can only respond with array buffer views");if(this._associatedReadableByteStreamController===void 0)throw new TypeError("This BYOB request has been invalidated");jt(t.buffer),Mt(this._associatedReadableByteStreamController,t);}};n(an,"ReadableStreamBYOBRequest");let Ae=an;Object.defineProperties(Ae.prototype,{respond:{enumerable:!0},respondWithNewView:{enumerable:!0},view:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(Ae.prototype,l.toStringTag,{value:"ReadableStreamBYOBRequest",configurable:!0});const sn=class sn{constructor(){throw new TypeError("Illegal constructor")}get byobRequest(){if(!We(this))throw mt("byobRequest");return $r(this)}get desiredSize(){if(!We(this))throw mt("desiredSize");return lo(this)}close(){if(!We(this))throw mt("close");if(this._closeRequested)throw new TypeError("The stream has already been closed; do not close it again!");const t=this._controlledReadableByteStream._state;if(t!=="readable")throw new TypeError(`The stream (in ${t} state) is not in the readable state and cannot be closed`);bt(this);}enqueue(t){if(!We(this))throw mt("enqueue");if(de(t,1,"enqueue"),!ArrayBuffer.isView(t))throw new TypeError("chunk must be an array buffer view");if(t.byteLength===0)throw new TypeError("chunk must have non-zero byteLength");if(t.buffer.byteLength===0)throw new TypeError("chunk's buffer must have non-zero byteLength");if(this._closeRequested)throw new TypeError("stream is closed or draining");const r=this._controlledReadableByteStream._state;if(r!=="readable")throw new TypeError(`The stream (in ${r} state) is not in the readable state and cannot be enqueued to`);$t(this,t);}error(t=void 0){if(!We(this))throw mt("error");K(this,t);}[Ar](t){to(this),ge(this);const r=this._cancelAlgorithm(t);return Lt(this),r}[Wr](t){const r=this._controlledReadableByteStream;if(this._queueTotalSize>0){const f=this._queue.shift();this._queueTotalSize-=f.byteLength,io(this);const c=new Uint8Array(f.buffer,f.byteOffset,f.byteLength);t._chunkSteps(c);return}const s=this._autoAllocateChunkSize;if(s!==void 0){let f;try{f=new ArrayBuffer(s);}catch(h){t._errorSteps(h);return}const c={buffer:f,bufferByteLength:s,byteOffset:0,byteLength:s,bytesFilled:0,elementSize:1,viewConstructor:Uint8Array,readerType:"default"};this._pendingPullIntos.push(c);}Hn(r,t),Be(this);}};n(sn,"ReadableByteStreamController");let _e=sn;Object.defineProperties(_e.prototype,{close:{enumerable:!0},enqueue:{enumerable:!0},error:{enumerable:!0},byobRequest:{enumerable:!0},desiredSize:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(_e.prototype,l.toStringTag,{value:"ReadableByteStreamController",configurable:!0});function We(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_controlledReadableByteStream")?!1:e instanceof _e}n(We,"IsReadableByteStreamController");function Fr(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_associatedReadableByteStreamController")?!1:e instanceof Ae}n(Fr,"IsReadableStreamBYOBRequest");function Be(e){if(!Ii(e))return;if(e._pulling){e._pullAgain=!0;return}e._pulling=!0;const r=e._pullAlgorithm();q(r,()=>{e._pulling=!1,e._pullAgain&&(e._pullAgain=!1,Be(e));},s=>{K(e,s);});}n(Be,"ReadableByteStreamControllerCallPullIfNeeded");function to(e){Lr(e),e._pendingPullIntos=new x;}n(to,"ReadableByteStreamControllerClearPendingPullIntos");function Ir(e,t){let r=!1;e._state==="closed"&&(r=!0);const s=ro(t);t.readerType==="default"?qr(e,s,r):Di(e,s,r);}n(Ir,"ReadableByteStreamControllerCommitPullIntoDescriptor");function ro(e){const t=e.bytesFilled,r=e.elementSize;return new e.viewConstructor(e.buffer,e.byteOffset,t/r)}n(ro,"ReadableByteStreamControllerConvertPullIntoDescriptor");function Ft(e,t,r,s){e._queue.push({buffer:t,byteOffset:r,byteLength:s}),e._queueTotalSize+=s;}n(Ft,"ReadableByteStreamControllerEnqueueChunkToQueue");function no(e,t){const r=t.elementSize,s=t.bytesFilled-t.bytesFilled%r,f=Math.min(e._queueTotalSize,t.byteLength-t.bytesFilled),c=t.bytesFilled+f,h=c-c%r;let y=f,w=!1;h>s&&(y=h-t.bytesFilled,w=!0);const T=e._queue;for(;y>0;){const P=T.peek(),v=Math.min(y,P.byteLength),z=t.byteOffset+t.bytesFilled;Jn(t.buffer,z,P.buffer,P.byteOffset,v),P.byteLength===v?T.shift():(P.byteOffset+=v,P.byteLength-=v),e._queueTotalSize-=v,oo(e,v,t),y-=v;}return w}n(no,"ReadableByteStreamControllerFillPullIntoDescriptorFromQueue");function oo(e,t,r){r.bytesFilled+=t;}n(oo,"ReadableByteStreamControllerFillHeadPullIntoDescriptor");function io(e){e._queueTotalSize===0&&e._closeRequested?(Lt(e),wt(e._controlledReadableByteStream)):Be(e);}n(io,"ReadableByteStreamControllerHandleQueueDrain");function Lr(e){e._byobRequest!==null&&(e._byobRequest._associatedReadableByteStreamController=void 0,e._byobRequest._view=null,e._byobRequest=null);}n(Lr,"ReadableByteStreamControllerInvalidateBYOBRequest");function ao(e){for(;e._pendingPullIntos.length>0;){if(e._queueTotalSize===0)return;const t=e._pendingPullIntos.peek();no(e,t)&&(It(e),Ir(e._controlledReadableByteStream,t));}}n(ao,"ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue");function zi(e,t,r){const s=e._controlledReadableByteStream;let f=1;t.constructor!==DataView&&(f=t.constructor.BYTES_PER_ELEMENT);const c=t.constructor,h=t.buffer,y={buffer:h,bufferByteLength:h.byteLength,byteOffset:t.byteOffset,byteLength:t.byteLength,bytesFilled:0,elementSize:f,viewConstructor:c,readerType:"byob"};if(e._pendingPullIntos.length>0){e._pendingPullIntos.push(y),co(s,r);return}if(s._state==="closed"){const w=new c(y.buffer,y.byteOffset,0);r._closeSteps(w);return}if(e._queueTotalSize>0){if(no(e,y)){const w=ro(y);io(e),r._chunkSteps(w);return}if(e._closeRequested){const w=new TypeError("Insufficient bytes to fill elements in the given buffer");K(e,w),r._errorSteps(w);return}}e._pendingPullIntos.push(y),co(s,r),Be(e);}n(zi,"ReadableByteStreamControllerPullInto");function ji(e,t){const r=e._controlledReadableByteStream;if(Mr(r))for(;ho(r)>0;){const s=It(e);Ir(r,s);}}n(ji,"ReadableByteStreamControllerRespondInClosedState");function Fi(e,t,r){if(oo(e,t,r),r.bytesFilled<r.elementSize)return;It(e);const s=r.bytesFilled%r.elementSize;if(s>0){const f=r.byteOffset+r.bytesFilled,c=Xn(r.buffer,f-s,f);Ft(e,c,0,c.byteLength);}r.bytesFilled-=s,Ir(e._controlledReadableByteStream,r),ao(e);}n(Fi,"ReadableByteStreamControllerRespondInReadableState");function so(e,t){const r=e._pendingPullIntos.peek();Lr(e),e._controlledReadableByteStream._state==="closed"?ji(e):Fi(e,t,r),Be(e);}n(so,"ReadableByteStreamControllerRespondInternal");function It(e){return e._pendingPullIntos.shift()}n(It,"ReadableByteStreamControllerShiftPendingPullInto");function Ii(e){const t=e._controlledReadableByteStream;return t._state!=="readable"||e._closeRequested||!e._started?!1:!!(Vn(t)&&Ot(t)>0||Mr(t)&&ho(t)>0||lo(e)>0)}n(Ii,"ReadableByteStreamControllerShouldCallPull");function Lt(e){e._pullAlgorithm=void 0,e._cancelAlgorithm=void 0;}n(Lt,"ReadableByteStreamControllerClearAlgorithms");function bt(e){const t=e._controlledReadableByteStream;if(!(e._closeRequested||t._state!=="readable")){if(e._queueTotalSize>0){e._closeRequested=!0;return}if(e._pendingPullIntos.length>0&&e._pendingPullIntos.peek().bytesFilled>0){const s=new TypeError("Insufficient bytes to fill elements in the given buffer");throw K(e,s),s}Lt(e),wt(t);}}n(bt,"ReadableByteStreamControllerClose");function $t(e,t){const r=e._controlledReadableByteStream;if(e._closeRequested||r._state!=="readable")return;const s=t.buffer,f=t.byteOffset,c=t.byteLength,h=s;if(e._pendingPullIntos.length>0){const y=e._pendingPullIntos.peek();jt(y.buffer),y.buffer=y.buffer;}if(Lr(e),Vn(r))if(Ot(r)===0)Ft(e,h,f,c);else {e._pendingPullIntos.length>0&&It(e);const y=new Uint8Array(h,f,c);qr(r,y,!1);}else Mr(r)?(Ft(e,h,f,c),ao(e)):Ft(e,h,f,c);Be(e);}n($t,"ReadableByteStreamControllerEnqueue");function K(e,t){const r=e._controlledReadableByteStream;r._state==="readable"&&(to(e),ge(e),Lt(e),Io(r,t));}n(K,"ReadableByteStreamControllerError");function $r(e){if(e._byobRequest===null&&e._pendingPullIntos.length>0){const t=e._pendingPullIntos.peek(),r=new Uint8Array(t.buffer,t.byteOffset+t.bytesFilled,t.byteLength-t.bytesFilled),s=Object.create(Ae.prototype);$i(s,e,r),e._byobRequest=s;}return e._byobRequest}n($r,"ReadableByteStreamControllerGetBYOBRequest");function lo(e){const t=e._controlledReadableByteStream._state;return t==="errored"?null:t==="closed"?0:e._strategyHWM-e._queueTotalSize}n(lo,"ReadableByteStreamControllerGetDesiredSize");function Dt(e,t){const r=e._pendingPullIntos.peek();if(e._controlledReadableByteStream._state==="closed"){if(t!==0)throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream")}else {if(t===0)throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");if(r.bytesFilled+t>r.byteLength)throw new RangeError("bytesWritten out of range")}r.buffer=r.buffer,so(e,t);}n(Dt,"ReadableByteStreamControllerRespond");function Mt(e,t){const r=e._pendingPullIntos.peek();if(e._controlledReadableByteStream._state==="closed"){if(t.byteLength!==0)throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream")}else if(t.byteLength===0)throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");if(r.byteOffset+r.bytesFilled!==t.byteOffset)throw new RangeError("The region specified by view does not match byobRequest");if(r.bufferByteLength!==t.buffer.byteLength)throw new RangeError("The buffer of view has different capacity than byobRequest");if(r.bytesFilled+t.byteLength>r.byteLength)throw new RangeError("The region specified by view is larger than byobRequest");const f=t.byteLength;r.buffer=t.buffer,so(e,f);}n(Mt,"ReadableByteStreamControllerRespondWithNewView");function uo(e,t,r,s,f,c,h){t._controlledReadableByteStream=e,t._pullAgain=!1,t._pulling=!1,t._byobRequest=null,t._queue=t._queueTotalSize=void 0,ge(t),t._closeRequested=!1,t._started=!1,t._strategyHWM=c,t._pullAlgorithm=s,t._cancelAlgorithm=f,t._autoAllocateChunkSize=h,t._pendingPullIntos=new x,e._readableStreamController=t;const y=r();q(b(y),()=>{t._started=!0,Be(t);},w=>{K(t,w);});}n(uo,"SetUpReadableByteStreamController");function Li(e,t,r){const s=Object.create(_e.prototype);let f=n(()=>{},"startAlgorithm"),c=n(()=>b(void 0),"pullAlgorithm"),h=n(()=>b(void 0),"cancelAlgorithm");t.start!==void 0&&(f=n(()=>t.start(s),"startAlgorithm")),t.pull!==void 0&&(c=n(()=>t.pull(s),"pullAlgorithm")),t.cancel!==void 0&&(h=n(w=>t.cancel(w),"cancelAlgorithm"));const y=t.autoAllocateChunkSize;if(y===0)throw new TypeError("autoAllocateChunkSize must be greater than 0");uo(e,s,f,c,h,r,y);}n(Li,"SetUpReadableByteStreamControllerFromUnderlyingSource");function $i(e,t,r){e._associatedReadableByteStreamController=t,e._view=r;}n($i,"SetUpReadableStreamBYOBRequest");function Dr(e){return new TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`)}n(Dr,"byobRequestBrandCheckException");function mt(e){return new TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`)}n(mt,"byteStreamControllerBrandCheckException");function fo(e){return new ke(e)}n(fo,"AcquireReadableStreamBYOBReader");function co(e,t){e._reader._readIntoRequests.push(t);}n(co,"ReadableStreamAddReadIntoRequest");function Di(e,t,r){const f=e._reader._readIntoRequests.shift();r?f._closeSteps(t):f._chunkSteps(t);}n(Di,"ReadableStreamFulfillReadIntoRequest");function ho(e){return e._reader._readIntoRequests.length}n(ho,"ReadableStreamGetNumReadIntoRequests");function Mr(e){const t=e._reader;return !(t===void 0||!Oe(t))}n(Mr,"ReadableStreamHasBYOBReader");const ln=class ln{constructor(t){if(de(t,1,"ReadableStreamBYOBReader"),Or(t,"First parameter"),Ce(t))throw new TypeError("This stream has already been locked for exclusive reading by another reader");if(!We(t._readableStreamController))throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");Fn(this,t),this._readIntoRequests=new x;}get closed(){return Oe(this)?this._closedPromise:g(Ut("closed"))}cancel(t=void 0){return Oe(this)?this._ownerReadableStream===void 0?g(He("cancel")):Pr(this,t):g(Ut("cancel"))}read(t){if(!Oe(this))return g(Ut("read"));if(!ArrayBuffer.isView(t))return g(new TypeError("view must be an array buffer view"));if(t.byteLength===0)return g(new TypeError("view must have non-zero byteLength"));if(t.buffer.byteLength===0)return g(new TypeError("view's buffer must have non-zero byteLength"));if(jt(t.buffer),this._ownerReadableStream===void 0)return g(He("read from"));let r,s;const f=E((h,y)=>{r=h,s=y;});return po(this,t,{_chunkSteps:h=>r({value:h,done:!1}),_closeSteps:h=>r({value:h,done:!0}),_errorSteps:h=>s(h)}),f}releaseLock(){if(!Oe(this))throw Ut("releaseLock");if(this._ownerReadableStream!==void 0){if(this._readIntoRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");fe(this);}}};n(ln,"ReadableStreamBYOBReader");let ke=ln;Object.defineProperties(ke.prototype,{cancel:{enumerable:!0},read:{enumerable:!0},releaseLock:{enumerable:!0},closed:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(ke.prototype,l.toStringTag,{value:"ReadableStreamBYOBReader",configurable:!0});function Oe(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_readIntoRequests")?!1:e instanceof ke}n(Oe,"IsReadableStreamBYOBReader");function po(e,t,r){const s=e._ownerReadableStream;s._disturbed=!0,s._state==="errored"?r._errorSteps(s._storedError):zi(s._readableStreamController,t,r);}n(po,"ReadableStreamBYOBReaderRead");function Ut(e){return new TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`)}n(Ut,"byobReaderBrandCheckException");function yt(e,t){const{highWaterMark:r}=e;if(r===void 0)return t;if(Kn(r)||r<0)throw new RangeError("Invalid highWaterMark");return r}n(yt,"ExtractHighWaterMark");function Nt(e){const{size:t}=e;return t||(()=>1)}n(Nt,"ExtractSizeAlgorithm");function xt(e,t){ce(e,t);const r=e?.highWaterMark,s=e?.size;return {highWaterMark:r===void 0?void 0:kr(r),size:s===void 0?void 0:Mi(s,`${t} has member 'size' that`)}}n(xt,"convertQueuingStrategy");function Mi(e,t){return Z(e,t),r=>kr(e(r))}n(Mi,"convertQueuingStrategySize");function Ui(e,t){ce(e,t);const r=e?.abort,s=e?.close,f=e?.start,c=e?.type,h=e?.write;return {abort:r===void 0?void 0:Ni(r,e,`${t} has member 'abort' that`),close:s===void 0?void 0:xi(s,e,`${t} has member 'close' that`),start:f===void 0?void 0:Hi(f,e,`${t} has member 'start' that`),write:h===void 0?void 0:Vi(h,e,`${t} has member 'write' that`),type:c}}n(Ui,"convertUnderlyingSink");function Ni(e,t,r){return Z(e,r),s=>ue(e,t,[s])}n(Ni,"convertUnderlyingSinkAbortCallback");function xi(e,t,r){return Z(e,r),()=>ue(e,t,[])}n(xi,"convertUnderlyingSinkCloseCallback");function Hi(e,t,r){return Z(e,r),s=>ve(e,t,[s])}n(Hi,"convertUnderlyingSinkStartCallback");function Vi(e,t,r){return Z(e,r),(s,f)=>ue(e,t,[s,f])}n(Vi,"convertUnderlyingSinkWriteCallback");function bo(e,t){if(!Qe(e))throw new TypeError(`${t} is not a WritableStream.`)}n(bo,"assertWritableStream");function Qi(e){if(typeof e!="object"||e===null)return !1;try{return typeof e.aborted=="boolean"}catch{return !1}}n(Qi,"isAbortSignal");const Yi=typeof AbortController=="function";function Gi(){if(Yi)return new AbortController}n(Gi,"createAbortController");const un=class un{constructor(t={},r={}){t===void 0?t=null:Un(t,"First parameter");const s=xt(r,"Second parameter"),f=Ui(t,"First parameter");if(yo(this),f.type!==void 0)throw new RangeError("Invalid type is specified");const h=Nt(s),y=yt(s,1);ua(this,f,y,h);}get locked(){if(!Qe(this))throw Gt("locked");return Ye(this)}abort(t=void 0){return Qe(this)?Ye(this)?g(new TypeError("Cannot abort a stream that already has a writer")):Ht(this,t):g(Gt("abort"))}close(){return Qe(this)?Ye(this)?g(new TypeError("Cannot close a stream that already has a writer")):oe(this)?g(new TypeError("Cannot close an already-closing stream")):go(this):g(Gt("close"))}getWriter(){if(!Qe(this))throw Gt("getWriter");return mo(this)}};n(un,"WritableStream");let qe=un;Object.defineProperties(qe.prototype,{abort:{enumerable:!0},close:{enumerable:!0},getWriter:{enumerable:!0},locked:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(qe.prototype,l.toStringTag,{value:"WritableStream",configurable:!0});function mo(e){return new ze(e)}n(mo,"AcquireWritableStreamDefaultWriter");function Zi(e,t,r,s,f=1,c=()=>1){const h=Object.create(qe.prototype);yo(h);const y=Object.create(Se.prototype);return Co(h,y,e,t,r,s,f,c),h}n(Zi,"CreateWritableStream");function yo(e){e._state="writable",e._storedError=void 0,e._writer=void 0,e._writableStreamController=void 0,e._writeRequests=new x,e._inFlightWriteRequest=void 0,e._closeRequest=void 0,e._inFlightCloseRequest=void 0,e._pendingAbortRequest=void 0,e._backpressure=!1;}n(yo,"InitializeWritableStream");function Qe(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_writableStreamController")?!1:e instanceof qe}n(Qe,"IsWritableStream");function Ye(e){return e._writer!==void 0}n(Ye,"IsWritableStreamLocked");function Ht(e,t){var r;if(e._state==="closed"||e._state==="errored")return b(void 0);e._writableStreamController._abortReason=t,(r=e._writableStreamController._abortController)===null||r===void 0||r.abort();const s=e._state;if(s==="closed"||s==="errored")return b(void 0);if(e._pendingAbortRequest!==void 0)return e._pendingAbortRequest._promise;let f=!1;s==="erroring"&&(f=!0,t=void 0);const c=E((h,y)=>{e._pendingAbortRequest={_promise:void 0,_resolve:h,_reject:y,_reason:t,_wasAlreadyErroring:f};});return e._pendingAbortRequest._promise=c,f||Nr(e,t),c}n(Ht,"WritableStreamAbort");function go(e){const t=e._state;if(t==="closed"||t==="errored")return g(new TypeError(`The stream (in ${t} state) is not in the writable state and cannot be closed`));const r=E((f,c)=>{const h={_resolve:f,_reject:c};e._closeRequest=h;}),s=e._writer;return s!==void 0&&e._backpressure&&t==="writable"&&Jr(s),fa(e._writableStreamController),r}n(go,"WritableStreamClose");function Ki(e){return E((r,s)=>{const f={_resolve:r,_reject:s};e._writeRequests.push(f);})}n(Ki,"WritableStreamAddWriteRequest");function Ur(e,t){if(e._state==="writable"){Nr(e,t);return}xr(e);}n(Ur,"WritableStreamDealWithRejection");function Nr(e,t){const r=e._writableStreamController;e._state="erroring",e._storedError=t;const s=e._writer;s!==void 0&&So(s,t),!ra(e)&&r._started&&xr(e);}n(Nr,"WritableStreamStartErroring");function xr(e){e._state="errored",e._writableStreamController[Dn]();const t=e._storedError;if(e._writeRequests.forEach(f=>{f._reject(t);}),e._writeRequests=new x,e._pendingAbortRequest===void 0){Vt(e);return}const r=e._pendingAbortRequest;if(e._pendingAbortRequest=void 0,r._wasAlreadyErroring){r._reject(t),Vt(e);return}const s=e._writableStreamController[$n](r._reason);q(s,()=>{r._resolve(),Vt(e);},f=>{r._reject(f),Vt(e);});}n(xr,"WritableStreamFinishErroring");function Ji(e){e._inFlightWriteRequest._resolve(void 0),e._inFlightWriteRequest=void 0;}n(Ji,"WritableStreamFinishInFlightWrite");function Xi(e,t){e._inFlightWriteRequest._reject(t),e._inFlightWriteRequest=void 0,Ur(e,t);}n(Xi,"WritableStreamFinishInFlightWriteWithError");function ea(e){e._inFlightCloseRequest._resolve(void 0),e._inFlightCloseRequest=void 0,e._state==="erroring"&&(e._storedError=void 0,e._pendingAbortRequest!==void 0&&(e._pendingAbortRequest._resolve(),e._pendingAbortRequest=void 0)),e._state="closed";const r=e._writer;r!==void 0&&Ao(r);}n(ea,"WritableStreamFinishInFlightClose");function ta(e,t){e._inFlightCloseRequest._reject(t),e._inFlightCloseRequest=void 0,e._pendingAbortRequest!==void 0&&(e._pendingAbortRequest._reject(t),e._pendingAbortRequest=void 0),Ur(e,t);}n(ta,"WritableStreamFinishInFlightCloseWithError");function oe(e){return !(e._closeRequest===void 0&&e._inFlightCloseRequest===void 0)}n(oe,"WritableStreamCloseQueuedOrInFlight");function ra(e){return !(e._inFlightWriteRequest===void 0&&e._inFlightCloseRequest===void 0)}n(ra,"WritableStreamHasOperationMarkedInFlight");function na(e){e._inFlightCloseRequest=e._closeRequest,e._closeRequest=void 0;}n(na,"WritableStreamMarkCloseRequestInFlight");function oa(e){e._inFlightWriteRequest=e._writeRequests.shift();}n(oa,"WritableStreamMarkFirstWriteRequestInFlight");function Vt(e){e._closeRequest!==void 0&&(e._closeRequest._reject(e._storedError),e._closeRequest=void 0);const t=e._writer;t!==void 0&&Zr(t,e._storedError);}n(Vt,"WritableStreamRejectCloseAndClosedPromiseIfNeeded");function Hr(e,t){const r=e._writer;r!==void 0&&t!==e._backpressure&&(t?ya(r):Jr(r)),e._backpressure=t;}n(Hr,"WritableStreamUpdateBackpressure");const fn=class fn{constructor(t){if(de(t,1,"WritableStreamDefaultWriter"),bo(t,"First parameter"),Ye(t))throw new TypeError("This stream has already been locked for exclusive writing by another writer");this._ownerWritableStream=t,t._writer=this;const r=t._state;if(r==="writable")!oe(t)&&t._backpressure?Kt(this):Wo(this),Zt(this);else if(r==="erroring")Kr(this,t._storedError),Zt(this);else if(r==="closed")Wo(this),ba(this);else {const s=t._storedError;Kr(this,s),Eo(this,s);}}get closed(){return je(this)?this._closedPromise:g(Fe("closed"))}get desiredSize(){if(!je(this))throw Fe("desiredSize");if(this._ownerWritableStream===void 0)throw gt("desiredSize");return la(this)}get ready(){return je(this)?this._readyPromise:g(Fe("ready"))}abort(t=void 0){return je(this)?this._ownerWritableStream===void 0?g(gt("abort")):ia(this,t):g(Fe("abort"))}close(){if(!je(this))return g(Fe("close"));const t=this._ownerWritableStream;return t===void 0?g(gt("close")):oe(t)?g(new TypeError("Cannot close an already-closing stream")):_o(this)}releaseLock(){if(!je(this))throw Fe("releaseLock");this._ownerWritableStream!==void 0&&wo(this);}write(t=void 0){return je(this)?this._ownerWritableStream===void 0?g(gt("write to")):Ro(this,t):g(Fe("write"))}};n(fn,"WritableStreamDefaultWriter");let ze=fn;Object.defineProperties(ze.prototype,{abort:{enumerable:!0},close:{enumerable:!0},releaseLock:{enumerable:!0},write:{enumerable:!0},closed:{enumerable:!0},desiredSize:{enumerable:!0},ready:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(ze.prototype,l.toStringTag,{value:"WritableStreamDefaultWriter",configurable:!0});function je(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_ownerWritableStream")?!1:e instanceof ze}n(je,"IsWritableStreamDefaultWriter");function ia(e,t){const r=e._ownerWritableStream;return Ht(r,t)}n(ia,"WritableStreamDefaultWriterAbort");function _o(e){const t=e._ownerWritableStream;return go(t)}n(_o,"WritableStreamDefaultWriterClose");function aa(e){const t=e._ownerWritableStream,r=t._state;return oe(t)||r==="closed"?b(void 0):r==="errored"?g(t._storedError):_o(e)}n(aa,"WritableStreamDefaultWriterCloseWithErrorPropagation");function sa(e,t){e._closedPromiseState==="pending"?Zr(e,t):ma(e,t);}n(sa,"WritableStreamDefaultWriterEnsureClosedPromiseRejected");function So(e,t){e._readyPromiseState==="pending"?Bo(e,t):ga(e,t);}n(So,"WritableStreamDefaultWriterEnsureReadyPromiseRejected");function la(e){const t=e._ownerWritableStream,r=t._state;return r==="errored"||r==="erroring"?null:r==="closed"?0:Po(t._writableStreamController)}n(la,"WritableStreamDefaultWriterGetDesiredSize");function wo(e){const t=e._ownerWritableStream,r=new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");So(e,r),sa(e,r),t._writer=void 0,e._ownerWritableStream=void 0;}n(wo,"WritableStreamDefaultWriterRelease");function Ro(e,t){const r=e._ownerWritableStream,s=r._writableStreamController,f=ca(s,t);if(r!==e._ownerWritableStream)return g(gt("write to"));const c=r._state;if(c==="errored")return g(r._storedError);if(oe(r)||c==="closed")return g(new TypeError("The stream is closing or closed and cannot be written to"));if(c==="erroring")return g(r._storedError);const h=Ki(r);return da(s,t,f),h}n(Ro,"WritableStreamDefaultWriterWrite");const To={},cn=class cn{constructor(){throw new TypeError("Illegal constructor")}get abortReason(){if(!Vr(this))throw Gr("abortReason");return this._abortReason}get signal(){if(!Vr(this))throw Gr("signal");if(this._abortController===void 0)throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");return this._abortController.signal}error(t=void 0){if(!Vr(this))throw Gr("error");this._controlledWritableStream._state==="writable"&&vo(this,t);}[$n](t){const r=this._abortAlgorithm(t);return Qt(this),r}[Dn](){ge(this);}};n(cn,"WritableStreamDefaultController");let Se=cn;Object.defineProperties(Se.prototype,{abortReason:{enumerable:!0},signal:{enumerable:!0},error:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(Se.prototype,l.toStringTag,{value:"WritableStreamDefaultController",configurable:!0});function Vr(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_controlledWritableStream")?!1:e instanceof Se}n(Vr,"IsWritableStreamDefaultController");function Co(e,t,r,s,f,c,h,y){t._controlledWritableStream=e,e._writableStreamController=t,t._queue=void 0,t._queueTotalSize=void 0,ge(t),t._abortReason=void 0,t._abortController=Gi(),t._started=!1,t._strategySizeAlgorithm=y,t._strategyHWM=h,t._writeAlgorithm=s,t._closeAlgorithm=f,t._abortAlgorithm=c;const w=Yr(t);Hr(e,w);const T=r(),P=b(T);q(P,()=>{t._started=!0,Yt(t);},v=>{t._started=!0,Ur(e,v);});}n(Co,"SetUpWritableStreamDefaultController");function ua(e,t,r,s){const f=Object.create(Se.prototype);let c=n(()=>{},"startAlgorithm"),h=n(()=>b(void 0),"writeAlgorithm"),y=n(()=>b(void 0),"closeAlgorithm"),w=n(()=>b(void 0),"abortAlgorithm");t.start!==void 0&&(c=n(()=>t.start(f),"startAlgorithm")),t.write!==void 0&&(h=n(T=>t.write(T,f),"writeAlgorithm")),t.close!==void 0&&(y=n(()=>t.close(),"closeAlgorithm")),t.abort!==void 0&&(w=n(T=>t.abort(T),"abortAlgorithm")),Co(e,f,c,h,y,w,r,s);}n(ua,"SetUpWritableStreamDefaultControllerFromUnderlyingSink");function Qt(e){e._writeAlgorithm=void 0,e._closeAlgorithm=void 0,e._abortAlgorithm=void 0,e._strategySizeAlgorithm=void 0;}n(Qt,"WritableStreamDefaultControllerClearAlgorithms");function fa(e){jr(e,To,0),Yt(e);}n(fa,"WritableStreamDefaultControllerClose");function ca(e,t){try{return e._strategySizeAlgorithm(t)}catch(r){return Qr(e,r),1}}n(ca,"WritableStreamDefaultControllerGetChunkSize");function Po(e){return e._strategyHWM-e._queueTotalSize}n(Po,"WritableStreamDefaultControllerGetDesiredSize");function da(e,t,r){try{jr(e,t,r);}catch(f){Qr(e,f);return}const s=e._controlledWritableStream;if(!oe(s)&&s._state==="writable"){const f=Yr(e);Hr(s,f);}Yt(e);}n(da,"WritableStreamDefaultControllerWrite");function Yt(e){const t=e._controlledWritableStream;if(!e._started||t._inFlightWriteRequest!==void 0)return;if(t._state==="erroring"){xr(t);return}if(e._queue.length===0)return;const s=qi(e);s===To?ha(e):pa(e,s);}n(Yt,"WritableStreamDefaultControllerAdvanceQueueIfNeeded");function Qr(e,t){e._controlledWritableStream._state==="writable"&&vo(e,t);}n(Qr,"WritableStreamDefaultControllerErrorIfNeeded");function ha(e){const t=e._controlledWritableStream;na(t),zr(e);const r=e._closeAlgorithm();Qt(e),q(r,()=>{ea(t);},s=>{ta(t,s);});}n(ha,"WritableStreamDefaultControllerProcessClose");function pa(e,t){const r=e._controlledWritableStream;oa(r);const s=e._writeAlgorithm(t);q(s,()=>{Ji(r);const f=r._state;if(zr(e),!oe(r)&&f==="writable"){const c=Yr(e);Hr(r,c);}Yt(e);},f=>{r._state==="writable"&&Qt(e),Xi(r,f);});}n(pa,"WritableStreamDefaultControllerProcessWrite");function Yr(e){return Po(e)<=0}n(Yr,"WritableStreamDefaultControllerGetBackpressure");function vo(e,t){const r=e._controlledWritableStream;Qt(e),Nr(r,t);}n(vo,"WritableStreamDefaultControllerError");function Gt(e){return new TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`)}n(Gt,"streamBrandCheckException$2");function Gr(e){return new TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`)}n(Gr,"defaultControllerBrandCheckException$2");function Fe(e){return new TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`)}n(Fe,"defaultWriterBrandCheckException");function gt(e){return new TypeError("Cannot "+e+" a stream using a released writer")}n(gt,"defaultWriterLockException");function Zt(e){e._closedPromise=E((t,r)=>{e._closedPromise_resolve=t,e._closedPromise_reject=r,e._closedPromiseState="pending";});}n(Zt,"defaultWriterClosedPromiseInitialize");function Eo(e,t){Zt(e),Zr(e,t);}n(Eo,"defaultWriterClosedPromiseInitializeAsRejected");function ba(e){Zt(e),Ao(e);}n(ba,"defaultWriterClosedPromiseInitializeAsResolved");function Zr(e,t){e._closedPromise_reject!==void 0&&($(e._closedPromise),e._closedPromise_reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="rejected");}n(Zr,"defaultWriterClosedPromiseReject");function ma(e,t){Eo(e,t);}n(ma,"defaultWriterClosedPromiseResetToRejected");function Ao(e){e._closedPromise_resolve!==void 0&&(e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="resolved");}n(Ao,"defaultWriterClosedPromiseResolve");function Kt(e){e._readyPromise=E((t,r)=>{e._readyPromise_resolve=t,e._readyPromise_reject=r;}),e._readyPromiseState="pending";}n(Kt,"defaultWriterReadyPromiseInitialize");function Kr(e,t){Kt(e),Bo(e,t);}n(Kr,"defaultWriterReadyPromiseInitializeAsRejected");function Wo(e){Kt(e),Jr(e);}n(Wo,"defaultWriterReadyPromiseInitializeAsResolved");function Bo(e,t){e._readyPromise_reject!==void 0&&($(e._readyPromise),e._readyPromise_reject(t),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="rejected");}n(Bo,"defaultWriterReadyPromiseReject");function ya(e){Kt(e);}n(ya,"defaultWriterReadyPromiseReset");function ga(e,t){Kr(e,t);}n(ga,"defaultWriterReadyPromiseResetToRejected");function Jr(e){e._readyPromise_resolve!==void 0&&(e._readyPromise_resolve(void 0),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="fulfilled");}n(Jr,"defaultWriterReadyPromiseResolve");const ko=typeof DOMException<"u"?DOMException:void 0;function _a(e){if(!(typeof e=="function"||typeof e=="object"))return !1;try{return new e,!0}catch{return !1}}n(_a,"isDOMExceptionConstructor");function Sa(){const e=n(function(r,s){this.message=r||"",this.name=s||"Error",Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor);},"DOMException");return e.prototype=Object.create(Error.prototype),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,configurable:!0}),e}n(Sa,"createDOMExceptionPolyfill");const wa=_a(ko)?ko:Sa();function Oo(e,t,r,s,f,c){const h=Ve(e),y=mo(t);e._disturbed=!0;let w=!1,T=b(void 0);return E((P,v)=>{let z;if(c!==void 0){if(z=n(()=>{const _=new wa("Aborted","AbortError"),R=[];s||R.push(()=>t._state==="writable"?Ht(t,_):b(void 0)),f||R.push(()=>e._state==="readable"?J(e,_):b(void 0)),U(()=>Promise.all(R.map(W=>W())),!0,_);},"abortAlgorithm"),c.aborted){z();return}c.addEventListener("abort",z);}function X(){return E((_,R)=>{function W(H){H?_():A(Xe(),W,R);}n(W,"next"),W(!1);})}n(X,"pipeLoop");function Xe(){return w?b(!0):A(y._readyPromise,()=>E((_,R)=>{ht(h,{_chunkSteps:W=>{T=A(Ro(y,W),void 0,u),_(!1);},_closeSteps:()=>_(!0),_errorSteps:R});}))}if(n(Xe,"pipeStep"),he(e,h._closedPromise,_=>{s?Q(!0,_):U(()=>Ht(t,_),!0,_);}),he(t,y._closedPromise,_=>{f?Q(!0,_):U(()=>J(e,_),!0,_);}),M(e,h._closedPromise,()=>{r?Q():U(()=>aa(y));}),oe(t)||t._state==="closed"){const _=new TypeError("the destination writable stream closed before all data could be piped to it");f?Q(!0,_):U(()=>J(e,_),!0,_);}$(X());function Pe(){const _=T;return A(T,()=>_!==T?Pe():void 0)}n(Pe,"waitForWritesToFinish");function he(_,R,W){_._state==="errored"?W(_._storedError):dt(R,W);}n(he,"isOrBecomesErrored");function M(_,R,W){_._state==="closed"?W():ne(R,W);}n(M,"isOrBecomesClosed");function U(_,R,W){if(w)return;w=!0,t._state==="writable"&&!oe(t)?ne(Pe(),H):H();function H(){q(_(),()=>pe(R,W),et=>pe(!0,et));}n(H,"doTheRest");}n(U,"shutdownWithAction");function Q(_,R){w||(w=!0,t._state==="writable"&&!oe(t)?ne(Pe(),()=>pe(_,R)):pe(_,R));}n(Q,"shutdown");function pe(_,R){wo(y),fe(h),c!==void 0&&c.removeEventListener("abort",z),_?v(R):P(void 0);}n(pe,"finalize");})}n(Oo,"ReadableStreamPipeTo");const dn=class dn{constructor(){throw new TypeError("Illegal constructor")}get desiredSize(){if(!Jt(this))throw tr("desiredSize");return Xr(this)}close(){if(!Jt(this))throw tr("close");if(!Ge(this))throw new TypeError("The stream is not in a state that permits close");St(this);}enqueue(t=void 0){if(!Jt(this))throw tr("enqueue");if(!Ge(this))throw new TypeError("The stream is not in a state that permits enqueue");return er(this,t)}error(t=void 0){if(!Jt(this))throw tr("error");Re(this,t);}[Ar](t){ge(this);const r=this._cancelAlgorithm(t);return Xt(this),r}[Wr](t){const r=this._controlledReadableStream;if(this._queue.length>0){const s=zr(this);this._closeRequested&&this._queue.length===0?(Xt(this),wt(r)):_t(this),t._chunkSteps(s);}else Hn(r,t),_t(this);}};n(dn,"ReadableStreamDefaultController");let we=dn;Object.defineProperties(we.prototype,{close:{enumerable:!0},enqueue:{enumerable:!0},error:{enumerable:!0},desiredSize:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(we.prototype,l.toStringTag,{value:"ReadableStreamDefaultController",configurable:!0});function Jt(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_controlledReadableStream")?!1:e instanceof we}n(Jt,"IsReadableStreamDefaultController");function _t(e){if(!qo(e))return;if(e._pulling){e._pullAgain=!0;return}e._pulling=!0;const r=e._pullAlgorithm();q(r,()=>{e._pulling=!1,e._pullAgain&&(e._pullAgain=!1,_t(e));},s=>{Re(e,s);});}n(_t,"ReadableStreamDefaultControllerCallPullIfNeeded");function qo(e){const t=e._controlledReadableStream;return !Ge(e)||!e._started?!1:!!(Ce(t)&&Ot(t)>0||Xr(e)>0)}n(qo,"ReadableStreamDefaultControllerShouldCallPull");function Xt(e){e._pullAlgorithm=void 0,e._cancelAlgorithm=void 0,e._strategySizeAlgorithm=void 0;}n(Xt,"ReadableStreamDefaultControllerClearAlgorithms");function St(e){if(!Ge(e))return;const t=e._controlledReadableStream;e._closeRequested=!0,e._queue.length===0&&(Xt(e),wt(t));}n(St,"ReadableStreamDefaultControllerClose");function er(e,t){if(!Ge(e))return;const r=e._controlledReadableStream;if(Ce(r)&&Ot(r)>0)qr(r,t,!1);else {let s;try{s=e._strategySizeAlgorithm(t);}catch(f){throw Re(e,f),f}try{jr(e,t,s);}catch(f){throw Re(e,f),f}}_t(e);}n(er,"ReadableStreamDefaultControllerEnqueue");function Re(e,t){const r=e._controlledReadableStream;r._state==="readable"&&(ge(e),Xt(e),Io(r,t));}n(Re,"ReadableStreamDefaultControllerError");function Xr(e){const t=e._controlledReadableStream._state;return t==="errored"?null:t==="closed"?0:e._strategyHWM-e._queueTotalSize}n(Xr,"ReadableStreamDefaultControllerGetDesiredSize");function Ra(e){return !qo(e)}n(Ra,"ReadableStreamDefaultControllerHasBackpressure");function Ge(e){const t=e._controlledReadableStream._state;return !e._closeRequested&&t==="readable"}n(Ge,"ReadableStreamDefaultControllerCanCloseOrEnqueue");function zo(e,t,r,s,f,c,h){t._controlledReadableStream=e,t._queue=void 0,t._queueTotalSize=void 0,ge(t),t._started=!1,t._closeRequested=!1,t._pullAgain=!1,t._pulling=!1,t._strategySizeAlgorithm=h,t._strategyHWM=c,t._pullAlgorithm=s,t._cancelAlgorithm=f,e._readableStreamController=t;const y=r();q(b(y),()=>{t._started=!0,_t(t);},w=>{Re(t,w);});}n(zo,"SetUpReadableStreamDefaultController");function Ta(e,t,r,s){const f=Object.create(we.prototype);let c=n(()=>{},"startAlgorithm"),h=n(()=>b(void 0),"pullAlgorithm"),y=n(()=>b(void 0),"cancelAlgorithm");t.start!==void 0&&(c=n(()=>t.start(f),"startAlgorithm")),t.pull!==void 0&&(h=n(()=>t.pull(f),"pullAlgorithm")),t.cancel!==void 0&&(y=n(w=>t.cancel(w),"cancelAlgorithm")),zo(e,f,c,h,y,r,s);}n(Ta,"SetUpReadableStreamDefaultControllerFromUnderlyingSource");function tr(e){return new TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`)}n(tr,"defaultControllerBrandCheckException$1");function Ca(e,t){return We(e._readableStreamController)?va(e):Pa(e)}n(Ca,"ReadableStreamTee");function Pa(e,t){const r=Ve(e);let s=!1,f=!1,c=!1,h=!1,y,w,T,P,v;const z=E(M=>{v=M;});function X(){return s?(f=!0,b(void 0)):(s=!0,ht(r,{_chunkSteps:U=>{F(()=>{f=!1;const Q=U,pe=U;c||er(T._readableStreamController,Q),h||er(P._readableStreamController,pe),s=!1,f&&X();});},_closeSteps:()=>{s=!1,c||St(T._readableStreamController),h||St(P._readableStreamController),(!c||!h)&&v(void 0);},_errorSteps:()=>{s=!1;}}),b(void 0))}n(X,"pullAlgorithm");function Xe(M){if(c=!0,y=M,h){const U=pt([y,w]),Q=J(e,U);v(Q);}return z}n(Xe,"cancel1Algorithm");function Pe(M){if(h=!0,w=M,c){const U=pt([y,w]),Q=J(e,U);v(Q);}return z}n(Pe,"cancel2Algorithm");function he(){}return n(he,"startAlgorithm"),T=en(he,X,Xe),P=en(he,X,Pe),dt(r._closedPromise,M=>{Re(T._readableStreamController,M),Re(P._readableStreamController,M),(!c||!h)&&v(void 0);}),[T,P]}n(Pa,"ReadableStreamDefaultTee");function va(e){let t=Ve(e),r=!1,s=!1,f=!1,c=!1,h=!1,y,w,T,P,v;const z=E(_=>{v=_;});function X(_){dt(_._closedPromise,R=>{_===t&&(K(T._readableStreamController,R),K(P._readableStreamController,R),(!c||!h)&&v(void 0));});}n(X,"forwardReaderError");function Xe(){Oe(t)&&(fe(t),t=Ve(e),X(t)),ht(t,{_chunkSteps:R=>{F(()=>{s=!1,f=!1;const W=R;let H=R;if(!c&&!h)try{H=eo(R);}catch(et){K(T._readableStreamController,et),K(P._readableStreamController,et),v(J(e,et));return}c||$t(T._readableStreamController,W),h||$t(P._readableStreamController,H),r=!1,s?he():f&&M();});},_closeSteps:()=>{r=!1,c||bt(T._readableStreamController),h||bt(P._readableStreamController),T._readableStreamController._pendingPullIntos.length>0&&Dt(T._readableStreamController,0),P._readableStreamController._pendingPullIntos.length>0&&Dt(P._readableStreamController,0),(!c||!h)&&v(void 0);},_errorSteps:()=>{r=!1;}});}n(Xe,"pullWithDefaultReader");function Pe(_,R){ye(t)&&(fe(t),t=fo(e),X(t));const W=R?P:T,H=R?T:P;po(t,_,{_chunkSteps:tt=>{F(()=>{s=!1,f=!1;const rt=R?h:c;if(R?c:h)rt||Mt(W._readableStreamController,tt);else {let Zo;try{Zo=eo(tt);}catch(gn){K(W._readableStreamController,gn),K(H._readableStreamController,gn),v(J(e,gn));return}rt||Mt(W._readableStreamController,tt),$t(H._readableStreamController,Zo);}r=!1,s?he():f&&M();});},_closeSteps:tt=>{r=!1;const rt=R?h:c,sr=R?c:h;rt||bt(W._readableStreamController),sr||bt(H._readableStreamController),tt!==void 0&&(rt||Mt(W._readableStreamController,tt),!sr&&H._readableStreamController._pendingPullIntos.length>0&&Dt(H._readableStreamController,0)),(!rt||!sr)&&v(void 0);},_errorSteps:()=>{r=!1;}});}n(Pe,"pullWithBYOBReader");function he(){if(r)return s=!0,b(void 0);r=!0;const _=$r(T._readableStreamController);return _===null?Xe():Pe(_._view,!1),b(void 0)}n(he,"pull1Algorithm");function M(){if(r)return f=!0,b(void 0);r=!0;const _=$r(P._readableStreamController);return _===null?Xe():Pe(_._view,!0),b(void 0)}n(M,"pull2Algorithm");function U(_){if(c=!0,y=_,h){const R=pt([y,w]),W=J(e,R);v(W);}return z}n(U,"cancel1Algorithm");function Q(_){if(h=!0,w=_,c){const R=pt([y,w]),W=J(e,R);v(W);}return z}n(Q,"cancel2Algorithm");function pe(){}return n(pe,"startAlgorithm"),T=Fo(pe,he,U),P=Fo(pe,M,Q),X(t),[T,P]}n(va,"ReadableByteStreamTee");function Ea(e,t){ce(e,t);const r=e,s=r?.autoAllocateChunkSize,f=r?.cancel,c=r?.pull,h=r?.start,y=r?.type;return {autoAllocateChunkSize:s===void 0?void 0:xn(s,`${t} has member 'autoAllocateChunkSize' that`),cancel:f===void 0?void 0:Aa(f,r,`${t} has member 'cancel' that`),pull:c===void 0?void 0:Wa(c,r,`${t} has member 'pull' that`),start:h===void 0?void 0:Ba(h,r,`${t} has member 'start' that`),type:y===void 0?void 0:ka(y,`${t} has member 'type' that`)}}n(Ea,"convertUnderlyingDefaultOrByteSource");function Aa(e,t,r){return Z(e,r),s=>ue(e,t,[s])}n(Aa,"convertUnderlyingSourceCancelCallback");function Wa(e,t,r){return Z(e,r),s=>ue(e,t,[s])}n(Wa,"convertUnderlyingSourcePullCallback");function Ba(e,t,r){return Z(e,r),s=>ve(e,t,[s])}n(Ba,"convertUnderlyingSourceStartCallback");function ka(e,t){if(e=`${e}`,e!=="bytes")throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamType`);return e}n(ka,"convertReadableStreamType");function Oa(e,t){ce(e,t);const r=e?.mode;return {mode:r===void 0?void 0:qa(r,`${t} has member 'mode' that`)}}n(Oa,"convertReaderOptions");function qa(e,t){if(e=`${e}`,e!=="byob")throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);return e}n(qa,"convertReadableStreamReaderMode");function za(e,t){return ce(e,t),{preventCancel:!!e?.preventCancel}}n(za,"convertIteratorOptions");function jo(e,t){ce(e,t);const r=e?.preventAbort,s=e?.preventCancel,f=e?.preventClose,c=e?.signal;return c!==void 0&&ja(c,`${t} has member 'signal' that`),{preventAbort:!!r,preventCancel:!!s,preventClose:!!f,signal:c}}n(jo,"convertPipeOptions");function ja(e,t){if(!Qi(e))throw new TypeError(`${t} is not an AbortSignal.`)}n(ja,"assertAbortSignal");function Fa(e,t){ce(e,t);const r=e?.readable;Br(r,"readable","ReadableWritablePair"),Or(r,`${t} has member 'readable' that`);const s=e?.writable;return Br(s,"writable","ReadableWritablePair"),bo(s,`${t} has member 'writable' that`),{readable:r,writable:s}}n(Fa,"convertReadableWritablePair");const hn=class hn{constructor(t={},r={}){t===void 0?t=null:Un(t,"First parameter");const s=xt(r,"Second parameter"),f=Ea(t,"First parameter");if(tn(this),f.type==="bytes"){if(s.size!==void 0)throw new RangeError("The strategy for a byte stream cannot have a size function");const c=yt(s,0);Li(this,f,c);}else {const c=Nt(s),h=yt(s,1);Ta(this,f,h,c);}}get locked(){if(!Te(this))throw Ie("locked");return Ce(this)}cancel(t=void 0){return Te(this)?Ce(this)?g(new TypeError("Cannot cancel a stream that already has a reader")):J(this,t):g(Ie("cancel"))}getReader(t=void 0){if(!Te(this))throw Ie("getReader");return Oa(t,"First parameter").mode===void 0?Ve(this):fo(this)}pipeThrough(t,r={}){if(!Te(this))throw Ie("pipeThrough");de(t,1,"pipeThrough");const s=Fa(t,"First parameter"),f=jo(r,"Second parameter");if(Ce(this))throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");if(Ye(s.writable))throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");const c=Oo(this,s.writable,f.preventClose,f.preventAbort,f.preventCancel,f.signal);return $(c),s.readable}pipeTo(t,r={}){if(!Te(this))return g(Ie("pipeTo"));if(t===void 0)return g("Parameter 1 is required in 'pipeTo'.");if(!Qe(t))return g(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));let s;try{s=jo(r,"Second parameter");}catch(f){return g(f)}return Ce(this)?g(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")):Ye(t)?g(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")):Oo(this,t,s.preventClose,s.preventAbort,s.preventCancel,s.signal)}tee(){if(!Te(this))throw Ie("tee");const t=Ca(this);return pt(t)}values(t=void 0){if(!Te(this))throw Ie("values");const r=za(t,"First parameter");return ki(this,r.preventCancel)}};n(hn,"ReadableStream");let ie=hn;Object.defineProperties(ie.prototype,{cancel:{enumerable:!0},getReader:{enumerable:!0},pipeThrough:{enumerable:!0},pipeTo:{enumerable:!0},tee:{enumerable:!0},values:{enumerable:!0},locked:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(ie.prototype,l.toStringTag,{value:"ReadableStream",configurable:!0}),typeof l.asyncIterator=="symbol"&&Object.defineProperty(ie.prototype,l.asyncIterator,{value:ie.prototype.values,writable:!0,configurable:!0});function en(e,t,r,s=1,f=()=>1){const c=Object.create(ie.prototype);tn(c);const h=Object.create(we.prototype);return zo(c,h,e,t,r,s,f),c}n(en,"CreateReadableStream");function Fo(e,t,r){const s=Object.create(ie.prototype);tn(s);const f=Object.create(_e.prototype);return uo(s,f,e,t,r,0,void 0),s}n(Fo,"CreateReadableByteStream");function tn(e){e._state="readable",e._reader=void 0,e._storedError=void 0,e._disturbed=!1;}n(tn,"InitializeReadableStream");function Te(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_readableStreamController")?!1:e instanceof ie}n(Te,"IsReadableStream");function Ce(e){return e._reader!==void 0}n(Ce,"IsReadableStreamLocked");function J(e,t){if(e._disturbed=!0,e._state==="closed")return b(void 0);if(e._state==="errored")return g(e._storedError);wt(e);const r=e._reader;r!==void 0&&Oe(r)&&(r._readIntoRequests.forEach(f=>{f._closeSteps(void 0);}),r._readIntoRequests=new x);const s=e._readableStreamController[Ar](t);return O(s,u)}n(J,"ReadableStreamCancel");function wt(e){e._state="closed";const t=e._reader;t!==void 0&&(Ln(t),ye(t)&&(t._readRequests.forEach(r=>{r._closeSteps();}),t._readRequests=new x));}n(wt,"ReadableStreamClose");function Io(e,t){e._state="errored",e._storedError=t;const r=e._reader;r!==void 0&&(Er(r,t),ye(r)?(r._readRequests.forEach(s=>{s._errorSteps(t);}),r._readRequests=new x):(r._readIntoRequests.forEach(s=>{s._errorSteps(t);}),r._readIntoRequests=new x));}n(Io,"ReadableStreamError");function Ie(e){return new TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`)}n(Ie,"streamBrandCheckException$1");function Lo(e,t){ce(e,t);const r=e?.highWaterMark;return Br(r,"highWaterMark","QueuingStrategyInit"),{highWaterMark:kr(r)}}n(Lo,"convertQueuingStrategyInit");const $o=n(e=>e.byteLength,"byteLengthSizeFunction");try{Object.defineProperty($o,"name",{value:"size",configurable:!0});}catch{}const pn=class pn{constructor(t){de(t,1,"ByteLengthQueuingStrategy"),t=Lo(t,"First parameter"),this._byteLengthQueuingStrategyHighWaterMark=t.highWaterMark;}get highWaterMark(){if(!Mo(this))throw Do("highWaterMark");return this._byteLengthQueuingStrategyHighWaterMark}get size(){if(!Mo(this))throw Do("size");return $o}};n(pn,"ByteLengthQueuingStrategy");let Ze=pn;Object.defineProperties(Ze.prototype,{highWaterMark:{enumerable:!0},size:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(Ze.prototype,l.toStringTag,{value:"ByteLengthQueuingStrategy",configurable:!0});function Do(e){return new TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`)}n(Do,"byteLengthBrandCheckException");function Mo(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_byteLengthQueuingStrategyHighWaterMark")?!1:e instanceof Ze}n(Mo,"IsByteLengthQueuingStrategy");const Uo=n(()=>1,"countSizeFunction");try{Object.defineProperty(Uo,"name",{value:"size",configurable:!0});}catch{}const bn=class bn{constructor(t){de(t,1,"CountQueuingStrategy"),t=Lo(t,"First parameter"),this._countQueuingStrategyHighWaterMark=t.highWaterMark;}get highWaterMark(){if(!xo(this))throw No("highWaterMark");return this._countQueuingStrategyHighWaterMark}get size(){if(!xo(this))throw No("size");return Uo}};n(bn,"CountQueuingStrategy");let Ke=bn;Object.defineProperties(Ke.prototype,{highWaterMark:{enumerable:!0},size:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(Ke.prototype,l.toStringTag,{value:"CountQueuingStrategy",configurable:!0});function No(e){return new TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`)}n(No,"countBrandCheckException");function xo(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_countQueuingStrategyHighWaterMark")?!1:e instanceof Ke}n(xo,"IsCountQueuingStrategy");function Ia(e,t){ce(e,t);const r=e?.flush,s=e?.readableType,f=e?.start,c=e?.transform,h=e?.writableType;return {flush:r===void 0?void 0:La(r,e,`${t} has member 'flush' that`),readableType:s,start:f===void 0?void 0:$a(f,e,`${t} has member 'start' that`),transform:c===void 0?void 0:Da(c,e,`${t} has member 'transform' that`),writableType:h}}n(Ia,"convertTransformer");function La(e,t,r){return Z(e,r),s=>ue(e,t,[s])}n(La,"convertTransformerFlushCallback");function $a(e,t,r){return Z(e,r),s=>ve(e,t,[s])}n($a,"convertTransformerStartCallback");function Da(e,t,r){return Z(e,r),(s,f)=>ue(e,t,[s,f])}n(Da,"convertTransformerTransformCallback");const mn=class mn{constructor(t={},r={},s={}){t===void 0&&(t=null);const f=xt(r,"Second parameter"),c=xt(s,"Third parameter"),h=Ia(t,"First parameter");if(h.readableType!==void 0)throw new RangeError("Invalid readableType specified");if(h.writableType!==void 0)throw new RangeError("Invalid writableType specified");const y=yt(c,0),w=Nt(c),T=yt(f,1),P=Nt(f);let v;const z=E(X=>{v=X;});Ma(this,z,T,P,y,w),Na(this,h),h.start!==void 0?v(h.start(this._transformStreamController)):v(void 0);}get readable(){if(!Ho(this))throw Go("readable");return this._readable}get writable(){if(!Ho(this))throw Go("writable");return this._writable}};n(mn,"TransformStream");let Je=mn;Object.defineProperties(Je.prototype,{readable:{enumerable:!0},writable:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(Je.prototype,l.toStringTag,{value:"TransformStream",configurable:!0});function Ma(e,t,r,s,f,c){function h(){return t}n(h,"startAlgorithm");function y(z){return Va(e,z)}n(y,"writeAlgorithm");function w(z){return Qa(e,z)}n(w,"abortAlgorithm");function T(){return Ya(e)}n(T,"closeAlgorithm"),e._writable=Zi(h,y,T,w,r,s);function P(){return Ga(e)}n(P,"pullAlgorithm");function v(z){return nr(e,z),b(void 0)}n(v,"cancelAlgorithm"),e._readable=en(h,P,v,f,c),e._backpressure=void 0,e._backpressureChangePromise=void 0,e._backpressureChangePromise_resolve=void 0,or(e,!0),e._transformStreamController=void 0;}n(Ma,"InitializeTransformStream");function Ho(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_transformStreamController")?!1:e instanceof Je}n(Ho,"IsTransformStream");function rr(e,t){Re(e._readable._readableStreamController,t),nr(e,t);}n(rr,"TransformStreamError");function nr(e,t){Vo(e._transformStreamController),Qr(e._writable._writableStreamController,t),e._backpressure&&or(e,!1);}n(nr,"TransformStreamErrorWritableAndUnblockWrite");function or(e,t){e._backpressureChangePromise!==void 0&&e._backpressureChangePromise_resolve(),e._backpressureChangePromise=E(r=>{e._backpressureChangePromise_resolve=r;}),e._backpressure=t;}n(or,"TransformStreamSetBackpressure");const yn=class yn{constructor(){throw new TypeError("Illegal constructor")}get desiredSize(){if(!ir(this))throw ar("desiredSize");const t=this._controlledTransformStream._readable._readableStreamController;return Xr(t)}enqueue(t=void 0){if(!ir(this))throw ar("enqueue");Qo(this,t);}error(t=void 0){if(!ir(this))throw ar("error");xa(this,t);}terminate(){if(!ir(this))throw ar("terminate");Ha(this);}};n(yn,"TransformStreamDefaultController");let Le=yn;Object.defineProperties(Le.prototype,{enqueue:{enumerable:!0},error:{enumerable:!0},terminate:{enumerable:!0},desiredSize:{enumerable:!0}}),typeof l.toStringTag=="symbol"&&Object.defineProperty(Le.prototype,l.toStringTag,{value:"TransformStreamDefaultController",configurable:!0});function ir(e){return !m(e)||!Object.prototype.hasOwnProperty.call(e,"_controlledTransformStream")?!1:e instanceof Le}n(ir,"IsTransformStreamDefaultController");function Ua(e,t,r,s){t._controlledTransformStream=e,e._transformStreamController=t,t._transformAlgorithm=r,t._flushAlgorithm=s;}n(Ua,"SetUpTransformStreamDefaultController");function Na(e,t){const r=Object.create(Le.prototype);let s=n(c=>{try{return Qo(r,c),b(void 0)}catch(h){return g(h)}},"transformAlgorithm"),f=n(()=>b(void 0),"flushAlgorithm");t.transform!==void 0&&(s=n(c=>t.transform(c,r),"transformAlgorithm")),t.flush!==void 0&&(f=n(()=>t.flush(r),"flushAlgorithm")),Ua(e,r,s,f);}n(Na,"SetUpTransformStreamDefaultControllerFromTransformer");function Vo(e){e._transformAlgorithm=void 0,e._flushAlgorithm=void 0;}n(Vo,"TransformStreamDefaultControllerClearAlgorithms");function Qo(e,t){const r=e._controlledTransformStream,s=r._readable._readableStreamController;if(!Ge(s))throw new TypeError("Readable side is not in a state that permits enqueue");try{er(s,t);}catch(c){throw nr(r,c),r._readable._storedError}Ra(s)!==r._backpressure&&or(r,!0);}n(Qo,"TransformStreamDefaultControllerEnqueue");function xa(e,t){rr(e._controlledTransformStream,t);}n(xa,"TransformStreamDefaultControllerError");function Yo(e,t){const r=e._transformAlgorithm(t);return O(r,void 0,s=>{throw rr(e._controlledTransformStream,s),s})}n(Yo,"TransformStreamDefaultControllerPerformTransform");function Ha(e){const t=e._controlledTransformStream,r=t._readable._readableStreamController;St(r);const s=new TypeError("TransformStream terminated");nr(t,s);}n(Ha,"TransformStreamDefaultControllerTerminate");function Va(e,t){const r=e._transformStreamController;if(e._backpressure){const s=e._backpressureChangePromise;return O(s,()=>{const f=e._writable;if(f._state==="erroring")throw f._storedError;return Yo(r,t)})}return Yo(r,t)}n(Va,"TransformStreamDefaultSinkWriteAlgorithm");function Qa(e,t){return rr(e,t),b(void 0)}n(Qa,"TransformStreamDefaultSinkAbortAlgorithm");function Ya(e){const t=e._readable,r=e._transformStreamController,s=r._flushAlgorithm();return Vo(r),O(s,()=>{if(t._state==="errored")throw t._storedError;St(t._readableStreamController);},f=>{throw rr(e,f),t._storedError})}n(Ya,"TransformStreamDefaultSinkCloseAlgorithm");function Ga(e){return or(e,!1),e._backpressureChangePromise}n(Ga,"TransformStreamDefaultSourcePullAlgorithm");function ar(e){return new TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`)}n(ar,"defaultControllerBrandCheckException");function Go(e){return new TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`)}n(Go,"streamBrandCheckException"),a.ByteLengthQueuingStrategy=Ze,a.CountQueuingStrategy=Ke,a.ReadableByteStreamController=_e,a.ReadableStream=ie,a.ReadableStreamBYOBReader=ke,a.ReadableStreamBYOBRequest=Ae,a.ReadableStreamDefaultController=we,a.ReadableStreamDefaultReader=Ee,a.TransformStream=Je,a.TransformStreamDefaultController=Le,a.WritableStream=qe,a.WritableStreamDefaultController=Se,a.WritableStreamDefaultWriter=ze,Object.defineProperty(a,"__esModule",{value:!0});});}(cr,cr.exports)),cr.exports}n(as,"requirePonyfill_es2018");const ss=65536;if(!globalThis.ReadableStream)try{const i=require("node:process"),{emitWarning:o}=i;try{i.emitWarning=()=>{},Object.assign(globalThis,require("node:stream/web")),i.emitWarning=o;}catch(a){throw i.emitWarning=o,a}}catch{Object.assign(globalThis,as());}try{const{Blob:i}=require("buffer");i&&!i.prototype.stream&&(i.prototype.stream=n(function(a){let l=0;const u=this;return new ReadableStream({type:"bytes",async pull(d){const m=await u.slice(l,Math.min(u.size,l+ss)).arrayBuffer();l+=m.byteLength,d.enqueue(new Uint8Array(m)),l===u.size&&d.close();}})},"name"));}catch{}/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */const ei=65536;async function*Sn(i,o=!0){for(const a of i)if("stream"in a)yield*a.stream();else if(ArrayBuffer.isView(a))if(o){let l=a.byteOffset;const u=a.byteOffset+a.byteLength;for(;l!==u;){const d=Math.min(u-l,ei),p=a.buffer.slice(l,l+d);l+=p.byteLength,yield new Uint8Array(p);}}else yield a;else {let l=0,u=a;for(;l!==u.size;){const p=await u.slice(l,Math.min(u.size,l+ei)).arrayBuffer();l+=p.byteLength,yield new Uint8Array(p);}}}n(Sn,"toIterator");const ti=(xe=class{constructor(o=[],a={}){ae(this,me,[]);ae(this,vt,"");ae(this,ct,0);ae(this,wr,"transparent");if(typeof o!="object"||o===null)throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");if(typeof o[Symbol.iterator]!="function")throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");if(typeof a!="object"&&typeof a!="function")throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");a===null&&(a={});const l=new TextEncoder;for(const d of o){let p;ArrayBuffer.isView(d)?p=new Uint8Array(d.buffer.slice(d.byteOffset,d.byteOffset+d.byteLength)):d instanceof ArrayBuffer?p=new Uint8Array(d.slice(0)):d instanceof xe?p=d:p=l.encode(`${d}`),Y(this,ct,k(this,ct)+(ArrayBuffer.isView(p)?p.byteLength:p.size)),k(this,me).push(p);}Y(this,wr,`${a.endings===void 0?"transparent":a.endings}`);const u=a.type===void 0?"":String(a.type);Y(this,vt,/^[\x20-\x7E]*$/.test(u)?u:"");}get size(){return k(this,ct)}get type(){return k(this,vt)}async text(){const o=new TextDecoder;let a="";for await(const l of Sn(k(this,me),!1))a+=o.decode(l,{stream:!0});return a+=o.decode(),a}async arrayBuffer(){const o=new Uint8Array(this.size);let a=0;for await(const l of Sn(k(this,me),!1))o.set(l,a),a+=l.length;return o.buffer}stream(){const o=Sn(k(this,me),!0);return new globalThis.ReadableStream({type:"bytes",async pull(a){const l=await o.next();l.done?a.close():a.enqueue(l.value);},async cancel(){await o.return();}})}slice(o=0,a=this.size,l=""){const{size:u}=this;let d=o<0?Math.max(u+o,0):Math.min(o,u),p=a<0?Math.max(u+a,0):Math.min(a,u);const m=Math.max(p-d,0),C=k(this,me),S=[];let I=0;for(const L of C){if(I>=m)break;const E=ArrayBuffer.isView(L)?L.byteLength:L.size;if(d&&E<=d)d-=E,p-=E;else {let b;ArrayBuffer.isView(L)?(b=L.subarray(d,Math.min(E,p)),I+=b.byteLength):(b=L.slice(d,Math.min(E,p)),I+=b.size),p-=E,S.push(b),d=0;}}const re=new xe([],{type:String(l).toLowerCase()});return Y(re,ct,m),Y(re,me,S),re}get[Symbol.toStringTag](){return "Blob"}static[Symbol.hasInstance](o){return o&&typeof o=="object"&&typeof o.constructor=="function"&&(typeof o.stream=="function"||typeof o.arrayBuffer=="function")&&/^(Blob|File)$/.test(o[Symbol.toStringTag])}},me=new WeakMap,vt=new WeakMap,ct=new WeakMap,wr=new WeakMap,n(xe,"Blob"),xe);Object.defineProperties(ti.prototype,{size:{enumerable:!0},type:{enumerable:!0},slice:{enumerable:!0}});const ls=ti,it=ls,us=(Wt=class extends it{constructor(a,l,u={}){if(arguments.length<2)throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);super(a,u);ae(this,Et,0);ae(this,At,"");u===null&&(u={});const d=u.lastModified===void 0?Date.now():Number(u.lastModified);Number.isNaN(d)||Y(this,Et,d),Y(this,At,String(l));}get name(){return k(this,At)}get lastModified(){return k(this,Et)}get[Symbol.toStringTag](){return "File"}static[Symbol.hasInstance](a){return !!a&&a instanceof it&&/^(File)$/.test(a[Symbol.toStringTag])}},Et=new WeakMap,At=new WeakMap,n(Wt,"File"),Wt),fs=us,wn=fs;/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */var{toStringTag:Tt,iterator:cs,hasInstance:ds}=Symbol,ri=Math.random,hs="append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","),ni=n((i,o,a)=>(i+="",/^(Blob|File)$/.test(o&&o[Tt])?[(a=a!==void 0?a+"":o[Tt]=="File"?o.name:"blob",i),o.name!==a||o[Tt]=="blob"?new wn([o],a,o):o]:[i,o+""]),"f"),Rn=n((i,o)=>(o?i:i.replace(/\r?\n|\r/g,`\r
`)).replace(/\n/g,"%0A").replace(/\r/g,"%0D").replace(/"/g,"%22"),"e$1"),$e=n((i,o,a)=>{if(o.length<a)throw new TypeError(`Failed to execute '${i}' on 'FormData': ${a} arguments required, but only ${o.length} present.`)},"x");const dr=(Bt=class{constructor(...o){ae(this,G,[]);if(o.length)throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.")}get[Tt](){return "FormData"}[cs](){return this.entries()}static[ds](o){return o&&typeof o=="object"&&o[Tt]==="FormData"&&!hs.some(a=>typeof o[a]!="function")}append(...o){$e("append",arguments,2),k(this,G).push(ni(...o));}delete(o){$e("delete",arguments,1),o+="",Y(this,G,k(this,G).filter(([a])=>a!==o));}get(o){$e("get",arguments,1),o+="";for(var a=k(this,G),l=a.length,u=0;u<l;u++)if(a[u][0]===o)return a[u][1];return null}getAll(o,a){return $e("getAll",arguments,1),a=[],o+="",k(this,G).forEach(l=>l[0]===o&&a.push(l[1])),a}has(o){return $e("has",arguments,1),o+="",k(this,G).some(a=>a[0]===o)}forEach(o,a){$e("forEach",arguments,1);for(var[l,u]of this)o.call(a,u,l,this);}set(...o){$e("set",arguments,2);var a=[],l=!0;o=ni(...o),k(this,G).forEach(u=>{u[0]===o[0]?l&&(l=!a.push(o)):a.push(u);}),l&&a.push(o),Y(this,G,a);}*entries(){yield*k(this,G);}*keys(){for(var[o]of this)yield o;}*values(){for(var[,o]of this)yield o;}},G=new WeakMap,n(Bt,"FormData"),Bt);function ps(i,o=it){var a=`${ri()}${ri()}`.replace(/\./g,"").slice(-28).padStart(32,"-"),l=[],u=`--${a}\r
Content-Disposition: form-data; name="`;return i.forEach((d,p)=>typeof d=="string"?l.push(u+Rn(p)+`"\r
\r
${d.replace(/\r(?!\n)|(?<!\r)\n/g,`\r
`)}\r
`):l.push(u+Rn(p)+`"; filename="${Rn(d.name,1)}"\r
Content-Type: ${d.type||"application/octet-stream"}\r
\r
`,d,`\r
`)),l.push(`--${a}--`),new o(l,{type:"multipart/form-data; boundary="+a})}n(ps,"formDataToBlob");const Bn=class Bn extends Error{constructor(o,a){super(o),Error.captureStackTrace(this,this.constructor),this.type=a;}get name(){return this.constructor.name}get[Symbol.toStringTag](){return this.constructor.name}};n(Bn,"FetchBaseError");let at=Bn;const kn=class kn extends at{constructor(o,a,l){super(o,a),l&&(this.code=this.errno=l.code,this.erroredSysCall=l.syscall);}};n(kn,"FetchError");let V=kn;const hr=Symbol.toStringTag,oi=n(i=>typeof i=="object"&&typeof i.append=="function"&&typeof i.delete=="function"&&typeof i.get=="function"&&typeof i.getAll=="function"&&typeof i.has=="function"&&typeof i.set=="function"&&typeof i.sort=="function"&&i[hr]==="URLSearchParams","isURLSearchParameters"),pr=n(i=>i&&typeof i=="object"&&typeof i.arrayBuffer=="function"&&typeof i.type=="string"&&typeof i.stream=="function"&&typeof i.constructor=="function"&&/^(Blob|File)$/.test(i[hr]),"isBlob"),bs=n(i=>typeof i=="object"&&(i[hr]==="AbortSignal"||i[hr]==="EventTarget"),"isAbortSignal"),ms=n((i,o)=>{const a=new URL(o).hostname,l=new URL(i).hostname;return a===l||a.endsWith(`.${l}`)},"isDomainOrSubdomain"),ys=n((i,o)=>{const a=new URL(o).protocol,l=new URL(i).protocol;return a===l},"isSameProtocol"),gs=promisify$1(se.pipeline),N=Symbol("Body internals"),On=class On{constructor(o,{size:a=0}={}){let l=null;o===null?o=null:oi(o)?o=Buffer$2.from(o.toString()):pr(o)||Buffer$2.isBuffer(o)||(types$2.isAnyArrayBuffer(o)?o=Buffer$2.from(o):ArrayBuffer.isView(o)?o=Buffer$2.from(o.buffer,o.byteOffset,o.byteLength):o instanceof se||(o instanceof dr?(o=ps(o),l=o.type.split("=")[1]):o=Buffer$2.from(String(o))));let u=o;Buffer$2.isBuffer(o)?u=se.Readable.from(o):pr(o)&&(u=se.Readable.from(o.stream())),this[N]={body:o,stream:u,boundary:l,disturbed:!1,error:null},this.size=a,o instanceof se&&o.on("error",d=>{const p=d instanceof at?d:new V(`Invalid response body while trying to fetch ${this.url}: ${d.message}`,"system",d);this[N].error=p;});}get body(){return this[N].stream}get bodyUsed(){return this[N].disturbed}async arrayBuffer(){const{buffer:o,byteOffset:a,byteLength:l}=await Tn(this);return o.slice(a,a+l)}async formData(){const o=this.headers.get("content-type");if(o.startsWith("application/x-www-form-urlencoded")){const l=new dr,u=new URLSearchParams(await this.text());for(const[d,p]of u)l.append(d,p);return l}const{toFormData:a}=await import('./multipart-parser.mjs');return a(this.body,o)}async blob(){const o=this.headers&&this.headers.get("content-type")||this[N].body&&this[N].body.type||"",a=await this.arrayBuffer();return new it([a],{type:o})}async json(){const o=await this.text();return JSON.parse(o)}async text(){const o=await Tn(this);return new TextDecoder().decode(o)}buffer(){return Tn(this)}};n(On,"Body");let De=On;De.prototype.buffer=deprecate(De.prototype.buffer,"Please use 'response.arrayBuffer()' instead of 'response.buffer()'","node-fetch#buffer"),Object.defineProperties(De.prototype,{body:{enumerable:!0},bodyUsed:{enumerable:!0},arrayBuffer:{enumerable:!0},blob:{enumerable:!0},json:{enumerable:!0},text:{enumerable:!0},data:{get:deprecate(()=>{},"data doesn't exist, use json(), text(), arrayBuffer(), or body instead","https://github.com/node-fetch/node-fetch/issues/1000 (response)")}});async function Tn(i){if(i[N].disturbed)throw new TypeError(`body used already for: ${i.url}`);if(i[N].disturbed=!0,i[N].error)throw i[N].error;const{body:o}=i;if(o===null)return Buffer$2.alloc(0);if(!(o instanceof se))return Buffer$2.alloc(0);const a=[];let l=0;try{for await(const u of o){if(i.size>0&&l+u.length>i.size){const d=new V(`content size at ${i.url} over limit: ${i.size}`,"max-size");throw o.destroy(d),d}l+=u.length,a.push(u);}}catch(u){throw u instanceof at?u:new V(`Invalid response body while trying to fetch ${i.url}: ${u.message}`,"system",u)}if(o.readableEnded===!0||o._readableState.ended===!0)try{return a.every(u=>typeof u=="string")?Buffer$2.from(a.join("")):Buffer$2.concat(a,l)}catch(u){throw new V(`Could not create Buffer from response body for ${i.url}: ${u.message}`,"system",u)}else throw new V(`Premature close of server response while trying to fetch ${i.url}`)}n(Tn,"consumeBody");const Cn=n((i,o)=>{let a,l,{body:u}=i[N];if(i.bodyUsed)throw new Error("cannot clone body after it is used");return u instanceof se&&typeof u.getBoundary!="function"&&(a=new PassThrough({highWaterMark:o}),l=new PassThrough({highWaterMark:o}),u.pipe(a),u.pipe(l),i[N].stream=a,u=l),u},"clone"),_s=deprecate(i=>i.getBoundary(),"form-data doesn't follow the spec and requires special treatment. Use alternative package","https://github.com/node-fetch/node-fetch/issues/1167"),ii=n((i,o)=>i===null?null:typeof i=="string"?"text/plain;charset=UTF-8":oi(i)?"application/x-www-form-urlencoded;charset=UTF-8":pr(i)?i.type||null:Buffer$2.isBuffer(i)||types$2.isAnyArrayBuffer(i)||ArrayBuffer.isView(i)?null:i instanceof dr?`multipart/form-data; boundary=${o[N].boundary}`:i&&typeof i.getBoundary=="function"?`multipart/form-data;boundary=${_s(i)}`:i instanceof se?null:"text/plain;charset=UTF-8","extractContentType"),Ss=n(i=>{const{body:o}=i[N];return o===null?0:pr(o)?o.size:Buffer$2.isBuffer(o)?o.length:o&&typeof o.getLengthSync=="function"&&o.hasKnownLength&&o.hasKnownLength()?o.getLengthSync():null},"getTotalBytes"),ws=n(async(i,{body:o})=>{o===null?i.end():await gs(o,i);},"writeToStream"),br=typeof Rt.validateHeaderName=="function"?Rt.validateHeaderName:i=>{if(!/^[\^`\-\w!#$%&'*+.|~]+$/.test(i)){const o=new TypeError(`Header name must be a valid HTTP token [${i}]`);throw Object.defineProperty(o,"code",{value:"ERR_INVALID_HTTP_TOKEN"}),o}},Pn=typeof Rt.validateHeaderValue=="function"?Rt.validateHeaderValue:(i,o)=>{if(/[^\t\u0020-\u007E\u0080-\u00FF]/.test(o)){const a=new TypeError(`Invalid character in header content ["${i}"]`);throw Object.defineProperty(a,"code",{value:"ERR_INVALID_CHAR"}),a}},Rr=class Rr extends URLSearchParams{constructor(o){let a=[];if(o instanceof Rr){const l=o.raw();for(const[u,d]of Object.entries(l))a.push(...d.map(p=>[u,p]));}else if(o!=null)if(typeof o=="object"&&!types$2.isBoxedPrimitive(o)){const l=o[Symbol.iterator];if(l==null)a.push(...Object.entries(o));else {if(typeof l!="function")throw new TypeError("Header pairs must be iterable");a=[...o].map(u=>{if(typeof u!="object"||types$2.isBoxedPrimitive(u))throw new TypeError("Each header pair must be an iterable object");return [...u]}).map(u=>{if(u.length!==2)throw new TypeError("Each header pair must be a name/value tuple");return [...u]});}}else throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");return a=a.length>0?a.map(([l,u])=>(br(l),Pn(l,String(u)),[String(l).toLowerCase(),String(u)])):void 0,super(a),new Proxy(this,{get(l,u,d){switch(u){case"append":case"set":return (p,m)=>(br(p),Pn(p,String(m)),URLSearchParams.prototype[u].call(l,String(p).toLowerCase(),String(m)));case"delete":case"has":case"getAll":return p=>(br(p),URLSearchParams.prototype[u].call(l,String(p).toLowerCase()));case"keys":return ()=>(l.sort(),new Set(URLSearchParams.prototype.keys.call(l)).keys());default:return Reflect.get(l,u,d)}}})}get[Symbol.toStringTag](){return this.constructor.name}toString(){return Object.prototype.toString.call(this)}get(o){const a=this.getAll(o);if(a.length===0)return null;let l=a.join(", ");return /^content-encoding$/i.test(o)&&(l=l.toLowerCase()),l}forEach(o,a=void 0){for(const l of this.keys())Reflect.apply(o,a,[this.get(l),l,this]);}*values(){for(const o of this.keys())yield this.get(o);}*entries(){for(const o of this.keys())yield [o,this.get(o)];}[Symbol.iterator](){return this.entries()}raw(){return [...this.keys()].reduce((o,a)=>(o[a]=this.getAll(a),o),{})}[Symbol.for("nodejs.util.inspect.custom")](){return [...this.keys()].reduce((o,a)=>{const l=this.getAll(a);return a==="host"?o[a]=l[0]:o[a]=l.length>1?l:l[0],o},{})}};n(Rr,"Headers");let le=Rr;Object.defineProperties(le.prototype,["get","entries","forEach","values"].reduce((i,o)=>(i[o]={enumerable:!0},i),{}));function Rs(i=[]){return new le(i.reduce((o,a,l,u)=>(l%2===0&&o.push(u.slice(l,l+2)),o),[]).filter(([o,a])=>{try{return br(o),Pn(o,String(a)),!0}catch{return !1}}))}n(Rs,"fromRawHeaders");const Ts=new Set([301,302,303,307,308]),vn=n(i=>Ts.has(i),"isRedirect"),ee=Symbol("Response internals"),Me=class Me extends De{constructor(o=null,a={}){super(o,a);const l=a.status!=null?a.status:200,u=new le(a.headers);if(o!==null&&!u.has("Content-Type")){const d=ii(o,this);d&&u.append("Content-Type",d);}this[ee]={type:"default",url:a.url,status:l,statusText:a.statusText||"",headers:u,counter:a.counter,highWaterMark:a.highWaterMark};}get type(){return this[ee].type}get url(){return this[ee].url||""}get status(){return this[ee].status}get ok(){return this[ee].status>=200&&this[ee].status<300}get redirected(){return this[ee].counter>0}get statusText(){return this[ee].statusText}get headers(){return this[ee].headers}get highWaterMark(){return this[ee].highWaterMark}clone(){return new Me(Cn(this,this.highWaterMark),{type:this.type,url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected,size:this.size,highWaterMark:this.highWaterMark})}static redirect(o,a=302){if(!vn(a))throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');return new Me(null,{headers:{location:new URL(o).toString()},status:a})}static error(){const o=new Me(null,{status:0,statusText:""});return o[ee].type="error",o}static json(o=void 0,a={}){const l=JSON.stringify(o);if(l===void 0)throw new TypeError("data is not JSON serializable");const u=new le(a&&a.headers);return u.has("content-type")||u.set("content-type","application/json"),new Me(l,{...a,headers:u})}get[Symbol.toStringTag](){return "Response"}};n(Me,"Response");let te=Me;Object.defineProperties(te.prototype,{type:{enumerable:!0},url:{enumerable:!0},status:{enumerable:!0},ok:{enumerable:!0},redirected:{enumerable:!0},statusText:{enumerable:!0},headers:{enumerable:!0},clone:{enumerable:!0}});const Cs=n(i=>{if(i.search)return i.search;const o=i.href.length-1,a=i.hash||(i.href[o]==="#"?"#":"");return i.href[o-a.length]==="?"?"?":""},"getSearch");function ai(i,o=!1){return i==null||(i=new URL(i),/^(about|blob|data):$/.test(i.protocol))?"no-referrer":(i.username="",i.password="",i.hash="",o&&(i.pathname="",i.search=""),i)}n(ai,"stripURLForUseAsAReferrer");const si=new Set(["","no-referrer","no-referrer-when-downgrade","same-origin","origin","strict-origin","origin-when-cross-origin","strict-origin-when-cross-origin","unsafe-url"]),Ps="strict-origin-when-cross-origin";function vs(i){if(!si.has(i))throw new TypeError(`Invalid referrerPolicy: ${i}`);return i}n(vs,"validateReferrerPolicy");function Es(i){if(/^(http|ws)s:$/.test(i.protocol))return !0;const o=i.host.replace(/(^\[)|(]$)/g,""),a=isIP(o);return a===4&&/^127\./.test(o)||a===6&&/^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(o)?!0:i.host==="localhost"||i.host.endsWith(".localhost")?!1:i.protocol==="file:"}n(Es,"isOriginPotentiallyTrustworthy");function st(i){return /^about:(blank|srcdoc)$/.test(i)||i.protocol==="data:"||/^(blob|filesystem):$/.test(i.protocol)?!0:Es(i)}n(st,"isUrlPotentiallyTrustworthy");function As(i,{referrerURLCallback:o,referrerOriginCallback:a}={}){if(i.referrer==="no-referrer"||i.referrerPolicy==="")return null;const l=i.referrerPolicy;if(i.referrer==="about:client")return "no-referrer";const u=i.referrer;let d=ai(u),p=ai(u,!0);d.toString().length>4096&&(d=p),o&&(d=o(d)),a&&(p=a(p));const m=new URL(i.url);switch(l){case"no-referrer":return "no-referrer";case"origin":return p;case"unsafe-url":return d;case"strict-origin":return st(d)&&!st(m)?"no-referrer":p.toString();case"strict-origin-when-cross-origin":return d.origin===m.origin?d:st(d)&&!st(m)?"no-referrer":p;case"same-origin":return d.origin===m.origin?d:"no-referrer";case"origin-when-cross-origin":return d.origin===m.origin?d:p;case"no-referrer-when-downgrade":return st(d)&&!st(m)?"no-referrer":d;default:throw new TypeError(`Invalid referrerPolicy: ${l}`)}}n(As,"determineRequestsReferrer");function Ws(i){const o=(i.get("referrer-policy")||"").split(/[,\s]+/);let a="";for(const l of o)l&&si.has(l)&&(a=l);return a}n(Ws,"parseReferrerPolicyFromHeader");const j=Symbol("Request internals"),Ct=n(i=>typeof i=="object"&&typeof i[j]=="object","isRequest"),Bs=deprecate(()=>{},".data is not a valid RequestInit property, use .body instead","https://github.com/node-fetch/node-fetch/issues/1000 (request)"),Tr=class Tr extends De{constructor(o,a={}){let l;if(Ct(o)?l=new URL(o.url):(l=new URL(o),o={}),l.username!==""||l.password!=="")throw new TypeError(`${l} is an url with embedded credentials.`);let u=a.method||o.method||"GET";if(/^(delete|get|head|options|post|put)$/i.test(u)&&(u=u.toUpperCase()),!Ct(a)&&"data"in a&&Bs(),(a.body!=null||Ct(o)&&o.body!==null)&&(u==="GET"||u==="HEAD"))throw new TypeError("Request with GET/HEAD method cannot have body");const d=a.body?a.body:Ct(o)&&o.body!==null?Cn(o):null;super(d,{size:a.size||o.size||0});const p=new le(a.headers||o.headers||{});if(d!==null&&!p.has("Content-Type")){const S=ii(d,this);S&&p.set("Content-Type",S);}let m=Ct(o)?o.signal:null;if("signal"in a&&(m=a.signal),m!=null&&!bs(m))throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");let C=a.referrer==null?o.referrer:a.referrer;if(C==="")C="no-referrer";else if(C){const S=new URL(C);C=/^about:(\/\/)?client$/.test(S)?"client":S;}else C=void 0;this[j]={method:u,redirect:a.redirect||o.redirect||"follow",headers:p,parsedURL:l,signal:m,referrer:C},this.follow=a.follow===void 0?o.follow===void 0?20:o.follow:a.follow,this.compress=a.compress===void 0?o.compress===void 0?!0:o.compress:a.compress,this.counter=a.counter||o.counter||0,this.agent=a.agent||o.agent,this.highWaterMark=a.highWaterMark||o.highWaterMark||16384,this.insecureHTTPParser=a.insecureHTTPParser||o.insecureHTTPParser||!1,this.referrerPolicy=a.referrerPolicy||o.referrerPolicy||"";}get method(){return this[j].method}get url(){return format(this[j].parsedURL)}get headers(){return this[j].headers}get redirect(){return this[j].redirect}get signal(){return this[j].signal}get referrer(){if(this[j].referrer==="no-referrer")return "";if(this[j].referrer==="client")return "about:client";if(this[j].referrer)return this[j].referrer.toString()}get referrerPolicy(){return this[j].referrerPolicy}set referrerPolicy(o){this[j].referrerPolicy=vs(o);}clone(){return new Tr(this)}get[Symbol.toStringTag](){return "Request"}};n(Tr,"Request");let lt=Tr;Object.defineProperties(lt.prototype,{method:{enumerable:!0},url:{enumerable:!0},headers:{enumerable:!0},redirect:{enumerable:!0},clone:{enumerable:!0},signal:{enumerable:!0},referrer:{enumerable:!0},referrerPolicy:{enumerable:!0}});const ks=n(i=>{const{parsedURL:o}=i[j],a=new le(i[j].headers);a.has("Accept")||a.set("Accept","*/*");let l=null;if(i.body===null&&/^(post|put)$/i.test(i.method)&&(l="0"),i.body!==null){const m=Ss(i);typeof m=="number"&&!Number.isNaN(m)&&(l=String(m));}l&&a.set("Content-Length",l),i.referrerPolicy===""&&(i.referrerPolicy=Ps),i.referrer&&i.referrer!=="no-referrer"?i[j].referrer=As(i):i[j].referrer="no-referrer",i[j].referrer instanceof URL&&a.set("Referer",i.referrer),a.has("User-Agent")||a.set("User-Agent","node-fetch"),i.compress&&!a.has("Accept-Encoding")&&a.set("Accept-Encoding","gzip, deflate, br");let{agent:u}=i;typeof u=="function"&&(u=u(o));const d=Cs(o),p={path:o.pathname+d,method:i.method,headers:a[Symbol.for("nodejs.util.inspect.custom")](),insecureHTTPParser:i.insecureHTTPParser,agent:u};return {parsedURL:o,options:p}},"getNodeRequestOptions"),qn=class qn extends at{constructor(o,a="aborted"){super(o,a);}};n(qn,"AbortError");let mr=qn;/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */if(!globalThis.DOMException)try{const{MessageChannel:i}=require("worker_threads"),o=new i().port1,a=new ArrayBuffer;o.postMessage(a,[a,a]);}catch(i){i.constructor.name==="DOMException"&&(globalThis.DOMException=i.constructor);}var Os=globalThis.DOMException;const qs=is(Os),{stat:En}=promises;n((i,o)=>li(statSync(i),i,o),"blobFromSync");n((i,o)=>En(i).then(a=>li(a,i,o)),"blobFrom");n((i,o)=>En(i).then(a=>ui(a,i,o)),"fileFrom");n((i,o)=>ui(statSync(i),i,o),"fileFromSync");const li=n((i,o,a="")=>new it([new yr({path:o,size:i.size,lastModified:i.mtimeMs,start:0})],{type:a}),"fromBlob"),ui=n((i,o,a="")=>new wn([new yr({path:o,size:i.size,lastModified:i.mtimeMs,start:0})],basename(o),{type:a,lastModified:i.mtimeMs}),"fromFile"),Cr=class Cr{constructor(o){ae(this,Ue,void 0);ae(this,Ne,void 0);Y(this,Ue,o.path),Y(this,Ne,o.start),this.size=o.size,this.lastModified=o.lastModified;}slice(o,a){return new Cr({path:k(this,Ue),lastModified:this.lastModified,size:a-o,start:k(this,Ne)+o})}async*stream(){const{mtimeMs:o}=await En(k(this,Ue));if(o>this.lastModified)throw new qs("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.","NotReadableError");yield*createReadStream(k(this,Ue),{start:k(this,Ne),end:k(this,Ne)+this.size-1});}get[Symbol.toStringTag](){return "Blob"}};Ue=new WeakMap,Ne=new WeakMap,n(Cr,"BlobDataItem");let yr=Cr;const Ls=new Set(["data:","http:","https:"]);async function fi(i,o){return new Promise((a,l)=>{const u=new lt(i,o),{parsedURL:d,options:p}=ks(u);if(!Ls.has(d.protocol))throw new TypeError(`node-fetch cannot load ${i}. URL scheme "${d.protocol.replace(/:$/,"")}" is not supported.`);if(d.protocol==="data:"){const b=os(u.url),g=new te(b,{headers:{"Content-Type":b.typeFull}});a(g);return}const m=(d.protocol==="https:"?Ka:Rt).request,{signal:C}=u;let S=null;const I=n(()=>{const b=new mr("The operation was aborted.");l(b),u.body&&u.body instanceof se.Readable&&u.body.destroy(b),!(!S||!S.body)&&S.body.emit("error",b);},"abort");if(C&&C.aborted){I();return}const re=n(()=>{I(),E();},"abortAndFinalize"),L=m(d.toString(),p);C&&C.addEventListener("abort",re);const E=n(()=>{L.abort(),C&&C.removeEventListener("abort",re);},"finalize");L.on("error",b=>{l(new V(`request to ${u.url} failed, reason: ${b.message}`,"system",b)),E();}),$s(L,b=>{S&&S.body&&S.body.destroy(b);}),process.version<"v14"&&L.on("socket",b=>{let g;b.prependListener("end",()=>{g=b._eventsCount;}),b.prependListener("close",A=>{if(S&&g<b._eventsCount&&!A){const q=new Error("Premature close");q.code="ERR_STREAM_PREMATURE_CLOSE",S.body.emit("error",q);}});}),L.on("response",b=>{L.setTimeout(0);const g=Rs(b.rawHeaders);if(vn(b.statusCode)){const O=g.get("Location");let $=null;try{$=O===null?null:new URL(O,u.url);}catch{if(u.redirect!=="manual"){l(new V(`uri requested responds with an invalid redirect URL: ${O}`,"invalid-redirect")),E();return}}switch(u.redirect){case"error":l(new V(`uri requested responds with a redirect, redirect mode is set to error: ${u.url}`,"no-redirect")),E();return;case"manual":break;case"follow":{if($===null)break;if(u.counter>=u.follow){l(new V(`maximum redirect reached at: ${u.url}`,"max-redirect")),E();return}const F={headers:new le(u.headers),follow:u.follow,counter:u.counter+1,agent:u.agent,compress:u.compress,method:u.method,body:Cn(u),signal:u.signal,size:u.size,referrer:u.referrer,referrerPolicy:u.referrerPolicy};if(!ms(u.url,$)||!ys(u.url,$))for(const ue of ["authorization","www-authenticate","cookie","cookie2"])F.headers.delete(ue);if(b.statusCode!==303&&u.body&&o.body instanceof se.Readable){l(new V("Cannot follow redirect with body being a readable stream","unsupported-redirect")),E();return}(b.statusCode===303||(b.statusCode===301||b.statusCode===302)&&u.method==="POST")&&(F.method="GET",F.body=void 0,F.headers.delete("content-length"));const ve=Ws(g);ve&&(F.referrerPolicy=ve),a(fi(new lt($,F))),E();return}default:return l(new TypeError(`Redirect option '${u.redirect}' is not a valid value of RequestRedirect`))}}C&&b.once("end",()=>{C.removeEventListener("abort",re);});let A=pipeline(b,new PassThrough,O=>{O&&l(O);});process.version<"v12.10"&&b.on("aborted",re);const q={url:u.url,status:b.statusCode,statusText:b.statusMessage,headers:g,size:u.size,counter:u.counter,highWaterMark:u.highWaterMark},ne=g.get("Content-Encoding");if(!u.compress||u.method==="HEAD"||ne===null||b.statusCode===204||b.statusCode===304){S=new te(A,q),a(S);return}const dt={flush:nt.Z_SYNC_FLUSH,finishFlush:nt.Z_SYNC_FLUSH};if(ne==="gzip"||ne==="x-gzip"){A=pipeline(A,nt.createGunzip(dt),O=>{O&&l(O);}),S=new te(A,q),a(S);return}if(ne==="deflate"||ne==="x-deflate"){const O=pipeline(b,new PassThrough,$=>{$&&l($);});O.once("data",$=>{($[0]&15)===8?A=pipeline(A,nt.createInflate(),F=>{F&&l(F);}):A=pipeline(A,nt.createInflateRaw(),F=>{F&&l(F);}),S=new te(A,q),a(S);}),O.once("end",()=>{S||(S=new te(A,q),a(S));});return}if(ne==="br"){A=pipeline(A,nt.createBrotliDecompress(),O=>{O&&l(O);}),S=new te(A,q),a(S);return}S=new te(A,q),a(S);}),ws(L,u).catch(l);})}n(fi,"fetch$1");function $s(i,o){const a=Buffer$2.from(`0\r
\r
`);let l=!1,u=!1,d;i.on("response",p=>{const{headers:m}=p;l=m["transfer-encoding"]==="chunked"&&!m["content-length"];}),i.on("socket",p=>{const m=n(()=>{if(l&&!u){const S=new Error("Premature close");S.code="ERR_STREAM_PREMATURE_CLOSE",o(S);}},"onSocketClose"),C=n(S=>{u=Buffer$2.compare(S.slice(-5),a)===0,!u&&d&&(u=Buffer$2.compare(d.slice(-3),a.slice(0,3))===0&&Buffer$2.compare(S.slice(-2),a.slice(3))===0),d=S;},"onData");p.prependListener("close",m),p.on("data",C),i.on("close",()=>{p.removeListener("close",m),p.removeListener("data",C);});});}n($s,"fixResponseChunkedTransferBadEnding");const ci=new WeakMap,An=new WeakMap;function B(i){const o=ci.get(i);return console.assert(o!=null,"'this' is expected an Event object, but got",i),o}n(B,"pd");function di(i){if(i.passiveListener!=null){typeof console<"u"&&typeof console.error=="function"&&console.error("Unable to preventDefault inside passive event listener invocation.",i.passiveListener);return}i.event.cancelable&&(i.canceled=!0,typeof i.event.preventDefault=="function"&&i.event.preventDefault());}n(di,"setCancelFlag");function ut(i,o){ci.set(this,{eventTarget:i,event:o,eventPhase:2,currentTarget:i,canceled:!1,stopped:!1,immediateStopped:!1,passiveListener:null,timeStamp:o.timeStamp||Date.now()}),Object.defineProperty(this,"isTrusted",{value:!1,enumerable:!0});const a=Object.keys(o);for(let l=0;l<a.length;++l){const u=a[l];u in this||Object.defineProperty(this,u,hi(u));}}n(ut,"Event"),ut.prototype={get type(){return B(this).event.type},get target(){return B(this).eventTarget},get currentTarget(){return B(this).currentTarget},composedPath(){const i=B(this).currentTarget;return i==null?[]:[i]},get NONE(){return 0},get CAPTURING_PHASE(){return 1},get AT_TARGET(){return 2},get BUBBLING_PHASE(){return 3},get eventPhase(){return B(this).eventPhase},stopPropagation(){const i=B(this);i.stopped=!0,typeof i.event.stopPropagation=="function"&&i.event.stopPropagation();},stopImmediatePropagation(){const i=B(this);i.stopped=!0,i.immediateStopped=!0,typeof i.event.stopImmediatePropagation=="function"&&i.event.stopImmediatePropagation();},get bubbles(){return !!B(this).event.bubbles},get cancelable(){return !!B(this).event.cancelable},preventDefault(){di(B(this));},get defaultPrevented(){return B(this).canceled},get composed(){return !!B(this).event.composed},get timeStamp(){return B(this).timeStamp},get srcElement(){return B(this).eventTarget},get cancelBubble(){return B(this).stopped},set cancelBubble(i){if(!i)return;const o=B(this);o.stopped=!0,typeof o.event.cancelBubble=="boolean"&&(o.event.cancelBubble=!0);},get returnValue(){return !B(this).canceled},set returnValue(i){i||di(B(this));},initEvent(){}},Object.defineProperty(ut.prototype,"constructor",{value:ut,configurable:!0,writable:!0}),typeof window<"u"&&typeof window.Event<"u"&&(Object.setPrototypeOf(ut.prototype,window.Event.prototype),An.set(window.Event.prototype,ut));function hi(i){return {get(){return B(this).event[i]},set(o){B(this).event[i]=o;},configurable:!0,enumerable:!0}}n(hi,"defineRedirectDescriptor");function Ds(i){return {value(){const o=B(this).event;return o[i].apply(o,arguments)},configurable:!0,enumerable:!0}}n(Ds,"defineCallDescriptor");function Ms(i,o){const a=Object.keys(o);if(a.length===0)return i;function l(u,d){i.call(this,u,d);}n(l,"CustomEvent"),l.prototype=Object.create(i.prototype,{constructor:{value:l,configurable:!0,writable:!0}});for(let u=0;u<a.length;++u){const d=a[u];if(!(d in i.prototype)){const m=typeof Object.getOwnPropertyDescriptor(o,d).value=="function";Object.defineProperty(l.prototype,d,m?Ds(d):hi(d));}}return l}n(Ms,"defineWrapper");function pi(i){if(i==null||i===Object.prototype)return ut;let o=An.get(i);return o==null&&(o=Ms(pi(Object.getPrototypeOf(i)),i),An.set(i,o)),o}n(pi,"getWrapper");function Us(i,o){const a=pi(Object.getPrototypeOf(o));return new a(i,o)}n(Us,"wrapEvent");function Ns(i){return B(i).immediateStopped}n(Ns,"isStopped");function xs(i,o){B(i).eventPhase=o;}n(xs,"setEventPhase");function Hs(i,o){B(i).currentTarget=o;}n(Hs,"setCurrentTarget");function bi(i,o){B(i).passiveListener=o;}n(bi,"setPassiveListener");const mi=new WeakMap,yi=1,gi=2,gr=3;function _r(i){return i!==null&&typeof i=="object"}n(_r,"isObject");function Pt(i){const o=mi.get(i);if(o==null)throw new TypeError("'this' is expected an EventTarget object, but got another value.");return o}n(Pt,"getListeners");function Vs(i){return {get(){let a=Pt(this).get(i);for(;a!=null;){if(a.listenerType===gr)return a.listener;a=a.next;}return null},set(o){typeof o!="function"&&!_r(o)&&(o=null);const a=Pt(this);let l=null,u=a.get(i);for(;u!=null;)u.listenerType===gr?l!==null?l.next=u.next:u.next!==null?a.set(i,u.next):a.delete(i):l=u,u=u.next;if(o!==null){const d={listener:o,listenerType:gr,passive:!1,once:!1,next:null};l===null?a.set(i,d):l.next=d;}},configurable:!0,enumerable:!0}}n(Vs,"defineEventAttributeDescriptor");function _i(i,o){Object.defineProperty(i,`on${o}`,Vs(o));}n(_i,"defineEventAttribute");function Si(i){function o(){be.call(this);}n(o,"CustomEventTarget"),o.prototype=Object.create(be.prototype,{constructor:{value:o,configurable:!0,writable:!0}});for(let a=0;a<i.length;++a)_i(o.prototype,i[a]);return o}n(Si,"defineCustomEventTarget");function be(){if(this instanceof be){mi.set(this,new Map);return}if(arguments.length===1&&Array.isArray(arguments[0]))return Si(arguments[0]);if(arguments.length>0){const i=new Array(arguments.length);for(let o=0;o<arguments.length;++o)i[o]=arguments[o];return Si(i)}throw new TypeError("Cannot call a class as a function")}n(be,"EventTarget"),be.prototype={addEventListener(i,o,a){if(o==null)return;if(typeof o!="function"&&!_r(o))throw new TypeError("'listener' should be a function or an object.");const l=Pt(this),u=_r(a),p=(u?!!a.capture:!!a)?yi:gi,m={listener:o,listenerType:p,passive:u&&!!a.passive,once:u&&!!a.once,next:null};let C=l.get(i);if(C===void 0){l.set(i,m);return}let S=null;for(;C!=null;){if(C.listener===o&&C.listenerType===p)return;S=C,C=C.next;}S.next=m;},removeEventListener(i,o,a){if(o==null)return;const l=Pt(this),d=(_r(a)?!!a.capture:!!a)?yi:gi;let p=null,m=l.get(i);for(;m!=null;){if(m.listener===o&&m.listenerType===d){p!==null?p.next=m.next:m.next!==null?l.set(i,m.next):l.delete(i);return}p=m,m=m.next;}},dispatchEvent(i){if(i==null||typeof i.type!="string")throw new TypeError('"event.type" should be a string.');const o=Pt(this),a=i.type;let l=o.get(a);if(l==null)return !0;const u=Us(this,i);let d=null;for(;l!=null;){if(l.once?d!==null?d.next=l.next:l.next!==null?o.set(a,l.next):o.delete(a):d=l,bi(u,l.passive?l.listener:null),typeof l.listener=="function")try{l.listener.call(this,u);}catch(p){typeof console<"u"&&typeof console.error=="function"&&console.error(p);}else l.listenerType!==gr&&typeof l.listener.handleEvent=="function"&&l.listener.handleEvent(u);if(Ns(u))break;l=l.next;}return bi(u,null),xs(u,0),Hs(u,null),!u.defaultPrevented}},Object.defineProperty(be.prototype,"constructor",{value:be,configurable:!0,writable:!0}),typeof window<"u"&&typeof window.EventTarget<"u"&&Object.setPrototypeOf(be.prototype,window.EventTarget.prototype);const zn=class zn extends be{constructor(){throw super(),new TypeError("AbortSignal cannot be constructed directly")}get aborted(){const o=Sr.get(this);if(typeof o!="boolean")throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this===null?"null":typeof this}`);return o}};n(zn,"AbortSignal");let ft=zn;_i(ft.prototype,"abort");function Qs(){const i=Object.create(ft.prototype);return be.call(i),Sr.set(i,!1),i}n(Qs,"createAbortSignal");function Ys(i){Sr.get(i)===!1&&(Sr.set(i,!0),i.dispatchEvent({type:"abort"}));}n(Ys,"abortSignal");const Sr=new WeakMap;Object.defineProperties(ft.prototype,{aborted:{enumerable:!0}}),typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(ft.prototype,Symbol.toStringTag,{configurable:!0,value:"AbortSignal"});let Wn=(kt=class{constructor(){wi.set(this,Qs());}get signal(){return Ri(this)}abort(){Ys(Ri(this));}},n(kt,"AbortController"),kt);const wi=new WeakMap;function Ri(i){const o=wi.get(i);if(o==null)throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${i===null?"null":typeof i}`);return o}n(Ri,"getSignal"),Object.defineProperties(Wn.prototype,{signal:{enumerable:!0},abort:{enumerable:!0}}),typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(Wn.prototype,Symbol.toStringTag,{configurable:!0,value:"AbortController"});var Gs=Object.defineProperty,Zs=n((i,o)=>Gs(i,"name",{value:o,configurable:!0}),"e");const Ti=fi;Ci();function Ci(){!globalThis.process?.versions?.node&&!globalThis.process?.env.DISABLE_NODE_FETCH_NATIVE_WARN&&console.warn("[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.");}n(Ci,"s"),Zs(Ci,"checkNodeEnvironment");

var a=Object.defineProperty;var t=(e,r)=>a(e,"name",{value:r,configurable:!0});var f=Object.defineProperty,g=t((e,r)=>f(e,"name",{value:r,configurable:!0}),"e");const o=!!globalThis.process?.env?.FORCE_NODE_FETCH;function l(){return !o&&globalThis.fetch?globalThis.fetch:Ti}t(l,"p"),g(l,"_getFetch");const s=l();

async function download(url, filePath, options = {}) {
  const infoPath = filePath + ".json";
  const info = JSON.parse(
    await readFile(infoPath, "utf8").catch(() => "{}")
  );
  const headResponse = await sendFetch(url, {
    method: "HEAD",
    headers: options.headers
  }).catch(() => void 0);
  const etag = headResponse?.headers.get("etag");
  if (info.etag === etag && existsSync(filePath)) {
    return;
  }
  if (typeof etag === "string") {
    info.etag = etag;
  }
  const response = await sendFetch(url, { headers: options.headers });
  if (response.status >= 400) {
    throw new Error(
      `Failed to download ${url}: ${response.status} ${response.statusText}`
    );
  }
  const stream = createWriteStream(filePath);
  await promisify$1(pipeline)(response.body, stream);
  await writeFile(infoPath, JSON.stringify(info), "utf8");
}
const inputRegex = /^(?<repo>[\w.-]+\/[\w.-]+)(?<subdir>[^#]+)?(?<ref>#[\w./-]+)?/;
function parseGitURI(input) {
  const m = input.match(inputRegex)?.groups || {};
  return {
    repo: m.repo,
    subdir: m.subdir || "/",
    ref: m.ref ? m.ref.slice(1) : "main"
  };
}
function debug(...args) {
  if (process.env.DEBUG) {
    console.debug("[giget]", ...args);
  }
}
async function sendFetch(url, options = {}) {
  if (!options.agent) {
    const proxyEnv = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy;
    if (proxyEnv) {
      const HttpsProxyAgent = await import('./index2.mjs').then(function (n) { return n.i; }).then(
        (r) => r.HttpsProxyAgent || r.default
      );
      options.agent = new HttpsProxyAgent(proxyEnv);
    }
  }
  return await s(url, {
    ...options,
    headers: normalizeHeaders(options.headers)
  });
}
function cacheDirectory() {
  return process.env.XDG_CACHE_HOME ? resolve$1(process.env.XDG_CACHE_HOME, "giget") : resolve$1(homedir(), ".cache/giget");
}
function normalizeHeaders(headers = {}) {
  const normalized = {};
  for (const [key, value] of Object.entries(headers)) {
    if (!value) {
      continue;
    }
    normalized[key.toLowerCase()] = value;
  }
  return normalized;
}

const github = (input, options) => {
  const parsed = parseGitURI(input);
  const githubAPIURL = process.env.GIGET_GITHUB_URL || "https://api.github.com";
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      Authorization: options.auth ? `Bearer ${options.auth}` : void 0,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    url: `${githubAPIURL.replace("api.github.com", "github.com")}/${parsed.repo}/tree/${parsed.ref}${parsed.subdir}`,
    tar: `${githubAPIURL}/repos/${parsed.repo}/tarball/${parsed.ref}`
  };
};
const gitlab = (input, options) => {
  const parsed = parseGitURI(input);
  const gitlab2 = process.env.GIGET_GITLAB_URL || "https://gitlab.com";
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    },
    url: `${gitlab2}/${parsed.repo}/tree/${parsed.ref}${parsed.subdir}`,
    tar: `${gitlab2}/${parsed.repo}/-/archive/${parsed.ref}.tar.gz`
  };
};
const bitbucket = (input, options) => {
  const parsed = parseGitURI(input);
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    },
    url: `https://bitbucket.com/${parsed.repo}/src/${parsed.ref}${parsed.subdir}`,
    tar: `https://bitbucket.org/${parsed.repo}/get/${parsed.ref}.tar.gz`
  };
};
const sourcehut = (input, options) => {
  const parsed = parseGitURI(input);
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    },
    url: `https://git.sr.ht/~${parsed.repo}/tree/${parsed.ref}/item${parsed.subdir}`,
    tar: `https://git.sr.ht/~${parsed.repo}/archive/${parsed.ref}.tar.gz`
  };
};
const providers = {
  github,
  gh: github,
  gitlab,
  bitbucket,
  sourcehut
};

const DEFAULT_REGISTRY = "https://raw.githubusercontent.com/unjs/giget/main/templates";
const registryProvider = (registryEndpoint = DEFAULT_REGISTRY, options = {}) => {
  return async (input) => {
    const start = Date.now();
    const registryURL = `${registryEndpoint}/${input}.json`;
    const result = await sendFetch(registryURL, {
      headers: {
        authorization: options.auth ? `Bearer ${options.auth}` : void 0
      }
    });
    if (result.status >= 400) {
      throw new Error(
        `Failed to download ${input} template info from ${registryURL}: ${result.status} ${result.statusText}`
      );
    }
    const info = await result.json();
    if (!info.tar || !info.name) {
      throw new Error(
        `Invalid template info from ${registryURL}. name or tar fields are missing!`
      );
    }
    debug(
      `Fetched ${input} template info from ${registryURL} in ${Date.now() - start}ms`
    );
    return info;
  };
};

const sourceProtoRe = /^([\w-.]+):/;
async function downloadTemplate(input, options = {}) {
  options = defu(
    {
      registry: process.env.GIGET_REGISTRY,
      auth: process.env.GIGET_AUTH
    },
    options
  );
  const registry = options.registry === false ? void 0 : registryProvider(options.registry, { auth: options.auth });
  let providerName = options.provider || (registry ? "registry" : "github");
  let source = input;
  const sourceProvierMatch = input.match(sourceProtoRe);
  if (sourceProvierMatch) {
    providerName = sourceProvierMatch[1];
    source = input.slice(sourceProvierMatch[0].length);
  }
  const provider = options.providers?.[providerName] || providers[providerName] || registry;
  if (!provider) {
    throw new Error(`Unsupported provider: ${providerName}`);
  }
  const template = await Promise.resolve().then(() => provider(source, { auth: options.auth })).catch((error) => {
    throw new Error(
      `Failed to download template from ${providerName}: ${error.message}`
    );
  });
  if (!template) {
    throw new Error(`Failed to resolve template from ${providerName}`);
  }
  template.name = (template.name || "template").replace(/[^\da-z-]/gi, "-");
  template.defaultDir = (template.defaultDir || template.name).replace(
    /[^\da-z-]/gi,
    "-"
  );
  const cwd = resolve$1(options.cwd || ".");
  const extractPath = resolve$1(cwd, options.dir || template.defaultDir);
  if (options.forceClean) {
    await rm(extractPath, { recursive: true, force: true });
  }
  if (!options.force && existsSync(extractPath) && readdirSync$1(extractPath).length > 0) {
    throw new Error(`Destination ${extractPath} already exists.`);
  }
  await mkdir$2(extractPath, { recursive: true });
  const temporaryDirectory = resolve$1(
    cacheDirectory(),
    providerName,
    template.name
  );
  const tarPath = resolve$1(
    temporaryDirectory,
    (template.version || template.name) + ".tar.gz"
  );
  if (options.preferOffline && existsSync(tarPath)) {
    options.offline = true;
  }
  if (!options.offline) {
    await mkdir$2(dirname$3(tarPath), { recursive: true });
    const s2 = Date.now();
    await download(template.tar, tarPath, {
      headers: {
        Authorization: options.auth ? `Bearer ${options.auth}` : void 0,
        ...normalizeHeaders(template.headers)
      }
    }).catch((error) => {
      if (!existsSync(tarPath)) {
        throw error;
      }
      debug("Download error. Using cached version:", error);
      options.offline = true;
    });
    debug(`Downloaded ${template.tar} to ${tarPath} in ${Date.now() - s2}ms`);
  }
  if (!existsSync(tarPath)) {
    throw new Error(
      `Tarball not found: ${tarPath} (offline: ${options.offline})`
    );
  }
  const s = Date.now();
  const subdir = template.subdir?.replace(/^\//, "") || "";
  await extract({
    file: tarPath,
    cwd: extractPath,
    onentry(entry) {
      entry.path = entry.path.split("/").splice(1).join("/");
      if (subdir) {
        if (entry.path.startsWith(subdir + "/")) {
          entry.path = entry.path.slice(subdir.length);
        } else {
          entry.path = "";
        }
      }
    }
  });
  debug(`Extracted to ${extractPath} in ${Date.now() - s}ms`);
  return {
    ...template,
    source,
    dir: extractPath
  };
}

const index = {
  __proto__: null,
  downloadTemplate: downloadTemplate,
  registryProvider: registryProvider
};

export { dr as d, index as i, wn as w };
