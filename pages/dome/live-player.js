Page({
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  }
})