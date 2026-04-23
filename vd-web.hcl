deployment "vd-web" {
  path       = "."
  dockerfile = "Dockerfile"

  env = {
    NODE_ENV = "production"
    PORT     = "3000"
    LOG_LEVEL = "info"
  }
}

ingress "vd-web" {
  host    = "vd-web.lvh.me"
  service = "vd-web"
  port = 80
}
