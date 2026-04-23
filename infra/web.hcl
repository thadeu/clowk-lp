deployment "clowk-lp" "web" {
  replicas = 1

  env = {
    NODE_ENV = "production"
    PORT     = "3000"
    LOG_LEVEL = "debug"
  }
}

ingress "clowk-lp" "web" {
  host = "vd-web.lvh.me"

  tls {
    enabled = true
    provider = "letsencrypt"
    email = "ops@voodu.clowk.in"
  }
}