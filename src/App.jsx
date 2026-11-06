import React, { useState, useEffect } from 'react';

export default function App() {
  // --- ESTADOS DE LA APLICACIÓN ---
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortModal, setActivePortModal] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activeGameUrl, setActiveGameUrl] = useState(null); 
  const [openDropdown, setOpenDropdown] = useState(null); 

  // Autenticación y Persistencia con localStorage
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // { username, email, avatar }
  const [authForm, setAuthForm] = useState({ username: '', email: '', password: '', avatar: '' });

  // Cargar sesión guardada al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('thegamerpro_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('thegamerpro_user');
      }
    }
  }, []);

  // Bloquear scroll cuando hay modales abiertos
  useEffect(() => {
    if (activePortModal || activeVideoModal || activeGameUrl || authModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activePortModal, activeVideoModal, activeGameUrl, authModalOpen]);

  // --- COLECCIÓN DE GAME PORTS ONLINE ---
  const portData = {
    'simpsons-hit-run': {
      id: 'simpsons-hit-run',
      title: 'The Simpsons: Hit & Run (WASM)',
      badge: 'Open World Classic',
      gameUrl: 'https://ported2browser.com/ports/01M2S6FQBX7Y3VYWGF0B2XS10J&es',
      bannerImg: 'https://news.konsolenkost.de/wp-content/uploads/2019/10/simpsons.jpg',
      description: 'Disfruta de Springfield en este port nativo para navegador compilado con WebAssembly.',
      reqRec: 'Navegador moderno con soporte WebGL / WebAssembly'
    },
    'dbz-bt3': {
      id: 'dbz-bt3',
      title: 'Dragon Ball Z: Budokai Tenkaichi 3',
      badge: 'Anime Fighting',
      gameUrl: 'https://dragonballbt3.online',
      bannerImg: 'https://deuclick.com.br/wp-content/uploads/2023/04/MELHOR-JOGO-DA-VIDA.png',
      description: 'El legendario juego de peleas 3D de Dragon Ball ejecutable directo en tu navegador web.',
      reqRec: 'Procesador Quad Core | 4GB RAM | Aceleración por Hardware en Browser'
    },
    'fifa-street-2': {
      id: 'fifa-street-2',
      title: 'FIFA Street 2',
      badge: 'Arcade Sports',
      gameUrl: 'https://fifastreet2.fun',
      bannerImg: 'https://assets.altarofgaming.com/wp-content/uploads/2023/09/fifa-street-2-game-cover-altar-of-gaming.jpg',
      description: 'Haz regates, caños y jugadas callejeras con el motor portado de FIFA Street 2 en navegador.',
      reqRec: 'Navegador con WebGL activado'
    },
    'dbz-budokai-2': {
      id: 'dbz-budokai-2',
      title: 'DBZ: Budokai 2',
      badge: 'Fighting Classic',
      gameUrl: 'https://budokai2onlline.cc',
      bannerImg: 'https://assets.altarofgaming.com/wp-content/uploads/2022/12/dragon-ball-z-budokai-2-game-cover-altar-of-gaming.jpg',
      description: 'Revive la historia cel-shading de Goku y sus amigos en este clásico emulado en HTML5.',
      reqRec: 'Procesador Dual Core 2.0GHz | 2GB RAM'
    },
    'wwe-smackdown-pain': {
      id: 'wwe-smackdown-pain',
      title: 'WWE SmackDown! Here Comes the Pain',
      badge: 'Wrestling Legend',
      gameUrl: 'https://wwepain.gamingretro.online',
      bannerImg: 'https://static0.thesportsterimages.com/wordpress/wp-content/uploads/2020/08/Here-Comes-The-Pain-Cropped-1.jpg',
      description: 'El clásico atemporal de lucha libre con Brock Lesnar, The Rock y Stone Cold jugable online.',
      reqRec: 'Procesador Quad Core | GPU integrada HD Graphics'
    },
    'vice-city': {
      id: 'vice-city',
      title: 'GTA Vice City Web Port',
      badge: 'Classic Open World',
      gameUrl: 'https://quenq.com/apps/vice-city/',
      bannerImg: 'https://img2.wallspic.com/attachments/originals/2/9/5/8/7/178592-gta-ray_liotta_en_gta_vice_city-ray_liotta-grand_theft_auto_vice_city-tommy_vercetti-3840x2160.png',
      description: 'Motor RenderWare ejecutable nativamente en navegador a 60 FPS estables sin descargas.',
      reqRec: 'Procesador Quad Core 2.0GHz+ | 4GB RAM'
    },
    'gta-3': {
      id: 'gta-3',
      title: 'GTA 3 Remaster Web Port',
      badge: 'Classic Remake Port',
      gameUrl: 'https://quenq.com/apps/gta-3/',
      bannerImg: 'https://wallpaperaccess.com/full/1444135.jpg',
      description: 'Adaptación completa de Liberty City ejecutada directamente vía WebAssembly.',
      reqRec: 'Procesador Dual Core 1.5GHz | 2GB RAM'
    }
  };

  // --- VIDEOS OFICIALES & TUTORIALES ---
  const videoList = [
    {
      id: 'gow-3',
      category: 'tutorials',
      title: '🎮 ¡CÓMO JUGAR GOD OF WAR 3 REMASTERED EN PC! 🖥️ | PORT PC',
      subtitle: 'UpFiles • Tutoriales & Archivos PC',
      description: 'Guía paso a paso sin complicaciones para instalar y configurar God of War 3 Remastered en PC con enlaces directos en UpFiles.',
      duration: 'Tutorial Completo',
      image: 'https://img.youtube.com/vi/ZmreGuPhug0/maxresdefault.jpg',
      badge: 'ARCHIVOS UPFILES',
      videoUrl: 'https://www.youtube.com/embed/ZmreGuPhug0',
      fileUrl: 'https://upfiles.com/rhsp'
    },
    {
      id: '1',
      category: 'dev',
      title: '🚀 SISTEMA WEB DE INVENTARIO Y VENTAS con Node.js, Express y PostgreSQL | MVC | PARTE 1',
      subtitle: 'Backend & Full-Stack • Node.js, Express & PostgreSQL',
      description: 'Aprende a construir desde cero un sistema web de inventario y ventas con arquitectura MVC, PostgreSQL (pg-promise), controladores y rutas escalables.',
      duration: '33:05 mins',
      image: 'https://img.youtube.com/vi/c8mvZu_Ummw/maxresdefault.jpg',
      badge: 'PROGRAMACIÓN CURSOS',
      videoUrl: 'https://www.youtube.com/embed/c8mvZu_Ummw',
      fileUrl: 'https://upfiles.com/member/files'
    },
    {
      id: '2',
      category: 'dev',
      title: '🚀 SISTEMA DE INVENTARIO Y VENTAS en Node.js, Express y PostgreSQL | PARTE 2 💥 (Manejo de Stock)',
      subtitle: 'Full-Stack • Stock & PG Admin 4',
      description: 'Segunda parte del directo en vivo con el manejo avanzado de stock, consultas a la base de datos PostgreSQL y lanzamiento en el servidor de Discord.',
      duration: '17:27 mins',
      image: 'https://img.youtube.com/vi/CX-HMbbvLK8/maxresdefault.jpg',
      badge: 'PROGRAMACIÓN CURSOS',
      videoUrl: 'https://www.youtube.com/embed/CX-HMbbvLK8',
      fileUrl: 'https://upfiles.com/member/files'
    }
  ];

  const filteredVideos = activeCategory === 'all' 
    ? videoList 
    : videoList.filter(v => v.category === activeCategory);

  // Subir Foto de Perfil desde Dispositivo
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAuthForm({ ...authForm, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar Login y Datos en localStorage
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (authForm.username && authForm.email) {
      const userData = {
        username: authForm.username,
        email: authForm.email,
        avatar: authForm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };
      setCurrentUser(userData);
      localStorage.setItem('thegamerpro_user', JSON.stringify(userData));
      setAuthModalOpen(false);
      setAuthForm({ username: '', email: '', password: '', avatar: '' });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('thegamerpro_user');
  };

  return (
    <div className="w-full min-h-screen bg-black text-[#ededed] font-sans relative overflow-x-hidden selection:bg-white selection:text-black m-0 p-0">
      
      {/* NAVBAR 100% PANTALLA COMPLETA */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-[#222222] w-full px-6 lg:px-12">
        <div className="w-full flex items-center justify-between h-20">
          
          {/* Logo Oficial con el Icono del Puño y Mando */}
          <a href="#hero" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-md">
              <svg viewBox="0 0 512 512" className="w-full h-full fill-black">
                <path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm85.9 316.3c-14.2 1.4-28.5 2.2-42.9 2.4-2.8 0-5.4-1.1-7.4-3.1l-18.4-18.4c-12.8 8.1-27.9 12.8-44 12.8-16.1 0-31.2-4.7-44-12.8l-18.4 18.4c-2 2-4.6 3.1-7.4 3.1-14.4-.2-28.7-1-42.9-2.4-16.5-1.6-29.5-15.1-29.5-31.7v-98.8c0-15.4 11.1-28.5 26.2-31.3 25-4.6 51.1-7.1 77.8-7.1 26.7 0 52.8 2.5 77.8 7.1 15.1 2.8 26.2 15.9 26.2 31.3v98.8c0 16.6-13 30.1-29.5 31.7zM184 196c-8.8 0-16-7.2-16-16v-24h-24c-8.8 0-16-7.2-16-16s7.2-16 16-16h24v-24c0-8.8 7.2-16 16-16s16 7.2 16 16v24h24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-24v24c0 8.8-7.2 16-16 16zm168 8c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20zm40 64c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z"/>
              </svg>
            </div>
            <span className="font-sans font-black text-2xl tracking-tighter text-white uppercase">
              THE GAMER <span className="text-zinc-400 font-light">PRO</span>
            </span>
          </a>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#hero" className="hover:text-white transition-colors">Inicio</a>
            
            {/* Dropdown Catálogo */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('ports')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="hover:text-white transition-colors flex items-center gap-1.5 py-2">
                Cloud Games 
                <svg className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'ports' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>

              {openDropdown === 'ports' && (
                <div className="absolute top-full left-0 w-80 pt-2">
                  <div className="bg-[#0c0c0c] border border-zinc-800 rounded-2xl p-3 shadow-2xl space-y-1.5 max-h-[70vh] overflow-y-auto">
                    {Object.keys(portData).map((key) => (
                      <button 
                        key={key}
                        onClick={() => { 
                          setActiveGameUrl({ title: portData[key].title, url: portData[key].gameUrl }); 
                          setOpenDropdown(null); 
                        }} 
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-900 transition-all text-left group"
                      >
                        <img src={portData[key].bannerImg} alt="" className="w-10 h-10 rounded-lg object-cover transition-all" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-xs text-zinc-200 truncate group-hover:text-white">{portData[key].title}</div>
                          <div className="text-[10px] text-zinc-500">Ejecutar online</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="#game-ports" className="hover:text-white transition-colors">Port Hub</a>
            <a href="#videos" className="hover:text-white transition-colors">Cursos & UpFiles</a>
            <a href="https://discord.gg/b2rSSrQBm" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
          </nav>

          {/* Acciones de Cuenta y Login */}
          <div className="flex items-center gap-4 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                <img src={currentUser.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
                <span className="text-xs font-semibold text-zinc-200">{currentUser.username}</span>
                <button 
                  onClick={handleLogout}
                  className="text-[10px] text-zinc-400 hover:text-white uppercase tracking-wider ml-2 border-l border-zinc-800 pl-2"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setAuthModalOpen(true)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button 
                  onClick={() => setAuthModalOpen(true)}
                  className="px-5 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            )}

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
            >
              ☰
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-900 bg-black px-6 py-6 space-y-4 text-sm font-medium text-zinc-300">
            <a href="#game-ports" onClick={() => setMobileMenuOpen(false)} className="block">Catálogo Web</a>
            <a href="#videos" onClick={() => setMobileMenuOpen(false)} className="block">Cursos & UpFiles</a>
            <a href="https://discord.gg/b2rSSrQBm" target="_blank" rel="noopener noreferrer" className="block">Discord</a>
          </div>
        )}
      </header>

      {/* HERO SECTION 100% PANTALLA COMPLETA */}
      <section id="hero" className="w-full relative pt-24 pb-28 text-center px-6 lg:px-16 border-b border-zinc-900">
        <div className="w-full space-y-6">
          <div className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
            CLOUD GAMING & AUTOMATION HUB
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] break-words">
            Your games. Your rules. Any browser.
          </h1>

          <p className="text-zinc-400 text-base sm:text-xl max-w-4xl mx-auto font-light leading-relaxed">
            THE GAMER PRO ofrece a los jugadores un entorno unificado para ejecutar emuladores y game ports directamente en streaming web, respaldado por tutoriales y archivos profesionales.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setActiveGameUrl({ title: portData['simpsons-hit-run'].title, url: portData['simpsons-hit-run'].gameUrl })}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Start playing free
            </button>
            <a 
              href="https://discord.gg/b2rSSrQBm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white font-semibold text-sm hover:bg-zinc-800 transition-colors"
            >
              Join Community
            </a>
          </div>

          {/* Métricas Inferiores */}
          <div className="grid grid-cols-3 gap-8 pt-16 w-full max-w-5xl mx-auto border-t border-zinc-900/80 mt-16 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">7+</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Ports Activos</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">9,000+</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Cloud Sessions</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">3.39M+</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">UpFiles Downloads</div>
            </div>
          </div>
        </div>
      </section>

      {/* GAME PORTS GRID SECTION (FULL WIDTH + A COLOR) */}
      <section id="game-ports" className="w-full py-24 px-6 lg:px-12 border-b border-zinc-900">
        <div className="w-full">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Cloud Game Ports Collection
            </h2>
            <p className="text-zinc-400 text-base">
              Ejecuta juegos clásicos de consola y PC a todo color de manera nativa sin instalaciones.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {Object.keys(portData).map((key) => {
              const item = portData[key];
              return (
                <div 
                  key={key} 
                  className="bg-[#080808] border border-zinc-900 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-56 bg-zinc-950 overflow-hidden">
                      <img src={item.bannerImg} alt={item.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-zinc-400 text-xs leading-relaxed font-light line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button 
                      onClick={() => setActiveGameUrl({ title: item.title, url: item.gameUrl })}
                      className="w-full py-3 rounded-full bg-zinc-900 hover:bg-white hover:text-black text-white font-medium text-xs uppercase tracking-wider transition-all border border-zinc-800"
                    >
                      Play Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* VIDEOS & UPFILES SECTION (FULL WIDTH) */}
      <section id="videos" className="w-full py-24 px-6 lg:px-12 border-b border-zinc-900">
        <div className="w-full">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Tutoriales & Software</span>
              <h2 className="text-3xl font-bold text-white mt-1">Videos & UpFiles Storage</h2>
            </div>
            
            <a 
              href="https://upfiles.com/member/files" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold uppercase transition-all"
            >
              UpFiles Manager ↗
            </a>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {videoList.map((item) => (
              <div 
                key={item.id}
                className="bg-[#080808] border border-zinc-900 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div 
                    onClick={() => setActiveVideoModal(item.videoUrl)}
                    className="relative aspect-video overflow-hidden bg-zinc-950 cursor-pointer"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black text-white text-[10px] font-mono font-bold uppercase border border-zinc-800">
                      {item.badge}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg shadow-lg">
                        ▶
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-xs text-zinc-500 font-mono">{item.subtitle}</span>
                    <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-3">
                  <button 
                    onClick={() => setActiveVideoModal(item.videoUrl)}
                    className="flex-1 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold"
                  >
                    Watch
                  </button>
                  <a 
                    href={item.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold text-center"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-12 px-8 text-center text-xs text-zinc-600 font-mono bg-black">
        <p>© 2026 THE GAMER PRO & Programación Cursos. All rights reserved.</p>
      </footer>

      {/* MODAL DE LOGIN / REGISTRO */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-[#0c0c0c] border border-zinc-800 rounded-3xl p-8 relative shadow-2xl">
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Autenticación</span>
              <h2 className="text-2xl font-bold text-white mt-1">Acceso a THE GAMER PRO</h2>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Nombre de Usuario</label>
                <input 
                  type="text" 
                  required
                  placeholder="Santiago Cossio"
                  value={authForm.username}
                  onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-white rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Correo Electrónico</label>
                <input 
                  type="email" 
                  required
                  placeholder="cossiosantiago12@gmail.com"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-white rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Contraseña</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-white rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                />
              </div>

              {/* Subir Foto de Perfil desde el Dispositivo */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Foto de Perfil (Dispositivo)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-xs text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
                  />
                  {authForm.avatar && (
                    <img src={authForm.avatar} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-zinc-700 shrink-0" />
                  )}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors mt-6 shadow-md"
              >
                Iniciar Sesión / Registrarse
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE JUEGO EN VIVO (EMULADOR IFRAME) */}
      {activeGameUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 p-4">
          <div className="w-full h-full max-w-[1800px] max-h-[96vh] bg-[#0c0c0c] border border-zinc-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
            
            <div className="p-4 bg-black border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
                <span className="font-semibold text-sm text-white">{activeGameUrl.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    const elem = document.getElementById('game-iframe');
                    if (elem && elem.requestFullscreen) elem.requestFullscreen();
                  }}
                  className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium"
                >
                  Pantalla Completa
                </button>
                <button 
                  onClick={() => setActiveGameUrl(null)}
                  className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase"
                >
                  Cerrar
                </button>
              </div>
            </div>

            <div className="flex-1 bg-black relative">
              <iframe 
                id="game-iframe"
                src={activeGameUrl.url} 
                title={activeGameUrl.title}
                className="w-full h-full border-0"
                allow="autoplay; keyboard; gamepad; fullscreen"
              />
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <button 
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-10 text-white bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-full text-xs font-bold"
            >
              Cerrar ✕
            </button>
            <iframe 
              src={`${activeVideoModal}?autoplay=1`} 
              title="YouTube video player" 
              className="w-full h-full border-0" 
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

    </div>
  );
}