deployment "web-0" {
  path       = "."
  lang       = "nodejs"       # opcional: auto-detecta via package.json
  dockerfile = "Dockerfile"   # opcional: default é ./Dockerfile
  ports      = ["3000:80"]

  env = {
    NODE_ENV = "production"
    PORT     = "3000"
  }

  # post_deploy = [
  #   "npm run migrate"  # opcional, roda depois do container subir
  # ]
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
