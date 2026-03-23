'use client';

import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SiRubyonrails, SiReact, SiNextdotjs, SiExpress, SiHono } from 'react-icons/si';

const tabs = [
  { id: 'ruby', label: 'Rails', icon: SiRubyonrails, color: '#CC0000', lang: 'ruby' },
  { id: 'react', label: 'React', icon: SiReact, color: '#61DAFB', lang: 'tsx' },
  { id: 'nextjs', label: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', lang: 'typescript' },
  { id: 'express', label: 'Express', icon: SiExpress, color: '#FFFFFF', lang: 'javascript' },
  { id: 'hono', label: 'Hono', icon: SiHono, color: '#E36002', lang: 'typescript' },
];

const code: Record<string, string> = {
  react: `import { ClowkProvider, SignInButton, useAuth } from '@clowk/react'

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
}`,

  ruby: `# Gemfile
gem 'clowk'

# config/initializers/clowk.rb
Clowk.configure do |config|
  config.publishable_key = ENV['CLOWK_PUBLISHABLE_KEY']
  config.secret_key      = ENV['CLOWK_SECRET_KEY']
end

# config/routes.rb
Rails.application.routes.draw do
  mount Clowk::Engine => '/clowk'
end

# app/controllers/dashboard_controller.rb
class DashboardController < ApplicationController
  before_action :authenticate_clowk!

  def index
    @user = current_clowk
    # => { id: 'usr_...', email: 'user@example.com',
    #       name: 'Alice', provider: 'google' }
  end
end`,

  nextjs: `// middleware.ts
import { clowkMiddleware } from '@clowk/nextjs'

export default clowkMiddleware()

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}

// app/dashboard/page.tsx
import { currentUser } from '@clowk/nextjs/server'

export default async function Dashboard() {
  const user = await currentUser()

  return (
    <div>
      <h1>Hello, {user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}`,

  express: `import express from 'express'
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
})`,

  hono: `import { Hono } from 'hono'
import { configure } from '@clowk/core'
import { clowkAuth } from '@clowk/hono'

configure({
  publishableKey: process.env.CLOWK_PUBLISHABLE_KEY,
  secretKey: process.env.CLOWK_SECRET_KEY,
})

const app = new Hono()

app.use('*', clowkAuth())

app.get('/me', (c) => {
  const user = c.get('clowkUser')
  return c.json({ user })
})

export default app`,
};

export default function CodeExample() {
  const [active, setActive] = useState('ruby');

  return (
    <section className="py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#F43F5E] tracking-widest uppercase mb-3">Integrate in minutes</p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] leading-tight mb-4">
            From zero to auth in 5 lines
          </h2>
          <p className="text-[#71717A] text-lg max-w-xl mx-auto">
            Works with your existing stack. No new abstractions to learn.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#E4E4E7] shadow-xl shadow-black/5">
          <div className="bg-[#1C1C1E] px-4 py-3 flex items-center gap-2">
            <div className="hidden sm:flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex gap-0.5 bg-[#2C2C2E] rounded-lg p-0.5">
                {tabs.map(tab => {
                  const Icon = tab.icon;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActive(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        active === tab.id ? 'bg-[#F43F5E] text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                      }`}
                      title={tab.label}
                    >
                      <Icon className="w-4 h-4 shrink-0" style={active !== tab.id ? { color: tab.color } : undefined} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-[#282C34] overflow-x-auto">
            <SyntaxHighlighter
              language={tabs.find(t => t.id === active)?.lang ?? 'ruby'}
              style={atomOneDark}
              customStyle={{
                background: 'transparent',
                padding: '1.5rem',
                margin: 0,
                fontSize: '0.875rem',
                lineHeight: '1.7',
              }}
              showLineNumbers={false}
            >
              {code[active]}
            </SyntaxHighlighter>
          </div>
        </div>

        <p className="text-center text-sm text-[#71717A] mt-6">
          Need more detail?{' '}
          <a href="https://docs.clowk.in" className="text-[#F43F5E] font-medium hover:underline">
            Read the docs →
          </a>
        </p>
      </div>
    </section>
  );
}
