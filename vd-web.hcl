deployment "vd-web" {
  path       = "."
  dockerfile = "Dockerfile"

  env = {
    NODE_ENV = "production"
    PORT     = "3000"
    LOG_LEVEL = "debug"
  }
}

ingress "vd-web" {
  host    = "vd-web.lvh.me"
  service = "vd-web"

  tls {
    enabled = true
    provider = "letsencrypt"
    email = "ops@voodu.clowk.in"
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
