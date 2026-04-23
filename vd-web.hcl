deployment "vd-web" {
  path       = "."
  dockerfile = "Dockerfile"

  env = {
    NODE_ENV = "production"
    PORT     = "3000"
  }
}

ingress "vd-web" {
  host    = "vd-web.lvh.me"
  service = "vd-web"
  port = 80
}
