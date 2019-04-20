<template>
  <div id="terminal"></div>
</template>

<script>
import 'xterm/dist/xterm.css'
import { Terminal } from 'xterm'
export default {
  mounted () {
    var term = new Terminal({
      cursorBlink: true
    })
    term.open(document.getElementById('terminal'), true)
    term.on('key', function (key, ev) {
      console.log('key==========', ev.keyCode)
      term.write(key) // 输入
      // term.writeln(key) // 输入并换行
    })
    // let websocket = new WebSocket('ws:**********') // 地址
    // websocket.binaryType = 'arraybuffer'
    // // 连接成功
    // websocket.onopen = function (evt) {
    //   console.log('onopen', evt)
    //   term.writeln(
    //     '******************************************************************'
    //   )
    // }
    // // 输入
    // term.on('data', function (data) {
    //   console.log('data', data)
    //   websocket.send(new TextEncoder().encode('\x00' + data))
    // })
    // // 返回
    // websocket.onmessage = function (evt) {
    //   let str = new TextDecoder().decode(evt.data)
    //   term.write(str)
    // }
    // // 关闭
    // websocket.onclose = function (evt) {
    //   console.log('close', evt)
    // }
    // // 错误
    // websocket.onerror = function (evt) {
    //   console.log('error', evt)
    // }
    // // 选中 复制
    // term.on('selection', function () {
    //   if (term.hasSelection()) {
    //     this.copy = term.getSelection()
    //   }
    // })
    // term.attachCustomKeyEventHandler(function (ev) {
    //   // 粘贴 ctrl+v
    //   if (ev.keyCode === 86 && ev.ctrlKey) {
    //     websocket.send(new TextEncoder().encode('\x00' + this.copy))
    //   }
    // })
  }
}
</script>
