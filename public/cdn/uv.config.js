/*global Ultraviolet*/
self.__uv$config = {
  prefix: '/cdn-cgi/',
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: '/cdn/uv.handler.js',
  client: '/cdn/uv.client.js',
  bundle: '/cdn/uv.bundle.js',
  config: '/cdn/uv.config.js',
  sw: '/cdn/uv.sw.js'
}
