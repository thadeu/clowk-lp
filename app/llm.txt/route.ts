export function GET() {
  const content = `# Clowk — Authentication Broker

> llm.txt for AI agents, LLMs, and developer tools.
> Learn more about llm.txt at https://llmstxt.org

## What is Clowk?

Clowk is an **authentication broker** — not an authentication UI provider.

Most auth solutions (Clerk, Auth0, Firebase Auth) own the sign-in UI: they render forms, inputs, and social buttons inside your app. Your users interact with someone else's frontend, embedded in yours.

Clowk takes a different approach. It **brokers the authentication** between your app and OAuth providers (Google, GitHub, Twitter) through a redirect flow:

\`\`\`
Your App → Clowk (handles OAuth) → Your App (receives signed JWT)
\`\`\`

## Why this matters

- **No embedded UI to maintain** — Clowk handles the entire auth flow on its own domain (*.clowk.dev). Your app just redirects and receives a JWT back.
- **OAuth requires redirects anyway** — Google, GitHub, and Twitter will redirect the user regardless. Embedding a UI doesn't eliminate the redirect, it just adds an intermediary.
- **Security by isolation** — credentials and OAuth tokens never touch your app's DOM. The auth flow happens entirely on the Clowk domain.
- **Zero frontend lock-in** — no Clerk Elements, no Auth0 Lock, no custom widgets to style or break on upgrades. Your app controls its own buttons and pages.

## Pricing

- **Free plan** — everything you need to ship auth. Free forever.
- **PRO plan** — advanced features for teams.
- **No per-MAU billing** — ever.

## Auth Flow

1. User clicks a sign-in button in your app (e.g. \`<SignInButton />\`)
2. Browser redirects to \`https://{subdomain}.clowk.dev/sign-in\`
3. User authenticates (OAuth or email/password)
4. Clowk redirects back to your app with \`?token=eyJ...\`
5. Your app captures the JWT, verifies it, and has the user

No embedded forms. No iframes. No third-party UI in your DOM.

## SDKs

All packages are published on npm. The architecture:

\`\`\`
@clowk/core            ← JWT verification, HTTP client, SDK resources
   ├── @clowk/sdk       ← Re-export for direct consumption
   ├── @clowk/react     ← Redirect buttons, auth provider, hooks
   ├── @clowk/express   ← Express middleware
   ├── @clowk/hono      ← Hono middleware
   └── @clowk/nextjs    ← Next.js middleware + auth() + React re-exports
\`\`\`

All packages depend on \`@clowk/core\` for token verification. Framework packages are thin wrappers.

## Configuration

Every integration needs at minimum:

| Key              | Where            | Description                                              |
|------------------|------------------|----------------------------------------------------------|
| \`publishableKey\` | Frontend (pk_...)| Identifies the Clowk instance, safe to expose            |
| \`secretKey\`      | Backend (sk_...) | Used to verify JWT signatures, never expose to the client|

## SDK Examples

### React — @clowk/react

Install: \`npm install @clowk/react\`

\`\`\`tsx
import { ClowkProvider, SignInButton, useAuth } from '@clowk/react'

function App() {
  return (
    <ClowkProvider publishableKey="pk_live_...">
      <AuthContent />
    </ClowkProvider>
  )
}

function AuthContent() {
  const { user, signedIn, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!signedIn) return <SignInButton />

  return <div>Welcome, {user?.email}</div>
}
\`\`\`

Components: \`<ClowkProvider>\`, \`<SignInButton>\`, \`<SignUpButton>\`, \`<SignOutButton>\`
Hooks: \`useAuth()\`, \`useClowk()\`, \`useToken()\`

### Next.js — @clowk/nextjs

Install: \`npm install @clowk/nextjs\`

\`\`\`typescript
// middleware.ts — protect routes
import { clowkMiddleware } from '@clowk/nextjs'

export default clowkMiddleware()

export const config = {
  matcher: ['/((?!_next|.*\\\\..*).*)'],
}
\`\`\`

\`\`\`typescript
// app/dashboard/page.tsx — access user in Server Components
import { currentUser } from '@clowk/nextjs/server'

export default async function Dashboard() {
  const user = await currentUser()

  return (
    <div>
      <h1>Hello, {user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
\`\`\`

### Express — @clowk/express

Install: \`npm install @clowk/express\`

\`\`\`javascript
import express from 'express'
import { configure } from '@clowk/core'
import { ClowkExpressMiddleware } from '@clowk/express'

configure({
  publishableKey: process.env.CLOWK_PUBLISHABLE_KEY,
  secretKey: process.env.CLOWK_SECRET_KEY,
})

const app = express()

app.use(ClowkExpressMiddleware())

app.get('/dashboard', (req, res) => {
  const user = req.clowk.user
  res.json({ message: \`Hello, \${user.name}\` })
})
\`\`\`

### Hono — @clowk/hono

Install: \`npm install @clowk/hono\`

\`\`\`typescript
import { Hono } from 'hono'
import { configure } from '@clowk/core'
import { clowkAuth } from '@clowk/hono'

configure({
  publishableKey: process.env.CLOWK_PUBLISHABLE_KEY,
  secretKey: process.env.CLOWK_SECRET_KEY,
})

const app = new Hono()

// Works on Workers, Bun, Deno, Node.js
app.use('*', clowkAuth())

app.get('/me', (c) => {
  const user = c.get('clowkUser')
  return c.json({ user })
})

export default app
\`\`\`

### Ruby on Rails — gem clowk

Install: \`bundle add clowk\` or add \`gem 'clowk'\` to your Gemfile.

Clowk was built with Rails developers in mind. If you're coming from Devise, Rodauth, or rolling your own auth — Clowk replaces all of that with a broker model: no models, no migrations, no password columns in your database.

#### Setup (3 files, 5 minutes)

\`\`\`ruby
# Gemfile
gem 'clowk'
\`\`\`

\`\`\`ruby
# config/initializers/clowk.rb
Clowk.configure do |config|
  config.publishable_key = ENV['CLOWK_PUBLISHABLE_KEY']
  config.secret_key      = ENV['CLOWK_SECRET_KEY']
end
\`\`\`

\`\`\`ruby
# config/routes.rb
Rails.application.routes.draw do
  mount Clowk::Engine => '/clowk'
end
\`\`\`

That's it. No User model, no migration, no has_secure_password.

#### Protecting controllers

\`\`\`ruby
# app/controllers/dashboard_controller.rb
class DashboardController < ApplicationController
  before_action :authenticate_clowk!

  def index
    @user = current_clowk
    # => { id: 'usr_...', email: 'user@example.com',
    #      name: 'Alice', provider: 'google' }
  end
end
\`\`\`

\`authenticate_clowk!\` verifies the JWT from the session cookie. If invalid, it redirects to the Clowk sign-in page. \`current_clowk\` returns the decoded user hash.

#### Protecting specific actions

\`\`\`ruby
class PostsController < ApplicationController
  before_action :authenticate_clowk!, only: [:create, :update, :destroy]

  def index
    @posts = Post.all
  end

  def create
    @post = Post.create!(
      title: params[:title],
      author_email: current_clowk[:email],
      author_id: current_clowk[:id]
    )

    redirect_to @post
  end
end
\`\`\`

#### API-only controllers (JSON)

\`\`\`ruby
class Api::V1::BaseController < ActionController::API
  before_action :authenticate_clowk!

  private

  def current_user_id
    current_clowk[:id]
  end
end

class Api::V1::ProfileController < Api::V1::BaseController
  def show
    render json: { user: current_clowk }
  end
end
\`\`\`

#### Works with Hotwire & Turbo

Clowk works with standard Rails redirect flows. No special Turbo configuration needed — the OAuth redirect happens before your app loads, so Turbo Frames and Turbo Streams work as expected.

\`\`\`erb
<%# app/views/layouts/application.html.erb %>
<nav>
  <% if current_clowk %>
    <span>Hello, <%= current_clowk[:name] %></span>
    <%= link_to "Sign out", clowk.sign_out_path, data: { turbo_method: :delete } %>
  <% else %>
    <%= link_to "Sign in", clowk.sign_in_path %>
    <%= link_to "Sign up", clowk.sign_up_path %>
  <% end %>
</nav>
\`\`\`

#### Multi-tenancy in Rails

\`\`\`ruby
# Each Clowk "instance" maps to one of your apps.
# The publishable_key determines which instance is used.
# Users are scoped per instance — not shared globally.

# If you have multiple apps, configure per-environment:
# config/initializers/clowk.rb
Clowk.configure do |config|
  config.publishable_key = ENV['CLOWK_PUBLISHABLE_KEY']
  config.secret_key      = ENV['CLOWK_SECRET_KEY']
end
\`\`\`

#### Why Rails developers choose Clowk over alternatives

| Feature              | Devise          | Rodauth         | Clowk            |
|----------------------|-----------------|-----------------|------------------|
| Migrations needed    | Yes (users)     | Yes (accounts)  | None             |
| Password storage     | In your DB      | In your DB      | Handled by Clowk |
| OAuth setup          | OmniAuth gems   | rodauth-oauth   | Built-in         |
| Multi-tenancy        | Manual          | Manual          | Built-in         |
| JWT verification     | N/A             | N/A             | Built-in (HS256) |
| Frontend lock-in     | No              | No              | No               |
| Per-MAU billing      | N/A             | N/A             | Never            |
| Setup time           | 30+ min         | 30+ min         | 5 min            |

### @clowk/core — Runtime-agnostic

Install: \`npm install @clowk/core\`

Used directly when you need low-level access or are on a runtime without a dedicated SDK:

\`\`\`typescript
import { configure, verifyToken } from '@clowk/core'

configure({
  publishableKey: 'pk_live_...',
  secretKey: 'sk_live_...',
})

// Verify a JWT from any source
const user = await verifyToken(token)
// => { id, email, name, provider, iat, exp }
\`\`\`

## Links

- Website: https://clowk.in
- Dashboard: https://app.clowk.in
- Documentation: https://docs.clowk.in
- Support: support@clowk.in
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
