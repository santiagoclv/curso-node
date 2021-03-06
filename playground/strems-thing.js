const Stream, { Transform }  = require('stream')


const readableStream = new Stream.Readable({
    read() {}
})
const writableStream = new Stream.Writable()

writableStream._write = (chunk, encoding, next) => {
    console.log(chunk.toString())
    next()
}

const TransformStream = new Transform;
TransformStream._transform = (chunk, encoding, callback) => {
    console.log(chunk.toString().toUpperCase());
    callback();
  }

readableStream.pipe(writableStream)
readableStream.pipe(TransformStream);

readableStream.push('hi!')
readableStream.push('ho!')

writableStream.write("todos putos");


writableStream.end()