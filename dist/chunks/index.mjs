import { readFile, mkdir as mkdir$2, rm, writeFile } from 'node:fs/promises';
import fs$a, { existsSync, readdirSync as readdirSync$1, createWriteStream } from 'node:fs';
import { c as commonjsGlobal$1 } from '../shared/scaffold.2155838d.mjs';
import require$$0$8 from 'events';
import require$$0$9 from 'stream';
import require$$2$3 from 'string_decoder';
import require$$0$b from 'assert';
import require$$1$6 from 'buffer';
import require$$0$a from 'zlib';
import require$$0$c from 'path';
import fs__default from 'fs';
import { y as yallist, r as resolve$1, j as join$1, n as normalize$2, d as defu, a as dirname$3, b as basename$1 } from './add.mjs';
import require$$9 from 'process';
import require$$0$d from 'util';
import require$$0$e from 'crypto';
import 'node:module';
import require$$4$1, { pipeline as pipeline$3 } from 'node:stream';
import 'node:child_process';
import { homedir } from 'node:os';
import require$$6$1, { promisify as promisify$3 } from 'node:util';
import require$$0$f from 'node:http';
import require$$2$4 from 'node:https';
import require$$8$1 from 'node:url';
import require$$12 from 'net';
import require$$13 from 'http';
import require$$17 from 'querystring';
import require$$20 from 'node:events';
import require$$4$2 from 'perf_hooks';
import require$$22 from 'util/types';
import require$$25 from 'tls';
import require$$26 from 'async_hooks';
import 'console';
import require$$7 from 'url';
import require$$31 from 'worker_threads';
import require$$32 from 'diagnostics_channel';
import require$$33 from 'https';
import require$$0$g from 'tty';
import require$$2$5 from 'os';
import require$$3$1 from 'node:zlib';
import require$$5$2 from 'node:buffer';
import require$$9$1 from 'node:net';
import path$7 from 'node:path';

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
const EE$4 = require$$0$8;
const Stream$3 = require$$0$9;
const stringdecoder = require$$2$3;
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
const doIter$1 = commonjsGlobal$1._MP_NO_ITERATOR_SYMBOLS_ !== '1';
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

let Minipass$4 = class Minipass extends Stream$3 {
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
        s instanceof Stream$3 ||
        (s instanceof EE$4 &&
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
const realZlibConstants = require$$0$a.constants ||
  /* istanbul ignore next */ { ZLIB_VERNUM: 4736 };

var constants$7 = Object.freeze(Object.assign(Object.create(null), {
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
const EE$3 = require$$0$8;
const Stream$2 = require$$0$9;
const SD = require$$2$3.StringDecoder;

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
const doIter = commonjsGlobal$1._MP_NO_ITERATOR_SYMBOLS_  !== '1';
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

var minipass = class Minipass extends Stream$2 {
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
    return !!s && (s instanceof Minipass || s instanceof Stream$2 ||
      s instanceof EE$3 && (
        typeof s.pipe === 'function' || // readable
        (typeof s.write === 'function' && typeof s.end === 'function') // writable
      ))
  }
};

const assert$b = require$$0$b;
const Buffer$1 = require$$1$6.Buffer;
const realZlib = require$$0$a;

const constants$6 = minizlib.constants = constants$7;
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
      assert$b(this[_handle], 'zlib binding closed');
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
    assert$b(this[_handle], 'zlib binding closed');

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

    opts.flush = opts.flush || constants$6.Z_NO_FLUSH;
    opts.finishFlush = opts.finishFlush || constants$6.Z_FINISH;
    super(opts, mode);

    this[_fullFlushFlag] = constants$6.Z_FULL_FLUSH;
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
      this.flush(constants$6.Z_SYNC_FLUSH);
      assert$b(this[_handle], 'zlib binding closed');
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

    opts.flush = opts.flush || constants$6.BROTLI_OPERATION_PROCESS;
    opts.finishFlush = opts.finishFlush || constants$6.BROTLI_OPERATION_FINISH;

    super(opts, mode);

    this[_fullFlushFlag] = constants$6.BROTLI_OPERATION_FLUSH;
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

const parse$4 = (buf) => {
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
  parse: parse$4,
};

// parse a 512-byte header block to a data object, or vice-versa
// encode returns `true` if a pax extended header is needed, because
// the data could not be faithfully encoded in a simple header.
// (Also, check header.needPax to see if it needs a pax header.)

const types = types$1;
const pathModule = require$$0$c.posix;
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
const path$6 = require$$0$c;

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
const { isAbsolute, parse: parse$3 } = require$$0$c.win32;

// returns [root, stripped]
// Note that windows will think that //x/y/z/a has a "root" of //x/y, and in
// those cases, we want to sanitize it to x/y/z/a, not z/a, so we strip /
// explicitly if it's the first character.
// drive-specific relative paths on Windows get their root stripped off even
// though they are not absolute, so `c:../foo` becomes ['c:', '../foo']
var stripAbsolutePath$2 = path => {
  let r = '';

  let parsed = parse$3(path);
  while (isAbsolute(path) || parsed.root) {
    // windows will think that //x/y/z has a "root" of //x/y/
    // but strip the //?/C:/ off of //?/C:/path
    const root = path.charAt(0) === '/' && path.slice(0, 4) !== '//?/' ? '/'
      : parsed.root;
    path = path.slice(root.length);
    r += root;
    parsed = parse$3(path);
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
const fs$9 = fs__default;
const path$5 = require$$0$c;
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
    fs$9.lstat(this.absolute, (er, stat) => {
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
    fs$9.readlink(this.absolute, (er, linkpath) => {
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
    fs$9.open(this.absolute, 'r', (er, fd) => {
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
    fs$9.read(fd, buf, offset, length, pos, (er, bytesRead) => {
      if (er) {
        // ignoring the error from close(2) is a bad practice, but at
        // this point we already have an error, don't need another one
        return this[CLOSE](() => this.emit('error', er))
      }
      this[ONREAD](bytesRead);
    });
  }

  [CLOSE] (cb) {
    fs$9.close(this.fd, cb);
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
    this[ONLSTAT](fs$9.lstatSync(this.absolute));
  }

  [SYMLINK$1] () {
    this[ONREADLINK](fs$9.readlinkSync(this.absolute));
  }

  [OPENFILE] () {
    this[ONOPENFILE](fs$9.openSync(this.absolute, 'r'));
  }

  [READ] () {
    let threw = true;
    try {
      const { fd, buf, offset, length, pos } = this;
      const bytesRead = fs$9.readSync(fd, buf, offset, length, pos);
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
    fs$9.closeSync(this.fd);
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
const zlib$2 = minizlib;
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

const fs$8 = fs__default;
const path$4 = require$$0$c;
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
        this.zip = new zlib$2.Gzip(opt.gzip);
      }
      if (opt.brotli) {
        if (typeof opt.brotli !== 'object') {
          opt.brotli = {};
        }
        this.zip = new zlib$2.BrotliCompress(opt.brotli);
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
    fs$8[stat](job.absolute, (er, stat) => {
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
    fs$8.readdir(job.absolute, (er, entries) => {
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
    this[ONSTAT](job, fs$8[stat](job.absolute));
  }

  [READDIR] (job, stat) {
    this[ONREADDIR](job, fs$8.readdirSync(job.absolute));
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
const EE$2 = require$$0$8.EventEmitter;
const fs$7 = fs__default;

let writev = fs$7.writev;
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
    fs$7.open(this[_path], 'r', (er, fd) => this[_onopen](er, fd));
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
      fs$7.read(this[_fd], buf, 0, buf.length, null, (er, br, buf) =>
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
      fs$7.close(fd, er => er ? this.emit('error', er) : this.emit('close'));
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
      this[_onopen](null, fs$7.openSync(this[_path], 'r'));
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
            : fs$7.readSync(this[_fd], buf, 0, buf.length, null);
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
      fs$7.closeSync(fd);
      this.emit('close');
    }
  }
}

class WriteStream extends EE$2 {
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
    fs$7.open(this[_path], this[_flags], this[_mode],
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
    fs$7.write(this[_fd], buf, 0, buf.length, this[_pos], (er, bw) =>
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
      fs$7.close(fd, er => er ? this.emit('error', er) : this.emit('close'));
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
        fd = fs$7.openSync(this[_path], this[_flags], this[_mode]);
      } catch (er) {
        if (er.code === 'ENOENT') {
          this[_flags] = 'w';
          return this[_open]()
        } else
          throw er
      }
    } else
      fd = fs$7.openSync(this[_path], this[_flags], this[_mode]);

    this[_onopen](null, fd);
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd];
      this[_fd] = null;
      fs$7.closeSync(fd);
      this.emit('close');
    }
  }

  [_write] (buf) {
    // throw the original, but try to close if it fails
    let threw = true;
    try {
      this[_onwrite](null,
        fs$7.writeSync(this[_fd], buf, 0, buf.length, this[_pos]));
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
const EE$1 = require$$0$8;
const Yallist = yallist;
const maxMetaEntrySize = 1024 * 1024;
const Entry = readEntry;
const Pax = pax;
const zlib$1 = minizlib;
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

const noop$1 = _ => true;

var parse$2 = warner(class Parser extends EE$1 {
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
    this.filter = typeof opt.filter === 'function' ? opt.filter : noop$1;
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
          ? new zlib$1.Unzip()
          : new zlib$1.BrotliDecompress();
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

const { promisify: promisify$2 } = require$$0$d;
const fs$6 = fs__default;
const optsArg$1 = opts => {
  if (!opts)
    opts = { mode: 0o777, fs: fs$6 };
  else if (typeof opts === 'object')
    opts = { mode: 0o777, fs: fs$6, ...opts };
  else if (typeof opts === 'number')
    opts = { mode: opts, fs: fs$6 };
  else if (typeof opts === 'string')
    opts = { mode: parseInt(opts, 8), fs: fs$6 };
  else
    throw new TypeError('invalid options argument')

  opts.mkdir = opts.mkdir || opts.fs.mkdir || fs$6.mkdir;
  opts.mkdirAsync = promisify$2(opts.mkdir);
  opts.stat = opts.stat || opts.fs.stat || fs$6.stat;
  opts.statAsync = promisify$2(opts.stat);
  opts.statSync = opts.statSync || opts.fs.statSync || fs$6.statSync;
  opts.mkdirSync = opts.mkdirSync || opts.fs.mkdirSync || fs$6.mkdirSync;
  return opts
};
var optsArg_1 = optsArg$1;

const platform$3 = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform;
const { resolve, parse: parse$1 } = require$$0$c;
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
    const {root} = parse$1(path);
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

const {dirname: dirname$2} = require$$0$c;

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

const {dirname: dirname$1} = require$$0$c;

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

const {dirname} = require$$0$c;
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

const fs$5 = fs__default;

const version = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version;
const versArr = version.replace(/^v/, '').split('.');
const hasNative = +versArr[0] > 10 || +versArr[0] === 10 && +versArr[1] >= 12;

const useNative$1 = !hasNative ? () => false : opts => opts.mkdir === fs$5.mkdir;
const useNativeSync$1 = !hasNative ? () => false : opts => opts.mkdirSync === fs$5.mkdirSync;

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

const fs$4 = fs__default;
const path$3 = require$$0$c;

/* istanbul ignore next */
const LCHOWN = fs$4.lchown ? 'lchown' : 'chown';
/* istanbul ignore next */
const LCHOWNSYNC = fs$4.lchownSync ? 'lchownSync' : 'chownSync';

/* istanbul ignore next */
const needEISDIRHandled = fs$4.lchown &&
  !process.version.match(/v1[1-9]+\./) &&
  !process.version.match(/v10\.[6-9]/);

const lchownSync = (path, uid, gid) => {
  try {
    return fs$4[LCHOWNSYNC](path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
};

/* istanbul ignore next */
const chownSync = (path, uid, gid) => {
  try {
    return fs$4.chownSync(path, uid, gid)
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
      fs$4.chown(path, uid, gid, cb);
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
let readdir = (path, options, cb) => fs$4.readdir(path, options, cb);
let readdirSync = (path, options) => fs$4.readdirSync(path, options);
/* istanbul ignore next */
if (/^v4\./.test(nodeVersion))
  readdir = (path, options, cb) => fs$4.readdir(path, cb);

const chown = (cpath, uid, gid, cb) => {
  fs$4[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, er => {
    // Skip ENOENT error
    cb(er && er.code !== 'ENOENT' ? er : null);
  }));
};

const chownrKid = (p, child, uid, gid, cb) => {
  if (typeof child === 'string')
    return fs$4.lstat(path$3.resolve(p, child), (er, stats) => {
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
      const stats = fs$4.lstatSync(path$3.resolve(p, child));
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
const fs$3 = fs__default;
const path$2 = require$$0$c;
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
  fs$3.stat(dir, (er, st) => {
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
        fs$3.chmod(dir, mode, cb);
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
  fs$3.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb));
};

const onmkdir = (part, parts, mode, cache, unlink, cwd, created, cb) => er => {
  if (er) {
    fs$3.lstat(part, (statEr, st) => {
      if (statEr) {
        statEr.path = statEr.path && normPath$1(statEr.path);
        cb(statEr);
      } else if (st.isDirectory()) {
        mkdir_(part, parts, mode, cache, unlink, cwd, created, cb);
      } else if (unlink) {
        fs$3.unlink(part, er => {
          if (er) {
            return cb(er)
          }
          fs$3.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb));
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
    ok = fs$3.statSync(dir).isDirectory();
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
      fs$3.chmodSync(dir, mode);
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
      fs$3.mkdirSync(part, mode);
      created = created || part;
      cSet(cache, part, true);
    } catch (er) {
      const st = fs$3.lstatSync(part);
      if (st.isDirectory()) {
        cSet(cache, part, true);
        continue
      } else if (unlink) {
        fs$3.unlinkSync(part);
        fs$3.mkdirSync(part, mode);
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

const assert$a = require$$0$b;
const normalize$1 = normalizeUnicode;
const stripSlashes = stripTrailingSlashes;
const { join } = require$$0$c;

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
      assert$a.equal(q[0], fn);
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
      assert$a(q[0] instanceof Set);
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
const fs$2 = commonjsGlobal$1.__FAKE_TESTING_FS__ || fs__default;

/* istanbul ignore next */
const { O_CREAT, O_TRUNC, O_WRONLY, UV_FS_O_FILEMAP = 0 } = fs$2.constants;

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

const assert$9 = require$$0$b;
const Parser$1 = parse$2;
const fs$1 = fs__default;
const fsm$1 = fsMinipass;
const path$1 = require$$0$c;
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
const crypto = require$$0$e;
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
    return fs$1.unlink(path, cb)
  }

  const name = path + '.DELETE.' + crypto.randomBytes(16).toString('hex');
  fs$1.rename(path, name, er => {
    if (er) {
      return cb(er)
    }
    fs$1.unlink(name, cb);
  });
};

/* istanbul ignore next */
const unlinkFileSync = path => {
  if (!isWindows) {
    return fs$1.unlinkSync(path)
  }

  const name = path + '.DELETE.' + crypto.randomBytes(16).toString('hex');
  fs$1.renameSync(path, name);
  fs$1.unlinkSync(name);
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

let Unpack$1 = class Unpack extends Parser$1 {
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

    assert$9.equal(typeof entry.absolute, 'string');

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
        fs$1.close(stream.fd, () => {});
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
          fs$1.close(stream.fd, () => {});
        }

        this[ONERROR](er, entry);
        fullyDone();
        return
      }

      if (--actions === 0) {
        fs$1.close(stream.fd, er => {
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
        fs$1.futimes(fd, atime, mtime, er =>
          er ? fs$1.utimes(abs, atime, mtime, er2 => done(er2 && er))
          : done());
      }

      if (this[DOCHOWN](entry)) {
        actions++;
        const uid = this[UID](entry);
        const gid = this[GID](entry);
        fs$1.fchown(fd, uid, gid, er =>
          er ? fs$1.chown(abs, uid, gid, er2 => done(er2 && er))
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
        fs$1.utimes(entry.absolute, entry.atime || new Date(), entry.mtime, done);
      }

      if (this[DOCHOWN](entry)) {
        actions++;
        fs$1.chown(entry.absolute, this[UID](entry), this[GID](entry), done);
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
      fs$1.lstat(entry.absolute, (lstatEr, st) => {
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
            return fs$1.chmod(entry.absolute, entry.mode, afterChmod)
          }
          // Not a dir entry, have to remove it.
          // NB: the only way to end up with an entry that is the cwd
          // itself, in such a way that == does not detect, is a
          // tricky windows absolute path with UNC or 8.3 parts (and
          // preservePaths:true, or else it will have been stripped).
          // In that case, the user has opted out of path protections
          // explicitly, so if they blow away the cwd, c'est la vie.
          if (entry.absolute !== this.cwd) {
            return fs$1.rmdir(entry.absolute, er =>
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
    fs$1[link](linkpath, entry.absolute, er => {
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

    const [lstatEr, st] = callSync(() => fs$1.lstatSync(entry.absolute));
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
          fs$1.chmodSync(entry.absolute, entry.mode);
        }) : [];
        return this[MAKEFS](er, entry)
      }
      // not a dir entry, have to remove it
      const [er] = callSync(() => fs$1.rmdirSync(entry.absolute));
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
        fs$1.closeSync(fd);
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
      fd = fs$1.openSync(entry.absolute, getFlag(entry.size), mode);
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
        fs$1.writeSync(fd, chunk, 0, chunk.length);
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
          fs$1.futimesSync(fd, atime, mtime);
        } catch (futimeser) {
          try {
            fs$1.utimesSync(entry.absolute, atime, mtime);
          } catch (utimeser) {
            er = futimeser;
          }
        }
      }

      if (this[DOCHOWN](entry)) {
        const uid = this[UID](entry);
        const gid = this[GID](entry);

        try {
          fs$1.fchownSync(fd, uid, gid);
        } catch (fchowner) {
          try {
            fs$1.chownSync(entry.absolute, uid, gid);
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
        fs$1.utimesSync(entry.absolute, entry.atime || new Date(), entry.mtime);
      } catch (er) {}
    }
    if (this[DOCHOWN](entry)) {
      try {
        fs$1.chownSync(entry.absolute, this[UID](entry), this[GID](entry));
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
      fs$1[link + 'Sync'](linkpath, entry.absolute);
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
const fs = fs__default;
const fsm = fsMinipass;
const path = require$$0$c;
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
  const stat = fs.statSync(file);
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
    fs.stat(file, (er, stat) => {
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

async function findup(cwd, match, options = {}) {
  const segments = normalize$2(cwd).split("/");
  while (segments.length > 0) {
    const path = segments.join("/");
    const result = await match(path);
    if (result || !options.includeParentDirs) {
      return result;
    }
    segments.pop();
  }
}
function cached(fn) {
  let v;
  return () => {
    if (v === void 0) {
      v = fn().then((r) => {
        v = r;
        return v;
      });
    }
    return v;
  };
}
const importExeca = cached(() => import('./index2.mjs').then((r) => r.execa));
const hasCorepack = cached(async () => {
  try {
    const execa = await importExeca();
    await execa("corepack", ["--version"]);
    return true;
  } catch {
    return false;
  }
});
async function executeCommand(command, args, options = {}) {
  const execaArgs = command === "npm" || command === "bun" || !await hasCorepack() ? [command, args] : ["corepack", [command, ...args]];
  const execa = await importExeca();
  await execa(execaArgs[0], execaArgs[1], {
    cwd: resolve$1(options.cwd || process.cwd()),
    stdio: options.silent ? "pipe" : "inherit"
  });
}
const NO_PACKAGE_MANAGER_DETECTED_ERROR_MSG = "No package manager auto-detected.";
async function resolveOperationOptions(options = {}) {
  const cwd = options.cwd || process.cwd();
  const packageManager = (typeof options.packageManager === "string" ? packageManagers.find((pm) => pm.name === options.packageManager) : options.packageManager) || await detectPackageManager(options.cwd || process.cwd());
  if (!packageManager) {
    throw new Error(NO_PACKAGE_MANAGER_DETECTED_ERROR_MSG);
  }
  return {
    cwd,
    silent: options.silent ?? false,
    packageManager,
    dev: options.dev ?? false,
    workspace: options.workspace
  };
}

const packageManagers = [
  { name: "npm", command: "npm", lockFile: "package-lock.json" },
  {
    name: "pnpm",
    command: "pnpm",
    lockFile: "pnpm-lock.yaml",
    files: ["pnpm-workspace.yaml"]
  },
  {
    name: "bun",
    command: "bun",
    lockFile: "bun.lockb"
  },
  {
    name: "yarn",
    command: "yarn",
    majorVersion: "1.0.0",
    lockFile: "yarn.lock"
  },
  {
    name: "yarn",
    command: "yarn",
    majorVersion: "3.0.0",
    lockFile: "yarn.lock",
    files: [".yarnrc.yml"]
  }
];
async function detectPackageManager(cwd, options = {}) {
  const detected = await findup(
    cwd,
    async (path) => {
      if (!options.ignorePackageJSON) {
        const packageJSONPath = join$1(path, "package.json");
        if (existsSync(packageJSONPath)) {
          const packageJSON = JSON.parse(
            await readFile(packageJSONPath, "utf8")
          );
          if (packageJSON?.packageManager) {
            const [name, version = "0.0.0"] = packageJSON.packageManager.split("@");
            const majorVersion = version.split(".")[0];
            const packageManager = packageManagers.find(
              (pm) => pm.name === name && pm.majorVersion === majorVersion
            ) || packageManagers.find((pm) => pm.name === name);
            return {
              ...packageManager,
              name,
              command: name,
              version,
              majorVersion
            };
          }
        }
      }
      if (!options.ignoreLockFile) {
        for (const packageManager of packageManagers) {
          const detectionsFiles = [
            packageManager.lockFile,
            ...packageManager.files || []
          ].filter(Boolean);
          if (detectionsFiles.some((file) => existsSync(resolve$1(path, file)))) {
            return {
              ...packageManager
            };
          }
        }
      }
    },
    {
      includeParentDirs: options.includeParentDirs ?? true
    }
  );
  return detected;
}

async function installDependencies(options = {}) {
  const resolvedOptions = await resolveOperationOptions(options);
  await executeCommand(resolvedOptions.packageManager.command, ["install"], {
    cwd: resolvedOptions.cwd,
    silent: resolvedOptions.silent
  });
}

var nodeFetchNative_61758d11 = {};

var l$1=Object.defineProperty;var o$1=(e,t)=>l$1(e,"name",{value:t,configurable:!0});var commonjsGlobal=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof commonjsGlobal$1<"u"?commonjsGlobal$1:typeof self<"u"?self:{};function getDefaultExportFromCjs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}o$1(getDefaultExportFromCjs,"getDefaultExportFromCjs"),nodeFetchNative_61758d11.commonjsGlobal=commonjsGlobal,nodeFetchNative_61758d11.getDefaultExportFromCjs=getDefaultExportFromCjs;

var dist$3 = {};

var node$2 = {};

var Li=Object.defineProperty;var u$1=(c,l)=>Li(c,"name",{value:l,configurable:!0});var co=(c,l,d)=>{if(!l.has(c))throw TypeError("Cannot "+d)};var L$1=(c,l,d)=>(co(c,l,"read from private field"),d?d.call(c):l.get(c)),ue$1=(c,l,d)=>{if(l.has(c))throw TypeError("Cannot add the same private member more than once");l instanceof WeakSet?l.add(c):l.set(c,d);},J=(c,l,d,b)=>(co(c,l,"write to private field"),b?b.call(c,d):l.set(c,d),d);var be$1,ct$1,et$1,Qt$1,Me$1,dt$1,ht$1,pt,X,bt$1,$e,De$1,mt;Object.defineProperty(node$2,"__esModule",{value:!0});const http$4=require$$0$f,https$2=require$$2$4,zlib=require$$3$1,Stream$1=require$$4$1,node_buffer=require$$5$2,require$$1$5=require$$6$1,_commonjsHelpers$1=nodeFetchNative_61758d11,node_url$1=require$$8$1,node_net=require$$9$1,node_fs=fs$a,node_path=path$7;function _interopDefaultCompat$1(c){return c&&typeof c=="object"&&"default"in c?c.default:c}u$1(_interopDefaultCompat$1,"_interopDefaultCompat");const http__default=_interopDefaultCompat$1(http$4),https__default=_interopDefaultCompat$1(https$2),zlib__default=_interopDefaultCompat$1(zlib),Stream__default$1=_interopDefaultCompat$1(Stream$1);function dataUriToBuffer(c){if(!/^data:/i.test(c))throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');c=c.replace(/\r?\n/g,"");const l=c.indexOf(",");if(l===-1||l<=4)throw new TypeError("malformed data: URI");const d=c.substring(5,l).split(";");let b="",y=!1;const S=d[0]||"text/plain";let R=S;for(let N=1;N<d.length;N++)d[N]==="base64"?y=!0:d[N]&&(R+=`;${d[N]}`,d[N].indexOf("charset=")===0&&(b=d[N].substring(8)));!d[0]&&!b.length&&(R+=";charset=US-ASCII",b="US-ASCII");const C=y?"base64":"ascii",O=unescape(c.substring(l+1)),A=Buffer.from(O,C);return A.type=S,A.typeFull=R,A.charset=b,A}u$1(dataUriToBuffer,"dataUriToBuffer");var ponyfill_es2018={exports:{}},hasRequiredPonyfill_es2018;function requirePonyfill_es2018(){return hasRequiredPonyfill_es2018||(hasRequiredPonyfill_es2018=1,function(c,l){(function(d,b){b(l);})(_commonjsHelpers$1.commonjsGlobal,function(d){const b=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol:n=>`Symbol(${n})`;function y(){}u$1(y,"noop");function S(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof _commonjsHelpers$1.commonjsGlobal<"u")return _commonjsHelpers$1.commonjsGlobal}u$1(S,"getGlobals");const R=S();function C(n){return typeof n=="object"&&n!==null||typeof n=="function"}u$1(C,"typeIsObject");const O=y,A=Promise,N=Promise.prototype.then,oe=Promise.resolve.bind(A),H=Promise.reject.bind(A);function F(n){return new A(n)}u$1(F,"newPromise");function T(n){return oe(n)}u$1(T,"promiseResolvedWith");function v(n){return H(n)}u$1(v,"promiseRejectedWith");function j(n,o,a){return N.call(n,o,a)}u$1(j,"PerformPromiseThen");function D(n,o,a){j(j(n,o,a),void 0,O);}u$1(D,"uponPromise");function ie(n,o){D(n,o);}u$1(ie,"uponFulfillment");function tt(n,o){D(n,void 0,o);}u$1(tt,"uponRejection");function $(n,o,a){return j(n,o,a)}u$1($,"transformPromiseWith");function V(n){j(n,void 0,O);}u$1(V,"setPromiseIsHandledToTrue");const U=(()=>{const n=R&&R.queueMicrotask;if(typeof n=="function")return n;const o=T(void 0);return a=>j(o,a)})();function Pe(n,o,a){if(typeof n!="function")throw new TypeError("Argument is not a function");return Function.prototype.apply.call(n,o,a)}u$1(Pe,"reflectCall");function le(n,o,a){try{return T(Pe(n,o,a))}catch(p){return v(p)}}u$1(le,"promiseCall");const Yr=16384,Ar=class Ar{constructor(){this._cursor=0,this._size=0,this._front={_elements:[],_next:void 0},this._back=this._front,this._cursor=0,this._size=0;}get length(){return this._size}push(o){const a=this._back;let p=a;a._elements.length===Yr-1&&(p={_elements:[],_next:void 0}),a._elements.push(o),p!==a&&(this._back=p,a._next=p),++this._size;}shift(){const o=this._front;let a=o;const p=this._cursor;let g=p+1;const _=o._elements,w=_[p];return g===Yr&&(a=o._next,g=0),--this._size,this._cursor=g,o!==a&&(this._front=a),_[p]=void 0,w}forEach(o){let a=this._cursor,p=this._front,g=p._elements;for(;(a!==g.length||p._next!==void 0)&&!(a===g.length&&(p=p._next,g=p._elements,a=0,g.length===0));)o(g[a]),++a;}peek(){const o=this._front,a=this._cursor;return o._elements[a]}};u$1(Ar,"SimpleQueue");let Y=Ar;function Zr(n,o){n._ownerReadableStream=o,o._reader=n,o._state==="readable"?Jt(n):o._state==="closed"?ho(n):Kr(n,o._storedError);}u$1(Zr,"ReadableStreamReaderGenericInitialize");function Kt(n,o){const a=n._ownerReadableStream;return re(a,o)}u$1(Kt,"ReadableStreamReaderGenericCancel");function fe(n){n._ownerReadableStream._state==="readable"?Xt(n,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")):po(n,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")),n._ownerReadableStream._reader=void 0,n._ownerReadableStream=void 0;}u$1(fe,"ReadableStreamReaderGenericRelease");function Ue(n){return new TypeError("Cannot "+n+" a stream using a released reader")}u$1(Ue,"readerLockException");function Jt(n){n._closedPromise=F((o,a)=>{n._closedPromise_resolve=o,n._closedPromise_reject=a;});}u$1(Jt,"defaultReaderClosedPromiseInitialize");function Kr(n,o){Jt(n),Xt(n,o);}u$1(Kr,"defaultReaderClosedPromiseInitializeAsRejected");function ho(n){Jt(n),Jr(n);}u$1(ho,"defaultReaderClosedPromiseInitializeAsResolved");function Xt(n,o){n._closedPromise_reject!==void 0&&(V(n._closedPromise),n._closedPromise_reject(o),n._closedPromise_resolve=void 0,n._closedPromise_reject=void 0);}u$1(Xt,"defaultReaderClosedPromiseReject");function po(n,o){Kr(n,o);}u$1(po,"defaultReaderClosedPromiseResetToRejected");function Jr(n){n._closedPromise_resolve!==void 0&&(n._closedPromise_resolve(void 0),n._closedPromise_resolve=void 0,n._closedPromise_reject=void 0);}u$1(Jr,"defaultReaderClosedPromiseResolve");const Xr=b("[[AbortSteps]]"),en=b("[[ErrorSteps]]"),er=b("[[CancelSteps]]"),tr=b("[[PullSteps]]"),tn=Number.isFinite||function(n){return typeof n=="number"&&isFinite(n)},bo=Math.trunc||function(n){return n<0?Math.ceil(n):Math.floor(n)};function mo(n){return typeof n=="object"||typeof n=="function"}u$1(mo,"isDictionary");function ce(n,o){if(n!==void 0&&!mo(n))throw new TypeError(`${o} is not an object.`)}u$1(ce,"assertDictionary");function ee(n,o){if(typeof n!="function")throw new TypeError(`${o} is not a function.`)}u$1(ee,"assertFunction");function yo(n){return typeof n=="object"&&n!==null||typeof n=="function"}u$1(yo,"isObject");function rn(n,o){if(!yo(n))throw new TypeError(`${o} is not an object.`)}u$1(rn,"assertObject");function de(n,o,a){if(n===void 0)throw new TypeError(`Parameter ${o} is required in '${a}'.`)}u$1(de,"assertRequiredArgument");function rr(n,o,a){if(n===void 0)throw new TypeError(`${o} is required in '${a}'.`)}u$1(rr,"assertRequiredField");function nr(n){return Number(n)}u$1(nr,"convertUnrestrictedDouble");function nn(n){return n===0?0:n}u$1(nn,"censorNegativeZero");function go(n){return nn(bo(n))}u$1(go,"integerPart");function on(n,o){const p=Number.MAX_SAFE_INTEGER;let g=Number(n);if(g=nn(g),!tn(g))throw new TypeError(`${o} is not a finite number`);if(g=go(g),g<0||g>p)throw new TypeError(`${o} is outside the accepted range of 0 to ${p}, inclusive`);return !tn(g)||g===0?0:g}u$1(on,"convertUnsignedLongLongWithEnforceRange");function or(n,o){if(!Re(n))throw new TypeError(`${o} is not a ReadableStream.`)}u$1(or,"assertReadableStream");function xe(n){return new ve(n)}u$1(xe,"AcquireReadableStreamDefaultReader");function sn(n,o){n._reader._readRequests.push(o);}u$1(sn,"ReadableStreamAddReadRequest");function ir(n,o,a){const g=n._reader._readRequests.shift();a?g._closeSteps():g._chunkSteps(o);}u$1(ir,"ReadableStreamFulfillReadRequest");function yt(n){return n._reader._readRequests.length}u$1(yt,"ReadableStreamGetNumReadRequests");function an(n){const o=n._reader;return !(o===void 0||!me(o))}u$1(an,"ReadableStreamHasDefaultReader");const Br=class Br{constructor(o){if(de(o,1,"ReadableStreamDefaultReader"),or(o,"First parameter"),Te(o))throw new TypeError("This stream has already been locked for exclusive reading by another reader");Zr(this,o),this._readRequests=new Y;}get closed(){return me(this)?this._closedPromise:v(gt("closed"))}cancel(o=void 0){return me(this)?this._ownerReadableStream===void 0?v(Ue("cancel")):Kt(this,o):v(gt("cancel"))}read(){if(!me(this))return v(gt("read"));if(this._ownerReadableStream===void 0)return v(Ue("read from"));let o,a;const p=F((_,w)=>{o=_,a=w;});return rt(this,{_chunkSteps:_=>o({value:_,done:!1}),_closeSteps:()=>o({value:void 0,done:!0}),_errorSteps:_=>a(_)}),p}releaseLock(){if(!me(this))throw gt("releaseLock");if(this._ownerReadableStream!==void 0){if(this._readRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");fe(this);}}};u$1(Br,"ReadableStreamDefaultReader");let ve=Br;Object.defineProperties(ve.prototype,{cancel:{enumerable:!0},read:{enumerable:!0},releaseLock:{enumerable:!0},closed:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(ve.prototype,b.toStringTag,{value:"ReadableStreamDefaultReader",configurable:!0});function me(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_readRequests")?!1:n instanceof ve}u$1(me,"IsReadableStreamDefaultReader");function rt(n,o){const a=n._ownerReadableStream;a._disturbed=!0,a._state==="closed"?o._closeSteps():a._state==="errored"?o._errorSteps(a._storedError):a._readableStreamController[tr](o);}u$1(rt,"ReadableStreamDefaultReaderRead");function gt(n){return new TypeError(`ReadableStreamDefaultReader.prototype.${n} can only be used on a ReadableStreamDefaultReader`)}u$1(gt,"defaultReaderBrandCheckException");const un=Object.getPrototypeOf(Object.getPrototypeOf(async function*(){}).prototype),Wr=class Wr{constructor(o,a){this._ongoingPromise=void 0,this._isFinished=!1,this._reader=o,this._preventCancel=a;}next(){const o=u$1(()=>this._nextSteps(),"nextSteps");return this._ongoingPromise=this._ongoingPromise?$(this._ongoingPromise,o,o):o(),this._ongoingPromise}return(o){const a=u$1(()=>this._returnSteps(o),"returnSteps");return this._ongoingPromise?$(this._ongoingPromise,a,a):a()}_nextSteps(){if(this._isFinished)return Promise.resolve({value:void 0,done:!0});const o=this._reader;if(o._ownerReadableStream===void 0)return v(Ue("iterate"));let a,p;const g=F((w,P)=>{a=w,p=P;});return rt(o,{_chunkSteps:w=>{this._ongoingPromise=void 0,U(()=>a({value:w,done:!1}));},_closeSteps:()=>{this._ongoingPromise=void 0,this._isFinished=!0,fe(o),a({value:void 0,done:!0});},_errorSteps:w=>{this._ongoingPromise=void 0,this._isFinished=!0,fe(o),p(w);}}),g}_returnSteps(o){if(this._isFinished)return Promise.resolve({value:o,done:!0});this._isFinished=!0;const a=this._reader;if(a._ownerReadableStream===void 0)return v(Ue("finish iterating"));if(!this._preventCancel){const p=Kt(a,o);return fe(a),$(p,()=>({value:o,done:!0}))}return fe(a),T({value:o,done:!0})}};u$1(Wr,"ReadableStreamAsyncIteratorImpl");let _t=Wr;const ln={next(){return fn(this)?this._asyncIteratorImpl.next():v(cn("next"))},return(n){return fn(this)?this._asyncIteratorImpl.return(n):v(cn("return"))}};un!==void 0&&Object.setPrototypeOf(ln,un);function _o(n,o){const a=xe(n),p=new _t(a,o),g=Object.create(ln);return g._asyncIteratorImpl=p,g}u$1(_o,"AcquireReadableStreamAsyncIterator");function fn(n){if(!C(n)||!Object.prototype.hasOwnProperty.call(n,"_asyncIteratorImpl"))return !1;try{return n._asyncIteratorImpl instanceof _t}catch{return !1}}u$1(fn,"IsReadableStreamAsyncIterator");function cn(n){return new TypeError(`ReadableStreamAsyncIterator.${n} can only be used on a ReadableSteamAsyncIterator`)}u$1(cn,"streamAsyncIteratorBrandCheckException");const dn=Number.isNaN||function(n){return n!==n};function nt(n){return n.slice()}u$1(nt,"CreateArrayFromList");function hn(n,o,a,p,g){new Uint8Array(n).set(new Uint8Array(a,p,g),o);}u$1(hn,"CopyDataBlockBytes");function $i(n){return n}u$1($i,"TransferArrayBuffer");function St(n){return !1}u$1(St,"IsDetachedBuffer");function pn(n,o,a){if(n.slice)return n.slice(o,a);const p=a-o,g=new ArrayBuffer(p);return hn(g,0,n,o,p),g}u$1(pn,"ArrayBufferSlice");function So(n){return !(typeof n!="number"||dn(n)||n<0)}u$1(So,"IsNonNegativeNumber");function bn(n){const o=pn(n.buffer,n.byteOffset,n.byteOffset+n.byteLength);return new Uint8Array(o)}u$1(bn,"CloneAsUint8Array");function sr(n){const o=n._queue.shift();return n._queueTotalSize-=o.size,n._queueTotalSize<0&&(n._queueTotalSize=0),o.value}u$1(sr,"DequeueValue");function ar(n,o,a){if(!So(a)||a===1/0)throw new RangeError("Size must be a finite, non-NaN, non-negative number.");n._queue.push({value:o,size:a}),n._queueTotalSize+=a;}u$1(ar,"EnqueueValueWithSize");function wo(n){return n._queue.peek().value}u$1(wo,"PeekQueueValue");function ye(n){n._queue=new Y,n._queueTotalSize=0;}u$1(ye,"ResetQueue");const kr=class kr{constructor(){throw new TypeError("Illegal constructor")}get view(){if(!ur(this))throw dr("view");return this._view}respond(o){if(!ur(this))throw dr("respond");if(de(o,1,"respond"),o=on(o,"First parameter"),this._associatedReadableByteStreamController===void 0)throw new TypeError("This BYOB request has been invalidated");St(this._view.buffer),Pt(this._associatedReadableByteStreamController,o);}respondWithNewView(o){if(!ur(this))throw dr("respondWithNewView");if(de(o,1,"respondWithNewView"),!ArrayBuffer.isView(o))throw new TypeError("You can only respond with array buffer views");if(this._associatedReadableByteStreamController===void 0)throw new TypeError("This BYOB request has been invalidated");St(o.buffer),vt(this._associatedReadableByteStreamController,o);}};u$1(kr,"ReadableStreamBYOBRequest");let Ee=kr;Object.defineProperties(Ee.prototype,{respond:{enumerable:!0},respondWithNewView:{enumerable:!0},view:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(Ee.prototype,b.toStringTag,{value:"ReadableStreamBYOBRequest",configurable:!0});const Or=class Or{constructor(){throw new TypeError("Illegal constructor")}get byobRequest(){if(!Ae(this))throw it("byobRequest");return cr(this)}get desiredSize(){if(!Ae(this))throw it("desiredSize");return Tn(this)}close(){if(!Ae(this))throw it("close");if(this._closeRequested)throw new TypeError("The stream has already been closed; do not close it again!");const o=this._controlledReadableByteStream._state;if(o!=="readable")throw new TypeError(`The stream (in ${o} state) is not in the readable state and cannot be closed`);ot(this);}enqueue(o){if(!Ae(this))throw it("enqueue");if(de(o,1,"enqueue"),!ArrayBuffer.isView(o))throw new TypeError("chunk must be an array buffer view");if(o.byteLength===0)throw new TypeError("chunk must have non-zero byteLength");if(o.buffer.byteLength===0)throw new TypeError("chunk's buffer must have non-zero byteLength");if(this._closeRequested)throw new TypeError("stream is closed or draining");const a=this._controlledReadableByteStream._state;if(a!=="readable")throw new TypeError(`The stream (in ${a} state) is not in the readable state and cannot be enqueued to`);Ct(this,o);}error(o=void 0){if(!Ae(this))throw it("error");te(this,o);}[er](o){mn(this),ye(this);const a=this._cancelAlgorithm(o);return Tt(this),a}[tr](o){const a=this._controlledReadableByteStream;if(this._queueTotalSize>0){const g=this._queue.shift();this._queueTotalSize-=g.byteLength,Sn(this);const _=new Uint8Array(g.buffer,g.byteOffset,g.byteLength);o._chunkSteps(_);return}const p=this._autoAllocateChunkSize;if(p!==void 0){let g;try{g=new ArrayBuffer(p);}catch(w){o._errorSteps(w);return}const _={buffer:g,bufferByteLength:p,byteOffset:0,byteLength:p,bytesFilled:0,elementSize:1,viewConstructor:Uint8Array,readerType:"default"};this._pendingPullIntos.push(_);}sn(a,o),Be(this);}};u$1(Or,"ReadableByteStreamController");let ge=Or;Object.defineProperties(ge.prototype,{close:{enumerable:!0},enqueue:{enumerable:!0},error:{enumerable:!0},byobRequest:{enumerable:!0},desiredSize:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(ge.prototype,b.toStringTag,{value:"ReadableByteStreamController",configurable:!0});function Ae(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_controlledReadableByteStream")?!1:n instanceof ge}u$1(Ae,"IsReadableByteStreamController");function ur(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_associatedReadableByteStreamController")?!1:n instanceof Ee}u$1(ur,"IsReadableStreamBYOBRequest");function Be(n){if(!Po(n))return;if(n._pulling){n._pullAgain=!0;return}n._pulling=!0;const a=n._pullAlgorithm();D(a,()=>{n._pulling=!1,n._pullAgain&&(n._pullAgain=!1,Be(n));},p=>{te(n,p);});}u$1(Be,"ReadableByteStreamControllerCallPullIfNeeded");function mn(n){fr(n),n._pendingPullIntos=new Y;}u$1(mn,"ReadableByteStreamControllerClearPendingPullIntos");function lr(n,o){let a=!1;n._state==="closed"&&(a=!0);const p=yn(o);o.readerType==="default"?ir(n,p,a):Ao(n,p,a);}u$1(lr,"ReadableByteStreamControllerCommitPullIntoDescriptor");function yn(n){const o=n.bytesFilled,a=n.elementSize;return new n.viewConstructor(n.buffer,n.byteOffset,o/a)}u$1(yn,"ReadableByteStreamControllerConvertPullIntoDescriptor");function wt(n,o,a,p){n._queue.push({buffer:o,byteOffset:a,byteLength:p}),n._queueTotalSize+=p;}u$1(wt,"ReadableByteStreamControllerEnqueueChunkToQueue");function gn(n,o){const a=o.elementSize,p=o.bytesFilled-o.bytesFilled%a,g=Math.min(n._queueTotalSize,o.byteLength-o.bytesFilled),_=o.bytesFilled+g,w=_-_%a;let P=g,B=!1;w>p&&(P=w-o.bytesFilled,B=!0);const k=n._queue;for(;P>0;){const q=k.peek(),z=Math.min(P,q.byteLength),M=o.byteOffset+o.bytesFilled;hn(o.buffer,M,q.buffer,q.byteOffset,z),q.byteLength===z?k.shift():(q.byteOffset+=z,q.byteLength-=z),n._queueTotalSize-=z,_n(n,z,o),P-=z;}return B}u$1(gn,"ReadableByteStreamControllerFillPullIntoDescriptorFromQueue");function _n(n,o,a){a.bytesFilled+=o;}u$1(_n,"ReadableByteStreamControllerFillHeadPullIntoDescriptor");function Sn(n){n._queueTotalSize===0&&n._closeRequested?(Tt(n),ft(n._controlledReadableByteStream)):Be(n);}u$1(Sn,"ReadableByteStreamControllerHandleQueueDrain");function fr(n){n._byobRequest!==null&&(n._byobRequest._associatedReadableByteStreamController=void 0,n._byobRequest._view=null,n._byobRequest=null);}u$1(fr,"ReadableByteStreamControllerInvalidateBYOBRequest");function wn(n){for(;n._pendingPullIntos.length>0;){if(n._queueTotalSize===0)return;const o=n._pendingPullIntos.peek();gn(n,o)&&(Rt(n),lr(n._controlledReadableByteStream,o));}}u$1(wn,"ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue");function Ro(n,o,a){const p=n._controlledReadableByteStream;let g=1;o.constructor!==DataView&&(g=o.constructor.BYTES_PER_ELEMENT);const _=o.constructor,w=o.buffer,P={buffer:w,bufferByteLength:w.byteLength,byteOffset:o.byteOffset,byteLength:o.byteLength,bytesFilled:0,elementSize:g,viewConstructor:_,readerType:"byob"};if(n._pendingPullIntos.length>0){n._pendingPullIntos.push(P),vn(p,a);return}if(p._state==="closed"){const B=new _(P.buffer,P.byteOffset,0);a._closeSteps(B);return}if(n._queueTotalSize>0){if(gn(n,P)){const B=yn(P);Sn(n),a._chunkSteps(B);return}if(n._closeRequested){const B=new TypeError("Insufficient bytes to fill elements in the given buffer");te(n,B),a._errorSteps(B);return}}n._pendingPullIntos.push(P),vn(p,a),Be(n);}u$1(Ro,"ReadableByteStreamControllerPullInto");function To(n,o){const a=n._controlledReadableByteStream;if(hr(a))for(;En(a)>0;){const p=Rt(n);lr(a,p);}}u$1(To,"ReadableByteStreamControllerRespondInClosedState");function Co(n,o,a){if(_n(n,o,a),a.bytesFilled<a.elementSize)return;Rt(n);const p=a.bytesFilled%a.elementSize;if(p>0){const g=a.byteOffset+a.bytesFilled,_=pn(a.buffer,g-p,g);wt(n,_,0,_.byteLength);}a.bytesFilled-=p,lr(n._controlledReadableByteStream,a),wn(n);}u$1(Co,"ReadableByteStreamControllerRespondInReadableState");function Rn(n,o){const a=n._pendingPullIntos.peek();fr(n),n._controlledReadableByteStream._state==="closed"?To(n):Co(n,o,a),Be(n);}u$1(Rn,"ReadableByteStreamControllerRespondInternal");function Rt(n){return n._pendingPullIntos.shift()}u$1(Rt,"ReadableByteStreamControllerShiftPendingPullInto");function Po(n){const o=n._controlledReadableByteStream;return o._state!=="readable"||n._closeRequested||!n._started?!1:!!(an(o)&&yt(o)>0||hr(o)&&En(o)>0||Tn(n)>0)}u$1(Po,"ReadableByteStreamControllerShouldCallPull");function Tt(n){n._pullAlgorithm=void 0,n._cancelAlgorithm=void 0;}u$1(Tt,"ReadableByteStreamControllerClearAlgorithms");function ot(n){const o=n._controlledReadableByteStream;if(!(n._closeRequested||o._state!=="readable")){if(n._queueTotalSize>0){n._closeRequested=!0;return}if(n._pendingPullIntos.length>0&&n._pendingPullIntos.peek().bytesFilled>0){const p=new TypeError("Insufficient bytes to fill elements in the given buffer");throw te(n,p),p}Tt(n),ft(o);}}u$1(ot,"ReadableByteStreamControllerClose");function Ct(n,o){const a=n._controlledReadableByteStream;if(n._closeRequested||a._state!=="readable")return;const p=o.buffer,g=o.byteOffset,_=o.byteLength,w=p;if(n._pendingPullIntos.length>0){const P=n._pendingPullIntos.peek();St(P.buffer),P.buffer=P.buffer;}if(fr(n),an(a))if(yt(a)===0)wt(n,w,g,_);else {n._pendingPullIntos.length>0&&Rt(n);const P=new Uint8Array(w,g,_);ir(a,P,!1);}else hr(a)?(wt(n,w,g,_),wn(n)):wt(n,w,g,_);Be(n);}u$1(Ct,"ReadableByteStreamControllerEnqueue");function te(n,o){const a=n._controlledReadableByteStream;a._state==="readable"&&(mn(n),ye(n),Tt(n),Kn(a,o));}u$1(te,"ReadableByteStreamControllerError");function cr(n){if(n._byobRequest===null&&n._pendingPullIntos.length>0){const o=n._pendingPullIntos.peek(),a=new Uint8Array(o.buffer,o.byteOffset+o.bytesFilled,o.byteLength-o.bytesFilled),p=Object.create(Ee.prototype);Eo(p,n,a),n._byobRequest=p;}return n._byobRequest}u$1(cr,"ReadableByteStreamControllerGetBYOBRequest");function Tn(n){const o=n._controlledReadableByteStream._state;return o==="errored"?null:o==="closed"?0:n._strategyHWM-n._queueTotalSize}u$1(Tn,"ReadableByteStreamControllerGetDesiredSize");function Pt(n,o){const a=n._pendingPullIntos.peek();if(n._controlledReadableByteStream._state==="closed"){if(o!==0)throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream")}else {if(o===0)throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");if(a.bytesFilled+o>a.byteLength)throw new RangeError("bytesWritten out of range")}a.buffer=a.buffer,Rn(n,o);}u$1(Pt,"ReadableByteStreamControllerRespond");function vt(n,o){const a=n._pendingPullIntos.peek();if(n._controlledReadableByteStream._state==="closed"){if(o.byteLength!==0)throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream")}else if(o.byteLength===0)throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");if(a.byteOffset+a.bytesFilled!==o.byteOffset)throw new RangeError("The region specified by view does not match byobRequest");if(a.bufferByteLength!==o.buffer.byteLength)throw new RangeError("The buffer of view has different capacity than byobRequest");if(a.bytesFilled+o.byteLength>a.byteLength)throw new RangeError("The region specified by view is larger than byobRequest");const g=o.byteLength;a.buffer=o.buffer,Rn(n,g);}u$1(vt,"ReadableByteStreamControllerRespondWithNewView");function Cn(n,o,a,p,g,_,w){o._controlledReadableByteStream=n,o._pullAgain=!1,o._pulling=!1,o._byobRequest=null,o._queue=o._queueTotalSize=void 0,ye(o),o._closeRequested=!1,o._started=!1,o._strategyHWM=_,o._pullAlgorithm=p,o._cancelAlgorithm=g,o._autoAllocateChunkSize=w,o._pendingPullIntos=new Y,n._readableStreamController=o;const P=a();D(T(P),()=>{o._started=!0,Be(o);},B=>{te(o,B);});}u$1(Cn,"SetUpReadableByteStreamController");function vo(n,o,a){const p=Object.create(ge.prototype);let g=u$1(()=>{},"startAlgorithm"),_=u$1(()=>T(void 0),"pullAlgorithm"),w=u$1(()=>T(void 0),"cancelAlgorithm");o.start!==void 0&&(g=u$1(()=>o.start(p),"startAlgorithm")),o.pull!==void 0&&(_=u$1(()=>o.pull(p),"pullAlgorithm")),o.cancel!==void 0&&(w=u$1(B=>o.cancel(B),"cancelAlgorithm"));const P=o.autoAllocateChunkSize;if(P===0)throw new TypeError("autoAllocateChunkSize must be greater than 0");Cn(n,p,g,_,w,a,P);}u$1(vo,"SetUpReadableByteStreamControllerFromUnderlyingSource");function Eo(n,o,a){n._associatedReadableByteStreamController=o,n._view=a;}u$1(Eo,"SetUpReadableStreamBYOBRequest");function dr(n){return new TypeError(`ReadableStreamBYOBRequest.prototype.${n} can only be used on a ReadableStreamBYOBRequest`)}u$1(dr,"byobRequestBrandCheckException");function it(n){return new TypeError(`ReadableByteStreamController.prototype.${n} can only be used on a ReadableByteStreamController`)}u$1(it,"byteStreamControllerBrandCheckException");function Pn(n){return new We(n)}u$1(Pn,"AcquireReadableStreamBYOBReader");function vn(n,o){n._reader._readIntoRequests.push(o);}u$1(vn,"ReadableStreamAddReadIntoRequest");function Ao(n,o,a){const g=n._reader._readIntoRequests.shift();a?g._closeSteps(o):g._chunkSteps(o);}u$1(Ao,"ReadableStreamFulfillReadIntoRequest");function En(n){return n._reader._readIntoRequests.length}u$1(En,"ReadableStreamGetNumReadIntoRequests");function hr(n){const o=n._reader;return !(o===void 0||!ke(o))}u$1(hr,"ReadableStreamHasBYOBReader");const qr=class qr{constructor(o){if(de(o,1,"ReadableStreamBYOBReader"),or(o,"First parameter"),Te(o))throw new TypeError("This stream has already been locked for exclusive reading by another reader");if(!Ae(o._readableStreamController))throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");Zr(this,o),this._readIntoRequests=new Y;}get closed(){return ke(this)?this._closedPromise:v(Et("closed"))}cancel(o=void 0){return ke(this)?this._ownerReadableStream===void 0?v(Ue("cancel")):Kt(this,o):v(Et("cancel"))}read(o){if(!ke(this))return v(Et("read"));if(!ArrayBuffer.isView(o))return v(new TypeError("view must be an array buffer view"));if(o.byteLength===0)return v(new TypeError("view must have non-zero byteLength"));if(o.buffer.byteLength===0)return v(new TypeError("view's buffer must have non-zero byteLength"));if(St(o.buffer),this._ownerReadableStream===void 0)return v(Ue("read from"));let a,p;const g=F((w,P)=>{a=w,p=P;});return An(this,o,{_chunkSteps:w=>a({value:w,done:!1}),_closeSteps:w=>a({value:w,done:!0}),_errorSteps:w=>p(w)}),g}releaseLock(){if(!ke(this))throw Et("releaseLock");if(this._ownerReadableStream!==void 0){if(this._readIntoRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");fe(this);}}};u$1(qr,"ReadableStreamBYOBReader");let We=qr;Object.defineProperties(We.prototype,{cancel:{enumerable:!0},read:{enumerable:!0},releaseLock:{enumerable:!0},closed:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(We.prototype,b.toStringTag,{value:"ReadableStreamBYOBReader",configurable:!0});function ke(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_readIntoRequests")?!1:n instanceof We}u$1(ke,"IsReadableStreamBYOBReader");function An(n,o,a){const p=n._ownerReadableStream;p._disturbed=!0,p._state==="errored"?a._errorSteps(p._storedError):Ro(p._readableStreamController,o,a);}u$1(An,"ReadableStreamBYOBReaderRead");function Et(n){return new TypeError(`ReadableStreamBYOBReader.prototype.${n} can only be used on a ReadableStreamBYOBReader`)}u$1(Et,"byobReaderBrandCheckException");function st(n,o){const{highWaterMark:a}=n;if(a===void 0)return o;if(dn(a)||a<0)throw new RangeError("Invalid highWaterMark");return a}u$1(st,"ExtractHighWaterMark");function At(n){const{size:o}=n;return o||(()=>1)}u$1(At,"ExtractSizeAlgorithm");function Bt(n,o){ce(n,o);const a=n?.highWaterMark,p=n?.size;return {highWaterMark:a===void 0?void 0:nr(a),size:p===void 0?void 0:Bo(p,`${o} has member 'size' that`)}}u$1(Bt,"convertQueuingStrategy");function Bo(n,o){return ee(n,o),a=>nr(n(a))}u$1(Bo,"convertQueuingStrategySize");function Wo(n,o){ce(n,o);const a=n?.abort,p=n?.close,g=n?.start,_=n?.type,w=n?.write;return {abort:a===void 0?void 0:ko(a,n,`${o} has member 'abort' that`),close:p===void 0?void 0:Oo(p,n,`${o} has member 'close' that`),start:g===void 0?void 0:qo(g,n,`${o} has member 'start' that`),write:w===void 0?void 0:zo(w,n,`${o} has member 'write' that`),type:_}}u$1(Wo,"convertUnderlyingSink");function ko(n,o,a){return ee(n,a),p=>le(n,o,[p])}u$1(ko,"convertUnderlyingSinkAbortCallback");function Oo(n,o,a){return ee(n,a),()=>le(n,o,[])}u$1(Oo,"convertUnderlyingSinkCloseCallback");function qo(n,o,a){return ee(n,a),p=>Pe(n,o,[p])}u$1(qo,"convertUnderlyingSinkStartCallback");function zo(n,o,a){return ee(n,a),(p,g)=>le(n,o,[p,g])}u$1(zo,"convertUnderlyingSinkWriteCallback");function Bn(n,o){if(!Ne(n))throw new TypeError(`${o} is not a WritableStream.`)}u$1(Bn,"assertWritableStream");function Fo(n){if(typeof n!="object"||n===null)return !1;try{return typeof n.aborted=="boolean"}catch{return !1}}u$1(Fo,"isAbortSignal");const jo=typeof AbortController=="function";function Io(){if(jo)return new AbortController}u$1(Io,"createAbortController");const zr=class zr{constructor(o={},a={}){o===void 0?o=null:rn(o,"First parameter");const p=Bt(a,"Second parameter"),g=Wo(o,"First parameter");if(kn(this),g.type!==void 0)throw new RangeError("Invalid type is specified");const w=At(p),P=st(p,1);Ko(this,g,P,w);}get locked(){if(!Ne(this))throw zt("locked");return He(this)}abort(o=void 0){return Ne(this)?He(this)?v(new TypeError("Cannot abort a stream that already has a writer")):Wt(this,o):v(zt("abort"))}close(){return Ne(this)?He(this)?v(new TypeError("Cannot close a stream that already has a writer")):se(this)?v(new TypeError("Cannot close an already-closing stream")):On(this):v(zt("close"))}getWriter(){if(!Ne(this))throw zt("getWriter");return Wn(this)}};u$1(zr,"WritableStream");let Oe=zr;Object.defineProperties(Oe.prototype,{abort:{enumerable:!0},close:{enumerable:!0},getWriter:{enumerable:!0},locked:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(Oe.prototype,b.toStringTag,{value:"WritableStream",configurable:!0});function Wn(n){return new qe(n)}u$1(Wn,"AcquireWritableStreamDefaultWriter");function Lo(n,o,a,p,g=1,_=()=>1){const w=Object.create(Oe.prototype);kn(w);const P=Object.create(_e.prototype);return Ln(w,P,n,o,a,p,g,_),w}u$1(Lo,"CreateWritableStream");function kn(n){n._state="writable",n._storedError=void 0,n._writer=void 0,n._writableStreamController=void 0,n._writeRequests=new Y,n._inFlightWriteRequest=void 0,n._closeRequest=void 0,n._inFlightCloseRequest=void 0,n._pendingAbortRequest=void 0,n._backpressure=!1;}u$1(kn,"InitializeWritableStream");function Ne(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_writableStreamController")?!1:n instanceof Oe}u$1(Ne,"IsWritableStream");function He(n){return n._writer!==void 0}u$1(He,"IsWritableStreamLocked");function Wt(n,o){var a;if(n._state==="closed"||n._state==="errored")return T(void 0);n._writableStreamController._abortReason=o,(a=n._writableStreamController._abortController)===null||a===void 0||a.abort();const p=n._state;if(p==="closed"||p==="errored")return T(void 0);if(n._pendingAbortRequest!==void 0)return n._pendingAbortRequest._promise;let g=!1;p==="erroring"&&(g=!0,o=void 0);const _=F((w,P)=>{n._pendingAbortRequest={_promise:void 0,_resolve:w,_reject:P,_reason:o,_wasAlreadyErroring:g};});return n._pendingAbortRequest._promise=_,g||br(n,o),_}u$1(Wt,"WritableStreamAbort");function On(n){const o=n._state;if(o==="closed"||o==="errored")return v(new TypeError(`The stream (in ${o} state) is not in the writable state and cannot be closed`));const a=F((g,_)=>{const w={_resolve:g,_reject:_};n._closeRequest=w;}),p=n._writer;return p!==void 0&&n._backpressure&&o==="writable"&&Cr(p),Jo(n._writableStreamController),a}u$1(On,"WritableStreamClose");function $o(n){return F((a,p)=>{const g={_resolve:a,_reject:p};n._writeRequests.push(g);})}u$1($o,"WritableStreamAddWriteRequest");function pr(n,o){if(n._state==="writable"){br(n,o);return}mr(n);}u$1(pr,"WritableStreamDealWithRejection");function br(n,o){const a=n._writableStreamController;n._state="erroring",n._storedError=o;const p=n._writer;p!==void 0&&zn(p,o),!No(n)&&a._started&&mr(n);}u$1(br,"WritableStreamStartErroring");function mr(n){n._state="errored",n._writableStreamController[en]();const o=n._storedError;if(n._writeRequests.forEach(g=>{g._reject(o);}),n._writeRequests=new Y,n._pendingAbortRequest===void 0){kt(n);return}const a=n._pendingAbortRequest;if(n._pendingAbortRequest=void 0,a._wasAlreadyErroring){a._reject(o),kt(n);return}const p=n._writableStreamController[Xr](a._reason);D(p,()=>{a._resolve(),kt(n);},g=>{a._reject(g),kt(n);});}u$1(mr,"WritableStreamFinishErroring");function Do(n){n._inFlightWriteRequest._resolve(void 0),n._inFlightWriteRequest=void 0;}u$1(Do,"WritableStreamFinishInFlightWrite");function Mo(n,o){n._inFlightWriteRequest._reject(o),n._inFlightWriteRequest=void 0,pr(n,o);}u$1(Mo,"WritableStreamFinishInFlightWriteWithError");function Uo(n){n._inFlightCloseRequest._resolve(void 0),n._inFlightCloseRequest=void 0,n._state==="erroring"&&(n._storedError=void 0,n._pendingAbortRequest!==void 0&&(n._pendingAbortRequest._resolve(),n._pendingAbortRequest=void 0)),n._state="closed";const a=n._writer;a!==void 0&&Un(a);}u$1(Uo,"WritableStreamFinishInFlightClose");function xo(n,o){n._inFlightCloseRequest._reject(o),n._inFlightCloseRequest=void 0,n._pendingAbortRequest!==void 0&&(n._pendingAbortRequest._reject(o),n._pendingAbortRequest=void 0),pr(n,o);}u$1(xo,"WritableStreamFinishInFlightCloseWithError");function se(n){return !(n._closeRequest===void 0&&n._inFlightCloseRequest===void 0)}u$1(se,"WritableStreamCloseQueuedOrInFlight");function No(n){return !(n._inFlightWriteRequest===void 0&&n._inFlightCloseRequest===void 0)}u$1(No,"WritableStreamHasOperationMarkedInFlight");function Ho(n){n._inFlightCloseRequest=n._closeRequest,n._closeRequest=void 0;}u$1(Ho,"WritableStreamMarkCloseRequestInFlight");function Vo(n){n._inFlightWriteRequest=n._writeRequests.shift();}u$1(Vo,"WritableStreamMarkFirstWriteRequestInFlight");function kt(n){n._closeRequest!==void 0&&(n._closeRequest._reject(n._storedError),n._closeRequest=void 0);const o=n._writer;o!==void 0&&Rr(o,n._storedError);}u$1(kt,"WritableStreamRejectCloseAndClosedPromiseIfNeeded");function yr(n,o){const a=n._writer;a!==void 0&&o!==n._backpressure&&(o?ii(a):Cr(a)),n._backpressure=o;}u$1(yr,"WritableStreamUpdateBackpressure");const Fr=class Fr{constructor(o){if(de(o,1,"WritableStreamDefaultWriter"),Bn(o,"First parameter"),He(o))throw new TypeError("This stream has already been locked for exclusive writing by another writer");this._ownerWritableStream=o,o._writer=this;const a=o._state;if(a==="writable")!se(o)&&o._backpressure?jt(this):xn(this),Ft(this);else if(a==="erroring")Tr(this,o._storedError),Ft(this);else if(a==="closed")xn(this),ni(this);else {const p=o._storedError;Tr(this,p),Mn(this,p);}}get closed(){return ze(this)?this._closedPromise:v(Fe("closed"))}get desiredSize(){if(!ze(this))throw Fe("desiredSize");if(this._ownerWritableStream===void 0)throw at("desiredSize");return Zo(this)}get ready(){return ze(this)?this._readyPromise:v(Fe("ready"))}abort(o=void 0){return ze(this)?this._ownerWritableStream===void 0?v(at("abort")):Qo(this,o):v(Fe("abort"))}close(){if(!ze(this))return v(Fe("close"));const o=this._ownerWritableStream;return o===void 0?v(at("close")):se(o)?v(new TypeError("Cannot close an already-closing stream")):qn(this)}releaseLock(){if(!ze(this))throw Fe("releaseLock");this._ownerWritableStream!==void 0&&Fn(this);}write(o=void 0){return ze(this)?this._ownerWritableStream===void 0?v(at("write to")):jn(this,o):v(Fe("write"))}};u$1(Fr,"WritableStreamDefaultWriter");let qe=Fr;Object.defineProperties(qe.prototype,{abort:{enumerable:!0},close:{enumerable:!0},releaseLock:{enumerable:!0},write:{enumerable:!0},closed:{enumerable:!0},desiredSize:{enumerable:!0},ready:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(qe.prototype,b.toStringTag,{value:"WritableStreamDefaultWriter",configurable:!0});function ze(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_ownerWritableStream")?!1:n instanceof qe}u$1(ze,"IsWritableStreamDefaultWriter");function Qo(n,o){const a=n._ownerWritableStream;return Wt(a,o)}u$1(Qo,"WritableStreamDefaultWriterAbort");function qn(n){const o=n._ownerWritableStream;return On(o)}u$1(qn,"WritableStreamDefaultWriterClose");function Go(n){const o=n._ownerWritableStream,a=o._state;return se(o)||a==="closed"?T(void 0):a==="errored"?v(o._storedError):qn(n)}u$1(Go,"WritableStreamDefaultWriterCloseWithErrorPropagation");function Yo(n,o){n._closedPromiseState==="pending"?Rr(n,o):oi(n,o);}u$1(Yo,"WritableStreamDefaultWriterEnsureClosedPromiseRejected");function zn(n,o){n._readyPromiseState==="pending"?Nn(n,o):si(n,o);}u$1(zn,"WritableStreamDefaultWriterEnsureReadyPromiseRejected");function Zo(n){const o=n._ownerWritableStream,a=o._state;return a==="errored"||a==="erroring"?null:a==="closed"?0:$n(o._writableStreamController)}u$1(Zo,"WritableStreamDefaultWriterGetDesiredSize");function Fn(n){const o=n._ownerWritableStream,a=new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");zn(n,a),Yo(n,a),o._writer=void 0,n._ownerWritableStream=void 0;}u$1(Fn,"WritableStreamDefaultWriterRelease");function jn(n,o){const a=n._ownerWritableStream,p=a._writableStreamController,g=Xo(p,o);if(a!==n._ownerWritableStream)return v(at("write to"));const _=a._state;if(_==="errored")return v(a._storedError);if(se(a)||_==="closed")return v(new TypeError("The stream is closing or closed and cannot be written to"));if(_==="erroring")return v(a._storedError);const w=$o(a);return ei(p,o,g),w}u$1(jn,"WritableStreamDefaultWriterWrite");const In={},jr=class jr{constructor(){throw new TypeError("Illegal constructor")}get abortReason(){if(!gr(this))throw wr("abortReason");return this._abortReason}get signal(){if(!gr(this))throw wr("signal");if(this._abortController===void 0)throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");return this._abortController.signal}error(o=void 0){if(!gr(this))throw wr("error");this._controlledWritableStream._state==="writable"&&Dn(this,o);}[Xr](o){const a=this._abortAlgorithm(o);return Ot(this),a}[en](){ye(this);}};u$1(jr,"WritableStreamDefaultController");let _e=jr;Object.defineProperties(_e.prototype,{abortReason:{enumerable:!0},signal:{enumerable:!0},error:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(_e.prototype,b.toStringTag,{value:"WritableStreamDefaultController",configurable:!0});function gr(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_controlledWritableStream")?!1:n instanceof _e}u$1(gr,"IsWritableStreamDefaultController");function Ln(n,o,a,p,g,_,w,P){o._controlledWritableStream=n,n._writableStreamController=o,o._queue=void 0,o._queueTotalSize=void 0,ye(o),o._abortReason=void 0,o._abortController=Io(),o._started=!1,o._strategySizeAlgorithm=P,o._strategyHWM=w,o._writeAlgorithm=p,o._closeAlgorithm=g,o._abortAlgorithm=_;const B=Sr(o);yr(n,B);const k=a(),q=T(k);D(q,()=>{o._started=!0,qt(o);},z=>{o._started=!0,pr(n,z);});}u$1(Ln,"SetUpWritableStreamDefaultController");function Ko(n,o,a,p){const g=Object.create(_e.prototype);let _=u$1(()=>{},"startAlgorithm"),w=u$1(()=>T(void 0),"writeAlgorithm"),P=u$1(()=>T(void 0),"closeAlgorithm"),B=u$1(()=>T(void 0),"abortAlgorithm");o.start!==void 0&&(_=u$1(()=>o.start(g),"startAlgorithm")),o.write!==void 0&&(w=u$1(k=>o.write(k,g),"writeAlgorithm")),o.close!==void 0&&(P=u$1(()=>o.close(),"closeAlgorithm")),o.abort!==void 0&&(B=u$1(k=>o.abort(k),"abortAlgorithm")),Ln(n,g,_,w,P,B,a,p);}u$1(Ko,"SetUpWritableStreamDefaultControllerFromUnderlyingSink");function Ot(n){n._writeAlgorithm=void 0,n._closeAlgorithm=void 0,n._abortAlgorithm=void 0,n._strategySizeAlgorithm=void 0;}u$1(Ot,"WritableStreamDefaultControllerClearAlgorithms");function Jo(n){ar(n,In,0),qt(n);}u$1(Jo,"WritableStreamDefaultControllerClose");function Xo(n,o){try{return n._strategySizeAlgorithm(o)}catch(a){return _r(n,a),1}}u$1(Xo,"WritableStreamDefaultControllerGetChunkSize");function $n(n){return n._strategyHWM-n._queueTotalSize}u$1($n,"WritableStreamDefaultControllerGetDesiredSize");function ei(n,o,a){try{ar(n,o,a);}catch(g){_r(n,g);return}const p=n._controlledWritableStream;if(!se(p)&&p._state==="writable"){const g=Sr(n);yr(p,g);}qt(n);}u$1(ei,"WritableStreamDefaultControllerWrite");function qt(n){const o=n._controlledWritableStream;if(!n._started||o._inFlightWriteRequest!==void 0)return;if(o._state==="erroring"){mr(o);return}if(n._queue.length===0)return;const p=wo(n);p===In?ti(n):ri(n,p);}u$1(qt,"WritableStreamDefaultControllerAdvanceQueueIfNeeded");function _r(n,o){n._controlledWritableStream._state==="writable"&&Dn(n,o);}u$1(_r,"WritableStreamDefaultControllerErrorIfNeeded");function ti(n){const o=n._controlledWritableStream;Ho(o),sr(n);const a=n._closeAlgorithm();Ot(n),D(a,()=>{Uo(o);},p=>{xo(o,p);});}u$1(ti,"WritableStreamDefaultControllerProcessClose");function ri(n,o){const a=n._controlledWritableStream;Vo(a);const p=n._writeAlgorithm(o);D(p,()=>{Do(a);const g=a._state;if(sr(n),!se(a)&&g==="writable"){const _=Sr(n);yr(a,_);}qt(n);},g=>{a._state==="writable"&&Ot(n),Mo(a,g);});}u$1(ri,"WritableStreamDefaultControllerProcessWrite");function Sr(n){return $n(n)<=0}u$1(Sr,"WritableStreamDefaultControllerGetBackpressure");function Dn(n,o){const a=n._controlledWritableStream;Ot(n),br(a,o);}u$1(Dn,"WritableStreamDefaultControllerError");function zt(n){return new TypeError(`WritableStream.prototype.${n} can only be used on a WritableStream`)}u$1(zt,"streamBrandCheckException$2");function wr(n){return new TypeError(`WritableStreamDefaultController.prototype.${n} can only be used on a WritableStreamDefaultController`)}u$1(wr,"defaultControllerBrandCheckException$2");function Fe(n){return new TypeError(`WritableStreamDefaultWriter.prototype.${n} can only be used on a WritableStreamDefaultWriter`)}u$1(Fe,"defaultWriterBrandCheckException");function at(n){return new TypeError("Cannot "+n+" a stream using a released writer")}u$1(at,"defaultWriterLockException");function Ft(n){n._closedPromise=F((o,a)=>{n._closedPromise_resolve=o,n._closedPromise_reject=a,n._closedPromiseState="pending";});}u$1(Ft,"defaultWriterClosedPromiseInitialize");function Mn(n,o){Ft(n),Rr(n,o);}u$1(Mn,"defaultWriterClosedPromiseInitializeAsRejected");function ni(n){Ft(n),Un(n);}u$1(ni,"defaultWriterClosedPromiseInitializeAsResolved");function Rr(n,o){n._closedPromise_reject!==void 0&&(V(n._closedPromise),n._closedPromise_reject(o),n._closedPromise_resolve=void 0,n._closedPromise_reject=void 0,n._closedPromiseState="rejected");}u$1(Rr,"defaultWriterClosedPromiseReject");function oi(n,o){Mn(n,o);}u$1(oi,"defaultWriterClosedPromiseResetToRejected");function Un(n){n._closedPromise_resolve!==void 0&&(n._closedPromise_resolve(void 0),n._closedPromise_resolve=void 0,n._closedPromise_reject=void 0,n._closedPromiseState="resolved");}u$1(Un,"defaultWriterClosedPromiseResolve");function jt(n){n._readyPromise=F((o,a)=>{n._readyPromise_resolve=o,n._readyPromise_reject=a;}),n._readyPromiseState="pending";}u$1(jt,"defaultWriterReadyPromiseInitialize");function Tr(n,o){jt(n),Nn(n,o);}u$1(Tr,"defaultWriterReadyPromiseInitializeAsRejected");function xn(n){jt(n),Cr(n);}u$1(xn,"defaultWriterReadyPromiseInitializeAsResolved");function Nn(n,o){n._readyPromise_reject!==void 0&&(V(n._readyPromise),n._readyPromise_reject(o),n._readyPromise_resolve=void 0,n._readyPromise_reject=void 0,n._readyPromiseState="rejected");}u$1(Nn,"defaultWriterReadyPromiseReject");function ii(n){jt(n);}u$1(ii,"defaultWriterReadyPromiseReset");function si(n,o){Tr(n,o);}u$1(si,"defaultWriterReadyPromiseResetToRejected");function Cr(n){n._readyPromise_resolve!==void 0&&(n._readyPromise_resolve(void 0),n._readyPromise_resolve=void 0,n._readyPromise_reject=void 0,n._readyPromiseState="fulfilled");}u$1(Cr,"defaultWriterReadyPromiseResolve");const Hn=typeof DOMException<"u"?DOMException:void 0;function ai(n){if(!(typeof n=="function"||typeof n=="object"))return !1;try{return new n,!0}catch{return !1}}u$1(ai,"isDOMExceptionConstructor");function ui(){const n=u$1(function(a,p){this.message=a||"",this.name=p||"Error",Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor);},"DOMException");return n.prototype=Object.create(Error.prototype),Object.defineProperty(n.prototype,"constructor",{value:n,writable:!0,configurable:!0}),n}u$1(ui,"createDOMExceptionPolyfill");const li=ai(Hn)?Hn:ui();function Vn(n,o,a,p,g,_){const w=xe(n),P=Wn(o);n._disturbed=!0;let B=!1,k=T(void 0);return F((q,z)=>{let M;if(_!==void 0){if(M=u$1(()=>{const E=new li("Aborted","AbortError"),W=[];p||W.push(()=>o._state==="writable"?Wt(o,E):T(void 0)),g||W.push(()=>n._state==="readable"?re(n,E):T(void 0)),G(()=>Promise.all(W.map(I=>I())),!0,E);},"abortAlgorithm"),_.aborted){M();return}_.addEventListener("abort",M);}function ne(){return F((E,W)=>{function I(Z){Z?E():j(Ze(),I,W);}u$1(I,"next"),I(!1);})}u$1(ne,"pipeLoop");function Ze(){return B?T(!0):j(P._readyPromise,()=>F((E,W)=>{rt(w,{_chunkSteps:I=>{k=j(jn(P,I),void 0,y),E(!1);},_closeSteps:()=>E(!0),_errorSteps:W});}))}if(u$1(Ze,"pipeStep"),he(n,w._closedPromise,E=>{p?K(!0,E):G(()=>Wt(o,E),!0,E);}),he(o,P._closedPromise,E=>{g?K(!0,E):G(()=>re(n,E),!0,E);}),Q(n,w._closedPromise,()=>{a?K():G(()=>Go(P));}),se(o)||o._state==="closed"){const E=new TypeError("the destination writable stream closed before all data could be piped to it");g?K(!0,E):G(()=>re(n,E),!0,E);}V(ne());function Ce(){const E=k;return j(k,()=>E!==k?Ce():void 0)}u$1(Ce,"waitForWritesToFinish");function he(E,W,I){E._state==="errored"?I(E._storedError):tt(W,I);}u$1(he,"isOrBecomesErrored");function Q(E,W,I){E._state==="closed"?I():ie(W,I);}u$1(Q,"isOrBecomesClosed");function G(E,W,I){if(B)return;B=!0,o._state==="writable"&&!se(o)?ie(Ce(),Z):Z();function Z(){D(E(),()=>pe(W,I),Ke=>pe(!0,Ke));}u$1(Z,"doTheRest");}u$1(G,"shutdownWithAction");function K(E,W){B||(B=!0,o._state==="writable"&&!se(o)?ie(Ce(),()=>pe(E,W)):pe(E,W));}u$1(K,"shutdown");function pe(E,W){Fn(P),fe(w),_!==void 0&&_.removeEventListener("abort",M),E?z(W):q(void 0);}u$1(pe,"finalize");})}u$1(Vn,"ReadableStreamPipeTo");const Ir=class Ir{constructor(){throw new TypeError("Illegal constructor")}get desiredSize(){if(!It(this))throw Dt("desiredSize");return Pr(this)}close(){if(!It(this))throw Dt("close");if(!Ve(this))throw new TypeError("The stream is not in a state that permits close");lt(this);}enqueue(o=void 0){if(!It(this))throw Dt("enqueue");if(!Ve(this))throw new TypeError("The stream is not in a state that permits enqueue");return $t(this,o)}error(o=void 0){if(!It(this))throw Dt("error");we(this,o);}[er](o){ye(this);const a=this._cancelAlgorithm(o);return Lt(this),a}[tr](o){const a=this._controlledReadableStream;if(this._queue.length>0){const p=sr(this);this._closeRequested&&this._queue.length===0?(Lt(this),ft(a)):ut(this),o._chunkSteps(p);}else sn(a,o),ut(this);}};u$1(Ir,"ReadableStreamDefaultController");let Se=Ir;Object.defineProperties(Se.prototype,{close:{enumerable:!0},enqueue:{enumerable:!0},error:{enumerable:!0},desiredSize:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(Se.prototype,b.toStringTag,{value:"ReadableStreamDefaultController",configurable:!0});function It(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_controlledReadableStream")?!1:n instanceof Se}u$1(It,"IsReadableStreamDefaultController");function ut(n){if(!Qn(n))return;if(n._pulling){n._pullAgain=!0;return}n._pulling=!0;const a=n._pullAlgorithm();D(a,()=>{n._pulling=!1,n._pullAgain&&(n._pullAgain=!1,ut(n));},p=>{we(n,p);});}u$1(ut,"ReadableStreamDefaultControllerCallPullIfNeeded");function Qn(n){const o=n._controlledReadableStream;return !Ve(n)||!n._started?!1:!!(Te(o)&&yt(o)>0||Pr(n)>0)}u$1(Qn,"ReadableStreamDefaultControllerShouldCallPull");function Lt(n){n._pullAlgorithm=void 0,n._cancelAlgorithm=void 0,n._strategySizeAlgorithm=void 0;}u$1(Lt,"ReadableStreamDefaultControllerClearAlgorithms");function lt(n){if(!Ve(n))return;const o=n._controlledReadableStream;n._closeRequested=!0,n._queue.length===0&&(Lt(n),ft(o));}u$1(lt,"ReadableStreamDefaultControllerClose");function $t(n,o){if(!Ve(n))return;const a=n._controlledReadableStream;if(Te(a)&&yt(a)>0)ir(a,o,!1);else {let p;try{p=n._strategySizeAlgorithm(o);}catch(g){throw we(n,g),g}try{ar(n,o,p);}catch(g){throw we(n,g),g}}ut(n);}u$1($t,"ReadableStreamDefaultControllerEnqueue");function we(n,o){const a=n._controlledReadableStream;a._state==="readable"&&(ye(n),Lt(n),Kn(a,o));}u$1(we,"ReadableStreamDefaultControllerError");function Pr(n){const o=n._controlledReadableStream._state;return o==="errored"?null:o==="closed"?0:n._strategyHWM-n._queueTotalSize}u$1(Pr,"ReadableStreamDefaultControllerGetDesiredSize");function fi(n){return !Qn(n)}u$1(fi,"ReadableStreamDefaultControllerHasBackpressure");function Ve(n){const o=n._controlledReadableStream._state;return !n._closeRequested&&o==="readable"}u$1(Ve,"ReadableStreamDefaultControllerCanCloseOrEnqueue");function Gn(n,o,a,p,g,_,w){o._controlledReadableStream=n,o._queue=void 0,o._queueTotalSize=void 0,ye(o),o._started=!1,o._closeRequested=!1,o._pullAgain=!1,o._pulling=!1,o._strategySizeAlgorithm=w,o._strategyHWM=_,o._pullAlgorithm=p,o._cancelAlgorithm=g,n._readableStreamController=o;const P=a();D(T(P),()=>{o._started=!0,ut(o);},B=>{we(o,B);});}u$1(Gn,"SetUpReadableStreamDefaultController");function ci(n,o,a,p){const g=Object.create(Se.prototype);let _=u$1(()=>{},"startAlgorithm"),w=u$1(()=>T(void 0),"pullAlgorithm"),P=u$1(()=>T(void 0),"cancelAlgorithm");o.start!==void 0&&(_=u$1(()=>o.start(g),"startAlgorithm")),o.pull!==void 0&&(w=u$1(()=>o.pull(g),"pullAlgorithm")),o.cancel!==void 0&&(P=u$1(B=>o.cancel(B),"cancelAlgorithm")),Gn(n,g,_,w,P,a,p);}u$1(ci,"SetUpReadableStreamDefaultControllerFromUnderlyingSource");function Dt(n){return new TypeError(`ReadableStreamDefaultController.prototype.${n} can only be used on a ReadableStreamDefaultController`)}u$1(Dt,"defaultControllerBrandCheckException$1");function di(n,o){return Ae(n._readableStreamController)?pi(n):hi(n)}u$1(di,"ReadableStreamTee");function hi(n,o){const a=xe(n);let p=!1,g=!1,_=!1,w=!1,P,B,k,q,z;const M=F(Q=>{z=Q;});function ne(){return p?(g=!0,T(void 0)):(p=!0,rt(a,{_chunkSteps:G=>{U(()=>{g=!1;const K=G,pe=G;_||$t(k._readableStreamController,K),w||$t(q._readableStreamController,pe),p=!1,g&&ne();});},_closeSteps:()=>{p=!1,_||lt(k._readableStreamController),w||lt(q._readableStreamController),(!_||!w)&&z(void 0);},_errorSteps:()=>{p=!1;}}),T(void 0))}u$1(ne,"pullAlgorithm");function Ze(Q){if(_=!0,P=Q,w){const G=nt([P,B]),K=re(n,G);z(K);}return M}u$1(Ze,"cancel1Algorithm");function Ce(Q){if(w=!0,B=Q,_){const G=nt([P,B]),K=re(n,G);z(K);}return M}u$1(Ce,"cancel2Algorithm");function he(){}return u$1(he,"startAlgorithm"),k=vr(he,ne,Ze),q=vr(he,ne,Ce),tt(a._closedPromise,Q=>{we(k._readableStreamController,Q),we(q._readableStreamController,Q),(!_||!w)&&z(void 0);}),[k,q]}u$1(hi,"ReadableStreamDefaultTee");function pi(n){let o=xe(n),a=!1,p=!1,g=!1,_=!1,w=!1,P,B,k,q,z;const M=F(E=>{z=E;});function ne(E){tt(E._closedPromise,W=>{E===o&&(te(k._readableStreamController,W),te(q._readableStreamController,W),(!_||!w)&&z(void 0));});}u$1(ne,"forwardReaderError");function Ze(){ke(o)&&(fe(o),o=xe(n),ne(o)),rt(o,{_chunkSteps:W=>{U(()=>{p=!1,g=!1;const I=W;let Z=W;if(!_&&!w)try{Z=bn(W);}catch(Ke){te(k._readableStreamController,Ke),te(q._readableStreamController,Ke),z(re(n,Ke));return}_||Ct(k._readableStreamController,I),w||Ct(q._readableStreamController,Z),a=!1,p?he():g&&Q();});},_closeSteps:()=>{a=!1,_||ot(k._readableStreamController),w||ot(q._readableStreamController),k._readableStreamController._pendingPullIntos.length>0&&Pt(k._readableStreamController,0),q._readableStreamController._pendingPullIntos.length>0&&Pt(q._readableStreamController,0),(!_||!w)&&z(void 0);},_errorSteps:()=>{a=!1;}});}u$1(Ze,"pullWithDefaultReader");function Ce(E,W){me(o)&&(fe(o),o=Pn(n),ne(o));const I=W?q:k,Z=W?k:q;An(o,E,{_chunkSteps:Je=>{U(()=>{p=!1,g=!1;const Xe=W?w:_;if(W?_:w)Xe||vt(I._readableStreamController,Je);else {let fo;try{fo=bn(Je);}catch(xr){te(I._readableStreamController,xr),te(Z._readableStreamController,xr),z(re(n,xr));return}Xe||vt(I._readableStreamController,Je),Ct(Z._readableStreamController,fo);}a=!1,p?he():g&&Q();});},_closeSteps:Je=>{a=!1;const Xe=W?w:_,Vt=W?_:w;Xe||ot(I._readableStreamController),Vt||ot(Z._readableStreamController),Je!==void 0&&(Xe||vt(I._readableStreamController,Je),!Vt&&Z._readableStreamController._pendingPullIntos.length>0&&Pt(Z._readableStreamController,0)),(!Xe||!Vt)&&z(void 0);},_errorSteps:()=>{a=!1;}});}u$1(Ce,"pullWithBYOBReader");function he(){if(a)return p=!0,T(void 0);a=!0;const E=cr(k._readableStreamController);return E===null?Ze():Ce(E._view,!1),T(void 0)}u$1(he,"pull1Algorithm");function Q(){if(a)return g=!0,T(void 0);a=!0;const E=cr(q._readableStreamController);return E===null?Ze():Ce(E._view,!0),T(void 0)}u$1(Q,"pull2Algorithm");function G(E){if(_=!0,P=E,w){const W=nt([P,B]),I=re(n,W);z(I);}return M}u$1(G,"cancel1Algorithm");function K(E){if(w=!0,B=E,_){const W=nt([P,B]),I=re(n,W);z(I);}return M}u$1(K,"cancel2Algorithm");function pe(){}return u$1(pe,"startAlgorithm"),k=Zn(pe,he,G),q=Zn(pe,Q,K),ne(o),[k,q]}u$1(pi,"ReadableByteStreamTee");function bi(n,o){ce(n,o);const a=n,p=a?.autoAllocateChunkSize,g=a?.cancel,_=a?.pull,w=a?.start,P=a?.type;return {autoAllocateChunkSize:p===void 0?void 0:on(p,`${o} has member 'autoAllocateChunkSize' that`),cancel:g===void 0?void 0:mi(g,a,`${o} has member 'cancel' that`),pull:_===void 0?void 0:yi(_,a,`${o} has member 'pull' that`),start:w===void 0?void 0:gi(w,a,`${o} has member 'start' that`),type:P===void 0?void 0:_i(P,`${o} has member 'type' that`)}}u$1(bi,"convertUnderlyingDefaultOrByteSource");function mi(n,o,a){return ee(n,a),p=>le(n,o,[p])}u$1(mi,"convertUnderlyingSourceCancelCallback");function yi(n,o,a){return ee(n,a),p=>le(n,o,[p])}u$1(yi,"convertUnderlyingSourcePullCallback");function gi(n,o,a){return ee(n,a),p=>Pe(n,o,[p])}u$1(gi,"convertUnderlyingSourceStartCallback");function _i(n,o){if(n=`${n}`,n!=="bytes")throw new TypeError(`${o} '${n}' is not a valid enumeration value for ReadableStreamType`);return n}u$1(_i,"convertReadableStreamType");function Si(n,o){ce(n,o);const a=n?.mode;return {mode:a===void 0?void 0:wi(a,`${o} has member 'mode' that`)}}u$1(Si,"convertReaderOptions");function wi(n,o){if(n=`${n}`,n!=="byob")throw new TypeError(`${o} '${n}' is not a valid enumeration value for ReadableStreamReaderMode`);return n}u$1(wi,"convertReadableStreamReaderMode");function Ri(n,o){return ce(n,o),{preventCancel:!!n?.preventCancel}}u$1(Ri,"convertIteratorOptions");function Yn(n,o){ce(n,o);const a=n?.preventAbort,p=n?.preventCancel,g=n?.preventClose,_=n?.signal;return _!==void 0&&Ti(_,`${o} has member 'signal' that`),{preventAbort:!!a,preventCancel:!!p,preventClose:!!g,signal:_}}u$1(Yn,"convertPipeOptions");function Ti(n,o){if(!Fo(n))throw new TypeError(`${o} is not an AbortSignal.`)}u$1(Ti,"assertAbortSignal");function Ci(n,o){ce(n,o);const a=n?.readable;rr(a,"readable","ReadableWritablePair"),or(a,`${o} has member 'readable' that`);const p=n?.writable;return rr(p,"writable","ReadableWritablePair"),Bn(p,`${o} has member 'writable' that`),{readable:a,writable:p}}u$1(Ci,"convertReadableWritablePair");const Lr=class Lr{constructor(o={},a={}){o===void 0?o=null:rn(o,"First parameter");const p=Bt(a,"Second parameter"),g=bi(o,"First parameter");if(Er(this),g.type==="bytes"){if(p.size!==void 0)throw new RangeError("The strategy for a byte stream cannot have a size function");const _=st(p,0);vo(this,g,_);}else {const _=At(p),w=st(p,1);ci(this,g,w,_);}}get locked(){if(!Re(this))throw je("locked");return Te(this)}cancel(o=void 0){return Re(this)?Te(this)?v(new TypeError("Cannot cancel a stream that already has a reader")):re(this,o):v(je("cancel"))}getReader(o=void 0){if(!Re(this))throw je("getReader");return Si(o,"First parameter").mode===void 0?xe(this):Pn(this)}pipeThrough(o,a={}){if(!Re(this))throw je("pipeThrough");de(o,1,"pipeThrough");const p=Ci(o,"First parameter"),g=Yn(a,"Second parameter");if(Te(this))throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");if(He(p.writable))throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");const _=Vn(this,p.writable,g.preventClose,g.preventAbort,g.preventCancel,g.signal);return V(_),p.readable}pipeTo(o,a={}){if(!Re(this))return v(je("pipeTo"));if(o===void 0)return v("Parameter 1 is required in 'pipeTo'.");if(!Ne(o))return v(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));let p;try{p=Yn(a,"Second parameter");}catch(g){return v(g)}return Te(this)?v(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")):He(o)?v(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")):Vn(this,o,p.preventClose,p.preventAbort,p.preventCancel,p.signal)}tee(){if(!Re(this))throw je("tee");const o=di(this);return nt(o)}values(o=void 0){if(!Re(this))throw je("values");const a=Ri(o,"First parameter");return _o(this,a.preventCancel)}};u$1(Lr,"ReadableStream");let ae=Lr;Object.defineProperties(ae.prototype,{cancel:{enumerable:!0},getReader:{enumerable:!0},pipeThrough:{enumerable:!0},pipeTo:{enumerable:!0},tee:{enumerable:!0},values:{enumerable:!0},locked:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(ae.prototype,b.toStringTag,{value:"ReadableStream",configurable:!0}),typeof b.asyncIterator=="symbol"&&Object.defineProperty(ae.prototype,b.asyncIterator,{value:ae.prototype.values,writable:!0,configurable:!0});function vr(n,o,a,p=1,g=()=>1){const _=Object.create(ae.prototype);Er(_);const w=Object.create(Se.prototype);return Gn(_,w,n,o,a,p,g),_}u$1(vr,"CreateReadableStream");function Zn(n,o,a){const p=Object.create(ae.prototype);Er(p);const g=Object.create(ge.prototype);return Cn(p,g,n,o,a,0,void 0),p}u$1(Zn,"CreateReadableByteStream");function Er(n){n._state="readable",n._reader=void 0,n._storedError=void 0,n._disturbed=!1;}u$1(Er,"InitializeReadableStream");function Re(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_readableStreamController")?!1:n instanceof ae}u$1(Re,"IsReadableStream");function Te(n){return n._reader!==void 0}u$1(Te,"IsReadableStreamLocked");function re(n,o){if(n._disturbed=!0,n._state==="closed")return T(void 0);if(n._state==="errored")return v(n._storedError);ft(n);const a=n._reader;a!==void 0&&ke(a)&&(a._readIntoRequests.forEach(g=>{g._closeSteps(void 0);}),a._readIntoRequests=new Y);const p=n._readableStreamController[er](o);return $(p,y)}u$1(re,"ReadableStreamCancel");function ft(n){n._state="closed";const o=n._reader;o!==void 0&&(Jr(o),me(o)&&(o._readRequests.forEach(a=>{a._closeSteps();}),o._readRequests=new Y));}u$1(ft,"ReadableStreamClose");function Kn(n,o){n._state="errored",n._storedError=o;const a=n._reader;a!==void 0&&(Xt(a,o),me(a)?(a._readRequests.forEach(p=>{p._errorSteps(o);}),a._readRequests=new Y):(a._readIntoRequests.forEach(p=>{p._errorSteps(o);}),a._readIntoRequests=new Y));}u$1(Kn,"ReadableStreamError");function je(n){return new TypeError(`ReadableStream.prototype.${n} can only be used on a ReadableStream`)}u$1(je,"streamBrandCheckException$1");function Jn(n,o){ce(n,o);const a=n?.highWaterMark;return rr(a,"highWaterMark","QueuingStrategyInit"),{highWaterMark:nr(a)}}u$1(Jn,"convertQueuingStrategyInit");const Xn=u$1(n=>n.byteLength,"byteLengthSizeFunction");try{Object.defineProperty(Xn,"name",{value:"size",configurable:!0});}catch{}const $r=class $r{constructor(o){de(o,1,"ByteLengthQueuingStrategy"),o=Jn(o,"First parameter"),this._byteLengthQueuingStrategyHighWaterMark=o.highWaterMark;}get highWaterMark(){if(!to(this))throw eo("highWaterMark");return this._byteLengthQueuingStrategyHighWaterMark}get size(){if(!to(this))throw eo("size");return Xn}};u$1($r,"ByteLengthQueuingStrategy");let Qe=$r;Object.defineProperties(Qe.prototype,{highWaterMark:{enumerable:!0},size:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(Qe.prototype,b.toStringTag,{value:"ByteLengthQueuingStrategy",configurable:!0});function eo(n){return new TypeError(`ByteLengthQueuingStrategy.prototype.${n} can only be used on a ByteLengthQueuingStrategy`)}u$1(eo,"byteLengthBrandCheckException");function to(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_byteLengthQueuingStrategyHighWaterMark")?!1:n instanceof Qe}u$1(to,"IsByteLengthQueuingStrategy");const ro=u$1(()=>1,"countSizeFunction");try{Object.defineProperty(ro,"name",{value:"size",configurable:!0});}catch{}const Dr=class Dr{constructor(o){de(o,1,"CountQueuingStrategy"),o=Jn(o,"First parameter"),this._countQueuingStrategyHighWaterMark=o.highWaterMark;}get highWaterMark(){if(!oo(this))throw no("highWaterMark");return this._countQueuingStrategyHighWaterMark}get size(){if(!oo(this))throw no("size");return ro}};u$1(Dr,"CountQueuingStrategy");let Ge=Dr;Object.defineProperties(Ge.prototype,{highWaterMark:{enumerable:!0},size:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(Ge.prototype,b.toStringTag,{value:"CountQueuingStrategy",configurable:!0});function no(n){return new TypeError(`CountQueuingStrategy.prototype.${n} can only be used on a CountQueuingStrategy`)}u$1(no,"countBrandCheckException");function oo(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_countQueuingStrategyHighWaterMark")?!1:n instanceof Ge}u$1(oo,"IsCountQueuingStrategy");function Pi(n,o){ce(n,o);const a=n?.flush,p=n?.readableType,g=n?.start,_=n?.transform,w=n?.writableType;return {flush:a===void 0?void 0:vi(a,n,`${o} has member 'flush' that`),readableType:p,start:g===void 0?void 0:Ei(g,n,`${o} has member 'start' that`),transform:_===void 0?void 0:Ai(_,n,`${o} has member 'transform' that`),writableType:w}}u$1(Pi,"convertTransformer");function vi(n,o,a){return ee(n,a),p=>le(n,o,[p])}u$1(vi,"convertTransformerFlushCallback");function Ei(n,o,a){return ee(n,a),p=>Pe(n,o,[p])}u$1(Ei,"convertTransformerStartCallback");function Ai(n,o,a){return ee(n,a),(p,g)=>le(n,o,[p,g])}u$1(Ai,"convertTransformerTransformCallback");const Mr=class Mr{constructor(o={},a={},p={}){o===void 0&&(o=null);const g=Bt(a,"Second parameter"),_=Bt(p,"Third parameter"),w=Pi(o,"First parameter");if(w.readableType!==void 0)throw new RangeError("Invalid readableType specified");if(w.writableType!==void 0)throw new RangeError("Invalid writableType specified");const P=st(_,0),B=At(_),k=st(g,1),q=At(g);let z;const M=F(ne=>{z=ne;});Bi(this,M,k,q,P,B),ki(this,w),w.start!==void 0?z(w.start(this._transformStreamController)):z(void 0);}get readable(){if(!io(this))throw lo("readable");return this._readable}get writable(){if(!io(this))throw lo("writable");return this._writable}};u$1(Mr,"TransformStream");let Ye=Mr;Object.defineProperties(Ye.prototype,{readable:{enumerable:!0},writable:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(Ye.prototype,b.toStringTag,{value:"TransformStream",configurable:!0});function Bi(n,o,a,p,g,_){function w(){return o}u$1(w,"startAlgorithm");function P(M){return zi(n,M)}u$1(P,"writeAlgorithm");function B(M){return Fi(n,M)}u$1(B,"abortAlgorithm");function k(){return ji(n)}u$1(k,"closeAlgorithm"),n._writable=Lo(w,P,k,B,a,p);function q(){return Ii(n)}u$1(q,"pullAlgorithm");function z(M){return Ut(n,M),T(void 0)}u$1(z,"cancelAlgorithm"),n._readable=vr(w,q,z,g,_),n._backpressure=void 0,n._backpressureChangePromise=void 0,n._backpressureChangePromise_resolve=void 0,xt(n,!0),n._transformStreamController=void 0;}u$1(Bi,"InitializeTransformStream");function io(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_transformStreamController")?!1:n instanceof Ye}u$1(io,"IsTransformStream");function Mt(n,o){we(n._readable._readableStreamController,o),Ut(n,o);}u$1(Mt,"TransformStreamError");function Ut(n,o){so(n._transformStreamController),_r(n._writable._writableStreamController,o),n._backpressure&&xt(n,!1);}u$1(Ut,"TransformStreamErrorWritableAndUnblockWrite");function xt(n,o){n._backpressureChangePromise!==void 0&&n._backpressureChangePromise_resolve(),n._backpressureChangePromise=F(a=>{n._backpressureChangePromise_resolve=a;}),n._backpressure=o;}u$1(xt,"TransformStreamSetBackpressure");const Ur=class Ur{constructor(){throw new TypeError("Illegal constructor")}get desiredSize(){if(!Nt(this))throw Ht("desiredSize");const o=this._controlledTransformStream._readable._readableStreamController;return Pr(o)}enqueue(o=void 0){if(!Nt(this))throw Ht("enqueue");ao(this,o);}error(o=void 0){if(!Nt(this))throw Ht("error");Oi(this,o);}terminate(){if(!Nt(this))throw Ht("terminate");qi(this);}};u$1(Ur,"TransformStreamDefaultController");let Ie=Ur;Object.defineProperties(Ie.prototype,{enqueue:{enumerable:!0},error:{enumerable:!0},terminate:{enumerable:!0},desiredSize:{enumerable:!0}}),typeof b.toStringTag=="symbol"&&Object.defineProperty(Ie.prototype,b.toStringTag,{value:"TransformStreamDefaultController",configurable:!0});function Nt(n){return !C(n)||!Object.prototype.hasOwnProperty.call(n,"_controlledTransformStream")?!1:n instanceof Ie}u$1(Nt,"IsTransformStreamDefaultController");function Wi(n,o,a,p){o._controlledTransformStream=n,n._transformStreamController=o,o._transformAlgorithm=a,o._flushAlgorithm=p;}u$1(Wi,"SetUpTransformStreamDefaultController");function ki(n,o){const a=Object.create(Ie.prototype);let p=u$1(_=>{try{return ao(a,_),T(void 0)}catch(w){return v(w)}},"transformAlgorithm"),g=u$1(()=>T(void 0),"flushAlgorithm");o.transform!==void 0&&(p=u$1(_=>o.transform(_,a),"transformAlgorithm")),o.flush!==void 0&&(g=u$1(()=>o.flush(a),"flushAlgorithm")),Wi(n,a,p,g);}u$1(ki,"SetUpTransformStreamDefaultControllerFromTransformer");function so(n){n._transformAlgorithm=void 0,n._flushAlgorithm=void 0;}u$1(so,"TransformStreamDefaultControllerClearAlgorithms");function ao(n,o){const a=n._controlledTransformStream,p=a._readable._readableStreamController;if(!Ve(p))throw new TypeError("Readable side is not in a state that permits enqueue");try{$t(p,o);}catch(_){throw Ut(a,_),a._readable._storedError}fi(p)!==a._backpressure&&xt(a,!0);}u$1(ao,"TransformStreamDefaultControllerEnqueue");function Oi(n,o){Mt(n._controlledTransformStream,o);}u$1(Oi,"TransformStreamDefaultControllerError");function uo(n,o){const a=n._transformAlgorithm(o);return $(a,void 0,p=>{throw Mt(n._controlledTransformStream,p),p})}u$1(uo,"TransformStreamDefaultControllerPerformTransform");function qi(n){const o=n._controlledTransformStream,a=o._readable._readableStreamController;lt(a);const p=new TypeError("TransformStream terminated");Ut(o,p);}u$1(qi,"TransformStreamDefaultControllerTerminate");function zi(n,o){const a=n._transformStreamController;if(n._backpressure){const p=n._backpressureChangePromise;return $(p,()=>{const g=n._writable;if(g._state==="erroring")throw g._storedError;return uo(a,o)})}return uo(a,o)}u$1(zi,"TransformStreamDefaultSinkWriteAlgorithm");function Fi(n,o){return Mt(n,o),T(void 0)}u$1(Fi,"TransformStreamDefaultSinkAbortAlgorithm");function ji(n){const o=n._readable,a=n._transformStreamController,p=a._flushAlgorithm();return so(a),$(p,()=>{if(o._state==="errored")throw o._storedError;lt(o._readableStreamController);},g=>{throw Mt(n,g),o._storedError})}u$1(ji,"TransformStreamDefaultSinkCloseAlgorithm");function Ii(n){return xt(n,!1),n._backpressureChangePromise}u$1(Ii,"TransformStreamDefaultSourcePullAlgorithm");function Ht(n){return new TypeError(`TransformStreamDefaultController.prototype.${n} can only be used on a TransformStreamDefaultController`)}u$1(Ht,"defaultControllerBrandCheckException");function lo(n){return new TypeError(`TransformStream.prototype.${n} can only be used on a TransformStream`)}u$1(lo,"streamBrandCheckException"),d.ByteLengthQueuingStrategy=Qe,d.CountQueuingStrategy=Ge,d.ReadableByteStreamController=ge,d.ReadableStream=ae,d.ReadableStreamBYOBReader=We,d.ReadableStreamBYOBRequest=Ee,d.ReadableStreamDefaultController=Se,d.ReadableStreamDefaultReader=ve,d.TransformStream=Ye,d.TransformStreamDefaultController=Ie,d.WritableStream=Oe,d.WritableStreamDefaultController=_e,d.WritableStreamDefaultWriter=qe,Object.defineProperty(d,"__esModule",{value:!0});});}(ponyfill_es2018,ponyfill_es2018.exports)),ponyfill_es2018.exports}u$1(requirePonyfill_es2018,"requirePonyfill_es2018");const POOL_SIZE$1=65536;if(!globalThis.ReadableStream)try{const c=require("node:process"),{emitWarning:l}=c;try{c.emitWarning=()=>{},Object.assign(globalThis,require("node:stream/web")),c.emitWarning=l;}catch(d){throw c.emitWarning=l,d}}catch{Object.assign(globalThis,requirePonyfill_es2018());}try{const{Blob:c}=require("buffer");c&&!c.prototype.stream&&(c.prototype.stream=u$1(function(d){let b=0;const y=this;return new ReadableStream({type:"bytes",async pull(S){const C=await y.slice(b,Math.min(y.size,b+POOL_SIZE$1)).arrayBuffer();b+=C.byteLength,S.enqueue(new Uint8Array(C)),b===y.size&&S.close();}})},"name"));}catch{}/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */const POOL_SIZE=65536;async function*toIterator(c,l=!0){for(const d of c)if("stream"in d)yield*d.stream();else if(ArrayBuffer.isView(d))if(l){let b=d.byteOffset;const y=d.byteOffset+d.byteLength;for(;b!==y;){const S=Math.min(y-b,POOL_SIZE),R=d.buffer.slice(b,b+S);b+=R.byteLength,yield new Uint8Array(R);}}else yield d;else {let b=0,y=d;for(;b!==y.size;){const R=await y.slice(b,Math.min(y.size,b+POOL_SIZE)).arrayBuffer();b+=R.byteLength,yield new Uint8Array(R);}}}u$1(toIterator,"toIterator");const _Blob=(Me$1=class{constructor(l=[],d={}){ue$1(this,be$1,[]);ue$1(this,ct$1,"");ue$1(this,et$1,0);ue$1(this,Qt$1,"transparent");if(typeof l!="object"||l===null)throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");if(typeof l[Symbol.iterator]!="function")throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");if(typeof d!="object"&&typeof d!="function")throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");d===null&&(d={});const b=new TextEncoder;for(const S of l){let R;ArrayBuffer.isView(S)?R=new Uint8Array(S.buffer.slice(S.byteOffset,S.byteOffset+S.byteLength)):S instanceof ArrayBuffer?R=new Uint8Array(S.slice(0)):S instanceof Me$1?R=S:R=b.encode(`${S}`),J(this,et$1,L$1(this,et$1)+(ArrayBuffer.isView(R)?R.byteLength:R.size)),L$1(this,be$1).push(R);}J(this,Qt$1,`${d.endings===void 0?"transparent":d.endings}`);const y=d.type===void 0?"":String(d.type);J(this,ct$1,/^[\x20-\x7E]*$/.test(y)?y:"");}get size(){return L$1(this,et$1)}get type(){return L$1(this,ct$1)}async text(){const l=new TextDecoder;let d="";for await(const b of toIterator(L$1(this,be$1),!1))d+=l.decode(b,{stream:!0});return d+=l.decode(),d}async arrayBuffer(){const l=new Uint8Array(this.size);let d=0;for await(const b of toIterator(L$1(this,be$1),!1))l.set(b,d),d+=b.length;return l.buffer}stream(){const l=toIterator(L$1(this,be$1),!0);return new globalThis.ReadableStream({type:"bytes",async pull(d){const b=await l.next();b.done?d.close():d.enqueue(b.value);},async cancel(){await l.return();}})}slice(l=0,d=this.size,b=""){const{size:y}=this;let S=l<0?Math.max(y+l,0):Math.min(l,y),R=d<0?Math.max(y+d,0):Math.min(d,y);const C=Math.max(R-S,0),O=L$1(this,be$1),A=[];let N=0;for(const H of O){if(N>=C)break;const F=ArrayBuffer.isView(H)?H.byteLength:H.size;if(S&&F<=S)S-=F,R-=F;else {let T;ArrayBuffer.isView(H)?(T=H.subarray(S,Math.min(F,R)),N+=T.byteLength):(T=H.slice(S,Math.min(F,R)),N+=T.size),R-=F,A.push(T),S=0;}}const oe=new Me$1([],{type:String(b).toLowerCase()});return J(oe,et$1,C),J(oe,be$1,A),oe}get[Symbol.toStringTag](){return "Blob"}static[Symbol.hasInstance](l){return l&&typeof l=="object"&&typeof l.constructor=="function"&&(typeof l.stream=="function"||typeof l.arrayBuffer=="function")&&/^(Blob|File)$/.test(l[Symbol.toStringTag])}},be$1=new WeakMap,ct$1=new WeakMap,et$1=new WeakMap,Qt$1=new WeakMap,u$1(Me$1,"Blob"),Me$1);Object.defineProperties(_Blob.prototype,{size:{enumerable:!0},type:{enumerable:!0},slice:{enumerable:!0}});const Blob$3=_Blob,r$1=Blob$3,_File=(pt=class extends r$1{constructor(d,b,y={}){if(arguments.length<2)throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);super(d,y);ue$1(this,dt$1,0);ue$1(this,ht$1,"");y===null&&(y={});const S=y.lastModified===void 0?Date.now():Number(y.lastModified);Number.isNaN(S)||J(this,dt$1,S),J(this,ht$1,String(b));}get name(){return L$1(this,ht$1)}get lastModified(){return L$1(this,dt$1)}get[Symbol.toStringTag](){return "File"}static[Symbol.hasInstance](d){return !!d&&d instanceof r$1&&/^(File)$/.test(d[Symbol.toStringTag])}},dt$1=new WeakMap,ht$1=new WeakMap,u$1(pt,"File"),pt),File$1=_File,File$1$1=File$1;/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */var{toStringTag:t$1,iterator:i$2,hasInstance:h$1}=Symbol,r=Math.random,m="append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","),f=u$1((c,l,d)=>(c+="",/^(Blob|File)$/.test(l&&l[t$1])?[(d=d!==void 0?d+"":l[t$1]=="File"?l.name:"blob",c),l.name!==d||l[t$1]=="blob"?new File$1$1([l],d,l):l]:[c,l+""]),"f"),e$1=u$1((c,l)=>(l?c:c.replace(/\r?\n|\r/g,`\r
`)).replace(/\n/g,"%0A").replace(/\r/g,"%0D").replace(/"/g,"%22"),"e$1"),x=u$1((c,l,d)=>{if(l.length<d)throw new TypeError(`Failed to execute '${c}' on 'FormData': ${d} arguments required, but only ${l.length} present.`)},"x");const FormData$1=(bt$1=class{constructor(...l){ue$1(this,X,[]);if(l.length)throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.")}get[t$1](){return "FormData"}[i$2](){return this.entries()}static[h$1](l){return l&&typeof l=="object"&&l[t$1]==="FormData"&&!m.some(d=>typeof l[d]!="function")}append(...l){x("append",arguments,2),L$1(this,X).push(f(...l));}delete(l){x("delete",arguments,1),l+="",J(this,X,L$1(this,X).filter(([d])=>d!==l));}get(l){x("get",arguments,1),l+="";for(var d=L$1(this,X),b=d.length,y=0;y<b;y++)if(d[y][0]===l)return d[y][1];return null}getAll(l,d){return x("getAll",arguments,1),d=[],l+="",L$1(this,X).forEach(b=>b[0]===l&&d.push(b[1])),d}has(l){return x("has",arguments,1),l+="",L$1(this,X).some(d=>d[0]===l)}forEach(l,d){x("forEach",arguments,1);for(var[b,y]of this)l.call(d,y,b,this);}set(...l){x("set",arguments,2);var d=[],b=!0;l=f(...l),L$1(this,X).forEach(y=>{y[0]===l[0]?b&&(b=!d.push(l)):d.push(y);}),b&&d.push(l),J(this,X,d);}*entries(){yield*L$1(this,X);}*keys(){for(var[l]of this)yield l;}*values(){for(var[,l]of this)yield l;}},X=new WeakMap,u$1(bt$1,"FormData"),bt$1);function formDataToBlob(c,l=r$1){var d=`${r()}${r()}`.replace(/\./g,"").slice(-28).padStart(32,"-"),b=[],y=`--${d}\r
Content-Disposition: form-data; name="`;return c.forEach((S,R)=>typeof S=="string"?b.push(y+e$1(R)+`"\r
\r
${S.replace(/\r(?!\n)|(?<!\r)\n/g,`\r
`)}\r
`):b.push(y+e$1(R)+`"; filename="${e$1(S.name,1)}"\r
Content-Type: ${S.type||"application/octet-stream"}\r
\r
`,S,`\r
`)),b.push(`--${d}--`),new l(b,{type:"multipart/form-data; boundary="+d})}u$1(formDataToBlob,"formDataToBlob");const Nr=class Nr extends Error{constructor(l,d){super(l),Error.captureStackTrace(this,this.constructor),this.type=d;}get name(){return this.constructor.name}get[Symbol.toStringTag](){return this.constructor.name}};u$1(Nr,"FetchBaseError");let FetchBaseError=Nr;const Hr=class Hr extends FetchBaseError{constructor(l,d,b){super(l,d),b&&(this.code=this.errno=b.code,this.erroredSysCall=b.syscall);}};u$1(Hr,"FetchError");let FetchError=Hr;const NAME=Symbol.toStringTag,isURLSearchParameters=u$1(c=>typeof c=="object"&&typeof c.append=="function"&&typeof c.delete=="function"&&typeof c.get=="function"&&typeof c.getAll=="function"&&typeof c.has=="function"&&typeof c.set=="function"&&typeof c.sort=="function"&&c[NAME]==="URLSearchParams","isURLSearchParameters"),isBlob=u$1(c=>c&&typeof c=="object"&&typeof c.arrayBuffer=="function"&&typeof c.type=="string"&&typeof c.stream=="function"&&typeof c.constructor=="function"&&/^(Blob|File)$/.test(c[NAME]),"isBlob"),isAbortSignal=u$1(c=>typeof c=="object"&&(c[NAME]==="AbortSignal"||c[NAME]==="EventTarget"),"isAbortSignal"),isDomainOrSubdomain=u$1((c,l)=>{const d=new URL(l).hostname,b=new URL(c).hostname;return d===b||d.endsWith(`.${b}`)},"isDomainOrSubdomain"),isSameProtocol=u$1((c,l)=>{const d=new URL(l).protocol,b=new URL(c).protocol;return d===b},"isSameProtocol"),pipeline$2=require$$1$5.promisify(Stream__default$1.pipeline),INTERNALS$2=Symbol("Body internals"),Vr=class Vr{constructor(l,{size:d=0}={}){let b=null;l===null?l=null:isURLSearchParameters(l)?l=node_buffer.Buffer.from(l.toString()):isBlob(l)||node_buffer.Buffer.isBuffer(l)||(require$$1$5.types.isAnyArrayBuffer(l)?l=node_buffer.Buffer.from(l):ArrayBuffer.isView(l)?l=node_buffer.Buffer.from(l.buffer,l.byteOffset,l.byteLength):l instanceof Stream__default$1||(l instanceof FormData$1?(l=formDataToBlob(l),b=l.type.split("=")[1]):l=node_buffer.Buffer.from(String(l))));let y=l;node_buffer.Buffer.isBuffer(l)?y=Stream__default$1.Readable.from(l):isBlob(l)&&(y=Stream__default$1.Readable.from(l.stream())),this[INTERNALS$2]={body:l,stream:y,boundary:b,disturbed:!1,error:null},this.size=d,l instanceof Stream__default$1&&l.on("error",S=>{const R=S instanceof FetchBaseError?S:new FetchError(`Invalid response body while trying to fetch ${this.url}: ${S.message}`,"system",S);this[INTERNALS$2].error=R;});}get body(){return this[INTERNALS$2].stream}get bodyUsed(){return this[INTERNALS$2].disturbed}async arrayBuffer(){const{buffer:l,byteOffset:d,byteLength:b}=await consumeBody(this);return l.slice(d,d+b)}async formData(){const l=this.headers.get("content-type");if(l.startsWith("application/x-www-form-urlencoded")){const b=new FormData$1,y=new URLSearchParams(await this.text());for(const[S,R]of y)b.append(S,R);return b}const{toFormData:d}=await import('./multipart-parser.mjs').then(function (n) { return n.m; });return d(this.body,l)}async blob(){const l=this.headers&&this.headers.get("content-type")||this[INTERNALS$2].body&&this[INTERNALS$2].body.type||"",d=await this.arrayBuffer();return new r$1([d],{type:l})}async json(){const l=await this.text();return JSON.parse(l)}async text(){const l=await consumeBody(this);return new TextDecoder().decode(l)}buffer(){return consumeBody(this)}};u$1(Vr,"Body");let Body=Vr;Body.prototype.buffer=require$$1$5.deprecate(Body.prototype.buffer,"Please use 'response.arrayBuffer()' instead of 'response.buffer()'","node-fetch#buffer"),Object.defineProperties(Body.prototype,{body:{enumerable:!0},bodyUsed:{enumerable:!0},arrayBuffer:{enumerable:!0},blob:{enumerable:!0},json:{enumerable:!0},text:{enumerable:!0},data:{get:require$$1$5.deprecate(()=>{},"data doesn't exist, use json(), text(), arrayBuffer(), or body instead","https://github.com/node-fetch/node-fetch/issues/1000 (response)")}});async function consumeBody(c){if(c[INTERNALS$2].disturbed)throw new TypeError(`body used already for: ${c.url}`);if(c[INTERNALS$2].disturbed=!0,c[INTERNALS$2].error)throw c[INTERNALS$2].error;const{body:l}=c;if(l===null||!(l instanceof Stream__default$1))return node_buffer.Buffer.alloc(0);const d=[];let b=0;try{for await(const y of l){if(c.size>0&&b+y.length>c.size){const S=new FetchError(`content size at ${c.url} over limit: ${c.size}`,"max-size");throw l.destroy(S),S}b+=y.length,d.push(y);}}catch(y){throw y instanceof FetchBaseError?y:new FetchError(`Invalid response body while trying to fetch ${c.url}: ${y.message}`,"system",y)}if(l.readableEnded===!0||l._readableState.ended===!0)try{return d.every(y=>typeof y=="string")?node_buffer.Buffer.from(d.join("")):node_buffer.Buffer.concat(d,b)}catch(y){throw new FetchError(`Could not create Buffer from response body for ${c.url}: ${y.message}`,"system",y)}else throw new FetchError(`Premature close of server response while trying to fetch ${c.url}`)}u$1(consumeBody,"consumeBody");const clone=u$1((c,l)=>{let d,b,{body:y}=c[INTERNALS$2];if(c.bodyUsed)throw new Error("cannot clone body after it is used");return y instanceof Stream__default$1&&typeof y.getBoundary!="function"&&(d=new Stream$1.PassThrough({highWaterMark:l}),b=new Stream$1.PassThrough({highWaterMark:l}),y.pipe(d),y.pipe(b),c[INTERNALS$2].stream=d,y=b),y},"clone"),getNonSpecFormDataBoundary=require$$1$5.deprecate(c=>c.getBoundary(),"form-data doesn't follow the spec and requires special treatment. Use alternative package","https://github.com/node-fetch/node-fetch/issues/1167"),extractContentType=u$1((c,l)=>c===null?null:typeof c=="string"?"text/plain;charset=UTF-8":isURLSearchParameters(c)?"application/x-www-form-urlencoded;charset=UTF-8":isBlob(c)?c.type||null:node_buffer.Buffer.isBuffer(c)||require$$1$5.types.isAnyArrayBuffer(c)||ArrayBuffer.isView(c)?null:c instanceof FormData$1?`multipart/form-data; boundary=${l[INTERNALS$2].boundary}`:c&&typeof c.getBoundary=="function"?`multipart/form-data;boundary=${getNonSpecFormDataBoundary(c)}`:c instanceof Stream__default$1?null:"text/plain;charset=UTF-8","extractContentType"),getTotalBytes=u$1(c=>{const{body:l}=c[INTERNALS$2];return l===null?0:isBlob(l)?l.size:node_buffer.Buffer.isBuffer(l)?l.length:l&&typeof l.getLengthSync=="function"&&l.hasKnownLength&&l.hasKnownLength()?l.getLengthSync():null},"getTotalBytes"),writeToStream=u$1(async(c,{body:l})=>{l===null?c.end():await pipeline$2(l,c);},"writeToStream"),validateHeaderName=typeof http__default.validateHeaderName=="function"?http__default.validateHeaderName:c=>{if(!/^[\^`\-\w!#$%&'*+.|~]+$/.test(c)){const l=new TypeError(`Header name must be a valid HTTP token [${c}]`);throw Object.defineProperty(l,"code",{value:"ERR_INVALID_HTTP_TOKEN"}),l}},validateHeaderValue=typeof http__default.validateHeaderValue=="function"?http__default.validateHeaderValue:(c,l)=>{if(/[^\t\u0020-\u007E\u0080-\u00FF]/.test(l)){const d=new TypeError(`Invalid character in header content ["${c}"]`);throw Object.defineProperty(d,"code",{value:"ERR_INVALID_CHAR"}),d}},Gt$1=class Gt extends URLSearchParams{constructor(l){let d=[];if(l instanceof Gt){const b=l.raw();for(const[y,S]of Object.entries(b))d.push(...S.map(R=>[y,R]));}else if(l!=null)if(typeof l=="object"&&!require$$1$5.types.isBoxedPrimitive(l)){const b=l[Symbol.iterator];if(b==null)d.push(...Object.entries(l));else {if(typeof b!="function")throw new TypeError("Header pairs must be iterable");d=[...l].map(y=>{if(typeof y!="object"||require$$1$5.types.isBoxedPrimitive(y))throw new TypeError("Each header pair must be an iterable object");return [...y]}).map(y=>{if(y.length!==2)throw new TypeError("Each header pair must be a name/value tuple");return [...y]});}}else throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");return d=d.length>0?d.map(([b,y])=>(validateHeaderName(b),validateHeaderValue(b,String(y)),[String(b).toLowerCase(),String(y)])):void 0,super(d),new Proxy(this,{get(b,y,S){switch(y){case"append":case"set":return (R,C)=>(validateHeaderName(R),validateHeaderValue(R,String(C)),URLSearchParams.prototype[y].call(b,String(R).toLowerCase(),String(C)));case"delete":case"has":case"getAll":return R=>(validateHeaderName(R),URLSearchParams.prototype[y].call(b,String(R).toLowerCase()));case"keys":return ()=>(b.sort(),new Set(URLSearchParams.prototype.keys.call(b)).keys());default:return Reflect.get(b,y,S)}}})}get[Symbol.toStringTag](){return this.constructor.name}toString(){return Object.prototype.toString.call(this)}get(l){const d=this.getAll(l);if(d.length===0)return null;let b=d.join(", ");return /^content-encoding$/i.test(l)&&(b=b.toLowerCase()),b}forEach(l,d=void 0){for(const b of this.keys())Reflect.apply(l,d,[this.get(b),b,this]);}*values(){for(const l of this.keys())yield this.get(l);}*entries(){for(const l of this.keys())yield [l,this.get(l)];}[Symbol.iterator](){return this.entries()}raw(){return [...this.keys()].reduce((l,d)=>(l[d]=this.getAll(d),l),{})}[Symbol.for("nodejs.util.inspect.custom")](){return [...this.keys()].reduce((l,d)=>{const b=this.getAll(d);return d==="host"?l[d]=b[0]:l[d]=b.length>1?b:b[0],l},{})}};u$1(Gt$1,"Headers");let Headers$1=Gt$1;Object.defineProperties(Headers$1.prototype,["get","entries","forEach","values"].reduce((c,l)=>(c[l]={enumerable:!0},c),{}));function fromRawHeaders(c=[]){return new Headers$1(c.reduce((l,d,b,y)=>(b%2===0&&l.push(y.slice(b,b+2)),l),[]).filter(([l,d])=>{try{return validateHeaderName(l),validateHeaderValue(l,String(d)),!0}catch{return !1}}))}u$1(fromRawHeaders,"fromRawHeaders");const redirectStatus=new Set([301,302,303,307,308]),isRedirect=u$1(c=>redirectStatus.has(c),"isRedirect"),INTERNALS$1=Symbol("Response internals"),Le$1=class Le extends Body{constructor(l=null,d={}){super(l,d);const b=d.status!=null?d.status:200,y=new Headers$1(d.headers);if(l!==null&&!y.has("Content-Type")){const S=extractContentType(l,this);S&&y.append("Content-Type",S);}this[INTERNALS$1]={type:"default",url:d.url,status:b,statusText:d.statusText||"",headers:y,counter:d.counter,highWaterMark:d.highWaterMark};}get type(){return this[INTERNALS$1].type}get url(){return this[INTERNALS$1].url||""}get status(){return this[INTERNALS$1].status}get ok(){return this[INTERNALS$1].status>=200&&this[INTERNALS$1].status<300}get redirected(){return this[INTERNALS$1].counter>0}get statusText(){return this[INTERNALS$1].statusText}get headers(){return this[INTERNALS$1].headers}get highWaterMark(){return this[INTERNALS$1].highWaterMark}clone(){return new Le(clone(this,this.highWaterMark),{type:this.type,url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected,size:this.size,highWaterMark:this.highWaterMark})}static redirect(l,d=302){if(!isRedirect(d))throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');return new Le(null,{headers:{location:new URL(l).toString()},status:d})}static error(){const l=new Le(null,{status:0,statusText:""});return l[INTERNALS$1].type="error",l}static json(l=void 0,d={}){const b=JSON.stringify(l);if(b===void 0)throw new TypeError("data is not JSON serializable");const y=new Headers$1(d&&d.headers);return y.has("content-type")||y.set("content-type","application/json"),new Le(b,{...d,headers:y})}get[Symbol.toStringTag](){return "Response"}};u$1(Le$1,"Response");let Response$1=Le$1;Object.defineProperties(Response$1.prototype,{type:{enumerable:!0},url:{enumerable:!0},status:{enumerable:!0},ok:{enumerable:!0},redirected:{enumerable:!0},statusText:{enumerable:!0},headers:{enumerable:!0},clone:{enumerable:!0}});const getSearch=u$1(c=>{if(c.search)return c.search;const l=c.href.length-1,d=c.hash||(c.href[l]==="#"?"#":"");return c.href[l-d.length]==="?"?"?":""},"getSearch");function stripURLForUseAsAReferrer(c,l=!1){return c==null||(c=new URL(c),/^(about|blob|data):$/.test(c.protocol))?"no-referrer":(c.username="",c.password="",c.hash="",l&&(c.pathname="",c.search=""),c)}u$1(stripURLForUseAsAReferrer,"stripURLForUseAsAReferrer");const ReferrerPolicy=new Set(["","no-referrer","no-referrer-when-downgrade","same-origin","origin","strict-origin","origin-when-cross-origin","strict-origin-when-cross-origin","unsafe-url"]),DEFAULT_REFERRER_POLICY="strict-origin-when-cross-origin";function validateReferrerPolicy(c){if(!ReferrerPolicy.has(c))throw new TypeError(`Invalid referrerPolicy: ${c}`);return c}u$1(validateReferrerPolicy,"validateReferrerPolicy");function isOriginPotentiallyTrustworthy(c){if(/^(http|ws)s:$/.test(c.protocol))return !0;const l=c.host.replace(/(^\[)|(]$)/g,""),d=node_net.isIP(l);return d===4&&/^127\./.test(l)||d===6&&/^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(l)?!0:c.host==="localhost"||c.host.endsWith(".localhost")?!1:c.protocol==="file:"}u$1(isOriginPotentiallyTrustworthy,"isOriginPotentiallyTrustworthy");function isUrlPotentiallyTrustworthy(c){return /^about:(blank|srcdoc)$/.test(c)||c.protocol==="data:"||/^(blob|filesystem):$/.test(c.protocol)?!0:isOriginPotentiallyTrustworthy(c)}u$1(isUrlPotentiallyTrustworthy,"isUrlPotentiallyTrustworthy");function determineRequestsReferrer(c,{referrerURLCallback:l,referrerOriginCallback:d}={}){if(c.referrer==="no-referrer"||c.referrerPolicy==="")return null;const b=c.referrerPolicy;if(c.referrer==="about:client")return "no-referrer";const y=c.referrer;let S=stripURLForUseAsAReferrer(y),R=stripURLForUseAsAReferrer(y,!0);S.toString().length>4096&&(S=R),l&&(S=l(S)),d&&(R=d(R));const C=new URL(c.url);switch(b){case"no-referrer":return "no-referrer";case"origin":return R;case"unsafe-url":return S;case"strict-origin":return isUrlPotentiallyTrustworthy(S)&&!isUrlPotentiallyTrustworthy(C)?"no-referrer":R.toString();case"strict-origin-when-cross-origin":return S.origin===C.origin?S:isUrlPotentiallyTrustworthy(S)&&!isUrlPotentiallyTrustworthy(C)?"no-referrer":R;case"same-origin":return S.origin===C.origin?S:"no-referrer";case"origin-when-cross-origin":return S.origin===C.origin?S:R;case"no-referrer-when-downgrade":return isUrlPotentiallyTrustworthy(S)&&!isUrlPotentiallyTrustworthy(C)?"no-referrer":S;default:throw new TypeError(`Invalid referrerPolicy: ${b}`)}}u$1(determineRequestsReferrer,"determineRequestsReferrer");function parseReferrerPolicyFromHeader(c){const l=(c.get("referrer-policy")||"").split(/[,\s]+/);let d="";for(const b of l)b&&ReferrerPolicy.has(b)&&(d=b);return d}u$1(parseReferrerPolicyFromHeader,"parseReferrerPolicyFromHeader");const INTERNALS=Symbol("Request internals"),isRequest=u$1(c=>typeof c=="object"&&typeof c[INTERNALS]=="object","isRequest"),doBadDataWarn=require$$1$5.deprecate(()=>{},".data is not a valid RequestInit property, use .body instead","https://github.com/node-fetch/node-fetch/issues/1000 (request)"),Yt=class Yt extends Body{constructor(l,d={}){let b;if(isRequest(l)?b=new URL(l.url):(b=new URL(l),l={}),b.username!==""||b.password!=="")throw new TypeError(`${b} is an url with embedded credentials.`);let y=d.method||l.method||"GET";if(/^(delete|get|head|options|post|put)$/i.test(y)&&(y=y.toUpperCase()),!isRequest(d)&&"data"in d&&doBadDataWarn(),(d.body!=null||isRequest(l)&&l.body!==null)&&(y==="GET"||y==="HEAD"))throw new TypeError("Request with GET/HEAD method cannot have body");const S=d.body?d.body:isRequest(l)&&l.body!==null?clone(l):null;super(S,{size:d.size||l.size||0});const R=new Headers$1(d.headers||l.headers||{});if(S!==null&&!R.has("Content-Type")){const A=extractContentType(S,this);A&&R.set("Content-Type",A);}let C=isRequest(l)?l.signal:null;if("signal"in d&&(C=d.signal),C!=null&&!isAbortSignal(C))throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");let O=d.referrer==null?l.referrer:d.referrer;if(O==="")O="no-referrer";else if(O){const A=new URL(O);O=/^about:(\/\/)?client$/.test(A)?"client":A;}else O=void 0;this[INTERNALS]={method:y,redirect:d.redirect||l.redirect||"follow",headers:R,parsedURL:b,signal:C,referrer:O},this.follow=d.follow===void 0?l.follow===void 0?20:l.follow:d.follow,this.compress=d.compress===void 0?l.compress===void 0?!0:l.compress:d.compress,this.counter=d.counter||l.counter||0,this.agent=d.agent||l.agent,this.highWaterMark=d.highWaterMark||l.highWaterMark||16384,this.insecureHTTPParser=d.insecureHTTPParser||l.insecureHTTPParser||!1,this.referrerPolicy=d.referrerPolicy||l.referrerPolicy||"";}get method(){return this[INTERNALS].method}get url(){return node_url$1.format(this[INTERNALS].parsedURL)}get headers(){return this[INTERNALS].headers}get redirect(){return this[INTERNALS].redirect}get signal(){return this[INTERNALS].signal}get referrer(){if(this[INTERNALS].referrer==="no-referrer")return "";if(this[INTERNALS].referrer==="client")return "about:client";if(this[INTERNALS].referrer)return this[INTERNALS].referrer.toString()}get referrerPolicy(){return this[INTERNALS].referrerPolicy}set referrerPolicy(l){this[INTERNALS].referrerPolicy=validateReferrerPolicy(l);}clone(){return new Yt(this)}get[Symbol.toStringTag](){return "Request"}};u$1(Yt,"Request");let Request$3=Yt;Object.defineProperties(Request$3.prototype,{method:{enumerable:!0},url:{enumerable:!0},headers:{enumerable:!0},redirect:{enumerable:!0},clone:{enumerable:!0},signal:{enumerable:!0},referrer:{enumerable:!0},referrerPolicy:{enumerable:!0}});const getNodeRequestOptions=u$1(c=>{const{parsedURL:l}=c[INTERNALS],d=new Headers$1(c[INTERNALS].headers);d.has("Accept")||d.set("Accept","*/*");let b=null;if(c.body===null&&/^(post|put)$/i.test(c.method)&&(b="0"),c.body!==null){const C=getTotalBytes(c);typeof C=="number"&&!Number.isNaN(C)&&(b=String(C));}b&&d.set("Content-Length",b),c.referrerPolicy===""&&(c.referrerPolicy=DEFAULT_REFERRER_POLICY),c.referrer&&c.referrer!=="no-referrer"?c[INTERNALS].referrer=determineRequestsReferrer(c):c[INTERNALS].referrer="no-referrer",c[INTERNALS].referrer instanceof URL&&d.set("Referer",c.referrer),d.has("User-Agent")||d.set("User-Agent","node-fetch"),c.compress&&!d.has("Accept-Encoding")&&d.set("Accept-Encoding","gzip, deflate, br");let{agent:y}=c;typeof y=="function"&&(y=y(l));const S=getSearch(l),R={path:l.pathname+S,method:c.method,headers:d[Symbol.for("nodejs.util.inspect.custom")](),insecureHTTPParser:c.insecureHTTPParser,agent:y};return {parsedURL:l,options:R}},"getNodeRequestOptions"),Qr=class Qr extends FetchBaseError{constructor(l,d="aborted"){super(l,d);}};u$1(Qr,"AbortError");let AbortError$2=Qr;/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */if(!globalThis.DOMException)try{const{MessageChannel:c}=require("worker_threads"),l=new c().port1,d=new ArrayBuffer;l.postMessage(d,[d,d]);}catch(c){c.constructor.name==="DOMException"&&(globalThis.DOMException=c.constructor);}var nodeDomexception=globalThis.DOMException;const DOMException$1=_commonjsHelpers$1.getDefaultExportFromCjs(nodeDomexception),{stat}=node_fs.promises,blobFromSync=u$1((c,l)=>fromBlob(node_fs.statSync(c),c,l),"blobFromSync"),blobFrom=u$1((c,l)=>stat(c).then(d=>fromBlob(d,c,l)),"blobFrom"),fileFrom=u$1((c,l)=>stat(c).then(d=>fromFile(d,c,l)),"fileFrom"),fileFromSync=u$1((c,l)=>fromFile(node_fs.statSync(c),c,l),"fileFromSync"),fromBlob=u$1((c,l,d="")=>new r$1([new BlobDataItem({path:l,size:c.size,lastModified:c.mtimeMs,start:0})],{type:d}),"fromBlob"),fromFile=u$1((c,l,d="")=>new File$1$1([new BlobDataItem({path:l,size:c.size,lastModified:c.mtimeMs,start:0})],node_path.basename(l),{type:d,lastModified:c.mtimeMs}),"fromFile"),Zt=class Zt{constructor(l){ue$1(this,$e,void 0);ue$1(this,De$1,void 0);J(this,$e,l.path),J(this,De$1,l.start),this.size=l.size,this.lastModified=l.lastModified;}slice(l,d){return new Zt({path:L$1(this,$e),lastModified:this.lastModified,size:d-l,start:L$1(this,De$1)+l})}async*stream(){const{mtimeMs:l}=await stat(L$1(this,$e));if(l>this.lastModified)throw new DOMException$1("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.","NotReadableError");yield*node_fs.createReadStream(L$1(this,$e),{start:L$1(this,De$1),end:L$1(this,De$1)+this.size-1});}get[Symbol.toStringTag](){return "Blob"}};$e=new WeakMap,De$1=new WeakMap,u$1(Zt,"BlobDataItem");let BlobDataItem=Zt;const supportedSchemas=new Set(["data:","http:","https:"]);async function fetch$1$1(c,l){return new Promise((d,b)=>{const y=new Request$3(c,l),{parsedURL:S,options:R}=getNodeRequestOptions(y);if(!supportedSchemas.has(S.protocol))throw new TypeError(`node-fetch cannot load ${c}. URL scheme "${S.protocol.replace(/:$/,"")}" is not supported.`);if(S.protocol==="data:"){const T=dataUriToBuffer(y.url),v=new Response$1(T,{headers:{"Content-Type":T.typeFull}});d(v);return}const C=(S.protocol==="https:"?https__default:http__default).request,{signal:O}=y;let A=null;const N=u$1(()=>{const T=new AbortError$2("The operation was aborted.");b(T),y.body&&y.body instanceof Stream__default$1.Readable&&y.body.destroy(T),!(!A||!A.body)&&A.body.emit("error",T);},"abort");if(O&&O.aborted){N();return}const oe=u$1(()=>{N(),F();},"abortAndFinalize"),H=C(S.toString(),R);O&&O.addEventListener("abort",oe);const F=u$1(()=>{H.abort(),O&&O.removeEventListener("abort",oe);},"finalize");H.on("error",T=>{b(new FetchError(`request to ${y.url} failed, reason: ${T.message}`,"system",T)),F();}),fixResponseChunkedTransferBadEnding(H,T=>{A&&A.body&&A.body.destroy(T);}),process.version<"v14"&&H.on("socket",T=>{let v;T.prependListener("end",()=>{v=T._eventsCount;}),T.prependListener("close",j=>{if(A&&v<T._eventsCount&&!j){const D=new Error("Premature close");D.code="ERR_STREAM_PREMATURE_CLOSE",A.body.emit("error",D);}});}),H.on("response",T=>{H.setTimeout(0);const v=fromRawHeaders(T.rawHeaders);if(isRedirect(T.statusCode)){const $=v.get("Location");let V=null;try{V=$===null?null:new URL($,y.url);}catch{if(y.redirect!=="manual"){b(new FetchError(`uri requested responds with an invalid redirect URL: ${$}`,"invalid-redirect")),F();return}}switch(y.redirect){case"error":b(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${y.url}`,"no-redirect")),F();return;case"manual":break;case"follow":{if(V===null)break;if(y.counter>=y.follow){b(new FetchError(`maximum redirect reached at: ${y.url}`,"max-redirect")),F();return}const U={headers:new Headers$1(y.headers),follow:y.follow,counter:y.counter+1,agent:y.agent,compress:y.compress,method:y.method,body:clone(y),signal:y.signal,size:y.size,referrer:y.referrer,referrerPolicy:y.referrerPolicy};if(!isDomainOrSubdomain(y.url,V)||!isSameProtocol(y.url,V))for(const le of ["authorization","www-authenticate","cookie","cookie2"])U.headers.delete(le);if(T.statusCode!==303&&y.body&&l.body instanceof Stream__default$1.Readable){b(new FetchError("Cannot follow redirect with body being a readable stream","unsupported-redirect")),F();return}(T.statusCode===303||(T.statusCode===301||T.statusCode===302)&&y.method==="POST")&&(U.method="GET",U.body=void 0,U.headers.delete("content-length"));const Pe=parseReferrerPolicyFromHeader(v);Pe&&(U.referrerPolicy=Pe),d(fetch$1$1(new Request$3(V,U))),F();return}default:return b(new TypeError(`Redirect option '${y.redirect}' is not a valid value of RequestRedirect`))}}O&&T.once("end",()=>{O.removeEventListener("abort",oe);});let j=Stream$1.pipeline(T,new Stream$1.PassThrough,$=>{$&&b($);});process.version<"v12.10"&&T.on("aborted",oe);const D={url:y.url,status:T.statusCode,statusText:T.statusMessage,headers:v,size:y.size,counter:y.counter,highWaterMark:y.highWaterMark},ie=v.get("Content-Encoding");if(!y.compress||y.method==="HEAD"||ie===null||T.statusCode===204||T.statusCode===304){A=new Response$1(j,D),d(A);return}const tt={flush:zlib__default.Z_SYNC_FLUSH,finishFlush:zlib__default.Z_SYNC_FLUSH};if(ie==="gzip"||ie==="x-gzip"){j=Stream$1.pipeline(j,zlib__default.createGunzip(tt),$=>{$&&b($);}),A=new Response$1(j,D),d(A);return}if(ie==="deflate"||ie==="x-deflate"){const $=Stream$1.pipeline(T,new Stream$1.PassThrough,V=>{V&&b(V);});$.once("data",V=>{(V[0]&15)===8?j=Stream$1.pipeline(j,zlib__default.createInflate(),U=>{U&&b(U);}):j=Stream$1.pipeline(j,zlib__default.createInflateRaw(),U=>{U&&b(U);}),A=new Response$1(j,D),d(A);}),$.once("end",()=>{A||(A=new Response$1(j,D),d(A));});return}if(ie==="br"){j=Stream$1.pipeline(j,zlib__default.createBrotliDecompress(),$=>{$&&b($);}),A=new Response$1(j,D),d(A);return}A=new Response$1(j,D),d(A);}),writeToStream(H,y).catch(b);})}u$1(fetch$1$1,"fetch$1");function fixResponseChunkedTransferBadEnding(c,l){const d=node_buffer.Buffer.from(`0\r
\r
`);let b=!1,y=!1,S;c.on("response",R=>{const{headers:C}=R;b=C["transfer-encoding"]==="chunked"&&!C["content-length"];}),c.on("socket",R=>{const C=u$1(()=>{if(b&&!y){const A=new Error("Premature close");A.code="ERR_STREAM_PREMATURE_CLOSE",l(A);}},"onSocketClose"),O=u$1(A=>{y=node_buffer.Buffer.compare(A.slice(-5),d)===0,!y&&S&&(y=node_buffer.Buffer.compare(S.slice(-3),d.slice(0,3))===0&&node_buffer.Buffer.compare(A.slice(-2),d.slice(3))===0),S=A;},"onData");R.prependListener("close",C),R.on("data",O),c.on("close",()=>{R.removeListener("close",C),R.removeListener("data",O);});});}u$1(fixResponseChunkedTransferBadEnding,"fixResponseChunkedTransferBadEnding");const privateData=new WeakMap,wrappers=new WeakMap;function pd(c){const l=privateData.get(c);return console.assert(l!=null,"'this' is expected an Event object, but got",c),l}u$1(pd,"pd");function setCancelFlag(c){if(c.passiveListener!=null){typeof console<"u"&&typeof console.error=="function"&&console.error("Unable to preventDefault inside passive event listener invocation.",c.passiveListener);return}c.event.cancelable&&(c.canceled=!0,typeof c.event.preventDefault=="function"&&c.event.preventDefault());}u$1(setCancelFlag,"setCancelFlag");function Event$1(c,l){privateData.set(this,{eventTarget:c,event:l,eventPhase:2,currentTarget:c,canceled:!1,stopped:!1,immediateStopped:!1,passiveListener:null,timeStamp:l.timeStamp||Date.now()}),Object.defineProperty(this,"isTrusted",{value:!1,enumerable:!0});const d=Object.keys(l);for(let b=0;b<d.length;++b){const y=d[b];y in this||Object.defineProperty(this,y,defineRedirectDescriptor(y));}}u$1(Event$1,"Event"),Event$1.prototype={get type(){return pd(this).event.type},get target(){return pd(this).eventTarget},get currentTarget(){return pd(this).currentTarget},composedPath(){const c=pd(this).currentTarget;return c==null?[]:[c]},get NONE(){return 0},get CAPTURING_PHASE(){return 1},get AT_TARGET(){return 2},get BUBBLING_PHASE(){return 3},get eventPhase(){return pd(this).eventPhase},stopPropagation(){const c=pd(this);c.stopped=!0,typeof c.event.stopPropagation=="function"&&c.event.stopPropagation();},stopImmediatePropagation(){const c=pd(this);c.stopped=!0,c.immediateStopped=!0,typeof c.event.stopImmediatePropagation=="function"&&c.event.stopImmediatePropagation();},get bubbles(){return !!pd(this).event.bubbles},get cancelable(){return !!pd(this).event.cancelable},preventDefault(){setCancelFlag(pd(this));},get defaultPrevented(){return pd(this).canceled},get composed(){return !!pd(this).event.composed},get timeStamp(){return pd(this).timeStamp},get srcElement(){return pd(this).eventTarget},get cancelBubble(){return pd(this).stopped},set cancelBubble(c){if(!c)return;const l=pd(this);l.stopped=!0,typeof l.event.cancelBubble=="boolean"&&(l.event.cancelBubble=!0);},get returnValue(){return !pd(this).canceled},set returnValue(c){c||setCancelFlag(pd(this));},initEvent(){}},Object.defineProperty(Event$1.prototype,"constructor",{value:Event$1,configurable:!0,writable:!0}),typeof window<"u"&&typeof window.Event<"u"&&(Object.setPrototypeOf(Event$1.prototype,window.Event.prototype),wrappers.set(window.Event.prototype,Event$1));function defineRedirectDescriptor(c){return {get(){return pd(this).event[c]},set(l){pd(this).event[c]=l;},configurable:!0,enumerable:!0}}u$1(defineRedirectDescriptor,"defineRedirectDescriptor");function defineCallDescriptor(c){return {value(){const l=pd(this).event;return l[c].apply(l,arguments)},configurable:!0,enumerable:!0}}u$1(defineCallDescriptor,"defineCallDescriptor");function defineWrapper(c,l){const d=Object.keys(l);if(d.length===0)return c;function b(y,S){c.call(this,y,S);}u$1(b,"CustomEvent"),b.prototype=Object.create(c.prototype,{constructor:{value:b,configurable:!0,writable:!0}});for(let y=0;y<d.length;++y){const S=d[y];if(!(S in c.prototype)){const C=typeof Object.getOwnPropertyDescriptor(l,S).value=="function";Object.defineProperty(b.prototype,S,C?defineCallDescriptor(S):defineRedirectDescriptor(S));}}return b}u$1(defineWrapper,"defineWrapper");function getWrapper(c){if(c==null||c===Object.prototype)return Event$1;let l=wrappers.get(c);return l==null&&(l=defineWrapper(getWrapper(Object.getPrototypeOf(c)),c),wrappers.set(c,l)),l}u$1(getWrapper,"getWrapper");function wrapEvent(c,l){const d=getWrapper(Object.getPrototypeOf(l));return new d(c,l)}u$1(wrapEvent,"wrapEvent");function isStopped(c){return pd(c).immediateStopped}u$1(isStopped,"isStopped");function setEventPhase(c,l){pd(c).eventPhase=l;}u$1(setEventPhase,"setEventPhase");function setCurrentTarget(c,l){pd(c).currentTarget=l;}u$1(setCurrentTarget,"setCurrentTarget");function setPassiveListener(c,l){pd(c).passiveListener=l;}u$1(setPassiveListener,"setPassiveListener");const listenersMap=new WeakMap,CAPTURE=1,BUBBLE=2,ATTRIBUTE=3;function isObject(c){return c!==null&&typeof c=="object"}u$1(isObject,"isObject");function getListeners(c){const l=listenersMap.get(c);if(l==null)throw new TypeError("'this' is expected an EventTarget object, but got another value.");return l}u$1(getListeners,"getListeners");function defineEventAttributeDescriptor(c){return {get(){let d=getListeners(this).get(c);for(;d!=null;){if(d.listenerType===ATTRIBUTE)return d.listener;d=d.next;}return null},set(l){typeof l!="function"&&!isObject(l)&&(l=null);const d=getListeners(this);let b=null,y=d.get(c);for(;y!=null;)y.listenerType===ATTRIBUTE?b!==null?b.next=y.next:y.next!==null?d.set(c,y.next):d.delete(c):b=y,y=y.next;if(l!==null){const S={listener:l,listenerType:ATTRIBUTE,passive:!1,once:!1,next:null};b===null?d.set(c,S):b.next=S;}},configurable:!0,enumerable:!0}}u$1(defineEventAttributeDescriptor,"defineEventAttributeDescriptor");function defineEventAttribute(c,l){Object.defineProperty(c,`on${l}`,defineEventAttributeDescriptor(l));}u$1(defineEventAttribute,"defineEventAttribute");function defineCustomEventTarget(c){function l(){EventTarget$1.call(this);}u$1(l,"CustomEventTarget"),l.prototype=Object.create(EventTarget$1.prototype,{constructor:{value:l,configurable:!0,writable:!0}});for(let d=0;d<c.length;++d)defineEventAttribute(l.prototype,c[d]);return l}u$1(defineCustomEventTarget,"defineCustomEventTarget");function EventTarget$1(){if(this instanceof EventTarget$1){listenersMap.set(this,new Map);return}if(arguments.length===1&&Array.isArray(arguments[0]))return defineCustomEventTarget(arguments[0]);if(arguments.length>0){const c=new Array(arguments.length);for(let l=0;l<arguments.length;++l)c[l]=arguments[l];return defineCustomEventTarget(c)}throw new TypeError("Cannot call a class as a function")}u$1(EventTarget$1,"EventTarget"),EventTarget$1.prototype={addEventListener(c,l,d){if(l==null)return;if(typeof l!="function"&&!isObject(l))throw new TypeError("'listener' should be a function or an object.");const b=getListeners(this),y=isObject(d),R=(y?!!d.capture:!!d)?CAPTURE:BUBBLE,C={listener:l,listenerType:R,passive:y&&!!d.passive,once:y&&!!d.once,next:null};let O=b.get(c);if(O===void 0){b.set(c,C);return}let A=null;for(;O!=null;){if(O.listener===l&&O.listenerType===R)return;A=O,O=O.next;}A.next=C;},removeEventListener(c,l,d){if(l==null)return;const b=getListeners(this),S=(isObject(d)?!!d.capture:!!d)?CAPTURE:BUBBLE;let R=null,C=b.get(c);for(;C!=null;){if(C.listener===l&&C.listenerType===S){R!==null?R.next=C.next:C.next!==null?b.set(c,C.next):b.delete(c);return}R=C,C=C.next;}},dispatchEvent(c){if(c==null||typeof c.type!="string")throw new TypeError('"event.type" should be a string.');const l=getListeners(this),d=c.type;let b=l.get(d);if(b==null)return !0;const y=wrapEvent(this,c);let S=null;for(;b!=null;){if(b.once?S!==null?S.next=b.next:b.next!==null?l.set(d,b.next):l.delete(d):S=b,setPassiveListener(y,b.passive?b.listener:null),typeof b.listener=="function")try{b.listener.call(this,y);}catch(R){typeof console<"u"&&typeof console.error=="function"&&console.error(R);}else b.listenerType!==ATTRIBUTE&&typeof b.listener.handleEvent=="function"&&b.listener.handleEvent(y);if(isStopped(y))break;b=b.next;}return setPassiveListener(y,null),setEventPhase(y,0),setCurrentTarget(y,null),!y.defaultPrevented}},Object.defineProperty(EventTarget$1.prototype,"constructor",{value:EventTarget$1,configurable:!0,writable:!0}),typeof window<"u"&&typeof window.EventTarget<"u"&&Object.setPrototypeOf(EventTarget$1.prototype,window.EventTarget.prototype);const Gr=class Gr extends EventTarget$1{constructor(){throw super(),new TypeError("AbortSignal cannot be constructed directly")}get aborted(){const l=abortedFlags.get(this);if(typeof l!="boolean")throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this===null?"null":typeof this}`);return l}};u$1(Gr,"AbortSignal");let AbortSignal$1=Gr;defineEventAttribute(AbortSignal$1.prototype,"abort");function createAbortSignal(){const c=Object.create(AbortSignal$1.prototype);return EventTarget$1.call(c),abortedFlags.set(c,!1),c}u$1(createAbortSignal,"createAbortSignal");function abortSignal$1(c){abortedFlags.get(c)===!1&&(abortedFlags.set(c,!0),c.dispatchEvent({type:"abort"}));}u$1(abortSignal$1,"abortSignal");const abortedFlags=new WeakMap;Object.defineProperties(AbortSignal$1.prototype,{aborted:{enumerable:!0}}),typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(AbortSignal$1.prototype,Symbol.toStringTag,{configurable:!0,value:"AbortSignal"});let AbortController$1$1=(mt=class{constructor(){signals.set(this,createAbortSignal());}get signal(){return getSignal(this)}abort(){abortSignal$1(getSignal(this));}},u$1(mt,"AbortController"),mt);const signals=new WeakMap;function getSignal(c){const l=signals.get(c);if(l==null)throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${c===null?"null":typeof c}`);return l}u$1(getSignal,"getSignal"),Object.defineProperties(AbortController$1$1.prototype,{signal:{enumerable:!0},abort:{enumerable:!0}}),typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(AbortController$1$1.prototype,Symbol.toStringTag,{configurable:!0,value:"AbortController"});var t=Object.defineProperty,e$2=u$1((c,l)=>t(c,"name",{value:l,configurable:!0}),"e");const fetch$3=fetch$1$1;s$2();function s$2(){!globalThis.process?.versions?.node&&!globalThis.process?.env.DISABLE_NODE_FETCH_NATIVE_WARN&&console.warn("[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.");}u$1(s$2,"s"),e$2(s$2,"checkNodeEnvironment"),node$2.AbortController=AbortController$1$1,node$2.AbortError=AbortError$2,node$2.Blob=r$1,node$2.FetchError=FetchError,node$2.File=File$1$1,node$2.FormData=FormData$1,node$2.Headers=Headers$1,node$2.Request=Request$3,node$2.Response=Response$1,node$2.blobFrom=blobFrom,node$2.blobFromSync=blobFromSync,node$2.default=fetch$3,node$2.fetch=fetch$3,node$2.fileFrom=fileFrom,node$2.fileFromSync=fileFromSync,node$2.isRedirect=isRedirect;

var i$1=Object.defineProperty;var l=(r,t)=>i$1(r,"name",{value:t,configurable:!0});Object.defineProperty(dist$3,"__esModule",{value:!0});const node$1=node$2;var s$1=Object.defineProperty,e=l((r,t)=>s$1(r,"name",{value:t,configurable:!0}),"e");const o=!!globalThis.process?.env?.FORCE_NODE_FETCH;function p(){return !o&&globalThis.fetch?globalThis.fetch:node$1.fetch}l(p,"p"),e(p,"_getFetch");const fetch$2=p(),Blob$2=!o&&globalThis.Blob||node$1.Blob,File=!o&&globalThis.File||node$1.File,FormData=!o&&globalThis.FormData||node$1.FormData,Headers=!o&&globalThis.Headers||node$1.Headers,Request$2=!o&&globalThis.Request||node$1.Request,Response=!o&&globalThis.Response||node$1.Response,AbortController$1=!o&&globalThis.AbortController||node$1.AbortController;dist$3.AbortError=node$1.AbortError,dist$3.FetchError=node$1.FetchError,dist$3.blobFrom=node$1.blobFrom,dist$3.blobFromSync=node$1.blobFromSync,dist$3.fileFrom=node$1.fileFrom,dist$3.fileFromSync=node$1.fileFromSync,dist$3.isRedirect=node$1.isRedirect,dist$3.AbortController=AbortController$1,dist$3.Blob=Blob$2,dist$3.File=File,dist$3.FormData=FormData,dist$3.Headers=Headers,dist$3.Request=Request$2,dist$3.Response=Response,dist$3.default=fetch$2,dist$3.fetch=fetch$2;

const nodeFetch = dist$3;

function fetch$1(input, options) {
  return nodeFetch.fetch(input, options);
}

for (const key in nodeFetch) {
  fetch$1[key] = nodeFetch[key];
}

var lib = fetch$1;

var fetch_2;
var bt=Object.defineProperty;var Gt=(e,A,t)=>A in e?bt(e,A,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[A]=t;var Q=(e,A)=>bt(e,"name",{value:A,configurable:!0});var se=(e,A,t)=>(Gt(e,typeof A!="symbol"?A+"":A,t),t),et=(e,A,t)=>{if(!A.has(e))throw TypeError("Cannot "+t)};var _=(e,A,t)=>(et(e,A,"read from private field"),t?t.call(e):A.get(e)),vA=(e,A,t)=>{if(A.has(e))throw TypeError("Cannot add the same private member more than once");A instanceof WeakSet?A.add(e):A.set(e,t);},pA=(e,A,t,r)=>(et(e,A,"write to private field"),r?r.call(e,t):A.set(e,t),t);var jA=(e,A,t)=>(et(e,A,"access private method"),t);var Be,Ie,ae,ce,he,le,ue,de,fe,ye,De,Re,we,pe,ke,Fe,Ne,be,Se,oe,me,Ue,Le,Me,Ye,Je,Ge,xe,Te,He,Ve,ve,ge,We,qe,Oe,Pe;const http$2=require$$0$f,https$1=require$$2$4,node_url=require$$8$1,require$$0=require$$0$b,require$$0$2=require$$12,require$$2=require$$13,require$$0$1=require$$0$9,require$$6=require$$1$6,require$$0$3=require$$0$d,require$$8=require$$17,Stream=require$$4$1,require$$1=require$$6$1,require$$0$4=require$$20,require$$2$1=require$$4$2,require$$5=require$$22,require$$0$5=require$$0$8,_commonjsHelpers=nodeFetchNative_61758d11,require$$1$1=require$$25,require$$4=require$$26;const require$$1$2=require$$7,require$$3=require$$0$a,require$$5$1=require$$2$3,require$$2$2=require$$31,require$$0$6=require$$32,require$$1$3=require$$33,require$$1$4=require$$0$g,require$$0$7=require$$2$5,nodeFetchNative=lib;function _interopDefaultCompat(e){return e&&typeof e=="object"&&"default"in e?e.default:e}Q(_interopDefaultCompat,"_interopDefaultCompat");function _interopNamespaceCompat(e){if(e&&typeof e=="object"&&"default"in e)return e;const A=Object.create(null);if(e)for(const t in e)A[t]=e[t];return A.default=e,A}Q(_interopNamespaceCompat,"_interopNamespaceCompat");const http__namespace=_interopNamespaceCompat(http$2),https__namespace=_interopNamespaceCompat(https$1),require$$0__default=_interopDefaultCompat(require$$0),require$$0__default$2=_interopDefaultCompat(require$$0$2),require$$2__default=_interopDefaultCompat(require$$2),require$$0__default$1=_interopDefaultCompat(require$$0$1),require$$6__default=_interopDefaultCompat(require$$6),require$$0__default$3=_interopDefaultCompat(require$$0$3),require$$8__default=_interopDefaultCompat(require$$8),Stream__default=_interopDefaultCompat(Stream),require$$1__default=_interopDefaultCompat(require$$1),require$$0__default$4=_interopDefaultCompat(require$$0$4),require$$2__default$1=_interopDefaultCompat(require$$2$1),require$$5__default=_interopDefaultCompat(require$$5),require$$0__default$5=_interopDefaultCompat(require$$0$5),require$$1__default$1=_interopDefaultCompat(require$$1$1),require$$4__default=_interopDefaultCompat(require$$4),require$$1__default$2=_interopDefaultCompat(require$$1$2),require$$3__default=_interopDefaultCompat(require$$3),require$$5__default$1=_interopDefaultCompat(require$$5$1),require$$2__default$2=_interopDefaultCompat(require$$2$2),require$$0__default$6=_interopDefaultCompat(require$$0$6),require$$1__default$3=_interopDefaultCompat(require$$1$3),require$$1__default$4=_interopDefaultCompat(require$$1$4),require$$0__default$7=_interopDefaultCompat(require$$0$7);var symbols$4={kClose:Symbol("close"),kDestroy:Symbol("destroy"),kDispatch:Symbol("dispatch"),kUrl:Symbol("url"),kWriting:Symbol("writing"),kResuming:Symbol("resuming"),kQueue:Symbol("queue"),kConnect:Symbol("connect"),kConnecting:Symbol("connecting"),kHeadersList:Symbol("headers list"),kKeepAliveDefaultTimeout:Symbol("default keep alive timeout"),kKeepAliveMaxTimeout:Symbol("max keep alive timeout"),kKeepAliveTimeoutThreshold:Symbol("keep alive timeout threshold"),kKeepAliveTimeoutValue:Symbol("keep alive timeout"),kKeepAlive:Symbol("keep alive"),kHeadersTimeout:Symbol("headers timeout"),kBodyTimeout:Symbol("body timeout"),kServerName:Symbol("server name"),kLocalAddress:Symbol("local address"),kHost:Symbol("host"),kNoRef:Symbol("no ref"),kBodyUsed:Symbol("used"),kRunning:Symbol("running"),kBlocking:Symbol("blocking"),kPending:Symbol("pending"),kSize:Symbol("size"),kBusy:Symbol("busy"),kQueued:Symbol("queued"),kFree:Symbol("free"),kConnected:Symbol("connected"),kClosed:Symbol("closed"),kNeedDrain:Symbol("need drain"),kReset:Symbol("reset"),kDestroyed:Symbol.for("nodejs.stream.destroyed"),kMaxHeadersSize:Symbol("max headers size"),kRunningIdx:Symbol("running index"),kPendingIdx:Symbol("pending index"),kError:Symbol("error"),kClients:Symbol("clients"),kClient:Symbol("client"),kParser:Symbol("parser"),kOnDestroyed:Symbol("destroy callbacks"),kPipelining:Symbol("pipelining"),kSocket:Symbol("socket"),kHostHeader:Symbol("host header"),kConnector:Symbol("connector"),kStrictContentLength:Symbol("strict content length"),kMaxRedirections:Symbol("maxRedirections"),kMaxRequests:Symbol("maxRequestsPerClient"),kProxy:Symbol("proxy agent options"),kCounter:Symbol("socket request counter"),kInterceptors:Symbol("dispatch interceptors"),kMaxResponseSize:Symbol("max response size"),kHTTP2Session:Symbol("http2Session"),kHTTP2SessionState:Symbol("http2Session state"),kHTTP2BuildRequest:Symbol("http2 build request"),kHTTP1BuildRequest:Symbol("http1 build request"),kHTTP2CopyHeaders:Symbol("http2 copy headers"),kHTTPConnVersion:Symbol("http connection version"),kRetryHandlerDefaultRetry:Symbol("retry agent default retry"),kConstruct:Symbol("constructable")};let UndiciError$1=(Be=class extends Error{constructor(A){super(A),this.name="UndiciError",this.code="UND_ERR";}},Q(Be,"UndiciError"),Be),ConnectTimeoutError$1=(Ie=class extends UndiciError$1{constructor(A){super(A),this.name="ConnectTimeoutError",this.message=A||"Connect Timeout Error",this.code="UND_ERR_CONNECT_TIMEOUT";}},Q(Ie,"ConnectTimeoutError"),Ie),HeadersTimeoutError$1=(ae=class extends UndiciError$1{constructor(A){super(A),this.name="HeadersTimeoutError",this.message=A||"Headers Timeout Error",this.code="UND_ERR_HEADERS_TIMEOUT";}},Q(ae,"HeadersTimeoutError"),ae),HeadersOverflowError$1=(ce=class extends UndiciError$1{constructor(A){super(A),this.name="HeadersOverflowError",this.message=A||"Headers Overflow Error",this.code="UND_ERR_HEADERS_OVERFLOW";}},Q(ce,"HeadersOverflowError"),ce),BodyTimeoutError$1=(he=class extends UndiciError$1{constructor(A){super(A),this.name="BodyTimeoutError",this.message=A||"Body Timeout Error",this.code="UND_ERR_BODY_TIMEOUT";}},Q(he,"BodyTimeoutError"),he),ResponseStatusCodeError$1=(le=class extends UndiciError$1{constructor(A,t,r,n){super(A),this.name="ResponseStatusCodeError",this.message=A||"Response Status Code Error",this.code="UND_ERR_RESPONSE_STATUS_CODE",this.body=n,this.status=t,this.statusCode=t,this.headers=r;}},Q(le,"ResponseStatusCodeError"),le),InvalidArgumentError$k=(ue=class extends UndiciError$1{constructor(A){super(A),this.name="InvalidArgumentError",this.message=A||"Invalid Argument Error",this.code="UND_ERR_INVALID_ARG";}},Q(ue,"InvalidArgumentError"),ue),InvalidReturnValueError$2=(de=class extends UndiciError$1{constructor(A){super(A),this.name="InvalidReturnValueError",this.message=A||"Invalid Return Value Error",this.code="UND_ERR_INVALID_RETURN_VALUE";}},Q(de,"InvalidReturnValueError"),de),AbortError$1=(fe=class extends UndiciError$1{constructor(A){super(A),this.name="AbortError",this.message=A||"The operation was aborted";}},Q(fe,"AbortError"),fe),RequestAbortedError$9=(ye=class extends AbortError$1{constructor(A){super(A),this.name="AbortError",this.message=A||"Request aborted",this.code="UND_ERR_ABORTED";}},Q(ye,"RequestAbortedError"),ye),InformationalError$1=(De=class extends UndiciError$1{constructor(A){super(A),this.name="InformationalError",this.message=A||"Request information",this.code="UND_ERR_INFO";}},Q(De,"InformationalError"),De),RequestContentLengthMismatchError$1=(Re=class extends UndiciError$1{constructor(A){super(A),this.name="RequestContentLengthMismatchError",this.message=A||"Request body length does not match content-length header",this.code="UND_ERR_REQ_CONTENT_LENGTH_MISMATCH";}},Q(Re,"RequestContentLengthMismatchError"),Re),ResponseContentLengthMismatchError$1=(we=class extends UndiciError$1{constructor(A){super(A),this.name="ResponseContentLengthMismatchError",this.message=A||"Response body length does not match content-length header",this.code="UND_ERR_RES_CONTENT_LENGTH_MISMATCH";}},Q(we,"ResponseContentLengthMismatchError"),we),ClientDestroyedError$2=(pe=class extends UndiciError$1{constructor(A){super(A),this.name="ClientDestroyedError",this.message=A||"The client is destroyed",this.code="UND_ERR_DESTROYED";}},Q(pe,"ClientDestroyedError"),pe),ClientClosedError$1=(ke=class extends UndiciError$1{constructor(A){super(A),this.name="ClientClosedError",this.message=A||"The client is closed",this.code="UND_ERR_CLOSED";}},Q(ke,"ClientClosedError"),ke),SocketError$3=(Fe=class extends UndiciError$1{constructor(A,t){super(A),this.name="SocketError",this.message=A||"Socket error",this.code="UND_ERR_SOCKET",this.socket=t;}},Q(Fe,"SocketError"),Fe),NotSupportedError$2=(Ne=class extends UndiciError$1{constructor(A){super(A),this.name="NotSupportedError",this.message=A||"Not supported error",this.code="UND_ERR_NOT_SUPPORTED";}},Q(Ne,"NotSupportedError"),Ne);const tt=class tt extends UndiciError$1{constructor(A){super(A),this.name="MissingUpstreamError",this.message=A||"No upstream has been added to the BalancedPool",this.code="UND_ERR_BPL_MISSING_UPSTREAM";}};Q(tt,"BalancedPoolMissingUpstreamError");let BalancedPoolMissingUpstreamError=tt,HTTPParserError$1=(be=class extends Error{constructor(A,t,r){super(A),this.name="HTTPParserError",this.code=t?`HPE_${t}`:void 0,this.data=r?r.toString():void 0;}},Q(be,"HTTPParserError"),be),ResponseExceededMaxSizeError$1=(Se=class extends UndiciError$1{constructor(A){super(A),this.name="ResponseExceededMaxSizeError",this.message=A||"Response content exceeded max size",this.code="UND_ERR_RES_EXCEEDED_MAX_SIZE";}},Q(Se,"ResponseExceededMaxSizeError"),Se);const rt=class rt extends UndiciError$1{constructor(A,t,{headers:r,data:n}){super(A),this.name="RequestRetryError",this.message=A||"Request retry error",this.code="UND_ERR_REQ_RETRY",this.statusCode=t,this.data=n,this.headers=r;}};Q(rt,"RequestRetryError");let RequestRetryError=rt;var errors$1={AbortError:AbortError$1,HTTPParserError:HTTPParserError$1,UndiciError:UndiciError$1,HeadersTimeoutError:HeadersTimeoutError$1,HeadersOverflowError:HeadersOverflowError$1,BodyTimeoutError:BodyTimeoutError$1,RequestContentLengthMismatchError:RequestContentLengthMismatchError$1,ConnectTimeoutError:ConnectTimeoutError$1,ResponseStatusCodeError:ResponseStatusCodeError$1,InvalidArgumentError:InvalidArgumentError$k,InvalidReturnValueError:InvalidReturnValueError$2,RequestAbortedError:RequestAbortedError$9,ClientDestroyedError:ClientDestroyedError$2,ClientClosedError:ClientClosedError$1,InformationalError:InformationalError$1,SocketError:SocketError$3,NotSupportedError:NotSupportedError$2,ResponseContentLengthMismatchError:ResponseContentLengthMismatchError$1,BalancedPoolMissingUpstreamError,ResponseExceededMaxSizeError:ResponseExceededMaxSizeError$1,RequestRetryError};const headerNameLowerCasedRecord$3={},wellknownHeaderNames$1=["Accept","Accept-Encoding","Accept-Language","Accept-Ranges","Access-Control-Allow-Credentials","Access-Control-Allow-Headers","Access-Control-Allow-Methods","Access-Control-Allow-Origin","Access-Control-Expose-Headers","Access-Control-Max-Age","Access-Control-Request-Headers","Access-Control-Request-Method","Age","Allow","Alt-Svc","Alt-Used","Authorization","Cache-Control","Clear-Site-Data","Connection","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-Location","Content-Range","Content-Security-Policy","Content-Security-Policy-Report-Only","Content-Type","Cookie","Cross-Origin-Embedder-Policy","Cross-Origin-Opener-Policy","Cross-Origin-Resource-Policy","Date","Device-Memory","Downlink","ECT","ETag","Expect","Expect-CT","Expires","Forwarded","From","Host","If-Match","If-Modified-Since","If-None-Match","If-Range","If-Unmodified-Since","Keep-Alive","Last-Modified","Link","Location","Max-Forwards","Origin","Permissions-Policy","Pragma","Proxy-Authenticate","Proxy-Authorization","RTT","Range","Referer","Referrer-Policy","Refresh","Retry-After","Sec-WebSocket-Accept","Sec-WebSocket-Extensions","Sec-WebSocket-Key","Sec-WebSocket-Protocol","Sec-WebSocket-Version","Server","Server-Timing","Service-Worker-Allowed","Service-Worker-Navigation-Preload","Set-Cookie","SourceMap","Strict-Transport-Security","Supports-Loading-Mode","TE","Timing-Allow-Origin","Trailer","Transfer-Encoding","Upgrade","Upgrade-Insecure-Requests","User-Agent","Vary","Via","WWW-Authenticate","X-Content-Type-Options","X-DNS-Prefetch-Control","X-Frame-Options","X-Permitted-Cross-Domain-Policies","X-Powered-By","X-Requested-With","X-XSS-Protection"];for(let e=0;e<wellknownHeaderNames$1.length;++e){const A=wellknownHeaderNames$1[e],t=A.toLowerCase();headerNameLowerCasedRecord$3[A]=headerNameLowerCasedRecord$3[t]=t;}Object.setPrototypeOf(headerNameLowerCasedRecord$3,null);var constants$5={wellknownHeaderNames:wellknownHeaderNames$1,headerNameLowerCasedRecord:headerNameLowerCasedRecord$3};const{wellknownHeaderNames,headerNameLowerCasedRecord:headerNameLowerCasedRecord$2}=constants$5,ne=class ne{constructor(A,t,r){se(this,"value",null);se(this,"left",null);se(this,"middle",null);se(this,"right",null);se(this,"code");if(r===void 0||r>=A.length)throw new TypeError("Unreachable");this.code=A[r],A.length!==++r?this.middle=new ne(A,t,r):this.value=t;}add(A,t,r){if(r===void 0||r>=A.length)throw new TypeError("Unreachable");const n=A[r];this.code===n?A.length===++r?this.value=t:this.middle!==null?this.middle.add(A,t,r):this.middle=new ne(A,t,r):this.code<n?this.left!==null?this.left.add(A,t,r):this.left=new ne(A,t,r):this.right!==null?this.right.add(A,t,r):this.right=new ne(A,t,r);}search(A){const t=A.length;let r=0,n=this;for(;n!==null&&r<t;){let o=A[r];for(o>=65&&o<=90&&(o|=32);n!==null;){if(o===n.code){if(t===++r)return n;n=n.middle;break}n=n.code<o?n.left:n.right;}}return null}};Q(ne,"TstNode");let TstNode=ne;const st=class st{constructor(){se(this,"node",null);}insert(A,t){this.node===null?this.node=new TstNode(A,t,0):this.node.add(A,t,0);}lookup(A){return this.node?.search(A)?.value??null}};Q(st,"TernarySearchTree");let TernarySearchTree=st;const tree$1=new TernarySearchTree;for(let e=0;e<wellknownHeaderNames.length;++e){const A=headerNameLowerCasedRecord$2[wellknownHeaderNames[e]];tree$1.insert(Buffer.from(A),A);}var tree_1={TernarySearchTree,tree:tree$1};const assert$8=require$$0__default,{kDestroyed:kDestroyed$1,kBodyUsed:kBodyUsed$1}=symbols$4,{IncomingMessage}=require$$2__default,stream$1=require$$0__default$1,net$4=require$$0__default$2,{InvalidArgumentError:InvalidArgumentError$j}=errors$1,{Blob:Blob$1}=require$$6__default,nodeUtil=require$$0__default$3,{stringify}=require$$8__default,{headerNameLowerCasedRecord:headerNameLowerCasedRecord$1}=constants$5,{tree}=tree_1,[nodeMajor,nodeMinor]=process.versions.node.split(".").map(e=>Number(e));function nop$1(){}Q(nop$1,"nop$1");function isStream(e){return e&&typeof e=="object"&&typeof e.pipe=="function"&&typeof e.on=="function"}Q(isStream,"isStream");function isBlobLike(e){return Blob$1&&e instanceof Blob$1||e&&typeof e=="object"&&(typeof e.stream=="function"||typeof e.arrayBuffer=="function")&&/^(Blob|File)$/.test(e[Symbol.toStringTag])}Q(isBlobLike,"isBlobLike");function buildURL$2(e,A){if(e.includes("?")||e.includes("#"))throw new Error('Query params cannot be passed when url already contains "?" or "#".');const t=stringify(A);return t&&(e+="?"+t),e}Q(buildURL$2,"buildURL$2");function parseURL(e){if(typeof e=="string"){if(e=new URL(e),!/^https?:/.test(e.origin||e.protocol))throw new InvalidArgumentError$j("Invalid URL protocol: the URL must start with `http:` or `https:`.");return e}if(!e||typeof e!="object")throw new InvalidArgumentError$j("Invalid URL: The URL argument must be a non-null object.");if(!/^https?:/.test(e.origin||e.protocol))throw new InvalidArgumentError$j("Invalid URL protocol: the URL must start with `http:` or `https:`.");if(!(e instanceof URL)){if(e.port!=null&&e.port!==""&&!Number.isFinite(parseInt(e.port)))throw new InvalidArgumentError$j("Invalid URL: port must be a valid integer or a string representation of an integer.");if(e.path!=null&&typeof e.path!="string")throw new InvalidArgumentError$j("Invalid URL path: the path must be a string or null/undefined.");if(e.pathname!=null&&typeof e.pathname!="string")throw new InvalidArgumentError$j("Invalid URL pathname: the pathname must be a string or null/undefined.");if(e.hostname!=null&&typeof e.hostname!="string")throw new InvalidArgumentError$j("Invalid URL hostname: the hostname must be a string or null/undefined.");if(e.origin!=null&&typeof e.origin!="string")throw new InvalidArgumentError$j("Invalid URL origin: the origin must be a string or null/undefined.");const A=e.port!=null?e.port:e.protocol==="https:"?443:80;let t=e.origin!=null?e.origin:`${e.protocol}//${e.hostname}:${A}`,r=e.path!=null?e.path:`${e.pathname||""}${e.search||""}`;t.endsWith("/")&&(t=t.substring(0,t.length-1)),r&&!r.startsWith("/")&&(r=`/${r}`),e=new URL(t+r);}return e}Q(parseURL,"parseURL");function parseOrigin(e){if(e=parseURL(e),e.pathname!=="/"||e.search||e.hash)throw new InvalidArgumentError$j("invalid url");return e}Q(parseOrigin,"parseOrigin");function getHostname(e){if(e[0]==="["){const t=e.indexOf("]");return assert$8(t!==-1),e.substring(1,t)}const A=e.indexOf(":");return A===-1?e:e.substring(0,A)}Q(getHostname,"getHostname");function getServerName(e){if(!e)return null;assert$8.strictEqual(typeof e,"string");const A=getHostname(e);return net$4.isIP(A)?"":A}Q(getServerName,"getServerName");function deepClone(e){return JSON.parse(JSON.stringify(e))}Q(deepClone,"deepClone");function isAsyncIterable(e){return e!=null&&typeof e[Symbol.asyncIterator]=="function"}Q(isAsyncIterable,"isAsyncIterable");function isIterable(e){return e!=null&&(typeof e[Symbol.iterator]=="function"||typeof e[Symbol.asyncIterator]=="function")}Q(isIterable,"isIterable");function bodyLength(e){if(e==null)return 0;if(isStream(e)){const A=e._readableState;return A&&A.objectMode===!1&&A.ended===!0&&Number.isFinite(A.length)?A.length:null}else {if(isBlobLike(e))return e.size!=null?e.size:null;if(isBuffer(e))return e.byteLength}return null}Q(bodyLength,"bodyLength");function isDestroyed(e){return !e||!!(e.destroyed||e[kDestroyed$1])}Q(isDestroyed,"isDestroyed");function isReadableAborted(e){const A=e&&e._readableState;return isDestroyed(e)&&A&&!A.endEmitted}Q(isReadableAborted,"isReadableAborted");function destroy(e,A){e==null||!isStream(e)||isDestroyed(e)||(typeof e.destroy=="function"?(Object.getPrototypeOf(e).constructor===IncomingMessage&&(e.socket=null),e.destroy(A)):A&&process.nextTick((t,r)=>{t.emit("error",r);},e,A),e.destroyed!==!0&&(e[kDestroyed$1]=!0));}Q(destroy,"destroy");const KEEPALIVE_TIMEOUT_EXPR=/timeout=(\d+)/;function parseKeepAliveTimeout(e){const A=e.toString().match(KEEPALIVE_TIMEOUT_EXPR);return A?parseInt(A[1],10)*1e3:null}Q(parseKeepAliveTimeout,"parseKeepAliveTimeout");function headerNameToString(e){return typeof e=="string"?headerNameLowerCasedRecord$1[e]??e.toLowerCase():tree.lookup(e)??e.toString("latin1").toLowerCase()}Q(headerNameToString,"headerNameToString");function bufferToLowerCasedHeaderName(e){return tree.lookup(e)??e.toString("latin1").toLowerCase()}Q(bufferToLowerCasedHeaderName,"bufferToLowerCasedHeaderName");function parseHeaders(e,A){if(!Array.isArray(e))return e;A===void 0&&(A={});for(let t=0;t<e.length;t+=2){const r=headerNameToString(e[t]);let n=A[r];if(n)typeof n=="string"&&(n=[n],A[r]=n),n.push(e[t+1].toString("utf8"));else {const o=e[t+1];typeof o=="string"?A[r]=o:A[r]=Array.isArray(o)?o.map(C=>C.toString("utf8")):o.toString("utf8");}}return "content-length"in A&&"content-disposition"in A&&(A["content-disposition"]=Buffer.from(A["content-disposition"]).toString("latin1")),A}Q(parseHeaders,"parseHeaders");function parseRawHeaders(e){const A=[];let t=!1,r=-1;for(let n=0;n<e.length;n+=2){const o=e[n+0].toString(),C=e[n+1].toString("utf8");o.length===14&&(o==="content-length"||o.toLowerCase()==="content-length")?(A.push(o,C),t=!0):o.length===19&&(o==="content-disposition"||o.toLowerCase()==="content-disposition")?r=A.push(o,C)-1:A.push(o,C);}return t&&r!==-1&&(A[r]=Buffer.from(A[r]).toString("latin1")),A}Q(parseRawHeaders,"parseRawHeaders");function isBuffer(e){return e instanceof Uint8Array||Buffer.isBuffer(e)}Q(isBuffer,"isBuffer");function validateHandler(e,A,t){if(!e||typeof e!="object")throw new InvalidArgumentError$j("handler must be an object");if(typeof e.onConnect!="function")throw new InvalidArgumentError$j("invalid onConnect method");if(typeof e.onError!="function")throw new InvalidArgumentError$j("invalid onError method");if(typeof e.onBodySent!="function"&&e.onBodySent!==void 0)throw new InvalidArgumentError$j("invalid onBodySent method");if(t||A==="CONNECT"){if(typeof e.onUpgrade!="function")throw new InvalidArgumentError$j("invalid onUpgrade method")}else {if(typeof e.onHeaders!="function")throw new InvalidArgumentError$j("invalid onHeaders method");if(typeof e.onData!="function")throw new InvalidArgumentError$j("invalid onData method");if(typeof e.onComplete!="function")throw new InvalidArgumentError$j("invalid onComplete method")}}Q(validateHandler,"validateHandler");function isDisturbed(e){return !!(e&&(stream$1.isDisturbed?stream$1.isDisturbed(e)||e[kBodyUsed$1]:e[kBodyUsed$1]||e.readableDidRead||e._readableState&&e._readableState.dataEmitted||isReadableAborted(e)))}Q(isDisturbed,"isDisturbed");function isErrored(e){return !!(e&&stream$1.isErrored(e))}Q(isErrored,"isErrored");function isReadable(e){return !!(e&&stream$1.isReadable(e))}Q(isReadable,"isReadable");function getSocketInfo(e){return {localAddress:e.localAddress,localPort:e.localPort,remoteAddress:e.remoteAddress,remotePort:e.remotePort,remoteFamily:e.remoteFamily,timeout:e.timeout,bytesWritten:e.bytesWritten,bytesRead:e.bytesRead}}Q(getSocketInfo,"getSocketInfo");function ReadableStreamFrom$1(e){let A;return new ReadableStream({async start(){A=e[Symbol.asyncIterator]();},async pull(t){const{done:r,value:n}=await A.next();if(r)queueMicrotask(()=>{t.close(),t.byobRequest?.respond(0);});else {const o=Buffer.isBuffer(n)?n:Buffer.from(n);o.byteLength&&t.enqueue(new Uint8Array(o));}return t.desiredSize>0},async cancel(t){await A.return();},type:"bytes"})}Q(ReadableStreamFrom$1,"ReadableStreamFrom$1");function isFormDataLike(e){return e&&typeof e=="object"&&typeof e.append=="function"&&typeof e.delete=="function"&&typeof e.get=="function"&&typeof e.getAll=="function"&&typeof e.has=="function"&&typeof e.set=="function"&&e[Symbol.toStringTag]==="FormData"}Q(isFormDataLike,"isFormDataLike");function addAbortListener$1(e,A){return "addEventListener"in e?(e.addEventListener("abort",A,{once:!0}),()=>e.removeEventListener("abort",A)):(e.addListener("abort",A),()=>e.removeListener("abort",A))}Q(addAbortListener$1,"addAbortListener$1");const hasToWellFormed=!!String.prototype.toWellFormed;function toUSVString$1(e){return hasToWellFormed?`${e}`.toWellFormed():nodeUtil.toUSVString?nodeUtil.toUSVString(e):`${e}`}Q(toUSVString$1,"toUSVString$1");function isTokenCharCode(e){switch(e){case 34:case 40:case 41:case 44:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 123:case 125:return !1;default:return e>=33&&e<=126}}Q(isTokenCharCode,"isTokenCharCode");function isValidHTTPToken(e){if(e.length===0)return !1;for(let A=0;A<e.length;++A)if(!isTokenCharCode(e.charCodeAt(A)))return !1;return !0}Q(isValidHTTPToken,"isValidHTTPToken");function parseRangeHeader(e){if(e==null||e==="")return {start:0,end:null,size:null};const A=e?e.match(/^bytes (\d+)-(\d+)\/(\d+)?$/):null;return A?{start:parseInt(A[1]),end:A[2]?parseInt(A[2]):null,size:A[3]?parseInt(A[3]):null}:null}Q(parseRangeHeader,"parseRangeHeader");const kEnumerableProperty=Object.create(null);kEnumerableProperty.enumerable=!0;var util$j={kEnumerableProperty,nop:nop$1,isDisturbed,isErrored,isReadable,toUSVString:toUSVString$1,isReadableAborted,isBlobLike,parseOrigin,parseURL,getServerName,isStream,isIterable,isAsyncIterable,isDestroyed,headerNameToString,bufferToLowerCasedHeaderName,parseRawHeaders,parseHeaders,parseKeepAliveTimeout,destroy,bodyLength,deepClone,ReadableStreamFrom:ReadableStreamFrom$1,isBuffer,validateHandler,getSocketInfo,isFormDataLike,buildURL:buildURL$2,addAbortListener:addAbortListener$1,isValidHTTPToken,isTokenCharCode,parseRangeHeader,nodeMajor,nodeMinor,nodeHasAutoSelectFamily:nodeMajor>18||nodeMajor===18&&nodeMinor>=13,safeHTTPMethods:["GET","HEAD","OPTIONS","TRACE"]};let fastNow=Date.now(),fastNowTimeout;const fastTimers=[];function onTimeout(){fastNow=Date.now();let e=fastTimers.length,A=0;for(;A<e;){const t=fastTimers[A];t.state===0?t.state=fastNow+t.delay:t.state>0&&fastNow>=t.state&&(t.state=-1,t.callback(t.opaque)),t.state===-1?(t.state=-2,A!==e-1?fastTimers[A]=fastTimers.pop():fastTimers.pop(),e-=1):A+=1;}fastTimers.length>0&&refreshTimeout();}Q(onTimeout,"onTimeout");function refreshTimeout(){fastNowTimeout&&fastNowTimeout.refresh?fastNowTimeout.refresh():(clearTimeout(fastNowTimeout),fastNowTimeout=setTimeout(onTimeout,1e3),fastNowTimeout.unref&&fastNowTimeout.unref());}Q(refreshTimeout,"refreshTimeout");const nt=class nt{constructor(A,t,r){this.callback=A,this.delay=t,this.opaque=r,this.state=-2,this.refresh();}refresh(){this.state===-2&&(fastTimers.push(this),(!fastNowTimeout||fastTimers.length===1)&&refreshTimeout()),this.state=0;}clear(){this.state=-1;}};Q(nt,"Timeout");let Timeout=nt;var timers$1={setTimeout(e,A,t){return A<1e3?setTimeout(e,A,t):new Timeout(e,A,t)},clearTimeout(e){e instanceof Timeout?e.clear():clearTimeout(e);}},main={exports:{}},sbmh,hasRequiredSbmh;function requireSbmh(){if(hasRequiredSbmh)return sbmh;hasRequiredSbmh=1;const e=require$$0__default$4.EventEmitter,A=require$$1__default.inherits;function t(r){if(typeof r=="string"&&(r=Buffer.from(r)),!Buffer.isBuffer(r))throw new TypeError("The needle has to be a String or a Buffer.");const n=r.length;if(n===0)throw new Error("The needle cannot be an empty String/Buffer.");if(n>256)throw new Error("The needle cannot have a length bigger than 256.");this.maxMatches=1/0,this.matches=0,this._occ=new Array(256).fill(n),this._lookbehind_size=0,this._needle=r,this._bufpos=0,this._lookbehind=Buffer.alloc(n);for(var o=0;o<n-1;++o)this._occ[r[o]]=n-1-o;}return Q(t,"SBMH"),A(t,e),t.prototype.reset=function(){this._lookbehind_size=0,this.matches=0,this._bufpos=0;},t.prototype.push=function(r,n){Buffer.isBuffer(r)||(r=Buffer.from(r,"binary"));const o=r.length;this._bufpos=n||0;let C;for(;C!==o&&this.matches<this.maxMatches;)C=this._sbmh_feed(r);return C},t.prototype._sbmh_feed=function(r){const n=r.length,o=this._needle,C=o.length,l=o[C-1];let B=-this._lookbehind_size,I;if(B<0){for(;B<0&&B<=n-C;){if(I=this._sbmh_lookup_char(r,B+C-1),I===l&&this._sbmh_memcmp(r,B,C-1))return this._lookbehind_size=0,++this.matches,this.emit("info",!0),this._bufpos=B+C;B+=this._occ[I];}if(B<0)for(;B<0&&!this._sbmh_memcmp(r,B,n-B);)++B;if(B>=0)this.emit("info",!1,this._lookbehind,0,this._lookbehind_size),this._lookbehind_size=0;else {const c=this._lookbehind_size+B;return c>0&&this.emit("info",!1,this._lookbehind,0,c),this._lookbehind.copy(this._lookbehind,0,c,this._lookbehind_size-c),this._lookbehind_size-=c,r.copy(this._lookbehind,this._lookbehind_size),this._lookbehind_size+=n,this._bufpos=n,n}}if(B+=(B>=0)*this._bufpos,r.indexOf(o,B)!==-1)return B=r.indexOf(o,B),++this.matches,B>0?this.emit("info",!0,r,this._bufpos,B):this.emit("info",!0),this._bufpos=B+C;for(B=n-C;B<n&&(r[B]!==o[0]||Buffer.compare(r.subarray(B,B+n-B),o.subarray(0,n-B))!==0);)++B;return B<n&&(r.copy(this._lookbehind,0,B,B+(n-B)),this._lookbehind_size=n-B),B>0&&this.emit("info",!1,r,this._bufpos,B<n?B:n),this._bufpos=n,n},t.prototype._sbmh_lookup_char=function(r,n){return n<0?this._lookbehind[this._lookbehind_size+n]:r[n]},t.prototype._sbmh_memcmp=function(r,n,o){for(var C=0;C<o;++C)if(this._sbmh_lookup_char(r,n+C)!==this._needle[C])return !1;return !0},sbmh=t,sbmh}Q(requireSbmh,"requireSbmh");var PartStream_1,hasRequiredPartStream;function requirePartStream(){if(hasRequiredPartStream)return PartStream_1;hasRequiredPartStream=1;const e=require$$1__default.inherits,A=Stream__default.Readable;function t(r){A.call(this,r);}return Q(t,"PartStream"),e(t,A),t.prototype._read=function(r){},PartStream_1=t,PartStream_1}Q(requirePartStream,"requirePartStream");var getLimit,hasRequiredGetLimit;function requireGetLimit(){return hasRequiredGetLimit||(hasRequiredGetLimit=1,getLimit=Q(function(A,t,r){if(!A||A[t]===void 0||A[t]===null)return r;if(typeof A[t]!="number"||isNaN(A[t]))throw new TypeError("Limit "+t+" is not a valid number");return A[t]},"getLimit")),getLimit}Q(requireGetLimit,"requireGetLimit");var HeaderParser_1,hasRequiredHeaderParser;function requireHeaderParser(){if(hasRequiredHeaderParser)return HeaderParser_1;hasRequiredHeaderParser=1;const e=require$$0__default$4.EventEmitter,A=require$$1__default.inherits,t=requireGetLimit(),r=requireSbmh(),n=Buffer.from(`\r
\r
`),o=/\r\n/g,C=/^([^:]+):[ \t]?([\x00-\xFF]+)?$/;function l(B){e.call(this),B=B||{};const I=this;this.nread=0,this.maxed=!1,this.npairs=0,this.maxHeaderPairs=t(B,"maxHeaderPairs",2e3),this.maxHeaderSize=t(B,"maxHeaderSize",80*1024),this.buffer="",this.header={},this.finished=!1,this.ss=new r(n),this.ss.on("info",function(c,y,f,D){y&&!I.maxed&&(I.nread+D-f>=I.maxHeaderSize?(D=I.maxHeaderSize-I.nread+f,I.nread=I.maxHeaderSize,I.maxed=!0):I.nread+=D-f,I.buffer+=y.toString("binary",f,D)),c&&I._finish();});}return Q(l,"HeaderParser"),A(l,e),l.prototype.push=function(B){const I=this.ss.push(B);if(this.finished)return I},l.prototype.reset=function(){this.finished=!1,this.buffer="",this.header={},this.ss.reset();},l.prototype._finish=function(){this.buffer&&this._parseHeader(),this.ss.matches=this.ss.maxMatches;const B=this.header;this.header={},this.buffer="",this.finished=!0,this.nread=this.npairs=0,this.maxed=!1,this.emit("header",B);},l.prototype._parseHeader=function(){if(this.npairs===this.maxHeaderPairs)return;const B=this.buffer.split(o),I=B.length;let c,y;for(var f=0;f<I;++f){if(B[f].length===0)continue;if((B[f][0]==="	"||B[f][0]===" ")&&y){this.header[y][this.header[y].length-1]+=B[f];continue}const D=B[f].indexOf(":");if(D===-1||D===0)return;if(c=C.exec(B[f]),y=c[1].toLowerCase(),this.header[y]=this.header[y]||[],this.header[y].push(c[2]||""),++this.npairs===this.maxHeaderPairs)break}},HeaderParser_1=l,HeaderParser_1}Q(requireHeaderParser,"requireHeaderParser");var Dicer_1,hasRequiredDicer;function requireDicer(){if(hasRequiredDicer)return Dicer_1;hasRequiredDicer=1;const e=Stream__default.Writable,A=require$$1__default.inherits,t=requireSbmh(),r=requirePartStream(),n=requireHeaderParser(),o=45,C=Buffer.from("-"),l=Buffer.from(`\r
`),B=Q(function(){},"EMPTY_FN");function I(c){if(!(this instanceof I))return new I(c);if(e.call(this,c),!c||!c.headerFirst&&typeof c.boundary!="string")throw new TypeError("Boundary required");typeof c.boundary=="string"?this.setBoundary(c.boundary):this._bparser=void 0,this._headerFirst=c.headerFirst,this._dashes=0,this._parts=0,this._finished=!1,this._realFinish=!1,this._isPreamble=!0,this._justMatched=!1,this._firstWrite=!0,this._inHeader=!0,this._part=void 0,this._cb=void 0,this._ignoreData=!1,this._partOpts={highWaterMark:c.partHwm},this._pause=!1;const y=this;this._hparser=new n(c),this._hparser.on("header",function(f){y._inHeader=!1,y._part.emit("header",f);});}return Q(I,"Dicer"),A(I,e),I.prototype.emit=function(c){if(c==="finish"&&!this._realFinish){if(!this._finished){const y=this;process.nextTick(function(){if(y.emit("error",new Error("Unexpected end of multipart data")),y._part&&!y._ignoreData){const f=y._isPreamble?"Preamble":"Part";y._part.emit("error",new Error(f+" terminated early due to unexpected end of multipart data")),y._part.push(null),process.nextTick(function(){y._realFinish=!0,y.emit("finish"),y._realFinish=!1;});return}y._realFinish=!0,y.emit("finish"),y._realFinish=!1;});}}else e.prototype.emit.apply(this,arguments);},I.prototype._write=function(c,y,f){if(!this._hparser&&!this._bparser)return f();if(this._headerFirst&&this._isPreamble){this._part||(this._part=new r(this._partOpts),this._events.preamble?this.emit("preamble",this._part):this._ignore());const D=this._hparser.push(c);if(!this._inHeader&&D!==void 0&&D<c.length)c=c.slice(D);else return f()}this._firstWrite&&(this._bparser.push(l),this._firstWrite=!1),this._bparser.push(c),this._pause?this._cb=f:f();},I.prototype.reset=function(){this._part=void 0,this._bparser=void 0,this._hparser=void 0;},I.prototype.setBoundary=function(c){const y=this;this._bparser=new t(`\r
--`+c),this._bparser.on("info",function(f,D,S,R){y._oninfo(f,D,S,R);});},I.prototype._ignore=function(){this._part&&!this._ignoreData&&(this._ignoreData=!0,this._part.on("error",B),this._part.resume());},I.prototype._oninfo=function(c,y,f,D){let S;const R=this;let F=0,p,m=!0;if(!this._part&&this._justMatched&&y){for(;this._dashes<2&&f+F<D;)if(y[f+F]===o)++F,++this._dashes;else {this._dashes&&(S=C),this._dashes=0;break}if(this._dashes===2&&(f+F<D&&this._events.trailer&&this.emit("trailer",y.slice(f+F,D)),this.reset(),this._finished=!0,R._parts===0&&(R._realFinish=!0,R.emit("finish"),R._realFinish=!1)),this._dashes)return}this._justMatched&&(this._justMatched=!1),this._part||(this._part=new r(this._partOpts),this._part._read=function(k){R._unpause();},this._isPreamble&&this._events.preamble?this.emit("preamble",this._part):this._isPreamble!==!0&&this._events.part?this.emit("part",this._part):this._ignore(),this._isPreamble||(this._inHeader=!0)),y&&f<D&&!this._ignoreData&&(this._isPreamble||!this._inHeader?(S&&(m=this._part.push(S)),m=this._part.push(y.slice(f,D)),m||(this._pause=!0)):!this._isPreamble&&this._inHeader&&(S&&this._hparser.push(S),p=this._hparser.push(y.slice(f,D)),!this._inHeader&&p!==void 0&&p<D&&this._oninfo(!1,y,f+p,D))),c&&(this._hparser.reset(),this._isPreamble?this._isPreamble=!1:f!==D&&(++this._parts,this._part.on("end",function(){--R._parts===0&&(R._finished?(R._realFinish=!0,R.emit("finish"),R._realFinish=!1):R._unpause());})),this._part.push(null),this._part=void 0,this._ignoreData=!1,this._justMatched=!0,this._dashes=0);},I.prototype._unpause=function(){if(this._pause&&(this._pause=!1,this._cb)){const c=this._cb;this._cb=void 0,c();}},Dicer_1=I,Dicer_1}Q(requireDicer,"requireDicer");var decodeText_1,hasRequiredDecodeText;function requireDecodeText(){if(hasRequiredDecodeText)return decodeText_1;hasRequiredDecodeText=1;const e=new TextDecoder("utf-8"),A=new Map([["utf-8",e],["utf8",e]]);function t(o){let C;for(;;)switch(o){case"utf-8":case"utf8":return r.utf8;case"latin1":case"ascii":case"us-ascii":case"iso-8859-1":case"iso8859-1":case"iso88591":case"iso_8859-1":case"windows-1252":case"iso_8859-1:1987":case"cp1252":case"x-cp1252":return r.latin1;case"utf16le":case"utf-16le":case"ucs2":case"ucs-2":return r.utf16le;case"base64":return r.base64;default:if(C===void 0){C=!0,o=o.toLowerCase();continue}return r.other.bind(o)}}Q(t,"getDecoder");const r={utf8:(o,C)=>o.length===0?"":(typeof o=="string"&&(o=Buffer.from(o,C)),o.utf8Slice(0,o.length)),latin1:(o,C)=>o.length===0?"":typeof o=="string"?o:o.latin1Slice(0,o.length),utf16le:(o,C)=>o.length===0?"":(typeof o=="string"&&(o=Buffer.from(o,C)),o.ucs2Slice(0,o.length)),base64:(o,C)=>o.length===0?"":(typeof o=="string"&&(o=Buffer.from(o,C)),o.base64Slice(0,o.length)),other:(o,C)=>{if(o.length===0)return "";if(typeof o=="string"&&(o=Buffer.from(o,C)),A.has(this.toString()))try{return A.get(this).decode(o)}catch{}return typeof o=="string"?o:o.toString()}};function n(o,C,l){return o&&t(l)(o,C)}return Q(n,"decodeText"),decodeText_1=n,decodeText_1}Q(requireDecodeText,"requireDecodeText");var parseParams_1,hasRequiredParseParams;function requireParseParams(){if(hasRequiredParseParams)return parseParams_1;hasRequiredParseParams=1;const e=requireDecodeText(),A=/%[a-fA-F0-9][a-fA-F0-9]/g,t={"%00":"\0","%01":"","%02":"","%03":"","%04":"","%05":"","%06":"","%07":"\x07","%08":"\b","%09":"	","%0a":`
`,"%0A":`
`,"%0b":"\v","%0B":"\v","%0c":"\f","%0C":"\f","%0d":"\r","%0D":"\r","%0e":"","%0E":"","%0f":"","%0F":"","%10":"","%11":"","%12":"","%13":"","%14":"","%15":"","%16":"","%17":"","%18":"","%19":"","%1a":"","%1A":"","%1b":"\x1B","%1B":"\x1B","%1c":"","%1C":"","%1d":"","%1D":"","%1e":"","%1E":"","%1f":"","%1F":"","%20":" ","%21":"!","%22":'"',"%23":"#","%24":"$","%25":"%","%26":"&","%27":"'","%28":"(","%29":")","%2a":"*","%2A":"*","%2b":"+","%2B":"+","%2c":",","%2C":",","%2d":"-","%2D":"-","%2e":".","%2E":".","%2f":"/","%2F":"/","%30":"0","%31":"1","%32":"2","%33":"3","%34":"4","%35":"5","%36":"6","%37":"7","%38":"8","%39":"9","%3a":":","%3A":":","%3b":";","%3B":";","%3c":"<","%3C":"<","%3d":"=","%3D":"=","%3e":">","%3E":">","%3f":"?","%3F":"?","%40":"@","%41":"A","%42":"B","%43":"C","%44":"D","%45":"E","%46":"F","%47":"G","%48":"H","%49":"I","%4a":"J","%4A":"J","%4b":"K","%4B":"K","%4c":"L","%4C":"L","%4d":"M","%4D":"M","%4e":"N","%4E":"N","%4f":"O","%4F":"O","%50":"P","%51":"Q","%52":"R","%53":"S","%54":"T","%55":"U","%56":"V","%57":"W","%58":"X","%59":"Y","%5a":"Z","%5A":"Z","%5b":"[","%5B":"[","%5c":"\\","%5C":"\\","%5d":"]","%5D":"]","%5e":"^","%5E":"^","%5f":"_","%5F":"_","%60":"`","%61":"a","%62":"b","%63":"c","%64":"d","%65":"e","%66":"f","%67":"g","%68":"h","%69":"i","%6a":"j","%6A":"j","%6b":"k","%6B":"k","%6c":"l","%6C":"l","%6d":"m","%6D":"m","%6e":"n","%6E":"n","%6f":"o","%6F":"o","%70":"p","%71":"q","%72":"r","%73":"s","%74":"t","%75":"u","%76":"v","%77":"w","%78":"x","%79":"y","%7a":"z","%7A":"z","%7b":"{","%7B":"{","%7c":"|","%7C":"|","%7d":"}","%7D":"}","%7e":"~","%7E":"~","%7f":"\x7F","%7F":"\x7F","%80":"\x80","%81":"\x81","%82":"\x82","%83":"\x83","%84":"\x84","%85":"\x85","%86":"\x86","%87":"\x87","%88":"\x88","%89":"\x89","%8a":"\x8A","%8A":"\x8A","%8b":"\x8B","%8B":"\x8B","%8c":"\x8C","%8C":"\x8C","%8d":"\x8D","%8D":"\x8D","%8e":"\x8E","%8E":"\x8E","%8f":"\x8F","%8F":"\x8F","%90":"\x90","%91":"\x91","%92":"\x92","%93":"\x93","%94":"\x94","%95":"\x95","%96":"\x96","%97":"\x97","%98":"\x98","%99":"\x99","%9a":"\x9A","%9A":"\x9A","%9b":"\x9B","%9B":"\x9B","%9c":"\x9C","%9C":"\x9C","%9d":"\x9D","%9D":"\x9D","%9e":"\x9E","%9E":"\x9E","%9f":"\x9F","%9F":"\x9F","%a0":"\xA0","%A0":"\xA0","%a1":"\xA1","%A1":"\xA1","%a2":"\xA2","%A2":"\xA2","%a3":"\xA3","%A3":"\xA3","%a4":"\xA4","%A4":"\xA4","%a5":"\xA5","%A5":"\xA5","%a6":"\xA6","%A6":"\xA6","%a7":"\xA7","%A7":"\xA7","%a8":"\xA8","%A8":"\xA8","%a9":"\xA9","%A9":"\xA9","%aa":"\xAA","%Aa":"\xAA","%aA":"\xAA","%AA":"\xAA","%ab":"\xAB","%Ab":"\xAB","%aB":"\xAB","%AB":"\xAB","%ac":"\xAC","%Ac":"\xAC","%aC":"\xAC","%AC":"\xAC","%ad":"\xAD","%Ad":"\xAD","%aD":"\xAD","%AD":"\xAD","%ae":"\xAE","%Ae":"\xAE","%aE":"\xAE","%AE":"\xAE","%af":"\xAF","%Af":"\xAF","%aF":"\xAF","%AF":"\xAF","%b0":"\xB0","%B0":"\xB0","%b1":"\xB1","%B1":"\xB1","%b2":"\xB2","%B2":"\xB2","%b3":"\xB3","%B3":"\xB3","%b4":"\xB4","%B4":"\xB4","%b5":"\xB5","%B5":"\xB5","%b6":"\xB6","%B6":"\xB6","%b7":"\xB7","%B7":"\xB7","%b8":"\xB8","%B8":"\xB8","%b9":"\xB9","%B9":"\xB9","%ba":"\xBA","%Ba":"\xBA","%bA":"\xBA","%BA":"\xBA","%bb":"\xBB","%Bb":"\xBB","%bB":"\xBB","%BB":"\xBB","%bc":"\xBC","%Bc":"\xBC","%bC":"\xBC","%BC":"\xBC","%bd":"\xBD","%Bd":"\xBD","%bD":"\xBD","%BD":"\xBD","%be":"\xBE","%Be":"\xBE","%bE":"\xBE","%BE":"\xBE","%bf":"\xBF","%Bf":"\xBF","%bF":"\xBF","%BF":"\xBF","%c0":"\xC0","%C0":"\xC0","%c1":"\xC1","%C1":"\xC1","%c2":"\xC2","%C2":"\xC2","%c3":"\xC3","%C3":"\xC3","%c4":"\xC4","%C4":"\xC4","%c5":"\xC5","%C5":"\xC5","%c6":"\xC6","%C6":"\xC6","%c7":"\xC7","%C7":"\xC7","%c8":"\xC8","%C8":"\xC8","%c9":"\xC9","%C9":"\xC9","%ca":"\xCA","%Ca":"\xCA","%cA":"\xCA","%CA":"\xCA","%cb":"\xCB","%Cb":"\xCB","%cB":"\xCB","%CB":"\xCB","%cc":"\xCC","%Cc":"\xCC","%cC":"\xCC","%CC":"\xCC","%cd":"\xCD","%Cd":"\xCD","%cD":"\xCD","%CD":"\xCD","%ce":"\xCE","%Ce":"\xCE","%cE":"\xCE","%CE":"\xCE","%cf":"\xCF","%Cf":"\xCF","%cF":"\xCF","%CF":"\xCF","%d0":"\xD0","%D0":"\xD0","%d1":"\xD1","%D1":"\xD1","%d2":"\xD2","%D2":"\xD2","%d3":"\xD3","%D3":"\xD3","%d4":"\xD4","%D4":"\xD4","%d5":"\xD5","%D5":"\xD5","%d6":"\xD6","%D6":"\xD6","%d7":"\xD7","%D7":"\xD7","%d8":"\xD8","%D8":"\xD8","%d9":"\xD9","%D9":"\xD9","%da":"\xDA","%Da":"\xDA","%dA":"\xDA","%DA":"\xDA","%db":"\xDB","%Db":"\xDB","%dB":"\xDB","%DB":"\xDB","%dc":"\xDC","%Dc":"\xDC","%dC":"\xDC","%DC":"\xDC","%dd":"\xDD","%Dd":"\xDD","%dD":"\xDD","%DD":"\xDD","%de":"\xDE","%De":"\xDE","%dE":"\xDE","%DE":"\xDE","%df":"\xDF","%Df":"\xDF","%dF":"\xDF","%DF":"\xDF","%e0":"\xE0","%E0":"\xE0","%e1":"\xE1","%E1":"\xE1","%e2":"\xE2","%E2":"\xE2","%e3":"\xE3","%E3":"\xE3","%e4":"\xE4","%E4":"\xE4","%e5":"\xE5","%E5":"\xE5","%e6":"\xE6","%E6":"\xE6","%e7":"\xE7","%E7":"\xE7","%e8":"\xE8","%E8":"\xE8","%e9":"\xE9","%E9":"\xE9","%ea":"\xEA","%Ea":"\xEA","%eA":"\xEA","%EA":"\xEA","%eb":"\xEB","%Eb":"\xEB","%eB":"\xEB","%EB":"\xEB","%ec":"\xEC","%Ec":"\xEC","%eC":"\xEC","%EC":"\xEC","%ed":"\xED","%Ed":"\xED","%eD":"\xED","%ED":"\xED","%ee":"\xEE","%Ee":"\xEE","%eE":"\xEE","%EE":"\xEE","%ef":"\xEF","%Ef":"\xEF","%eF":"\xEF","%EF":"\xEF","%f0":"\xF0","%F0":"\xF0","%f1":"\xF1","%F1":"\xF1","%f2":"\xF2","%F2":"\xF2","%f3":"\xF3","%F3":"\xF3","%f4":"\xF4","%F4":"\xF4","%f5":"\xF5","%F5":"\xF5","%f6":"\xF6","%F6":"\xF6","%f7":"\xF7","%F7":"\xF7","%f8":"\xF8","%F8":"\xF8","%f9":"\xF9","%F9":"\xF9","%fa":"\xFA","%Fa":"\xFA","%fA":"\xFA","%FA":"\xFA","%fb":"\xFB","%Fb":"\xFB","%fB":"\xFB","%FB":"\xFB","%fc":"\xFC","%Fc":"\xFC","%fC":"\xFC","%FC":"\xFC","%fd":"\xFD","%Fd":"\xFD","%fD":"\xFD","%FD":"\xFD","%fe":"\xFE","%Fe":"\xFE","%fE":"\xFE","%FE":"\xFE","%ff":"\xFF","%Ff":"\xFF","%fF":"\xFF","%FF":"\xFF"};function r(I){return t[I]}Q(r,"encodedReplacer");const n=0,o=1,C=2,l=3;function B(I){const c=[];let y=n,f="",D=!1,S=!1,R=0,F="";const p=I.length;for(var m=0;m<p;++m){const k=I[m];if(k==="\\"&&D)if(S)S=!1;else {S=!0;continue}else if(k==='"')if(S)S=!1;else {D?(D=!1,y=n):D=!0;continue}else if(S&&D&&(F+="\\"),S=!1,(y===C||y===l)&&k==="'"){y===C?(y=l,f=F.substring(1)):y=o,F="";continue}else if(y===n&&(k==="*"||k==="=")&&c.length){y=k==="*"?C:o,c[R]=[F,void 0],F="";continue}else if(!D&&k===";"){y=n,f?(F.length&&(F=e(F.replace(A,r),"binary",f)),f=""):F.length&&(F=e(F,"binary","utf8")),c[R]===void 0?c[R]=F:c[R][1]=F,F="",++R;continue}else if(!D&&(k===" "||k==="	"))continue;F+=k;}return f&&F.length?F=e(F.replace(A,r),"binary",f):F&&(F=e(F,"binary","utf8")),c[R]===void 0?F&&(c[R]=F):c[R][1]=F,c}return Q(B,"parseParams"),parseParams_1=B,parseParams_1}Q(requireParseParams,"requireParseParams");var basename,hasRequiredBasename;function requireBasename(){return hasRequiredBasename||(hasRequiredBasename=1,basename=Q(function(A){if(typeof A!="string")return "";for(var t=A.length-1;t>=0;--t)switch(A.charCodeAt(t)){case 47:case 92:return A=A.slice(t+1),A===".."||A==="."?"":A}return A===".."||A==="."?"":A},"basename")),basename}Q(requireBasename,"requireBasename");var multipart,hasRequiredMultipart;function requireMultipart(){if(hasRequiredMultipart)return multipart;hasRequiredMultipart=1;const{Readable:e}=Stream__default,{inherits:A}=require$$1__default,t=requireDicer(),r=requireParseParams(),n=requireDecodeText(),o=requireBasename(),C=requireGetLimit(),l=/^boundary$/i,B=/^form-data$/i,I=/^charset$/i,c=/^filename$/i,y=/^name$/i;f.detect=/^multipart\/form-data/i;function f(R,F){let p,m;const k=this;let w;const b=F.limits,N=F.isPartAFile||((AA,EA,rA)=>EA==="application/octet-stream"||rA!==void 0),U=F.parsedConType||[],x=F.defCharset||"utf8",v=F.preservePath,W={highWaterMark:F.fileHwm};for(p=0,m=U.length;p<m;++p)if(Array.isArray(U[p])&&l.test(U[p][0])){w=U[p][1];break}function J(){Z===0&&q&&!R._done&&(q=!1,k.end());}if(Q(J,"checkFinished"),typeof w!="string")throw new Error("Multipart: Boundary not found");const iA=C(b,"fieldSize",1*1024*1024),CA=C(b,"fileSize",1/0),uA=C(b,"files",1/0),z=C(b,"fields",1/0),IA=C(b,"parts",1/0),hA=C(b,"headerPairs",2e3),nA=C(b,"headerSize",80*1024);let cA=0,Y=0,Z=0,K,G,q=!1;this._needDrain=!1,this._pause=!1,this._cb=void 0,this._nparts=0,this._boy=R;const X={boundary:w,maxHeaderPairs:hA,maxHeaderSize:nA,partHwm:W.highWaterMark,highWaterMark:F.highWaterMark};this.parser=new t(X),this.parser.on("drain",function(){if(k._needDrain=!1,k._cb&&!k._pause){const AA=k._cb;k._cb=void 0,AA();}}).on("part",Q(function AA(EA){if(++k._nparts>IA)return k.parser.removeListener("part",AA),k.parser.on("part",D),R.hitPartsLimit=!0,R.emit("partsLimit"),D(EA);if(G){const rA=G;rA.emit("end"),rA.removeAllListeners("end");}EA.on("header",function(rA){let sA,oA,wA,kA,fA,OA,GA=0;if(rA["content-type"]&&(wA=r(rA["content-type"][0]),wA[0])){for(sA=wA[0].toLowerCase(),p=0,m=wA.length;p<m;++p)if(I.test(wA[p][0])){kA=wA[p][1].toLowerCase();break}}if(sA===void 0&&(sA="text/plain"),kA===void 0&&(kA=x),rA["content-disposition"]){if(wA=r(rA["content-disposition"][0]),!B.test(wA[0]))return D(EA);for(p=0,m=wA.length;p<m;++p)y.test(wA[p][0])?oA=wA[p][1]:c.test(wA[p][0])&&(OA=wA[p][1],v||(OA=o(OA)));}else return D(EA);rA["content-transfer-encoding"]?fA=rA["content-transfer-encoding"][0].toLowerCase():fA="7bit";let YA,FA;if(N(oA,sA,OA)){if(cA===uA)return R.hitFilesLimit||(R.hitFilesLimit=!0,R.emit("filesLimit")),D(EA);if(++cA,!R._events.file){k.parser._ignore();return}++Z;const DA=new S(W);K=DA,DA.on("end",function(){if(--Z,k._pause=!1,J(),k._cb&&!k._needDrain){const MA=k._cb;k._cb=void 0,MA();}}),DA._read=function(MA){if(k._pause&&(k._pause=!1,k._cb&&!k._needDrain)){const xA=k._cb;k._cb=void 0,xA();}},R.emit("file",oA,DA,OA,fA,sA),YA=Q(function(MA){if((GA+=MA.length)>CA){const xA=CA-GA+MA.length;xA>0&&DA.push(MA.slice(0,xA)),DA.truncated=!0,DA.bytesRead=CA,EA.removeAllListeners("data"),DA.emit("limit");return}else DA.push(MA)||(k._pause=!0);DA.bytesRead=GA;},"onData"),FA=Q(function(){K=void 0,DA.push(null);},"onEnd");}else {if(Y===z)return R.hitFieldsLimit||(R.hitFieldsLimit=!0,R.emit("fieldsLimit")),D(EA);++Y,++Z;let DA="",MA=!1;G=EA,YA=Q(function(xA){if((GA+=xA.length)>iA){const $A=iA-(GA-xA.length);DA+=xA.toString("binary",0,$A),MA=!0,EA.removeAllListeners("data");}else DA+=xA.toString("binary");},"onData"),FA=Q(function(){G=void 0,DA.length&&(DA=n(DA,"binary",kA)),R.emit("field",oA,DA,!1,MA,fA,sA),--Z,J();},"onEnd");}EA._readableState.sync=!1,EA.on("data",YA),EA.on("end",FA);}).on("error",function(rA){K&&K.emit("error",rA);});},"onPart")).on("error",function(AA){R.emit("error",AA);}).on("finish",function(){q=!0,J();});}Q(f,"Multipart"),f.prototype.write=function(R,F){const p=this.parser.write(R);p&&!this._pause?F():(this._needDrain=!p,this._cb=F);},f.prototype.end=function(){const R=this;R.parser.writable?R.parser.end():R._boy._done||process.nextTick(function(){R._boy._done=!0,R._boy.emit("finish");});};function D(R){R.resume();}Q(D,"skipPart");function S(R){e.call(this,R),this.bytesRead=0,this.truncated=!1;}return Q(S,"FileStream"),A(S,e),S.prototype._read=function(R){},multipart=f,multipart}Q(requireMultipart,"requireMultipart");var Decoder_1,hasRequiredDecoder;function requireDecoder(){if(hasRequiredDecoder)return Decoder_1;hasRequiredDecoder=1;const e=/\+/g,A=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];function t(){this.buffer=void 0;}return Q(t,"Decoder"),t.prototype.write=function(r){r=r.replace(e," ");let n="",o=0,C=0;const l=r.length;for(;o<l;++o)this.buffer!==void 0?A[r.charCodeAt(o)]?(this.buffer+=r[o],++C,this.buffer.length===2&&(n+=String.fromCharCode(parseInt(this.buffer,16)),this.buffer=void 0)):(n+="%"+this.buffer,this.buffer=void 0,--o):r[o]==="%"&&(o>C&&(n+=r.substring(C,o),C=o),this.buffer="",++C);return C<l&&this.buffer===void 0&&(n+=r.substring(C)),n},t.prototype.reset=function(){this.buffer=void 0;},Decoder_1=t,Decoder_1}Q(requireDecoder,"requireDecoder");var urlencoded,hasRequiredUrlencoded;function requireUrlencoded(){if(hasRequiredUrlencoded)return urlencoded;hasRequiredUrlencoded=1;const e=requireDecoder(),A=requireDecodeText(),t=requireGetLimit(),r=/^charset$/i;n.detect=/^application\/x-www-form-urlencoded/i;function n(o,C){const l=C.limits,B=C.parsedConType;this.boy=o,this.fieldSizeLimit=t(l,"fieldSize",1*1024*1024),this.fieldNameSizeLimit=t(l,"fieldNameSize",100),this.fieldsLimit=t(l,"fields",1/0);let I;for(var c=0,y=B.length;c<y;++c)if(Array.isArray(B[c])&&r.test(B[c][0])){I=B[c][1].toLowerCase();break}I===void 0&&(I=C.defCharset||"utf8"),this.decoder=new e,this.charset=I,this._fields=0,this._state="key",this._checkingBytes=!0,this._bytesKey=0,this._bytesVal=0,this._key="",this._val="",this._keyTrunc=!1,this._valTrunc=!1,this._hitLimit=!1;}return Q(n,"UrlEncoded"),n.prototype.write=function(o,C){if(this._fields===this.fieldsLimit)return this.boy.hitFieldsLimit||(this.boy.hitFieldsLimit=!0,this.boy.emit("fieldsLimit")),C();let l,B,I,c=0;const y=o.length;for(;c<y;)if(this._state==="key"){for(l=B=void 0,I=c;I<y;++I){if(this._checkingBytes||++c,o[I]===61){l=I;break}else if(o[I]===38){B=I;break}if(this._checkingBytes&&this._bytesKey===this.fieldNameSizeLimit){this._hitLimit=!0;break}else this._checkingBytes&&++this._bytesKey;}if(l!==void 0)l>c&&(this._key+=this.decoder.write(o.toString("binary",c,l))),this._state="val",this._hitLimit=!1,this._checkingBytes=!0,this._val="",this._bytesVal=0,this._valTrunc=!1,this.decoder.reset(),c=l+1;else if(B!==void 0){++this._fields;let f;const D=this._keyTrunc;if(B>c?f=this._key+=this.decoder.write(o.toString("binary",c,B)):f=this._key,this._hitLimit=!1,this._checkingBytes=!0,this._key="",this._bytesKey=0,this._keyTrunc=!1,this.decoder.reset(),f.length&&this.boy.emit("field",A(f,"binary",this.charset),"",D,!1),c=B+1,this._fields===this.fieldsLimit)return C()}else this._hitLimit?(I>c&&(this._key+=this.decoder.write(o.toString("binary",c,I))),c=I,(this._bytesKey=this._key.length)===this.fieldNameSizeLimit&&(this._checkingBytes=!1,this._keyTrunc=!0)):(c<y&&(this._key+=this.decoder.write(o.toString("binary",c))),c=y);}else {for(B=void 0,I=c;I<y;++I){if(this._checkingBytes||++c,o[I]===38){B=I;break}if(this._checkingBytes&&this._bytesVal===this.fieldSizeLimit){this._hitLimit=!0;break}else this._checkingBytes&&++this._bytesVal;}if(B!==void 0){if(++this._fields,B>c&&(this._val+=this.decoder.write(o.toString("binary",c,B))),this.boy.emit("field",A(this._key,"binary",this.charset),A(this._val,"binary",this.charset),this._keyTrunc,this._valTrunc),this._state="key",this._hitLimit=!1,this._checkingBytes=!0,this._key="",this._bytesKey=0,this._keyTrunc=!1,this.decoder.reset(),c=B+1,this._fields===this.fieldsLimit)return C()}else this._hitLimit?(I>c&&(this._val+=this.decoder.write(o.toString("binary",c,I))),c=I,(this._val===""&&this.fieldSizeLimit===0||(this._bytesVal=this._val.length)===this.fieldSizeLimit)&&(this._checkingBytes=!1,this._valTrunc=!0)):(c<y&&(this._val+=this.decoder.write(o.toString("binary",c))),c=y);}C();},n.prototype.end=function(){this.boy._done||(this._state==="key"&&this._key.length>0?this.boy.emit("field",A(this._key,"binary",this.charset),"",this._keyTrunc,!1):this._state==="val"&&this.boy.emit("field",A(this._key,"binary",this.charset),A(this._val,"binary",this.charset),this._keyTrunc,this._valTrunc),this.boy._done=!0,this.boy.emit("finish"));},urlencoded=n,urlencoded}Q(requireUrlencoded,"requireUrlencoded");var hasRequiredMain;function requireMain(){if(hasRequiredMain)return main.exports;hasRequiredMain=1;const e=Stream__default.Writable,{inherits:A}=require$$1__default,t=requireDicer(),r=requireMultipart(),n=requireUrlencoded(),o=requireParseParams();function C(l){if(!(this instanceof C))return new C(l);if(typeof l!="object")throw new TypeError("Busboy expected an options-Object.");if(typeof l.headers!="object")throw new TypeError("Busboy expected an options-Object with headers-attribute.");if(typeof l.headers["content-type"]!="string")throw new TypeError("Missing Content-Type-header.");const{headers:B,...I}=l;this.opts={autoDestroy:!1,...I},e.call(this,this.opts),this._done=!1,this._parser=this.getParserByHeaders(B),this._finished=!1;}return Q(C,"Busboy"),A(C,e),C.prototype.emit=function(l){if(l==="finish"){if(this._done){if(this._finished)return}else {this._parser?.end();return}this._finished=!0;}e.prototype.emit.apply(this,arguments);},C.prototype.getParserByHeaders=function(l){const B=o(l["content-type"]),I={defCharset:this.opts.defCharset,fileHwm:this.opts.fileHwm,headers:l,highWaterMark:this.opts.highWaterMark,isPartAFile:this.opts.isPartAFile,limits:this.opts.limits,parsedConType:B,preservePath:this.opts.preservePath};if(r.detect.test(B[0]))return new r(this,I);if(n.detect.test(B[0]))return new n(this,I);throw new Error("Unsupported Content-Type.")},C.prototype._write=function(l,B,I){this._parser.write(l,I);},main.exports=C,main.exports.default=C,main.exports.Busboy=C,main.exports.Dicer=t,main.exports}Q(requireMain,"requireMain");var constants$4,hasRequiredConstants$3;function requireConstants$3(){if(hasRequiredConstants$3)return constants$4;hasRequiredConstants$3=1;const e=["GET","HEAD","POST"],A=new Set(e),t=[101,204,205,304],r=[301,302,303,307,308],n=new Set(r),o=["1","7","9","11","13","15","17","19","20","21","22","23","25","37","42","43","53","69","77","79","87","95","101","102","103","104","109","110","111","113","115","117","119","123","135","137","139","143","161","179","389","427","465","512","513","514","515","526","530","531","532","540","548","554","556","563","587","601","636","989","990","993","995","1719","1720","1723","2049","3659","4045","5060","5061","6000","6566","6665","6666","6667","6668","6669","6697","10080"],C=new Set(o),l=["","no-referrer","no-referrer-when-downgrade","same-origin","origin","strict-origin","origin-when-cross-origin","strict-origin-when-cross-origin","unsafe-url"],B=new Set(l),I=["follow","manual","error"],c=["GET","HEAD","OPTIONS","TRACE"],y=new Set(c),f=["navigate","same-origin","no-cors","cors"],D=["omit","same-origin","include"],S=["default","no-store","reload","no-cache","force-cache","only-if-cached"],R=["content-encoding","content-language","content-location","content-type","content-length"],F=["half"],p=["CONNECT","TRACE","TRACK"],m=new Set(p),k=["audio","audioworklet","font","image","manifest","paintworklet","script","style","track","video","xslt",""],w=new Set(k);return constants$4={subresource:k,forbiddenMethods:p,requestBodyHeader:R,referrerPolicy:l,requestRedirect:I,requestMode:f,requestCredentials:D,requestCache:S,redirectStatus:r,corsSafeListedMethods:e,nullBodyStatus:t,safeMethods:c,badPorts:o,requestDuplex:F,subresourceSet:w,badPortsSet:C,redirectStatusSet:n,corsSafeListedMethodsSet:A,safeMethodsSet:y,forbiddenMethodsSet:m,referrerPolicySet:B},constants$4}Q(requireConstants$3,"requireConstants$3");var global$1,hasRequiredGlobal;function requireGlobal(){if(hasRequiredGlobal)return global$1;hasRequiredGlobal=1;const e=Symbol.for("undici.globalOrigin.1");function A(){return globalThis[e]}Q(A,"getGlobalOrigin");function t(r){if(r===void 0){Object.defineProperty(globalThis,e,{value:void 0,writable:!0,enumerable:!1,configurable:!1});return}const n=new URL(r);if(n.protocol!=="http:"&&n.protocol!=="https:")throw new TypeError(`Only http & https urls are allowed, received ${n.protocol}`);Object.defineProperty(globalThis,e,{value:n,writable:!0,enumerable:!1,configurable:!1});}return Q(t,"setGlobalOrigin"),global$1={getGlobalOrigin:A,setGlobalOrigin:t},global$1}Q(requireGlobal,"requireGlobal");var dataURL,hasRequiredDataURL;function requireDataURL(){if(hasRequiredDataURL)return dataURL;hasRequiredDataURL=1;const e=require$$0__default,{isomorphicDecode:A}=requireUtil$4(),t=new TextEncoder,r=/^[!#$%&'*+-.^_|~A-Za-z0-9]+$/,n=/[\u000A|\u000D|\u0009|\u0020]/,o=/[\u0009\u000A\u000C\u000D\u0020]/g,C=/[\u0009|\u0020-\u007E|\u0080-\u00FF]/;function l(N){e(N.protocol==="data:");let U=B(N,!0);U=U.slice(5);const x={position:0};let v=c(",",U,x);const W=v.length;if(v=b(v,!0,!0),x.position>=U.length)return "failure";x.position++;const J=U.slice(W+1);let iA=y(J);if(/;(\u0020){0,}base64$/i.test(v)){const uA=A(iA);if(iA=R(uA),iA==="failure")return "failure";v=v.slice(0,-6),v=v.replace(/(\u0020)+$/,""),v=v.slice(0,-1);}v.startsWith(";")&&(v="text/plain"+v);let CA=S(v);return CA==="failure"&&(CA=S("text/plain;charset=US-ASCII")),{mimeType:CA,body:iA}}Q(l,"dataURLProcessor");function B(N,U=!1){if(!U)return N.href;const x=N.href,v=N.hash.length,W=v===0?x:x.substring(0,x.length-v);return !v&&x.endsWith("#")?W.slice(0,-1):W}Q(B,"URLSerializer");function I(N,U,x){let v="";for(;x.position<U.length&&N(U[x.position]);)v+=U[x.position],x.position++;return v}Q(I,"collectASequenceOfCodePoints");function c(N,U,x){const v=U.indexOf(N,x.position),W=x.position;return v===-1?(x.position=U.length,U.slice(W)):(x.position=v,U.slice(W,x.position))}Q(c,"collectASequenceOfCodePointsFast");function y(N){const U=t.encode(N);return D(U)}Q(y,"stringPercentDecode");function f(N){return N>=48&&N<=57||N>=65&&N<=70||N>=97&&N<=102}Q(f,"isHexCharByte");function D(N){const U=N.length,x=new Uint8Array(U);let v=0;for(let W=0;W<U;++W){const J=N[W];if(J!==37)x[v++]=J;else if(J===37&&!(f(N[W+1])&&f(N[W+2])))x[v++]=37;else {const iA=String.fromCharCode(N[W+1],N[W+2]),CA=Number.parseInt(iA,16);x[v++]=CA,W+=2;}}return U===v?x:x.subarray(0,v)}Q(D,"percentDecode");function S(N){N=k(N,!0,!0);const U={position:0},x=c("/",N,U);if(x.length===0||!r.test(x)||U.position>N.length)return "failure";U.position++;let v=c(";",N,U);if(v=k(v,!1,!0),v.length===0||!r.test(v))return "failure";const W=x.toLowerCase(),J=v.toLowerCase(),iA={type:W,subtype:J,parameters:new Map,essence:`${W}/${J}`};for(;U.position<N.length;){U.position++,I(z=>n.test(z),N,U);let CA=I(z=>z!==";"&&z!=="=",N,U);if(CA=CA.toLowerCase(),U.position<N.length){if(N[U.position]===";")continue;U.position++;}if(U.position>N.length)break;let uA=null;if(N[U.position]==='"')uA=F(N,U,!0),c(";",N,U);else if(uA=c(";",N,U),uA=k(uA,!1,!0),uA.length===0)continue;CA.length!==0&&r.test(CA)&&(uA.length===0||C.test(uA))&&!iA.parameters.has(CA)&&iA.parameters.set(CA,uA);}return iA}Q(S,"parseMIMEType");function R(N){N=N.replace(o,"");let U=N.length;if(U%4===0&&N.charCodeAt(U-1)===61&&(--U,N.charCodeAt(U-1)===61&&--U),U%4===1||/[^+/0-9A-Za-z]/.test(N.length===U?N:N.substring(0,U)))return "failure";const x=Buffer.from(N,"base64");return new Uint8Array(x.buffer,x.byteOffset,x.byteLength)}Q(R,"forgivingBase64");function F(N,U,x){const v=U.position;let W="";for(e(N[U.position]==='"'),U.position++;W+=I(iA=>iA!=='"'&&iA!=="\\",N,U),!(U.position>=N.length);){const J=N[U.position];if(U.position++,J==="\\"){if(U.position>=N.length){W+="\\";break}W+=N[U.position],U.position++;}else {e(J==='"');break}}return x?W:N.slice(v,U.position)}Q(F,"collectAnHTTPQuotedString");function p(N){e(N!=="failure");const{parameters:U,essence:x}=N;let v=x;for(let[W,J]of U.entries())v+=";",v+=W,v+="=",r.test(J)||(J=J.replace(/(\\|")/g,"\\$1"),J='"'+J,J+='"'),v+=J;return v}Q(p,"serializeAMimeType");function m(N){return N===13||N===10||N===9||N===32}Q(m,"isHTTPWhiteSpace");function k(N,U=!0,x=!0){let v=0,W=N.length;if(U)for(;W>v&&m(N.charCodeAt(v));)--v;if(x)for(;W>v&&m(N.charCodeAt(W-1));)--W;return v===0&&W===N.length?N:N.substring(v,W)}Q(k,"removeHTTPWhitespace");function w(N){return N===13||N===10||N===9||N===12||N===32}Q(w,"isASCIIWhitespace");function b(N,U=!0,x=!0){let v=0,W=N.length;if(U)for(;W>v&&w(N.charCodeAt(v));)--v;if(x)for(;W>v&&w(N.charCodeAt(W-1));)--W;return v===0&&W===N.length?N:N.substring(v,W)}return Q(b,"removeASCIIWhitespace"),dataURL={dataURLProcessor:l,URLSerializer:B,collectASequenceOfCodePoints:I,collectASequenceOfCodePointsFast:c,stringPercentDecode:y,parseMIMEType:S,collectAnHTTPQuotedString:F,serializeAMimeType:p},dataURL}Q(requireDataURL,"requireDataURL");var util$i,hasRequiredUtil$4;function requireUtil$4(){if(hasRequiredUtil$4)return util$i;hasRequiredUtil$4=1;const{redirectStatusSet:e,referrerPolicySet:A,badPortsSet:t}=requireConstants$3(),{getGlobalOrigin:r}=requireGlobal(),{performance:n}=require$$2__default$1,{isBlobLike:o,toUSVString:C,ReadableStreamFrom:l,isValidHTTPToken:B}=util$j,I=require$$0__default,{isUint8Array:c}=require$$5__default;let y;try{y=require("crypto");}catch{}function f(M){const eA=M.urlList,gA=eA.length;return gA===0?null:eA[gA-1].toString()}Q(f,"responseURL");function D(M,eA){if(!e.has(M.status))return null;let gA=M.headersList.get("location",!0);return gA!==null&&k(gA)&&(gA=new URL(gA,f(M))),gA&&!gA.hash&&(gA.hash=eA),gA}Q(D,"responseLocationURL");function S(M){return M.urlList[M.urlList.length-1]}Q(S,"requestCurrentURL");function R(M){const eA=S(M);return $A(eA)&&t.has(eA.port)?"blocked":"allowed"}Q(R,"requestBadPort");function F(M){return M instanceof Error||M?.constructor?.name==="Error"||M?.constructor?.name==="DOMException"}Q(F,"isErrorLike");function p(M){for(let eA=0;eA<M.length;++eA){const gA=M.charCodeAt(eA);if(!(gA===9||gA>=32&&gA<=126||gA>=128&&gA<=255))return !1}return !0}Q(p,"isValidReasonPhrase");function m(M){return B(M)}Q(m,"isValidHeaderName");function k(M){return !(M.startsWith("	")||M.startsWith(" ")||M.endsWith("	")||M.endsWith(" ")||M.includes("\0")||M.includes("\r")||M.includes(`
`))}Q(k,"isValidHeaderValue");function w(M,eA){const{headersList:gA}=eA,aA=(gA.get("referrer-policy",!0)??"").split(",");let yA="";if(aA.length>0)for(let NA=aA.length;NA!==0;NA--){const bA=aA[NA-1].trim();if(A.has(bA)){yA=bA;break}}yA!==""&&(M.referrerPolicy=yA);}Q(w,"setRequestReferrerPolicyOnRedirect");function b(){return "allowed"}Q(b,"crossOriginResourcePolicyCheck");function N(){return "success"}Q(N,"corsCheck");function U(){return "success"}Q(U,"TAOCheck");function x(M){let eA=null;eA=M.mode,M.headersList.set("sec-fetch-mode",eA,!0);}Q(x,"appendFetchMetadata");function v(M){let eA=M.origin;if(M.responseTainting==="cors"||M.mode==="websocket")eA&&M.headersList.append("origin",eA,!0);else if(M.method!=="GET"&&M.method!=="HEAD"){switch(M.referrerPolicy){case"no-referrer":eA=null;break;case"no-referrer-when-downgrade":case"strict-origin":case"strict-origin-when-cross-origin":M.origin&&xA(M.origin)&&!xA(S(M))&&(eA=null);break;case"same-origin":G(M,S(M))||(eA=null);break}eA&&M.headersList.append("origin",eA,!0);}}Q(v,"appendRequestOriginHeader");function W(M,eA){return M}Q(W,"coarsenTime");function J(M,eA,gA){return !M?.startTime||M.startTime<eA?{domainLookupStartTime:eA,domainLookupEndTime:eA,connectionStartTime:eA,connectionEndTime:eA,secureConnectionStartTime:eA,ALPNNegotiatedProtocol:M?.ALPNNegotiatedProtocol}:{domainLookupStartTime:W(M.domainLookupStartTime),domainLookupEndTime:W(M.domainLookupEndTime),connectionStartTime:W(M.connectionStartTime),connectionEndTime:W(M.connectionEndTime),secureConnectionStartTime:W(M.secureConnectionStartTime),ALPNNegotiatedProtocol:M.ALPNNegotiatedProtocol}}Q(J,"clampAndCoursenConnectionTimingInfo");function iA(M){return W(n.now())}Q(iA,"coarsenedSharedCurrentTime");function CA(M){return {startTime:M.startTime??0,redirectStartTime:0,redirectEndTime:0,postRedirectStartTime:M.startTime??0,finalServiceWorkerStartTime:0,finalNetworkResponseStartTime:0,finalNetworkRequestStartTime:0,endTime:0,encodedBodySize:0,decodedBodySize:0,finalConnectionTimingInfo:null}}Q(CA,"createOpaqueTimingInfo");function uA(){return {referrerPolicy:"strict-origin-when-cross-origin"}}Q(uA,"makePolicyContainer");function z(M){return {referrerPolicy:M.referrerPolicy}}Q(z,"clonePolicyContainer");function IA(M){const eA=M.referrerPolicy;I(eA);let gA=null;if(M.referrer==="client"){const HA=r();if(!HA||HA.origin==="null")return "no-referrer";gA=new URL(HA);}else M.referrer instanceof URL&&(gA=M.referrer);let aA=hA(gA);const yA=hA(gA,!0);aA.toString().length>4096&&(aA=yA);const NA=G(M,aA),bA=nA(aA)&&!nA(M.url);switch(eA){case"origin":return yA??hA(gA,!0);case"unsafe-url":return aA;case"same-origin":return NA?yA:"no-referrer";case"origin-when-cross-origin":return NA?aA:yA;case"strict-origin-when-cross-origin":{const HA=S(M);return G(aA,HA)?aA:nA(aA)&&!nA(HA)?"no-referrer":yA}case"strict-origin":case"no-referrer-when-downgrade":default:return bA?"no-referrer":yA}}Q(IA,"determineRequestsReferrer");function hA(M,eA){return I(M instanceof URL),M.protocol==="file:"||M.protocol==="about:"||M.protocol==="blank:"?"no-referrer":(M.username="",M.password="",M.hash="",eA&&(M.pathname="",M.search=""),M)}Q(hA,"stripURLForReferrer");function nA(M){if(!(M instanceof URL))return !1;if(M.href==="about:blank"||M.href==="about:srcdoc"||M.protocol==="data:"||M.protocol==="file:")return !0;return eA(M.origin);function eA(gA){if(gA==null||gA==="null")return !1;const aA=new URL(gA);return !!(aA.protocol==="https:"||aA.protocol==="wss:"||/^127(?:\.[0-9]+){0,2}\.[0-9]+$|^\[(?:0*:)*?:?0*1\]$/.test(aA.hostname)||aA.hostname==="localhost"||aA.hostname.includes("localhost.")||aA.hostname.endsWith(".localhost"))}}Q(nA,"isURLPotentiallyTrustworthy");function cA(M,eA){if(y===void 0)return !0;const gA=Z(eA);if(gA==="no metadata"||gA.length===0)return !0;const aA=gA.sort((bA,HA)=>HA.algo.localeCompare(bA.algo)),yA=aA[0].algo,NA=aA.filter(bA=>bA.algo===yA);for(const bA of NA){const HA=bA.algo;let SA=bA.hash;SA.endsWith("==")&&(SA=SA.slice(0,-2));let PA=y.createHash(HA).update(M).digest("base64");if(PA.endsWith("==")&&(PA=PA.slice(0,-2)),PA===SA)return !0;let Ae=y.createHash(HA).update(M).digest("base64url");if(Ae.endsWith("==")&&(Ae=Ae.slice(0,-2)),Ae===SA)return !0}return !1}Q(cA,"bytesMatch");const Y=/((?<algo>sha256|sha384|sha512)-(?<hash>[A-z0-9+/]{1}.*={0,2}))( +[\x21-\x7e]?)?/i;function Z(M){const eA=[];let gA=!0;const aA=y.getHashes();for(const yA of M.split(" ")){gA=!1;const NA=Y.exec(yA);if(NA===null||NA.groups===void 0)continue;const bA=NA.groups.algo;aA.includes(bA.toLowerCase())&&eA.push(NA.groups);}return gA===!0?"no metadata":eA}Q(Z,"parseMetadata");function K(M){}Q(K,"tryUpgradeRequestToAPotentiallyTrustworthyURL");function G(M,eA){return M.origin===eA.origin&&M.origin==="null"||M.protocol===eA.protocol&&M.hostname===eA.hostname&&M.port===eA.port}Q(G,"sameOrigin");function q(){let M,eA;return {promise:new Promise((aA,yA)=>{M=aA,eA=yA;}),resolve:M,reject:eA}}Q(q,"createDeferredPromise");function X(M){return M.controller.state==="aborted"}Q(X,"isAborted");function AA(M){return M.controller.state==="aborted"||M.controller.state==="terminated"}Q(AA,"isCancelled");const EA={delete:"DELETE",DELETE:"DELETE",get:"GET",GET:"GET",head:"HEAD",HEAD:"HEAD",options:"OPTIONS",OPTIONS:"OPTIONS",post:"POST",POST:"POST",put:"PUT",PUT:"PUT"};Object.setPrototypeOf(EA,null);function rA(M){return EA[M.toLowerCase()]??M}Q(rA,"normalizeMethod");function sA(M){const eA=JSON.stringify(M);if(eA===void 0)throw new TypeError("Value is not JSON serializable");return I(typeof eA=="string"),eA}Q(sA,"serializeJavascriptValueToJSONString");const oA=Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));function wA(M,eA,gA){const aA={index:0,kind:gA,target:M},yA={next(){if(Object.getPrototypeOf(this)!==yA)throw new TypeError(`'next' called on an object that does not implement interface ${eA} Iterator.`);const{index:NA,kind:bA,target:HA}=aA,SA=HA(),PA=SA.length;if(NA>=PA)return {value:void 0,done:!0};const Ae=SA[NA];return aA.index=NA+1,kA(Ae,bA)},[Symbol.toStringTag]:`${eA} Iterator`};return Object.setPrototypeOf(yA,oA),Object.setPrototypeOf({},yA)}Q(wA,"makeIterator");function kA(M,eA){let gA;switch(eA){case"key":{gA=M[0];break}case"value":{gA=M[1];break}case"key+value":{gA=M;break}}return {value:gA,done:!1}}Q(kA,"iteratorResult");async function fA(M,eA,gA){const aA=eA,yA=gA;let NA;try{NA=M.stream.getReader();}catch(bA){yA(bA);return}try{const bA=await DA(NA);aA(bA);}catch(bA){yA(bA);}}Q(fA,"fullyReadBody");function OA(M){return M instanceof ReadableStream||M[Symbol.toStringTag]==="ReadableStream"&&typeof M.tee=="function"}Q(OA,"isReadableStreamLike");function GA(M){const eA=M.length;if(65535>eA)return String.fromCharCode.apply(null,M);let gA="",aA=0,yA=65535;for(;aA<eA;)aA+yA>eA&&(yA=eA-aA),gA+=String.fromCharCode.apply(null,M.subarray(aA,aA+=yA));return gA}Q(GA,"isomorphicDecode");function YA(M){try{M.close(),M.byobRequest?.respond(0);}catch(eA){if(!eA.message.includes("Controller is already closed")&&!eA.message.includes("ReadableStream is already closed"))throw eA}}Q(YA,"readableStreamClose");function FA(M){for(let eA=0;eA<M.length;eA++)I(M.charCodeAt(eA)<=255);return M}Q(FA,"isomorphicEncode");async function DA(M){const eA=[];let gA=0;for(;;){const{done:aA,value:yA}=await M.read();if(aA)return Buffer.concat(eA,gA);if(!c(yA))throw new TypeError("Received non-Uint8Array chunk");eA.push(yA),gA+=yA.length;}}Q(DA,"readAllBytes");function MA(M){I("protocol"in M);const eA=M.protocol;return eA==="about:"||eA==="blob:"||eA==="data:"}Q(MA,"urlIsLocal");function xA(M){return typeof M=="string"?M.startsWith("https:"):M.protocol==="https:"}Q(xA,"urlHasHttpsScheme");function $A(M){I("protocol"in M);const eA=M.protocol;return eA==="http:"||eA==="https:"}Q($A,"urlIsHttpHttpsScheme");let _A;function RA(M,eA){_A??(_A=requireDataURL().collectASequenceOfCodePoints);const gA=M;if(!gA.startsWith("bytes"))return "failure";const aA={position:5};if(eA&&_A(SA=>SA==="	"||SA===" ",gA,aA),gA.charCodeAt(aA.position)!==61)return "failure";aA.position++,eA&&_A(SA=>SA==="	"||SA===" ",gA,aA);const yA=_A(SA=>{const PA=SA.charCodeAt(0);return PA>=48&&PA<=57},gA,aA),NA=yA.length?Number(yA):null;if(eA&&_A(SA=>SA==="	"||SA===" ",gA,aA),gA.charCodeAt(aA.position)!==45)return "failure";aA.position++,eA&&_A(SA=>SA==="	"||SA===" ",gA,aA);const bA=_A(SA=>{const PA=SA.charCodeAt(0);return PA>=48&&PA<=57},gA,aA),HA=bA.length?Number(bA):null;return aA.position<gA.length||HA===null&&NA===null||NA>HA?"failure":{rangeStartValue:NA,rangeEndValue:HA}}Q(RA,"simpleRangeHeaderValue");function mA(M,eA,gA){let aA="bytes ";return aA+=FA(`${M}`),aA+="-",aA+=FA(`${eA}`),aA+="/",aA+=FA(`${gA}`),aA}return Q(mA,"buildContentRange"),util$i={isAborted:X,isCancelled:AA,createDeferredPromise:q,ReadableStreamFrom:l,toUSVString:C,tryUpgradeRequestToAPotentiallyTrustworthyURL:K,clampAndCoursenConnectionTimingInfo:J,coarsenedSharedCurrentTime:iA,determineRequestsReferrer:IA,makePolicyContainer:uA,clonePolicyContainer:z,appendFetchMetadata:x,appendRequestOriginHeader:v,TAOCheck:U,corsCheck:N,crossOriginResourcePolicyCheck:b,createOpaqueTimingInfo:CA,setRequestReferrerPolicyOnRedirect:w,isValidHTTPToken:B,requestBadPort:R,requestCurrentURL:S,responseURL:f,responseLocationURL:D,isBlobLike:o,isURLPotentiallyTrustworthy:nA,isValidReasonPhrase:p,sameOrigin:G,normalizeMethod:rA,serializeJavascriptValueToJSONString:sA,makeIterator:wA,isValidHeaderName:m,isValidHeaderValue:k,isErrorLike:F,fullyReadBody:fA,bytesMatch:cA,isReadableStreamLike:OA,readableStreamClose:YA,isomorphicEncode:FA,isomorphicDecode:GA,urlIsLocal:MA,urlHasHttpsScheme:xA,urlIsHttpHttpsScheme:$A,readAllBytes:DA,normalizeMethodRecord:EA,simpleRangeHeaderValue:RA,buildContentRange:mA},util$i}Q(requireUtil$4,"requireUtil$4");var symbols$3,hasRequiredSymbols$3;function requireSymbols$3(){return hasRequiredSymbols$3||(hasRequiredSymbols$3=1,symbols$3={kUrl:Symbol("url"),kHeaders:Symbol("headers"),kSignal:Symbol("signal"),kState:Symbol("state"),kGuard:Symbol("guard"),kRealm:Symbol("realm")}),symbols$3}Q(requireSymbols$3,"requireSymbols$3");var webidl_1,hasRequiredWebidl;function requireWebidl(){if(hasRequiredWebidl)return webidl_1;hasRequiredWebidl=1;const{types:e}=require$$0__default$3,{toUSVString:A}=requireUtil$4(),t={};return t.converters={},t.util={},t.errors={},t.errors.exception=function(r){return new TypeError(`${r.header}: ${r.message}`)},t.errors.conversionFailed=function(r){const n=r.types.length===1?"":" one of",o=`${r.argument} could not be converted to${n}: ${r.types.join(", ")}.`;return t.errors.exception({header:r.prefix,message:o})},t.errors.invalidArgument=function(r){return t.errors.exception({header:r.prefix,message:`"${r.value}" is an invalid ${r.type}.`})},t.brandCheck=function(r,n,o=void 0){if(o?.strict!==!1&&!(r instanceof n))throw new TypeError("Illegal invocation");return r?.[Symbol.toStringTag]===n.prototype[Symbol.toStringTag]},t.argumentLengthCheck=function({length:r},n,o){if(r<n)throw t.errors.exception({message:`${n} argument${n!==1?"s":""} required, but${r?" only":""} ${r} found.`,...o})},t.illegalConstructor=function(){throw t.errors.exception({header:"TypeError",message:"Illegal constructor"})},t.util.Type=function(r){switch(typeof r){case"undefined":return "Undefined";case"boolean":return "Boolean";case"string":return "String";case"symbol":return "Symbol";case"number":return "Number";case"bigint":return "BigInt";case"function":case"object":return r===null?"Null":"Object"}},t.util.ConvertToInt=function(r,n,o,C={}){let l,B;n===64?(l=Math.pow(2,53)-1,o==="unsigned"?B=0:B=Math.pow(-2,53)+1):o==="unsigned"?(B=0,l=Math.pow(2,n)-1):(B=Math.pow(-2,n)-1,l=Math.pow(2,n-1)-1);let I=Number(r);if(I===0&&(I=0),C.enforceRange===!0){if(Number.isNaN(I)||I===Number.POSITIVE_INFINITY||I===Number.NEGATIVE_INFINITY)throw t.errors.exception({header:"Integer conversion",message:`Could not convert ${r} to an integer.`});if(I=t.util.IntegerPart(I),I<B||I>l)throw t.errors.exception({header:"Integer conversion",message:`Value must be between ${B}-${l}, got ${I}.`});return I}return !Number.isNaN(I)&&C.clamp===!0?(I=Math.min(Math.max(I,B),l),Math.floor(I)%2===0?I=Math.floor(I):I=Math.ceil(I),I):Number.isNaN(I)||I===0&&Object.is(0,I)||I===Number.POSITIVE_INFINITY||I===Number.NEGATIVE_INFINITY?0:(I=t.util.IntegerPart(I),I=I%Math.pow(2,n),o==="signed"&&I>=Math.pow(2,n)-1?I-Math.pow(2,n):I)},t.util.IntegerPart=function(r){const n=Math.floor(Math.abs(r));return r<0?-1*n:n},t.sequenceConverter=function(r){return n=>{if(t.util.Type(n)!=="Object")throw t.errors.exception({header:"Sequence",message:`Value of type ${t.util.Type(n)} is not an Object.`});const o=n?.[Symbol.iterator]?.(),C=[];if(o===void 0||typeof o.next!="function")throw t.errors.exception({header:"Sequence",message:"Object is not an iterator."});for(;;){const{done:l,value:B}=o.next();if(l)break;C.push(r(B));}return C}},t.recordConverter=function(r,n){return o=>{if(t.util.Type(o)!=="Object")throw t.errors.exception({header:"Record",message:`Value of type ${t.util.Type(o)} is not an Object.`});const C={};if(!e.isProxy(o)){const B=Object.keys(o);for(const I of B){const c=r(I),y=n(o[I]);C[c]=y;}return C}const l=Reflect.ownKeys(o);for(const B of l)if(Reflect.getOwnPropertyDescriptor(o,B)?.enumerable){const c=r(B),y=n(o[B]);C[c]=y;}return C}},t.interfaceConverter=function(r){return (n,o={})=>{if(o.strict!==!1&&!(n instanceof r))throw t.errors.exception({header:r.name,message:`Expected ${n} to be an instance of ${r.name}.`});return n}},t.dictionaryConverter=function(r){return n=>{const o=t.util.Type(n),C={};if(o==="Null"||o==="Undefined")return C;if(o!=="Object")throw t.errors.exception({header:"Dictionary",message:`Expected ${n} to be one of: Null, Undefined, Object.`});for(const l of r){const{key:B,defaultValue:I,required:c,converter:y}=l;if(c===!0&&!Object.hasOwn(n,B))throw t.errors.exception({header:"Dictionary",message:`Missing required key "${B}".`});let f=n[B];const D=Object.hasOwn(l,"defaultValue");if(D&&f!==null&&(f=f??I),c||D||f!==void 0){if(f=y(f),l.allowedValues&&!l.allowedValues.includes(f))throw t.errors.exception({header:"Dictionary",message:`${f} is not an accepted type. Expected one of ${l.allowedValues.join(", ")}.`});C[B]=f;}}return C}},t.nullableConverter=function(r){return n=>n===null?n:r(n)},t.converters.DOMString=function(r,n={}){if(r===null&&n.legacyNullToEmptyString)return "";if(typeof r=="symbol")throw new TypeError("Could not convert argument of type symbol to string.");return String(r)},t.converters.ByteString=function(r){const n=t.converters.DOMString(r);for(let o=0;o<n.length;o++)if(n.charCodeAt(o)>255)throw new TypeError(`Cannot convert argument to a ByteString because the character at index ${o} has a value of ${n.charCodeAt(o)} which is greater than 255.`);return n},t.converters.USVString=A,t.converters.boolean=function(r){return !!r},t.converters.any=function(r){return r},t.converters["long long"]=function(r){return t.util.ConvertToInt(r,64,"signed")},t.converters["unsigned long long"]=function(r){return t.util.ConvertToInt(r,64,"unsigned")},t.converters["unsigned long"]=function(r){return t.util.ConvertToInt(r,32,"unsigned")},t.converters["unsigned short"]=function(r,n){return t.util.ConvertToInt(r,16,"unsigned",n)},t.converters.ArrayBuffer=function(r,n={}){if(t.util.Type(r)!=="Object"||!e.isAnyArrayBuffer(r))throw t.errors.conversionFailed({prefix:`${r}`,argument:`${r}`,types:["ArrayBuffer"]});if(n.allowShared===!1&&e.isSharedArrayBuffer(r))throw t.errors.exception({header:"ArrayBuffer",message:"SharedArrayBuffer is not allowed."});return r},t.converters.TypedArray=function(r,n,o={}){if(t.util.Type(r)!=="Object"||!e.isTypedArray(r)||r.constructor.name!==n.name)throw t.errors.conversionFailed({prefix:`${n.name}`,argument:`${r}`,types:[n.name]});if(o.allowShared===!1&&e.isSharedArrayBuffer(r.buffer))throw t.errors.exception({header:"ArrayBuffer",message:"SharedArrayBuffer is not allowed."});return r},t.converters.DataView=function(r,n={}){if(t.util.Type(r)!=="Object"||!e.isDataView(r))throw t.errors.exception({header:"DataView",message:"Object is not a DataView."});if(n.allowShared===!1&&e.isSharedArrayBuffer(r.buffer))throw t.errors.exception({header:"ArrayBuffer",message:"SharedArrayBuffer is not allowed."});return r},t.converters.BufferSource=function(r,n={}){if(e.isAnyArrayBuffer(r))return t.converters.ArrayBuffer(r,n);if(e.isTypedArray(r))return t.converters.TypedArray(r,r.constructor);if(e.isDataView(r))return t.converters.DataView(r,n);throw new TypeError(`Could not convert ${r} to a BufferSource.`)},t.converters["sequence<ByteString>"]=t.sequenceConverter(t.converters.ByteString),t.converters["sequence<sequence<ByteString>>"]=t.sequenceConverter(t.converters["sequence<ByteString>"]),t.converters["record<ByteString, ByteString>"]=t.recordConverter(t.converters.ByteString,t.converters.ByteString),webidl_1={webidl:t},webidl_1}Q(requireWebidl,"requireWebidl");var file,hasRequiredFile;function requireFile(){if(hasRequiredFile)return file;hasRequiredFile=1;const{Blob:e,File:A}=require$$6__default,{types:t}=require$$0__default$3,{kState:r}=requireSymbols$3(),{isBlobLike:n}=requireUtil$4(),{webidl:o}=requireWebidl(),{parseMIMEType:C,serializeAMimeType:l}=requireDataURL(),{kEnumerableProperty:B}=util$j,I=new TextEncoder,R=class R extends e{constructor(m,k,w={}){o.argumentLengthCheck(arguments,2,{header:"File constructor"}),m=o.converters["sequence<BlobPart>"](m),k=o.converters.USVString(k),w=o.converters.FilePropertyBag(w);const b=k;let N=w.type,U;A:{if(N){if(N=C(N),N==="failure"){N="";break A}N=l(N).toLowerCase();}U=w.lastModified;}super(f(m,w),{type:N}),this[r]={name:b,lastModified:U,type:N};}get name(){return o.brandCheck(this,R),this[r].name}get lastModified(){return o.brandCheck(this,R),this[r].lastModified}get type(){return o.brandCheck(this,R),this[r].type}};Q(R,"File");let c=R;const F=class F{constructor(m,k,w={}){const b=k,N=w.type,U=w.lastModified??Date.now();this[r]={blobLike:m,name:b,type:N,lastModified:U};}stream(...m){return o.brandCheck(this,F),this[r].blobLike.stream(...m)}arrayBuffer(...m){return o.brandCheck(this,F),this[r].blobLike.arrayBuffer(...m)}slice(...m){return o.brandCheck(this,F),this[r].blobLike.slice(...m)}text(...m){return o.brandCheck(this,F),this[r].blobLike.text(...m)}get size(){return o.brandCheck(this,F),this[r].blobLike.size}get type(){return o.brandCheck(this,F),this[r].blobLike.type}get name(){return o.brandCheck(this,F),this[r].name}get lastModified(){return o.brandCheck(this,F),this[r].lastModified}get[Symbol.toStringTag](){return "File"}};Q(F,"FileLike");let y=F;Object.defineProperties(c.prototype,{[Symbol.toStringTag]:{value:"File",configurable:!0},name:B,lastModified:B}),o.converters.Blob=o.interfaceConverter(e),o.converters.BlobPart=function(p,m){if(o.util.Type(p)==="Object"){if(n(p))return o.converters.Blob(p,{strict:!1});if(ArrayBuffer.isView(p)||t.isAnyArrayBuffer(p))return o.converters.BufferSource(p,m)}return o.converters.USVString(p,m)},o.converters["sequence<BlobPart>"]=o.sequenceConverter(o.converters.BlobPart),o.converters.FilePropertyBag=o.dictionaryConverter([{key:"lastModified",converter:o.converters["long long"],get defaultValue(){return Date.now()}},{key:"type",converter:o.converters.DOMString,defaultValue:""},{key:"endings",converter:p=>(p=o.converters.DOMString(p),p=p.toLowerCase(),p!=="native"&&(p="transparent"),p),defaultValue:"transparent"}]);function f(p,m){const k=[];for(const w of p)if(typeof w=="string"){let b=w;m.endings==="native"&&(b=D(b)),k.push(I.encode(b));}else t.isAnyArrayBuffer(w)||t.isTypedArray(w)?w.buffer?k.push(new Uint8Array(w.buffer,w.byteOffset,w.byteLength)):k.push(new Uint8Array(w)):n(w)&&k.push(w);return k}Q(f,"processBlobParts");function D(p){let m=`
`;return process.platform==="win32"&&(m=`\r
`),p.replace(/\r?\n/g,m)}Q(D,"convertLineEndingsNative");function S(p){return A&&p instanceof A||p instanceof c||p&&(typeof p.stream=="function"||typeof p.arrayBuffer=="function")&&p[Symbol.toStringTag]==="File"}return Q(S,"isFileLike"),file={File:c,FileLike:y,isFileLike:S},file}Q(requireFile,"requireFile");var formdata,hasRequiredFormdata;function requireFormdata(){if(hasRequiredFormdata)return formdata;hasRequiredFormdata=1;const{isBlobLike:e,toUSVString:A,makeIterator:t}=requireUtil$4(),{kState:r}=requireSymbols$3(),{File:n,FileLike:o,isFileLike:C}=requireFile(),{webidl:l}=requireWebidl(),{Blob:B,File:I}=require$$6__default,c=I??n,D=class D{constructor(R){if(R!==void 0)throw l.errors.conversionFailed({prefix:"FormData constructor",argument:"Argument 1",types:["undefined"]});this[r]=[];}append(R,F,p=void 0){if(l.brandCheck(this,D),l.argumentLengthCheck(arguments,2,{header:"FormData.append"}),arguments.length===3&&!e(F))throw new TypeError("Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'");R=l.converters.USVString(R),F=e(F)?l.converters.Blob(F,{strict:!1}):l.converters.USVString(F),p=arguments.length===3?l.converters.USVString(p):void 0;const m=f(R,F,p);this[r].push(m);}delete(R){l.brandCheck(this,D),l.argumentLengthCheck(arguments,1,{header:"FormData.delete"}),R=l.converters.USVString(R),this[r]=this[r].filter(F=>F.name!==R);}get(R){l.brandCheck(this,D),l.argumentLengthCheck(arguments,1,{header:"FormData.get"}),R=l.converters.USVString(R);const F=this[r].findIndex(p=>p.name===R);return F===-1?null:this[r][F].value}getAll(R){return l.brandCheck(this,D),l.argumentLengthCheck(arguments,1,{header:"FormData.getAll"}),R=l.converters.USVString(R),this[r].filter(F=>F.name===R).map(F=>F.value)}has(R){return l.brandCheck(this,D),l.argumentLengthCheck(arguments,1,{header:"FormData.has"}),R=l.converters.USVString(R),this[r].findIndex(F=>F.name===R)!==-1}set(R,F,p=void 0){if(l.brandCheck(this,D),l.argumentLengthCheck(arguments,2,{header:"FormData.set"}),arguments.length===3&&!e(F))throw new TypeError("Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'");R=l.converters.USVString(R),F=e(F)?l.converters.Blob(F,{strict:!1}):l.converters.USVString(F),p=arguments.length===3?A(p):void 0;const m=f(R,F,p),k=this[r].findIndex(w=>w.name===R);k!==-1?this[r]=[...this[r].slice(0,k),m,...this[r].slice(k+1).filter(w=>w.name!==R)]:this[r].push(m);}entries(){return l.brandCheck(this,D),t(()=>this[r].map(R=>[R.name,R.value]),"FormData","key+value")}keys(){return l.brandCheck(this,D),t(()=>this[r].map(R=>[R.name,R.value]),"FormData","key")}values(){return l.brandCheck(this,D),t(()=>this[r].map(R=>[R.name,R.value]),"FormData","value")}forEach(R,F=globalThis){if(l.brandCheck(this,D),l.argumentLengthCheck(arguments,1,{header:"FormData.forEach"}),typeof R!="function")throw new TypeError("Failed to execute 'forEach' on 'FormData': parameter 1 is not of type 'Function'.");for(const[p,m]of this)R.apply(F,[m,p,this]);}};Q(D,"FormData");let y=D;y.prototype[Symbol.iterator]=y.prototype.entries,Object.defineProperties(y.prototype,{[Symbol.toStringTag]:{value:"FormData",configurable:!0}});function f(S,R,F){if(S=Buffer.from(S).toString("utf8"),typeof R=="string")R=Buffer.from(R).toString("utf8");else if(C(R)||(R=R instanceof B?new c([R],"blob",{type:R.type}):new o(R,"blob",{type:R.type})),F!==void 0){const p={type:R.type,lastModified:R.lastModified};R=I&&R instanceof I||R instanceof n?new c([R],F,p):new o(R,F,p);}return {name:S,value:R}}return Q(f,"makeEntry"),formdata={FormData:y},formdata}Q(requireFormdata,"requireFormdata");var body,hasRequiredBody;function requireBody(){if(hasRequiredBody)return body;hasRequiredBody=1;const e=requireMain(),A=util$j,{ReadableStreamFrom:t,isBlobLike:r,isReadableStreamLike:n,readableStreamClose:o,createDeferredPromise:C,fullyReadBody:l}=requireUtil$4(),{FormData:B}=requireFormdata(),{kState:I}=requireSymbols$3(),{webidl:c}=requireWebidl(),{Blob:y,File:f}=require$$6__default,{kBodyUsed:D}=symbols$4,S=require$$0__default,{isErrored:R}=util$j,{isUint8Array:F,isArrayBuffer:p}=require$$5__default,{File:m}=requireFile(),{parseMIMEType:k,serializeAMimeType:w}=requireDataURL(),b=f??m,N=new TextEncoder,U=new TextDecoder;function x(Y,Z=!1){let K=null;Y instanceof ReadableStream?K=Y:r(Y)?K=Y.stream():K=new ReadableStream({async pull(rA){const sA=typeof q=="string"?N.encode(q):q;sA.byteLength&&rA.enqueue(sA),queueMicrotask(()=>o(rA));},start(){},type:"bytes"}),S(n(K));let G=null,q=null,X=null,AA=null;if(typeof Y=="string")q=Y,AA="text/plain;charset=UTF-8";else if(Y instanceof URLSearchParams)q=Y.toString(),AA="application/x-www-form-urlencoded;charset=UTF-8";else if(p(Y))q=new Uint8Array(Y.slice());else if(ArrayBuffer.isView(Y))q=new Uint8Array(Y.buffer.slice(Y.byteOffset,Y.byteOffset+Y.byteLength));else if(A.isFormDataLike(Y)){const rA=`----formdata-undici-0${`${Math.floor(Math.random()*1e11)}`.padStart(11,"0")}`,sA=`--${rA}\r
Content-Disposition: form-data`;/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */const oA=Q(YA=>YA.replace(/\n/g,"%0A").replace(/\r/g,"%0D").replace(/"/g,"%22"),"escape"),wA=Q(YA=>YA.replace(/\r?\n|\r/g,`\r
`),"normalizeLinefeeds"),kA=[],fA=new Uint8Array([13,10]);X=0;let OA=!1;for(const[YA,FA]of Y)if(typeof FA=="string"){const DA=N.encode(sA+`; name="${oA(wA(YA))}"\r
\r
${wA(FA)}\r
`);kA.push(DA),X+=DA.byteLength;}else {const DA=N.encode(`${sA}; name="${oA(wA(YA))}"`+(FA.name?`; filename="${oA(FA.name)}"`:"")+`\r
Content-Type: ${FA.type||"application/octet-stream"}\r
\r
`);kA.push(DA,FA,fA),typeof FA.size=="number"?X+=DA.byteLength+FA.size+fA.byteLength:OA=!0;}const GA=N.encode(`--${rA}--`);kA.push(GA),X+=GA.byteLength,OA&&(X=null),q=Y,G=Q(async function*(){for(const YA of kA)YA.stream?yield*YA.stream():yield YA;},"action"),AA="multipart/form-data; boundary="+rA;}else if(r(Y))q=Y,X=Y.size,Y.type&&(AA=Y.type);else if(typeof Y[Symbol.asyncIterator]=="function"){if(Z)throw new TypeError("keepalive");if(A.isDisturbed(Y)||Y.locked)throw new TypeError("Response body object should not be disturbed or locked");K=Y instanceof ReadableStream?Y:t(Y);}if((typeof q=="string"||A.isBuffer(q))&&(X=Buffer.byteLength(q)),G!=null){let rA;K=new ReadableStream({async start(){rA=G(Y)[Symbol.asyncIterator]();},async pull(sA){const{value:oA,done:wA}=await rA.next();if(wA)queueMicrotask(()=>{sA.close(),sA.byobRequest?.respond(0);});else if(!R(K)){const kA=new Uint8Array(oA);kA.byteLength&&sA.enqueue(kA);}return sA.desiredSize>0},async cancel(sA){await rA.return();},type:"bytes"});}return [{stream:K,source:q,length:X},AA]}Q(x,"extractBody");function v(Y,Z=!1){return Y instanceof ReadableStream&&(S(!A.isDisturbed(Y),"The body has already been consumed."),S(!Y.locked,"The stream is locked.")),x(Y,Z)}Q(v,"safelyExtractBody");function W(Y){const[Z,K]=Y.stream.tee(),G=structuredClone(K,{transfer:[K]}),[,q]=G.tee();return Y.stream=Z,{stream:q,length:Y.length,source:Y.source}}Q(W,"cloneBody");async function*J(Y){if(Y)if(F(Y))yield Y;else {const Z=Y.stream;if(A.isDisturbed(Z))throw new TypeError("The body has already been consumed.");if(Z.locked)throw new TypeError("The stream is locked.");Z[D]=!0,yield*Z;}}Q(J,"consumeBody");function iA(Y){if(Y.aborted)throw new DOMException("The operation was aborted.","AbortError")}Q(iA,"throwIfAborted");function CA(Y){return {blob(){return z(this,K=>{let G=cA(this);return G==="failure"?G="":G&&(G=w(G)),new y([K],{type:G})},Y)},arrayBuffer(){return z(this,K=>new Uint8Array(K).buffer,Y)},text(){return z(this,hA,Y)},json(){return z(this,nA,Y)},async formData(){c.brandCheck(this,Y),iA(this[I]);const K=this.headers.get("Content-Type");if(/multipart\/form-data/.test(K)){const G={};for(const[EA,rA]of this.headers)G[EA]=rA;const q=new B;let X;try{X=new e({headers:G,preservePath:!0});}catch(EA){throw new DOMException(`${EA}`,"AbortError")}X.on("field",(EA,rA)=>{q.append(EA,rA);}),X.on("file",(EA,rA,sA,oA,wA)=>{const kA=[];if(oA==="base64"||oA.toLowerCase()==="base64"){let fA="";rA.on("data",OA=>{fA+=OA.toString().replace(/[\r\n]/gm,"");const GA=fA.length-fA.length%4;kA.push(Buffer.from(fA.slice(0,GA),"base64")),fA=fA.slice(GA);}),rA.on("end",()=>{kA.push(Buffer.from(fA,"base64")),q.append(EA,new b(kA,sA,{type:wA}));});}else rA.on("data",fA=>{kA.push(fA);}),rA.on("end",()=>{q.append(EA,new b(kA,sA,{type:wA}));});});const AA=new Promise((EA,rA)=>{X.on("finish",EA),X.on("error",sA=>rA(new TypeError(sA)));});if(this.body!==null)for await(const EA of J(this[I].body))X.write(EA);return X.end(),await AA,q}else if(/application\/x-www-form-urlencoded/.test(K)){let G;try{let X="";const AA=new TextDecoder("utf-8",{ignoreBOM:!0});for await(const EA of J(this[I].body)){if(!F(EA))throw new TypeError("Expected Uint8Array chunk");X+=AA.decode(EA,{stream:!0});}X+=AA.decode(),G=new URLSearchParams(X);}catch(X){throw Object.assign(new TypeError,{cause:X})}const q=new B;for(const[X,AA]of G)q.append(X,AA);return q}else throw await Promise.resolve(),iA(this[I]),c.errors.exception({header:`${Y.name}.formData`,message:"Could not parse content as FormData."})}}}Q(CA,"bodyMixinMethods");function uA(Y){Object.assign(Y.prototype,CA(Y));}Q(uA,"mixinBody");async function z(Y,Z,K){if(c.brandCheck(Y,K),iA(Y[I]),IA(Y[I].body))throw new TypeError("Body is unusable");const G=C(),q=Q(AA=>G.reject(AA),"errorSteps"),X=Q(AA=>{try{G.resolve(Z(AA));}catch(EA){q(EA);}},"successSteps");return Y[I].body==null?(X(new Uint8Array),G.promise):(await l(Y[I].body,X,q),G.promise)}Q(z,"specConsumeBody");function IA(Y){return Y!=null&&(Y.stream.locked||A.isDisturbed(Y.stream))}Q(IA,"bodyUnusable");function hA(Y){return Y.length===0?"":(Y[0]===239&&Y[1]===187&&Y[2]===191&&(Y=Y.subarray(3)),U.decode(Y))}Q(hA,"utf8DecodeBytes");function nA(Y){return JSON.parse(hA(Y))}Q(nA,"parseJSONFromBytes");function cA(Y){const{headersList:Z}=Y[I],K=Z.get("content-type");return K===null?"failure":k(K)}return Q(cA,"bodyMimeType"),body={extractBody:x,safelyExtractBody:v,cloneBody:W,mixinBody:uA},body}Q(requireBody,"requireBody");const{InvalidArgumentError:InvalidArgumentError$i,NotSupportedError:NotSupportedError$1}=errors$1,assert$7=require$$0__default,{kHTTP2BuildRequest:kHTTP2BuildRequest$1,kHTTP2CopyHeaders:kHTTP2CopyHeaders$1,kHTTP1BuildRequest:kHTTP1BuildRequest$1}=symbols$4,util$h=util$j,{headerNameLowerCasedRecord}=constants$5,headerCharRegex=/[^\t\x20-\x7e\x80-\xff]/,invalidPathRegex=/[^\u0021-\u00ff]/,kHandler=Symbol("handler"),channels$1={};let extractBody;try{const e=require("diagnostics_channel");channels$1.create=e.channel("undici:request:create"),channels$1.bodySent=e.channel("undici:request:bodySent"),channels$1.headers=e.channel("undici:request:headers"),channels$1.trailers=e.channel("undici:request:trailers"),channels$1.error=e.channel("undici:request:error");}catch{channels$1.create={hasSubscribers:!1},channels$1.bodySent={hasSubscribers:!1},channels$1.headers={hasSubscribers:!1},channels$1.trailers={hasSubscribers:!1},channels$1.error={hasSubscribers:!1};}let Request$1=(oe=class{constructor(A,{path:t,method:r,body:n,headers:o,query:C,idempotent:l,blocking:B,upgrade:I,headersTimeout:c,bodyTimeout:y,reset:f,throwOnError:D,expectContinue:S},R){if(typeof t!="string")throw new InvalidArgumentError$i("path must be a string");if(t[0]!=="/"&&!(t.startsWith("http://")||t.startsWith("https://"))&&r!=="CONNECT")throw new InvalidArgumentError$i("path must be an absolute URL or start with a slash");if(invalidPathRegex.exec(t)!==null)throw new InvalidArgumentError$i("invalid request path");if(typeof r!="string")throw new InvalidArgumentError$i("method must be a string");if(!util$h.isValidHTTPToken(r))throw new InvalidArgumentError$i("invalid request method");if(I&&typeof I!="string")throw new InvalidArgumentError$i("upgrade must be a string");if(c!=null&&(!Number.isFinite(c)||c<0))throw new InvalidArgumentError$i("invalid headersTimeout");if(y!=null&&(!Number.isFinite(y)||y<0))throw new InvalidArgumentError$i("invalid bodyTimeout");if(f!=null&&typeof f!="boolean")throw new InvalidArgumentError$i("invalid reset");if(S!=null&&typeof S!="boolean")throw new InvalidArgumentError$i("invalid expectContinue");if(this.headersTimeout=c,this.bodyTimeout=y,this.throwOnError=D===!0,this.method=r,this.abort=null,n==null)this.body=null;else if(util$h.isStream(n)){this.body=n;const F=this.body._readableState;(!F||!F.autoDestroy)&&(this.endHandler=Q(function(){util$h.destroy(this);},"autoDestroy"),this.body.on("end",this.endHandler)),this.errorHandler=p=>{this.abort?this.abort(p):this.error=p;},this.body.on("error",this.errorHandler);}else if(util$h.isBuffer(n))this.body=n.byteLength?n:null;else if(ArrayBuffer.isView(n))this.body=n.buffer.byteLength?Buffer.from(n.buffer,n.byteOffset,n.byteLength):null;else if(n instanceof ArrayBuffer)this.body=n.byteLength?Buffer.from(n):null;else if(typeof n=="string")this.body=n.length?Buffer.from(n):null;else if(util$h.isFormDataLike(n)||util$h.isIterable(n)||util$h.isBlobLike(n))this.body=n;else throw new InvalidArgumentError$i("body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable");if(this.completed=!1,this.aborted=!1,this.upgrade=I||null,this.path=C?util$h.buildURL(t,C):t,this.origin=A,this.idempotent=l??(r==="HEAD"||r==="GET"),this.blocking=B??!1,this.reset=f??null,this.host=null,this.contentLength=null,this.contentType=null,this.headers="",this.expectContinue=S??!1,Array.isArray(o)){if(o.length%2!==0)throw new InvalidArgumentError$i("headers array must be even");for(let F=0;F<o.length;F+=2)processHeader(this,o[F],o[F+1]);}else if(o&&typeof o=="object"){const F=Object.keys(o);for(let p=0;p<F.length;p++){const m=F[p];processHeader(this,m,o[m]);}}else if(o!=null)throw new InvalidArgumentError$i("headers must be an object or an array");if(util$h.isFormDataLike(this.body)){extractBody||(extractBody=requireBody().extractBody);const[F,p]=extractBody(n);this.contentType==null&&(this.contentType=p,this.headers+=`content-type: ${p}\r
`),this.body=F.stream,this.contentLength=F.length;}else util$h.isBlobLike(n)&&this.contentType==null&&n.type&&(this.contentType=n.type,this.headers+=`content-type: ${n.type}\r
`);util$h.validateHandler(R,r,I),this.servername=util$h.getServerName(this.host),this[kHandler]=R,channels$1.create.hasSubscribers&&channels$1.create.publish({request:this});}onBodySent(A){if(this[kHandler].onBodySent)try{return this[kHandler].onBodySent(A)}catch(t){this.abort(t);}}onRequestSent(){if(channels$1.bodySent.hasSubscribers&&channels$1.bodySent.publish({request:this}),this[kHandler].onRequestSent)try{return this[kHandler].onRequestSent()}catch(A){this.abort(A);}}onConnect(A){if(assert$7(!this.aborted),assert$7(!this.completed),this.error)A(this.error);else return this.abort=A,this[kHandler].onConnect(A)}onResponseStarted(){return this[kHandler].onResponseStarted?.()}onHeaders(A,t,r,n){assert$7(!this.aborted),assert$7(!this.completed),channels$1.headers.hasSubscribers&&channels$1.headers.publish({request:this,response:{statusCode:A,headers:t,statusText:n}});try{return this[kHandler].onHeaders(A,t,r,n)}catch(o){this.abort(o);}}onData(A){assert$7(!this.aborted),assert$7(!this.completed);try{return this[kHandler].onData(A)}catch(t){return this.abort(t),!1}}onUpgrade(A,t,r){return assert$7(!this.aborted),assert$7(!this.completed),this[kHandler].onUpgrade(A,t,r)}onComplete(A){this.onFinally(),assert$7(!this.aborted),this.completed=!0,channels$1.trailers.hasSubscribers&&channels$1.trailers.publish({request:this,trailers:A});try{return this[kHandler].onComplete(A)}catch(t){this.onError(t);}}onError(A){if(this.onFinally(),channels$1.error.hasSubscribers&&channels$1.error.publish({request:this,error:A}),!this.aborted)return this.aborted=!0,this[kHandler].onError(A)}onFinally(){this.errorHandler&&(this.body.off("error",this.errorHandler),this.errorHandler=null),this.endHandler&&(this.body.off("end",this.endHandler),this.endHandler=null);}addHeader(A,t){return processHeader(this,A,t),this}static[kHTTP1BuildRequest$1](A,t,r){return new oe(A,t,r)}static[kHTTP2BuildRequest$1](A,t,r){const n=t.headers;t={...t,headers:null};const o=new oe(A,t,r);if(o.headers={},Array.isArray(n)){if(n.length%2!==0)throw new InvalidArgumentError$i("headers array must be even");for(let C=0;C<n.length;C+=2)processHeader(o,n[C],n[C+1],!0);}else if(n&&typeof n=="object"){const C=Object.keys(n);for(let l=0;l<C.length;l++){const B=C[l];processHeader(o,B,n[B],!0);}}else if(n!=null)throw new InvalidArgumentError$i("headers must be an object or an array");return o}static[kHTTP2CopyHeaders$1](A){const t=A.split(`\r
`),r={};for(const n of t){const[o,C]=n.split(": ");C==null||C.length===0||(r[o]?r[o]+=`,${C}`:r[o]=C);}return r}},Q(oe,"Request"),oe);function processHeaderValue(e,A,t){if(A&&typeof A=="object")throw new InvalidArgumentError$i(`invalid ${e} header`);if(A=A!=null?`${A}`:"",headerCharRegex.exec(A)!==null)throw new InvalidArgumentError$i(`invalid ${e} header`);return t?A:`${e}: ${A}\r
`}Q(processHeaderValue,"processHeaderValue");function processHeader(e,A,t,r=!1){if(t&&typeof t=="object"&&!Array.isArray(t))throw new InvalidArgumentError$i(`invalid ${A} header`);if(t===void 0)return;let n=headerNameLowerCasedRecord[A];if(n===void 0&&(n=A.toLowerCase(),headerNameLowerCasedRecord[n]===void 0&&!util$h.isValidHTTPToken(n)))throw new InvalidArgumentError$i("invalid header key");if(e.host===null&&n==="host"){if(headerCharRegex.exec(t)!==null)throw new InvalidArgumentError$i(`invalid ${A} header`);e.host=t;}else if(e.contentLength===null&&n==="content-length"){if(e.contentLength=parseInt(t,10),!Number.isFinite(e.contentLength))throw new InvalidArgumentError$i("invalid content-length header")}else if(e.contentType===null&&n==="content-type")e.contentType=t,r?e.headers[A]=processHeaderValue(A,t,r):e.headers+=processHeaderValue(A,t);else {if(n==="transfer-encoding"||n==="keep-alive"||n==="upgrade")throw new InvalidArgumentError$i(`invalid ${n} header`);if(n==="connection"){const o=typeof t=="string"?t.toLowerCase():null;if(o!=="close"&&o!=="keep-alive")throw new InvalidArgumentError$i("invalid connection header");o==="close"&&(e.reset=!0);}else {if(n==="expect")throw new NotSupportedError$1("expect header not supported");if(Array.isArray(t))for(let o=0;o<t.length;o++)r?e.headers[A]?e.headers[A]+=`,${processHeaderValue(A,t[o],r)}`:e.headers[A]=processHeaderValue(A,t[o],r):e.headers+=processHeaderValue(A,t[o]);else r?e.headers[A]=processHeaderValue(A,t,r):e.headers+=processHeaderValue(A,t);}}}Q(processHeader,"processHeader");var request$2=Request$1;const EventEmitter=require$$0__default$5;let Dispatcher$2=(me=class extends EventEmitter{dispatch(){throw new Error("not implemented")}close(){throw new Error("not implemented")}destroy(){throw new Error("not implemented")}},Q(me,"Dispatcher"),me);var dispatcher=Dispatcher$2;const Dispatcher$1=dispatcher,{ClientDestroyedError:ClientDestroyedError$1,ClientClosedError,InvalidArgumentError:InvalidArgumentError$h}=errors$1,{kDestroy:kDestroy$4,kClose:kClose$6,kDispatch:kDispatch$3,kInterceptors:kInterceptors$4}=symbols$4,kDestroyed=Symbol("destroyed"),kClosed=Symbol("closed"),kOnDestroyed=Symbol("onDestroyed"),kOnClosed=Symbol("onClosed"),kInterceptedDispatch=Symbol("Intercepted Dispatch");let DispatcherBase$4=(Ue=class extends Dispatcher$1{constructor(){super(),this[kDestroyed]=!1,this[kOnDestroyed]=null,this[kClosed]=!1,this[kOnClosed]=[];}get destroyed(){return this[kDestroyed]}get closed(){return this[kClosed]}get interceptors(){return this[kInterceptors$4]}set interceptors(A){if(A){for(let t=A.length-1;t>=0;t--)if(typeof this[kInterceptors$4][t]!="function")throw new InvalidArgumentError$h("interceptor must be an function")}this[kInterceptors$4]=A;}close(A){if(A===void 0)return new Promise((r,n)=>{this.close((o,C)=>o?n(o):r(C));});if(typeof A!="function")throw new InvalidArgumentError$h("invalid callback");if(this[kDestroyed]){queueMicrotask(()=>A(new ClientDestroyedError$1,null));return}if(this[kClosed]){this[kOnClosed]?this[kOnClosed].push(A):queueMicrotask(()=>A(null,null));return}this[kClosed]=!0,this[kOnClosed].push(A);const t=Q(()=>{const r=this[kOnClosed];this[kOnClosed]=null;for(let n=0;n<r.length;n++)r[n](null,null);},"onClosed");this[kClose$6]().then(()=>this.destroy()).then(()=>{queueMicrotask(t);});}destroy(A,t){if(typeof A=="function"&&(t=A,A=null),t===void 0)return new Promise((n,o)=>{this.destroy(A,(C,l)=>C?o(C):n(l));});if(typeof t!="function")throw new InvalidArgumentError$h("invalid callback");if(this[kDestroyed]){this[kOnDestroyed]?this[kOnDestroyed].push(t):queueMicrotask(()=>t(null,null));return}A||(A=new ClientDestroyedError$1),this[kDestroyed]=!0,this[kOnDestroyed]=this[kOnDestroyed]||[],this[kOnDestroyed].push(t);const r=Q(()=>{const n=this[kOnDestroyed];this[kOnDestroyed]=null;for(let o=0;o<n.length;o++)n[o](null,null);},"onDestroyed");this[kDestroy$4](A).then(()=>{queueMicrotask(r);});}[kInterceptedDispatch](A,t){if(!this[kInterceptors$4]||this[kInterceptors$4].length===0)return this[kInterceptedDispatch]=this[kDispatch$3],this[kDispatch$3](A,t);let r=this[kDispatch$3].bind(this);for(let n=this[kInterceptors$4].length-1;n>=0;n--)r=this[kInterceptors$4][n](r);return this[kInterceptedDispatch]=r,r(A,t)}dispatch(A,t){if(!t||typeof t!="object")throw new InvalidArgumentError$h("handler must be an object");try{if(!A||typeof A!="object")throw new InvalidArgumentError$h("opts must be an object.");if(this[kDestroyed]||this[kOnDestroyed])throw new ClientDestroyedError$1;if(this[kClosed])throw new ClientClosedError;return this[kInterceptedDispatch](A,t)}catch(r){if(typeof t.onError!="function")throw new InvalidArgumentError$h("invalid onError method");return t.onError(r),!1}}},Q(Ue,"DispatcherBase"),Ue);var dispatcherBase=DispatcherBase$4;const net$3=require$$0__default$2,assert$6=require$$0__default,util$g=util$j,{InvalidArgumentError:InvalidArgumentError$g,ConnectTimeoutError}=errors$1;let tls$2,SessionCache;_commonjsHelpers.commonjsGlobal.FinalizationRegistry&&!(process.env.NODE_V8_COVERAGE||process.env.UNDICI_NO_FG)?SessionCache=(Le=class{constructor(A){this._maxCachedSessions=A,this._sessionCache=new Map,this._sessionRegistry=new _commonjsHelpers.commonjsGlobal.FinalizationRegistry(t=>{if(this._sessionCache.size<this._maxCachedSessions)return;const r=this._sessionCache.get(t);r!==void 0&&r.deref()===void 0&&this._sessionCache.delete(t);});}get(A){const t=this._sessionCache.get(A);return t?t.deref():null}set(A,t){this._maxCachedSessions!==0&&(this._sessionCache.set(A,new WeakRef(t)),this._sessionRegistry.register(t,A));}},Q(Le,"WeakSessionCache"),Le):SessionCache=(Me=class{constructor(A){this._maxCachedSessions=A,this._sessionCache=new Map;}get(A){return this._sessionCache.get(A)}set(A,t){if(this._maxCachedSessions!==0){if(this._sessionCache.size>=this._maxCachedSessions){const{value:r}=this._sessionCache.keys().next();this._sessionCache.delete(r);}this._sessionCache.set(A,t);}}},Q(Me,"SimpleSessionCache"),Me);function buildConnector$3({allowH2:e,maxCachedSessions:A,socketPath:t,timeout:r,...n}){if(A!=null&&(!Number.isInteger(A)||A<0))throw new InvalidArgumentError$g("maxCachedSessions must be a positive integer or zero");const o={path:t,...n},C=new SessionCache(A??100);return r=r??1e4,e=e??!1,Q(function({hostname:B,host:I,protocol:c,port:y,servername:f,localAddress:D,httpSocket:S},R){let F;if(c==="https:"){tls$2||(tls$2=require$$1__default$1),f=f||o.servername||util$g.getServerName(I)||null;const m=f||B,k=C.get(m)||null;assert$6(m),F=tls$2.connect({highWaterMark:16384,...o,servername:f,session:k,localAddress:D,ALPNProtocols:e?["http/1.1","h2"]:["http/1.1"],socket:S,port:y||443,host:B}),F.on("session",function(w){C.set(m,w);});}else assert$6(!S,"httpSocket can only be sent on TLS update"),F=net$3.connect({highWaterMark:64*1024,...o,localAddress:D,port:y||80,host:B});if(o.keepAlive==null||o.keepAlive){const m=o.keepAliveInitialDelay===void 0?6e4:o.keepAliveInitialDelay;F.setKeepAlive(!0,m);}const p=setupTimeout(()=>onConnectTimeout(F),r);return F.setNoDelay(!0).once(c==="https:"?"secureConnect":"connect",function(){if(p(),R){const m=R;R=null,m(null,this);}}).on("error",function(m){if(p(),R){const k=R;R=null,k(m);}}),F},"connect")}Q(buildConnector$3,"buildConnector$3");function setupTimeout(e,A){if(!A)return ()=>{};let t=null,r=null;const n=setTimeout(()=>{t=setImmediate(()=>{process.platform==="win32"?r=setImmediate(()=>e()):e();});},A);return ()=>{clearTimeout(n),clearImmediate(t),clearImmediate(r);}}Q(setupTimeout,"setupTimeout");function onConnectTimeout(e){let A="Connect Timeout Error";Array.isArray(e.autoSelectFamilyAttemptedAddresses)&&(A=+` (attempted addresses: ${e.autoSelectFamilyAttemptedAddresses.join(", ")})`),util$g.destroy(e,new ConnectTimeoutError(A));}Q(onConnectTimeout,"onConnectTimeout");var connect$2=buildConnector$3,constants$3={},utils={},hasRequiredUtils;function requireUtils(){if(hasRequiredUtils)return utils;hasRequiredUtils=1,Object.defineProperty(utils,"__esModule",{value:!0}),utils.enumToMap=void 0;function e(A){const t={};return Object.keys(A).forEach(r=>{const n=A[r];typeof n=="number"&&(t[r]=n);}),t}return Q(e,"enumToMap"),utils.enumToMap=e,utils}Q(requireUtils,"requireUtils");var hasRequiredConstants$2;function requireConstants$2(){return hasRequiredConstants$2||(hasRequiredConstants$2=1,function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.SPECIAL_HEADERS=e.HEADER_STATE=e.MINOR=e.MAJOR=e.CONNECTION_TOKEN_CHARS=e.HEADER_CHARS=e.TOKEN=e.STRICT_TOKEN=e.HEX=e.URL_CHAR=e.STRICT_URL_CHAR=e.USERINFO_CHARS=e.MARK=e.ALPHANUM=e.NUM=e.HEX_MAP=e.NUM_MAP=e.ALPHA=e.FINISH=e.H_METHOD_MAP=e.METHOD_MAP=e.METHODS_RTSP=e.METHODS_ICE=e.METHODS_HTTP=e.METHODS=e.LENIENT_FLAGS=e.FLAGS=e.TYPE=e.ERROR=void 0;const A=requireUtils();((function(n){n[n.OK=0]="OK",n[n.INTERNAL=1]="INTERNAL",n[n.STRICT=2]="STRICT",n[n.LF_EXPECTED=3]="LF_EXPECTED",n[n.UNEXPECTED_CONTENT_LENGTH=4]="UNEXPECTED_CONTENT_LENGTH",n[n.CLOSED_CONNECTION=5]="CLOSED_CONNECTION",n[n.INVALID_METHOD=6]="INVALID_METHOD",n[n.INVALID_URL=7]="INVALID_URL",n[n.INVALID_CONSTANT=8]="INVALID_CONSTANT",n[n.INVALID_VERSION=9]="INVALID_VERSION",n[n.INVALID_HEADER_TOKEN=10]="INVALID_HEADER_TOKEN",n[n.INVALID_CONTENT_LENGTH=11]="INVALID_CONTENT_LENGTH",n[n.INVALID_CHUNK_SIZE=12]="INVALID_CHUNK_SIZE",n[n.INVALID_STATUS=13]="INVALID_STATUS",n[n.INVALID_EOF_STATE=14]="INVALID_EOF_STATE",n[n.INVALID_TRANSFER_ENCODING=15]="INVALID_TRANSFER_ENCODING",n[n.CB_MESSAGE_BEGIN=16]="CB_MESSAGE_BEGIN",n[n.CB_HEADERS_COMPLETE=17]="CB_HEADERS_COMPLETE",n[n.CB_MESSAGE_COMPLETE=18]="CB_MESSAGE_COMPLETE",n[n.CB_CHUNK_HEADER=19]="CB_CHUNK_HEADER",n[n.CB_CHUNK_COMPLETE=20]="CB_CHUNK_COMPLETE",n[n.PAUSED=21]="PAUSED",n[n.PAUSED_UPGRADE=22]="PAUSED_UPGRADE",n[n.PAUSED_H2_UPGRADE=23]="PAUSED_H2_UPGRADE",n[n.USER=24]="USER";}))(e.ERROR||(e.ERROR={})),function(n){n[n.BOTH=0]="BOTH",n[n.REQUEST=1]="REQUEST",n[n.RESPONSE=2]="RESPONSE";}(e.TYPE||(e.TYPE={})),function(n){n[n.CONNECTION_KEEP_ALIVE=1]="CONNECTION_KEEP_ALIVE",n[n.CONNECTION_CLOSE=2]="CONNECTION_CLOSE",n[n.CONNECTION_UPGRADE=4]="CONNECTION_UPGRADE",n[n.CHUNKED=8]="CHUNKED",n[n.UPGRADE=16]="UPGRADE",n[n.CONTENT_LENGTH=32]="CONTENT_LENGTH",n[n.SKIPBODY=64]="SKIPBODY",n[n.TRAILING=128]="TRAILING",n[n.TRANSFER_ENCODING=512]="TRANSFER_ENCODING";}(e.FLAGS||(e.FLAGS={})),function(n){n[n.HEADERS=1]="HEADERS",n[n.CHUNKED_LENGTH=2]="CHUNKED_LENGTH",n[n.KEEP_ALIVE=4]="KEEP_ALIVE";}(e.LENIENT_FLAGS||(e.LENIENT_FLAGS={}));var t;((function(n){n[n.DELETE=0]="DELETE",n[n.GET=1]="GET",n[n.HEAD=2]="HEAD",n[n.POST=3]="POST",n[n.PUT=4]="PUT",n[n.CONNECT=5]="CONNECT",n[n.OPTIONS=6]="OPTIONS",n[n.TRACE=7]="TRACE",n[n.COPY=8]="COPY",n[n.LOCK=9]="LOCK",n[n.MKCOL=10]="MKCOL",n[n.MOVE=11]="MOVE",n[n.PROPFIND=12]="PROPFIND",n[n.PROPPATCH=13]="PROPPATCH",n[n.SEARCH=14]="SEARCH",n[n.UNLOCK=15]="UNLOCK",n[n.BIND=16]="BIND",n[n.REBIND=17]="REBIND",n[n.UNBIND=18]="UNBIND",n[n.ACL=19]="ACL",n[n.REPORT=20]="REPORT",n[n.MKACTIVITY=21]="MKACTIVITY",n[n.CHECKOUT=22]="CHECKOUT",n[n.MERGE=23]="MERGE",n[n["M-SEARCH"]=24]="M-SEARCH",n[n.NOTIFY=25]="NOTIFY",n[n.SUBSCRIBE=26]="SUBSCRIBE",n[n.UNSUBSCRIBE=27]="UNSUBSCRIBE",n[n.PATCH=28]="PATCH",n[n.PURGE=29]="PURGE",n[n.MKCALENDAR=30]="MKCALENDAR",n[n.LINK=31]="LINK",n[n.UNLINK=32]="UNLINK",n[n.SOURCE=33]="SOURCE",n[n.PRI=34]="PRI",n[n.DESCRIBE=35]="DESCRIBE",n[n.ANNOUNCE=36]="ANNOUNCE",n[n.SETUP=37]="SETUP",n[n.PLAY=38]="PLAY",n[n.PAUSE=39]="PAUSE",n[n.TEARDOWN=40]="TEARDOWN",n[n.GET_PARAMETER=41]="GET_PARAMETER",n[n.SET_PARAMETER=42]="SET_PARAMETER",n[n.REDIRECT=43]="REDIRECT",n[n.RECORD=44]="RECORD",n[n.FLUSH=45]="FLUSH";}))(t=e.METHODS||(e.METHODS={})),e.METHODS_HTTP=[t.DELETE,t.GET,t.HEAD,t.POST,t.PUT,t.CONNECT,t.OPTIONS,t.TRACE,t.COPY,t.LOCK,t.MKCOL,t.MOVE,t.PROPFIND,t.PROPPATCH,t.SEARCH,t.UNLOCK,t.BIND,t.REBIND,t.UNBIND,t.ACL,t.REPORT,t.MKACTIVITY,t.CHECKOUT,t.MERGE,t["M-SEARCH"],t.NOTIFY,t.SUBSCRIBE,t.UNSUBSCRIBE,t.PATCH,t.PURGE,t.MKCALENDAR,t.LINK,t.UNLINK,t.PRI,t.SOURCE],e.METHODS_ICE=[t.SOURCE],e.METHODS_RTSP=[t.OPTIONS,t.DESCRIBE,t.ANNOUNCE,t.SETUP,t.PLAY,t.PAUSE,t.TEARDOWN,t.GET_PARAMETER,t.SET_PARAMETER,t.REDIRECT,t.RECORD,t.FLUSH,t.GET,t.POST],e.METHOD_MAP=A.enumToMap(t),e.H_METHOD_MAP={},Object.keys(e.METHOD_MAP).forEach(n=>{/^H/.test(n)&&(e.H_METHOD_MAP[n]=e.METHOD_MAP[n]);}),function(n){n[n.SAFE=0]="SAFE",n[n.SAFE_WITH_CB=1]="SAFE_WITH_CB",n[n.UNSAFE=2]="UNSAFE";}(e.FINISH||(e.FINISH={})),e.ALPHA=[];for(let n=65;n<=90;n++)e.ALPHA.push(String.fromCharCode(n)),e.ALPHA.push(String.fromCharCode(n+32));e.NUM_MAP={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9},e.HEX_MAP={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},e.NUM=["0","1","2","3","4","5","6","7","8","9"],e.ALPHANUM=e.ALPHA.concat(e.NUM),e.MARK=["-","_",".","!","~","*","'","(",")"],e.USERINFO_CHARS=e.ALPHANUM.concat(e.MARK).concat(["%",";",":","&","=","+","$",","]),e.STRICT_URL_CHAR=["!",'"',"$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","@","[","\\","]","^","_","`","{","|","}","~"].concat(e.ALPHANUM),e.URL_CHAR=e.STRICT_URL_CHAR.concat(["	","\f"]);for(let n=128;n<=255;n++)e.URL_CHAR.push(n);e.HEX=e.NUM.concat(["a","b","c","d","e","f","A","B","C","D","E","F"]),e.STRICT_TOKEN=["!","#","$","%","&","'","*","+","-",".","^","_","`","|","~"].concat(e.ALPHANUM),e.TOKEN=e.STRICT_TOKEN.concat([" "]),e.HEADER_CHARS=["	"];for(let n=32;n<=255;n++)n!==127&&e.HEADER_CHARS.push(n);e.CONNECTION_TOKEN_CHARS=e.HEADER_CHARS.filter(n=>n!==44),e.MAJOR=e.NUM_MAP,e.MINOR=e.MAJOR;var r;((function(n){n[n.GENERAL=0]="GENERAL",n[n.CONNECTION=1]="CONNECTION",n[n.CONTENT_LENGTH=2]="CONTENT_LENGTH",n[n.TRANSFER_ENCODING=3]="TRANSFER_ENCODING",n[n.UPGRADE=4]="UPGRADE",n[n.CONNECTION_KEEP_ALIVE=5]="CONNECTION_KEEP_ALIVE",n[n.CONNECTION_CLOSE=6]="CONNECTION_CLOSE",n[n.CONNECTION_UPGRADE=7]="CONNECTION_UPGRADE",n[n.TRANSFER_ENCODING_CHUNKED=8]="TRANSFER_ENCODING_CHUNKED";}))(r=e.HEADER_STATE||(e.HEADER_STATE={})),e.SPECIAL_HEADERS={connection:r.CONNECTION,"content-length":r.CONTENT_LENGTH,"proxy-connection":r.CONNECTION,"transfer-encoding":r.TRANSFER_ENCODING,upgrade:r.UPGRADE};}(constants$3)),constants$3}Q(requireConstants$2,"requireConstants$2");const util$f=util$j,{kBodyUsed}=symbols$4,assert$5=require$$0__default,{InvalidArgumentError:InvalidArgumentError$f}=errors$1,EE=require$$0__default$5,redirectableStatusCodes=[300,301,302,303,307,308],kBody$1=Symbol("body"),ot=class ot{constructor(A){this[kBody$1]=A,this[kBodyUsed]=!1;}async*[Symbol.asyncIterator](){assert$5(!this[kBodyUsed],"disturbed"),this[kBodyUsed]=!0,yield*this[kBody$1];}};Q(ot,"BodyAsyncIterable");let BodyAsyncIterable=ot,RedirectHandler$1=(Ye=class{constructor(A,t,r,n){if(t!=null&&(!Number.isInteger(t)||t<0))throw new InvalidArgumentError$f("maxRedirections must be a positive number");util$f.validateHandler(n,r.method,r.upgrade),this.dispatch=A,this.location=null,this.abort=null,this.opts={...r,maxRedirections:0},this.maxRedirections=t,this.handler=n,this.history=[],util$f.isStream(this.opts.body)?(util$f.bodyLength(this.opts.body)===0&&this.opts.body.on("data",function(){assert$5(!1);}),typeof this.opts.body.readableDidRead!="boolean"&&(this.opts.body[kBodyUsed]=!1,EE.prototype.on.call(this.opts.body,"data",function(){this[kBodyUsed]=!0;}))):this.opts.body&&typeof this.opts.body.pipeTo=="function"?this.opts.body=new BodyAsyncIterable(this.opts.body):this.opts.body&&typeof this.opts.body!="string"&&!ArrayBuffer.isView(this.opts.body)&&util$f.isIterable(this.opts.body)&&(this.opts.body=new BodyAsyncIterable(this.opts.body));}onConnect(A){this.abort=A,this.handler.onConnect(A,{history:this.history});}onUpgrade(A,t,r){this.handler.onUpgrade(A,t,r);}onError(A){this.handler.onError(A);}onHeaders(A,t,r,n){if(this.location=this.history.length>=this.maxRedirections||util$f.isDisturbed(this.opts.body)?null:parseLocation(A,t),this.opts.origin&&this.history.push(new URL(this.opts.path,this.opts.origin)),!this.location)return this.handler.onHeaders(A,t,r,n);const{origin:o,pathname:C,search:l}=util$f.parseURL(new URL(this.location,this.opts.origin&&new URL(this.opts.path,this.opts.origin))),B=l?`${C}${l}`:C;this.opts.headers=cleanRequestHeaders(this.opts.headers,A===303,this.opts.origin!==o),this.opts.path=B,this.opts.origin=o,this.opts.maxRedirections=0,this.opts.query=null,A===303&&this.opts.method!=="HEAD"&&(this.opts.method="GET",this.opts.body=null);}onData(A){if(!this.location)return this.handler.onData(A)}onComplete(A){this.location?(this.location=null,this.abort=null,this.dispatch(this.opts,this)):this.handler.onComplete(A);}onBodySent(A){this.handler.onBodySent&&this.handler.onBodySent(A);}},Q(Ye,"RedirectHandler"),Ye);function parseLocation(e,A){if(redirectableStatusCodes.indexOf(e)===-1)return null;for(let t=0;t<A.length;t+=2)if(A[t].length===8&&util$f.headerNameToString(A[t])==="location")return A[t+1]}Q(parseLocation,"parseLocation");function shouldRemoveHeader(e,A,t){if(e.length===4)return util$f.headerNameToString(e)==="host";if(A&&util$f.headerNameToString(e).startsWith("content-"))return !0;if(t&&(e.length===13||e.length===6)){const r=util$f.headerNameToString(e);return r==="authorization"||r==="cookie"}return !1}Q(shouldRemoveHeader,"shouldRemoveHeader");function cleanRequestHeaders(e,A,t){const r=[];if(Array.isArray(e))for(let n=0;n<e.length;n+=2)shouldRemoveHeader(e[n],A,t)||r.push(e[n],e[n+1]);else if(e&&typeof e=="object")for(const n of Object.keys(e))shouldRemoveHeader(n,A,t)||r.push(n,e[n]);else assert$5(e==null,"headers must be an object or an array");return r}Q(cleanRequestHeaders,"cleanRequestHeaders");var RedirectHandler_1=RedirectHandler$1;const RedirectHandler=RedirectHandler_1;function createRedirectInterceptor$2({maxRedirections:e}){return A=>Q(function(r,n){const{maxRedirections:o=e}=r;if(!o)return A(r,n);const C=new RedirectHandler(A,o,r,n);return r={...r,maxRedirections:0},A(r,C)},"Intercept")}Q(createRedirectInterceptor$2,"createRedirectInterceptor$2");var redirectInterceptor=createRedirectInterceptor$2,llhttpWasm,hasRequiredLlhttpWasm;function requireLlhttpWasm(){return hasRequiredLlhttpWasm||(hasRequiredLlhttpWasm=1,llhttpWasm="AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAA0ZFAwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAAGBgYGAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAwABBAUBcAESEgUDAQACBggBfwFBgNQECwfRBSIGbWVtb3J5AgALX2luaXRpYWxpemUACRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQAChhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUAQQxsbGh0dHBfYWxsb2MADAZtYWxsb2MARgtsbGh0dHBfZnJlZQANBGZyZWUASA9sbGh0dHBfZ2V0X3R5cGUADhVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADxVsbGh0dHBfZ2V0X2h0dHBfbWlub3IAEBFsbGh0dHBfZ2V0X21ldGhvZAARFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAEhJsbGh0dHBfZ2V0X3VwZ3JhZGUAEwxsbGh0dHBfcmVzZXQAFA5sbGh0dHBfZXhlY3V0ZQAVFGxsaHR0cF9zZXR0aW5nc19pbml0ABYNbGxodHRwX2ZpbmlzaAAXDGxsaHR0cF9wYXVzZQAYDWxsaHR0cF9yZXN1bWUAGRtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGhBsbGh0dHBfZ2V0X2Vycm5vABsXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AHBdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAdFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB4RbGxodHRwX2Vycm5vX25hbWUAHxJsbGh0dHBfbWV0aG9kX25hbWUAIBJs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ADcDACAAQShqQgA3AwAgAEEgakIANwMAIABBEGpCADcDACAAQQhqQgA3AwAgAEHdATYCHEEAC3sBAX8CQCAAKAIMIgMNAAJAIAAoAgRFDQAgACABNgIECwJAIAAgASACEMSAgIAAIgMNACAAKAIMDwsgACADNgIcQQAhAyAAKAIEIgFFDQAgACABIAIgACgCCBGBgICAAAAiAUUNACAAIAI2AhQgACABNgIMIAEhAwsgAwvk8wEDDn8DfgR/I4CAgIAAQRBrIgMkgICAgAAgASEEIAEhBSABIQYgASEHIAEhCCABIQkgASEKIAEhCyABIQwgASENIAEhDiABIQ8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgACgCHCIQQX9qDt0B2gEB2QECAwQFBgcICQoLDA0O2AEPENcBERLWARMUFRYXGBkaG+AB3wEcHR7VAR8gISIjJCXUASYnKCkqKyzTAdIBLS7RAdABLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVG2wFHSElKzwHOAUvNAUzMAU1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4ABgQGCAYMBhAGFAYYBhwGIAYkB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QAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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FCAAIBA2AgxBACEQDLIBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQp4CAgAAiEA0AIAEhAQxNCyAAQdMANgIcIAAgATYCFCAAIBA2AgxBACEQDLEBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQp4CAgAAiEA0AIAEhAQxRCyAAQeUANgIcIAAgATYCFCAAIBA2AgxBACEQDLABCyAAQQA2AhwgACABNgIUIABBxoqAgAA2AhAgAEEHNgIMQQAhEAyvAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMSQsgAEHSADYCHCAAIAE2AhQgACAQNgIMQQAhEAyuAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMSQsgAEHTADYCHCAAIAE2AhQgACAQNgIMQQAhEAytAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMTQsgAEHlADYCHCAAIAE2AhQgACAQNgIMQQAhEAysAQsgAEEANgIcIAAgATYCFCAAQdyIgIAANgIQIABBBzYCDEEAIRAMqwELIBBBP0cNASABQQFqIQELQQUhEAyQAQtBACEQIABBADYCHCAAIAE2AhQgAEH9koCAADYCECAAQQc2AgwMqAELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEILIABB0gA2AhwgACABNgIUIAAgEDYCDEEAIRAMpwELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEILIABB0wA2AhwgACABNgIUIAAgEDYCDEEAIRAMpgELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEYLIABB5QA2AhwgACABNgIUIAAgEDYCDEEAIRAMpQELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDD8LIABB0gA2AhwgACAUNgIUIAAgATYCDEEAIRAMpAELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDD8LIABB0wA2AhwgACAUNgIUIAAgATYCDEEAIRAMowELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDEMLIABB5QA2AhwgACAU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YWdlX2JlZ2luYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlYCBjYWxsYmFjayBlcnJvcgBgb25fc3RhdHVzX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdmVyc2lvbl9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3VybF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21ldGhvZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lYCBjYWxsYmFjayBlcnJvcgBVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNlcnZlcgBJbnZhbGlkIGhlYWRlciB2YWx1ZSBjaGFyAEludmFsaWQgaGVhZGVyIGZpZWxkIGNoYXIAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl92ZXJzaW9uAEludmFsaWQgbWlub3IgdmVyc2lvbgBJbnZhbGlkIG1ham9yIHZlcnNpb24ARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgdmVyc2lvbgBFeHBlY3RlZCBDUkxGIGFmdGVyIHZlcnNpb24ASW52YWxpZCBIVFRQIHZlcnNpb24ASW52YWxpZCBoZWFkZXIgdG9rZW4AU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl91cmwASW52YWxpZCBjaGFyYWN0ZXJzIGluIHVybABVbmV4cGVjdGVkIHN0YXJ0IGNoYXIgaW4gdXJsAERvdWJsZSBAIGluIHVybABFbXB0eSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXJhY3RlciBpbiBDb250ZW50LUxlbmd0aABEdXBsaWNhdGUgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyIGluIHVybCBwYXRoAENvbnRlbnQtTGVuZ3RoIGNhbid0IGJlIHByZXNlbnQgd2l0aCBUcmFuc2Zlci1FbmNvZGluZwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBzaXplAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX3ZhbHVlAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgdmFsdWUATWlzc2luZyBleHBlY3RlZCBMRiBhZnRlciBoZWFkZXIgdmFsdWUASW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHF1b3RlIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGVkIHZhbHVlAFBhdXNlZCBieSBvbl9oZWFkZXJzX2NvbXBsZXRlAEludmFsaWQgRU9GIHN0YXRlAG9uX3Jlc2V0IHBhdXNlAG9uX2NodW5rX2hlYWRlciBwYXVzZQBvbl9tZXNzYWdlX2JlZ2luIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZSBwYXVzZQBvbl9zdGF0dXNfY29tcGxldGUgcGF1c2UAb25fdmVyc2lvbl9jb21wbGV0ZSBwYXVzZQBvbl91cmxfY29tcGxldGUgcGF1c2UAb25fY2h1bmtfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlIHBhdXNlAG9uX21lc3NhZ2VfY29tcGxldGUgcGF1c2UAb25fbWV0aG9kX2NvbXBsZXRlIHBhdXNlAG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19leHRlbnNpb25fbmFtZSBwYXVzZQBVbmV4cGVjdGVkIHNwYWNlIGFmdGVyIHN0YXJ0IGxpbmUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fbmFtZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIG5hbWUAUGF1c2Ugb24gQ09OTkVDVC9VcGdyYWRlAFBhdXNlIG9uIFBSSS9VcGdyYWRlAEV4cGVjdGVkIEhUVFAvMiBDb25uZWN0aW9uIFByZWZhY2UAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9tZXRob2QARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgbWV0aG9kAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX2ZpZWxkAFBhdXNlZABJbnZhbGlkIHdvcmQgZW5jb3VudGVyZWQASW52YWxpZCBtZXRob2QgZW5jb3VudGVyZWQAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzY2hlbWEAUmVxdWVzdCBoYXMgaW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgAFNXSVRDSF9QUk9YWQBVU0VfUFJPWFkATUtBQ1RJVklUWQBVTlBST0NFU1NBQkxFX0VOVElUWQBDT1BZAE1PVkVEX1BFUk1BTkVOVExZAFRPT19FQVJMWQBOT1RJRlkARkFJTEVEX0RFUEVOREVOQ1kAQkFEX0dBVEVXQVkAUExBWQBQVVQAQ0hFQ0tPVVQAR0FURVdBWV9USU1FT1VUAFJFUVVFU1RfVElNRU9VVABORVRXT1JLX0NPTk5FQ1RfVElNRU9VVABDT05ORUNUSU9OX1RJTUVPVVQATE9HSU5fVElNRU9VVABORVRXT1JLX1JFQURfVElNRU9VVABQT1NUAE1JU0RJUkVDVEVEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9SRVFVRVNUAENMSUVOVF9DTE9TRURfTE9BRF9CQUxBTkNFRF9SRVFVRVNUAEJBRF9SRVFVRVNUAEhUVFBfUkVRVUVTVF9TRU5UX1RPX0hUVFBTX1BPUlQAUkVQT1JUAElNX0FfVEVBUE9UAFJFU0VUX0NPTlRFTlQATk9fQ09OVEVOVABQQVJUSUFMX0NPTlRFTlQASFBFX0lOVkFMSURfQ09OU1RBTlQASFBFX0NCX1JFU0VUAEdFVABIUEVfU1RSSUNUAENPTkZMSUNUAFRFTVBPUkFSWV9SRURJUkVDVABQRVJNQU5FTlRfUkVESVJFQ1QAQ09OTkVDVABNVUxUSV9TVEFUVVMASFBFX0lOVkFMSURfU1RBVFVTAFRPT19NQU5ZX1JFUVVFU1RTAEVBUkxZX0hJTlRTAFVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TAE9QVElPTlMAU1dJVENISU5HX1BST1RPQ09MUwBWQVJJQU5UX0FMU09fTkVHT1RJQVRFUwBNVUxUSVBMRV9DSE9JQ0VTAElOVEVSTkFMX1NFUlZFUl9FUlJPUgBXRUJfU0VSVkVSX1VOS05PV05fRVJST1IAUkFJTEdVTl9FUlJPUgBJREVOVElUWV9QUk9WSURFUl9BVVRIRU5USUNBVElPTl9FUlJPUgBTU0xfQ0VSVElGSUNBVEVfRVJST1IASU5WQUxJRF9YX0ZPUldBUkRFRF9GT1IAU0VUX1BBUkFNRVRFUgBHRVRfUEFSQU1FVEVSAEhQRV9VU0VSAFNFRV9PVEhFUgBIUEVfQ0JfQ0hVTktfSEVBREVSAE1LQ0FMRU5EQVIAU0VUVVAAV0VCX1NFUlZFUl9JU19ET1dOAFRFQVJET1dOAEhQRV9DTE9TRURfQ09OTkVDVElPTgBIRVVSSVNUSUNfRVhQSVJBVElPTgBESVNDT05ORUNURURfT1BFUkFUSU9OAE5PTl9BVVRIT1JJVEFUSVZFX0lORk9STUFUSU9OAEhQRV9JTlZBTElEX1ZFUlNJT04ASFBFX0NCX01FU1NBR0VfQkVHSU4AU0lURV9JU19GUk9aRU4ASFBFX0lOVkFMSURfSEVBREVSX1RPS0VOAElOVkFMSURfVE9LRU4ARk9SQklEREVOAEVOSEFOQ0VfWU9VUl9DQUxNAEhQRV9JTlZBTElEX1VSTABCTE9DS0VEX0JZX1BBUkVOVEFMX0NPTlRST0wATUtDT0wAQUNMAEhQRV9JTlRFUk5BTABSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFX1VOT0ZGSUNJQUwASFBFX09LAFVOTElOSwBVTkxPQ0sAUFJJAFJFVFJZX1dJVEgASFBFX0lOVkFMSURfQ09OVEVOVF9MRU5HVEgASFBFX1VORVhQRUNURURfQ09OVEVOVF9MRU5HVEgARkxVU0gAUFJPUFBBVENIAE0tU0VBUkNIAFVSSV9UT09fTE9ORwBQUk9DRVNTSU5HAE1JU0NFTExBTkVPVVNfUEVSU0lTVEVOVF9XQVJOSU5HAE1JU0NFTExBTkVPVVNfV0FSTklORwBIUEVfSU5WQUxJRF9UUkFOU0ZFUl9FTkNPRElORwBFeHBlY3RlZCBDUkxGAEhQRV9JTlZBTElEX0NIVU5LX1NJWkUATU9WRQBDT05USU5VRQBIUEVfQ0JfU1RBVFVTX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJTX0NPTVBMRVRFAEhQRV9DQl9WRVJTSU9OX0NPTVBMRVRFAEhQRV9DQl9VUkxfQ09NUExFVEUASFBFX0NCX0NIVU5LX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfVkFMVUVfQ09NUExFVEUASFBFX0NCX0NIVU5LX0VYVEVOU0lPTl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX05BTUVfQ09NUExFVEUASFBFX0NCX01FU1NBR0VfQ09NUExFVEUASFBFX0NCX01FVEhPRF9DT01QTEVURQBIUEVfQ0JfSEVBREVSX0ZJRUxEX0NPTVBMRVRFAERFTEVURQBIUEVfSU5WQUxJRF9FT0ZfU1RBVEUASU5WQUxJRF9TU0xfQ0VSVElGSUNBVEUAUEFVU0UATk9fUkVTUE9OU0UAVU5TVVBQT1JURURfTUVESUFfVFlQRQBHT05FAE5PVF9BQ0NFUFRBQkxFAFNFUlZJQ0VfVU5BVkFJTEFCTEUAUkFOR0VfTk9UX1NBVElTRklBQkxFAE9SSUdJTl9JU19VTlJFQUNIQUJMRQBSRVNQT05TRV9JU19TVEFMRQBQVVJHRQBNRVJHRQBSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFAFJFUVVFU1RfSEVBREVSX1RPT19MQVJHRQBQQVlMT0FEX1RPT19MQVJHRQBJTlNVRkZJQ0lFTlRfU1RPUkFHRQBIUEVfUEFVU0VEX1VQR1JBREUASFBFX1BBVVNFRF9IMl9VUEdSQURFAFNPVVJDRQBBTk5PVU5DRQBUUkFDRQBIUEVfVU5FWFBFQ1RFRF9TUEFDRQBERVNDUklCRQBVTlNVQlNDUklCRQBSRUNPUkQASFBFX0lOVkFMSURfTUVUSE9EAE5PVF9GT1VORABQUk9QRklORABVTkJJTkQAUkVCSU5EAFVOQVVUSE9SSVpFRABNRVRIT0RfTk9UX0FMTE9XRUQASFRUUF9WRVJTSU9OX05PVF9TVVBQT1JURUQAQUxSRUFEWV9SRVBPUlRFRABBQ0NFUFRFRABOT1RfSU1QTEVNRU5URUQATE9PUF9ERVRFQ1RFRABIUEVfQ1JfRVhQRUNURUQASFBFX0xGX0VYUEVDVEVEAENSRUFURUQASU1fVVNFRABIUEVfUEFVU0VEAFRJTUVPVVRfT0NDVVJFRABQQVlNRU5UX1JFUVVJUkVEAFBSRUNPTkRJVElPTl9SRVFVSVJFRABQUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRABORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAExFTkdUSF9SRVFVSVJFRABTU0xfQ0VSVElGSUNBVEVfUkVRVUlSRUQAVVBHUkFERV9SRVFVSVJFRABQQUdFX0VYUElSRUQAUFJFQ09ORElUSU9OX0ZBSUxFRABFWFBFQ1RBVElPTl9GQUlMRUQAUkVWQUxJREFUSU9OX0ZBSUxFRABTU0xfSEFORFNIQUtFX0ZBSUxFRABMT0NLRUQAVFJBTlNGT1JNQVRJT05fQVBQTElFRABOT1RfTU9ESUZJRUQATk9UX0VYVEVOREVEAEJBTkRXSURUSF9MSU1JVF9FWENFRURFRABTSVRFX0lTX09WRVJMT0FERUQASEVBRABFeHBlY3RlZCBIVFRQLwAAXhMAACYTAAAwEAAA8BcAAJ0TAAAVEgAAORcAAPASAAAKEAAAdRIAAK0SAACCEwAATxQAAH8QAACgFQAAIxQAAIkSAACLFAAATRUAANQRAADPFAAAEBgAAMkWAADcFgAAwREAAOAXAAC7FAAAdBQAAHwVAADlFAAACBcAAB8QAABlFQAAoxQAACgVAAACFQAAmRUAACwQAACLGQAATw8AANQOAABqEAAAzhAAAAIXAACJDgAAbhMAABwTAABmFAAAVhcAAMETAADNEwAAbBMAAGgXAABmFwAAXxcAACITAADODwAAaQ4AANgOAABjFgAAyxMAAKoOAAAoFwAAJhcAAMUTAABdFgAA6BEAAGcTAABlEwAA8hYAAHMTAAAdFwAA+RYAAPMRAADPDgAAzhUAAAwSAACzEQAApREAAGEQAAAyFwAAuxMAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAIDAgICAgIAAAICAAICAAICAgICAgICAgIABAAAAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAACAAICAgICAAACAgACAgACAgICAgICAgICAAMABAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbG9zZWVlcC1hbGl2ZQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBY2h1bmtlZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEAAAEBAAEBAAEBAQEBAQEBAQEAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABlY3Rpb25lbnQtbGVuZ3Rob25yb3h5LWNvbm5lY3Rpb24AAAAAAAAAAAAAAAAAAAByYW5zZmVyLWVuY29kaW5ncGdyYWRlDQoNCg0KU00NCg0KVFRQL0NFL1RTUC8AAAAAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQIAAQMAAAAAAAAAAAAAAAAAAAAAAAAEAQEFAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAQAAAgAAAAAAAAAAAAAAAAAAAAAAAAMEAAAEBAQEBAQEBAQEBAUEBAQEBAQEBAQEBAQABAAGBwQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAIAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOT1VOQ0VFQ0tPVVRORUNURVRFQ1JJQkVMVVNIRVRFQURTRUFSQ0hSR0VDVElWSVRZTEVOREFSVkVPVElGWVBUSU9OU0NIU0VBWVNUQVRDSEdFT1JESVJFQ1RPUlRSQ0hQQVJBTUVURVJVUkNFQlNDUklCRUFSRE9XTkFDRUlORE5LQ0tVQlNDUklCRUhUVFAvQURUUC8="),llhttpWasm}Q(requireLlhttpWasm,"requireLlhttpWasm");var llhttp_simdWasm,hasRequiredLlhttp_simdWasm;function requireLlhttp_simdWasm(){return hasRequiredLlhttp_simdWasm||(hasRequiredLlhttp_simdWasm=1,llhttp_simdWasm="AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAA0ZFAwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAAGBgYGAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAwABBAUBcAESEgUDAQACBggBfwFBgNQECwfRBSIGbWVtb3J5AgALX2luaXRpYWxpemUACRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQAChhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUAQQxsbGh0dHBfYWxsb2MADAZtYWxsb2MARgtsbGh0dHBfZnJlZQANBGZyZWUASA9sbGh0dHBfZ2V0X3R5cGUADhVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADxVsbGh0dHBfZ2V0X2h0dHBfbWlub3IAEBFsbGh0dHBfZ2V0X21ldGhvZAARFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAEhJsbGh0dHBfZ2V0X3VwZ3JhZGUAEwxsbGh0dHBfcmVzZXQAFA5sbGh0dHBfZXhlY3V0ZQAVFGxsaHR0cF9zZXR0aW5nc19pbml0ABYNbGxodHRwX2ZpbmlzaAAXDGxsaHR0cF9wYXVzZQAYDWxsaHR0cF9yZXN1bWUAGRtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGhBsbGh0dHBfZ2V0X2Vycm5vABsXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AHBdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAdFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB4RbGxodHRwX2Vycm5vX25hbWUAHxJsbGh0dHBfbWV0aG9kX25hbWUAIBJs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IAH9CwMAIABBMGogAf0LAwAgAEEgaiAB/QsDACAAQd0BNgIcQQALewEBfwJAIAAoAgwiAw0AAkAgACgCBEUNACAAIAE2AgQLAkAgACABIAIQxICAgAAiAw0AIAAoAgwPCyAAIAM2AhxBACEDIAAoAgQiAUUNACAAIAEgAiAAKAIIEYGAgIAAACIBRQ0AIAAgAjYCFCAAIAE2AgwgASEDCyADC+TzAQMOfwN+BH8jgICAgABBEGsiAySAgICAACABIQQgASEFIAEhBiABIQcgASEIIAEhCSABIQogASELIAEhDCABIQ0gASEOIAEhDwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAKAIcIhBBf2oO3QHaAQHZAQIDBAUGBwgJCgsMDQ7YAQ8Q1wEREtYBExQVFhcYGRob4AHfARwdHtUBHyAhIiMkJdQBJicoKSorLNMB0gEtLtEB0AEvMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUbbAUdISUrPAc4BS80BTMwBTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gAGBAYIBgwGEAYUBhgGHAYgBiQGKAYsBjAGNAY4BjwGQAZEB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QAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIBAOxwEAAQID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YWNrIGVycm9yAGBvbl9jaHVua19leHRlbnNpb25fdmFsdWVgIGNhbGxiYWNrIGVycm9yAGBvbl9zdGF0dXNfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl92ZXJzaW9uX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdXJsX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXNzYWdlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWV0aG9kX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX25hbWVgIGNhbGxiYWNrIGVycm9yAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2VydmVyAEludmFsaWQgaGVhZGVyIHZhbHVlIGNoYXIASW52YWxpZCBoZWFkZXIgZmllbGQgY2hhcgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3ZlcnNpb24ASW52YWxpZCBtaW5vciB2ZXJzaW9uAEludmFsaWQgbWFqb3IgdmVyc2lvbgBFeHBlY3RlZCBzcGFjZSBhZnRlciB2ZXJzaW9uAEV4cGVjdGVkIENSTEYgYWZ0ZXIgdmVyc2lvbgBJbnZhbGlkIEhUVFAgdmVyc2lvbgBJbnZhbGlkIGhlYWRlciB0b2tlbgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3VybABJbnZhbGlkIGNoYXJhY3RlcnMgaW4gdXJsAFVuZXhwZWN0ZWQgc3RhcnQgY2hhciBpbiB1cmwARG91YmxlIEAgaW4gdXJsAEVtcHR5IENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhcmFjdGVyIGluIENvbnRlbnQtTGVuZ3RoAER1cGxpY2F0ZSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXIgaW4gdXJsIHBhdGgAQ29udGVudC1MZW5ndGggY2FuJ3QgYmUgcHJlc2VudCB3aXRoIFRyYW5zZmVyLUVuY29kaW5nAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHNpemUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfdmFsdWUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyB2YWx1ZQBNaXNzaW5nIGV4cGVjdGVkIExGIGFmdGVyIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AgaGVhZGVyIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGUgdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBxdW90ZWQgdmFsdWUAUGF1c2VkIGJ5IG9uX2hlYWRlcnNfY29tcGxldGUASW52YWxpZCBFT0Ygc3RhdGUAb25fcmVzZXQgcGF1c2UAb25fY2h1bmtfaGVhZGVyIHBhdXNlAG9uX21lc3NhZ2VfYmVnaW4gcGF1c2UAb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlIHBhdXNlAG9uX3N0YXR1c19jb21wbGV0ZSBwYXVzZQBvbl92ZXJzaW9uX2NvbXBsZXRlIHBhdXNlAG9uX3VybF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19jb21wbGV0ZSBwYXVzZQBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGUgcGF1c2UAb25fbWVzc2FnZV9jb21wbGV0ZSBwYXVzZQBvbl9tZXRob2RfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lIHBhdXNlAFVuZXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgc3RhcnQgbGluZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgbmFtZQBQYXVzZSBvbiBDT05ORUNUL1VwZ3JhZGUAUGF1c2Ugb24gUFJJL1VwZ3JhZGUARXhwZWN0ZWQgSFRUUC8yIENvbm5lY3Rpb24gUHJlZmFjZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX21ldGhvZABFeHBlY3RlZCBzcGFjZSBhZnRlciBtZXRob2QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfZmllbGQAUGF1c2VkAEludmFsaWQgd29yZCBlbmNvdW50ZXJlZABJbnZhbGlkIG1ldGhvZCBlbmNvdW50ZXJlZABVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNjaGVtYQBSZXF1ZXN0IGhhcyBpbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AAU1dJVENIX1BST1hZAFVTRV9QUk9YWQBNS0FDVElWSVRZAFVOUFJPQ0VTU0FCTEVfRU5USVRZAENPUFkATU9WRURfUEVSTUFORU5UTFkAVE9PX0VBUkxZAE5PVElGWQBGQUlMRURfREVQRU5ERU5DWQBCQURfR0FURVdBWQBQTEFZAFBVVABDSEVDS09VVABHQVRFV0FZX1RJTUVPVVQAUkVRVUVTVF9USU1FT1VUAE5FVFdPUktfQ09OTkVDVF9USU1FT1VUAENPTk5FQ1RJT05fVElNRU9VVABMT0dJTl9USU1FT1VUAE5FVFdPUktfUkVBRF9USU1FT1VUAFBPU1QATUlTRElSRUNURURfUkVRVUVTVABDTElFTlRfQ0xPU0VEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9MT0FEX0JBTEFOQ0VEX1JFUVVFU1QAQkFEX1JFUVVFU1QASFRUUF9SRVFVRVNUX1NFTlRfVE9fSFRUUFNfUE9SVABSRVBPUlQASU1fQV9URUFQT1QAUkVTRVRfQ09OVEVOVABOT19DT05URU5UAFBBUlRJQUxfQ09OVEVOVABIUEVfSU5WQUxJRF9DT05TVEFOVABIUEVfQ0JfUkVTRVQAR0VUAEhQRV9TVFJJQ1QAQ09ORkxJQ1QAVEVNUE9SQVJZX1JFRElSRUNUAFBFUk1BTkVOVF9SRURJUkVDVABDT05ORUNUAE1VTFRJX1NUQVRVUwBIUEVfSU5WQUxJRF9TVEFUVVMAVE9PX01BTllfUkVRVUVTVFMARUFSTFlfSElOVFMAVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlMAT1BUSU9OUwBTV0lUQ0hJTkdfUFJPVE9DT0xTAFZBUklBTlRfQUxTT19ORUdPVElBVEVTAE1VTFRJUExFX0NIT0lDRVMASU5URVJOQUxfU0VSVkVSX0VSUk9SAFdFQl9TRVJWRVJfVU5LTk9XTl9FUlJPUgBSQUlMR1VOX0VSUk9SAElERU5USVRZX1BST1ZJREVSX0FVVEhFTlRJQ0FUSU9OX0VSUk9SAFNTTF9DRVJUSUZJQ0FURV9FUlJPUgBJTlZBTElEX1hfRk9SV0FSREVEX0ZPUgBTRVRfUEFSQU1FVEVSAEdFVF9QQVJBTUVURVIASFBFX1VTRVIAU0VFX09USEVSAEhQRV9DQl9DSFVOS19IRUFERVIATUtDQUxFTkRBUgBTRVRVUABXRUJfU0VSVkVSX0lTX0RPV04AVEVBUkRPV04ASFBFX0NMT1NFRF9DT05ORUNUSU9OAEhFVVJJU1RJQ19FWFBJUkFUSU9OAERJU0NPTk5FQ1RFRF9PUEVSQVRJT04ATk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT04ASFBFX0lOVkFMSURfVkVSU0lPTgBIUEVfQ0JfTUVTU0FHRV9CRUdJTgBTSVRFX0lTX0ZST1pFTgBIUEVfSU5WQUxJRF9IRUFERVJfVE9LRU4ASU5WQUxJRF9UT0tFTgBGT1JCSURERU4ARU5IQU5DRV9ZT1VSX0NBTE0ASFBFX0lOVkFMSURfVVJMAEJMT0NLRURfQllfUEFSRU5UQUxfQ09OVFJPTABNS0NPTABBQ0wASFBFX0lOVEVSTkFMAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0VfVU5PRkZJQ0lBTABIUEVfT0sAVU5MSU5LAFVOTE9DSwBQUkkAUkVUUllfV0lUSABIUEVfSU5WQUxJRF9DT05URU5UX0xFTkdUSABIUEVfVU5FWFBFQ1RFRF9DT05URU5UX0xFTkdUSABGTFVTSABQUk9QUEFUQ0gATS1TRUFSQ0gAVVJJX1RPT19MT05HAFBST0NFU1NJTkcATUlTQ0VMTEFORU9VU19QRVJTSVNURU5UX1dBUk5JTkcATUlTQ0VMTEFORU9VU19XQVJOSU5HAEhQRV9JTlZBTElEX1RSQU5TRkVSX0VOQ09ESU5HAEV4cGVjdGVkIENSTEYASFBFX0lOVkFMSURfQ0hVTktfU0laRQBNT1ZFAENPTlRJTlVFAEhQRV9DQl9TVEFUVVNfQ09NUExFVEUASFBFX0NCX0hFQURFUlNfQ09NUExFVEUASFBFX0NCX1ZFUlNJT05fQ09NUExFVEUASFBFX0NCX1VSTF9DT01QTEVURQBIUEVfQ0JfQ0hVTktfQ09NUExFVEUASFBFX0NCX0hFQURFUl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX1ZBTFVFX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19FWFRFTlNJT05fTkFNRV9DT01QTEVURQBIUEVfQ0JfTUVTU0FHRV9DT01QTEVURQBIUEVfQ0JfTUVUSE9EX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfRklFTERfQ09NUExFVEUAREVMRVRFAEhQRV9JTlZBTElEX0VPRl9TVEFURQBJTlZBTElEX1NTTF9DRVJUSUZJQ0FURQBQQVVTRQBOT19SRVNQT05TRQBVTlNVUFBPUlRFRF9NRURJQV9UWVBFAEdPTkUATk9UX0FDQ0VQVEFCTEUAU0VSVklDRV9VTkFWQUlMQUJMRQBSQU5HRV9OT1RfU0FUSVNGSUFCTEUAT1JJR0lOX0lTX1VOUkVBQ0hBQkxFAFJFU1BPTlNFX0lTX1NUQUxFAFBVUkdFAE1FUkdFAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0UAUkVRVUVTVF9IRUFERVJfVE9PX0xBUkdFAFBBWUxPQURfVE9PX0xBUkdFAElOU1VGRklDSUVOVF9TVE9SQUdFAEhQRV9QQVVTRURfVVBHUkFERQBIUEVfUEFVU0VEX0gyX1VQR1JBREUAU09VUkNFAEFOTk9VTkNFAFRSQUNFAEhQRV9VTkVYUEVDVEVEX1NQQUNFAERFU0NSSUJFAFVOU1VCU0NSSUJFAFJFQ09SRABIUEVfSU5WQUxJRF9NRVRIT0QATk9UX0ZPVU5EAFBST1BGSU5EAFVOQklORABSRUJJTkQAVU5BVVRIT1JJWkVEAE1FVEhPRF9OT1RfQUxMT1dFRABIVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRABBTFJFQURZX1JFUE9SVEVEAEFDQ0VQVEVEAE5PVF9JTVBMRU1FTlRFRABMT09QX0RFVEVDVEVEAEhQRV9DUl9FWFBFQ1RFRABIUEVfTEZfRVhQRUNURUQAQ1JFQVRFRABJTV9VU0VEAEhQRV9QQVVTRUQAVElNRU9VVF9PQ0NVUkVEAFBBWU1FTlRfUkVRVUlSRUQAUFJFQ09ORElUSU9OX1JFUVVJUkVEAFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAE5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQATEVOR1RIX1JFUVVJUkVEAFNTTF9DRVJUSUZJQ0FURV9SRVFVSVJFRABVUEdSQURFX1JFUVVJUkVEAFBBR0VfRVhQSVJFRABQUkVDT05ESVRJT05fRkFJTEVEAEVYUEVDVEFUSU9OX0ZBSUxFRABSRVZBTElEQVRJT05fRkFJTEVEAFNTTF9IQU5EU0hBS0VfRkFJTEVEAExPQ0tFRABUUkFOU0ZPUk1BVElPTl9BUFBMSUVEAE5PVF9NT0RJRklFRABOT1RfRVhURU5ERUQAQkFORFdJRFRIX0xJTUlUX0VYQ0VFREVEAFNJVEVfSVNfT1ZFUkxPQURFRABIRUFEAEV4cGVjdGVkIEhUVFAvAABeEwAAJhMAADAQAADwFwAAnRMAABUSAAA5FwAA8BIAAAoQAAB1EgAArRIAAIITAABPFAAAfxAAAKAVAAAjFAAAiRIAAIsUAABNFQAA1BEAAM8UAAAQGAAAyRYAANwWAADBEQAA4BcAALsUAAB0FAAAfBUAAOUUAAAIFwAAHxAAAGUVAACjFAAAKBUAAAIVAACZFQAALBAAAIsZAABPDwAA1A4AAGoQAADOEAAAAhcAAIkOAABuEwAAHBMAAGYUAABWFwAAwRMAAM0TAABsEwAAaBcAAGYXAABfFwAAIhMAAM4PAABpDgAA2A4AAGMWAADLEwAAqg4AACgXAAAmFwAAxRMAAF0WAADoEQAAZxMAAGUTAADyFgAAcxMAAB0XAAD5FgAA8xEAAM8OAADOFQAADBIAALMRAAClEQAAYRAAADIXAAC7EwAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAgMCAgICAgAAAgIAAgIAAgICAgICAgICAgAEAAAAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgICAgIAAAICAAICAAICAgICAgICAgIAAwAEAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsb3NlZWVwLWFsaXZlAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQFjaHVua2VkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAQEBAQAAAQEAAQEAAQEBAQEBAQEBAQAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGVjdGlvbmVudC1sZW5ndGhvbnJveHktY29ubmVjdGlvbgAAAAAAAAAAAAAAAAAAAHJhbnNmZXItZW5jb2RpbmdwZ3JhZGUNCg0KDQpTTQ0KDQpUVFAvQ0UvVFNQLwAAAAAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQUBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAABAAACAAAAAAAAAAAAAAAAAAAAAAAAAwQAAAQEBAQEBAQEBAQEBQQEBAQEBAQEBAQEBAAEAAYHBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAgAAAAACAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE5PVU5DRUVDS09VVE5FQ1RFVEVDUklCRUxVU0hFVEVBRFNFQVJDSFJHRUNUSVZJVFlMRU5EQVJWRU9USUZZUFRJT05TQ0hTRUFZU1RBVENIR0VPUkRJUkVDVE9SVFJDSFBBUkFNRVRFUlVSQ0VCU0NSSUJFQVJET1dOQUNFSU5ETktDS1VCU0NSSUJFSFRUUC9BRFRQLw=="),llhttp_simdWasm}Q(requireLlhttp_simdWasm,"requireLlhttp_simdWasm");const assert$4=require$$0__default,net$2=require$$0__default$2,http$1=require$$2__default,{pipeline:pipeline$1}=require$$0__default$1,util$e=util$j,timers=timers$1,Request=request$2,DispatcherBase$3=dispatcherBase,{RequestContentLengthMismatchError,ResponseContentLengthMismatchError,InvalidArgumentError:InvalidArgumentError$e,RequestAbortedError:RequestAbortedError$8,HeadersTimeoutError,HeadersOverflowError,SocketError:SocketError$2,InformationalError,BodyTimeoutError,HTTPParserError,ResponseExceededMaxSizeError,ClientDestroyedError}=errors$1,buildConnector$2=connect$2,{kUrl:kUrl$2,kReset,kServerName,kClient:kClient$1,kBusy:kBusy$1,kParser,kConnect,kBlocking,kResuming,kRunning:kRunning$3,kPending:kPending$2,kSize:kSize$3,kWriting,kQueue:kQueue$1,kConnected:kConnected$4,kConnecting,kNeedDrain:kNeedDrain$2,kNoRef,kKeepAliveDefaultTimeout,kHostHeader,kPendingIdx,kRunningIdx,kError,kPipelining,kSocket,kKeepAliveTimeoutValue,kMaxHeadersSize,kKeepAliveMaxTimeout,kKeepAliveTimeoutThreshold,kHeadersTimeout,kBodyTimeout,kStrictContentLength,kConnector,kMaxRedirections:kMaxRedirections$1,kMaxRequests,kCounter,kClose:kClose$5,kDestroy:kDestroy$3,kDispatch:kDispatch$2,kInterceptors:kInterceptors$3,kLocalAddress,kMaxResponseSize,kHTTPConnVersion,kHost,kHTTP2Session,kHTTP2SessionState,kHTTP2BuildRequest,kHTTP2CopyHeaders,kHTTP1BuildRequest}=symbols$4;let http2;try{http2=require("http2");}catch{http2={constants:{}};}const{constants:{HTTP2_HEADER_AUTHORITY,HTTP2_HEADER_METHOD,HTTP2_HEADER_PATH,HTTP2_HEADER_SCHEME,HTTP2_HEADER_CONTENT_LENGTH,HTTP2_HEADER_EXPECT,HTTP2_HEADER_STATUS}}=http2;let h2ExperimentalWarned=!1;const FastBuffer=Buffer[Symbol.species],kClosedResolve$1=Symbol("kClosedResolve"),channels={};try{const e=require("diagnostics_channel");channels.sendHeaders=e.channel("undici:client:sendHeaders"),channels.beforeConnect=e.channel("undici:client:beforeConnect"),channels.connectError=e.channel("undici:client:connectError"),channels.connected=e.channel("undici:client:connected");}catch{channels.sendHeaders={hasSubscribers:!1},channels.beforeConnect={hasSubscribers:!1},channels.connectError={hasSubscribers:!1},channels.connected={hasSubscribers:!1};}let Client$3=(Je=class extends DispatcherBase$3{constructor(A,{interceptors:t,maxHeaderSize:r,headersTimeout:n,socketTimeout:o,requestTimeout:C,connectTimeout:l,bodyTimeout:B,idleTimeout:I,keepAlive:c,keepAliveTimeout:y,maxKeepAliveTimeout:f,keepAliveMaxTimeout:D,keepAliveTimeoutThreshold:S,socketPath:R,pipelining:F,tls:p,strictContentLength:m,maxCachedSessions:k,maxRedirections:w,connect:b,maxRequestsPerClient:N,localAddress:U,maxResponseSize:x,autoSelectFamily:v,autoSelectFamilyAttemptTimeout:W,allowH2:J,maxConcurrentStreams:iA}={}){if(super(),c!==void 0)throw new InvalidArgumentError$e("unsupported keepAlive, use pipelining=0 instead");if(o!==void 0)throw new InvalidArgumentError$e("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");if(C!==void 0)throw new InvalidArgumentError$e("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");if(I!==void 0)throw new InvalidArgumentError$e("unsupported idleTimeout, use keepAliveTimeout instead");if(f!==void 0)throw new InvalidArgumentError$e("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");if(r!=null&&!Number.isFinite(r))throw new InvalidArgumentError$e("invalid maxHeaderSize");if(R!=null&&typeof R!="string")throw new InvalidArgumentError$e("invalid socketPath");if(l!=null&&(!Number.isFinite(l)||l<0))throw new InvalidArgumentError$e("invalid connectTimeout");if(y!=null&&(!Number.isFinite(y)||y<=0))throw new InvalidArgumentError$e("invalid keepAliveTimeout");if(D!=null&&(!Number.isFinite(D)||D<=0))throw new InvalidArgumentError$e("invalid keepAliveMaxTimeout");if(S!=null&&!Number.isFinite(S))throw new InvalidArgumentError$e("invalid keepAliveTimeoutThreshold");if(n!=null&&(!Number.isInteger(n)||n<0))throw new InvalidArgumentError$e("headersTimeout must be a positive integer or zero");if(B!=null&&(!Number.isInteger(B)||B<0))throw new InvalidArgumentError$e("bodyTimeout must be a positive integer or zero");if(b!=null&&typeof b!="function"&&typeof b!="object")throw new InvalidArgumentError$e("connect must be a function or an object");if(w!=null&&(!Number.isInteger(w)||w<0))throw new InvalidArgumentError$e("maxRedirections must be a positive number");if(N!=null&&(!Number.isInteger(N)||N<0))throw new InvalidArgumentError$e("maxRequestsPerClient must be a positive number");if(U!=null&&(typeof U!="string"||net$2.isIP(U)===0))throw new InvalidArgumentError$e("localAddress must be valid string IP address");if(x!=null&&(!Number.isInteger(x)||x<-1))throw new InvalidArgumentError$e("maxResponseSize must be a positive number");if(W!=null&&(!Number.isInteger(W)||W<-1))throw new InvalidArgumentError$e("autoSelectFamilyAttemptTimeout must be a positive number");if(J!=null&&typeof J!="boolean")throw new InvalidArgumentError$e("allowH2 must be a valid boolean value");if(iA!=null&&(typeof iA!="number"||iA<1))throw new InvalidArgumentError$e("maxConcurrentStreams must be a positive integer, greater than 0");typeof b!="function"&&(b=buildConnector$2({...p,maxCachedSessions:k,allowH2:J,socketPath:R,timeout:l,...util$e.nodeHasAutoSelectFamily&&v?{autoSelectFamily:v,autoSelectFamilyAttemptTimeout:W}:void 0,...b})),this[kInterceptors$3]=t&&t.Client&&Array.isArray(t.Client)?t.Client:[createRedirectInterceptor$1({maxRedirections:w})],this[kUrl$2]=util$e.parseOrigin(A),this[kConnector]=b,this[kSocket]=null,this[kPipelining]=F??1,this[kMaxHeadersSize]=r||http$1.maxHeaderSize,this[kKeepAliveDefaultTimeout]=y??4e3,this[kKeepAliveMaxTimeout]=D??6e5,this[kKeepAliveTimeoutThreshold]=S??1e3,this[kKeepAliveTimeoutValue]=this[kKeepAliveDefaultTimeout],this[kServerName]=null,this[kLocalAddress]=U??null,this[kResuming]=0,this[kNeedDrain$2]=0,this[kHostHeader]=`host: ${this[kUrl$2].hostname}${this[kUrl$2].port?`:${this[kUrl$2].port}`:""}\r
`,this[kBodyTimeout]=B??3e5,this[kHeadersTimeout]=n??3e5,this[kStrictContentLength]=m??!0,this[kMaxRedirections$1]=w,this[kMaxRequests]=N,this[kClosedResolve$1]=null,this[kMaxResponseSize]=x>-1?x:-1,this[kHTTPConnVersion]="h1",this[kHTTP2Session]=null,this[kHTTP2SessionState]=J?{openStreams:0,maxConcurrentStreams:iA??100}:null,this[kHost]=`${this[kUrl$2].hostname}${this[kUrl$2].port?`:${this[kUrl$2].port}`:""}`,this[kQueue$1]=[],this[kRunningIdx]=0,this[kPendingIdx]=0;}get pipelining(){return this[kPipelining]}set pipelining(A){this[kPipelining]=A,resume$1(this,!0);}get[kPending$2](){return this[kQueue$1].length-this[kPendingIdx]}get[kRunning$3](){return this[kPendingIdx]-this[kRunningIdx]}get[kSize$3](){return this[kQueue$1].length-this[kRunningIdx]}get[kConnected$4](){return !!this[kSocket]&&!this[kConnecting]&&!this[kSocket].destroyed}get[kBusy$1](){const A=this[kSocket];return A&&(A[kReset]||A[kWriting]||A[kBlocking])||this[kSize$3]>=(this[kPipelining]||1)||this[kPending$2]>0}[kConnect](A){connect$1(this),this.once("connect",A);}[kDispatch$2](A,t){const r=A.origin||this[kUrl$2].origin,n=this[kHTTPConnVersion]==="h2"?Request[kHTTP2BuildRequest](r,A,t):Request[kHTTP1BuildRequest](r,A,t);return this[kQueue$1].push(n),this[kResuming]||(util$e.bodyLength(n.body)==null&&util$e.isIterable(n.body)?(this[kResuming]=1,process.nextTick(resume$1,this)):resume$1(this,!0)),this[kResuming]&&this[kNeedDrain$2]!==2&&this[kBusy$1]&&(this[kNeedDrain$2]=2),this[kNeedDrain$2]<2}async[kClose$5](){return new Promise(A=>{this[kSize$3]?this[kClosedResolve$1]=A:A(null);})}async[kDestroy$3](A){return new Promise(t=>{const r=this[kQueue$1].splice(this[kPendingIdx]);for(let o=0;o<r.length;o++){const C=r[o];errorRequest(this,C,A);}const n=Q(()=>{this[kClosedResolve$1]&&(this[kClosedResolve$1](),this[kClosedResolve$1]=null),t();},"callback");this[kHTTP2Session]!=null&&(util$e.destroy(this[kHTTP2Session],A),this[kHTTP2Session]=null,this[kHTTP2SessionState]=null),this[kSocket]?util$e.destroy(this[kSocket].on("close",n),A):queueMicrotask(n),resume$1(this);})}},Q(Je,"Client"),Je);function onHttp2SessionError(e){assert$4(e.code!=="ERR_TLS_CERT_ALTNAME_INVALID"),this[kSocket][kError]=e,onError(this[kClient$1],e);}Q(onHttp2SessionError,"onHttp2SessionError");function onHttp2FrameError(e,A,t){const r=new InformationalError(`HTTP/2: "frameError" received - type ${e}, code ${A}`);t===0&&(this[kSocket][kError]=r,onError(this[kClient$1],r));}Q(onHttp2FrameError,"onHttp2FrameError");function onHttp2SessionEnd(){util$e.destroy(this,new SocketError$2("other side closed")),util$e.destroy(this[kSocket],new SocketError$2("other side closed"));}Q(onHttp2SessionEnd,"onHttp2SessionEnd");function onHTTP2GoAway(e){const A=this[kClient$1],t=new InformationalError(`HTTP/2: "GOAWAY" frame received with code ${e}`);if(A[kSocket]=null,A[kHTTP2Session]=null,A.destroyed){assert$4(this[kPending$2]===0);const r=A[kQueue$1].splice(A[kRunningIdx]);for(let n=0;n<r.length;n++){const o=r[n];errorRequest(this,o,t);}}else if(A[kRunning$3]>0){const r=A[kQueue$1][A[kRunningIdx]];A[kQueue$1][A[kRunningIdx]++]=null,errorRequest(A,r,t);}A[kPendingIdx]=A[kRunningIdx],assert$4(A[kRunning$3]===0),A.emit("disconnect",A[kUrl$2],[A],t),resume$1(A);}Q(onHTTP2GoAway,"onHTTP2GoAway");const constants$2=requireConstants$2(),createRedirectInterceptor$1=redirectInterceptor,EMPTY_BUF=Buffer.alloc(0);async function lazyllhttp(){const e=process.env.JEST_WORKER_ID?requireLlhttpWasm():void 0;let A;try{A=await WebAssembly.compile(Buffer.from(requireLlhttp_simdWasm(),"base64"));}catch{A=await WebAssembly.compile(Buffer.from(e||requireLlhttpWasm(),"base64"));}return await WebAssembly.instantiate(A,{env:{wasm_on_url:(t,r,n)=>0,wasm_on_status:(t,r,n)=>{assert$4.strictEqual(currentParser.ptr,t);const o=r-currentBufferPtr+currentBufferRef.byteOffset;return currentParser.onStatus(new FastBuffer(currentBufferRef.buffer,o,n))||0},wasm_on_message_begin:t=>(assert$4.strictEqual(currentParser.ptr,t),currentParser.onMessageBegin()||0),wasm_on_header_field:(t,r,n)=>{assert$4.strictEqual(currentParser.ptr,t);const o=r-currentBufferPtr+currentBufferRef.byteOffset;return currentParser.onHeaderField(new FastBuffer(currentBufferRef.buffer,o,n))||0},wasm_on_header_value:(t,r,n)=>{assert$4.strictEqual(currentParser.ptr,t);const o=r-currentBufferPtr+currentBufferRef.byteOffset;return currentParser.onHeaderValue(new FastBuffer(currentBufferRef.buffer,o,n))||0},wasm_on_headers_complete:(t,r,n,o)=>(assert$4.strictEqual(currentParser.ptr,t),currentParser.onHeadersComplete(r,!!n,!!o)||0),wasm_on_body:(t,r,n)=>{assert$4.strictEqual(currentParser.ptr,t);const o=r-currentBufferPtr+currentBufferRef.byteOffset;return currentParser.onBody(new FastBuffer(currentBufferRef.buffer,o,n))||0},wasm_on_message_complete:t=>(assert$4.strictEqual(currentParser.ptr,t),currentParser.onMessageComplete()||0)}})}Q(lazyllhttp,"lazyllhttp");let llhttpInstance=null,llhttpPromise=lazyllhttp();llhttpPromise.catch();let currentParser=null,currentBufferRef=null,currentBufferSize=0,currentBufferPtr=null;const TIMEOUT_HEADERS=1,TIMEOUT_BODY=2,TIMEOUT_IDLE=3,it=class it{constructor(A,t,{exports:r}){assert$4(Number.isFinite(A[kMaxHeadersSize])&&A[kMaxHeadersSize]>0),this.llhttp=r,this.ptr=this.llhttp.llhttp_alloc(constants$2.TYPE.RESPONSE),this.client=A,this.socket=t,this.timeout=null,this.timeoutValue=null,this.timeoutType=null,this.statusCode=null,this.statusText="",this.upgrade=!1,this.headers=[],this.headersSize=0,this.headersMaxSize=A[kMaxHeadersSize],this.shouldKeepAlive=!1,this.paused=!1,this.resume=this.resume.bind(this),this.bytesRead=0,this.keepAlive="",this.contentLength="",this.connection="",this.maxResponseSize=A[kMaxResponseSize];}setTimeout(A,t){this.timeoutType=t,A!==this.timeoutValue?(timers.clearTimeout(this.timeout),A?(this.timeout=timers.setTimeout(onParserTimeout,A,this),this.timeout.unref&&this.timeout.unref()):this.timeout=null,this.timeoutValue=A):this.timeout&&this.timeout.refresh&&this.timeout.refresh();}resume(){this.socket.destroyed||!this.paused||(assert$4(this.ptr!=null),assert$4(currentParser==null),this.llhttp.llhttp_resume(this.ptr),assert$4(this.timeoutType===TIMEOUT_BODY),this.timeout&&this.timeout.refresh&&this.timeout.refresh(),this.paused=!1,this.execute(this.socket.read()||EMPTY_BUF),this.readMore());}readMore(){for(;!this.paused&&this.ptr;){const A=this.socket.read();if(A===null)break;this.execute(A);}}execute(A){assert$4(this.ptr!=null),assert$4(currentParser==null),assert$4(!this.paused);const{socket:t,llhttp:r}=this;A.length>currentBufferSize&&(currentBufferPtr&&r.free(currentBufferPtr),currentBufferSize=Math.ceil(A.length/4096)*4096,currentBufferPtr=r.malloc(currentBufferSize)),new Uint8Array(r.memory.buffer,currentBufferPtr,currentBufferSize).set(A);try{let n;try{currentBufferRef=A,currentParser=this,n=r.llhttp_execute(this.ptr,currentBufferPtr,A.length);}catch(C){throw C}finally{currentParser=null,currentBufferRef=null;}const o=r.llhttp_get_error_pos(this.ptr)-currentBufferPtr;if(n===constants$2.ERROR.PAUSED_UPGRADE)this.onUpgrade(A.slice(o));else if(n===constants$2.ERROR.PAUSED)this.paused=!0,t.unshift(A.slice(o));else if(n!==constants$2.ERROR.OK){const C=r.llhttp_get_error_reason(this.ptr);let l="";if(C){const B=new Uint8Array(r.memory.buffer,C).indexOf(0);l="Response does not match the HTTP/1.1 protocol ("+Buffer.from(r.memory.buffer,C,B).toString()+")";}throw new HTTPParserError(l,constants$2.ERROR[n],A.slice(o))}}catch(n){util$e.destroy(t,n);}}destroy(){assert$4(this.ptr!=null),assert$4(currentParser==null),this.llhttp.llhttp_free(this.ptr),this.ptr=null,timers.clearTimeout(this.timeout),this.timeout=null,this.timeoutValue=null,this.timeoutType=null,this.paused=!1;}onStatus(A){this.statusText=A.toString();}onMessageBegin(){const{socket:A,client:t}=this;if(A.destroyed)return -1;const r=t[kQueue$1][t[kRunningIdx]];if(!r)return -1;r.onResponseStarted();}onHeaderField(A){const t=this.headers.length;t&1?this.headers[t-1]=Buffer.concat([this.headers[t-1],A]):this.headers.push(A),this.trackHeader(A.length);}onHeaderValue(A){let t=this.headers.length;(t&1)===1?(this.headers.push(A),t+=1):this.headers[t-1]=Buffer.concat([this.headers[t-1],A]);const r=this.headers[t-2];if(r.length===10){const n=util$e.bufferToLowerCasedHeaderName(r);n==="keep-alive"?this.keepAlive+=A.toString():n==="connection"&&(this.connection+=A.toString());}else r.length===14&&util$e.bufferToLowerCasedHeaderName(r)==="content-length"&&(this.contentLength+=A.toString());this.trackHeader(A.length);}trackHeader(A){this.headersSize+=A,this.headersSize>=this.headersMaxSize&&util$e.destroy(this.socket,new HeadersOverflowError);}onUpgrade(A){const{upgrade:t,client:r,socket:n,headers:o,statusCode:C}=this;assert$4(t);const l=r[kQueue$1][r[kRunningIdx]];assert$4(l),assert$4(!n.destroyed),assert$4(n===r[kSocket]),assert$4(!this.paused),assert$4(l.upgrade||l.method==="CONNECT"),this.statusCode=null,this.statusText="",this.shouldKeepAlive=null,assert$4(this.headers.length%2===0),this.headers=[],this.headersSize=0,n.unshift(A),n[kParser].destroy(),n[kParser]=null,n[kClient$1]=null,n[kError]=null,n.removeListener("error",onSocketError).removeListener("readable",onSocketReadable).removeListener("end",onSocketEnd).removeListener("close",onSocketClose),r[kSocket]=null,r[kQueue$1][r[kRunningIdx]++]=null,r.emit("disconnect",r[kUrl$2],[r],new InformationalError("upgrade"));try{l.onUpgrade(C,o,n);}catch(B){util$e.destroy(n,B);}resume$1(r);}onHeadersComplete(A,t,r){const{client:n,socket:o,headers:C,statusText:l}=this;if(o.destroyed)return -1;const B=n[kQueue$1][n[kRunningIdx]];if(!B)return -1;if(assert$4(!this.upgrade),assert$4(this.statusCode<200),A===100)return util$e.destroy(o,new SocketError$2("bad response",util$e.getSocketInfo(o))),-1;if(t&&!B.upgrade)return util$e.destroy(o,new SocketError$2("bad upgrade",util$e.getSocketInfo(o))),-1;if(assert$4.strictEqual(this.timeoutType,TIMEOUT_HEADERS),this.statusCode=A,this.shouldKeepAlive=r||B.method==="HEAD"&&!o[kReset]&&this.connection.toLowerCase()==="keep-alive",this.statusCode>=200){const c=B.bodyTimeout!=null?B.bodyTimeout:n[kBodyTimeout];this.setTimeout(c,TIMEOUT_BODY);}else this.timeout&&this.timeout.refresh&&this.timeout.refresh();if(B.method==="CONNECT")return assert$4(n[kRunning$3]===1),this.upgrade=!0,2;if(t)return assert$4(n[kRunning$3]===1),this.upgrade=!0,2;if(assert$4(this.headers.length%2===0),this.headers=[],this.headersSize=0,this.shouldKeepAlive&&n[kPipelining]){const c=this.keepAlive?util$e.parseKeepAliveTimeout(this.keepAlive):null;if(c!=null){const y=Math.min(c-n[kKeepAliveTimeoutThreshold],n[kKeepAliveMaxTimeout]);y<=0?o[kReset]=!0:n[kKeepAliveTimeoutValue]=y;}else n[kKeepAliveTimeoutValue]=n[kKeepAliveDefaultTimeout];}else o[kReset]=!0;const I=B.onHeaders(A,C,this.resume,l)===!1;return B.aborted?-1:B.method==="HEAD"||A<200?1:(o[kBlocking]&&(o[kBlocking]=!1,resume$1(n)),I?constants$2.ERROR.PAUSED:0)}onBody(A){const{client:t,socket:r,statusCode:n,maxResponseSize:o}=this;if(r.destroyed)return -1;const C=t[kQueue$1][t[kRunningIdx]];if(assert$4(C),assert$4.strictEqual(this.timeoutType,TIMEOUT_BODY),this.timeout&&this.timeout.refresh&&this.timeout.refresh(),assert$4(n>=200),o>-1&&this.bytesRead+A.length>o)return util$e.destroy(r,new ResponseExceededMaxSizeError),-1;if(this.bytesRead+=A.length,C.onData(A)===!1)return constants$2.ERROR.PAUSED}onMessageComplete(){const{client:A,socket:t,statusCode:r,upgrade:n,headers:o,contentLength:C,bytesRead:l,shouldKeepAlive:B}=this;if(t.destroyed&&(!r||B))return -1;if(n)return;const I=A[kQueue$1][A[kRunningIdx]];if(assert$4(I),assert$4(r>=100),this.statusCode=null,this.statusText="",this.bytesRead=0,this.contentLength="",this.keepAlive="",this.connection="",assert$4(this.headers.length%2===0),this.headers=[],this.headersSize=0,!(r<200)){if(I.method!=="HEAD"&&C&&l!==parseInt(C,10))return util$e.destroy(t,new ResponseContentLengthMismatchError),-1;if(I.onComplete(o),A[kQueue$1][A[kRunningIdx]++]=null,t[kWriting])return assert$4.strictEqual(A[kRunning$3],0),util$e.destroy(t,new InformationalError("reset")),constants$2.ERROR.PAUSED;if(B){if(t[kReset]&&A[kRunning$3]===0)return util$e.destroy(t,new InformationalError("reset")),constants$2.ERROR.PAUSED;A[kPipelining]===1?setImmediate(resume$1,A):resume$1(A);}else return util$e.destroy(t,new InformationalError("reset")),constants$2.ERROR.PAUSED}}};Q(it,"Parser");let Parser=it;function onParserTimeout(e){const{socket:A,timeoutType:t,client:r}=e;t===TIMEOUT_HEADERS?(!A[kWriting]||A.writableNeedDrain||r[kRunning$3]>1)&&(assert$4(!e.paused,"cannot be paused while waiting for headers"),util$e.destroy(A,new HeadersTimeoutError)):t===TIMEOUT_BODY?e.paused||util$e.destroy(A,new BodyTimeoutError):t===TIMEOUT_IDLE&&(assert$4(r[kRunning$3]===0&&r[kKeepAliveTimeoutValue]),util$e.destroy(A,new InformationalError("socket idle timeout")));}Q(onParserTimeout,"onParserTimeout");function onSocketReadable(){const{[kParser]:e}=this;e&&e.readMore();}Q(onSocketReadable,"onSocketReadable");function onSocketError(e){const{[kClient$1]:A,[kParser]:t}=this;if(assert$4(e.code!=="ERR_TLS_CERT_ALTNAME_INVALID"),A[kHTTPConnVersion]!=="h2"&&e.code==="ECONNRESET"&&t.statusCode&&!t.shouldKeepAlive){t.onMessageComplete();return}this[kError]=e,onError(this[kClient$1],e);}Q(onSocketError,"onSocketError");function onError(e,A){if(e[kRunning$3]===0&&A.code!=="UND_ERR_INFO"&&A.code!=="UND_ERR_SOCKET"){assert$4(e[kPendingIdx]===e[kRunningIdx]);const t=e[kQueue$1].splice(e[kRunningIdx]);for(let r=0;r<t.length;r++){const n=t[r];errorRequest(e,n,A);}assert$4(e[kSize$3]===0);}}Q(onError,"onError");function onSocketEnd(){const{[kParser]:e,[kClient$1]:A}=this;if(A[kHTTPConnVersion]!=="h2"&&e.statusCode&&!e.shouldKeepAlive){e.onMessageComplete();return}util$e.destroy(this,new SocketError$2("other side closed",util$e.getSocketInfo(this)));}Q(onSocketEnd,"onSocketEnd");function onSocketClose(){const{[kClient$1]:e,[kParser]:A}=this;e[kHTTPConnVersion]==="h1"&&A&&(!this[kError]&&A.statusCode&&!A.shouldKeepAlive&&A.onMessageComplete(),this[kParser].destroy(),this[kParser]=null);const t=this[kError]||new SocketError$2("closed",util$e.getSocketInfo(this));if(e[kSocket]=null,e.destroyed){assert$4(e[kPending$2]===0);const r=e[kQueue$1].splice(e[kRunningIdx]);for(let n=0;n<r.length;n++){const o=r[n];errorRequest(e,o,t);}}else if(e[kRunning$3]>0&&t.code!=="UND_ERR_INFO"){const r=e[kQueue$1][e[kRunningIdx]];e[kQueue$1][e[kRunningIdx]++]=null,errorRequest(e,r,t);}e[kPendingIdx]=e[kRunningIdx],assert$4(e[kRunning$3]===0),e.emit("disconnect",e[kUrl$2],[e],t),resume$1(e);}Q(onSocketClose,"onSocketClose");async function connect$1(e){assert$4(!e[kConnecting]),assert$4(!e[kSocket]);let{host:A,hostname:t,protocol:r,port:n}=e[kUrl$2];if(t[0]==="["){const o=t.indexOf("]");assert$4(o!==-1);const C=t.substring(1,o);assert$4(net$2.isIP(C)),t=C;}e[kConnecting]=!0,channels.beforeConnect.hasSubscribers&&channels.beforeConnect.publish({connectParams:{host:A,hostname:t,protocol:r,port:n,servername:e[kServerName],localAddress:e[kLocalAddress]},connector:e[kConnector]});try{const o=await new Promise((l,B)=>{e[kConnector]({host:A,hostname:t,protocol:r,port:n,servername:e[kServerName],localAddress:e[kLocalAddress]},(I,c)=>{I?B(I):l(c);});});if(e.destroyed){util$e.destroy(o.on("error",()=>{}),new ClientDestroyedError);return}if(e[kConnecting]=!1,assert$4(o),o.alpnProtocol==="h2"){h2ExperimentalWarned||(h2ExperimentalWarned=!0,process.emitWarning("H2 support is experimental, expect them to change at any time.",{code:"UNDICI-H2"}));const l=http2.connect(e[kUrl$2],{createConnection:()=>o,peerMaxConcurrentStreams:e[kHTTP2SessionState].maxConcurrentStreams});e[kHTTPConnVersion]="h2",l[kClient$1]=e,l[kSocket]=o,l.on("error",onHttp2SessionError),l.on("frameError",onHttp2FrameError),l.on("end",onHttp2SessionEnd),l.on("goaway",onHTTP2GoAway),l.on("close",onSocketClose),l.unref(),e[kHTTP2Session]=l,o[kHTTP2Session]=l;}else llhttpInstance||(llhttpInstance=await llhttpPromise,llhttpPromise=null),o[kNoRef]=!1,o[kWriting]=!1,o[kReset]=!1,o[kBlocking]=!1,o[kParser]=new Parser(e,o,llhttpInstance);o[kCounter]=0,o[kMaxRequests]=e[kMaxRequests],o[kClient$1]=e,o[kError]=null,o.on("error",onSocketError).on("readable",onSocketReadable).on("end",onSocketEnd).on("close",onSocketClose),e[kSocket]=o,channels.connected.hasSubscribers&&channels.connected.publish({connectParams:{host:A,hostname:t,protocol:r,port:n,servername:e[kServerName],localAddress:e[kLocalAddress]},connector:e[kConnector],socket:o}),e.emit("connect",e[kUrl$2],[e]);}catch(o){if(e.destroyed)return;if(e[kConnecting]=!1,channels.connectError.hasSubscribers&&channels.connectError.publish({connectParams:{host:A,hostname:t,protocol:r,port:n,servername:e[kServerName],localAddress:e[kLocalAddress]},connector:e[kConnector],error:o}),o.code==="ERR_TLS_CERT_ALTNAME_INVALID")for(assert$4(e[kRunning$3]===0);e[kPending$2]>0&&e[kQueue$1][e[kPendingIdx]].servername===e[kServerName];){const C=e[kQueue$1][e[kPendingIdx]++];errorRequest(e,C,o);}else onError(e,o);e.emit("connectionError",e[kUrl$2],[e],o);}resume$1(e);}Q(connect$1,"connect$1");function emitDrain(e){e[kNeedDrain$2]=0,e.emit("drain",e[kUrl$2],[e]);}Q(emitDrain,"emitDrain");function resume$1(e,A){e[kResuming]!==2&&(e[kResuming]=2,_resume(e,A),e[kResuming]=0,e[kRunningIdx]>256&&(e[kQueue$1].splice(0,e[kRunningIdx]),e[kPendingIdx]-=e[kRunningIdx],e[kRunningIdx]=0));}Q(resume$1,"resume$1");function _resume(e,A){for(;;){if(e.destroyed){assert$4(e[kPending$2]===0);return}if(e[kClosedResolve$1]&&!e[kSize$3]){e[kClosedResolve$1](),e[kClosedResolve$1]=null;return}const t=e[kSocket];if(t&&!t.destroyed&&t.alpnProtocol!=="h2"){if(e[kSize$3]===0?!t[kNoRef]&&t.unref&&(t.unref(),t[kNoRef]=!0):t[kNoRef]&&t.ref&&(t.ref(),t[kNoRef]=!1),e[kSize$3]===0)t[kParser].timeoutType!==TIMEOUT_IDLE&&t[kParser].setTimeout(e[kKeepAliveTimeoutValue],TIMEOUT_IDLE);else if(e[kRunning$3]>0&&t[kParser].statusCode<200&&t[kParser].timeoutType!==TIMEOUT_HEADERS){const n=e[kQueue$1][e[kRunningIdx]],o=n.headersTimeout!=null?n.headersTimeout:e[kHeadersTimeout];t[kParser].setTimeout(o,TIMEOUT_HEADERS);}}if(e[kBusy$1])e[kNeedDrain$2]=2;else if(e[kNeedDrain$2]===2){A?(e[kNeedDrain$2]=1,process.nextTick(emitDrain,e)):emitDrain(e);continue}if(e[kPending$2]===0||e[kRunning$3]>=(e[kPipelining]||1))return;const r=e[kQueue$1][e[kPendingIdx]];if(e[kUrl$2].protocol==="https:"&&e[kServerName]!==r.servername){if(e[kRunning$3]>0)return;if(e[kServerName]=r.servername,t&&t.servername!==r.servername){util$e.destroy(t,new InformationalError("servername changed"));return}}if(e[kConnecting])return;if(!t&&!e[kHTTP2Session]){connect$1(e);return}if(t.destroyed||t[kWriting]||t[kReset]||t[kBlocking]||e[kRunning$3]>0&&!r.idempotent||e[kRunning$3]>0&&(r.upgrade||r.method==="CONNECT")||e[kRunning$3]>0&&util$e.bodyLength(r.body)!==0&&(util$e.isStream(r.body)||util$e.isAsyncIterable(r.body)))return;!r.aborted&&write(e,r)?e[kPendingIdx]++:e[kQueue$1].splice(e[kPendingIdx],1);}}Q(_resume,"_resume");function shouldSendContentLength(e){return e!=="GET"&&e!=="HEAD"&&e!=="OPTIONS"&&e!=="TRACE"&&e!=="CONNECT"}Q(shouldSendContentLength,"shouldSendContentLength");function write(e,A){if(e[kHTTPConnVersion]==="h2"){writeH2(e,e[kHTTP2Session],A);return}const{body:t,method:r,path:n,host:o,upgrade:C,headers:l,blocking:B,reset:I}=A,c=r==="PUT"||r==="POST"||r==="PATCH";t&&typeof t.read=="function"&&t.read(0);const y=util$e.bodyLength(t);let f=y;if(f===null&&(f=A.contentLength),f===0&&!c&&(f=null),shouldSendContentLength(r)&&f>0&&A.contentLength!==null&&A.contentLength!==f){if(e[kStrictContentLength])return errorRequest(e,A,new RequestContentLengthMismatchError),!1;process.emitWarning(new RequestContentLengthMismatchError);}const D=e[kSocket];try{A.onConnect(R=>{A.aborted||A.completed||(errorRequest(e,A,R||new RequestAbortedError$8),util$e.destroy(D,new InformationalError("aborted")));});}catch(R){errorRequest(e,A,R);}if(A.aborted)return !1;r==="HEAD"&&(D[kReset]=!0),(C||r==="CONNECT")&&(D[kReset]=!0),I!=null&&(D[kReset]=I),e[kMaxRequests]&&D[kCounter]++>=e[kMaxRequests]&&(D[kReset]=!0),B&&(D[kBlocking]=!0);let S=`${r} ${n} HTTP/1.1\r
`;return typeof o=="string"?S+=`host: ${o}\r
`:S+=e[kHostHeader],C?S+=`connection: upgrade\r
upgrade: ${C}\r
`:e[kPipelining]&&!D[kReset]?S+=`connection: keep-alive\r
`:S+=`connection: close\r
`,l&&(S+=l),channels.sendHeaders.hasSubscribers&&channels.sendHeaders.publish({request:A,headers:S,socket:D}),!t||y===0?(f===0?D.write(`${S}content-length: 0\r
\r
`,"latin1"):(assert$4(f===null,"no body must not have content length"),D.write(`${S}\r
`,"latin1")),A.onRequestSent()):util$e.isBuffer(t)?(assert$4(f===t.byteLength,"buffer body must have content length"),D.cork(),D.write(`${S}content-length: ${f}\r
\r
`,"latin1"),D.write(t),D.uncork(),A.onBodySent(t),A.onRequestSent(),c||(D[kReset]=!0)):util$e.isBlobLike(t)?typeof t.stream=="function"?writeIterable({body:t.stream(),client:e,request:A,socket:D,contentLength:f,header:S,expectsPayload:c}):writeBlob({body:t,client:e,request:A,socket:D,contentLength:f,header:S,expectsPayload:c}):util$e.isStream(t)?writeStream({body:t,client:e,request:A,socket:D,contentLength:f,header:S,expectsPayload:c}):util$e.isIterable(t)?writeIterable({body:t,client:e,request:A,socket:D,contentLength:f,header:S,expectsPayload:c}):assert$4(!1),!0}Q(write,"write");function writeH2(e,A,t){const{body:r,method:n,path:o,host:C,upgrade:l,expectContinue:B,signal:I,headers:c}=t;let y;if(typeof c=="string"?y=Request[kHTTP2CopyHeaders](c.trim()):y=c,l)return errorRequest(e,t,new Error("Upgrade not supported for H2")),!1;try{t.onConnect(m=>{t.aborted||t.completed||errorRequest(e,t,m||new RequestAbortedError$8);});}catch(m){errorRequest(e,t,m);}if(t.aborted)return !1;let f;const D=e[kHTTP2SessionState];if(y[HTTP2_HEADER_AUTHORITY]=C||e[kHost],y[HTTP2_HEADER_METHOD]=n,n==="CONNECT")return A.ref(),f=A.request(y,{endStream:!1,signal:I}),f.id&&!f.pending?(t.onUpgrade(null,null,f),++D.openStreams):f.once("ready",()=>{t.onUpgrade(null,null,f),++D.openStreams;}),f.once("close",()=>{D.openStreams-=1,D.openStreams===0&&A.unref();}),!0;y[HTTP2_HEADER_PATH]=o,y[HTTP2_HEADER_SCHEME]="https";const S=n==="PUT"||n==="POST"||n==="PATCH";r&&typeof r.read=="function"&&r.read(0);let R=util$e.bodyLength(r);if(R==null&&(R=t.contentLength),(R===0||!S)&&(R=null),shouldSendContentLength(n)&&R>0&&t.contentLength!=null&&t.contentLength!==R){if(e[kStrictContentLength])return errorRequest(e,t,new RequestContentLengthMismatchError),!1;process.emitWarning(new RequestContentLengthMismatchError);}R!=null&&(assert$4(r,"no body must not have content length"),y[HTTP2_HEADER_CONTENT_LENGTH]=`${R}`),A.ref();const F=n==="GET"||n==="HEAD";return B?(y[HTTP2_HEADER_EXPECT]="100-continue",f=A.request(y,{endStream:F,signal:I}),f.once("continue",p)):(f=A.request(y,{endStream:F,signal:I}),p()),++D.openStreams,f.once("response",m=>{const{[HTTP2_HEADER_STATUS]:k,...w}=m;t.onResponseStarted(),t.onHeaders(Number(k),w,f.resume.bind(f),"")===!1&&f.pause();}),f.once("end",()=>{t.onComplete([]);}),f.on("data",m=>{t.onData(m)===!1&&f.pause();}),f.once("close",()=>{D.openStreams-=1,D.openStreams===0&&A.unref();}),f.once("error",function(m){e[kHTTP2Session]&&!e[kHTTP2Session].destroyed&&!this.closed&&!this.destroyed&&(D.streams-=1,util$e.destroy(f,m));}),f.once("frameError",(m,k)=>{const w=new InformationalError(`HTTP/2: "frameError" received - type ${m}, code ${k}`);errorRequest(e,t,w),e[kHTTP2Session]&&!e[kHTTP2Session].destroyed&&!this.closed&&!this.destroyed&&(D.streams-=1,util$e.destroy(f,w));}),!0;function p(){r?util$e.isBuffer(r)?(assert$4(R===r.byteLength,"buffer body must have content length"),f.cork(),f.write(r),f.uncork(),f.end(),t.onBodySent(r),t.onRequestSent()):util$e.isBlobLike(r)?typeof r.stream=="function"?writeIterable({client:e,request:t,contentLength:R,h2stream:f,expectsPayload:S,body:r.stream(),socket:e[kSocket],header:""}):writeBlob({body:r,client:e,request:t,contentLength:R,expectsPayload:S,h2stream:f,header:"",socket:e[kSocket]}):util$e.isStream(r)?writeStream({body:r,client:e,request:t,contentLength:R,expectsPayload:S,socket:e[kSocket],h2stream:f,header:""}):util$e.isIterable(r)?writeIterable({body:r,client:e,request:t,contentLength:R,expectsPayload:S,header:"",h2stream:f,socket:e[kSocket]}):assert$4(!1):t.onRequestSent();}}Q(writeH2,"writeH2");function writeStream({h2stream:e,body:A,client:t,request:r,socket:n,contentLength:o,header:C,expectsPayload:l}){if(assert$4(o!==0||t[kRunning$3]===0,"stream body cannot be pipelined"),t[kHTTPConnVersion]==="h2"){let R=function(F){r.onBodySent(F);};Q(R,"onPipeData");const S=pipeline$1(A,e,F=>{F?(util$e.destroy(A,F),util$e.destroy(e,F)):r.onRequestSent();});S.on("data",R),S.once("end",()=>{S.removeListener("data",R),util$e.destroy(S);});return}let B=!1;const I=new AsyncWriter({socket:n,request:r,contentLength:o,client:t,expectsPayload:l,header:C}),c=Q(function(S){if(!B)try{!I.write(S)&&this.pause&&this.pause();}catch(R){util$e.destroy(this,R);}},"onData"),y=Q(function(){B||A.resume&&A.resume();},"onDrain"),f=Q(function(){if(queueMicrotask(()=>{A.removeListener("error",D);}),!B){const S=new RequestAbortedError$8;queueMicrotask(()=>D(S));}},"onClose"),D=Q(function(S){if(!B){if(B=!0,assert$4(n.destroyed||n[kWriting]&&t[kRunning$3]<=1),n.off("drain",y).off("error",D),A.removeListener("data",c).removeListener("end",D).removeListener("close",f),!S)try{I.end();}catch(R){S=R;}I.destroy(S),S&&(S.code!=="UND_ERR_INFO"||S.message!=="reset")?util$e.destroy(A,S):util$e.destroy(A);}},"onFinished");A.on("data",c).on("end",D).on("error",D).on("close",f),A.resume&&A.resume(),n.on("drain",y).on("error",D);}Q(writeStream,"writeStream");async function writeBlob({h2stream:e,body:A,client:t,request:r,socket:n,contentLength:o,header:C,expectsPayload:l}){assert$4(o===A.size,"blob body must have content length");const B=t[kHTTPConnVersion]==="h2";try{if(o!=null&&o!==A.size)throw new RequestContentLengthMismatchError;const I=Buffer.from(await A.arrayBuffer());B?(e.cork(),e.write(I),e.uncork()):(n.cork(),n.write(`${C}content-length: ${o}\r
\r
`,"latin1"),n.write(I),n.uncork()),r.onBodySent(I),r.onRequestSent(),l||(n[kReset]=!0),resume$1(t);}catch(I){util$e.destroy(B?e:n,I);}}Q(writeBlob,"writeBlob");async function writeIterable({h2stream:e,body:A,client:t,request:r,socket:n,contentLength:o,header:C,expectsPayload:l}){assert$4(o!==0||t[kRunning$3]===0,"iterator body cannot be pipelined");let B=null;function I(){if(B){const f=B;B=null,f();}}Q(I,"onDrain");const c=Q(()=>new Promise((f,D)=>{assert$4(B===null),n[kError]?D(n[kError]):B=f;}),"waitForDrain");if(t[kHTTPConnVersion]==="h2"){e.on("close",I).on("drain",I);try{for await(const f of A){if(n[kError])throw n[kError];const D=e.write(f);r.onBodySent(f),D||await c();}}catch(f){e.destroy(f);}finally{r.onRequestSent(),e.end(),e.off("close",I).off("drain",I);}return}n.on("close",I).on("drain",I);const y=new AsyncWriter({socket:n,request:r,contentLength:o,client:t,expectsPayload:l,header:C});try{for await(const f of A){if(n[kError])throw n[kError];y.write(f)||await c();}y.end();}catch(f){y.destroy(f);}finally{n.off("close",I).off("drain",I);}}Q(writeIterable,"writeIterable");const Et=class Et{constructor({socket:A,request:t,contentLength:r,client:n,expectsPayload:o,header:C}){this.socket=A,this.request=t,this.contentLength=r,this.client=n,this.bytesWritten=0,this.expectsPayload=o,this.header=C,A[kWriting]=!0;}write(A){const{socket:t,request:r,contentLength:n,client:o,bytesWritten:C,expectsPayload:l,header:B}=this;if(t[kError])throw t[kError];if(t.destroyed)return !1;const I=Buffer.byteLength(A);if(!I)return !0;if(n!==null&&C+I>n){if(o[kStrictContentLength])throw new RequestContentLengthMismatchError;process.emitWarning(new RequestContentLengthMismatchError);}t.cork(),C===0&&(l||(t[kReset]=!0),n===null?t.write(`${B}transfer-encoding: chunked\r
`,"latin1"):t.write(`${B}content-length: ${n}\r
\r
`,"latin1")),n===null&&t.write(`\r
${I.toString(16)}\r
`,"latin1"),this.bytesWritten+=I;const c=t.write(A);return t.uncork(),r.onBodySent(A),c||t[kParser].timeout&&t[kParser].timeoutType===TIMEOUT_HEADERS&&t[kParser].timeout.refresh&&t[kParser].timeout.refresh(),c}end(){const{socket:A,contentLength:t,client:r,bytesWritten:n,expectsPayload:o,header:C,request:l}=this;if(l.onRequestSent(),A[kWriting]=!1,A[kError])throw A[kError];if(!A.destroyed){if(n===0?o?A.write(`${C}content-length: 0\r
\r
`,"latin1"):A.write(`${C}\r
`,"latin1"):t===null&&A.write(`\r
0\r
\r
`,"latin1"),t!==null&&n!==t){if(r[kStrictContentLength])throw new RequestContentLengthMismatchError;process.emitWarning(new RequestContentLengthMismatchError);}A[kParser].timeout&&A[kParser].timeoutType===TIMEOUT_HEADERS&&A[kParser].timeout.refresh&&A[kParser].timeout.refresh(),resume$1(r);}}destroy(A){const{socket:t,client:r}=this;t[kWriting]=!1,A&&(assert$4(r[kRunning$3]<=1,"pipeline should only contain this request"),util$e.destroy(t,A));}};Q(Et,"AsyncWriter");let AsyncWriter=Et;function errorRequest(e,A,t){try{A.onError(t),assert$4(A.aborted);}catch(r){e.emit("error",r);}}Q(errorRequest,"errorRequest");var client=Client$3;const kSize$2=2048,kMask=kSize$2-1,Qt=class Qt{constructor(){this.bottom=0,this.top=0,this.list=new Array(kSize$2),this.next=null;}isEmpty(){return this.top===this.bottom}isFull(){return (this.top+1&kMask)===this.bottom}push(A){this.list[this.top]=A,this.top=this.top+1&kMask;}shift(){const A=this.list[this.bottom];return A===void 0?null:(this.list[this.bottom]=void 0,this.bottom=this.bottom+1&kMask,A)}};Q(Qt,"FixedCircularBuffer");let FixedCircularBuffer=Qt;var fixedQueue=(Ge=class{constructor(){this.head=this.tail=new FixedCircularBuffer;}isEmpty(){return this.head.isEmpty()}push(A){this.head.isFull()&&(this.head=this.head.next=new FixedCircularBuffer),this.head.push(A);}shift(){const A=this.tail,t=A.shift();return A.isEmpty()&&A.next!==null&&(this.tail=A.next),t}},Q(Ge,"FixedQueue"),Ge);const{kFree:kFree$1,kConnected:kConnected$3,kPending:kPending$1,kQueued:kQueued$1,kRunning:kRunning$2,kSize:kSize$1}=symbols$4,kPool=Symbol("pool");let PoolStats$1=(xe=class{constructor(A){this[kPool]=A;}get connected(){return this[kPool][kConnected$3]}get free(){return this[kPool][kFree$1]}get pending(){return this[kPool][kPending$1]}get queued(){return this[kPool][kQueued$1]}get running(){return this[kPool][kRunning$2]}get size(){return this[kPool][kSize$1]}},Q(xe,"PoolStats"),xe);var poolStats=PoolStats$1;const DispatcherBase$2=dispatcherBase,FixedQueue=fixedQueue,{kConnected:kConnected$2,kSize,kRunning:kRunning$1,kPending,kQueued,kBusy,kFree,kUrl:kUrl$1,kClose:kClose$4,kDestroy:kDestroy$2,kDispatch:kDispatch$1}=symbols$4,PoolStats=poolStats,kClients$2=Symbol("clients"),kNeedDrain$1=Symbol("needDrain"),kQueue=Symbol("queue"),kClosedResolve=Symbol("closed resolve"),kOnDrain$1=Symbol("onDrain"),kOnConnect$1=Symbol("onConnect"),kOnDisconnect$1=Symbol("onDisconnect"),kOnConnectionError$1=Symbol("onConnectionError"),kGetDispatcher$1=Symbol("get dispatcher"),kAddClient$1=Symbol("add client"),kRemoveClient=Symbol("remove client"),kStats=Symbol("stats");let PoolBase$1=(Te=class extends DispatcherBase$2{constructor(){super(),this[kQueue]=new FixedQueue,this[kClients$2]=[],this[kQueued]=0;const A=this;this[kOnDrain$1]=Q(function(r,n){const o=A[kQueue];let C=!1;for(;!C;){const l=o.shift();if(!l)break;A[kQueued]--,C=!this.dispatch(l.opts,l.handler);}this[kNeedDrain$1]=C,!this[kNeedDrain$1]&&A[kNeedDrain$1]&&(A[kNeedDrain$1]=!1,A.emit("drain",r,[A,...n])),A[kClosedResolve]&&o.isEmpty()&&Promise.all(A[kClients$2].map(l=>l.close())).then(A[kClosedResolve]);},"onDrain"),this[kOnConnect$1]=(t,r)=>{A.emit("connect",t,[A,...r]);},this[kOnDisconnect$1]=(t,r,n)=>{A.emit("disconnect",t,[A,...r],n);},this[kOnConnectionError$1]=(t,r,n)=>{A.emit("connectionError",t,[A,...r],n);},this[kStats]=new PoolStats(this);}get[kBusy](){return this[kNeedDrain$1]}get[kConnected$2](){return this[kClients$2].filter(A=>A[kConnected$2]).length}get[kFree](){return this[kClients$2].filter(A=>A[kConnected$2]&&!A[kNeedDrain$1]).length}get[kPending](){let A=this[kQueued];for(const{[kPending]:t}of this[kClients$2])A+=t;return A}get[kRunning$1](){let A=0;for(const{[kRunning$1]:t}of this[kClients$2])A+=t;return A}get[kSize](){let A=this[kQueued];for(const{[kSize]:t}of this[kClients$2])A+=t;return A}get stats(){return this[kStats]}async[kClose$4](){return this[kQueue].isEmpty()?Promise.all(this[kClients$2].map(A=>A.close())):new Promise(A=>{this[kClosedResolve]=A;})}async[kDestroy$2](A){for(;;){const t=this[kQueue].shift();if(!t)break;t.handler.onError(A);}return Promise.all(this[kClients$2].map(t=>t.destroy(A)))}[kDispatch$1](A,t){const r=this[kGetDispatcher$1]();return r?r.dispatch(A,t)||(r[kNeedDrain$1]=!0,this[kNeedDrain$1]=!this[kGetDispatcher$1]()):(this[kNeedDrain$1]=!0,this[kQueue].push({opts:A,handler:t}),this[kQueued]++),!this[kNeedDrain$1]}[kAddClient$1](A){return A.on("drain",this[kOnDrain$1]).on("connect",this[kOnConnect$1]).on("disconnect",this[kOnDisconnect$1]).on("connectionError",this[kOnConnectionError$1]),this[kClients$2].push(A),this[kNeedDrain$1]&&process.nextTick(()=>{this[kNeedDrain$1]&&this[kOnDrain$1](A[kUrl$1],[this,A]);}),this}[kRemoveClient](A){A.close(()=>{const t=this[kClients$2].indexOf(A);t!==-1&&this[kClients$2].splice(t,1);}),this[kNeedDrain$1]=this[kClients$2].some(t=>!t[kNeedDrain$1]&&t.closed!==!0&&t.destroyed!==!0);}},Q(Te,"PoolBase"),Te);var poolBase={PoolBase:PoolBase$1,kClients:kClients$2,kNeedDrain:kNeedDrain$1,kAddClient:kAddClient$1,kRemoveClient,kGetDispatcher:kGetDispatcher$1};const{PoolBase,kClients:kClients$1,kNeedDrain,kAddClient,kGetDispatcher}=poolBase,Client$2=client,{InvalidArgumentError:InvalidArgumentError$d}=errors$1,util$d=util$j,{kUrl,kInterceptors:kInterceptors$2}=symbols$4,buildConnector$1=connect$2,kOptions$1=Symbol("options"),kConnections=Symbol("connections"),kFactory$1=Symbol("factory");function defaultFactory$2(e,A){return new Client$2(e,A)}Q(defaultFactory$2,"defaultFactory$2");let Pool$3=(He=class extends PoolBase{constructor(A,{connections:t,factory:r=defaultFactory$2,connect:n,connectTimeout:o,tls:C,maxCachedSessions:l,socketPath:B,autoSelectFamily:I,autoSelectFamilyAttemptTimeout:c,allowH2:y,...f}={}){if(super(),t!=null&&(!Number.isFinite(t)||t<0))throw new InvalidArgumentError$d("invalid connections");if(typeof r!="function")throw new InvalidArgumentError$d("factory must be a function.");if(n!=null&&typeof n!="function"&&typeof n!="object")throw new InvalidArgumentError$d("connect must be a function or an object");typeof n!="function"&&(n=buildConnector$1({...C,maxCachedSessions:l,allowH2:y,socketPath:B,timeout:o,...util$d.nodeHasAutoSelectFamily&&I?{autoSelectFamily:I,autoSelectFamilyAttemptTimeout:c}:void 0,...n})),this[kInterceptors$2]=f.interceptors&&f.interceptors.Pool&&Array.isArray(f.interceptors.Pool)?f.interceptors.Pool:[],this[kConnections]=t||null,this[kUrl]=util$d.parseOrigin(A),this[kOptions$1]={...util$d.deepClone(f),connect:n,allowH2:y},this[kOptions$1].interceptors=f.interceptors?{...f.interceptors}:void 0,this[kFactory$1]=r;}[kGetDispatcher](){let A=this[kClients$1].find(t=>!t[kNeedDrain]);return A||((!this[kConnections]||this[kClients$1].length<this[kConnections])&&(A=this[kFactory$1](this[kUrl],this[kOptions$1]),this[kAddClient](A)),A)}},Q(He,"Pool"),He);var pool=Pool$3;const{InvalidArgumentError:InvalidArgumentError$c}=errors$1,{kClients,kRunning,kClose:kClose$3,kDestroy:kDestroy$1,kDispatch,kInterceptors:kInterceptors$1}=symbols$4,DispatcherBase$1=dispatcherBase,Pool$2=pool,Client$1=client,util$c=util$j,createRedirectInterceptor=redirectInterceptor,kOnConnect=Symbol("onConnect"),kOnDisconnect=Symbol("onDisconnect"),kOnConnectionError=Symbol("onConnectionError"),kMaxRedirections=Symbol("maxRedirections"),kOnDrain=Symbol("onDrain"),kFactory=Symbol("factory"),kOptions=Symbol("options");function defaultFactory$1(e,A){return A&&A.connections===1?new Client$1(e,A):new Pool$2(e,A)}Q(defaultFactory$1,"defaultFactory$1");let Agent$3=(Ve=class extends DispatcherBase$1{constructor({factory:A=defaultFactory$1,maxRedirections:t=0,connect:r,...n}={}){if(super(),typeof A!="function")throw new InvalidArgumentError$c("factory must be a function.");if(r!=null&&typeof r!="function"&&typeof r!="object")throw new InvalidArgumentError$c("connect must be a function or an object");if(!Number.isInteger(t)||t<0)throw new InvalidArgumentError$c("maxRedirections must be a positive number");r&&typeof r!="function"&&(r={...r}),this[kInterceptors$1]=n.interceptors&&n.interceptors.Agent&&Array.isArray(n.interceptors.Agent)?n.interceptors.Agent:[createRedirectInterceptor({maxRedirections:t})],this[kOptions]={...util$c.deepClone(n),connect:r},this[kOptions].interceptors=n.interceptors?{...n.interceptors}:void 0,this[kMaxRedirections]=t,this[kFactory]=A,this[kClients]=new Map;const o=this;this[kOnDrain]=(C,l)=>{o.emit("drain",C,[o,...l]);},this[kOnConnect]=(C,l)=>{o.emit("connect",C,[o,...l]);},this[kOnDisconnect]=(C,l,B)=>{o.emit("disconnect",C,[o,...l],B);},this[kOnConnectionError]=(C,l,B)=>{o.emit("connectionError",C,[o,...l],B);};}get[kRunning](){let A=0;for(const t of this[kClients].values())A+=t[kRunning];return A}[kDispatch](A,t){let r;if(A.origin&&(typeof A.origin=="string"||A.origin instanceof URL))r=String(A.origin);else throw new InvalidArgumentError$c("opts.origin must be a non-empty string or URL.");let n=this[kClients].get(r);return n||(n=this[kFactory](A.origin,this[kOptions]).on("drain",this[kOnDrain]).on("connect",this[kOnConnect]).on("disconnect",this[kOnDisconnect]).on("connectionError",this[kOnConnectionError]),this[kClients].set(r,n)),n.dispatch(A,t)}async[kClose$3](){const A=[];for(const t of this[kClients].values())A.push(t.close());this[kClients].clear(),await Promise.all(A);}async[kDestroy$1](A){const t=[];for(const r of this[kClients].values())t.push(r.destroy(A));this[kClients].clear(),await Promise.all(t);}},Q(Ve,"Agent"),Ve);var agent=Agent$3,api$1={},apiRequest={exports:{}};const assert$3=require$$0__default,{Readable:Readable$2}=require$$0__default$1,{RequestAbortedError:RequestAbortedError$7,NotSupportedError,InvalidArgumentError:InvalidArgumentError$b,AbortError}=errors$1,util$b=util$j,{ReadableStreamFrom}=util$j,kConsume=Symbol("kConsume"),kReading=Symbol("kReading"),kBody=Symbol("kBody"),kAbort=Symbol("abort"),kContentType=Symbol("kContentType"),noop=Q(()=>{},"noop");var readable=(ve=class extends Readable$2{constructor({resume:A,abort:t,contentType:r="",highWaterMark:n=64*1024}){super({autoDestroy:!0,read:A,highWaterMark:n}),this._readableState.dataEmitted=!1,this[kAbort]=t,this[kConsume]=null,this[kBody]=null,this[kContentType]=r,this[kReading]=!1;}destroy(A){return !A&&!this._readableState.endEmitted&&(A=new RequestAbortedError$7),A&&this[kAbort](),super.destroy(A)}_destroy(A,t){queueMicrotask(()=>{t(A);});}on(A,...t){return (A==="data"||A==="readable")&&(this[kReading]=!0),super.on(A,...t)}addListener(A,...t){return this.on(A,...t)}off(A,...t){const r=super.off(A,...t);return (A==="data"||A==="readable")&&(this[kReading]=this.listenerCount("data")>0||this.listenerCount("readable")>0),r}removeListener(A,...t){return this.off(A,...t)}push(A){return this[kConsume]&&A!==null&&this.readableLength===0?(consumePush(this[kConsume],A),this[kReading]?super.push(A):!0):super.push(A)}async text(){return consume(this,"text")}async json(){return consume(this,"json")}async blob(){return consume(this,"blob")}async arrayBuffer(){return consume(this,"arrayBuffer")}async formData(){throw new NotSupportedError}get bodyUsed(){return util$b.isDisturbed(this)}get body(){return this[kBody]||(this[kBody]=ReadableStreamFrom(this),this[kConsume]&&(this[kBody].getReader(),assert$3(this[kBody].locked))),this[kBody]}async dump(A){let t=Number.isFinite(A?.limit)?A.limit:262144;const r=A?.signal;if(r!=null&&(typeof r!="object"||!("aborted"in r)))throw new InvalidArgumentError$b("signal must be an AbortSignal");return r?.throwIfAborted(),this._readableState.closeEmitted?null:await new Promise((n,o)=>{const C=Q(()=>{this.destroy(r.reason??new AbortError);},"onAbort");r?.addEventListener("abort",C),this.on("close",function(){r?.removeEventListener("abort",C),r?.aborted?o(r.reason??new AbortError):n(null);}).on("error",noop).on("data",function(l){t-=l.length,t<=0&&this.destroy();}).resume();})}},Q(ve,"BodyReadable"),ve);function isLocked(e){return e[kBody]&&e[kBody].locked===!0||e[kConsume]}Q(isLocked,"isLocked");function isUnusable(e){return util$b.isDisturbed(e)||isLocked(e)}Q(isUnusable,"isUnusable");async function consume(e,A){return assert$3(!e[kConsume]),new Promise((t,r)=>{if(isUnusable(e)){const n=e._readableState;n.destroyed&&n.closeEmitted===!1?e.on("error",o=>{r(o);}).on("close",()=>{r(new TypeError("unusable"));}):r(n.errored??new TypeError("unusable"));}else e[kConsume]={type:A,stream:e,resolve:t,reject:r,length:0,body:[]},e.on("error",function(n){consumeFinish(this[kConsume],n);}).on("close",function(){this[kConsume].body!==null&&consumeFinish(this[kConsume],new RequestAbortedError$7);}),queueMicrotask(()=>consumeStart(e[kConsume]));})}Q(consume,"consume");function consumeStart(e){if(e.body===null)return;const{_readableState:A}=e.stream;for(const t of A.buffer)consumePush(e,t);for(A.endEmitted?consumeEnd(this[kConsume]):e.stream.on("end",function(){consumeEnd(this[kConsume]);}),e.stream.resume();e.stream.read()!=null;);}Q(consumeStart,"consumeStart");function chunksDecode(e,A){if(e.length===0||A===0)return "";const t=e.length===1?e[0]:Buffer.concat(e,A),r=t.length>=3&&t[0]===239&&t[1]===187&&t[2]===191?3:0;return t.utf8Slice(r,t.length-r)}Q(chunksDecode,"chunksDecode");function consumeEnd(e){const{type:A,body:t,resolve:r,stream:n,length:o}=e;try{if(A==="text")r(chunksDecode(t,o));else if(A==="json")r(JSON.parse(chunksDecode(t,o)));else if(A==="arrayBuffer"){const C=new Uint8Array(o);let l=0;for(const B of t)C.set(B,l),l+=B.byteLength;r(C.buffer);}else A==="blob"&&r(new Blob(t,{type:n[kContentType]}));consumeFinish(e);}catch(C){n.destroy(C);}}Q(consumeEnd,"consumeEnd");function consumePush(e,A){e.length+=A.length,e.body.push(A);}Q(consumePush,"consumePush");function consumeFinish(e,A){e.body!==null&&(A?e.reject(A):e.resolve(),e.type=null,e.stream=null,e.resolve=null,e.reject=null,e.length=0,e.body=null);}Q(consumeFinish,"consumeFinish");const assert$2=require$$0__default,{ResponseStatusCodeError}=errors$1,{toUSVString}=util$j;async function getResolveErrorBodyCallback$2({callback:e,body:A,contentType:t,statusCode:r,statusMessage:n,headers:o}){assert$2(A);let C=[],l=0;for await(const B of A)if(C.push(B),l+=B.length,l>128*1024){C=null;break}if(r===204||!t||!C){process.nextTick(e,new ResponseStatusCodeError(`Response status code ${r}${n?`: ${n}`:""}`,r,o));return}try{if(t.startsWith("application/json")){const B=JSON.parse(toUSVString(Buffer.concat(C)));process.nextTick(e,new ResponseStatusCodeError(`Response status code ${r}${n?`: ${n}`:""}`,r,o,B));return}if(t.startsWith("text/")){const B=toUSVString(Buffer.concat(C));process.nextTick(e,new ResponseStatusCodeError(`Response status code ${r}${n?`: ${n}`:""}`,r,o,B));return}}catch{}process.nextTick(e,new ResponseStatusCodeError(`Response status code ${r}${n?`: ${n}`:""}`,r,o));}Q(getResolveErrorBodyCallback$2,"getResolveErrorBodyCallback$2");var util$a={getResolveErrorBodyCallback:getResolveErrorBodyCallback$2};const{addAbortListener}=util$j,{RequestAbortedError:RequestAbortedError$6}=errors$1,kListener=Symbol("kListener"),kSignal=Symbol("kSignal");function abort(e){e.abort?e.abort():e.onError(new RequestAbortedError$6);}Q(abort,"abort");function addSignal$5(e,A){if(e[kSignal]=null,e[kListener]=null,!!A){if(A.aborted){abort(e);return}e[kSignal]=A,e[kListener]=()=>{abort(e);},addAbortListener(e[kSignal],e[kListener]);}}Q(addSignal$5,"addSignal$5");function removeSignal$5(e){e[kSignal]&&("removeEventListener"in e[kSignal]?e[kSignal].removeEventListener("abort",e[kListener]):e[kSignal].removeListener("abort",e[kListener]),e[kSignal]=null,e[kListener]=null);}Q(removeSignal$5,"removeSignal$5");var abortSignal={addSignal:addSignal$5,removeSignal:removeSignal$5};const Readable$1=readable,{InvalidArgumentError:InvalidArgumentError$a,RequestAbortedError:RequestAbortedError$5}=errors$1,util$9=util$j,{getResolveErrorBodyCallback:getResolveErrorBodyCallback$1}=util$a,{AsyncResource:AsyncResource$4}=require$$4__default,{addSignal:addSignal$4,removeSignal:removeSignal$4}=abortSignal,gt=class gt extends AsyncResource$4{constructor(A,t){if(!A||typeof A!="object")throw new InvalidArgumentError$a("invalid opts");const{signal:r,method:n,opaque:o,body:C,onInfo:l,responseHeaders:B,throwOnError:I,highWaterMark:c}=A;try{if(typeof t!="function")throw new InvalidArgumentError$a("invalid callback");if(c&&(typeof c!="number"||c<0))throw new InvalidArgumentError$a("invalid highWaterMark");if(r&&typeof r.on!="function"&&typeof r.addEventListener!="function")throw new InvalidArgumentError$a("signal must be an EventEmitter or EventTarget");if(n==="CONNECT")throw new InvalidArgumentError$a("invalid method");if(l&&typeof l!="function")throw new InvalidArgumentError$a("invalid onInfo callback");super("UNDICI_REQUEST");}catch(y){throw util$9.isStream(C)&&util$9.destroy(C.on("error",util$9.nop),y),y}this.responseHeaders=B||null,this.opaque=o||null,this.callback=t,this.res=null,this.abort=null,this.body=C,this.trailers={},this.context=null,this.onInfo=l||null,this.throwOnError=I,this.highWaterMark=c,util$9.isStream(C)&&C.on("error",y=>{this.onError(y);}),addSignal$4(this,r);}onConnect(A,t){if(!this.callback)throw new RequestAbortedError$5;this.abort=A,this.context=t;}onHeaders(A,t,r,n){const{callback:o,opaque:C,abort:l,context:B,responseHeaders:I,highWaterMark:c}=this,y=I==="raw"?util$9.parseRawHeaders(t):util$9.parseHeaders(t);if(A<200){this.onInfo&&this.onInfo({statusCode:A,headers:y});return}const D=(I==="raw"?util$9.parseHeaders(t):y)["content-type"],S=new Readable$1({resume:r,abort:l,contentType:D,highWaterMark:c});this.callback=null,this.res=S,o!==null&&(this.throwOnError&&A>=400?this.runInAsyncScope(getResolveErrorBodyCallback$1,null,{callback:o,body:S,contentType:D,statusCode:A,statusMessage:n,headers:y}):this.runInAsyncScope(o,null,null,{statusCode:A,headers:y,trailers:this.trailers,opaque:C,body:S,context:B}));}onData(A){const{res:t}=this;return t.push(A)}onComplete(A){const{res:t}=this;removeSignal$4(this),util$9.parseHeaders(A,this.trailers),t.push(null);}onError(A){const{res:t,callback:r,body:n,opaque:o}=this;removeSignal$4(this),r&&(this.callback=null,queueMicrotask(()=>{this.runInAsyncScope(r,null,A,{opaque:o});})),t&&(this.res=null,queueMicrotask(()=>{util$9.destroy(t,A);})),n&&(this.body=null,util$9.destroy(n,A));}};Q(gt,"RequestHandler");let RequestHandler=gt;function request$1(e,A){if(A===void 0)return new Promise((t,r)=>{request$1.call(this,e,(n,o)=>n?r(n):t(o));});try{this.dispatch(e,new RequestHandler(e,A));}catch(t){if(typeof A!="function")throw t;const r=e&&e.opaque;queueMicrotask(()=>A(t,{opaque:r}));}}Q(request$1,"request$1"),apiRequest.exports=request$1,apiRequest.exports.RequestHandler=RequestHandler;var apiRequestExports=apiRequest.exports;const{finished,PassThrough:PassThrough$1}=require$$0__default$1,{InvalidArgumentError:InvalidArgumentError$9,InvalidReturnValueError:InvalidReturnValueError$1,RequestAbortedError:RequestAbortedError$4}=errors$1,util$8=util$j,{getResolveErrorBodyCallback}=util$a,{AsyncResource:AsyncResource$3}=require$$4__default,{addSignal:addSignal$3,removeSignal:removeSignal$3}=abortSignal,Ct=class Ct extends AsyncResource$3{constructor(A,t,r){if(!A||typeof A!="object")throw new InvalidArgumentError$9("invalid opts");const{signal:n,method:o,opaque:C,body:l,onInfo:B,responseHeaders:I,throwOnError:c}=A;try{if(typeof r!="function")throw new InvalidArgumentError$9("invalid callback");if(typeof t!="function")throw new InvalidArgumentError$9("invalid factory");if(n&&typeof n.on!="function"&&typeof n.addEventListener!="function")throw new InvalidArgumentError$9("signal must be an EventEmitter or EventTarget");if(o==="CONNECT")throw new InvalidArgumentError$9("invalid method");if(B&&typeof B!="function")throw new InvalidArgumentError$9("invalid onInfo callback");super("UNDICI_STREAM");}catch(y){throw util$8.isStream(l)&&util$8.destroy(l.on("error",util$8.nop),y),y}this.responseHeaders=I||null,this.opaque=C||null,this.factory=t,this.callback=r,this.res=null,this.abort=null,this.context=null,this.trailers=null,this.body=l,this.onInfo=B||null,this.throwOnError=c||!1,util$8.isStream(l)&&l.on("error",y=>{this.onError(y);}),addSignal$3(this,n);}onConnect(A,t){if(!this.callback)throw new RequestAbortedError$4;this.abort=A,this.context=t;}onHeaders(A,t,r,n){const{factory:o,opaque:C,context:l,callback:B,responseHeaders:I}=this,c=I==="raw"?util$8.parseRawHeaders(t):util$8.parseHeaders(t);if(A<200){this.onInfo&&this.onInfo({statusCode:A,headers:c});return}this.factory=null;let y;if(this.throwOnError&&A>=400){const S=(I==="raw"?util$8.parseHeaders(t):c)["content-type"];y=new PassThrough$1,this.callback=null,this.runInAsyncScope(getResolveErrorBodyCallback,null,{callback:B,body:y,contentType:S,statusCode:A,statusMessage:n,headers:c});}else {if(o===null)return;if(y=this.runInAsyncScope(o,null,{statusCode:A,headers:c,opaque:C,context:l}),!y||typeof y.write!="function"||typeof y.end!="function"||typeof y.on!="function")throw new InvalidReturnValueError$1("expected Writable");finished(y,{readable:!1},D=>{const{callback:S,res:R,opaque:F,trailers:p,abort:m}=this;this.res=null,(D||!R.readable)&&util$8.destroy(R,D),this.callback=null,this.runInAsyncScope(S,null,D||null,{opaque:F,trailers:p}),D&&m();});}return y.on("drain",r),this.res=y,(y.writableNeedDrain!==void 0?y.writableNeedDrain:y._writableState&&y._writableState.needDrain)!==!0}onData(A){const{res:t}=this;return t?t.write(A):!0}onComplete(A){const{res:t}=this;removeSignal$3(this),t&&(this.trailers=util$8.parseHeaders(A),t.end());}onError(A){const{res:t,callback:r,opaque:n,body:o}=this;removeSignal$3(this),this.factory=null,t?(this.res=null,util$8.destroy(t,A)):r&&(this.callback=null,queueMicrotask(()=>{this.runInAsyncScope(r,null,A,{opaque:n});})),o&&(this.body=null,util$8.destroy(o,A));}};Q(Ct,"StreamHandler");let StreamHandler=Ct;function stream(e,A,t){if(t===void 0)return new Promise((r,n)=>{stream.call(this,e,A,(o,C)=>o?n(o):r(C));});try{this.dispatch(e,new StreamHandler(e,A,t));}catch(r){if(typeof t!="function")throw r;const n=e&&e.opaque;queueMicrotask(()=>t(r,{opaque:n}));}}Q(stream,"stream");var apiStream=stream;const{Readable,Duplex,PassThrough}=require$$0__default$1,{InvalidArgumentError:InvalidArgumentError$8,InvalidReturnValueError,RequestAbortedError:RequestAbortedError$3}=errors$1,util$7=util$j,{AsyncResource:AsyncResource$2}=require$$4__default,{addSignal:addSignal$2,removeSignal:removeSignal$2}=abortSignal,assert$1=require$$0__default,kResume=Symbol("resume"),Bt=class Bt extends Readable{constructor(){super({autoDestroy:!0}),this[kResume]=null;}_read(){const{[kResume]:A}=this;A&&(this[kResume]=null,A());}_destroy(A,t){this._read(),t(A);}};Q(Bt,"PipelineRequest");let PipelineRequest=Bt;const It=class It extends Readable{constructor(A){super({autoDestroy:!0}),this[kResume]=A;}_read(){this[kResume]();}_destroy(A,t){!A&&!this._readableState.endEmitted&&(A=new RequestAbortedError$3),t(A);}};Q(It,"PipelineResponse");let PipelineResponse=It;const at=class at extends AsyncResource$2{constructor(A,t){if(!A||typeof A!="object")throw new InvalidArgumentError$8("invalid opts");if(typeof t!="function")throw new InvalidArgumentError$8("invalid handler");const{signal:r,method:n,opaque:o,onInfo:C,responseHeaders:l}=A;if(r&&typeof r.on!="function"&&typeof r.addEventListener!="function")throw new InvalidArgumentError$8("signal must be an EventEmitter or EventTarget");if(n==="CONNECT")throw new InvalidArgumentError$8("invalid method");if(C&&typeof C!="function")throw new InvalidArgumentError$8("invalid onInfo callback");super("UNDICI_PIPELINE"),this.opaque=o||null,this.responseHeaders=l||null,this.handler=t,this.abort=null,this.context=null,this.onInfo=C||null,this.req=new PipelineRequest().on("error",util$7.nop),this.ret=new Duplex({readableObjectMode:A.objectMode,autoDestroy:!0,read:()=>{const{body:B}=this;B&&B.resume&&B.resume();},write:(B,I,c)=>{const{req:y}=this;y.push(B,I)||y._readableState.destroyed?c():y[kResume]=c;},destroy:(B,I)=>{const{body:c,req:y,res:f,ret:D,abort:S}=this;!B&&!D._readableState.endEmitted&&(B=new RequestAbortedError$3),S&&B&&S(),util$7.destroy(c,B),util$7.destroy(y,B),util$7.destroy(f,B),removeSignal$2(this),I(B);}}).on("prefinish",()=>{const{req:B}=this;B.push(null);}),this.res=null,addSignal$2(this,r);}onConnect(A,t){const{ret:r,res:n}=this;if(assert$1(!n,"pipeline cannot be retried"),r.destroyed)throw new RequestAbortedError$3;this.abort=A,this.context=t;}onHeaders(A,t,r){const{opaque:n,handler:o,context:C}=this;if(A<200){if(this.onInfo){const B=this.responseHeaders==="raw"?util$7.parseRawHeaders(t):util$7.parseHeaders(t);this.onInfo({statusCode:A,headers:B});}return}this.res=new PipelineResponse(r);let l;try{this.handler=null;const B=this.responseHeaders==="raw"?util$7.parseRawHeaders(t):util$7.parseHeaders(t);l=this.runInAsyncScope(o,null,{statusCode:A,headers:B,opaque:n,body:this.res,context:C});}catch(B){throw this.res.on("error",util$7.nop),B}if(!l||typeof l.on!="function")throw new InvalidReturnValueError("expected Readable");l.on("data",B=>{const{ret:I,body:c}=this;!I.push(B)&&c.pause&&c.pause();}).on("error",B=>{const{ret:I}=this;util$7.destroy(I,B);}).on("end",()=>{const{ret:B}=this;B.push(null);}).on("close",()=>{const{ret:B}=this;B._readableState.ended||util$7.destroy(B,new RequestAbortedError$3);}),this.body=l;}onData(A){const{res:t}=this;return t.push(A)}onComplete(A){const{res:t}=this;t.push(null);}onError(A){const{ret:t}=this;this.handler=null,util$7.destroy(t,A);}};Q(at,"PipelineHandler");let PipelineHandler=at;function pipeline(e,A){try{const t=new PipelineHandler(e,A);return this.dispatch({...e,body:t.req},t),t.ret}catch(t){return new PassThrough().destroy(t)}}Q(pipeline,"pipeline");var apiPipeline=pipeline;const{InvalidArgumentError:InvalidArgumentError$7,RequestAbortedError:RequestAbortedError$2,SocketError:SocketError$1}=errors$1,{AsyncResource:AsyncResource$1}=require$$4__default,util$6=util$j,{addSignal:addSignal$1,removeSignal:removeSignal$1}=abortSignal,assert=require$$0__default,ct=class ct extends AsyncResource$1{constructor(A,t){if(!A||typeof A!="object")throw new InvalidArgumentError$7("invalid opts");if(typeof t!="function")throw new InvalidArgumentError$7("invalid callback");const{signal:r,opaque:n,responseHeaders:o}=A;if(r&&typeof r.on!="function"&&typeof r.addEventListener!="function")throw new InvalidArgumentError$7("signal must be an EventEmitter or EventTarget");super("UNDICI_UPGRADE"),this.responseHeaders=o||null,this.opaque=n||null,this.callback=t,this.abort=null,this.context=null,addSignal$1(this,r);}onConnect(A,t){if(!this.callback)throw new RequestAbortedError$2;this.abort=A,this.context=null;}onHeaders(){throw new SocketError$1("bad upgrade",null)}onUpgrade(A,t,r){const{callback:n,opaque:o,context:C}=this;assert.strictEqual(A,101),removeSignal$1(this),this.callback=null;const l=this.responseHeaders==="raw"?util$6.parseRawHeaders(t):util$6.parseHeaders(t);this.runInAsyncScope(n,null,null,{headers:l,socket:r,opaque:o,context:C});}onError(A){const{callback:t,opaque:r}=this;removeSignal$1(this),t&&(this.callback=null,queueMicrotask(()=>{this.runInAsyncScope(t,null,A,{opaque:r});}));}};Q(ct,"UpgradeHandler");let UpgradeHandler=ct;function upgrade(e,A){if(A===void 0)return new Promise((t,r)=>{upgrade.call(this,e,(n,o)=>n?r(n):t(o));});try{const t=new UpgradeHandler(e,A);this.dispatch({...e,method:e.method||"GET",upgrade:e.protocol||"Websocket"},t);}catch(t){if(typeof A!="function")throw t;const r=e&&e.opaque;queueMicrotask(()=>A(t,{opaque:r}));}}Q(upgrade,"upgrade");var apiUpgrade=upgrade;const{AsyncResource}=require$$4__default,{InvalidArgumentError:InvalidArgumentError$6,RequestAbortedError:RequestAbortedError$1,SocketError}=errors$1,util$5=util$j,{addSignal,removeSignal}=abortSignal,ht=class ht extends AsyncResource{constructor(A,t){if(!A||typeof A!="object")throw new InvalidArgumentError$6("invalid opts");if(typeof t!="function")throw new InvalidArgumentError$6("invalid callback");const{signal:r,opaque:n,responseHeaders:o}=A;if(r&&typeof r.on!="function"&&typeof r.addEventListener!="function")throw new InvalidArgumentError$6("signal must be an EventEmitter or EventTarget");super("UNDICI_CONNECT"),this.opaque=n||null,this.responseHeaders=o||null,this.callback=t,this.abort=null,addSignal(this,r);}onConnect(A,t){if(!this.callback)throw new RequestAbortedError$1;this.abort=A,this.context=t;}onHeaders(){throw new SocketError("bad connect",null)}onUpgrade(A,t,r){const{callback:n,opaque:o,context:C}=this;removeSignal(this),this.callback=null;let l=t;l!=null&&(l=this.responseHeaders==="raw"?util$5.parseRawHeaders(t):util$5.parseHeaders(t)),this.runInAsyncScope(n,null,null,{statusCode:A,headers:l,socket:r,opaque:o,context:C});}onError(A){const{callback:t,opaque:r}=this;removeSignal(this),t&&(this.callback=null,queueMicrotask(()=>{this.runInAsyncScope(t,null,A,{opaque:r});}));}};Q(ht,"ConnectHandler");let ConnectHandler=ht;function connect(e,A){if(A===void 0)return new Promise((t,r)=>{connect.call(this,e,(n,o)=>n?r(n):t(o));});try{const t=new ConnectHandler(e,A);this.dispatch({...e,method:"CONNECT"},t);}catch(t){if(typeof A!="function")throw t;const r=e&&e.opaque;queueMicrotask(()=>A(t,{opaque:r}));}}Q(connect,"connect");var apiConnect=connect;api$1.request=apiRequestExports,api$1.stream=apiStream,api$1.pipeline=apiPipeline,api$1.upgrade=apiUpgrade,api$1.connect=apiConnect;const{UndiciError}=errors$1;let MockNotMatchedError$1=(ge=class extends UndiciError{constructor(A){super(A),Error.captureStackTrace(this,ge),this.name="MockNotMatchedError",this.message=A||"The request does not match any registered mock dispatches",this.code="UND_MOCK_ERR_MOCK_NOT_MATCHED";}},Q(ge,"MockNotMatchedError"),ge);var mockErrors={MockNotMatchedError:MockNotMatchedError$1},mockSymbols={kAgent:Symbol("agent"),kOptions:Symbol("options"),kFactory:Symbol("factory"),kDispatches:Symbol("dispatches"),kDispatchKey:Symbol("dispatch key"),kDefaultHeaders:Symbol("default headers"),kDefaultTrailers:Symbol("default trailers"),kContentLength:Symbol("content length"),kMockAgent:Symbol("mock agent"),kMockAgentSet:Symbol("mock agent set"),kMockAgentGet:Symbol("mock agent get"),kMockDispatch:Symbol("mock dispatch"),kClose:Symbol("close"),kOriginalClose:Symbol("original agent close"),kOrigin:Symbol("origin"),kIsMockActive:Symbol("is mock active"),kNetConnect:Symbol("net connect"),kGetNetConnect:Symbol("get net connect"),kConnected:Symbol("connected")};const{MockNotMatchedError}=mockErrors,{kDispatches:kDispatches$3,kMockAgent:kMockAgent$2,kOriginalDispatch:kOriginalDispatch$2,kOrigin:kOrigin$2,kGetNetConnect}=mockSymbols,{buildURL:buildURL$1,nop}=util$j,{STATUS_CODES}=require$$2__default,{types:{isPromise}}=require$$0__default$3;function matchValue(e,A){return typeof e=="string"?e===A:e instanceof RegExp?e.test(A):typeof e=="function"?e(A)===!0:!1}Q(matchValue,"matchValue");function lowerCaseEntries(e){return Object.fromEntries(Object.entries(e).map(([A,t])=>[A.toLocaleLowerCase(),t]))}Q(lowerCaseEntries,"lowerCaseEntries");function getHeaderByName(e,A){if(Array.isArray(e)){for(let t=0;t<e.length;t+=2)if(e[t].toLocaleLowerCase()===A.toLocaleLowerCase())return e[t+1];return}else return typeof e.get=="function"?e.get(A):lowerCaseEntries(e)[A.toLocaleLowerCase()]}Q(getHeaderByName,"getHeaderByName");function buildHeadersFromArray(e){const A=e.slice(),t=[];for(let r=0;r<A.length;r+=2)t.push([A[r],A[r+1]]);return Object.fromEntries(t)}Q(buildHeadersFromArray,"buildHeadersFromArray");function matchHeaders(e,A){if(typeof e.headers=="function")return Array.isArray(A)&&(A=buildHeadersFromArray(A)),e.headers(A?lowerCaseEntries(A):{});if(typeof e.headers>"u")return !0;if(typeof A!="object"||typeof e.headers!="object")return !1;for(const[t,r]of Object.entries(e.headers)){const n=getHeaderByName(A,t);if(!matchValue(r,n))return !1}return !0}Q(matchHeaders,"matchHeaders");function safeUrl(e){if(typeof e!="string")return e;const A=e.split("?");if(A.length!==2)return e;const t=new URLSearchParams(A.pop());return t.sort(),[...A,t.toString()].join("?")}Q(safeUrl,"safeUrl");function matchKey(e,{path:A,method:t,body:r,headers:n}){const o=matchValue(e.path,A),C=matchValue(e.method,t),l=typeof e.body<"u"?matchValue(e.body,r):!0,B=matchHeaders(e,n);return o&&C&&l&&B}Q(matchKey,"matchKey");function getResponseData$1(e){return Buffer.isBuffer(e)?e:typeof e=="object"?JSON.stringify(e):e.toString()}Q(getResponseData$1,"getResponseData$1");function getMockDispatch(e,A){const t=A.query?buildURL$1(A.path,A.query):A.path,r=typeof t=="string"?safeUrl(t):t;let n=e.filter(({consumed:o})=>!o).filter(({path:o})=>matchValue(safeUrl(o),r));if(n.length===0)throw new MockNotMatchedError(`Mock dispatch not matched for path '${r}'`);if(n=n.filter(({method:o})=>matchValue(o,A.method)),n.length===0)throw new MockNotMatchedError(`Mock dispatch not matched for method '${A.method}'`);if(n=n.filter(({body:o})=>typeof o<"u"?matchValue(o,A.body):!0),n.length===0)throw new MockNotMatchedError(`Mock dispatch not matched for body '${A.body}'`);if(n=n.filter(o=>matchHeaders(o,A.headers)),n.length===0)throw new MockNotMatchedError(`Mock dispatch not matched for headers '${typeof A.headers=="object"?JSON.stringify(A.headers):A.headers}'`);return n[0]}Q(getMockDispatch,"getMockDispatch");function addMockDispatch$1(e,A,t){const r={timesInvoked:0,times:1,persist:!1,consumed:!1},n=typeof t=="function"?{callback:t}:{...t},o={...r,...A,pending:!0,data:{error:null,...n}};return e.push(o),o}Q(addMockDispatch$1,"addMockDispatch$1");function deleteMockDispatch(e,A){const t=e.findIndex(r=>r.consumed?matchKey(r,A):!1);t!==-1&&e.splice(t,1);}Q(deleteMockDispatch,"deleteMockDispatch");function buildKey$1(e){const{path:A,method:t,body:r,headers:n,query:o}=e;return {path:A,method:t,body:r,headers:n,query:o}}Q(buildKey$1,"buildKey$1");function generateKeyValues(e){return Object.entries(e).reduce((A,[t,r])=>[...A,Buffer.from(`${t}`),Array.isArray(r)?r.map(n=>Buffer.from(`${n}`)):Buffer.from(`${r}`)],[])}Q(generateKeyValues,"generateKeyValues");function getStatusText(e){return STATUS_CODES[e]||"unknown"}Q(getStatusText,"getStatusText");async function getResponse(e){const A=[];for await(const t of e)A.push(t);return Buffer.concat(A).toString("utf8")}Q(getResponse,"getResponse");function mockDispatch(e,A){const t=buildKey$1(e),r=getMockDispatch(this[kDispatches$3],t);r.timesInvoked++,r.data.callback&&(r.data={...r.data,...r.data.callback(e)});const{data:{statusCode:n,data:o,headers:C,trailers:l,error:B},delay:I,persist:c}=r,{timesInvoked:y,times:f}=r;if(r.consumed=!c&&y>=f,r.pending=y<f,B!==null)return deleteMockDispatch(this[kDispatches$3],t),A.onError(B),!0;typeof I=="number"&&I>0?setTimeout(()=>{D(this[kDispatches$3]);},I):D(this[kDispatches$3]);function D(R,F=o){const p=Array.isArray(e.headers)?buildHeadersFromArray(e.headers):e.headers,m=typeof F=="function"?F({...e,headers:p}):F;if(isPromise(m)){m.then(N=>D(R,N));return}const k=getResponseData$1(m),w=generateKeyValues(C),b=generateKeyValues(l);A.abort=nop,A.onHeaders(n,w,S,getStatusText(n)),A.onData(Buffer.from(k)),A.onComplete(b),deleteMockDispatch(R,t);}Q(D,"handleReply");function S(){}return Q(S,"resume"),!0}Q(mockDispatch,"mockDispatch");function buildMockDispatch$2(){const e=this[kMockAgent$2],A=this[kOrigin$2],t=this[kOriginalDispatch$2];return Q(function(n,o){if(e.isMockActive)try{mockDispatch.call(this,n,o);}catch(C){if(C instanceof MockNotMatchedError){const l=e[kGetNetConnect]();if(l===!1)throw new MockNotMatchedError(`${C.message}: subsequent request to origin ${A} was not allowed (net.connect disabled)`);if(checkNetConnect(l,A))t.call(this,n,o);else throw new MockNotMatchedError(`${C.message}: subsequent request to origin ${A} was not allowed (net.connect is not enabled for this origin)`)}else throw C}else t.call(this,n,o);},"dispatch")}Q(buildMockDispatch$2,"buildMockDispatch$2");function checkNetConnect(e,A){const t=new URL(A);return e===!0?!0:!!(Array.isArray(e)&&e.some(r=>matchValue(r,t.host)))}Q(checkNetConnect,"checkNetConnect");function buildMockOptions(e){if(e){const{agent:A,...t}=e;return t}}Q(buildMockOptions,"buildMockOptions");var mockUtils={getResponseData:getResponseData$1,getMockDispatch,addMockDispatch:addMockDispatch$1,deleteMockDispatch,buildKey:buildKey$1,generateKeyValues,matchValue,getResponse,getStatusText,mockDispatch,buildMockDispatch:buildMockDispatch$2,checkNetConnect,buildMockOptions,getHeaderByName},mockInterceptor={};const{getResponseData,buildKey,addMockDispatch}=mockUtils,{kDispatches:kDispatches$2,kDispatchKey,kDefaultHeaders,kDefaultTrailers,kContentLength,kMockDispatch}=mockSymbols,{InvalidArgumentError:InvalidArgumentError$5}=errors$1,{buildURL}=util$j,lt=class lt{constructor(A){this[kMockDispatch]=A;}delay(A){if(typeof A!="number"||!Number.isInteger(A)||A<=0)throw new InvalidArgumentError$5("waitInMs must be a valid integer > 0");return this[kMockDispatch].delay=A,this}persist(){return this[kMockDispatch].persist=!0,this}times(A){if(typeof A!="number"||!Number.isInteger(A)||A<=0)throw new InvalidArgumentError$5("repeatTimes must be a valid integer > 0");return this[kMockDispatch].times=A,this}};Q(lt,"MockScope");let MockScope=lt,MockInterceptor$2=(We=class{constructor(A,t){if(typeof A!="object")throw new InvalidArgumentError$5("opts must be an object");if(typeof A.path>"u")throw new InvalidArgumentError$5("opts.path must be defined");if(typeof A.method>"u"&&(A.method="GET"),typeof A.path=="string")if(A.query)A.path=buildURL(A.path,A.query);else {const r=new URL(A.path,"data://");A.path=r.pathname+r.search;}typeof A.method=="string"&&(A.method=A.method.toUpperCase()),this[kDispatchKey]=buildKey(A),this[kDispatches$2]=t,this[kDefaultHeaders]={},this[kDefaultTrailers]={},this[kContentLength]=!1;}createMockScopeDispatchData(A,t,r={}){const n=getResponseData(t),o=this[kContentLength]?{"content-length":n.length}:{},C={...this[kDefaultHeaders],...o,...r.headers},l={...this[kDefaultTrailers],...r.trailers};return {statusCode:A,data:t,headers:C,trailers:l}}validateReplyParameters(A,t,r){if(typeof A>"u")throw new InvalidArgumentError$5("statusCode must be defined");if(typeof t>"u")throw new InvalidArgumentError$5("data must be defined");if(typeof r!="object")throw new InvalidArgumentError$5("responseOptions must be an object")}reply(A){if(typeof A=="function"){const l=Q(I=>{const c=A(I);if(typeof c!="object")throw new InvalidArgumentError$5("reply options callback must return an object");const{statusCode:y,data:f="",responseOptions:D={}}=c;return this.validateReplyParameters(y,f,D),{...this.createMockScopeDispatchData(y,f,D)}},"wrappedDefaultsCallback"),B=addMockDispatch(this[kDispatches$2],this[kDispatchKey],l);return new MockScope(B)}const[t,r="",n={}]=[...arguments];this.validateReplyParameters(t,r,n);const o=this.createMockScopeDispatchData(t,r,n),C=addMockDispatch(this[kDispatches$2],this[kDispatchKey],o);return new MockScope(C)}replyWithError(A){if(typeof A>"u")throw new InvalidArgumentError$5("error must be defined");const t=addMockDispatch(this[kDispatches$2],this[kDispatchKey],{error:A});return new MockScope(t)}defaultReplyHeaders(A){if(typeof A>"u")throw new InvalidArgumentError$5("headers must be defined");return this[kDefaultHeaders]=A,this}defaultReplyTrailers(A){if(typeof A>"u")throw new InvalidArgumentError$5("trailers must be defined");return this[kDefaultTrailers]=A,this}replyContentLength(){return this[kContentLength]=!0,this}},Q(We,"MockInterceptor"),We);mockInterceptor.MockInterceptor=MockInterceptor$2,mockInterceptor.MockScope=MockScope;const{promisify:promisify$1}=require$$0__default$3,Client=client,{buildMockDispatch:buildMockDispatch$1}=mockUtils,{kDispatches:kDispatches$1,kMockAgent:kMockAgent$1,kClose:kClose$2,kOriginalClose:kOriginalClose$1,kOrigin:kOrigin$1,kOriginalDispatch:kOriginalDispatch$1,kConnected:kConnected$1}=mockSymbols,{MockInterceptor:MockInterceptor$1}=mockInterceptor,Symbols$1=symbols$4,{InvalidArgumentError:InvalidArgumentError$4}=errors$1,ut=class ut extends Client{constructor(A,t){if(super(A,t),!t||!t.agent||typeof t.agent.dispatch!="function")throw new InvalidArgumentError$4("Argument opts.agent must implement Agent");this[kMockAgent$1]=t.agent,this[kOrigin$1]=A,this[kDispatches$1]=[],this[kConnected$1]=1,this[kOriginalDispatch$1]=this.dispatch,this[kOriginalClose$1]=this.close.bind(this),this.dispatch=buildMockDispatch$1.call(this),this.close=this[kClose$2];}get[Symbols$1.kConnected](){return this[kConnected$1]}intercept(A){return new MockInterceptor$1(A,this[kDispatches$1])}async[kClose$2](){await promisify$1(this[kOriginalClose$1])(),this[kConnected$1]=0,this[kMockAgent$1][Symbols$1.kClients].delete(this[kOrigin$1]);}};Q(ut,"MockClient");const{promisify}=require$$0__default$3,Pool$1=pool,{buildMockDispatch}=mockUtils,{kDispatches,kMockAgent,kClose:kClose$1,kOriginalClose,kOrigin,kOriginalDispatch,kConnected}=mockSymbols,{MockInterceptor}=mockInterceptor,Symbols=symbols$4,{InvalidArgumentError:InvalidArgumentError$3}=errors$1,dt=class dt extends Pool$1{constructor(A,t){if(super(A,t),!t||!t.agent||typeof t.agent.dispatch!="function")throw new InvalidArgumentError$3("Argument opts.agent must implement Agent");this[kMockAgent]=t.agent,this[kOrigin]=A,this[kDispatches]=[],this[kConnected]=1,this[kOriginalDispatch]=this.dispatch,this[kOriginalClose]=this.close.bind(this),this.dispatch=buildMockDispatch.call(this),this.close=this[kClose$1];}get[Symbols.kConnected](){return this[kConnected]}intercept(A){return new MockInterceptor(A,this[kDispatches])}async[kClose$1](){await promisify(this[kOriginalClose])(),this[kConnected]=0,this[kMockAgent][Symbols.kClients].delete(this[kOrigin]);}};Q(dt,"MockPool");const{kProxy,kClose,kDestroy,kInterceptors}=symbols$4,{URL:URL$1}=require$$1__default$2,Agent$2=agent,Pool=pool,DispatcherBase=dispatcherBase,{InvalidArgumentError:InvalidArgumentError$2,RequestAbortedError}=errors$1,buildConnector=connect$2,kAgent=Symbol("proxy agent"),kClient=Symbol("proxy client"),kProxyHeaders=Symbol("proxy headers"),kRequestTls=Symbol("request tls settings"),kProxyTls=Symbol("proxy tls settings"),kConnectEndpoint=Symbol("connect endpoint function");function defaultProtocolPort(e){return e==="https:"?443:80}Q(defaultProtocolPort,"defaultProtocolPort");function buildProxyOptions(e){if(typeof e=="string"&&(e={uri:e}),!e||!e.uri)throw new InvalidArgumentError$2("Proxy opts.uri is mandatory");return {uri:e.uri,protocol:e.protocol||"https"}}Q(buildProxyOptions,"buildProxyOptions");function defaultFactory(e,A){return new Pool(e,A)}Q(defaultFactory,"defaultFactory");let ProxyAgent$1=(qe=class extends DispatcherBase{constructor(A){if(super(A),this[kProxy]=buildProxyOptions(A),this[kAgent]=new Agent$2(A),this[kInterceptors]=A.interceptors&&A.interceptors.ProxyAgent&&Array.isArray(A.interceptors.ProxyAgent)?A.interceptors.ProxyAgent:[],typeof A=="string"&&(A={uri:A}),!A||!A.uri)throw new InvalidArgumentError$2("Proxy opts.uri is mandatory");const{clientFactory:t=defaultFactory}=A;if(typeof t!="function")throw new InvalidArgumentError$2("Proxy opts.clientFactory must be a function.");this[kRequestTls]=A.requestTls,this[kProxyTls]=A.proxyTls,this[kProxyHeaders]=A.headers||{};const r=new URL$1(A.uri),{origin:n,port:o,host:C,username:l,password:B}=r;if(A.auth&&A.token)throw new InvalidArgumentError$2("opts.auth cannot be used in combination with opts.token");A.auth?this[kProxyHeaders]["proxy-authorization"]=`Basic ${A.auth}`:A.token?this[kProxyHeaders]["proxy-authorization"]=A.token:l&&B&&(this[kProxyHeaders]["proxy-authorization"]=`Basic ${Buffer.from(`${decodeURIComponent(l)}:${decodeURIComponent(B)}`).toString("base64")}`);const I=buildConnector({...A.proxyTls});this[kConnectEndpoint]=buildConnector({...A.requestTls}),this[kClient]=t(r,{connect:I}),this[kAgent]=new Agent$2({...A,connect:async(c,y)=>{let f=c.host;c.port||(f+=`:${defaultProtocolPort(c.protocol)}`);try{const{socket:D,statusCode:S}=await this[kClient].connect({origin:n,port:o,path:f,signal:c.signal,headers:{...this[kProxyHeaders],host:C}});if(S!==200&&(D.on("error",()=>{}).destroy(),y(new RequestAbortedError(`Proxy response (${S}) !== 200 when HTTP Tunneling`))),c.protocol!=="https:"){y(null,D);return}let R;this[kRequestTls]?R=this[kRequestTls].servername:R=c.servername,this[kConnectEndpoint]({...c,servername:R,httpSocket:D},y);}catch(D){y(D);}}});}dispatch(A,t){const{host:r}=new URL$1(A.origin),n=buildHeaders(A.headers);return throwIfProxyAuthIsSent(n),this[kAgent].dispatch({...A,headers:{...n,host:r}},t)}async[kClose](){await this[kAgent].close(),await this[kClient].close();}async[kDestroy](){await this[kAgent].destroy(),await this[kClient].destroy();}},Q(qe,"ProxyAgent"),qe);function buildHeaders(e){if(Array.isArray(e)){const A={};for(let t=0;t<e.length;t+=2)A[e[t]]=e[t+1];return A}return e}Q(buildHeaders,"buildHeaders");function throwIfProxyAuthIsSent(e){if(e&&Object.keys(e).find(t=>t.toLowerCase()==="proxy-authorization"))throw new InvalidArgumentError$2("Proxy-Authorization should be sent in ProxyAgent constructor")}Q(throwIfProxyAuthIsSent,"throwIfProxyAuthIsSent");var proxyAgent=ProxyAgent$1;const globalDispatcher=Symbol.for("undici.globalDispatcher.1"),{InvalidArgumentError:InvalidArgumentError$1}=errors$1,Agent$1=agent;getGlobalDispatcher$1()===void 0&&setGlobalDispatcher$1(new Agent$1);function setGlobalDispatcher$1(e){if(!e||typeof e.dispatch!="function")throw new InvalidArgumentError$1("Argument agent must implement Agent");Object.defineProperty(globalThis,globalDispatcher,{value:e,writable:!0,enumerable:!1,configurable:!1});}Q(setGlobalDispatcher$1,"setGlobalDispatcher$1");function getGlobalDispatcher$1(){return globalThis[globalDispatcher]}Q(getGlobalDispatcher$1,"getGlobalDispatcher$1");var global={setGlobalDispatcher:setGlobalDispatcher$1,getGlobalDispatcher:getGlobalDispatcher$1},headers,hasRequiredHeaders;function requireHeaders(){if(hasRequiredHeaders)return headers;hasRequiredHeaders=1;const{kHeadersList:e,kConstruct:A}=symbols$4,{kGuard:t}=requireSymbols$3(),{kEnumerableProperty:r}=util$j,{makeIterator:n,isValidHeaderName:o,isValidHeaderValue:C}=requireUtil$4(),{webidl:l}=requireWebidl(),B=require$$0__default,I=Symbol("headers map"),c=Symbol("headers map sorted");function y(k){return k===10||k===13||k===9||k===32}Q(y,"isHTTPWhiteSpaceCharCode");function f(k){let w=0,b=k.length;for(;b>w&&y(k.charCodeAt(b-1));)--b;for(;b>w&&y(k.charCodeAt(w));)++w;return w===0&&b===k.length?k:k.substring(w,b)}Q(f,"headerValueNormalize");function D(k,w){if(Array.isArray(w))for(let b=0;b<w.length;++b){const N=w[b];if(N.length!==2)throw l.errors.exception({header:"Headers constructor",message:`expected name/value pair to be length 2, found ${N.length}.`});S(k,N[0],N[1]);}else if(typeof w=="object"&&w!==null){const b=Object.keys(w);for(let N=0;N<b.length;++N)S(k,b[N],w[b[N]]);}else throw l.errors.conversionFailed({prefix:"Headers constructor",argument:"Argument 1",types:["sequence<sequence<ByteString>>","record<ByteString, ByteString>"]})}Q(D,"fill");function S(k,w,b){if(b=f(b),o(w)){if(!C(b))throw l.errors.invalidArgument({prefix:"Headers.append",value:b,type:"header value"})}else throw l.errors.invalidArgument({prefix:"Headers.append",value:w,type:"header name"});if(k[t]==="immutable")throw new TypeError("immutable");return k[t],k[e].append(w,b,!1)}Q(S,"appendHeader");const p=class p{constructor(w){se(this,"cookies",null);w instanceof p?(this[I]=new Map(w[I]),this[c]=w[c],this.cookies=w.cookies===null?null:[...w.cookies]):(this[I]=new Map(w),this[c]=null);}contains(w,b){return this[I].has(b?w:w.toLowerCase())}clear(){this[I].clear(),this[c]=null,this.cookies=null;}append(w,b,N){this[c]=null;const U=N?w:w.toLowerCase(),x=this[I].get(U);if(x){const v=U==="cookie"?"; ":", ";this[I].set(U,{name:x.name,value:`${x.value}${v}${b}`});}else this[I].set(U,{name:w,value:b});U==="set-cookie"&&(this.cookies??(this.cookies=[])).push(b);}set(w,b,N){this[c]=null;const U=N?w:w.toLowerCase();U==="set-cookie"&&(this.cookies=[b]),this[I].set(U,{name:w,value:b});}delete(w,b){this[c]=null,b||(w=w.toLowerCase()),w==="set-cookie"&&(this.cookies=null),this[I].delete(w);}get(w,b){return this[I].get(b?w:w.toLowerCase())?.value??null}*[Symbol.iterator](){for(const[w,{value:b}]of this[I])yield [w,b];}get entries(){const w={};if(this[I].size)for(const{name:b,value:N}of this[I].values())w[b]=N;return w}};Q(p,"HeadersList");let R=p;const m=class m{constructor(w=void 0){w!==A&&(this[e]=new R,this[t]="none",w!==void 0&&(w=l.converters.HeadersInit(w),D(this,w)));}append(w,b){return l.brandCheck(this,m),l.argumentLengthCheck(arguments,2,{header:"Headers.append"}),w=l.converters.ByteString(w),b=l.converters.ByteString(b),S(this,w,b)}delete(w){if(l.brandCheck(this,m),l.argumentLengthCheck(arguments,1,{header:"Headers.delete"}),w=l.converters.ByteString(w),!o(w))throw l.errors.invalidArgument({prefix:"Headers.delete",value:w,type:"header name"});if(this[t]==="immutable")throw new TypeError("immutable");this[t],this[e].contains(w,!1)&&this[e].delete(w,!1);}get(w){if(l.brandCheck(this,m),l.argumentLengthCheck(arguments,1,{header:"Headers.get"}),w=l.converters.ByteString(w),!o(w))throw l.errors.invalidArgument({prefix:"Headers.get",value:w,type:"header name"});return this[e].get(w,!1)}has(w){if(l.brandCheck(this,m),l.argumentLengthCheck(arguments,1,{header:"Headers.has"}),w=l.converters.ByteString(w),!o(w))throw l.errors.invalidArgument({prefix:"Headers.has",value:w,type:"header name"});return this[e].contains(w,!1)}set(w,b){if(l.brandCheck(this,m),l.argumentLengthCheck(arguments,2,{header:"Headers.set"}),w=l.converters.ByteString(w),b=l.converters.ByteString(b),b=f(b),o(w)){if(!C(b))throw l.errors.invalidArgument({prefix:"Headers.set",value:b,type:"header value"})}else throw l.errors.invalidArgument({prefix:"Headers.set",value:w,type:"header name"});if(this[t]==="immutable")throw new TypeError("immutable");this[t],this[e].set(w,b,!1);}getSetCookie(){l.brandCheck(this,m);const w=this[e].cookies;return w?[...w]:[]}get[c](){if(this[e][c])return this[e][c];const w=[],b=[...this[e]].sort((U,x)=>U[0]<x[0]?-1:1),N=this[e].cookies;for(let U=0;U<b.length;++U){const[x,v]=b[U];if(x==="set-cookie")for(let W=0;W<N.length;++W)w.push([x,N[W]]);else B(v!==null),w.push([x,v]);}return this[e][c]=w,w}keys(){if(l.brandCheck(this,m),this[t]==="immutable"){const w=this[c];return n(()=>w,"Headers","key")}return n(()=>[...this[c].values()],"Headers","key")}values(){if(l.brandCheck(this,m),this[t]==="immutable"){const w=this[c];return n(()=>w,"Headers","value")}return n(()=>[...this[c].values()],"Headers","value")}entries(){if(l.brandCheck(this,m),this[t]==="immutable"){const w=this[c];return n(()=>w,"Headers","key+value")}return n(()=>[...this[c].values()],"Headers","key+value")}forEach(w,b=globalThis){if(l.brandCheck(this,m),l.argumentLengthCheck(arguments,1,{header:"Headers.forEach"}),typeof w!="function")throw new TypeError("Failed to execute 'forEach' on 'Headers': parameter 1 is not of type 'Function'.");for(const[N,U]of this)w.apply(b,[U,N,this]);}[Symbol.for("nodejs.util.inspect.custom")](){return l.brandCheck(this,m),this[e]}};Q(m,"Headers");let F=m;return F.prototype[Symbol.iterator]=F.prototype.entries,Object.defineProperties(F.prototype,{append:r,delete:r,get:r,has:r,set:r,getSetCookie:r,keys:r,values:r,entries:r,forEach:r,[Symbol.iterator]:{enumerable:!1},[Symbol.toStringTag]:{value:"Headers",configurable:!0}}),l.converters.HeadersInit=function(k){if(l.util.Type(k)==="Object")return k[Symbol.iterator]?l.converters["sequence<sequence<ByteString>>"](k):l.converters["record<ByteString, ByteString>"](k);throw l.errors.conversionFailed({prefix:"Headers constructor",argument:"Argument 1",types:["sequence<sequence<ByteString>>","record<ByteString, ByteString>"]})},headers={fill:D,Headers:F,HeadersList:R},headers}Q(requireHeaders,"requireHeaders");var response,hasRequiredResponse;function requireResponse(){if(hasRequiredResponse)return response;hasRequiredResponse=1;const{Headers:e,HeadersList:A,fill:t}=requireHeaders(),{extractBody:r,cloneBody:n,mixinBody:o}=requireBody(),C=util$j,{kEnumerableProperty:l}=C,{isValidReasonPhrase:B,isCancelled:I,isAborted:c,isBlobLike:y,serializeJavascriptValueToJSONString:f,isErrorLike:D,isomorphicEncode:S}=requireUtil$4(),{redirectStatusSet:R,nullBodyStatus:F}=requireConstants$3(),{kState:p,kHeaders:m,kGuard:k,kRealm:w}=requireSymbols$3(),{webidl:b}=requireWebidl(),{FormData:N}=requireFormdata(),{getGlobalOrigin:U}=requireGlobal(),{URLSerializer:x}=requireDataURL(),{kHeadersList:v,kConstruct:W}=symbols$4,J=require$$0__default,{types:iA}=require$$0__default$3,CA=new TextEncoder("utf-8"),K=class K{static error(){const q={settingsObject:{}},X=new K(W);return X[p]=hA(),X[w]=q,X[m]=new e(W),X[m][v]=X[p].headersList,X[m][k]="immutable",X[m][w]=q,X}static json(q,X={}){b.argumentLengthCheck(arguments,1,{header:"Response.json"}),X!==null&&(X=b.converters.ResponseInit(X));const AA=CA.encode(f(q)),EA=r(AA),rA={settingsObject:{}},sA=new K(W);return sA[p]=IA({}),sA[w]=rA,sA[m]=new e(W),sA[m][v]=sA[p].headersList,sA[m][k]="response",sA[m][w]=rA,Z(sA,X,{body:EA[0],type:"application/json"}),sA}static redirect(q,X=302){const AA={settingsObject:{}};b.argumentLengthCheck(arguments,1,{header:"Response.redirect"}),q=b.converters.USVString(q),X=b.converters["unsigned short"](X);let EA;try{EA=new URL(q,U());}catch(oA){throw Object.assign(new TypeError("Failed to parse URL from "+q),{cause:oA})}if(!R.has(X))throw new RangeError("Invalid status code "+X);const rA=new K(W);rA[p]=IA({}),rA[w]=AA,rA[m]=new e(W),rA[m][v]=rA[p].headersList,rA[m][k]="immutable",rA[m][w]=AA,rA[p].status=X;const sA=S(x(EA));return rA[p].headersList.append("location",sA,!0),rA}constructor(q=null,X={}){if(q===W)return;q!==null&&(q=b.converters.BodyInit(q)),X=b.converters.ResponseInit(X),this[w]={settingsObject:{}},this[p]=IA({}),this[m]=new e(W),this[m][k]="response",this[m][v]=this[p].headersList,this[m][w]=this[w];let AA=null;if(q!=null){const[EA,rA]=r(q);AA={body:EA,type:rA};}Z(this,X,AA);}get type(){return b.brandCheck(this,K),this[p].type}get url(){b.brandCheck(this,K);const q=this[p].urlList,X=q[q.length-1]??null;return X===null?"":x(X,!0)}get redirected(){return b.brandCheck(this,K),this[p].urlList.length>1}get status(){return b.brandCheck(this,K),this[p].status}get ok(){return b.brandCheck(this,K),this[p].status>=200&&this[p].status<=299}get statusText(){return b.brandCheck(this,K),this[p].statusText}get headers(){return b.brandCheck(this,K),this[m]}get body(){return b.brandCheck(this,K),this[p].body?this[p].body.stream:null}get bodyUsed(){return b.brandCheck(this,K),!!this[p].body&&C.isDisturbed(this[p].body.stream)}clone(){if(b.brandCheck(this,K),this.bodyUsed||this.body&&this.body.locked)throw b.errors.exception({header:"Response.clone",message:"Body has already been consumed."});const q=z(this[p]),X=new K(W);return X[p]=q,X[w]=this[w],X[m]=new e(W),X[m][v]=q.headersList,X[m][k]=this[m][k],X[m][w]=this[m][w],X}};Q(K,"Response");let uA=K;o(uA),Object.defineProperties(uA.prototype,{type:l,url:l,status:l,ok:l,redirected:l,statusText:l,headers:l,clone:l,body:l,bodyUsed:l,[Symbol.toStringTag]:{value:"Response",configurable:!0}}),Object.defineProperties(uA,{json:l,redirect:l,error:l});function z(G){if(G.internalResponse)return cA(z(G.internalResponse),G.type);const q=IA({...G,body:null});return G.body!=null&&(q.body=n(G.body)),q}Q(z,"cloneResponse");function IA(G){return {aborted:!1,rangeRequested:!1,timingAllowPassed:!1,requestIncludesCredentials:!1,type:"default",status:200,timingInfo:null,cacheState:"",statusText:"",...G,headersList:G?.headersList?new A(G?.headersList):new A,urlList:G?.urlList?[...G.urlList]:[]}}Q(IA,"makeResponse");function hA(G){const q=D(G);return IA({type:"error",status:0,error:q?G:new Error(G&&String(G)),aborted:G&&G.name==="AbortError"})}Q(hA,"makeNetworkError");function nA(G,q){return q={internalResponse:G,...q},new Proxy(G,{get(X,AA){return AA in q?q[AA]:X[AA]},set(X,AA,EA){return J(!(AA in q)),X[AA]=EA,!0}})}Q(nA,"makeFilteredResponse");function cA(G,q){if(q==="basic")return nA(G,{type:"basic",headersList:G.headersList});if(q==="cors")return nA(G,{type:"cors",headersList:G.headersList});if(q==="opaque")return nA(G,{type:"opaque",urlList:Object.freeze([]),status:0,statusText:"",body:null});if(q==="opaqueredirect")return nA(G,{type:"opaqueredirect",status:0,statusText:"",headersList:[],body:null});J(!1);}Q(cA,"filterResponse");function Y(G,q=null){return J(I(G)),c(G)?hA(Object.assign(new DOMException("The operation was aborted.","AbortError"),{cause:q})):hA(Object.assign(new DOMException("Request was cancelled."),{cause:q}))}Q(Y,"makeAppropriateNetworkError");function Z(G,q,X){if(q.status!==null&&(q.status<200||q.status>599))throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');if("statusText"in q&&q.statusText!=null&&!B(String(q.statusText)))throw new TypeError("Invalid statusText");if("status"in q&&q.status!=null&&(G[p].status=q.status),"statusText"in q&&q.statusText!=null&&(G[p].statusText=q.statusText),"headers"in q&&q.headers!=null&&t(G[m],q.headers),X){if(F.includes(G.status))throw b.errors.exception({header:"Response constructor",message:"Invalid response status code "+G.status});G[p].body=X.body,X.type!=null&&!G[p].headersList.contains("content-type",!0)&&G[p].headersList.append("content-type",X.type,!0);}}return Q(Z,"initializeResponse"),b.converters.ReadableStream=b.interfaceConverter(ReadableStream),b.converters.FormData=b.interfaceConverter(N),b.converters.URLSearchParams=b.interfaceConverter(URLSearchParams),b.converters.XMLHttpRequestBodyInit=function(G){return typeof G=="string"?b.converters.USVString(G):y(G)?b.converters.Blob(G,{strict:!1}):iA.isArrayBuffer(G)||iA.isTypedArray(G)||iA.isDataView(G)?b.converters.BufferSource(G):C.isFormDataLike(G)?b.converters.FormData(G,{strict:!1}):G instanceof URLSearchParams?b.converters.URLSearchParams(G):b.converters.DOMString(G)},b.converters.BodyInit=function(G){return G instanceof ReadableStream?b.converters.ReadableStream(G):G?.[Symbol.asyncIterator]?G:b.converters.XMLHttpRequestBodyInit(G)},b.converters.ResponseInit=b.dictionaryConverter([{key:"status",converter:b.converters["unsigned short"],defaultValue:200},{key:"statusText",converter:b.converters.ByteString,defaultValue:""},{key:"headers",converter:b.converters.HeadersInit}]),response={makeNetworkError:hA,makeResponse:IA,makeAppropriateNetworkError:Y,filterResponse:cA,Response:uA,cloneResponse:z},response}Q(requireResponse,"requireResponse");var dispatcherWeakref,hasRequiredDispatcherWeakref;function requireDispatcherWeakref(){if(hasRequiredDispatcherWeakref)return dispatcherWeakref;hasRequiredDispatcherWeakref=1;const{kConnected:e,kSize:A}=symbols$4,n=class n{constructor(l){this.value=l;}deref(){return this.value[e]===0&&this.value[A]===0?void 0:this.value}};Q(n,"CompatWeakRef");let t=n;const o=class o{constructor(l){this.finalizer=l;}register(l,B){l.on&&l.on("disconnect",()=>{l[e]===0&&l[A]===0&&this.finalizer(B);});}};Q(o,"CompatFinalizer");let r=o;return dispatcherWeakref=Q(function(){return process.env.NODE_V8_COVERAGE?{WeakRef:t,FinalizationRegistry:r}:{WeakRef,FinalizationRegistry}},"dispatcherWeakref"),dispatcherWeakref}Q(requireDispatcherWeakref,"requireDispatcherWeakref");var request,hasRequiredRequest;function requireRequest(){if(hasRequiredRequest)return request;hasRequiredRequest=1;const{extractBody:e,mixinBody:A,cloneBody:t}=requireBody(),{Headers:r,fill:n,HeadersList:o}=requireHeaders(),{FinalizationRegistry:C}=requireDispatcherWeakref()(),l=util$j,{isValidHTTPToken:B,sameOrigin:I,normalizeMethod:c,makePolicyContainer:y,normalizeMethodRecord:f}=requireUtil$4(),{forbiddenMethodsSet:D,corsSafeListedMethodsSet:S,referrerPolicy:R,requestRedirect:F,requestMode:p,requestCredentials:m,requestCache:k,requestDuplex:w}=requireConstants$3(),{kEnumerableProperty:b}=l,{kHeaders:N,kSignal:U,kState:x,kGuard:v,kRealm:W}=requireSymbols$3(),{webidl:J}=requireWebidl(),{getGlobalOrigin:iA}=requireGlobal(),{URLSerializer:CA}=requireDataURL(),{kHeadersList:uA,kConstruct:z}=symbols$4,IA=require$$0__default,{getMaxListeners:hA,setMaxListeners:nA,getEventListeners:cA,defaultMaxListeners:Y}=require$$0__default$5,Z=Symbol("abortController"),K=new C(({signal:EA,abort:rA})=>{EA.removeEventListener("abort",rA);}),AA=class AA{constructor(rA,sA={}){if(rA===z)return;J.argumentLengthCheck(arguments,1,{header:"Request constructor"}),rA=J.converters.RequestInfo(rA),sA=J.converters.RequestInit(sA),this[W]={settingsObject:{baseUrl:iA(),get origin(){return this.baseUrl?.origin},policyContainer:y()}};let oA=null,wA=null;const kA=this[W].settingsObject.baseUrl;let fA=null;if(typeof rA=="string"){let RA;try{RA=new URL(rA,kA);}catch(mA){throw new TypeError("Failed to parse URL from "+rA,{cause:mA})}if(RA.username||RA.password)throw new TypeError("Request cannot be constructed from a URL that includes credentials: "+rA);oA=q({urlList:[RA]}),wA="cors";}else IA(rA instanceof AA),oA=rA[x],fA=rA[U];const OA=this[W].settingsObject.origin;let GA="client";if(oA.window?.constructor?.name==="EnvironmentSettingsObject"&&I(oA.window,OA)&&(GA=oA.window),sA.window!=null)throw new TypeError(`'window' option '${GA}' must be null`);"window"in sA&&(GA="no-window"),oA=q({method:oA.method,headersList:oA.headersList,unsafeRequest:oA.unsafeRequest,client:this[W].settingsObject,window:GA,priority:oA.priority,origin:oA.origin,referrer:oA.referrer,referrerPolicy:oA.referrerPolicy,mode:oA.mode,credentials:oA.credentials,cache:oA.cache,redirect:oA.redirect,integrity:oA.integrity,keepalive:oA.keepalive,reloadNavigation:oA.reloadNavigation,historyNavigation:oA.historyNavigation,urlList:[...oA.urlList]});const YA=Object.keys(sA).length!==0;if(YA&&(oA.mode==="navigate"&&(oA.mode="same-origin"),oA.reloadNavigation=!1,oA.historyNavigation=!1,oA.origin="client",oA.referrer="client",oA.referrerPolicy="",oA.url=oA.urlList[oA.urlList.length-1],oA.urlList=[oA.url]),sA.referrer!==void 0){const RA=sA.referrer;if(RA==="")oA.referrer="no-referrer";else {let mA;try{mA=new URL(RA,kA);}catch(M){throw new TypeError(`Referrer "${RA}" is not a valid URL.`,{cause:M})}mA.protocol==="about:"&&mA.hostname==="client"||OA&&!I(mA,this[W].settingsObject.baseUrl)?oA.referrer="client":oA.referrer=mA;}}sA.referrerPolicy!==void 0&&(oA.referrerPolicy=sA.referrerPolicy);let FA;if(sA.mode!==void 0?FA=sA.mode:FA=wA,FA==="navigate")throw J.errors.exception({header:"Request constructor",message:"invalid request mode navigate."});if(FA!=null&&(oA.mode=FA),sA.credentials!==void 0&&(oA.credentials=sA.credentials),sA.cache!==void 0&&(oA.cache=sA.cache),oA.cache==="only-if-cached"&&oA.mode!=="same-origin")throw new TypeError("'only-if-cached' can be set only with 'same-origin' mode");if(sA.redirect!==void 0&&(oA.redirect=sA.redirect),sA.integrity!=null&&(oA.integrity=String(sA.integrity)),sA.keepalive!==void 0&&(oA.keepalive=!!sA.keepalive),sA.method!==void 0){let RA=sA.method;if(!B(RA))throw new TypeError(`'${RA}' is not a valid HTTP method.`);if(D.has(RA.toUpperCase()))throw new TypeError(`'${RA}' HTTP method is unsupported.`);RA=f[RA]??c(RA),oA.method=RA;}sA.signal!==void 0&&(fA=sA.signal),this[x]=oA;const DA=new AbortController;if(this[U]=DA.signal,this[U][W]=this[W],fA!=null){if(!fA||typeof fA.aborted!="boolean"||typeof fA.addEventListener!="function")throw new TypeError("Failed to construct 'Request': member signal is not of type AbortSignal.");if(fA.aborted)DA.abort(fA.reason);else {this[Z]=DA;const RA=new WeakRef(DA),mA=Q(function(){const M=RA.deref();M!==void 0&&M.abort(this.reason);},"abort");try{(typeof hA=="function"&&hA(fA)===Y||cA(fA,"abort").length>=Y)&&nA(100,fA);}catch{}l.addAbortListener(fA,mA),K.register(DA,{signal:fA,abort:mA});}}if(this[N]=new r(z),this[N][uA]=oA.headersList,this[N][v]="request",this[N][W]=this[W],FA==="no-cors"){if(!S.has(oA.method))throw new TypeError(`'${oA.method} is unsupported in no-cors mode.`);this[N][v]="request-no-cors";}if(YA){const RA=this[N][uA],mA=sA.headers!==void 0?sA.headers:new o(RA);if(RA.clear(),mA instanceof o){for(const[M,eA]of mA)RA.append(M,eA);RA.cookies=mA.cookies;}else n(this[N],mA);}const MA=rA instanceof AA?rA[x].body:null;if((sA.body!=null||MA!=null)&&(oA.method==="GET"||oA.method==="HEAD"))throw new TypeError("Request with GET/HEAD method cannot have body.");let xA=null;if(sA.body!=null){const[RA,mA]=e(sA.body,oA.keepalive);xA=RA,mA&&!this[N][uA].contains("content-type")&&this[N].append("content-type",mA);}const $A=xA??MA;if($A!=null&&$A.source==null){if(xA!=null&&sA.duplex==null)throw new TypeError("RequestInit: duplex option is required when sending a body.");if(oA.mode!=="same-origin"&&oA.mode!=="cors")throw new TypeError('If request is made from ReadableStream, mode should be "same-origin" or "cors"');oA.useCORSPreflightFlag=!0;}let _A=$A;if(xA==null&&MA!=null){if(l.isDisturbed(MA.stream)||MA.stream.locked)throw new TypeError("Cannot construct a Request with a Request object that has already been used.");const RA=new TransformStream;MA.stream.pipeThrough(RA),_A={source:MA.source,length:MA.length,stream:RA.readable};}this[x].body=_A;}get method(){return J.brandCheck(this,AA),this[x].method}get url(){return J.brandCheck(this,AA),CA(this[x].url)}get headers(){return J.brandCheck(this,AA),this[N]}get destination(){return J.brandCheck(this,AA),this[x].destination}get referrer(){return J.brandCheck(this,AA),this[x].referrer==="no-referrer"?"":this[x].referrer==="client"?"about:client":this[x].referrer.toString()}get referrerPolicy(){return J.brandCheck(this,AA),this[x].referrerPolicy}get mode(){return J.brandCheck(this,AA),this[x].mode}get credentials(){return this[x].credentials}get cache(){return J.brandCheck(this,AA),this[x].cache}get redirect(){return J.brandCheck(this,AA),this[x].redirect}get integrity(){return J.brandCheck(this,AA),this[x].integrity}get keepalive(){return J.brandCheck(this,AA),this[x].keepalive}get isReloadNavigation(){return J.brandCheck(this,AA),this[x].reloadNavigation}get isHistoryNavigation(){return J.brandCheck(this,AA),this[x].historyNavigation}get signal(){return J.brandCheck(this,AA),this[U]}get body(){return J.brandCheck(this,AA),this[x].body?this[x].body.stream:null}get bodyUsed(){return J.brandCheck(this,AA),!!this[x].body&&l.isDisturbed(this[x].body.stream)}get duplex(){return J.brandCheck(this,AA),"half"}clone(){if(J.brandCheck(this,AA),this.bodyUsed||this.body?.locked)throw new TypeError("unusable");const rA=X(this[x]),sA=new AA(z);sA[x]=rA,sA[W]=this[W],sA[N]=new r(z),sA[N][uA]=rA.headersList,sA[N][v]=this[N][v],sA[N][W]=this[N][W];const oA=new AbortController;return this.signal.aborted?oA.abort(this.signal.reason):l.addAbortListener(this.signal,()=>{oA.abort(this.signal.reason);}),sA[U]=oA.signal,sA}};Q(AA,"Request");let G=AA;A(G);function q(EA){const rA={method:"GET",localURLsOnly:!1,unsafeRequest:!1,body:null,client:null,reservedClient:null,replacesClientId:"",window:"client",keepalive:!1,serviceWorkers:"all",initiator:"",destination:"",priority:null,origin:"client",policyContainer:"client",referrer:"client",referrerPolicy:"",mode:"no-cors",useCORSPreflightFlag:!1,credentials:"same-origin",useCredentials:!1,cache:"default",redirect:"follow",integrity:"",cryptoGraphicsNonceMetadata:"",parserMetadata:"",reloadNavigation:!1,historyNavigation:!1,userActivation:!1,taintedOrigin:!1,redirectCount:0,responseTainting:"basic",preventNoCacheCacheControlHeaderModification:!1,done:!1,timingAllowFailed:!1,...EA,headersList:EA.headersList?new o(EA.headersList):new o};return rA.url=rA.urlList[0],rA}Q(q,"makeRequest");function X(EA){const rA=q({...EA,body:null});return EA.body!=null&&(rA.body=t(EA.body)),rA}return Q(X,"cloneRequest"),Object.defineProperties(G.prototype,{method:b,url:b,headers:b,redirect:b,clone:b,signal:b,duplex:b,destination:b,body:b,bodyUsed:b,isHistoryNavigation:b,isReloadNavigation:b,keepalive:b,integrity:b,cache:b,credentials:b,attribute:b,referrerPolicy:b,referrer:b,mode:b,[Symbol.toStringTag]:{value:"Request",configurable:!0}}),J.converters.Request=J.interfaceConverter(G),J.converters.RequestInfo=function(EA){return typeof EA=="string"?J.converters.USVString(EA):EA instanceof G?J.converters.Request(EA):J.converters.USVString(EA)},J.converters.AbortSignal=J.interfaceConverter(AbortSignal),J.converters.RequestInit=J.dictionaryConverter([{key:"method",converter:J.converters.ByteString},{key:"headers",converter:J.converters.HeadersInit},{key:"body",converter:J.nullableConverter(J.converters.BodyInit)},{key:"referrer",converter:J.converters.USVString},{key:"referrerPolicy",converter:J.converters.DOMString,allowedValues:R},{key:"mode",converter:J.converters.DOMString,allowedValues:p},{key:"credentials",converter:J.converters.DOMString,allowedValues:m},{key:"cache",converter:J.converters.DOMString,allowedValues:k},{key:"redirect",converter:J.converters.DOMString,allowedValues:F},{key:"integrity",converter:J.converters.DOMString},{key:"keepalive",converter:J.converters.boolean},{key:"signal",converter:J.nullableConverter(EA=>J.converters.AbortSignal(EA,{strict:!1}))},{key:"window",converter:J.converters.any},{key:"duplex",converter:J.converters.DOMString,allowedValues:w}]),request={Request:G,makeRequest:q},request}Q(requireRequest,"requireRequest");var fetch_1,hasRequiredFetch;function requireFetch(){if(hasRequiredFetch)return fetch_1;hasRequiredFetch=1;const{Response:e,makeNetworkError:A,makeAppropriateNetworkError:t,filterResponse:r,makeResponse:n}=requireResponse(),{Headers:o,HeadersList:C}=requireHeaders(),{Request:l,makeRequest:B}=requireRequest(),I=require$$3__default,{bytesMatch:c,makePolicyContainer:y,clonePolicyContainer:f,requestBadPort:D,TAOCheck:S,appendRequestOriginHeader:R,responseLocationURL:F,requestCurrentURL:p,setRequestReferrerPolicyOnRedirect:m,tryUpgradeRequestToAPotentiallyTrustworthyURL:k,createOpaqueTimingInfo:w,appendFetchMetadata:b,corsCheck:N,crossOriginResourcePolicyCheck:U,determineRequestsReferrer:x,coarsenedSharedCurrentTime:v,createDeferredPromise:W,isBlobLike:J,sameOrigin:iA,isCancelled:CA,isAborted:uA,isErrorLike:z,fullyReadBody:IA,readableStreamClose:hA,isomorphicEncode:nA,urlIsLocal:cA,urlIsHttpHttpsScheme:Y,urlHasHttpsScheme:Z,clampAndCoursenConnectionTimingInfo:K,simpleRangeHeaderValue:G,buildContentRange:q}=requireUtil$4(),{kState:X,kHeaders:AA,kGuard:EA,kRealm:rA}=requireSymbols$3(),sA=require$$0__default,{safelyExtractBody:oA,extractBody:wA}=requireBody(),{redirectStatusSet:kA,nullBodyStatus:fA,safeMethodsSet:OA,requestBodyHeader:GA,subresourceSet:YA}=requireConstants$3(),{kHeadersList:FA,kConstruct:DA}=symbols$4,MA=require$$0__default$5,{Readable:xA,pipeline:$A}=require$$0__default$1,{addAbortListener:_A,isErrored:RA,isReadable:mA,nodeMajor:M,nodeMinor:eA,bufferToLowerCasedHeaderName:gA}=util$j,{dataURLProcessor:aA,serializeAMimeType:yA,parseMIMEType:NA}=requireDataURL(),{getGlobalDispatcher:bA}=global,{webidl:HA}=requireWebidl(),{STATUS_CODES:SA}=require$$2__default,PA=["GET","HEAD"];let Ae;const je=class je extends MA{constructor(QA){super(),this.dispatcher=QA,this.connection=null,this.dump=!1,this.state="ongoing",this.setMaxListeners(21);}terminate(QA){this.state==="ongoing"&&(this.state="terminated",this.connection?.destroy(QA),this.emit("terminated",QA));}abort(QA){this.state==="ongoing"&&(this.state="aborted",QA||(QA=new DOMException("The operation was aborted.","AbortError")),this.serializedAbortReason=QA,this.connection?.destroy(QA),this.emit("terminated",QA));}};Q(je,"Fetch");let Ze=je;function Ut(V,QA={}){HA.argumentLengthCheck(arguments,1,{header:"globalThis.fetch"});const j=W();let $;try{$=new l(V,QA);}catch(lA){return j.reject(lA),j.promise}const BA=$[X];if($.signal.aborted)return Ke(j,BA,null,$.signal.reason),j.promise;BA.client.globalObject?.constructor?.name==="ServiceWorkerGlobalScope"&&(BA.serviceWorkers="none");let dA=null;const UA=null;let VA=!1,LA=null;return _A($.signal,()=>{VA=!0,sA(LA!=null),LA.abort($.signal.reason),Ke(j,BA,dA,$.signal.reason);}),LA=wt({request:BA,processResponseEndOfBody:Q(lA=>Dt(lA,"fetch"),"handleFetchDone"),processResponse:Q(lA=>{if(VA)return Promise.resolve();if(lA.aborted)return Ke(j,BA,dA,LA.serializedAbortReason),Promise.resolve();if(lA.type==="error")return j.reject(Object.assign(new TypeError("fetch failed"),{cause:lA.error})),Promise.resolve();dA=new e(DA),dA[X]=lA,dA[rA]=UA,dA[AA]=new o(DA),dA[AA][FA]=lA.headersList,dA[AA][EA]="immutable",dA[AA][rA]=UA,j.resolve(dA);},"processResponse"),dispatcher:QA.dispatcher??bA()}),j.promise}Q(Ut,"fetch");function Dt(V,QA="other"){if(V.type==="error"&&V.aborted||!V.urlList?.length)return;const j=V.urlList[0];let $=V.timingInfo,BA=V.cacheState;Y(j)&&$!==null&&(V.timingAllowPassed||($=w({startTime:$.startTime}),BA=""),$.endTime=v(),V.timingInfo=$,Rt($,j,QA,globalThis,BA));}Q(Dt,"finalizeAndReportTiming");function Rt(V,QA,j,$,BA){(M>18||M===18&&eA>=2)&&performance.markResourceTiming(V,QA.href,j,$,BA);}Q(Rt,"markResourceTiming");function Ke(V,QA,j,$){if($||($=new DOMException("The operation was aborted.","AbortError")),V.reject($),QA.body!=null&&mA(QA.body?.stream)&&QA.body.stream.cancel($).catch(tA=>{if(tA.code!=="ERR_INVALID_STATE")throw tA}),j==null)return;const BA=j[X];BA.body!=null&&mA(BA.body?.stream)&&BA.body.stream.cancel($).catch(tA=>{if(tA.code!=="ERR_INVALID_STATE")throw tA});}Q(Ke,"abortFetch");function wt({request:V,processRequestBodyChunkLength:QA,processRequestEndOfBody:j,processResponse:$,processResponseEndOfBody:BA,processResponseConsumeBody:tA,useParallelQueue:dA=!1,dispatcher:UA}){let VA=null,LA=!1;V.client!=null&&(VA=V.client.globalObject,LA=V.client.crossOriginIsolatedCapability);const XA=v(LA),zA=w({startTime:XA}),lA={controller:new Ze(UA),request:V,timingInfo:zA,processRequestBodyChunkLength:QA,processRequestEndOfBody:j,processResponse:$,processResponseConsumeBody:tA,processResponseEndOfBody:BA,taskDestination:VA,crossOriginIsolatedCapability:LA};if(sA(!V.body||V.body.stream),V.window==="client"&&(V.window=V.client?.globalObject?.constructor?.name==="Window"?V.client:"no-window"),V.origin==="client"&&(V.origin=V.client?.origin),V.policyContainer==="client"&&(V.client!=null?V.policyContainer=f(V.client.policyContainer):V.policyContainer=y()),!V.headersList.contains("accept",!0)){const WA="*/*";V.headersList.append("accept",WA,!0);}return V.headersList.contains("accept-language",!0)||V.headersList.append("accept-language","*",!0),V.priority,YA.has(V.destination),pt(lA).catch(WA=>{lA.controller.terminate(WA);}),lA.controller}Q(wt,"fetching");async function pt(V,QA=!1){const j=V.request;let $=null;if(j.localURLsOnly&&!cA(p(j))&&($=A("local URLs only")),k(j),D(j)==="blocked"&&($=A("bad port")),j.referrerPolicy===""&&(j.referrerPolicy=j.policyContainer.referrerPolicy),j.referrer!=="no-referrer"&&(j.referrer=x(j)),$===null&&($=await(async()=>{const tA=p(j);return iA(tA,j.url)&&j.responseTainting==="basic"||tA.protocol==="data:"||j.mode==="navigate"||j.mode==="websocket"?(j.responseTainting="basic",await kt(V)):j.mode==="same-origin"?A('request mode cannot be "same-origin"'):j.mode==="no-cors"?j.redirect!=="follow"?A('redirect mode cannot be "follow" for "no-cors" request'):(j.responseTainting="opaque",await kt(V)):Y(p(j))?(j.responseTainting="cors",await Ft(V)):A("URL scheme must be a HTTP(S) scheme")})()),QA)return $;$.status!==0&&!$.internalResponse&&(j.responseTainting,j.responseTainting==="basic"?$=r($,"basic"):j.responseTainting==="cors"?$=r($,"cors"):j.responseTainting==="opaque"?$=r($,"opaque"):sA(!1));let BA=$.status===0?$:$.internalResponse;if(BA.urlList.length===0&&BA.urlList.push(...j.urlList),j.timingAllowFailed||($.timingAllowPassed=!0),$.type==="opaque"&&BA.status===206&&BA.rangeRequested&&!j.headers.contains("range",!0)&&($=BA=A()),$.status!==0&&(j.method==="HEAD"||j.method==="CONNECT"||fA.includes(BA.status))&&(BA.body=null,V.controller.dump=!0),j.integrity){const tA=Q(UA=>ze(V,A(UA)),"processBodyError");if(j.responseTainting==="opaque"||$.body==null){tA($.error);return}const dA=Q(UA=>{if(!c(UA,j.integrity)){tA("integrity mismatch");return}$.body=oA(UA)[0],ze(V,$);},"processBody");await IA($.body,dA,tA);}else ze(V,$);}Q(pt,"mainFetch");function kt(V){if(CA(V)&&V.request.redirectCount===0)return Promise.resolve(t(V));const{request:QA}=V,{protocol:j}=p(QA);switch(j){case"about:":return Promise.resolve(A("about scheme is not supported"));case"blob:":{Ae||(Ae=require$$6__default.resolveObjectURL);const $=p(QA);if($.search.length!==0)return Promise.resolve(A("NetworkError when attempting to fetch resource."));const BA=Ae($.toString());if(QA.method!=="GET"||!J(BA))return Promise.resolve(A("invalid method"));const tA=n(),dA=BA.size,UA=nA(`${dA}`),VA=BA.type;if(QA.headersList.contains("range",!0)){tA.rangeRequested=!0;const LA=QA.headersList.get("range",!0),XA=G(LA,!0);if(XA==="failure")return Promise.resolve(A("failed to fetch the data URL"));let{rangeStartValue:zA,rangeEndValue:lA}=XA;if(zA===null)zA=dA-lA,lA=zA+lA-1;else {if(zA>=dA)return Promise.resolve(A("Range start is greater than the blob's size."));(lA===null||lA>=dA)&&(lA=dA-1);}const WA=BA.slice(zA,lA,VA),KA=wA(WA);tA.body=KA[0];const JA=nA(`${WA.size}`),re=q(zA,lA,dA);tA.status=206,tA.statusText="Partial Content",tA.headersList.set("content-length",JA,!0),tA.headersList.set("content-type",VA,!0),tA.headersList.set("content-range",re,!0);}else {const LA=wA(BA);tA.statusText="OK",tA.body=LA[0],tA.headersList.set("content-length",UA,!0),tA.headersList.set("content-type",VA,!0);}return Promise.resolve(tA)}case"data:":{const $=p(QA),BA=aA($);if(BA==="failure")return Promise.resolve(A("failed to fetch the data URL"));const tA=yA(BA.mimeType);return Promise.resolve(n({statusText:"OK",headersList:[["content-type",{name:"Content-Type",value:tA}]],body:oA(BA.body)[0]}))}case"file:":return Promise.resolve(A("not implemented... yet..."));case"http:":case"https:":return Ft(V).catch($=>A($));default:return Promise.resolve(A("unknown scheme"))}}Q(kt,"schemeFetch");function Lt(V,QA){V.request.done=!0,V.processResponseDone!=null&&queueMicrotask(()=>V.processResponseDone(QA));}Q(Lt,"finalizeResponse");function ze(V,QA){let j=V.timingInfo;const $=Q(()=>{const tA=Date.now();V.request.destination==="document"&&(V.controller.fullTimingInfo=j),V.controller.reportTimingSteps=()=>{if(V.request.url.protocol!=="https:")return;j.endTime=tA;let UA=QA.cacheState;QA.bodyInfo,QA.timingAllowPassed||(j=w(j),UA=""),(V.request.mode!=="navigator"||!QA.hasCrossOriginRedirects)&&(QA.status,NA(QA.headersList.get("content-type",!0))),V.request.initiatorType!=null&&Rt(j,V.request.url,V.request.initiatorType,globalThis,UA);};const dA=Q(()=>{V.request.done=!0,V.processResponseEndOfBody!=null&&queueMicrotask(()=>V.processResponseEndOfBody(QA)),V.request.initiatorType!=null&&V.controller.reportTimingSteps();},"processResponseEndOfBodyTask");queueMicrotask(()=>dA());},"processResponseEndOfBody");V.processResponse!=null&&queueMicrotask(()=>V.processResponse(QA));const BA=QA.type==="error"?QA:QA.internalResponse??QA;if(BA.body==null)$();else {const tA=new TransformStream({start(){},transform(UA,VA){VA.enqueue(UA);},flush:$});BA.body.stream.pipeThrough(tA);const dA=new ReadableStream({readableStream:tA.readable,async start(UA){const VA=this.readableStream.getReader();for(;;){const{done:LA,value:XA}=await VA.read();if(LA){queueMicrotask(()=>hA(UA));break}UA.enqueue(XA);}},type:"bytes"});BA.body.stream=dA;}}Q(ze,"fetchFinale");async function Ft(V){const QA=V.request;let j=null,$=null;const BA=V.timingInfo;if(QA.serviceWorkers,j===null){if(QA.redirect==="follow"&&(QA.serviceWorkers="none"),$=j=await Nt(V),QA.responseTainting==="cors"&&N(QA,j)==="failure")return A("cors failure");S(QA,j)==="failure"&&(QA.timingAllowFailed=!0);}return (QA.responseTainting==="opaque"||j.type==="opaque")&&U(QA.origin,QA.client,QA.destination,$)==="blocked"?A("blocked"):(kA.has($.status)&&(QA.redirect!=="manual"&&V.controller.connection.destroy(),QA.redirect==="error"?j=A("unexpected redirect"):QA.redirect==="manual"?j=$:QA.redirect==="follow"?j=await Mt(V,j):sA(!1)),j.timingInfo=BA,j)}Q(Ft,"httpFetch");function Mt(V,QA){const j=V.request,$=QA.internalResponse?QA.internalResponse:QA;let BA;try{if(BA=F($,p(j).hash),BA==null)return QA}catch(dA){return Promise.resolve(A(dA))}if(!Y(BA))return Promise.resolve(A("URL scheme must be a HTTP(S) scheme"));if(j.redirectCount===20)return Promise.resolve(A("redirect count exceeded"));if(j.redirectCount+=1,j.mode==="cors"&&(BA.username||BA.password)&&!iA(j,BA))return Promise.resolve(A('cross origin not allowed for request mode "cors"'));if(j.responseTainting==="cors"&&(BA.username||BA.password))return Promise.resolve(A('URL cannot contain credentials for request mode "cors"'));if($.status!==303&&j.body!=null&&j.body.source==null)return Promise.resolve(A());if([301,302].includes($.status)&&j.method==="POST"||$.status===303&&!PA.includes(j.method)){j.method="GET",j.body=null;for(const dA of GA)j.headersList.delete(dA);}iA(p(j),BA)||(j.headersList.delete("authorization",!0),j.headersList.delete("cookie",!0),j.headersList.delete("host",!0)),j.body!=null&&(sA(j.body.source!=null),j.body=oA(j.body.source)[0]);const tA=V.timingInfo;return tA.redirectEndTime=tA.postRedirectStartTime=v(V.crossOriginIsolatedCapability),tA.redirectStartTime===0&&(tA.redirectStartTime=tA.startTime),j.urlList.push(BA),m(j,$),pt(V,!0)}Q(Mt,"httpRedirectFetch");async function Nt(V,QA=!1,j=!1){const $=V.request;let BA=null,tA=null,dA=null;$.window==="no-window"&&$.redirect==="error"?(BA=V,tA=$):(tA=B($),BA={...V},BA.request=tA);const UA=$.credentials==="include"||$.credentials==="same-origin"&&$.responseTainting==="basic",VA=tA.body?tA.body.length:null;let LA=null;if(tA.body==null&&["POST","PUT"].includes(tA.method)&&(LA="0"),VA!=null&&(LA=nA(`${VA}`)),LA!=null&&tA.headersList.append("content-length",LA,!0),VA!=null&&tA.keepalive,tA.referrer instanceof URL&&tA.headersList.append("referer",nA(tA.referrer.href),!0),R(tA),b(tA),tA.headersList.contains("user-agent",!0)||tA.headersList.append("user-agent",typeof esbuildDetection>"u"?"undici":"node",!0),tA.cache==="default"&&(tA.headersList.contains("if-modified-since",!0)||tA.headersList.contains("if-none-match",!0)||tA.headersList.contains("if-unmodified-since",!0)||tA.headersList.contains("if-match",!0)||tA.headersList.contains("if-range",!0))&&(tA.cache="no-store"),tA.cache==="no-cache"&&!tA.preventNoCacheCacheControlHeaderModification&&!tA.headersList.contains("cache-control",!0)&&tA.headersList.append("cache-control","max-age=0",!0),(tA.cache==="no-store"||tA.cache==="reload")&&(tA.headersList.contains("pragma",!0)||tA.headersList.append("pragma","no-cache",!0),tA.headersList.contains("cache-control",!0)||tA.headersList.append("cache-control","no-cache",!0)),tA.headersList.contains("range",!0)&&tA.headersList.append("accept-encoding","identity",!0),tA.headersList.contains("accept-encoding",!0)||(Z(p(tA))?tA.headersList.append("accept-encoding","br, gzip, deflate",!0):tA.headersList.append("accept-encoding","gzip, deflate",!0)),tA.headersList.delete("host",!0),tA.cache="no-store",tA.mode!=="no-store"&&tA.mode,dA==null){if(tA.mode==="only-if-cached")return A("only if cached");const XA=await Yt(BA,UA,j);!OA.has(tA.method)&&XA.status>=200&&XA.status<=399,dA==null&&(dA=XA);}if(dA.urlList=[...tA.urlList],tA.headersList.contains("range",!0)&&(dA.rangeRequested=!0),dA.requestIncludesCredentials=UA,dA.status===407)return $.window==="no-window"?A():CA(V)?t(V):A("proxy authentication required");if(dA.status===421&&!j&&($.body==null||$.body.source!=null)){if(CA(V))return t(V);V.controller.connection.destroy(),dA=await Nt(V,QA,!0);}return dA}Q(Nt,"httpNetworkOrCacheFetch");async function Yt(V,QA=!1,j=!1){sA(!V.controller.connection||V.controller.connection.destroyed),V.controller.connection={abort:null,destroyed:!1,destroy(lA){this.destroyed||(this.destroyed=!0,this.abort?.(lA??new DOMException("The operation was aborted.","AbortError")));}};const $=V.request;let BA=null;const tA=V.timingInfo;$.cache="no-store",$.mode;let dA=null;if($.body==null&&V.processRequestEndOfBody)queueMicrotask(()=>V.processRequestEndOfBody());else if($.body!=null){const lA=Q(async function*(JA){CA(V)||(yield JA,V.processRequestBodyChunkLength?.(JA.byteLength));},"processBodyChunk"),WA=Q(()=>{CA(V)||V.processRequestEndOfBody&&V.processRequestEndOfBody();},"processEndOfBody"),KA=Q(JA=>{CA(V)||(JA.name==="AbortError"?V.controller.abort():V.controller.terminate(JA));},"processBodyError");dA=async function*(){try{for await(const JA of $.body.stream)yield*lA(JA);WA();}catch(JA){KA(JA);}}();}try{const{body:lA,status:WA,statusText:KA,headersList:JA,socket:re}=await zA({body:dA});if(re)BA=n({status:WA,statusText:KA,headersList:JA,socket:re});else {const TA=lA[Symbol.asyncIterator]();V.controller.next=()=>TA.next(),BA=n({status:WA,statusText:KA,headersList:JA});}}catch(lA){return lA.name==="AbortError"?(V.controller.connection.destroy(),t(V,lA)):A(lA)}const UA=Q(()=>{V.controller.resume();},"pullAlgorithm"),VA=Q(lA=>{V.controller.abort(lA);},"cancelAlgorithm"),LA=new ReadableStream({async start(lA){V.controller.controller=lA;},async pull(lA){await UA();},async cancel(lA){await VA(lA);},type:"bytes"});BA.body={stream:LA},V.controller.on("terminated",XA),V.controller.resume=async()=>{for(;;){let lA,WA;try{const{done:JA,value:re}=await V.controller.next();if(uA(V))break;lA=JA?void 0:re;}catch(JA){V.controller.ended&&!tA.encodedBodySize?lA=void 0:(lA=JA,WA=!0);}if(lA===void 0){hA(V.controller.controller),Lt(V,BA);return}if(tA.decodedBodySize+=lA?.byteLength??0,WA){V.controller.terminate(lA);return}const KA=new Uint8Array(lA);if(KA.byteLength&&V.controller.controller.enqueue(KA),RA(LA)){V.controller.terminate();return}if(!V.controller.controller.desiredSize)return}};function XA(lA){uA(V)?(BA.aborted=!0,mA(LA)&&V.controller.controller.error(V.controller.serializedAbortReason)):mA(LA)&&V.controller.controller.error(new TypeError("terminated",{cause:z(lA)?lA:void 0})),V.controller.connection.destroy();}return Q(XA,"onAborted"),BA;function zA({body:lA}){const WA=p($),KA=V.controller.dispatcher;return new Promise((JA,re)=>KA.dispatch({path:WA.pathname+WA.search,origin:WA.origin,method:$.method,body:KA.isMockActive?$.body&&($.body.source||$.body.stream):lA,headers:$.headersList.entries,maxRedirections:0,upgrade:$.mode==="websocket"?"websocket":void 0},{body:null,abort:null,onConnect(TA){const{connection:qA}=V.controller;tA.finalConnectionTimingInfo=K(void 0,tA.postRedirectStartTime,V.crossOriginIsolatedCapability),qA.destroyed?TA(new DOMException("The operation was aborted.","AbortError")):(V.controller.on("terminated",TA),this.abort=qA.abort=TA),tA.finalNetworkRequestStartTime=v(V.crossOriginIsolatedCapability);},onResponseStarted(){tA.finalNetworkResponseStartTime=v(V.crossOriginIsolatedCapability);},onHeaders(TA,qA,$e,Xe){if(TA<200)return;let te=[],At="";const Ce=new C;if(Array.isArray(qA)){for(let ZA=0;ZA<qA.length;ZA+=2)Ce.append(gA(qA[ZA]),qA[ZA+1].toString("latin1"),!0);const ee=Ce.get("content-encoding",!0);ee&&(te=ee.toLowerCase().split(",").map(ZA=>ZA.trim())),At=Ce.get("location",!0);}else {const ee=Object.keys(qA);for(let Ee=0;Ee<ee.length;++Ee)Ce.append(ee[Ee],qA[ee[Ee]]);const ZA=qA["content-encoding"];ZA&&(te=ZA.toLowerCase().split(",").map(Ee=>Ee.trim()).reverse()),At=qA.location;}this.body=new xA({read:$e});const ie=[],Jt=At&&$.redirect==="follow"&&kA.has(TA);if($.method!=="HEAD"&&$.method!=="CONNECT"&&!fA.includes(TA)&&!Jt)for(let ee=0;ee<te.length;++ee){const ZA=te[ee];if(ZA==="x-gzip"||ZA==="gzip")ie.push(I.createGunzip({flush:I.constants.Z_SYNC_FLUSH,finishFlush:I.constants.Z_SYNC_FLUSH}));else if(ZA==="deflate")ie.push(I.createInflate());else if(ZA==="br")ie.push(I.createBrotliDecompress());else {ie.length=0;break}}return JA({status:TA,statusText:Xe,headersList:Ce,body:ie.length?$A(this.body,...ie,()=>{}):this.body.on("error",()=>{})}),!0},onData(TA){if(V.controller.dump)return;const qA=TA;return tA.encodedBodySize+=qA.byteLength,this.body.push(qA)},onComplete(){this.abort&&V.controller.off("terminated",this.abort),V.controller.ended=!0,this.body.push(null);},onError(TA){this.abort&&V.controller.off("terminated",this.abort),this.body?.destroy(TA),V.controller.terminate(TA),re(TA);},onUpgrade(TA,qA,$e){if(TA!==101)return;const Xe=new C;for(let te=0;te<qA.length;te+=2)Xe.append(gA(qA[te]),qA[te+1].toString("latin1"),!0);return JA({status:TA,statusText:SA[TA],headersList:Xe,socket:$e}),!0}}))}}return Q(Yt,"httpNetworkFetch"),fetch_1={fetch:Ut,Fetch:Ze,fetching:wt,finalizeAndReportTiming:Dt},fetch_1}Q(requireFetch,"requireFetch");var symbols$2,hasRequiredSymbols$2;function requireSymbols$2(){return hasRequiredSymbols$2||(hasRequiredSymbols$2=1,symbols$2={kState:Symbol("FileReader state"),kResult:Symbol("FileReader result"),kError:Symbol("FileReader error"),kLastProgressEventFired:Symbol("FileReader last progress event fired timestamp"),kEvents:Symbol("FileReader events"),kAborted:Symbol("FileReader aborted")}),symbols$2}Q(requireSymbols$2,"requireSymbols$2");var progressevent,hasRequiredProgressevent;function requireProgressevent(){if(hasRequiredProgressevent)return progressevent;hasRequiredProgressevent=1;const{webidl:e}=requireWebidl(),A=Symbol("ProgressEvent state"),r=class r extends Event{constructor(o,C={}){o=e.converters.DOMString(o),C=e.converters.ProgressEventInit(C??{}),super(o,C),this[A]={lengthComputable:C.lengthComputable,loaded:C.loaded,total:C.total};}get lengthComputable(){return e.brandCheck(this,r),this[A].lengthComputable}get loaded(){return e.brandCheck(this,r),this[A].loaded}get total(){return e.brandCheck(this,r),this[A].total}};Q(r,"ProgressEvent");let t=r;return e.converters.ProgressEventInit=e.dictionaryConverter([{key:"lengthComputable",converter:e.converters.boolean,defaultValue:!1},{key:"loaded",converter:e.converters["unsigned long long"],defaultValue:0},{key:"total",converter:e.converters["unsigned long long"],defaultValue:0},{key:"bubbles",converter:e.converters.boolean,defaultValue:!1},{key:"cancelable",converter:e.converters.boolean,defaultValue:!1},{key:"composed",converter:e.converters.boolean,defaultValue:!1}]),progressevent={ProgressEvent:t},progressevent}Q(requireProgressevent,"requireProgressevent");var encoding,hasRequiredEncoding;function requireEncoding(){if(hasRequiredEncoding)return encoding;hasRequiredEncoding=1;function e(A){if(!A)return "failure";switch(A.trim().toLowerCase()){case"unicode-1-1-utf-8":case"unicode11utf8":case"unicode20utf8":case"utf-8":case"utf8":case"x-unicode20utf8":return "UTF-8";case"866":case"cp866":case"csibm866":case"ibm866":return "IBM866";case"csisolatin2":case"iso-8859-2":case"iso-ir-101":case"iso8859-2":case"iso88592":case"iso_8859-2":case"iso_8859-2:1987":case"l2":case"latin2":return "ISO-8859-2";case"csisolatin3":case"iso-8859-3":case"iso-ir-109":case"iso8859-3":case"iso88593":case"iso_8859-3":case"iso_8859-3:1988":case"l3":case"latin3":return "ISO-8859-3";case"csisolatin4":case"iso-8859-4":case"iso-ir-110":case"iso8859-4":case"iso88594":case"iso_8859-4":case"iso_8859-4:1988":case"l4":case"latin4":return "ISO-8859-4";case"csisolatincyrillic":case"cyrillic":case"iso-8859-5":case"iso-ir-144":case"iso8859-5":case"iso88595":case"iso_8859-5":case"iso_8859-5:1988":return "ISO-8859-5";case"arabic":case"asmo-708":case"csiso88596e":case"csiso88596i":case"csisolatinarabic":case"ecma-114":case"iso-8859-6":case"iso-8859-6-e":case"iso-8859-6-i":case"iso-ir-127":case"iso8859-6":case"iso88596":case"iso_8859-6":case"iso_8859-6:1987":return "ISO-8859-6";case"csisolatingreek":case"ecma-118":case"elot_928":case"greek":case"greek8":case"iso-8859-7":case"iso-ir-126":case"iso8859-7":case"iso88597":case"iso_8859-7":case"iso_8859-7:1987":case"sun_eu_greek":return "ISO-8859-7";case"csiso88598e":case"csisolatinhebrew":case"hebrew":case"iso-8859-8":case"iso-8859-8-e":case"iso-ir-138":case"iso8859-8":case"iso88598":case"iso_8859-8":case"iso_8859-8:1988":case"visual":return "ISO-8859-8";case"csiso88598i":case"iso-8859-8-i":case"logical":return "ISO-8859-8-I";case"csisolatin6":case"iso-8859-10":case"iso-ir-157":case"iso8859-10":case"iso885910":case"l6":case"latin6":return "ISO-8859-10";case"iso-8859-13":case"iso8859-13":case"iso885913":return "ISO-8859-13";case"iso-8859-14":case"iso8859-14":case"iso885914":return "ISO-8859-14";case"csisolatin9":case"iso-8859-15":case"iso8859-15":case"iso885915":case"iso_8859-15":case"l9":return "ISO-8859-15";case"iso-8859-16":return "ISO-8859-16";case"cskoi8r":case"koi":case"koi8":case"koi8-r":case"koi8_r":return "KOI8-R";case"koi8-ru":case"koi8-u":return "KOI8-U";case"csmacintosh":case"mac":case"macintosh":case"x-mac-roman":return "macintosh";case"iso-8859-11":case"iso8859-11":case"iso885911":case"tis-620":case"windows-874":return "windows-874";case"cp1250":case"windows-1250":case"x-cp1250":return "windows-1250";case"cp1251":case"windows-1251":case"x-cp1251":return "windows-1251";case"ansi_x3.4-1968":case"ascii":case"cp1252":case"cp819":case"csisolatin1":case"ibm819":case"iso-8859-1":case"iso-ir-100":case"iso8859-1":case"iso88591":case"iso_8859-1":case"iso_8859-1:1987":case"l1":case"latin1":case"us-ascii":case"windows-1252":case"x-cp1252":return "windows-1252";case"cp1253":case"windows-1253":case"x-cp1253":return "windows-1253";case"cp1254":case"csisolatin5":case"iso-8859-9":case"iso-ir-148":case"iso8859-9":case"iso88599":case"iso_8859-9":case"iso_8859-9:1989":case"l5":case"latin5":case"windows-1254":case"x-cp1254":return "windows-1254";case"cp1255":case"windows-1255":case"x-cp1255":return "windows-1255";case"cp1256":case"windows-1256":case"x-cp1256":return "windows-1256";case"cp1257":case"windows-1257":case"x-cp1257":return "windows-1257";case"cp1258":case"windows-1258":case"x-cp1258":return "windows-1258";case"x-mac-cyrillic":case"x-mac-ukrainian":return "x-mac-cyrillic";case"chinese":case"csgb2312":case"csiso58gb231280":case"gb2312":case"gb_2312":case"gb_2312-80":case"gbk":case"iso-ir-58":case"x-gbk":return "GBK";case"gb18030":return "gb18030";case"big5":case"big5-hkscs":case"cn-big5":case"csbig5":case"x-x-big5":return "Big5";case"cseucpkdfmtjapanese":case"euc-jp":case"x-euc-jp":return "EUC-JP";case"csiso2022jp":case"iso-2022-jp":return "ISO-2022-JP";case"csshiftjis":case"ms932":case"ms_kanji":case"shift-jis":case"shift_jis":case"sjis":case"windows-31j":case"x-sjis":return "Shift_JIS";case"cseuckr":case"csksc56011987":case"euc-kr":case"iso-ir-149":case"korean":case"ks_c_5601-1987":case"ks_c_5601-1989":case"ksc5601":case"ksc_5601":case"windows-949":return "EUC-KR";case"csiso2022kr":case"hz-gb-2312":case"iso-2022-cn":case"iso-2022-cn-ext":case"iso-2022-kr":case"replacement":return "replacement";case"unicodefffe":case"utf-16be":return "UTF-16BE";case"csunicode":case"iso-10646-ucs-2":case"ucs-2":case"unicode":case"unicodefeff":case"utf-16":case"utf-16le":return "UTF-16LE";case"x-user-defined":return "x-user-defined";default:return "failure"}}return Q(e,"getEncoding"),encoding={getEncoding:e},encoding}Q(requireEncoding,"requireEncoding");var util$4,hasRequiredUtil$3;function requireUtil$3(){if(hasRequiredUtil$3)return util$4;hasRequiredUtil$3=1;const{kState:e,kError:A,kResult:t,kAborted:r,kLastProgressEventFired:n}=requireSymbols$2(),{ProgressEvent:o}=requireProgressevent(),{getEncoding:C}=requireEncoding(),{serializeAMimeType:l,parseMIMEType:B}=requireDataURL(),{types:I}=require$$0__default$3,{StringDecoder:c}=require$$5__default$1,{btoa:y}=require$$6__default,f={enumerable:!0,writable:!1,configurable:!1};function D(k,w,b,N){if(k[e]==="loading")throw new DOMException("Invalid state","InvalidStateError");k[e]="loading",k[t]=null,k[A]=null;const x=w.stream().getReader(),v=[];let W=x.read(),J=!0;(async()=>{for(;!k[r];)try{const{done:iA,value:CA}=await W;if(J&&!k[r]&&queueMicrotask(()=>{S("loadstart",k);}),J=!1,!iA&&I.isUint8Array(CA))v.push(CA),(k[n]===void 0||Date.now()-k[n]>=50)&&!k[r]&&(k[n]=Date.now(),queueMicrotask(()=>{S("progress",k);})),W=x.read();else if(iA){queueMicrotask(()=>{k[e]="done";try{const uA=R(v,b,w.type,N);if(k[r])return;k[t]=uA,S("load",k);}catch(uA){k[A]=uA,S("error",k);}k[e]!=="loading"&&S("loadend",k);});break}}catch(iA){if(k[r])return;queueMicrotask(()=>{k[e]="done",k[A]=iA,S("error",k),k[e]!=="loading"&&S("loadend",k);});break}})();}Q(D,"readOperation");function S(k,w){const b=new o(k,{bubbles:!1,cancelable:!1});w.dispatchEvent(b);}Q(S,"fireAProgressEvent");function R(k,w,b,N){switch(w){case"DataURL":{let U="data:";const x=B(b||"application/octet-stream");x!=="failure"&&(U+=l(x)),U+=";base64,";const v=new c("latin1");for(const W of k)U+=y(v.write(W));return U+=y(v.end()),U}case"Text":{let U="failure";if(N&&(U=C(N)),U==="failure"&&b){const x=B(b);x!=="failure"&&(U=C(x.parameters.get("charset")));}return U==="failure"&&(U="UTF-8"),F(k,U)}case"ArrayBuffer":return m(k).buffer;case"BinaryString":{let U="";const x=new c("latin1");for(const v of k)U+=x.write(v);return U+=x.end(),U}}}Q(R,"packageData");function F(k,w){const b=m(k),N=p(b);let U=0;N!==null&&(w=N,U=N==="UTF-8"?3:2);const x=b.slice(U);return new TextDecoder(w).decode(x)}Q(F,"decode");function p(k){const[w,b,N]=k;return w===239&&b===187&&N===191?"UTF-8":w===254&&b===255?"UTF-16BE":w===255&&b===254?"UTF-16LE":null}Q(p,"BOMSniffing");function m(k){const w=k.reduce((N,U)=>N+U.byteLength,0);let b=0;return k.reduce((N,U)=>(N.set(U,b),b+=U.byteLength,N),new Uint8Array(w))}return Q(m,"combineByteSequences"),util$4={staticPropertyDescriptors:f,readOperation:D,fireAProgressEvent:S},util$4}Q(requireUtil$3,"requireUtil$3");var filereader,hasRequiredFilereader;function requireFilereader(){if(hasRequiredFilereader)return filereader;hasRequiredFilereader=1;const{staticPropertyDescriptors:e,readOperation:A,fireAProgressEvent:t}=requireUtil$3(),{kState:r,kError:n,kResult:o,kEvents:C,kAborted:l}=requireSymbols$2(),{webidl:B}=requireWebidl(),{kEnumerableProperty:I}=util$j,y=class y extends EventTarget{constructor(){super(),this[r]="empty",this[o]=null,this[n]=null,this[C]={loadend:null,error:null,abort:null,load:null,progress:null,loadstart:null};}readAsArrayBuffer(D){B.brandCheck(this,y),B.argumentLengthCheck(arguments,1,{header:"FileReader.readAsArrayBuffer"}),D=B.converters.Blob(D,{strict:!1}),A(this,D,"ArrayBuffer");}readAsBinaryString(D){B.brandCheck(this,y),B.argumentLengthCheck(arguments,1,{header:"FileReader.readAsBinaryString"}),D=B.converters.Blob(D,{strict:!1}),A(this,D,"BinaryString");}readAsText(D,S=void 0){B.brandCheck(this,y),B.argumentLengthCheck(arguments,1,{header:"FileReader.readAsText"}),D=B.converters.Blob(D,{strict:!1}),S!==void 0&&(S=B.converters.DOMString(S)),A(this,D,"Text",S);}readAsDataURL(D){B.brandCheck(this,y),B.argumentLengthCheck(arguments,1,{header:"FileReader.readAsDataURL"}),D=B.converters.Blob(D,{strict:!1}),A(this,D,"DataURL");}abort(){if(this[r]==="empty"||this[r]==="done"){this[o]=null;return}this[r]==="loading"&&(this[r]="done",this[o]=null),this[l]=!0,t("abort",this),this[r]!=="loading"&&t("loadend",this);}get readyState(){switch(B.brandCheck(this,y),this[r]){case"empty":return this.EMPTY;case"loading":return this.LOADING;case"done":return this.DONE}}get result(){return B.brandCheck(this,y),this[o]}get error(){return B.brandCheck(this,y),this[n]}get onloadend(){return B.brandCheck(this,y),this[C].loadend}set onloadend(D){B.brandCheck(this,y),this[C].loadend&&this.removeEventListener("loadend",this[C].loadend),typeof D=="function"?(this[C].loadend=D,this.addEventListener("loadend",D)):this[C].loadend=null;}get onerror(){return B.brandCheck(this,y),this[C].error}set onerror(D){B.brandCheck(this,y),this[C].error&&this.removeEventListener("error",this[C].error),typeof D=="function"?(this[C].error=D,this.addEventListener("error",D)):this[C].error=null;}get onloadstart(){return B.brandCheck(this,y),this[C].loadstart}set onloadstart(D){B.brandCheck(this,y),this[C].loadstart&&this.removeEventListener("loadstart",this[C].loadstart),typeof D=="function"?(this[C].loadstart=D,this.addEventListener("loadstart",D)):this[C].loadstart=null;}get onprogress(){return B.brandCheck(this,y),this[C].progress}set onprogress(D){B.brandCheck(this,y),this[C].progress&&this.removeEventListener("progress",this[C].progress),typeof D=="function"?(this[C].progress=D,this.addEventListener("progress",D)):this[C].progress=null;}get onload(){return B.brandCheck(this,y),this[C].load}set onload(D){B.brandCheck(this,y),this[C].load&&this.removeEventListener("load",this[C].load),typeof D=="function"?(this[C].load=D,this.addEventListener("load",D)):this[C].load=null;}get onabort(){return B.brandCheck(this,y),this[C].abort}set onabort(D){B.brandCheck(this,y),this[C].abort&&this.removeEventListener("abort",this[C].abort),typeof D=="function"?(this[C].abort=D,this.addEventListener("abort",D)):this[C].abort=null;}};Q(y,"FileReader");let c=y;return c.EMPTY=c.prototype.EMPTY=0,c.LOADING=c.prototype.LOADING=1,c.DONE=c.prototype.DONE=2,Object.defineProperties(c.prototype,{EMPTY:e,LOADING:e,DONE:e,readAsArrayBuffer:I,readAsBinaryString:I,readAsText:I,readAsDataURL:I,abort:I,readyState:I,result:I,error:I,onloadstart:I,onprogress:I,onload:I,onabort:I,onerror:I,onloadend:I,[Symbol.toStringTag]:{value:"FileReader",writable:!1,enumerable:!1,configurable:!0}}),Object.defineProperties(c,{EMPTY:e,LOADING:e,DONE:e}),filereader={FileReader:c},filereader}Q(requireFilereader,"requireFilereader");var symbols$1,hasRequiredSymbols$1;function requireSymbols$1(){return hasRequiredSymbols$1||(hasRequiredSymbols$1=1,symbols$1={kConstruct:symbols$4.kConstruct}),symbols$1}Q(requireSymbols$1,"requireSymbols$1");var util$3,hasRequiredUtil$2;function requireUtil$2(){if(hasRequiredUtil$2)return util$3;hasRequiredUtil$2=1;const e=require$$0__default,{URLSerializer:A}=requireDataURL(),{isValidHeaderName:t}=requireUtil$4();function r(o,C,l=!1){const B=A(o,l),I=A(C,l);return B===I}Q(r,"urlEquals");function n(o){e(o!==null);const C=[];for(let l of o.split(",")){if(l=l.trim(),l.length){if(!t(l))continue}else continue;C.push(l);}return C}return Q(n,"fieldValues"),util$3={urlEquals:r,fieldValues:n},util$3}Q(requireUtil$2,"requireUtil$2");var cache,hasRequiredCache;function requireCache(){var N,U,_e,v,Qe,J,St;if(hasRequiredCache)return cache;hasRequiredCache=1;const{kConstruct:e}=requireSymbols$1(),{urlEquals:A,fieldValues:t}=requireUtil$2(),{kEnumerableProperty:r,isDisturbed:n}=util$j,{kHeadersList:o}=symbols$4,{webidl:C}=requireWebidl(),{Response:l,cloneResponse:B}=requireResponse(),{Request:I}=requireRequest(),{kState:c,kHeaders:y,kGuard:f,kRealm:D}=requireSymbols$3(),{fetching:S}=requireFetch(),{urlIsHttpHttpsScheme:R,createDeferredPromise:F,readAllBytes:p}=requireUtil$4(),m=require$$0__default,{getGlobalDispatcher:k}=global,CA=class CA{constructor(){vA(this,U);vA(this,v);vA(this,J);vA(this,N,void 0);arguments[0]!==e&&C.illegalConstructor(),pA(this,N,arguments[1]);}async match(z,IA={}){C.brandCheck(this,CA),C.argumentLengthCheck(arguments,1,{header:"Cache.match"}),z=C.converters.RequestInfo(z),IA=C.converters.CacheQueryOptions(IA);const hA=await this.matchAll(z,IA);if(hA.length!==0)return hA[0]}async matchAll(z=void 0,IA={}){C.brandCheck(this,CA),z!==void 0&&(z=C.converters.RequestInfo(z)),IA=C.converters.CacheQueryOptions(IA);let hA=null;if(z!==void 0)if(z instanceof I){if(hA=z[c],hA.method!=="GET"&&!IA.ignoreMethod)return []}else typeof z=="string"&&(hA=new I(z)[c]);const nA=[];if(z===void 0)for(const Y of _(this,N))nA.push(Y[1]);else {const Y=jA(this,v,Qe).call(this,hA,IA);for(const Z of Y)nA.push(Z[1]);}const cA=[];for(const Y of nA){const Z=new l(Y.body?.source??null),K=Z[c].body;Z[c]=Y,Z[c].body=K,Z[y][o]=Y.headersList,Z[y][f]="immutable",cA.push(Z);}return Object.freeze(cA)}async add(z){C.brandCheck(this,CA),C.argumentLengthCheck(arguments,1,{header:"Cache.add"}),z=C.converters.RequestInfo(z);const IA=[z];return await this.addAll(IA)}async addAll(z){C.brandCheck(this,CA),C.argumentLengthCheck(arguments,1,{header:"Cache.addAll"}),z=C.converters["sequence<RequestInfo>"](z);const IA=[],hA=[];for(const X of z){if(typeof X=="string")continue;const AA=X[c];if(!R(AA.url)||AA.method!=="GET")throw C.errors.exception({header:"Cache.addAll",message:"Expected http/s scheme when method is not GET."})}const nA=[];for(const X of z){const AA=new I(X)[c];if(!R(AA.url))throw C.errors.exception({header:"Cache.addAll",message:"Expected http/s scheme."});AA.initiator="fetch",AA.destination="subresource",hA.push(AA);const EA=F();nA.push(S({request:AA,dispatcher:k(),processResponse(rA){if(rA.type==="error"||rA.status===206||rA.status<200||rA.status>299)EA.reject(C.errors.exception({header:"Cache.addAll",message:"Received an invalid status code or the request failed."}));else if(rA.headersList.contains("vary")){const sA=t(rA.headersList.get("vary"));for(const oA of sA)if(oA==="*"){EA.reject(C.errors.exception({header:"Cache.addAll",message:"invalid vary field value"}));for(const wA of nA)wA.abort();return}}},processResponseEndOfBody(rA){if(rA.aborted){EA.reject(new DOMException("aborted","AbortError"));return}EA.resolve(rA);}})),IA.push(EA.promise);}const Y=await Promise.all(IA),Z=[];let K=0;for(const X of Y){const AA={type:"put",request:hA[K],response:X};Z.push(AA),K++;}const G=F();let q=null;try{jA(this,U,_e).call(this,Z);}catch(X){q=X;}return queueMicrotask(()=>{q===null?G.resolve(void 0):G.reject(q);}),G.promise}async put(z,IA){C.brandCheck(this,CA),C.argumentLengthCheck(arguments,2,{header:"Cache.put"}),z=C.converters.RequestInfo(z),IA=C.converters.Response(IA);let hA=null;if(z instanceof I?hA=z[c]:hA=new I(z)[c],!R(hA.url)||hA.method!=="GET")throw C.errors.exception({header:"Cache.put",message:"Expected an http/s scheme when method is not GET"});const nA=IA[c];if(nA.status===206)throw C.errors.exception({header:"Cache.put",message:"Got 206 status"});if(nA.headersList.contains("vary")){const AA=t(nA.headersList.get("vary"));for(const EA of AA)if(EA==="*")throw C.errors.exception({header:"Cache.put",message:"Got * vary field value"})}if(nA.body&&(n(nA.body.stream)||nA.body.stream.locked))throw C.errors.exception({header:"Cache.put",message:"Response body is locked or disturbed"});const cA=B(nA),Y=F();if(nA.body!=null){const EA=nA.body.stream.getReader();p(EA).then(Y.resolve,Y.reject);}else Y.resolve(void 0);const Z=[],K={type:"put",request:hA,response:cA};Z.push(K);const G=await Y.promise;cA.body!=null&&(cA.body.source=G);const q=F();let X=null;try{jA(this,U,_e).call(this,Z);}catch(AA){X=AA;}return queueMicrotask(()=>{X===null?q.resolve():q.reject(X);}),q.promise}async delete(z,IA={}){C.brandCheck(this,CA),C.argumentLengthCheck(arguments,1,{header:"Cache.delete"}),z=C.converters.RequestInfo(z),IA=C.converters.CacheQueryOptions(IA);let hA=null;if(z instanceof I){if(hA=z[c],hA.method!=="GET"&&!IA.ignoreMethod)return !1}else m(typeof z=="string"),hA=new I(z)[c];const nA=[],cA={type:"delete",request:hA,options:IA};nA.push(cA);const Y=F();let Z=null,K;try{K=jA(this,U,_e).call(this,nA);}catch(G){Z=G;}return queueMicrotask(()=>{Z===null?Y.resolve(!!K?.length):Y.reject(Z);}),Y.promise}async keys(z=void 0,IA={}){C.brandCheck(this,CA),z!==void 0&&(z=C.converters.RequestInfo(z)),IA=C.converters.CacheQueryOptions(IA);let hA=null;if(z!==void 0)if(z instanceof I){if(hA=z[c],hA.method!=="GET"&&!IA.ignoreMethod)return []}else typeof z=="string"&&(hA=new I(z)[c]);const nA=F(),cA=[];if(z===void 0)for(const Y of _(this,N))cA.push(Y[0]);else {const Y=jA(this,v,Qe).call(this,hA,IA);for(const Z of Y)cA.push(Z[0]);}return queueMicrotask(()=>{const Y=[];for(const Z of cA){const K=new I("https://a");K[c]=Z,K[y][o]=Z.headersList,K[y][f]="immutable",K[D]=Z.client,Y.push(K);}nA.resolve(Object.freeze(Y));}),nA.promise}};N=new WeakMap,U=new WeakSet,_e=Q(function(z){const IA=_(this,N),hA=[...IA],nA=[],cA=[];try{for(const Y of z){if(Y.type!=="delete"&&Y.type!=="put")throw C.errors.exception({header:"Cache.#batchCacheOperations",message:'operation type does not match "delete" or "put"'});if(Y.type==="delete"&&Y.response!=null)throw C.errors.exception({header:"Cache.#batchCacheOperations",message:"delete operation should not have an associated response"});if(jA(this,v,Qe).call(this,Y.request,Y.options,nA).length)throw new DOMException("???","InvalidStateError");let Z;if(Y.type==="delete"){if(Z=jA(this,v,Qe).call(this,Y.request,Y.options),Z.length===0)return [];for(const K of Z){const G=IA.indexOf(K);m(G!==-1),IA.splice(G,1);}}else if(Y.type==="put"){if(Y.response==null)throw C.errors.exception({header:"Cache.#batchCacheOperations",message:"put operation should have an associated response"});const K=Y.request;if(!R(K.url))throw C.errors.exception({header:"Cache.#batchCacheOperations",message:"expected http or https scheme"});if(K.method!=="GET")throw C.errors.exception({header:"Cache.#batchCacheOperations",message:"not get method"});if(Y.options!=null)throw C.errors.exception({header:"Cache.#batchCacheOperations",message:"options must not be defined"});Z=jA(this,v,Qe).call(this,Y.request);for(const G of Z){const q=IA.indexOf(G);m(q!==-1),IA.splice(q,1);}IA.push([Y.request,Y.response]),nA.push([Y.request,Y.response]);}cA.push([Y.request,Y.response]);}return cA}catch(Y){throw _(this,N).length=0,pA(this,N,hA),Y}},"#batchCacheOperations"),v=new WeakSet,Qe=Q(function(z,IA,hA){const nA=[],cA=hA??_(this,N);for(const Y of cA){const[Z,K]=Y;jA(this,J,St).call(this,z,Z,K,IA)&&nA.push(Y);}return nA},"#queryCache"),J=new WeakSet,St=Q(function(z,IA,hA=null,nA){const cA=new URL(z.url),Y=new URL(IA.url);if(nA?.ignoreSearch&&(Y.search="",cA.search=""),!A(cA,Y,!0))return !1;if(hA==null||nA?.ignoreVary||!hA.headersList.contains("vary"))return !0;const Z=t(hA.headersList.get("vary"));for(const K of Z){if(K==="*")return !1;const G=IA.headersList.get(K),q=z.headersList.get(K);if(G!==q)return !1}return !0},"#requestMatchesCachedItem"),Q(CA,"Cache");let w=CA;Object.defineProperties(w.prototype,{[Symbol.toStringTag]:{value:"Cache",configurable:!0},match:r,matchAll:r,add:r,addAll:r,put:r,delete:r,keys:r});const b=[{key:"ignoreSearch",converter:C.converters.boolean,defaultValue:!1},{key:"ignoreMethod",converter:C.converters.boolean,defaultValue:!1},{key:"ignoreVary",converter:C.converters.boolean,defaultValue:!1}];return C.converters.CacheQueryOptions=C.dictionaryConverter(b),C.converters.MultiCacheQueryOptions=C.dictionaryConverter([...b,{key:"cacheName",converter:C.converters.DOMString}]),C.converters.Response=C.interfaceConverter(l),C.converters["sequence<RequestInfo>"]=C.sequenceConverter(C.converters.RequestInfo),cache={Cache:w},cache}Q(requireCache,"requireCache");var cachestorage,hasRequiredCachestorage;function requireCachestorage(){var o;if(hasRequiredCachestorage)return cachestorage;hasRequiredCachestorage=1;const{kConstruct:e}=requireSymbols$1(),{Cache:A}=requireCache(),{webidl:t}=requireWebidl(),{kEnumerableProperty:r}=util$j,C=class C{constructor(){vA(this,o,new Map);arguments[0]!==e&&t.illegalConstructor();}async match(B,I={}){if(t.brandCheck(this,C),t.argumentLengthCheck(arguments,1,{header:"CacheStorage.match"}),B=t.converters.RequestInfo(B),I=t.converters.MultiCacheQueryOptions(I),I.cacheName!=null){if(_(this,o).has(I.cacheName)){const c=_(this,o).get(I.cacheName);return await new A(e,c).match(B,I)}}else for(const c of _(this,o).values()){const f=await new A(e,c).match(B,I);if(f!==void 0)return f}}async has(B){return t.brandCheck(this,C),t.argumentLengthCheck(arguments,1,{header:"CacheStorage.has"}),B=t.converters.DOMString(B),_(this,o).has(B)}async open(B){if(t.brandCheck(this,C),t.argumentLengthCheck(arguments,1,{header:"CacheStorage.open"}),B=t.converters.DOMString(B),_(this,o).has(B)){const c=_(this,o).get(B);return new A(e,c)}const I=[];return _(this,o).set(B,I),new A(e,I)}async delete(B){return t.brandCheck(this,C),t.argumentLengthCheck(arguments,1,{header:"CacheStorage.delete"}),B=t.converters.DOMString(B),_(this,o).delete(B)}async keys(){return t.brandCheck(this,C),[..._(this,o).keys()]}};o=new WeakMap,Q(C,"CacheStorage");let n=C;return Object.defineProperties(n.prototype,{[Symbol.toStringTag]:{value:"CacheStorage",configurable:!0},match:r,has:r,open:r,delete:r,keys:r}),cachestorage={CacheStorage:n},cachestorage}Q(requireCachestorage,"requireCachestorage");var constants$1,hasRequiredConstants$1;function requireConstants$1(){return hasRequiredConstants$1||(hasRequiredConstants$1=1,constants$1={maxAttributeValueSize:1024,maxNameValuePairSize:4096}),constants$1}Q(requireConstants$1,"requireConstants$1");var util$2,hasRequiredUtil$1;function requireUtil$1(){if(hasRequiredUtil$1)return util$2;hasRequiredUtil$1=1;const e=require$$0__default,{kHeadersList:A}=symbols$4;function t(f){if(f.length===0)return !1;for(const D of f){const S=D.charCodeAt(0);if(S>=0||S<=8||S>=10||S<=31||S===127)return !1}}Q(t,"isCTLExcludingHtab");function r(f){for(const D of f){const S=D.charCodeAt(0);if(S<=32||S>127||D==="("||D===")"||D===">"||D==="<"||D==="@"||D===","||D===";"||D===":"||D==="\\"||D==='"'||D==="/"||D==="["||D==="]"||D==="?"||D==="="||D==="{"||D==="}")throw new Error("Invalid cookie name")}}Q(r,"validateCookieName");function n(f){for(const D of f){const S=D.charCodeAt(0);if(S<33||S===34||S===44||S===59||S===92||S>126)throw new Error("Invalid header value")}}Q(n,"validateCookieValue");function o(f){for(const D of f)if(D.charCodeAt(0)<33||D===";")throw new Error("Invalid cookie path")}Q(o,"validateCookiePath");function C(f){if(f.startsWith("-")||f.endsWith(".")||f.endsWith("-"))throw new Error("Invalid cookie domain")}Q(C,"validateCookieDomain");function l(f){typeof f=="number"&&(f=new Date(f));const D=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],S=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],R=D[f.getUTCDay()],F=f.getUTCDate().toString().padStart(2,"0"),p=S[f.getUTCMonth()],m=f.getUTCFullYear(),k=f.getUTCHours().toString().padStart(2,"0"),w=f.getUTCMinutes().toString().padStart(2,"0"),b=f.getUTCSeconds().toString().padStart(2,"0");return `${R}, ${F} ${p} ${m} ${k}:${w}:${b} GMT`}Q(l,"toIMFDate");function B(f){if(f<0)throw new Error("Invalid cookie max-age")}Q(B,"validateCookieMaxAge");function I(f){if(f.name.length===0)return null;r(f.name),n(f.value);const D=[`${f.name}=${f.value}`];f.name.startsWith("__Secure-")&&(f.secure=!0),f.name.startsWith("__Host-")&&(f.secure=!0,f.domain=null,f.path="/"),f.secure&&D.push("Secure"),f.httpOnly&&D.push("HttpOnly"),typeof f.maxAge=="number"&&(B(f.maxAge),D.push(`Max-Age=${f.maxAge}`)),f.domain&&(C(f.domain),D.push(`Domain=${f.domain}`)),f.path&&(o(f.path),D.push(`Path=${f.path}`)),f.expires&&f.expires.toString()!=="Invalid Date"&&D.push(`Expires=${l(f.expires)}`),f.sameSite&&D.push(`SameSite=${f.sameSite}`);for(const S of f.unparsed){if(!S.includes("="))throw new Error("Invalid unparsed");const[R,...F]=S.split("=");D.push(`${R.trim()}=${F.join("=")}`);}return D.join("; ")}Q(I,"stringify");let c;function y(f){if(f[A])return f[A];c||(c=Object.getOwnPropertySymbols(f).find(S=>S.description==="headers list"),e(c,"Headers cannot be parsed"));const D=f[c];return e(D),D}return Q(y,"getHeadersList"),util$2={isCTLExcludingHtab:t,stringify:I,getHeadersList:y},util$2}Q(requireUtil$1,"requireUtil$1");var parse,hasRequiredParse;function requireParse(){if(hasRequiredParse)return parse;hasRequiredParse=1;const{maxNameValuePairSize:e,maxAttributeValueSize:A}=requireConstants$1(),{isCTLExcludingHtab:t}=requireUtil$1(),{collectASequenceOfCodePointsFast:r}=requireDataURL(),n=require$$0__default;function o(l){if(t(l))return null;let B="",I="",c="",y="";if(l.includes(";")){const f={position:0};B=r(";",l,f),I=l.slice(f.position);}else B=l;if(!B.includes("="))y=B;else {const f={position:0};c=r("=",B,f),y=B.slice(f.position+1);}return c=c.trim(),y=y.trim(),c.length+y.length>e?null:{name:c,value:y,...C(I)}}Q(o,"parseSetCookie");function C(l,B={}){if(l.length===0)return B;n(l[0]===";"),l=l.slice(1);let I="";l.includes(";")?(I=r(";",l,{position:0}),l=l.slice(I.length)):(I=l,l="");let c="",y="";if(I.includes("=")){const D={position:0};c=r("=",I,D),y=I.slice(D.position+1);}else c=I;if(c=c.trim(),y=y.trim(),y.length>A)return C(l,B);const f=c.toLowerCase();if(f==="expires"){const D=new Date(y);B.expires=D;}else if(f==="max-age"){const D=y.charCodeAt(0);if((D<48||D>57)&&y[0]!=="-"||!/^\d+$/.test(y))return C(l,B);const S=Number(y);B.maxAge=S;}else if(f==="domain"){let D=y;D[0]==="."&&(D=D.slice(1)),D=D.toLowerCase(),B.domain=D;}else if(f==="path"){let D="";y.length===0||y[0]!=="/"?D="/":D=y,B.path=D;}else if(f==="secure")B.secure=!0;else if(f==="httponly")B.httpOnly=!0;else if(f==="samesite"){let D="Default";const S=y.toLowerCase();S.includes("none")&&(D="None"),S.includes("strict")&&(D="Strict"),S.includes("lax")&&(D="Lax"),B.sameSite=D;}else B.unparsed??(B.unparsed=[]),B.unparsed.push(`${c}=${y}`);return C(l,B)}return Q(C,"parseUnparsedAttributes"),parse={parseSetCookie:o,parseUnparsedAttributes:C},parse}Q(requireParse,"requireParse");var cookies,hasRequiredCookies;function requireCookies(){if(hasRequiredCookies)return cookies;hasRequiredCookies=1;const{parseSetCookie:e}=requireParse(),{stringify:A,getHeadersList:t}=requireUtil$1(),{webidl:r}=requireWebidl(),{Headers:n}=requireHeaders();function o(I){r.argumentLengthCheck(arguments,1,{header:"getCookies"}),r.brandCheck(I,n,{strict:!1});const c=I.get("cookie"),y={};if(!c)return y;for(const f of c.split(";")){const[D,...S]=f.split("=");y[D.trim()]=S.join("=");}return y}Q(o,"getCookies");function C(I,c,y){r.argumentLengthCheck(arguments,2,{header:"deleteCookie"}),r.brandCheck(I,n,{strict:!1}),c=r.converters.DOMString(c),y=r.converters.DeleteCookieAttributes(y),B(I,{name:c,value:"",expires:new Date(0),...y});}Q(C,"deleteCookie");function l(I){r.argumentLengthCheck(arguments,1,{header:"getSetCookies"}),r.brandCheck(I,n,{strict:!1});const c=t(I).cookies;return c?c.map(y=>e(Array.isArray(y)?y[1]:y)):[]}Q(l,"getSetCookies");function B(I,c){r.argumentLengthCheck(arguments,2,{header:"setCookie"}),r.brandCheck(I,n,{strict:!1}),c=r.converters.Cookie(c),A(c)&&I.append("Set-Cookie",A(c));}return Q(B,"setCookie"),r.converters.DeleteCookieAttributes=r.dictionaryConverter([{converter:r.nullableConverter(r.converters.DOMString),key:"path",defaultValue:null},{converter:r.nullableConverter(r.converters.DOMString),key:"domain",defaultValue:null}]),r.converters.Cookie=r.dictionaryConverter([{converter:r.converters.DOMString,key:"name"},{converter:r.converters.DOMString,key:"value"},{converter:r.nullableConverter(I=>typeof I=="number"?r.converters["unsigned long long"](I):new Date(I)),key:"expires",defaultValue:null},{converter:r.nullableConverter(r.converters["long long"]),key:"maxAge",defaultValue:null},{converter:r.nullableConverter(r.converters.DOMString),key:"domain",defaultValue:null},{converter:r.nullableConverter(r.converters.DOMString),key:"path",defaultValue:null},{converter:r.nullableConverter(r.converters.boolean),key:"secure",defaultValue:null},{converter:r.nullableConverter(r.converters.boolean),key:"httpOnly",defaultValue:null},{converter:r.converters.USVString,key:"sameSite",allowedValues:["Strict","Lax","None"]},{converter:r.sequenceConverter(r.converters.DOMString),key:"unparsed",defaultValue:[]}]),cookies={getCookies:o,deleteCookie:C,getSetCookies:l,setCookie:B},cookies}Q(requireCookies,"requireCookies");var constants,hasRequiredConstants;function requireConstants(){if(hasRequiredConstants)return constants;hasRequiredConstants=1;const e="258EAFA5-E914-47DA-95CA-C5AB0DC85B11",A={enumerable:!0,writable:!1,configurable:!1},t={CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3},r={CONTINUATION:0,TEXT:1,BINARY:2,CLOSE:8,PING:9,PONG:10},n=2**16-1,o={INFO:0,PAYLOADLENGTH_16:2,PAYLOADLENGTH_64:3,READ_DATA:4},C=Buffer.allocUnsafe(0);return constants={uid:e,staticPropertyDescriptors:A,states:t,opcodes:r,maxUnsigned16Bit:n,parserStates:o,emptyBuffer:C},constants}Q(requireConstants,"requireConstants");var symbols,hasRequiredSymbols;function requireSymbols(){return hasRequiredSymbols||(hasRequiredSymbols=1,symbols={kWebSocketURL:Symbol("url"),kReadyState:Symbol("ready state"),kController:Symbol("controller"),kResponse:Symbol("response"),kBinaryType:Symbol("binary type"),kSentClose:Symbol("sent close"),kReceivedClose:Symbol("received close"),kByteParser:Symbol("byte parser")}),symbols}Q(requireSymbols,"requireSymbols");var events,hasRequiredEvents;function requireEvents(){var l,I,y;if(hasRequiredEvents)return events;hasRequiredEvents=1;const{webidl:e}=requireWebidl(),{kEnumerableProperty:A}=util$j,{MessagePort:t}=require$$2__default$2,B=class B extends Event{constructor(R,F={}){e.argumentLengthCheck(arguments,1,{header:"MessageEvent constructor"}),R=e.converters.DOMString(R),F=e.converters.MessageEventInit(F);super(R,F);vA(this,l,void 0);pA(this,l,F);}get data(){return e.brandCheck(this,B),_(this,l).data}get origin(){return e.brandCheck(this,B),_(this,l).origin}get lastEventId(){return e.brandCheck(this,B),_(this,l).lastEventId}get source(){return e.brandCheck(this,B),_(this,l).source}get ports(){return e.brandCheck(this,B),Object.isFrozen(_(this,l).ports)||Object.freeze(_(this,l).ports),_(this,l).ports}initMessageEvent(R,F=!1,p=!1,m=null,k="",w="",b=null,N=[]){return e.brandCheck(this,B),e.argumentLengthCheck(arguments,1,{header:"MessageEvent.initMessageEvent"}),new B(R,{bubbles:F,cancelable:p,data:m,origin:k,lastEventId:w,source:b,ports:N})}};l=new WeakMap,Q(B,"MessageEvent");let r=B;const c=class c extends Event{constructor(R,F={}){e.argumentLengthCheck(arguments,1,{header:"CloseEvent constructor"}),R=e.converters.DOMString(R),F=e.converters.CloseEventInit(F);super(R,F);vA(this,I,void 0);pA(this,I,F);}get wasClean(){return e.brandCheck(this,c),_(this,I).wasClean}get code(){return e.brandCheck(this,c),_(this,I).code}get reason(){return e.brandCheck(this,c),_(this,I).reason}};I=new WeakMap,Q(c,"CloseEvent");let n=c;const f=class f extends Event{constructor(R,F){e.argumentLengthCheck(arguments,1,{header:"ErrorEvent constructor"});super(R,F);vA(this,y,void 0);R=e.converters.DOMString(R),F=e.converters.ErrorEventInit(F??{}),pA(this,y,F);}get message(){return e.brandCheck(this,f),_(this,y).message}get filename(){return e.brandCheck(this,f),_(this,y).filename}get lineno(){return e.brandCheck(this,f),_(this,y).lineno}get colno(){return e.brandCheck(this,f),_(this,y).colno}get error(){return e.brandCheck(this,f),_(this,y).error}};y=new WeakMap,Q(f,"ErrorEvent");let o=f;Object.defineProperties(r.prototype,{[Symbol.toStringTag]:{value:"MessageEvent",configurable:!0},data:A,origin:A,lastEventId:A,source:A,ports:A,initMessageEvent:A}),Object.defineProperties(n.prototype,{[Symbol.toStringTag]:{value:"CloseEvent",configurable:!0},reason:A,code:A,wasClean:A}),Object.defineProperties(o.prototype,{[Symbol.toStringTag]:{value:"ErrorEvent",configurable:!0},message:A,filename:A,lineno:A,colno:A,error:A}),e.converters.MessagePort=e.interfaceConverter(t),e.converters["sequence<MessagePort>"]=e.sequenceConverter(e.converters.MessagePort);const C=[{key:"bubbles",converter:e.converters.boolean,defaultValue:!1},{key:"cancelable",converter:e.converters.boolean,defaultValue:!1},{key:"composed",converter:e.converters.boolean,defaultValue:!1}];return e.converters.MessageEventInit=e.dictionaryConverter([...C,{key:"data",converter:e.converters.any,defaultValue:null},{key:"origin",converter:e.converters.USVString,defaultValue:""},{key:"lastEventId",converter:e.converters.DOMString,defaultValue:""},{key:"source",converter:e.nullableConverter(e.converters.MessagePort),defaultValue:null},{key:"ports",converter:e.converters["sequence<MessagePort>"],get defaultValue(){return []}}]),e.converters.CloseEventInit=e.dictionaryConverter([...C,{key:"wasClean",converter:e.converters.boolean,defaultValue:!1},{key:"code",converter:e.converters["unsigned short"],defaultValue:0},{key:"reason",converter:e.converters.USVString,defaultValue:""}]),e.converters.ErrorEventInit=e.dictionaryConverter([...C,{key:"message",converter:e.converters.DOMString,defaultValue:""},{key:"filename",converter:e.converters.USVString,defaultValue:""},{key:"lineno",converter:e.converters["unsigned long"],defaultValue:0},{key:"colno",converter:e.converters["unsigned long"],defaultValue:0},{key:"error",converter:e.converters.any}]),events={MessageEvent:r,CloseEvent:n,ErrorEvent:o},events}Q(requireEvents,"requireEvents");var util$1,hasRequiredUtil;function requireUtil(){if(hasRequiredUtil)return util$1;hasRequiredUtil=1;const{kReadyState:e,kController:A,kResponse:t,kBinaryType:r,kWebSocketURL:n}=requireSymbols(),{states:o,opcodes:C}=requireConstants(),{MessageEvent:l,ErrorEvent:B}=requireEvents();function I(p){return p[e]===o.OPEN}Q(I,"isEstablished");function c(p){return p[e]===o.CLOSING}Q(c,"isClosing");function y(p){return p[e]===o.CLOSED}Q(y,"isClosed");function f(p,m,k=Event,w){const b=new k(p,w);m.dispatchEvent(b);}Q(f,"fireEvent");function D(p,m,k){if(p[e]!==o.OPEN)return;let w;if(m===C.TEXT)try{w=new TextDecoder("utf-8",{fatal:!0}).decode(k);}catch{F(p,"Received invalid UTF-8 in text frame.");return}else m===C.BINARY&&(p[r]==="blob"?w=new Blob([k]):w=new Uint8Array(k).buffer);f("message",p,l,{origin:p[n].origin,data:w});}Q(D,"websocketMessageReceived");function S(p){if(p.length===0)return !1;for(const m of p){const k=m.charCodeAt(0);if(k<33||k>126||m==="("||m===")"||m==="<"||m===">"||m==="@"||m===","||m===";"||m===":"||m==="\\"||m==='"'||m==="/"||m==="["||m==="]"||m==="?"||m==="="||m==="{"||m==="}"||k===32||k===9)return !1}return !0}Q(S,"isValidSubprotocol");function R(p){return p>=1e3&&p<1015?p!==1004&&p!==1005&&p!==1006:p>=3e3&&p<=4999}Q(R,"isValidStatusCode");function F(p,m){const{[A]:k,[t]:w}=p;k.abort(),w?.socket&&!w.socket.destroyed&&w.socket.destroy(),m&&f("error",p,B,{error:new Error(m)});}return Q(F,"failWebsocketConnection"),util$1={isEstablished:I,isClosing:c,isClosed:y,fireEvent:f,isValidSubprotocol:S,isValidStatusCode:R,failWebsocketConnection:F,websocketMessageReceived:D},util$1}Q(requireUtil,"requireUtil");var connection,hasRequiredConnection;function requireConnection(){if(hasRequiredConnection)return connection;hasRequiredConnection=1;const e=require$$0__default$6,{uid:A,states:t}=requireConstants(),{kReadyState:r,kSentClose:n,kByteParser:o,kReceivedClose:C}=requireSymbols(),{fireEvent:l,failWebsocketConnection:B}=requireUtil(),{CloseEvent:I}=requireEvents(),{makeRequest:c}=requireRequest(),{fetching:y}=requireFetch(),{Headers:f}=requireHeaders(),{getGlobalDispatcher:D}=global,{kHeadersList:S}=symbols$4,R={};R.open=e.channel("undici:websocket:open"),R.close=e.channel("undici:websocket:close"),R.socketError=e.channel("undici:websocket:socket_error");let F;try{F=require("crypto");}catch{}function p(b,N,U,x,v){const W=b;W.protocol=b.protocol==="ws:"?"http:":"https:";const J=c({urlList:[W],serviceWorkers:"none",referrer:"no-referrer",mode:"websocket",credentials:"include",cache:"no-store",redirect:"error"});if(v.headers){const z=new f(v.headers)[S];J.headersList=z;}const iA=F.randomBytes(16).toString("base64");J.headersList.append("sec-websocket-key",iA),J.headersList.append("sec-websocket-version","13");for(const z of N)J.headersList.append("sec-websocket-protocol",z);const CA="";return y({request:J,useParallelQueue:!0,dispatcher:v.dispatcher??D(),processResponse(z){if(z.type==="error"||z.status!==101){B(U,"Received network error or non-101 status code.");return}if(N.length!==0&&!z.headersList.get("Sec-WebSocket-Protocol")){B(U,"Server did not respond with sent protocols.");return}if(z.headersList.get("Upgrade")?.toLowerCase()!=="websocket"){B(U,'Server did not set Upgrade header to "websocket".');return}if(z.headersList.get("Connection")?.toLowerCase()!=="upgrade"){B(U,'Server did not set Connection header to "upgrade".');return}const IA=z.headersList.get("Sec-WebSocket-Accept"),hA=F.createHash("sha1").update(iA+A).digest("base64");if(IA!==hA){B(U,"Incorrect hash received in Sec-WebSocket-Accept header.");return}const nA=z.headersList.get("Sec-WebSocket-Extensions");if(nA!==null&&nA!==CA){B(U,"Received different permessage-deflate than the one set.");return}const cA=z.headersList.get("Sec-WebSocket-Protocol");if(cA!==null&&cA!==J.headersList.get("Sec-WebSocket-Protocol")){B(U,"Protocol was not set in the opening handshake.");return}z.socket.on("data",m),z.socket.on("close",k),z.socket.on("error",w),R.open.hasSubscribers&&R.open.publish({address:z.socket.address(),protocol:cA,extensions:nA}),x(z);}})}Q(p,"establishWebSocketConnection");function m(b){this.ws[o].write(b)||this.pause();}Q(m,"onSocketData");function k(){const{ws:b}=this,N=b[n]&&b[C];let U=1005,x="";const v=b[o].closingInfo;v?(U=v.code??1005,x=v.reason):b[n]||(U=1006),b[r]=t.CLOSED,l("close",b,I,{wasClean:N,code:U,reason:x}),R.close.hasSubscribers&&R.close.publish({websocket:b,code:U,reason:x});}Q(k,"onSocketClose");function w(b){const{ws:N}=this;N[r]=t.CLOSING,R.socketError.hasSubscribers&&R.socketError.publish(b),this.destroy();}return Q(w,"onSocketError"),connection={establishWebSocketConnection:p},connection}Q(requireConnection,"requireConnection");var frame,hasRequiredFrame;function requireFrame(){if(hasRequiredFrame)return frame;hasRequiredFrame=1;const{maxUnsigned16Bit:e}=requireConstants();let A;try{A=require("crypto");}catch{}const r=class r{constructor(o){this.frameData=o,this.maskKey=A.randomBytes(4);}createFrame(o){const C=this.frameData?.byteLength??0;let l=C,B=6;C>e?(B+=8,l=127):C>125&&(B+=2,l=126);const I=Buffer.allocUnsafe(C+B);I[0]=I[1]=0,I[0]|=128,I[0]=(I[0]&240)+o;/*! ws. MIT License. Einar Otto Stangvik <einaros@gmail.com> */I[B-4]=this.maskKey[0],I[B-3]=this.maskKey[1],I[B-2]=this.maskKey[2],I[B-1]=this.maskKey[3],I[1]=l,l===126?I.writeUInt16BE(C,2):l===127&&(I[2]=I[3]=0,I.writeUIntBE(C,4,6)),I[1]|=128;for(let c=0;c<C;c++)I[B+c]=this.frameData[c]^this.maskKey[c%4];return I}};Q(r,"WebsocketFrameSend");let t=r;return frame={WebsocketFrameSend:t},frame}Q(requireFrame,"requireFrame");var receiver,hasRequiredReceiver;function requireReceiver(){var F,p,m,k,w;if(hasRequiredReceiver)return receiver;hasRequiredReceiver=1;const{Writable:e}=require$$0__default$1,A=require$$0__default$6,{parserStates:t,opcodes:r,states:n,emptyBuffer:o}=requireConstants(),{kReadyState:C,kSentClose:l,kResponse:B,kReceivedClose:I}=requireSymbols(),{isValidStatusCode:c,failWebsocketConnection:y,websocketMessageReceived:f}=requireUtil(),{WebsocketFrameSend:D}=requireFrame(),S={};S.ping=A.channel("undici:websocket:ping"),S.pong=A.channel("undici:websocket:pong");const b=class b extends e{constructor(x){super();vA(this,F,[]);vA(this,p,0);vA(this,m,t.INFO);vA(this,k,{});vA(this,w,[]);this.ws=x;}_write(x,v,W){_(this,F).push(x),pA(this,p,_(this,p)+x.length),this.run(W);}run(x){var v;for(;;){if(_(this,m)===t.INFO){if(_(this,p)<2)return x();const W=this.consume(2);if(_(this,k).fin=(W[0]&128)!==0,_(this,k).opcode=W[0]&15,(v=_(this,k)).originalOpcode??(v.originalOpcode=_(this,k).opcode),_(this,k).fragmented=!_(this,k).fin&&_(this,k).opcode!==r.CONTINUATION,_(this,k).fragmented&&_(this,k).opcode!==r.BINARY&&_(this,k).opcode!==r.TEXT){y(this.ws,"Invalid frame type was fragmented.");return}const J=W[1]&127;if(J<=125?(_(this,k).payloadLength=J,pA(this,m,t.READ_DATA)):J===126?pA(this,m,t.PAYLOADLENGTH_16):J===127&&pA(this,m,t.PAYLOADLENGTH_64),_(this,k).fragmented&&J>125){y(this.ws,"Fragmented frame exceeded 125 bytes.");return}else if((_(this,k).opcode===r.PING||_(this,k).opcode===r.PONG||_(this,k).opcode===r.CLOSE)&&J>125){y(this.ws,"Payload length for control frame exceeded 125 bytes.");return}else if(_(this,k).opcode===r.CLOSE){if(J===1){y(this.ws,"Received close frame with a 1-byte body.");return}const iA=this.consume(J);if(_(this,k).closeInfo=this.parseCloseBody(!1,iA),!this.ws[l]){const CA=Buffer.allocUnsafe(2);CA.writeUInt16BE(_(this,k).closeInfo.code,0);const uA=new D(CA);this.ws[B].socket.write(uA.createFrame(r.CLOSE),z=>{z||(this.ws[l]=!0);});}this.ws[C]=n.CLOSING,this.ws[I]=!0,this.end();return}else if(_(this,k).opcode===r.PING){const iA=this.consume(J);if(!this.ws[I]){const CA=new D(iA);this.ws[B].socket.write(CA.createFrame(r.PONG)),S.ping.hasSubscribers&&S.ping.publish({payload:iA});}if(pA(this,m,t.INFO),_(this,p)>0)continue;x();return}else if(_(this,k).opcode===r.PONG){const iA=this.consume(J);if(S.pong.hasSubscribers&&S.pong.publish({payload:iA}),_(this,p)>0)continue;x();return}}else if(_(this,m)===t.PAYLOADLENGTH_16){if(_(this,p)<2)return x();const W=this.consume(2);_(this,k).payloadLength=W.readUInt16BE(0),pA(this,m,t.READ_DATA);}else if(_(this,m)===t.PAYLOADLENGTH_64){if(_(this,p)<8)return x();const W=this.consume(8),J=W.readUInt32BE(0);if(J>2**31-1){y(this.ws,"Received payload length > 2^31 bytes.");return}const iA=W.readUInt32BE(4);_(this,k).payloadLength=(J<<8)+iA,pA(this,m,t.READ_DATA);}else if(_(this,m)===t.READ_DATA){if(_(this,p)<_(this,k).payloadLength)return x();if(_(this,p)>=_(this,k).payloadLength){const W=this.consume(_(this,k).payloadLength);if(_(this,w).push(W),!_(this,k).fragmented||_(this,k).fin&&_(this,k).opcode===r.CONTINUATION){const J=Buffer.concat(_(this,w));f(this.ws,_(this,k).originalOpcode,J),pA(this,k,{}),_(this,w).length=0;}pA(this,m,t.INFO);}}if(!(_(this,p)>0)){x();break}}}consume(x){if(x>_(this,p))return null;if(x===0)return o;if(_(this,F)[0].length===x)return pA(this,p,_(this,p)-_(this,F)[0].length),_(this,F).shift();const v=Buffer.allocUnsafe(x);let W=0;for(;W!==x;){const J=_(this,F)[0],{length:iA}=J;if(iA+W===x){v.set(_(this,F).shift(),W);break}else if(iA+W>x){v.set(J.subarray(0,x-W),W),_(this,F)[0]=J.subarray(x-W);break}else v.set(_(this,F).shift(),W),W+=J.length;}return pA(this,p,_(this,p)-x),v}parseCloseBody(x,v){let W;if(v.length>=2&&(W=v.readUInt16BE(0)),x)return c(W)?{code:W}:null;let J=v.subarray(2);if(J[0]===239&&J[1]===187&&J[2]===191&&(J=J.subarray(3)),W!==void 0&&!c(W))return null;try{J=new TextDecoder("utf-8",{fatal:!0}).decode(J);}catch{return null}return {code:W,reason:J}}get closingInfo(){return _(this,k).closeInfo}};F=new WeakMap,p=new WeakMap,m=new WeakMap,k=new WeakMap,w=new WeakMap,Q(b,"ByteParser");let R=b;return receiver={ByteParser:R},receiver}Q(requireReceiver,"requireReceiver");var websocket,hasRequiredWebsocket;function requireWebsocket(){var iA,CA,uA,z,IA,mt;if(hasRequiredWebsocket)return websocket;hasRequiredWebsocket=1;const{webidl:e}=requireWebidl(),{URLSerializer:A}=requireDataURL(),{getGlobalOrigin:t}=requireGlobal(),{staticPropertyDescriptors:r,states:n,opcodes:o,emptyBuffer:C}=requireConstants(),{kWebSocketURL:l,kReadyState:B,kController:I,kBinaryType:c,kResponse:y,kSentClose:f,kByteParser:D}=requireSymbols(),{isEstablished:S,isClosing:R,isValidSubprotocol:F,failWebsocketConnection:p,fireEvent:m}=requireUtil(),{establishWebSocketConnection:k}=requireConnection(),{WebsocketFrameSend:w}=requireFrame(),{ByteParser:b}=requireReceiver(),{kEnumerableProperty:N,isBlobLike:U}=util$j,{getGlobalDispatcher:x}=global,{types:v}=require$$0__default$3;let W=!1;const nA=class nA extends EventTarget{constructor(Z,K=[]){super();vA(this,IA);vA(this,iA,{open:null,error:null,close:null,message:null});vA(this,CA,0);vA(this,uA,"");vA(this,z,"");e.argumentLengthCheck(arguments,1,{header:"WebSocket constructor"}),W||(W=!0,process.emitWarning("WebSockets are experimental, expect them to change at any time.",{code:"UNDICI-WS"}));const G=e.converters["DOMString or sequence<DOMString> or WebSocketInit"](K);Z=e.converters.USVString(Z),K=G.protocols;const q=t();let X;try{X=new URL(Z,q);}catch(AA){throw new DOMException(AA,"SyntaxError")}if(X.protocol==="http:"?X.protocol="ws:":X.protocol==="https:"&&(X.protocol="wss:"),X.protocol!=="ws:"&&X.protocol!=="wss:")throw new DOMException(`Expected a ws: or wss: protocol, got ${X.protocol}`,"SyntaxError");if(X.hash||X.href.endsWith("#"))throw new DOMException("Got fragment","SyntaxError");if(typeof K=="string"&&(K=[K]),K.length!==new Set(K.map(AA=>AA.toLowerCase())).size)throw new DOMException("Invalid Sec-WebSocket-Protocol value","SyntaxError");if(K.length>0&&!K.every(AA=>F(AA)))throw new DOMException("Invalid Sec-WebSocket-Protocol value","SyntaxError");this[l]=new URL(X.href),this[I]=k(X,K,this,AA=>jA(this,IA,mt).call(this,AA),G),this[B]=nA.CONNECTING,this[c]="blob";}close(Z=void 0,K=void 0){if(e.brandCheck(this,nA),Z!==void 0&&(Z=e.converters["unsigned short"](Z,{clamp:!0})),K!==void 0&&(K=e.converters.USVString(K)),Z!==void 0&&Z!==1e3&&(Z<3e3||Z>4999))throw new DOMException("invalid code","InvalidAccessError");let G=0;if(K!==void 0&&(G=Buffer.byteLength(K),G>123))throw new DOMException(`Reason must be less than 123 bytes; received ${G}`,"SyntaxError");if(!(this[B]===nA.CLOSING||this[B]===nA.CLOSED))if(!S(this))p(this,"Connection was closed before it was established."),this[B]=nA.CLOSING;else if(R(this))this[B]=nA.CLOSING;else {const q=new w;Z!==void 0&&K===void 0?(q.frameData=Buffer.allocUnsafe(2),q.frameData.writeUInt16BE(Z,0)):Z!==void 0&&K!==void 0?(q.frameData=Buffer.allocUnsafe(2+G),q.frameData.writeUInt16BE(Z,0),q.frameData.write(K,2,"utf-8")):q.frameData=C,this[y].socket.write(q.createFrame(o.CLOSE),AA=>{AA||(this[f]=!0);}),this[B]=n.CLOSING;}}send(Z){if(e.brandCheck(this,nA),e.argumentLengthCheck(arguments,1,{header:"WebSocket.send"}),Z=e.converters.WebSocketSendData(Z),this[B]===nA.CONNECTING)throw new DOMException("Sent before connected.","InvalidStateError");if(!S(this)||R(this))return;const K=this[y].socket;if(typeof Z=="string"){const G=Buffer.from(Z),X=new w(G).createFrame(o.TEXT);pA(this,CA,_(this,CA)+G.byteLength),K.write(X,()=>{pA(this,CA,_(this,CA)-G.byteLength);});}else if(v.isArrayBuffer(Z)){const G=Buffer.from(Z),X=new w(G).createFrame(o.BINARY);pA(this,CA,_(this,CA)+G.byteLength),K.write(X,()=>{pA(this,CA,_(this,CA)-G.byteLength);});}else if(ArrayBuffer.isView(Z)){const G=Buffer.from(Z,Z.byteOffset,Z.byteLength),X=new w(G).createFrame(o.BINARY);pA(this,CA,_(this,CA)+G.byteLength),K.write(X,()=>{pA(this,CA,_(this,CA)-G.byteLength);});}else if(U(Z)){const G=new w;Z.arrayBuffer().then(q=>{const X=Buffer.from(q);G.frameData=X;const AA=G.createFrame(o.BINARY);pA(this,CA,_(this,CA)+X.byteLength),K.write(AA,()=>{pA(this,CA,_(this,CA)-X.byteLength);});});}}get readyState(){return e.brandCheck(this,nA),this[B]}get bufferedAmount(){return e.brandCheck(this,nA),_(this,CA)}get url(){return e.brandCheck(this,nA),A(this[l])}get extensions(){return e.brandCheck(this,nA),_(this,z)}get protocol(){return e.brandCheck(this,nA),_(this,uA)}get onopen(){return e.brandCheck(this,nA),_(this,iA).open}set onopen(Z){e.brandCheck(this,nA),_(this,iA).open&&this.removeEventListener("open",_(this,iA).open),typeof Z=="function"?(_(this,iA).open=Z,this.addEventListener("open",Z)):_(this,iA).open=null;}get onerror(){return e.brandCheck(this,nA),_(this,iA).error}set onerror(Z){e.brandCheck(this,nA),_(this,iA).error&&this.removeEventListener("error",_(this,iA).error),typeof Z=="function"?(_(this,iA).error=Z,this.addEventListener("error",Z)):_(this,iA).error=null;}get onclose(){return e.brandCheck(this,nA),_(this,iA).close}set onclose(Z){e.brandCheck(this,nA),_(this,iA).close&&this.removeEventListener("close",_(this,iA).close),typeof Z=="function"?(_(this,iA).close=Z,this.addEventListener("close",Z)):_(this,iA).close=null;}get onmessage(){return e.brandCheck(this,nA),_(this,iA).message}set onmessage(Z){e.brandCheck(this,nA),_(this,iA).message&&this.removeEventListener("message",_(this,iA).message),typeof Z=="function"?(_(this,iA).message=Z,this.addEventListener("message",Z)):_(this,iA).message=null;}get binaryType(){return e.brandCheck(this,nA),this[c]}set binaryType(Z){e.brandCheck(this,nA),Z!=="blob"&&Z!=="arraybuffer"?this[c]="blob":this[c]=Z;}};iA=new WeakMap,CA=new WeakMap,uA=new WeakMap,z=new WeakMap,IA=new WeakSet,mt=Q(function(Z){this[y]=Z;const K=new b(this);K.on("drain",Q(function(){this.ws[y].socket.resume();},"onParserDrain")),Z.socket.ws=this,this[D]=K,this[B]=n.OPEN;const G=Z.headersList.get("sec-websocket-extensions");G!==null&&pA(this,z,G);const q=Z.headersList.get("sec-websocket-protocol");q!==null&&pA(this,uA,q),m("open",this);},"#onConnectionEstablished"),Q(nA,"WebSocket");let J=nA;return J.CONNECTING=J.prototype.CONNECTING=n.CONNECTING,J.OPEN=J.prototype.OPEN=n.OPEN,J.CLOSING=J.prototype.CLOSING=n.CLOSING,J.CLOSED=J.prototype.CLOSED=n.CLOSED,Object.defineProperties(J.prototype,{CONNECTING:r,OPEN:r,CLOSING:r,CLOSED:r,url:N,readyState:N,bufferedAmount:N,onopen:N,onerror:N,onclose:N,close:N,onmessage:N,binaryType:N,send:N,extensions:N,protocol:N,[Symbol.toStringTag]:{value:"WebSocket",writable:!1,enumerable:!1,configurable:!0}}),Object.defineProperties(J,{CONNECTING:r,OPEN:r,CLOSING:r,CLOSED:r}),e.converters["sequence<DOMString>"]=e.sequenceConverter(e.converters.DOMString),e.converters["DOMString or sequence<DOMString>"]=function(cA){return e.util.Type(cA)==="Object"&&Symbol.iterator in cA?e.converters["sequence<DOMString>"](cA):e.converters.DOMString(cA)},e.converters.WebSocketInit=e.dictionaryConverter([{key:"protocols",converter:e.converters["DOMString or sequence<DOMString>"],get defaultValue(){return []}},{key:"dispatcher",converter:cA=>cA,get defaultValue(){return x()}},{key:"headers",converter:e.nullableConverter(e.converters.HeadersInit)}]),e.converters["DOMString or sequence<DOMString> or WebSocketInit"]=function(cA){return e.util.Type(cA)==="Object"&&!(Symbol.iterator in cA)?e.converters.WebSocketInit(cA):{protocols:e.converters["DOMString or sequence<DOMString>"](cA)}},e.converters.WebSocketSendData=function(cA){if(e.util.Type(cA)==="Object"){if(U(cA))return e.converters.Blob(cA,{strict:!1});if(ArrayBuffer.isView(cA)||v.isAnyArrayBuffer(cA))return e.converters.BufferSource(cA)}return e.converters.USVString(cA)},websocket={WebSocket:J},websocket}Q(requireWebsocket,"requireWebsocket");const Dispatcher=dispatcher,errors=errors$1,Agent=agent,util=util$j,{InvalidArgumentError}=errors,api=api$1,ProxyAgent=proxyAgent,{getGlobalDispatcher,setGlobalDispatcher}=global;let hasCrypto;try{require("crypto"),hasCrypto=!0;}catch{hasCrypto=!1;}Object.assign(Dispatcher.prototype,api);var Agent_1=Agent,ProxyAgent_1=ProxyAgent;function makeDispatcher(e){return (A,t,r)=>{if(typeof t=="function"&&(r=t,t=null),!A||typeof A!="string"&&typeof A!="object"&&!(A instanceof URL))throw new InvalidArgumentError("invalid url");if(t!=null&&typeof t!="object")throw new InvalidArgumentError("invalid opts");if(t&&t.path!=null){if(typeof t.path!="string")throw new InvalidArgumentError("invalid opts.path");let C=t.path;t.path.startsWith("/")||(C=`/${C}`),A=new URL(util.parseOrigin(A).origin+C);}else t||(t=typeof A=="object"?A:{}),A=util.parseURL(A);const{agent:n,dispatcher:o=getGlobalDispatcher()}=t;if(n)throw new InvalidArgumentError("unsupported opts.agent. Did you mean opts.client?");return e.call(o,{...t,origin:A.origin,path:A.search?`${A.pathname}${A.search}`:A.pathname,method:t.method||(t.body?"PUT":"GET")},r)}}Q(makeDispatcher,"makeDispatcher"),requireHeaders().Headers,requireResponse().Response,requireRequest().Request,requireFormdata().FormData,requireFile().File,requireFilereader().FileReader,requireGlobal();const{CacheStorage}=requireCachestorage(),{kConstruct}=requireSymbols$1();new CacheStorage(kConstruct),requireCookies(),requireDataURL(),hasCrypto&&requireWebsocket(),makeDispatcher(api.request),makeDispatcher(api.stream),makeDispatcher(api.pipeline),makeDispatcher(api.connect),makeDispatcher(api.upgrade);var dist$2={},helpers={},__createBinding$2=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__createBinding||(Object.create?function(e,A,t,r){r===void 0&&(r=t);var n=Object.getOwnPropertyDescriptor(A,t);(!n||("get"in n?!A.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return A[t]}}),Object.defineProperty(e,r,n);}:function(e,A,t,r){r===void 0&&(r=t),e[r]=A[t];}),__setModuleDefault$2=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__setModuleDefault||(Object.create?function(e,A){Object.defineProperty(e,"default",{enumerable:!0,value:A});}:function(e,A){e.default=A;}),__importStar$2=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__importStar||function(e){if(e&&e.__esModule)return e;var A={};if(e!=null)for(var t in e)t!=="default"&&Object.prototype.hasOwnProperty.call(e,t)&&__createBinding$2(A,e,t);return __setModuleDefault$2(A,e),A};Object.defineProperty(helpers,"__esModule",{value:!0}),helpers.req=helpers.json=helpers.toBuffer=void 0;const http$3=__importStar$2(require$$2__default),https=__importStar$2(require$$1__default$3);async function toBuffer(e){let A=0;const t=[];for await(const r of e)A+=r.length,t.push(r);return Buffer.concat(t,A)}Q(toBuffer,"toBuffer"),helpers.toBuffer=toBuffer;async function json(e){const t=(await toBuffer(e)).toString("utf8");try{return JSON.parse(t)}catch(r){const n=r;throw n.message+=` (input: ${t})`,n}}Q(json,"json"),helpers.json=json;function req(e,A={}){const r=((typeof e=="string"?e:e.href).startsWith("https:")?https:http$3).request(e,A),n=new Promise((o,C)=>{r.once("response",o).once("error",C).end();});return r.then=n.then.bind(n),r}Q(req,"req"),helpers.req=req,function(e){var A=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__createBinding||(Object.create?function(I,c,y,f){f===void 0&&(f=y);var D=Object.getOwnPropertyDescriptor(c,y);(!D||("get"in D?!c.__esModule:D.writable||D.configurable))&&(D={enumerable:!0,get:function(){return c[y]}}),Object.defineProperty(I,f,D);}:function(I,c,y,f){f===void 0&&(f=y),I[f]=c[y];}),t=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__setModuleDefault||(Object.create?function(I,c){Object.defineProperty(I,"default",{enumerable:!0,value:c});}:function(I,c){I.default=c;}),r=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__importStar||function(I){if(I&&I.__esModule)return I;var c={};if(I!=null)for(var y in I)y!=="default"&&Object.prototype.hasOwnProperty.call(I,y)&&A(c,I,y);return t(c,I),c},n=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__exportStar||function(I,c){for(var y in I)y!=="default"&&!Object.prototype.hasOwnProperty.call(c,y)&&A(c,I,y);};Object.defineProperty(e,"__esModule",{value:!0}),e.Agent=void 0;const o=r(require$$2__default);n(helpers,e);const C=Symbol("AgentBaseInternalState"),B=class B extends o.Agent{constructor(c){super(c),this[C]={};}isSecureEndpoint(c){if(c){if(typeof c.secureEndpoint=="boolean")return c.secureEndpoint;if(typeof c.protocol=="string")return c.protocol==="https:"}const{stack:y}=new Error;return typeof y!="string"?!1:y.split(`
`).some(f=>f.indexOf("(https.js:")!==-1||f.indexOf("node:https:")!==-1)}createSocket(c,y,f){const D={...y,secureEndpoint:this.isSecureEndpoint(y)};Promise.resolve().then(()=>this.connect(c,D)).then(S=>{if(S instanceof o.Agent)return S.addRequest(c,D);this[C].currentSocket=S,super.createSocket(c,y,f);},f);}createConnection(){const c=this[C].currentSocket;if(this[C].currentSocket=void 0,!c)throw new Error("No socket was returned in the `connect()` function");return c}get defaultPort(){return this[C].defaultPort??(this.protocol==="https:"?443:80)}set defaultPort(c){this[C]&&(this[C].defaultPort=c);}get protocol(){return this[C].protocol??(this.isSecureEndpoint()?"https:":"http:")}set protocol(c){this[C]&&(this[C].protocol=c);}};Q(B,"Agent");let l=B;e.Agent=l;}(dist$2);var dist$1={},src={exports:{}},browser={exports:{}},ms,hasRequiredMs;function requireMs(){if(hasRequiredMs)return ms;hasRequiredMs=1;var e=1e3,A=e*60,t=A*60,r=t*24,n=r*7,o=r*365.25;ms=Q(function(c,y){y=y||{};var f=typeof c;if(f==="string"&&c.length>0)return C(c);if(f==="number"&&isFinite(c))return y.long?B(c):l(c);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(c))},"ms");function C(c){if(c=String(c),!(c.length>100)){var y=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(c);if(y){var f=parseFloat(y[1]),D=(y[2]||"ms").toLowerCase();switch(D){case"years":case"year":case"yrs":case"yr":case"y":return f*o;case"weeks":case"week":case"w":return f*n;case"days":case"day":case"d":return f*r;case"hours":case"hour":case"hrs":case"hr":case"h":return f*t;case"minutes":case"minute":case"mins":case"min":case"m":return f*A;case"seconds":case"second":case"secs":case"sec":case"s":return f*e;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return f;default:return}}}}Q(C,"parse");function l(c){var y=Math.abs(c);return y>=r?Math.round(c/r)+"d":y>=t?Math.round(c/t)+"h":y>=A?Math.round(c/A)+"m":y>=e?Math.round(c/e)+"s":c+"ms"}Q(l,"fmtShort");function B(c){var y=Math.abs(c);return y>=r?I(c,y,r,"day"):y>=t?I(c,y,t,"hour"):y>=A?I(c,y,A,"minute"):y>=e?I(c,y,e,"second"):c+" ms"}Q(B,"fmtLong");function I(c,y,f,D){var S=y>=f*1.5;return Math.round(c/f)+" "+D+(S?"s":"")}return Q(I,"plural"),ms}Q(requireMs,"requireMs");var common,hasRequiredCommon;function requireCommon(){if(hasRequiredCommon)return common;hasRequiredCommon=1;function e(A){r.debug=r,r.default=r,r.coerce=I,r.disable=C,r.enable=o,r.enabled=l,r.humanize=requireMs(),r.destroy=c,Object.keys(A).forEach(y=>{r[y]=A[y];}),r.names=[],r.skips=[],r.formatters={};function t(y){let f=0;for(let D=0;D<y.length;D++)f=(f<<5)-f+y.charCodeAt(D),f|=0;return r.colors[Math.abs(f)%r.colors.length]}Q(t,"selectColor"),r.selectColor=t;function r(y){let f,D=null,S,R;function F(...p){if(!F.enabled)return;const m=F,k=Number(new Date),w=k-(f||k);m.diff=w,m.prev=f,m.curr=k,f=k,p[0]=r.coerce(p[0]),typeof p[0]!="string"&&p.unshift("%O");let b=0;p[0]=p[0].replace(/%([a-zA-Z%])/g,(U,x)=>{if(U==="%%")return "%";b++;const v=r.formatters[x];if(typeof v=="function"){const W=p[b];U=v.call(m,W),p.splice(b,1),b--;}return U}),r.formatArgs.call(m,p),(m.log||r.log).apply(m,p);}return Q(F,"debug"),F.namespace=y,F.useColors=r.useColors(),F.color=r.selectColor(y),F.extend=n,F.destroy=r.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>D!==null?D:(S!==r.namespaces&&(S=r.namespaces,R=r.enabled(y)),R),set:p=>{D=p;}}),typeof r.init=="function"&&r.init(F),F}Q(r,"createDebug");function n(y,f){const D=r(this.namespace+(typeof f>"u"?":":f)+y);return D.log=this.log,D}Q(n,"extend");function o(y){r.save(y),r.namespaces=y,r.names=[],r.skips=[];let f;const D=(typeof y=="string"?y:"").split(/[\s,]+/),S=D.length;for(f=0;f<S;f++)D[f]&&(y=D[f].replace(/\*/g,".*?"),y[0]==="-"?r.skips.push(new RegExp("^"+y.slice(1)+"$")):r.names.push(new RegExp("^"+y+"$")));}Q(o,"enable");function C(){const y=[...r.names.map(B),...r.skips.map(B).map(f=>"-"+f)].join(",");return r.enable(""),y}Q(C,"disable");function l(y){if(y[y.length-1]==="*")return !0;let f,D;for(f=0,D=r.skips.length;f<D;f++)if(r.skips[f].test(y))return !1;for(f=0,D=r.names.length;f<D;f++)if(r.names[f].test(y))return !0;return !1}Q(l,"enabled");function B(y){return y.toString().substring(2,y.toString().length-2).replace(/\.\*\?$/,"*")}Q(B,"toNamespace");function I(y){return y instanceof Error?y.stack||y.message:y}Q(I,"coerce");function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");}return Q(c,"destroy"),r.enable(r.load()),r}return Q(e,"setup"),common=e,common}Q(requireCommon,"requireCommon");var hasRequiredBrowser;function requireBrowser(){return hasRequiredBrowser||(hasRequiredBrowser=1,function(e,A){A.formatArgs=r,A.save=n,A.load=o,A.useColors=t,A.storage=C(),A.destroy=(()=>{let B=!1;return ()=>{B||(B=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));}})(),A.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function t(){return typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs)?!0:typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)?!1:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}Q(t,"useColors");function r(B){if(B[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+B[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const I="color: "+this.color;B.splice(1,0,I,"color: inherit");let c=0,y=0;B[0].replace(/%[a-zA-Z%]/g,f=>{f!=="%%"&&(c++,f==="%c"&&(y=c));}),B.splice(y,0,I);}Q(r,"formatArgs"),A.log=console.debug||console.log||(()=>{});function n(B){try{B?A.storage.setItem("debug",B):A.storage.removeItem("debug");}catch{}}Q(n,"save");function o(){let B;try{B=A.storage.getItem("debug");}catch{}return !B&&typeof process<"u"&&"env"in process&&(B=process.env.DEBUG),B}Q(o,"load");function C(){try{return localStorage}catch{}}Q(C,"localstorage"),e.exports=requireCommon()(A);const{formatters:l}=e.exports;l.j=function(B){try{return JSON.stringify(B)}catch(I){return "[UnexpectedJSONParseError]: "+I.message}};}(browser,browser.exports)),browser.exports}Q(requireBrowser,"requireBrowser");var node={exports:{}},hasFlag,hasRequiredHasFlag;function requireHasFlag(){return hasRequiredHasFlag||(hasRequiredHasFlag=1,hasFlag=Q((e,A=process.argv)=>{const t=e.startsWith("-")?"":e.length===1?"-":"--",r=A.indexOf(t+e),n=A.indexOf("--");return r!==-1&&(n===-1||r<n)},"hasFlag")),hasFlag}Q(requireHasFlag,"requireHasFlag");var supportsColor_1,hasRequiredSupportsColor;function requireSupportsColor(){if(hasRequiredSupportsColor)return supportsColor_1;hasRequiredSupportsColor=1;const e=require$$0__default$7,A=require$$1__default$4,t=requireHasFlag(),{env:r}=process;let n;t("no-color")||t("no-colors")||t("color=false")||t("color=never")?n=0:(t("color")||t("colors")||t("color=true")||t("color=always"))&&(n=1),"FORCE_COLOR"in r&&(r.FORCE_COLOR==="true"?n=1:r.FORCE_COLOR==="false"?n=0:n=r.FORCE_COLOR.length===0?1:Math.min(parseInt(r.FORCE_COLOR,10),3));function o(B){return B===0?!1:{level:B,hasBasic:!0,has256:B>=2,has16m:B>=3}}Q(o,"translateLevel");function C(B,I){if(n===0)return 0;if(t("color=16m")||t("color=full")||t("color=truecolor"))return 3;if(t("color=256"))return 2;if(B&&!I&&n===void 0)return 0;const c=n||0;if(r.TERM==="dumb")return c;if(process.platform==="win32"){const y=e.release().split(".");return Number(y[0])>=10&&Number(y[2])>=10586?Number(y[2])>=14931?3:2:1}if("CI"in r)return ["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(y=>y in r)||r.CI_NAME==="codeship"?1:c;if("TEAMCITY_VERSION"in r)return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION)?1:0;if(r.COLORTERM==="truecolor")return 3;if("TERM_PROGRAM"in r){const y=parseInt((r.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(r.TERM_PROGRAM){case"iTerm.app":return y>=3?3:2;case"Apple_Terminal":return 2}}return /-256(color)?$/i.test(r.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM)||"COLORTERM"in r?1:c}Q(C,"supportsColor");function l(B){const I=C(B,B&&B.isTTY);return o(I)}return Q(l,"getSupportLevel"),supportsColor_1={supportsColor:l,stdout:o(C(!0,A.isatty(1))),stderr:o(C(!0,A.isatty(2)))},supportsColor_1}Q(requireSupportsColor,"requireSupportsColor");var hasRequiredNode;function requireNode(){return hasRequiredNode||(hasRequiredNode=1,function(e,A){const t=require$$1__default$4,r=require$$0__default$3;A.init=c,A.log=l,A.formatArgs=o,A.save=B,A.load=I,A.useColors=n,A.destroy=r.deprecate(()=>{},"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),A.colors=[6,2,3,4,5,1];try{const f=requireSupportsColor();f&&(f.stderr||f).level>=2&&(A.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221]);}catch{}A.inspectOpts=Object.keys(process.env).filter(f=>/^debug_/i.test(f)).reduce((f,D)=>{const S=D.substring(6).toLowerCase().replace(/_([a-z])/g,(F,p)=>p.toUpperCase());let R=process.env[D];return /^(yes|on|true|enabled)$/i.test(R)?R=!0:/^(no|off|false|disabled)$/i.test(R)?R=!1:R==="null"?R=null:R=Number(R),f[S]=R,f},{});function n(){return "colors"in A.inspectOpts?!!A.inspectOpts.colors:t.isatty(process.stderr.fd)}Q(n,"useColors");function o(f){const{namespace:D,useColors:S}=this;if(S){const R=this.color,F="\x1B[3"+(R<8?R:"8;5;"+R),p=`  ${F};1m${D} \x1B[0m`;f[0]=p+f[0].split(`
`).join(`
`+p),f.push(F+"m+"+e.exports.humanize(this.diff)+"\x1B[0m");}else f[0]=C()+D+" "+f[0];}Q(o,"formatArgs");function C(){return A.inspectOpts.hideDate?"":new Date().toISOString()+" "}Q(C,"getDate");function l(...f){return process.stderr.write(r.format(...f)+`
`)}Q(l,"log");function B(f){f?process.env.DEBUG=f:delete process.env.DEBUG;}Q(B,"save");function I(){return process.env.DEBUG}Q(I,"load");function c(f){f.inspectOpts={};const D=Object.keys(A.inspectOpts);for(let S=0;S<D.length;S++)f.inspectOpts[D[S]]=A.inspectOpts[D[S]];}Q(c,"init"),e.exports=requireCommon()(A);const{formatters:y}=e.exports;y.o=function(f){return this.inspectOpts.colors=this.useColors,r.inspect(f,this.inspectOpts).split(`
`).map(D=>D.trim()).join(" ")},y.O=function(f){return this.inspectOpts.colors=this.useColors,r.inspect(f,this.inspectOpts)};}(node,node.exports)),node.exports}Q(requireNode,"requireNode"),typeof process>"u"||process.type==="renderer"||process.browser===!0||process.__nwjs?src.exports=requireBrowser():src.exports=requireNode();var srcExports=src.exports,__createBinding$1=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__createBinding||(Object.create?function(e,A,t,r){r===void 0&&(r=t);var n=Object.getOwnPropertyDescriptor(A,t);(!n||("get"in n?!A.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return A[t]}}),Object.defineProperty(e,r,n);}:function(e,A,t,r){r===void 0&&(r=t),e[r]=A[t];}),__setModuleDefault$1=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__setModuleDefault||(Object.create?function(e,A){Object.defineProperty(e,"default",{enumerable:!0,value:A});}:function(e,A){e.default=A;}),__importStar$1=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__importStar||function(e){if(e&&e.__esModule)return e;var A={};if(e!=null)for(var t in e)t!=="default"&&Object.prototype.hasOwnProperty.call(e,t)&&__createBinding$1(A,e,t);return __setModuleDefault$1(A,e),A},__importDefault$2=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(dist$1,"__esModule",{value:!0});var HttpProxyAgent_1=dist$1.HttpProxyAgent=void 0;const net$1=__importStar$1(require$$0__default$2),tls$1=__importStar$1(require$$1__default$1),debug_1$2=__importDefault$2(srcExports),events_1=require$$0__default$5,agent_base_1$1=dist$2,debug$2=(0, debug_1$2.default)("http-proxy-agent"),ft=class ft extends agent_base_1$1.Agent{constructor(A,t){super(t),this.proxy=typeof A=="string"?new URL(A):A,this.proxyHeaders=t?.headers??{},debug$2("Creating new HttpProxyAgent instance: %o",this.proxy.href);const r=(this.proxy.hostname||this.proxy.host).replace(/^\[|\]$/g,""),n=this.proxy.port?parseInt(this.proxy.port,10):this.proxy.protocol==="https:"?443:80;this.connectOpts={...t?omit$1(t,"headers"):null,host:r,port:n};}addRequest(A,t){A._header=null,this.setRequestProps(A,t),super.addRequest(A,t);}setRequestProps(A,t){const{proxy:r}=this,n=t.secureEndpoint?"https:":"http:",o=A.getHeader("host")||"localhost",C=`${n}//${o}`,l=new URL(A.path,C);t.port!==80&&(l.port=String(t.port)),A.path=String(l);const B=typeof this.proxyHeaders=="function"?this.proxyHeaders():{...this.proxyHeaders};if(r.username||r.password){const I=`${decodeURIComponent(r.username)}:${decodeURIComponent(r.password)}`;B["Proxy-Authorization"]=`Basic ${Buffer.from(I).toString("base64")}`;}B["Proxy-Connection"]||(B["Proxy-Connection"]=this.keepAlive?"Keep-Alive":"close");for(const I of Object.keys(B)){const c=B[I];c&&A.setHeader(I,c);}}async connect(A,t){A._header=null,A.path.includes("://")||this.setRequestProps(A,t);let r,n;debug$2("Regenerating stored HTTP header string for request"),A._implicitHeader(),A.outputData&&A.outputData.length>0&&(debug$2("Patching connection write() output buffer with updated header"),r=A.outputData[0].data,n=r.indexOf(`\r
\r
`)+4,A.outputData[0].data=A._header+r.substring(n),debug$2("Output buffer: %o",A.outputData[0].data));let o;return this.proxy.protocol==="https:"?(debug$2("Creating `tls.Socket`: %o",this.connectOpts),o=tls$1.connect(this.connectOpts)):(debug$2("Creating `net.Socket`: %o",this.connectOpts),o=net$1.connect(this.connectOpts)),await(0, events_1.once)(o,"connect"),o}};Q(ft,"HttpProxyAgent");let HttpProxyAgent=ft;HttpProxyAgent.protocols=["http","https"],HttpProxyAgent_1=dist$1.HttpProxyAgent=HttpProxyAgent;function omit$1(e,...A){const t={};let r;for(r in e)A.includes(r)||(t[r]=e[r]);return t}Q(omit$1,"omit$1");var dist={},parseProxyResponse$1={},__importDefault$1=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(parseProxyResponse$1,"__esModule",{value:!0}),parseProxyResponse$1.parseProxyResponse=void 0;const debug_1$1=__importDefault$1(srcExports),debug$1=(0, debug_1$1.default)("https-proxy-agent:parse-proxy-response");function parseProxyResponse(e){return new Promise((A,t)=>{let r=0;const n=[];function o(){const c=e.read();c?I(c):e.once("readable",o);}Q(o,"read");function C(){e.removeListener("end",l),e.removeListener("error",B),e.removeListener("readable",o);}Q(C,"cleanup");function l(){C(),debug$1("onend"),t(new Error("Proxy connection ended before receiving CONNECT response"));}Q(l,"onend");function B(c){C(),debug$1("onerror %o",c),t(c);}Q(B,"onerror");function I(c){n.push(c),r+=c.length;const y=Buffer.concat(n,r),f=y.indexOf(`\r
\r
`);if(f===-1){debug$1("have not received end of HTTP headers yet..."),o();return}const D=y.slice(0,f).toString("ascii").split(`\r
`),S=D.shift();if(!S)return e.destroy(),t(new Error("No header received from proxy CONNECT response"));const R=S.split(" "),F=+R[1],p=R.slice(2).join(" "),m={};for(const k of D){if(!k)continue;const w=k.indexOf(":");if(w===-1)return e.destroy(),t(new Error(`Invalid header from proxy CONNECT response: "${k}"`));const b=k.slice(0,w).toLowerCase(),N=k.slice(w+1).trimStart(),U=m[b];typeof U=="string"?m[b]=[U,N]:Array.isArray(U)?U.push(N):m[b]=N;}debug$1("got proxy server response: %o %o",S,m),C(),A({connect:{statusCode:F,statusText:p,headers:m},buffered:y});}Q(I,"ondata"),e.on("error",B),e.on("end",l),o();})}Q(parseProxyResponse,"parseProxyResponse"),parseProxyResponse$1.parseProxyResponse=parseProxyResponse;var __createBinding=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__createBinding||(Object.create?function(e,A,t,r){r===void 0&&(r=t);var n=Object.getOwnPropertyDescriptor(A,t);(!n||("get"in n?!A.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return A[t]}}),Object.defineProperty(e,r,n);}:function(e,A,t,r){r===void 0&&(r=t),e[r]=A[t];}),__setModuleDefault=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__setModuleDefault||(Object.create?function(e,A){Object.defineProperty(e,"default",{enumerable:!0,value:A});}:function(e,A){e.default=A;}),__importStar=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__importStar||function(e){if(e&&e.__esModule)return e;var A={};if(e!=null)for(var t in e)t!=="default"&&Object.prototype.hasOwnProperty.call(e,t)&&__createBinding(A,e,t);return __setModuleDefault(A,e),A},__importDefault=_commonjsHelpers.commonjsGlobal&&_commonjsHelpers.commonjsGlobal.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(dist,"__esModule",{value:!0});var HttpsProxyAgent_1=dist.HttpsProxyAgent=void 0;const net=__importStar(require$$0__default$2),tls=__importStar(require$$1__default$1),assert_1=__importDefault(require$$0__default),debug_1=__importDefault(srcExports),agent_base_1=dist$2,parse_proxy_response_1=parseProxyResponse$1,debug$3=(0, debug_1.default)("https-proxy-agent"),yt=class yt extends agent_base_1.Agent{constructor(A,t){super(t),this.options={path:void 0},this.proxy=typeof A=="string"?new URL(A):A,this.proxyHeaders=t?.headers??{},debug$3("Creating new HttpsProxyAgent instance: %o",this.proxy.href);const r=(this.proxy.hostname||this.proxy.host).replace(/^\[|\]$/g,""),n=this.proxy.port?parseInt(this.proxy.port,10):this.proxy.protocol==="https:"?443:80;this.connectOpts={ALPNProtocols:["http/1.1"],...t?omit(t,"headers"):null,host:r,port:n};}async connect(A,t){const{proxy:r}=this;if(!t.host)throw new TypeError('No "host" provided');let n;if(r.protocol==="https:"){debug$3("Creating `tls.Socket`: %o",this.connectOpts);const f=this.connectOpts.servername||this.connectOpts.host;n=tls.connect({...this.connectOpts,servername:f&&net.isIP(f)?void 0:f});}else debug$3("Creating `net.Socket`: %o",this.connectOpts),n=net.connect(this.connectOpts);const o=typeof this.proxyHeaders=="function"?this.proxyHeaders():{...this.proxyHeaders},C=net.isIPv6(t.host)?`[${t.host}]`:t.host;let l=`CONNECT ${C}:${t.port} HTTP/1.1\r
`;if(r.username||r.password){const f=`${decodeURIComponent(r.username)}:${decodeURIComponent(r.password)}`;o["Proxy-Authorization"]=`Basic ${Buffer.from(f).toString("base64")}`;}o.Host=`${C}:${t.port}`,o["Proxy-Connection"]||(o["Proxy-Connection"]=this.keepAlive?"Keep-Alive":"close");for(const f of Object.keys(o))l+=`${f}: ${o[f]}\r
`;const B=(0, parse_proxy_response_1.parseProxyResponse)(n);n.write(`${l}\r
`);const{connect:I,buffered:c}=await B;if(A.emit("proxyConnect",I),this.emit("proxyConnect",I,A),I.statusCode===200){if(A.once("socket",resume),t.secureEndpoint){debug$3("Upgrading socket connection to TLS");const f=t.servername||t.host;return tls.connect({...omit(t,"host","path","port"),socket:n,servername:net.isIP(f)?void 0:f})}return n}n.destroy();const y=new net.Socket({writable:!1});return y.readable=!0,A.once("socket",f=>{debug$3("Replaying proxy buffer for failed request"),(0, assert_1.default)(f.listenerCount("data")>0),f.push(c),f.push(null);}),y}};Q(yt,"HttpsProxyAgent");let HttpsProxyAgent=yt;HttpsProxyAgent.protocols=["http","https"],HttpsProxyAgent_1=dist.HttpsProxyAgent=HttpsProxyAgent;function resume(e){e.resume();}Q(resume,"resume");function omit(e,...A){const t={};let r;for(r in e)A.includes(r)||(t[r]=e[r]);return t}Q(omit,"omit");var d=Object.defineProperty,O=Q((e,A,t)=>A in e?d(e,A,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[A]=t,"O"),s=Q((e,A)=>d(e,"name",{value:A,configurable:!0}),"s"),i=Q((e,A,t)=>(O(e,typeof A!="symbol"?A+"":A,t),t),"i");function H(...e){process.env.DEBUG&&console.debug("[node-fetch-native] [proxy]",...e);}Q(H,"H"),s(H,"debug");function P(e,A){if(!A)return !1;for(const t of A)if(t===e||t[0]==="."&&e.endsWith(t.slice(1)))return !0;return !1}Q(P,"P"),s(P,"bypassProxy");const g=(Oe=class extends ProxyAgent_1{constructor(A){super(A),this._options=A,i(this,"_agent"),this._agent=new Agent_1;}dispatch(A,t){const r=new node_url.URL(A.origin).hostname;return P(r,this._options.noProxy)?(H(`Bypassing proxy for: ${r}`),this._agent.dispatch(A,t)):super.dispatch(A,t)}},Q(Oe,"g"),Oe);s(g,"UndiciProxyAgent");let h=g;const T=["http","https"],E={http:[HttpProxyAgent_1,HttpsProxyAgent_1],https:[HttpProxyAgent_1,HttpsProxyAgent_1]};function L(e){return T.includes(e)}Q(L,"L"),s(L,"isValidProtocol");const u=(Pe=class extends dist$2.Agent{constructor(A){super({}),this._options=A,i(this,"cache",new Map),i(this,"httpAgent"),i(this,"httpsAgent"),this.httpAgent=new http__namespace.Agent({}),this.httpsAgent=new https__namespace.Agent({});}connect(A,t){const r=A.getHeader("upgrade")==="websocket",n=t.secureEndpoint?r?"wss:":"https:":r?"ws:":"http:",o=A.getHeader("host");if(P(o,this._options.noProxy))return t.secureEndpoint?this.httpsAgent:this.httpAgent;const C=`${n}+${this._options.uri}`;let l=this.cache.get(C);if(!l){const B=new node_url.URL(this._options.uri).protocol.replace(":","");if(!L(B))throw new Error(`Unsupported protocol for proxy URL: ${this._options.uri}`);const I=E[B][t.secureEndpoint||r?1:0];l=new I(this._options.uri,this._options),this.cache.set(C,l);}return l}destroy(){for(const A of this.cache.values())A.destroy();super.destroy();}},Q(Pe,"u"),Pe);s(u,"NodeProxyAgent");let a=u;function createProxy(e={}){const A=e.url||process.env.https_proxy||process.env.http_proxy||process.env.HTTPS_PROXY||process.env.HTTP_PROXY;if(!A)return {agent:void 0,dispatcher:void 0};const t=e.noProxy||process.env.no_proxy||process.env.NO_PROXY,r=typeof t=="string"?t.split(","):t,n=new a({uri:A,noProxy:r}),o=new h({uri:A,noProxy:r});return {agent:n,dispatcher:o}}Q(createProxy,"createProxy"),s(createProxy,"createProxy");function createFetch(e={}){const A=createProxy(e);return (t,r)=>nodeFetchNative.fetch(t,{...A,...r})}Q(createFetch,"createFetch"),s(createFetch,"createFetch");const fetch=createFetch({});fetch_2 = fetch;

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
  await promisify$3(pipeline$3)(response.body, stream);
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
  if (options.headers?.["sec-fetch-mode"]) {
    options.mode = options.headers["sec-fetch-mode"];
  }
  const res = await fetch_2(url, {
    ...options,
    headers: normalizeHeaders(options.headers)
  }).catch((error) => {
    throw new Error(`Failed to download ${url}: ${error}`, { cause: error });
  });
  if (options.validateStatus && res.status >= 400) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res;
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

const http = async (input, options) => {
  if (input.endsWith(".json")) {
    return await _httpJSON(input, options);
  }
  const url = new URL(input);
  let name = basename$1(url.pathname);
  try {
    const head = await sendFetch(url.href, {
      method: "HEAD",
      validateStatus: true,
      headers: {
        authorization: options.auth ? `Bearer ${options.auth}` : void 0
      }
    });
    const _contentType = head.headers.get("content-type") || "";
    if (_contentType.includes("application/json")) {
      return await _httpJSON(input, options);
    }
    const filename = head.headers.get("content-disposition")?.match(/filename="?(.+)"?/)?.[1];
    if (filename) {
      name = filename.split(".")[0];
    }
  } catch (error) {
    debug(`Failed to fetch HEAD for ${url.href}:`, error);
  }
  return {
    name: `${name}-${url.href.slice(0, 8)}`,
    version: "",
    subdir: "",
    tar: url.href,
    defaultDir: name,
    headers: {
      Authorization: options.auth ? `Bearer ${options.auth}` : void 0
    }
  };
};
const _httpJSON = async (input, options) => {
  const result = await sendFetch(input, {
    validateStatus: true,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    }
  });
  const info = await result.json();
  if (!info.tar || !info.name) {
    throw new Error(
      `Invalid template info from ${input}. name or tar fields are missing!`
    );
  }
  return info;
};
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
      authorization: options.auth ? `Bearer ${options.auth}` : void 0,
      // https://gitlab.com/gitlab-org/gitlab/-/commit/50c11f278d18fe1f3fb12eb595067216bb58ade2
      "sec-fetch-mode": "same-origin"
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
  http,
  https: http,
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
    if (providerName === "http" || providerName === "https") {
      source = input;
    }
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
  const cwd = resolve$1(options.cwd || ".");
  const extractPath = resolve$1(cwd, options.dir || template.defaultDir);
  if (options.forceClean) {
    await rm(extractPath, { recursive: true, force: true });
  }
  if (!options.force && existsSync(extractPath) && readdirSync$1(extractPath).length > 0) {
    throw new Error(`Destination ${extractPath} already exists.`);
  }
  await mkdir$2(extractPath, { recursive: true });
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
  if (options.install) {
    debug("Installing dependencies...");
    await installDependencies({
      cwd: extractPath,
      silent: options.silent
    });
  }
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

export { index as i, node$2 as n };
