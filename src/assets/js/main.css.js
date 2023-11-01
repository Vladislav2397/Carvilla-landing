const css = [
  'assets/css/font-awesome.min.css',
  'assets/css/linearicons.css',
  'assets/css/flaticon.css',
  'assets/css/animate.css',
  'assets/css/owl.carousel.min.css',
  'assets/css/owl.theme.default.min.css',
]

fonts.forEach(function (f) {
  const gf = document.createElement('link')
  gf.rel = 'stylesheet'
  gf.href = f
  gf.type = 'text/css'
  const gd = document.getElementsByTagName('link')[0]
  gd.parentNode.insertBefore(gf, gd)
})