export default function TermsPt() {
  return (
    <main className="min-h-screen bg-[#0C0014]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-4">
        <h1 className="text-[clamp(36px,5vw,52px)] leading-tight tracking-tight font-bold text-white mb-3">Termos de Serviço</h1>
        <p className="text-[#A9A1B6] text-base">Última atualização: 14 de novembro de 2026</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 md:pb-24">
        <div className="prose prose-invert max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#C9C3D4] [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-[#C9C3D4] [&_ul]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_strong]:text-white">

          <h2>1. Aceite dos Termos</h2>
          <p>
            Ao acessar ou usar o Clowk (&quot;o Serviço&quot;), operado pela Clowk (&quot;nós&quot;, &quot;nosso&quot;), você aceita estes Termos de Serviço. Se você não concorda, não use o Serviço.
          </p>

          <h2>2. Descrição do Serviço</h2>
          <p>
            O Clowk auth é um broker de autenticação. Ele cuida dos fluxos de autenticação OAuth entre a sua aplicação e os provedores de identidade (Google, GitHub, X e Apple), e também de e-mail e senha, magic links e TOTP. O Clowk não é um provedor de UI de autenticação: ele faz a autenticação por um fluxo de redirect e devolve um JWT assinado para a sua aplicação.
          </p>
          <p>
            Estes Termos cobrem o Clowk auth em app.clowk.in. Os outros produtos da Clowk têm os próprios termos: ndb e anway estão sob a GNU Affero General Public License, voodu está sob a Elastic License 2.0, cronota tem os próprios termos de serviço, e o 1billion ainda não é público.
          </p>

          <h2>3. Contas</h2>
          <p>
            Para usar o Serviço, você precisa criar uma conta em <strong>app.clowk.in</strong>. Você é responsável por:
          </p>
          <ul>
            <li>Manter seguras as credenciais da sua conta</li>
            <li>Toda atividade feita na sua conta</li>
            <li>Manter seguras as suas chaves publicáveis e secretas</li>
            <li>Nos avisar na hora em <strong>support@clowk.in</strong> se suspeitar de acesso não autorizado</li>
          </ul>

          <h2>4. Planos e Preços</h2>
          <p>
            O Clowk oferece um <strong>plano Free</strong> e um <strong>plano PRO</strong>. O plano Free não tem custo e inclui os recursos principais de autenticação. Nenhum plano tem cobrança por MAU (usuário ativo mensal).
          </p>
          <p>
            Podemos mudar o preço do plano PRO com aviso de 30 dias. O plano Free vai continuar grátis.
          </p>

          <h2>5. Uso Aceitável</h2>
          <p>Você concorda em não:</p>
          <ul>
            <li>Usar o Serviço para qualquer fim ilegal</li>
            <li>Tentar obter acesso não autorizado ao Serviço ou à sua infraestrutura</li>
            <li>Fazer engenharia reversa, descompilar ou desmontar qualquer parte do Serviço</li>
            <li>Transmitir malware, vírus ou código nocivo pelo Serviço</li>
            <li>Usar o Serviço para guardar ou transmitir conteúdo que viole direitos de propriedade intelectual</li>
            <li>Passar de limites de uso razoáveis ou abusar dos endpoints da API</li>
          </ul>

          <h2>6. Dados e Privacidade</h2>
          <p>
            O Clowk trata dados de autenticação (endereços de e-mail, tokens OAuth, perfis de usuário) em nome da sua aplicação. Nós atuamos como operador dos dados. Você continua sendo o controlador dos dados dos seus usuários finais.
          </p>
          <ul>
            <li>Os tokens OAuth são usados só durante o fluxo de autenticação e não ficam guardados por muito tempo</li>
            <li>Os tokens JWT são assinados e devolvidos para a sua aplicação — seu app verifica os tokens por conta própria</li>
            <li>Nós não vendemos, compartilhamos nem monetizamos os dados dos seus usuários</li>
            <li>Você é responsável pela sua própria política de privacidade com os seus usuários finais</li>
          </ul>

          <h2>7. SDKs e Bibliotecas Cliente</h2>
          <p>
            O Clowk oferece SDKs oficiais (<code>@clowk/core</code>, <code>@clowk/react</code>, <code>@clowk/nextjs</code>, <code>@clowk/express</code>, <code>@clowk/hono</code>, <code>@clowk/sdk</code>) sob a Licença MIT. O uso desses SDKs segue os termos das respectivas licenças.
          </p>

          <h2>8. Disponibilidade do Serviço</h2>
          <p>
            Buscamos alta disponibilidade, mas não garantimos 100% de uptime. Não somos responsáveis por quedas, perda de dados ou interrupções do serviço. Vamos fazer esforços razoáveis para avisar sobre manutenções planejadas.
          </p>

          <h2>9. Limitação de Responsabilidade</h2>
          <p>
            Na máxima extensão permitida por lei, a Clowk não será responsável por danos indiretos, incidentais, especiais, consequentes ou punitivos que resultem do seu uso do Serviço, incluindo, entre outros, perda de lucros, de dados ou de oportunidades de negócio.
          </p>

          <h2>10. Encerramento</h2>
          <p>
            Podemos suspender ou encerrar sua conta se você violar estes Termos. Você pode apagar sua conta a qualquer momento. Após o encerramento, seus dados serão apagados em até 30 dias.
          </p>

          <h2>11. Mudanças nos Termos</h2>
          <p>
            Podemos atualizar estes Termos de tempos em tempos. Vamos avisar sobre mudanças relevantes por e-mail ou pelo Serviço. Continuar usando o Serviço após as mudanças significa aceitar os Termos atualizados.
          </p>

          <h2>12. Contato</h2>
          <p>
            Para dúvidas sobre estes Termos, fale com a gente em{" "}
            <a href="mailto:support@clowk.in" className="text-[#F43F5E] hover:underline font-medium">
              support@clowk.in
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
