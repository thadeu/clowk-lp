deployment "vd-web" {
  path       = "."
  dockerfile = "Dockerfile"
  ports      = ["80"]

  env = {
    NODE_ENV = "production"
    PORT     = "3000"
  }
}

ingress "vd-web" {
  host    = "vd-web.lvh.me"
  service = "vd-web"

  tls {
    enabled  = true
    provider = "internal"
  }
}

# deployment "web-0" {
#   image = "nginx:latest"
#   ports = ["3000:80"]
# }

# ingress "web-0" {
#   host    = "web.192.168.105.6.nip.io"
#   service = "web-0"

#   tls {
#     enabled = true
#     provider = "internal"
#   }
# }
