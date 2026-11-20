# Meu Petit Bolinho®

Infraestrutura digital institucional desenvolvida para a marca Meu Petit Bolinho®, integrando branding estratégico, experiência visual premium, posicionamento comercial e base arquitetural preparada para evolução tecnológica futura.

## Visão Geral

O projeto representa a FASE 0 de estruturação digital estratégica da marca, visando:

* consolidação institucional;
* fortalecimento do posicionamento visual;
* ampliação da percepção de valor;
* preparação para escalabilidade operacional;
* construção de base digital modular;
* evolução futura para ecossistemas tecnológicos mais robustos.

A proposta não se limita à criação de um website tradicional.

O objetivo estrutural consiste em transformar a presença digital da marca em uma infraestrutura comunicacional coerente, preparada para futuras integrações comerciais, operacionais e tecnológicas.

---

# Estrutura do Projeto

Versão atual: **V002.0.0 26.11** (exibida no footer; editar em `js/core/config.js`).

```plaintext
/meupetitbolinho
│
├── index.html                 única página na raiz
├── sitemap.xml
│
├── page/                      demais páginas
│   └── cardapio.html          catálogo filtrável + encomenda pelo WhatsApp
│
├── composer/                  elementos comuns (Web Components)
│   ├── mpb-header.js          <mpb-header>  navbar
│   ├── mpb-footer.js          <mpb-footer>  footer + versão
│   ├── mpb-cta.js             <mpb-cta>     chamada de atendimento (#contato)
│   └── mpb-hud.js             <mpb-hud>     atalhos flutuantes (Instagram e Cardápio)
│
├── css/
│   ├── base/                  tokens.css · base.css · animations.css
│   ├── components/            buttons · header · footer · cta · hud · guia · tamanhos
│   └── pages/                 home.css · cardapio.css
│
├── js/
│   ├── core/config.js         marca, contatos, navegação, regras, versão (fonte única)
│   ├── data/cardapio.js       Cardápio 2026: linhas, tamanhos, produtos, adicionais
│   ├── modules/               hero-carousel · faq · manifesto
│   └── pages/                 home.js · cardapio.js
│
├── assets/
│   ├── banners/               abertura, manifesto e imagens de compartilhamento
│   ├── img/                   fotos institucionais
│   ├── logos/                 logo, favicon e ícone (HUD)
│   └── shop/                  fotos dos produtos do cardápio
│
└── docs/                      registros de arquitetura
```

Ordem de carregamento em toda página: `css/base` → `css/components` → `css/pages`;
`js/core/config.js` → `composer/*` → `js/data` → `js/modules` → `js/pages`.
Não há módulos ES nem build: o site abre direto no navegador ou no GitHub Pages.
---

# Direção Estratégica

## Posicionamento

A Meu Petit Bolinho® opera em um território híbrido entre:

* confeitaria premium;
* alimentação afetiva;
* experiência familiar;
* produção artesanal qualificada;
* estética contemporânea;
* alimentação saudável aplicada;
* branding emocional.

O projeto evita:

* aparência artesanal improvisada;
* estética genérica de confeitaria;
* excesso visual infantilizado;
* linguagem visual saturada;
* estética de template.

A arquitetura visual busca transmitir:

* sofisticação leve;
* proximidade humana;
* confiança;
* sensibilidade estética;
* cuidado operacional;
* coerência visual;
* maturidade de marca.

---

# Arquitetura Front-End

## Estrutura Técnica

O projeto foi desenvolvido utilizando:

* HTML5 semântico;
* CSS modular;
* JavaScript puro;
* organização escalável;
* estrutura preparada para componentização futura.

## Características Técnicas

* responsividade completa;
* SEO estrutural;
* Open Graph;
* Twitter Cards;
* arquitetura preparada para React/Next.js;
* modularidade visual;
* governança de assets;
* organização semântica;
* acessibilidade estrutural;
* performance otimizada.

---

# Estratégia Visual

## Identidade UX/UI

A interface foi construída com foco em:

* clareza institucional;
* narrativa emocional equilibrada;
* valorização visual do produto;
* experiência premium;
* legibilidade;
* composição editorial;
* densidade estética controlada.

## Diretrizes Visuais

O projeto utiliza:

* hero sections editoriais;
* grids institucionais;
* composição visual respirada;
* tipografia elegante;
* overlays suaves;
* hierarquia visual limpa;
* elementos geométricos discretos;
* narrativa centrada em experiência humana e produto.

---

# Escalabilidade Futura

A arquitetura foi planejada para futura expansão em:

## Camadas Tecnológicas

* CRM;
* ERP simplificado;
* dashboards operacionais;
* sistema de pedidos;
* automação comercial;
* rastreabilidade produtiva;
* catálogo inteligente;
* integração WhatsApp;
* APIs;
* área administrativa;
* gestão de produção;
* controle financeiro;
* inteligência operacional.

## Evolução Estrutural

Possível migração futura para:

* React;
* Next.js;
* Firebase;
* Supabase;
* Node.js;
* APIs REST;
* arquitetura SaaS modular.

---

# SEO e Performance

## Estrutura SEO

O projeto inclui:

* meta tags completas;
* descrição institucional;
* Open Graph;
* canonical;
* sitemap.xml;
* robots.txt;
* otimização semântica.

## Performance

Diretrizes aplicadas:

* otimização de carregamento;
* redução de peso visual;
* modularidade de assets;
* imagens preparadas para compressão;
* organização escalável de mídia.

---

# Objetivos Estratégicos da FASE 0

A FASE 0 possui como objetivo:

* estruturar presença digital institucional;
* consolidar percepção premium;
* preparar a marca para crescimento;
* construir coerência entre branding e operação;
* gerar autoridade visual;
* criar base para transformação digital futura.

---

# Próximas Etapas Estratégicas

## FASE 1 — Estrutura Comercial

* catálogo inteligente;
* sistema de orçamento;
* integração WhatsApp;
* automação de atendimento;
* CRM inicial.

## FASE 2 — Estrutura Operacional

* gestão de produção;
* rastreabilidade de pedidos;
* controle de insumos;
* dashboards;
* padronização operacional.

## FASE 3 — Escalabilidade

* estrutura SaaS simplificada;
* marketplace próprio;
* sistema de assinatura;
* área do cliente;
* expansão digital.

---

# Branding e Direção Institucional

Desenvolvimento estrutural orientado por:

* branding sistêmico;
* engenharia narrativa aplicada;
* posicionamento institucional;
* arquitetura operacional visual;
* experiência premium;
* transformação digital progressiva.

---

# Licenciamento

Projeto institucional desenvolvido para Meu Petit Bolinho®.

Uso restrito ao ecossistema da marca.

---

# Desenvolvimento Estratégico

Estruturação institucional, direção estratégica e arquitetura digital desenvolvidas sob abordagem integrada entre:

* branding;
* engenharia operacional;
* UX/UI institucional;
* arquitetura front-end;
* transformação digital;
* modelagem de escalabilidade.
