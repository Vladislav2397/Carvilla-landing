const fonts = [
  'https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap',
  'https://fonts.googleapis.com/css?family=Rufina:400,700&display=swap',
]

fonts.forEach(function (f) {
  const gf = document.createElement('link')
  gf.rel = 'stylesheet'
  gf.href = f
  gf.type = 'text/css'
  const gd = document.getElementsByTagName('link')[0]
  gd.parentNode.insertBefore(gf, gd)
})