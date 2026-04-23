deployment "vd-web" {
  path       = "."
  dockerfile = "Dockerfile"

  env = {
    NODE_ENV = "production"
    PORT     = "3000"
    LOG_LEVEL = "debug"
  }
}

ingress "vd2-web" {
  host    = "vd2-web.lvh.me"
  service = "vd-web"

  tls {
    enabled = true
    provider = "letsencrypt"
    email = "ops@voodu.clowk.in"
  }
}
