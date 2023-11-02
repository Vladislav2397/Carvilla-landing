const css = [
  'assets/css/font-awesome.min.css',
  'assets/css/linearicons.css',
  'assets/css/flaticon.css',
  'assets/css/animate.css',
  'assets/css/owl.carousel.min.css',
  'assets/css/owl.theme.default.min.css',
  'assets/css/bootstrap.min.css',
  'assets/css/bootsnav.css',
  'assets/css/style.css',
  'assets/css/responsive.css'
]

css.forEach(function (f) {
  const gf = document.createElement('link')
  gf.rel = 'stylesheet'
  gf.href = f
  gf.type = 'text/css'

  const links = document.getElementsByTagName('link')

  const gd = links[links.length - 1]
  gd.parentNode.insertBefore(gf, gd)
})