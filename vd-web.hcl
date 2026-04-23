deployment "vd-web" {
  path       = "."
  dockerfile = "Dockerfile"
  replicas = 3
  health_check = "/"

  env = {
    NODE_ENV = "production"
    PORT     = "3000"
    LOG_LEVEL = "debug"
  }
}

ingress "vd-web" {
  host    = "vd-web.lvh.me"
  service = "vd-web"

  lb {
    policy = "random"
    interval = "5s"
  }

  tls {
    enabled = true
    provider = "letsencrypt"
    email = "ops@voodu.clowk.in"
  }
}