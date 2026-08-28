/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  Play, 
  Star, 
  Shield, 
  Clock, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Zap, 
  Lock, 
  CreditCard,
  User,
  ArrowUpRight,
  Info,
  ShoppingBag,
  Gift,
  Heart,
  Palette,
  DollarSign,
  Smartphone,
  Calculator,
  Bot,
  Sparkles,
  ListChecks,
  MessageSquare,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Artisanal Components ---

const handleRedirect = (url: string) => {
  if (!url || url === '#') {
    return;
  }
  
  if (url.startsWith('#')) {
    const element = document.querySelector(url);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  const search = window.location.search;
  if (search) {
    const separator = url.includes('?') ? '&' : '?';
    window.location.href = url + separator + search.substring(1);
  } else {
    window.location.href = url;
  }
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#3A1F1A]/95 backdrop-blur-sm border-b border-[#5A2D25] shadow-md">
    <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-black text-xl tracking-tight uppercase text-white">Brigadeiro<span className="text-[#C93F5C]"> Lucrativo</span></span>
      </div>
      <button 
        onClick={() => handleRedirect('#pricing')}
        className="bg-[#C93F5C] hover:bg-[#A92F49] text-white font-bold text-[10px] py-2 px-5 rounded-full uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
      >
        Acessar
      </button>
    </div>
  </nav>
);
const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const startPlaying = () => {
    setIsPlaying(true);
    // Tell Vimeo player to start playing instantly using official API commands (supports both object and string format)
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.postMessage(JSON.stringify({ method: 'play' }), '*');
        iframeRef.current.contentWindow?.postMessage('{"method":"play"}', '*');
      } catch (e) {
        console.error("Vimeo postMessage command failed:", e);
      }
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event && event.origin && typeof event.origin === 'string' && event.origin.includes('vimeo.com')) {
        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          
          if (data) {
            // Register for the finish event once player is ready
            if (data.event === 'ready') {
              iframeRef.current?.contentWindow?.postMessage(
                JSON.stringify({ method: 'addEventListener', value: 'finish' }), 
                '*'
              );
            }
            
            // If the video ends (finishes), return to thumbnail state and pause player
            if (data.event === 'finish' || data.event === 'ended') {
              setIsPlaying(false);
              try {
                iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ method: 'pause' }), '*');
                iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ method: 'setCurrentTime', value: 0 }), '*');
              } catch (err) {
                // Ignore iframe reference issues
              }
            }
          }
        } catch (e) {
          // ignore parsing error
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section className="pt-20 md:pt-24 pb-12 md:pb-16 bg-[#3A1F1A] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block bg-[#C93F5C]/20 text-[#F3E1D5] border border-[#C93F5C]/40 px-6 py-2 rounded-2xl text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
          OPORTUNIDADE ÚNICA DE<br />RENDA EXTRA NA CONFEITARIA
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold leading-tight md:leading-[1.15] tracking-tight mb-4 md:mb-5 text-white">
          Ganhe até <span className="text-[#C98A3D] font-black">R$ 500 por semana</span> vendendo brigadeiros gourmet deliciosos — mesmo começando do zero.
        </h1>
        
        <p className="text-[#F3E1D5]/90 text-xs md:text-base font-medium max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
          Assista ao vídeo abaixo e descubra como o aplicativo mostra quais receitas de brigadeiros preparar, quanto cobrar e como você pode ter um negócio lucrativo.
        </p>

        <div 
          className="relative aspect-[9/16] max-w-[320px] mx-auto bg-[#5A2D25] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#5A2D25] group cursor-pointer"
          onClick={startPlaying}
        >
          {/* Pre-buffered Vimeo player embedded in the DOM from page load without loop */}
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/1203818546?h=0&badge=0&autopause=0&player_id=0&app_id=58479&api=1&loop=0&title=0&byline=0&portrait=0"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Mini VSL"
            loading="eager"
          ></iframe>

          {/* Transparent Cover Overlay: sits over the preloaded player and fades out on-click */}
          <div 
            className={`absolute inset-0 transition-all duration-500 bg-black/10 flex flex-col items-center justify-center gap-4 ${
              isPlaying ? "opacity-0 pointer-events-none" : "opacity-100 z-10"
            }`}
          >
            <div className="w-16 h-16 bg-[#C93F5C] hover:bg-[#A92F49] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Play className="fill-current w-6 h-6 ml-1" />
            </div>
            <div className="bg-[#C93F5C] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md uppercase tracking-wider">
              Clique para assistir
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

const HowItWorks = () => (
  <section className="pt-16 pb-24 bg-[#F3E1D5]">
    <div className="max-w-6xl mx-auto px-6">
      <div className="mb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-[#3A1F1A] uppercase">COMECE A VENDER BRIGADEIROS EM 3 PASSOS SIMPLES</h2>
        <div className="w-16 h-1.5 bg-[#C93F5C] mx-auto rounded-full" />
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { 
            step: "01", 
            title: "🍫 ESCOLHA UMA RECEITA CAMPEÃ", 
            desc: "Abra o aplicativo e escolha sabores que já vendem bem, como Brigadeiro Tradicional, Ninho com Nutella, Pistache, Belga e Dois Amores.\n\nCada receita já mostra os ingredientes, o rendimento e a lista de compras.", 
            icon: Smartphone,
            color: "#C93F5C"
          },
          { 
            step: "02", 
            title: "💰 CONTROLE CUSTOS E PREÇOS", 
            desc: "O aplicativo ajuda você a calcular o custo dos ingredientes e da embalagem, além de sugerir um preço de venda.\n\nAssim, você entende quanto cobrar e quanto pode lucrar.", 
            icon: Calculator,
            color: "#C98A3D"
          },
          { 
            step: "03", 
            title: "📢 DIVULGUE E VENDA TODOS OS DIAS", 
            desc: "O app gera textos e chamadas prontas para você divulgar no WhatsApp e no Instagram.\n\nVocê posta, recebe os pedidos e começa a vender com mais facilidade.", 
            icon: ArrowUpRight,
            color: "#C93F5C"
          },
        ].map((item, i) => (
          <div key={i} className="group p-8 bg-[#FFFFFF] rounded-3xl border border-[#5A2D25]/15 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors" style={{ backgroundColor: `${item.color}15` }}>
              <item.icon className="w-6 h-6 transition-colors" style={{ color: item.color }} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-[#3A1F1A]">{item.title}</h3>
            <p className="text-[#211412] text-sm leading-relaxed whitespace-pre-line">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AppTechnology = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let hasScrolled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasScrolled) {
            hasScrolled = true;
            // Delay slightly so the user sees the carousel fully in view before it slides
            setTimeout(() => {
              if (container) {
                const clientWidth = container.clientWidth;
                container.scrollTo({ left: clientWidth, behavior: 'smooth' });
              }
            }, 800);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12 md:mb-16 text-center">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 text-[#3A1F1A] leading-tight uppercase">
              TUDO O QUE VOCÊ PRECISA PARA COMEÇAR ESTÁ DENTRO DO APP
            </h2>
            <div className="w-16 h-1.5 bg-[#C93F5C] mx-auto rounded-full mb-6" />
            <p className="text-[#211412] text-sm md:text-base leading-relaxed">
              Receitas, cálculo de preços, simulador de ganhos, textos para divulgar e outras ferramentas pensadas para quem quer começar com mais clareza.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-[300px] md:max-w-[320px] mx-auto relative group px-4">
        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#F3E1D5] shadow-md flex items-center justify-center text-[#3A1F1A] hover:bg-[#C93F5C] hover:text-white transition-all duration-300 border border-[#5A2D25]/15 cursor-pointer"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#F3E1D5] shadow-md flex items-center justify-center text-[#3A1F1A] hover:bg-[#C93F5C] hover:text-white transition-all duration-300 border border-[#5A2D25]/15 cursor-pointer"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-4 md:pb-12 scrollbar-hide snap-x snap-mandatory"
        >
          {[
            "https://i.postimg.cc/qRfYPLdB/Whats-App-Image-2026-06-23-at-16-24-20.webp",
            "https://i.postimg.cc/Ss05Brpn/Whats-App-Image-2026-06-23-at-16-24-21.webp",
            "https://i.postimg.cc/V6yTxRcN/Whats-App-Image-2026-06-23-at-16-24-21-(1).webp",
            "https://i.postimg.cc/ZRkgGch0/Whats-App-Image-2026-06-23-at-16-24-21-(2).webp",
            "https://i.postimg.cc/DZVD9gKZ/Whats-App-Image-2026-06-23-at-16-24-21-(3).webp",
            "https://i.postimg.cc/PxGcg4kJ/Whats-App-Image-2026-06-23-at-16-24-21-(4).webp",
            "https://i.postimg.cc/Y9cV53wh/Whats-App-Image-2026-06-23-at-16-24-21-(5).webp",
            "https://i.postimg.cc/KzXV6NyP/Whats-App-Image-2026-06-23-at-16-24-22.webp",
            "https://i.postimg.cc/pTN7wZth/Whats-App-Image-2026-06-23-at-16-24-22-(1).webp",
            "https://i.postimg.cc/9M3S6pjw/Whats-App-Image-2026-06-23-at-16-24-22-(2).webp",
            "https://i.postimg.cc/50cGh3MC/Whats-App-Image-2026-06-23-at-16-24-22-(3).webp",
            "https://i.postimg.cc/qRfYPLdy/Whats-App-Image-2026-06-23-at-16-24-22-(5).webp",
            "https://i.postimg.cc/rm6bBJL5/Whats-App-Image-2026-06-23-at-16-24-22-(6).webp",
            "https://i.postimg.cc/d1MXbBK9/Whats-App-Image-2026-06-23-at-16-24-23.webp",
            "https://i.postimg.cc/mDxqvwG3/Whats-App-Image-2026-06-23-at-16-24-23-(1).webp",
            "https://i.postimg.cc/pTN7wZtY/Whats-App-Image-2026-06-23-at-16-24-23-(2).webp",
            "https://i.postimg.cc/NM1VBHg2/Whats-App-Image-2026-06-23-at-16-24-23-(3).webp"
          ].map((url, i) => (
            <div key={i} className="w-full flex-shrink-0 aspect-[9/16] bg-[#F3E1D5] rounded-2xl overflow-hidden border border-[#5A2D25]/15 snap-center shadow-lg">
              <img 
                src={url} 
                alt={`App Screen ${i + 1}`} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 md:mt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { 
              title: "💼 COMECE COM R$ 50", 
              desc: "Comece com pouco investimento, usando utensílios que você já tem em casa.", 
              icon: DollarSign,
              color: "#C98A3D"
            },
            { 
              title: "⚡ BRIGADEIROS SEM FOGO", 
              desc: "Receitas práticas e rápidas para preparar brigadeiros sem precisar levar ao fogo, economizando tempo e facilitando a produção no dia a dia.", 
              icon: Zap,
              color: "#C93F5C"
            },
            { 
              title: "🍫 RECEITAS QUE MAIS VENDEM", 
              desc: "Acesse sabores prontos para começar, com ingredientes, modo de preparo, rendimento e lista de compras.", 
              icon: Sparkles,
              color: "#C98A3D"
            },
            { 
              title: "💰 QUANTO COBRAR", 
              desc: "Descubra quanto cobrar antes de fazer os brigadeiros, mantendo sempre seu lucro garantido, uma calculadora feita para confeiteiras e para garantir que sempre vai lucrar.", 
              icon: Calculator,
              color: "#C93F5C"
            },
            { 
              title: "📱 TEXTOS PARA VENDER", 
              desc: "Mensagens prontas para divulgar seus brigadeiros no WhatsApp, Instagram e status, sem ficar travada pensando no que escrever.", 
              icon: Smartphone,
              color: "#C98A3D"
            },
            { 
              title: "✨ PONTO PERFEITO SEM ERRO", 
              desc: "Receitas práticas para preparar de forma simples, acertando o ponto de enrolar e de bico sem queimar e sem perder insumos.", 
              icon: CheckCircle,
              color: "#C93F5C"
            },
            { 
              title: "🎯 SIMULADOR DE META", 
              desc: "Defina quanto deseja ganhar e veja uma estimativa de quantos brigadeiros ou caixas precisa vender.", 
              icon: ArrowUpRight,
              color: "#C98A3D"
            },
            { 
              title: "🛵 ENTREGAS COM SEGURANÇA", 
              desc: "Aprenda cuidados simples para armazenar, transportar e entregar seus brigadeiros com mais organização.", 
              icon: Shield,
              color: "#C93F5C"
            },
            { 
              title: "🛒 ONDE COMPRAR BARATO", 
              desc: "Tenha uma lista com lugares e ideias para comprar embalagens, ingredientes e materiais gastando menos.", 
              icon: ShoppingBag,
              color: "#C98A3D"
            },
          ].map((f, i) => (
            <div 
              key={i} 
              className="p-8 bg-[#F3E1D5] rounded-3xl border border-[#5A2D25]/15 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${f.color}20` }}>
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h4 className="font-bold text-[#3A1F1A] text-lg mb-3 leading-tight">{f.title}</h4>
              <p className="text-[#211412] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-24 bg-[#F3E1D5]">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#3A1F1A] tracking-tight mb-2">
          O QUE ELAS ESTÃO DIZENDO
        </h2>
        <span className="text-[#C93F5C] text-[10px] font-bold tracking-[0.2em] uppercase mb-8 block">
          RESULTADOS REAIS
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { 
            name: "CARLA SOUZA", 
            role: "Doceira Gourmet",
            image: "https://i.postimg.cc/dVXGbZmW/image_13_229x300_(1).webp",
            text: "Eu sempre quis vender brigadeiros gourmet, mas não sabia por onde começar na cozinha. O aplicativo me deu receitas fáceis com lista exata e me ensinou a pôr o preço ideal. Fiz minhas primeiras vendas em tempo recorde!" 
          },
          { 
            name: "RENATA OLIVEIRA", 
            role: "Confeiteira Gourmet",
            image: "https://i.postimg.cc/fRFYGSj8/image_14_300x300_(1).webp",
            text: "O que mais amei no app foi a calculadora rápida de brigadeiros e caixas. Isso me deu muita segurança para iniciar sem desperdício de insumos. Vendi mais de 120 brigadeiros no primeiro final de semana!" 
          },
          { 
            name: "ANA PAULA LIMA", 
            role: "Mãe e Doceira",
            image: "https://i.postimg.cc/CKqbSMmc/image_15_300x300_(1)_(1).webp",
            text: "Tinha medo de perder dinheiro com ingredientes caros. O app ajudou a controlar o custo por receita e forneceu as copys de divulgação prontas. Hoje recebo encomendas fixas toda sexta-feira!" 
          },
          { 
            name: "JULIANA FERREIRA", 
            role: "Dona de Doçaria",
            image: "https://i.postimg.cc/YSWQM2bb/image_16_281x300_(1)_(1).webp",
            text: "Para quem está começando do zero é maravilhoso. Ele descomplicou onde poupar em fardos de leite condensado, como embalar e como atrair os primeiros clientes sem parecer chata." 
          },
        ].map((t, i) => (
          <div key={i} className="p-8 bg-[#FFFFFF] rounded-2xl border border-[#5A2D25]/15 hover:border-[#C93F5C]/40 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C98A3D] text-[#C98A3D]" />
              ))}
            </div>
            <p className="text-[#211412] text-sm leading-relaxed mb-8 italic">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C93F5C]/30 shrink-0">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-bold text-[#3A1F1A] text-xs tracking-wider mb-1 uppercase">{t.name}</p>
                <p className="text-[#C93F5C] text-[10px] font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Results = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#3A1F1A] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
            O RESULTADO QUE VOCÊ VAI ENTREGAR
          </h2>
          <span className="text-[#C98A3D] text-[10px] font-bold tracking-[0.2em] uppercase mb-8 block">
            BRIGADEIROS QUE GERAM DESEJO IMEDIATO
          </span>
          <p className="text-[#F3E1D5]/90 text-sm max-w-xl mx-auto mb-8">
            Sabores, pontos e confeitos de brigadeiros gourmet profissionais e irresistíveis que você vai aprender a fazer mesmo que nunca tenha feito doces na vida.
          </p>
        </div>
        
        <div className="relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#5A2D25] shadow-md flex items-center justify-center text-white hover:bg-[#C93F5C] transition-all duration-300 border border-[#C98A3D]/30 cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#5A2D25] shadow-md flex items-center justify-center text-white hover:bg-[#C93F5C] transition-all duration-300 border border-[#C98A3D]/30 cursor-pointer"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
          >
            {[
              "https://i.postimg.cc/rp7gdFhv/223b6ea87913fc844141fd4857943d35.webp",
              "https://i.postimg.cc/0NhZ62WR/53d1e5045687253625690fb04f5174b6.webp",
              "https://i.postimg.cc/s2bKBDn8/5c53c3f17c5ba07458b11c4f9460b26d.webp",
              "https://i.postimg.cc/vmCX1Hqd/616feacb9ce31a637c00819ecb12c167.webp",
              "https://i.postimg.cc/nLNTscRx/82107315cb6c54e5a2214782259f8162.webp",
              "https://i.postimg.cc/cJPTK490/a1fcf82e6835086725b475604a6887eb.webp",
              "https://i.postimg.cc/fb153T2w/c41806efb28fd408c8727a2d0478ad8a.webp",
              "https://i.postimg.cc/j5Ncy09p/e3a532b93ebb6133cbb254e7c7d14f85.webp",
              "https://i.postimg.cc/cHYhfyjV/feb9465a437360209269ea829f6fc1f7.webp"
            ].map((url, i) => (
              <div key={i} className="min-w-[260px] md:min-w-[300px] aspect-[9/16] bg-[#5A2D25] rounded-2xl overflow-hidden snap-center shadow-xl border border-[#C98A3D]/25">
                <img 
                  src={url} 
                  alt={`Brigadeiro Gourmet Exemplo ${i + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WhatYouGet = () => (
  <section className="py-24 bg-[#FFFFFF] overflow-hidden relative">
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight text-[#3A1F1A]">
          PREPARAR É FÁCIL.<br />
          <span className="text-[#C93F5C]">AGORA APRENDA A VENDER.</span>
        </h2>
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-[1px] w-8 bg-[#5A2D25]/20" />
          <span className="text-[#C93F5C] text-[10px] font-black tracking-[0.3em] uppercase">
            🎁 BÔNUS EXCLUSIVOS
          </span>
          <div className="h-[1px] w-8 bg-[#5A2D25]/20" />
        </div>
        <p className="text-[#211412] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Além do acesso vitalício ao aplicativo, você garante estes bônus especiais para acelerar e turbinar o faturamento da sua confeitaria.
        </p>
      </div>

      <div className="space-y-16">
        {/* Bonus 1 - Super Bonus */}
        <div className="group relative">
          <div className="relative bg-[#F3E1D5] p-8 md:p-12 rounded-[2.5rem] border-2 border-[#5A2D25]/15 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-500">
            <div className="flex flex-col items-center text-center gap-8">
              <div className="flex-1 w-full">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="bg-[#C93F5C] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    BÔNUS 01
                  </span>
                  <span className="text-[#5A2D25] text-[9px] font-black uppercase tracking-widest">
                    🔥 SUPER BÔNUS
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight text-[#3A1F1A] uppercase">
                  COMO TER CLIENTES<br />FIÉIS TODA SEMANA
                </h3>
                
                <p className="text-[#211412] text-sm md:text-base mb-8 leading-relaxed max-w-xl mx-auto">
                  Vender uma vez é bom. Mas fazer a mesma pessoa comprar de novo é o que deixa sua renda muito mais previsível.<br /><br />
                  Aqui você aprende como transformar clientes comuns em clientes que lembram de você sempre que querem um doce.
                </p>

                <div className="flex flex-col gap-4 mb-8 max-w-md mx-auto">
                  {[
                    "Como ter uma cartela de clientes fieis que compram toda semana de você",
                    "Como atender bem para a cliente querer comprar de novo",
                    "Como usar WhatsApp e status para manter seus brigadeiros sempre na mente das pessoas",
                    "Como criar combos e ofertas para aumentar os pedidos",
                    "Mensagens prontas para chamar clientes antigos sem parecer insistente"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#FFFFFF] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3 h-3 text-[#C93F5C]" />
                      </div>
                      <p className="text-[#211412] text-xs md:text-sm text-left">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FFFFFF] rounded-xl border border-[#5A2D25]/15 shadow-xs">
                  <span className="text-[#211412]/50 text-[10px] line-through uppercase tracking-widest">Valor: R$ 197,00</span>
                  <span className="text-[#C98A3D] text-[10px] font-black uppercase tracking-widest animate-pulse">Hoje: Grátis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus 2 */}
        <div className="group relative">
          <div className="relative bg-[#F3E1D5] p-8 md:p-12 rounded-[2.5rem] border-2 border-[#5A2D25]/15 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-500">
            <div className="flex flex-col items-center text-center gap-8">
              <div className="flex-1 w-full">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="bg-[#C93F5C] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    BÔNUS 02
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight text-[#3A1F1A]">
                  FATURANDO SEUS PRIMEIROS R$ 500<br />COM BRIGADEIROS ESTA SEMANA
                </h3>
                
                <p className="text-[#211412] text-sm md:text-base mb-8 leading-relaxed max-w-xl mx-auto">
                  Um guia prático focado em retorno rápido e faturamento urgente utilizando ingredientes acessíveis de supermercado comum.
                </p>

                <div className="flex flex-col gap-5 mb-8 max-w-md mx-auto">
                  {[
                    "Quais os sabores de brigadeiros mais lucrativos, com custo de produção baixo e lucro alto",
                    "Como comprar mais barato e economizar na produção mantendo uma qualidade alta, pensado para baixar o custo e lucrar mais com cada venda",
                    "Aprenda a enrolar, finalizar confeitos e montar caixinhas que encantam os olhos",
                    "Dicas simples para tirar fotos incríveis usando a luz natural do seu celular",
                    "Roteiro de conversação do WhatsApp para garantir pedidos rápidos"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#FFFFFF] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3 h-3 text-[#C93F5C]" />
                      </div>
                      <p className="text-[#211412] text-xs md:text-sm text-left">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FFFFFF] rounded-xl border border-[#5A2D25]/15 shadow-xs">
                  <span className="text-[#211412]/50 text-[10px] line-through uppercase tracking-widest">Valor: R$ 97,00</span>
                  <span className="text-[#C98A3D] text-[10px] font-black uppercase tracking-widest">Hoje: Grátis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Pricing = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60 + 20);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section id="pricing" className="py-24 bg-[#3A1F1A] text-white relative overflow-hidden">
      <div className="max-w-xl mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-2 text-white">Brigadeiro Lucrativo</h2>
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#F3E1D5] bg-[#5A2D25] px-4 py-2 rounded-full border border-[#C98A3D]/40 inline-block mb-3 shadow-sm">
            OFERTA EXCLUSIVA • VAGAS LIMITADAS
          </span>
          <p className="text-[#C98A3D] text-xs font-bold tracking-widest uppercase">ACESSO TOTAL + BÔNUS</p>
        </div>

        <div className="relative bg-[#5A2D25] border-2 border-[#C98A3D]/40 rounded-3xl p-8 md:p-10 mb-8 shadow-2xl">
          <div className="relative">
            <div className="mb-8">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#C98A3D] mb-4 flex items-center justify-center gap-2">
              <Clock className="w-3.5 h-3.5" /> OFERTA EXPIRA EM: {formatTime(timeLeft)}
            </p>
            <p className="text-[10px] text-[#F3E1D5]/80 uppercase tracking-wider mb-6">
              O preço subirá para <span className="text-white font-bold">R$ 197,00</span> após o cronômetro zerar
            </p>
            
            <div className="space-y-2 mb-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#F3E1D5]">
                <span>Vagas Preenchidas:</span>
                <span className="text-[#C98A3D] font-black">71%</span>
              </div>
              <div className="w-full h-2.5 bg-[#3A1F1A] rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "71%" }}
                   className="h-full bg-[#C93F5C]"
                />
              </div>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-[#F3E1D5]/60 italic">Últimas 9 licenças disponíveis com desconto</p>
          </div>

          <div className="mb-8">
            <p className="text-[#F3E1D5]/70 text-xs uppercase tracking-widest mb-2 italic">Aproveite a oferta de lançamento</p>
            <p className="text-[#F3E1D5]/50 line-through text-lg mb-1">DE R$ 197,00</p>
            <div className="flex items-start justify-center gap-1">
              <span className="text-2xl font-black italic mt-2 text-white">R$</span>
              <span className="text-7xl font-black italic tracking-tighter text-[#C98A3D]">19</span>
              <span className="text-2xl font-black italic mt-2 text-white">,90</span>
            </div>
          </div>

          <div className="space-y-3 mb-10 text-left max-w-[280px] mx-auto">
            {[
              "Acesso completo ao aplicativo",
              "Ideias e receitas de brigadeiros gourmet para vender",
              "Lista de compras e ingredientes exata",
              "Calculador de rendimento e porções exatas",
              "precificação certa e automática",
              "mensagens prontas para divulgar no WhatsApp, Instagram",
              "Bônus: como ter clientes que compram toda semana",
              "Bônus: como faturar os primeiros R$ 500 na semana"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#3A1F1A] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#C98A3D]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-tight text-[#F3E1D5]">{item}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => handleRedirect('https://pay.wiapy.com/2_-T8ctFlsA')}
            className="w-full bg-[#C93F5C] hover:bg-[#A92F49] text-white font-black py-5 rounded-xl transition-all flex flex-col items-center justify-center gap-1 uppercase italic tracking-tight animate-pulse-subtle shadow-xl shadow-[#C93F5C]/30 cursor-pointer"
          >
            <span className="text-lg flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> LIBERAR MEU ACESSO AGORA</span>
          </button>
          
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] mt-4 text-[#F3E1D5]/60">
            PIX • CARTÃO • BOLETO
          </p>
          </div>
        </div>

        <div className="flex justify-center gap-6 text-[#C98A3D]/40 mb-12">
          <Shield className="w-5 h-5" />
          <Lock className="w-5 h-5" />
          <CreditCard className="w-5 h-5" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-[#5A2D25] border border-[#C98A3D]/30 rounded-3xl p-8 md:p-10 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 text-left">
            <div className="relative shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#C98A3D]/15 rounded-full flex items-center justify-center border-2 border-[#C98A3D]/40">
                <Shield className="w-12 h-12 md:w-16 md:h-16 text-[#C98A3D]" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#C93F5C] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                7 DIAS
              </div>
            </div>
            
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white uppercase italic tracking-tight">
                RISCO ZERO: GARANTIA INCONDICIONAL
              </h3>
              <p className="text-[#F3E1D5]/90 text-sm md:text-base leading-relaxed font-medium">
                Fique tranquila! Você tem 7 dias para testar o aplicativo e todos os bônus saborosos. Se por qualquer motivo você não gostar ou achar que não é para você, basta nos enviar um e-mail e devolvemos 100% do seu dinheiro. Sem perguntas e sem letras miúdas. O seu sucesso é o nosso compromisso.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { 
      q: "COMO RECEBO O ACESSO?", 
      a: "Assim que o pagamento for confirmado, você recebe acesso imediato ao aplicativo via email e poderá começar a utilizar todas as ferramentas de confeitaria no mesmo dia." 
    },
    { 
      q: "PRECISO TER EXPERIÊNCIA?", 
      a: "Não. O aplicativo foi criado justamente para quem está começando do zero na cozinha e nunca preparou um doce comercial antes." 
    },
    { 
      q: "PRECISO SABER CONFEITAR OU COZINHAR?", 
      a: "Não. O aplicativo mostra receitas detalhadas e explicadas passo a passo com ingredientes comuns e orientações simples para qualquer um preparar do absoluto zero." 
    },
    { 
      q: "PRECISO TER ESTOQUE OU EQUIPAMENTOS?", 
      a: "Não. Você pode começar usando os próprios utensílios que já tem na sua cozinha. Muitas alunas pegam as encomendas e o sinal primeiro para só então comprar os ingredientes necessários e preparar." 
    },
    { 
      q: "COMO VOU SABER QUANTO COBRAR?", 
      a: "O aplicativo possui uma calculadora inteligente de custos integrada, que computa os gastos de cada brigadeiro, cento ou caixinha e sugere o preço ideal de venda automaticamente." 
    },
    { 
      q: "O APLICATIVO DIZ QUANTO COMPRAR PARA ENCOMENDAS?", 
      a: "Sim! Você digita quantos brigadeiros ou caixas precisa preparar e o app calcula as quantidades corretas de leite condensado, cacau, granulados e demais insumos, reduzindo qualquer prejuízo a zero." 
    },
    { 
      q: "FUNCIONA EM QUALQUER CIDADE?", 
      a: "Sim. O aplicativo pode ser utilizado em qualquer cidade do Brasil de forma ideal." 
    },
    { 
      q: "TEM GARANTIA?", 
      a: "Sim. Você conta com garantia incondicional de 7 dias. Se não gostar, basta solicitar o reembolso dentro do prazo." 
    },
  ];

  return (
    <section className="py-24 bg-[#F3E1D5]">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-12 text-center text-[#3A1F1A]">Dúvidas</h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="border-b border-[#5A2D25]/15 pb-4">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-2 text-left cursor-pointer"
              >
                <span className="font-bold text-sm uppercase italic text-[#3A1F1A]">{item.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform text-[#5A2D25]/60 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-[#211412] py-4 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Expert = () => {
  return (
    <section className="py-24 bg-[#FFFFFF] border-t border-[#5A2D25]/15 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Portrait Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative">
              {/* Back decorative border offsets */}
              <div className="absolute -inset-4 rounded-3xl border border-[#5A2D25]/20 rotate-3 pointer-events-none" />
              <div className="absolute -inset-2 bg-[#F3E1D5] rounded-3xl -rotate-2 pointer-events-none" />
              
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#F3E1D5] max-w-[280px] md:max-w-xs bg-[#F3E1D5]">
                <img 
                  src="https://i.postimg.cc/Z55kXwFY/Chat-GPT-Image-18-de-jul-de-2026-11-00-22.webp" 
                  alt="Laura - Criadora do Brigadeiros Lucrativos" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Text/Story Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 text-left"
          >
            <span className="text-[#C93F5C] text-xs font-black tracking-[0.25em] uppercase block mb-3">
              Quem te guia nessa jornada
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#3A1F1A] leading-tight mb-6">
              Oi, eu sou a Laura.
            </h2>
            
            <div className="space-y-4 text-[#211412] text-sm md:text-base leading-relaxed font-medium">
              <p>
                Há 5 anos, eu larguei meu emprego CLT e os brigadeiros gourmet se tornaram a minha principal fonte de renda.
              </p>
              <p>
                Mas o que fez isso dar certo não foi só saber fazer boas receitas.
              </p>
              <p>
                Foi aprender a calcular custo, entender o lucro, cobrar certo e manter constância nas vendas.
              </p>
              <p>
                Por isso criamos o <span className="font-extrabold text-[#C93F5C]">Brigadeiros Lucrativos</span>, um aplicativo feito para ajudar quem quer começar do zero ou quem já vende, mas ainda se sente perdida na hora de calcular preço, organizar receitas e divulgar.
              </p>
              <p>
                Aqui você encontra receitas prontas, lista de compras, cálculo de custo, preço sugerido, lucro estimado e textos para vender.
              </p>
              <p className="font-bold text-[#3A1F1A] border-l-2 border-[#C93F5C] pl-3 italic mt-6">
                Tudo para começar com mais direção e parar de vender no achismo.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 bg-[#3A1F1A] text-white border-t border-[#5A2D25]">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <div className="flex justify-center gap-8 mb-8 text-[10px] font-bold uppercase tracking-widest text-[#F3E1D5]/70">
        <button onClick={() => handleRedirect('#')} className="hover:text-[#C93F5C] transition-colors cursor-pointer">Privacidade</button>
        <button onClick={() => handleRedirect('#')} className="hover:text-[#C93F5C] transition-colors cursor-pointer">Termos</button>
      </div>
      
      <div className="space-y-4 text-[10px] md:text-[11px] text-[#F3E1D5]/60 leading-relaxed max-w-2xl mx-auto">
        <p className="font-bold text-[#F3E1D5] uppercase tracking-tighter">
          © 2026 AxerCompany • Todos os direitos reservados.
        </p>
        
        <p>
          Todo o conteúdo presente nesta página, incluindo textos, imagens, design, estrutura, vídeos, materiais e quaisquer outros elementos, é protegido por leis de direitos autorais e propriedade intelectual.
        </p>
        
        <p>
          É proibida a reprodução, cópia, distribuição ou modificação, total ou parcial, sem autorização prévia por escrito do responsável. O uso indevido do conteúdo poderá resultar em medidas legais conforme a legislação vigente.
        </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#3A1F1A] font-sans antialiased selection:bg-[#C93F5C]/30 selection:text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Results />
      <AppTechnology />
      <Testimonials />
      <WhatYouGet />
      <Pricing />
      <FAQ />
      <Expert />
      <Footer />
    </div>
  );
}
