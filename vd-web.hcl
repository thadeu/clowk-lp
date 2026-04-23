deployment "clowk-lp" "web" {
  replicas = 3

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

ingress "clowk-lp" "web2" {
  host = "vd2-web.lvh.me"
  service = "web"

  tls {
    enabled = true
    provider = "letsencrypt"
    email = "ops@voodu.clowk.in"
  }
}