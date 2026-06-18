import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  ArrowUpRight,
  BrainCircuit,
  Cuboid,
  Mail,
  MessageCircle,
  MonitorPlay,
  Phone,
  Users,
  X,
} from 'lucide-react';
import SplashCursor from './SplashCursor';
import MagicRings from './MagicRings';
import ScrollFloat from './ScrollFloat';
import BorderGlow from './BorderGlow';
import './styles.css';

const contact = {
  phone: '18978083751',
  email: 'sparrowlion@163.com',
  wechat: 'Fkdsjpwsdslwm7',
};

const stats = [
  { value: '2028', label: '北京语言大学 · 数字媒体技术' },
  { value: '2+', label: 'AIGC / VR 核心项目' },
  { value: '4', label: 'AI 影像与设计工具链' },
  { value: '1', label: '校级创新训练项目' },
];

const motionWorks = [
  {
    kind: 'video',
    src: '/Website/Website/media/text-animation.mp4',
    title: '文字动画实验',
    meta: 'Typography Motion / AE',
  },
  {
    kind: 'video',
    src: '/Website/Website/media/ae-opening.mp4',
    title: '京剧体验动画 · 首幕',
    meta: 'AE Motion / Opening Scene',
  },
  {
    kind: 'video',
    src: '/Website/Website/media/ae-ending.mp4',
    title: '京剧体验动画 · 终幕',
    meta: 'AE Motion / Ending Scene',
  },
  {
    kind: 'image',
    src: '/Website/Website/media/c4d-room.png',
    title: 'C4D 室内空间与材质',
    meta: 'Cinema 4D / Interior Scene',
  },
  {
    kind: 'image',
    src: '/Website/Website/media/c4d-process.png',
    title: 'C4D 建模过程',
    meta: 'Cinema 4D / Process Capture',
  },
  {
    kind: 'image',
    src: '/Website/Website/media/pathfinder-mine.png',
    title: '探路者角色展示',
    meta: '3D Character / Lookdev',
  },
];

const xiyunMedia = Array.from({ length: 15 })
  .map((_, index) => index + 1)
  .filter((number) => ![2, 6, 10, 14].includes(number))
  .map((number) => ({
    kind: 'image',
    src: `/Website/Website/media/xiyun-ppt-${String(number).padStart(2, '0')}.png`,
    title: `戏韵芳华素材 ${String(number).padStart(2, '0')}`,
    meta: 'PPT Source / 3D Asset',
  }));

const chillaxMedia = [
  {
    kind: 'image',
    src: '/Website/Website/media/chillax-story-01.png',
    title: '深呼吸 / 全黑与琥珀光点',
    meta: '0:00 - 0:07',
  },
  {
    kind: 'image',
    src: '/Website/Website/media/chillax-story-02.png',
    title: '琥珀粒子缠绕高脚椅',
    meta: '00:31 / Sax Response',
  },
  {
    kind: 'image',
    src: '/Website/Website/media/chillax-story-03.png',
    title: '深蓝重力波',
    meta: '00:52 / Bass Layer',
  },
  {
    kind: 'image',
    src: '/Website/Website/media/chillax-story-04.png',
    title: '粒子漩涡汇聚麦克风',
    meta: '01:12 - 01:20',
  },
  {
    kind: 'image',
    src: '/Website/Website/media/chillax-story-05.png',
    title: '代码矩阵墙爆发',
    meta: '1:20 - 1:40',
  },
];

const chillaxBreakdown = [
  {
    title: '项目概述',
    text: '《chiilax》MV 是一个 AIGC 音乐可视化 / 概念 MV。我的角色是创意导演与 AIGC 技术导演，核心工具包含 Blender 粒子/流体系统与 AI 生图工具，项目状态为制作中。',
  },
  {
    title: '导演陈述',
    text: '“工作日抽离出来的灵魂”：身体在工位，思绪已经飘到深夜的爵士吧。用琥珀色粒子流实体化飞扬的思绪，让它随乐器声部改变运动方式，并在 1 分 20 秒通过代码矩阵墙完成从微醺到爆发的释放。',
  },
  {
    title: '三层视觉语言',
    text: '琥珀粒子流是情绪本体；深蓝重力波是 bass 的物理化；代码矩阵墙是能量爆发后的残影，从背景变成主体。',
  },
  {
    title: 'AIGC 工具链',
    text: 'Midjourney 用于关键帧概念图，Runway 用于动态素材测试，Blender 用于粒子、流体、材质和光照测试，音频分析工具用于提取节拍数据并驱动动画卡点。',
  },
];

const chillaxTimeline = [
  ['0:00-0:07', '深呼吸，全黑', '失焦霓虹光斑，心脏复苏感', 'Blender 体积雾 / 光晕散焦'],
  ['00:07-00:19', '初现人声', '琥珀色丝线随声波柔软浮动', '粒子路径动画'],
  ['00:19', '主歌切入', '白兰地杯飘出琥珀雾，主角诞生', 'Fluid Spawner + 发光粒子'],
  ['00:25 / 00:34 / 00:45', '电子琴高音', '触电闪光、冰块悬浮、全场失焦', '关键帧动画卡点'],
  ['00:31 / 00:36 / 00:41 / 00:46', '萨克斯', '薄纱缠椅、绿色涟漪、按键跳动、影子递进', '骨骼动画 + 粒子交互'],
  ['00:52', '电子琴低音切入', '地面暗蓝重力波扩散，空间底色变沉', '着色器动画 / 波纹贴图'],
  ['01:12-01:15', '高音转折信号', '粒子螺旋汇聚麦克风，地面变薄荷绿', 'Force Field 涡旋'],
  ['1:20', 'We chill let sing', '粒子漩涡炸开，代码矩阵覆盖全场', '粒子爆炸 + 着色器切换'],
  ['1:20-1:40', '纯协奏', '代码矩阵墙海浪光波 + 环绕镜头', '程序化着色器 + 摄像机路径'],
];

const projects = [
  {
    title: 'Chillax',
    type: 'AIGC 三维音乐视觉短片',
    time: '2026.05 - 2026.08',
    role: 'AIGC导演与创意主导',
    desc: '以“微醺到爆发”的情绪递进为主线，拆解音乐结构，设计精确到秒的视听分镜，并建立琥珀色到薄荷绿的动态色彩系统。',
    detail: '文字版分镜已整理为站内内容：从 0:00 全黑深呼吸，到 1:20 麦克风大招释放，再到 1:20-1:40 代码矩阵墙爆燃，展示从创意构思到 AI 工具落地的完整导演能力。',
    caseSections: chillaxBreakdown,
    timeline: chillaxTimeline,
    links: [
      {
        label: 'AIGC 导演案例拆解',
        url: 'https://app.notion.com/p/chiilax-AIGC-8e8e2a74d5f74f7dafc2bb2ee199468b?source=copy_link',
      },
      {
        label: 'Chillax 导演分镜',
        url: 'https://app.notion.com/p/chiilax-MV-67764b3a7900499088353cc6fde20ed7?source=copy_link',
      },
    ],
    tags: ['AIGC', 'Storyboard', 'Blender / UE5', 'Motion Visual'],
    visual: 'silver',
    media: chillaxMedia,
  },
  {
    title: '戏韵芳华',
    type: 'VR 京剧体验工坊',
    time: '2025.10 - 2026.06',
    role: '核心成员',
    desc: '探索 VR 技术在传统文化可视化呈现中的应用，参与选题立意、场景建模、材质制作、玩法参考与体验环节规划。',
    detail: '项目围绕京剧戏楼、戏服角色、戏曲乐器和资产材质库展开。PPT 中呈现了戏台、观众席、二楼回廊、灯笼陈设、戏服陈列区、文武场乐器，以及上百个模型资产和百种材质实例的整理思路。',
    contributions: [
      '参与选题与立意：让传统京剧从静态知识转化为可体验、可交互的沉浸式内容。',
      '参与环节规划：参考游戏化体验方式，梳理从认知、互动到舞台呈现的体验路径。',
      '参与建模与材质：完成或协助戏楼、戏服、乐器、道具等资产制作与材质表现。',
      '参与流程整合：处理 3ds Max 到 UE5 的素材导入、上材质和引擎内资产整理。',
    ],
    tags: ['VR Experience', 'Culture Tech', 'UX Flow', 'Story Idea'],
    visual: 'ink',
    media: xiyunMedia,
  },
  {
    title: '3D / Motion Lab',
    type: 'AE 动画 · C4D 设计建模',
    time: '持续创作',
    role: '三维与动态图形练习',
    desc: '收纳个人 AE 动效、C4D 建模、角色展示、材质灯光与抽象视觉实验，作为作品集里的创作实验区。',
    detail: '当前已接入可读取的文字动画、AE 首幕/终幕视频、C4D 室内空间截图、C4D 过程截图和探路者角色图。',
    tags: ['C4D', 'AE Motion', '3D Modeling', 'Lookdev'],
    visual: 'graphite',
    media: motionWorks,
  },
];

const strengths = [
  {
    icon: BrainCircuit,
    title: 'AIGC 叙事转译',
    text: '把抽象情绪、音乐结构和视觉节奏拆解为可执行的提示词、镜头与时间轴。',
  },
  {
    icon: MonitorPlay,
    title: '视听语言与动态审美',
    text: '关注色彩、光影、粒子与镜头运动之间的关系，追求克制但有记忆点的视觉表达。',
  },
  {
    icon: Cuboid,
    title: '三维与交互意识',
    text: '具备三维动画、计算机图形学和 VR 项目经验，理解空间化体验的表达边界。',
  },
  {
    icon: Users,
    title: '协作与落地能力',
    text: '能在创意、技术和执行之间做信息整理、流程协调和目标拆解。',
  },
];

function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: 72 }).map((_, index) => (
        <span
          key={index}
          style={{
            '--x': `${(index * 29) % 100}%`,
            '--y': `${(index * 47) % 100}%`,
            '--d': `${(index % 9) * 0.34}s`,
            '--s': `${2 + (index % 4)}px`,
          }}
        />
      ))}
    </div>
  );
}

function MeteorField() {
  return (
    <div className="meteor-field" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          style={{
            '--mx': `${8 + ((index * 17) % 82)}%`,
            '--md': `${(index % 6) * 0.55}s`,
            '--ml': `${72 + (index % 5) * 26}px`,
          }}
        />
      ))}
    </div>
  );
}

function MediaPreview({ item }) {
  if (item.kind === 'video') {
    return <video src={item.src} muted loop playsInline autoPlay controls={false} />;
  }

  return <img src={item.src} alt={item.title} />;
}

function Hero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('home');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="hero" id="home" style={{ '--scroll': progress }}>
      <nav className="nav">
        <a className="brand" href="#home">LI XINYUE</a>
        <div className="nav-links">
          <a href="#profile">Profile</a>
          <a href="#projects">Projects</a>
          <a href="#strengths">Strengths</a>
        </div>
        <a className="nav-contact" href={`mailto:${contact.email}`}>
          <Mail size={15} />
          Contact
        </a>
      </nav>

      <div className="hero-stage">
        <ParticleField />
        <div className="hero-top">
          <div className="hero-label">Digital Media / AIGC Direction</div>
          <div className="hero-note">Visual narrative, 3D motion, immersive experience.</div>
          <a className="micro-link" href="#projects">View Work</a>
        </div>

        <div className="hero-visual-wrap">
          <div className="hero-rings" aria-hidden="true" />
          <img className="griffin" src="/Website/Website/griffin.png" alt="银白色数字风格翼兽主视觉" />
        </div>

        <div className="hero-bottom">
          <div className="hero-name">
            <p className="eyebrow">Portfolio 2026</p>
            <h1>李心玥</h1>
          </div>
          <p>
            AIGC & 视觉内容创作学习者。把技术、影像与情绪转译为可观看、可进入、可继续生产的体验。
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className={`project-modal ${project.media ? 'wide-modal' : ''}`}>
        <button className="icon-button" onClick={onClose} aria-label="关闭项目详情">
          <X size={22} />
        </button>
        <button className="back-button" onClick={onClose}>
          <ArrowLeft size={18} />
          Back to Projects
        </button>

        <div className={`modal-visual ${project.visual}`}>
          <ParticleField />
          <span>{project.title}</span>
        </div>

        <div className="modal-content">
          <p className="section-kicker">{project.type}</p>
          <ScrollFloat className="modal-title">{project.title}</ScrollFloat>
          <div className="project-meta">
            <span>{project.time}</span>
            <span>{project.role}</span>
          </div>
          <p>{project.desc}</p>
          <p className="muted">{project.detail}</p>
          {project.contributions && (
            <ul className="contribution-list">
              {project.contributions.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
          {project.links && (
            <div className="case-links">
              {project.links.map((link) => (
                <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                  {link.label}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          )}
          {project.caseSections && (
            <div className="case-section-grid">
              {project.caseSections.map((section) => (
                <article key={section.title}>
                  <strong>{section.title}</strong>
                  <p>{section.text}</p>
                </article>
              ))}
            </div>
          )}
          {project.timeline && (
            <div className="sync-table">
              <div className="sync-head">
                <span>时间轴</span>
                <span>音乐事件</span>
                <span>视觉响应</span>
                <span>技术实现</span>
              </div>
              {project.timeline.map((row) => (
                <div className="sync-row" key={row.join('-')}>
                  {row.map((cell) => <span key={cell}>{cell}</span>)}
                </div>
              ))}
            </div>
          )}
          <div className="tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>

        {project.media && (
          <div className="media-gallery">
            {project.media.map((item) => (
              <article className="media-tile" key={item.src}>
                <MediaPreview item={item} />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.meta}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <main>
      <SplashCursor
        DENSITY_DISSIPATION={3}
        COLOR="#747077"
        RAINBOW_MODE={false}
        SPLAT_RADIUS={0.18}
        SPLAT_FORCE={5200}
      />
      <Hero />

      <section className="section profile" id="profile">
        <div className="profile-rings" aria-hidden="true">
          <MagicRings
            color="#e6ddee"
            colorTwo="#0c0c0e"
            ringCount={7}
            speed={0.72}
            lineThickness={2}
            baseRadius={0.22}
            radiusStep={0.09}
            scaleRate={0.08}
            opacity={0.9}
            rotation={-8}
            followMouse
            mouseInfluence={0.16}
            parallax={0.035}
          />
        </div>
        <div className="container profile-grid">
          <div className="profile-intro">
            <p className="section-kicker">Profile</p>
            <ScrollFloat>AIGC & 视觉内容创作学习者：会想象，也会拆解。</ScrollFloat>
          </div>

          <div className="profile-content">
            <p className="lead">
              我正在建立 AIGC 视觉创作、三维动态影像和沉浸式体验之间的工作方法。项目更像一组方向坐标：从音乐视觉短片的秒级分镜，到 VR 京剧工坊的传统文化可视化，再到 AE / C4D 的三维与动态图形实验。
            </p>
            <div className="stats">
              {stats.map((item) => (
                <BorderGlow className="stat" key={item.label} glowColor="40 80 80" colors={['#f0c77a', '#9fc7d2', '#e6ddee']}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </BorderGlow>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-kicker">Selected Projects</p>
              <ScrollFloat>作品项目</ScrollFloat>
            </div>
            <p>项目卡片可点击进入详情。3D / Motion 模块已接入目前可读取的图片与视频素材，图片做了暗色裁剪与调色。</p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <button className="project-card" key={project.title} onClick={() => setActiveProject(project)}>
                <div className={`project-visual ${project.visual}`}>
                  {project.media ? (
                    <div className="project-media-strip">
                      {project.media.slice(0, 3).map((item) => (
                        <div className="strip-item" key={item.src}>
                          <MediaPreview item={item} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <ParticleField />
                      <div className="project-wire wire-one" />
                      <div className="project-wire wire-two" />
                    </>
                  )}
                  <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                  <div className="visual-title">{project.title}</div>
                </div>
                <div className="project-info">
                  <p>{project.type}</p>
                  <h3>{project.title}</h3>
                  <div className="project-meta">
                    <span>{project.time}</span>
                    <span>{project.role}</span>
                  </div>
                  <p className="project-desc">{project.desc}</p>
                  <div className="card-cta">
                    Open case
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section strengths" id="strengths">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-kicker">Capabilities</p>
              <ScrollFloat>个人优势</ScrollFloat>
            </div>
            <p>从创意判断、工具协作到执行落地，能力结构围绕“把想法变成可生产内容”。</p>
          </div>

          <div className="strength-grid">
            {strengths.map(({ icon: Icon, title, text }) => (
              <BorderGlow className="strength-card" key={title} glowColor="210 70 78" colors={['#9fc7d2', '#e6ddee', '#f0c77a']}>
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{text}</p>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-finale" id="contact">
        <div className="ballpit-field" aria-hidden="true">
          {Array.from({ length: 96 }).map((_, index) => (
            <span
              key={index}
              style={{
                '--i': index,
                '--x': `${(index * 37) % 100}%`,
                '--y': `${(index * 53) % 100}%`,
                '--s': `${8 + (index % 9) * 7}px`,
              }}
            />
          ))}
        </div>
        <ParticleField />
        <div className="container finale-inner">
          <p className="section-kicker">Contact</p>
          <ScrollFloat>期待把下一段视觉实验，做成真正可被看见的作品。</ScrollFloat>
          <div className="finale-actions">
            <a className="primary-link contact-email" href={`mailto:${contact.email}`}>
              <Mail size={18} />
              {contact.email}
            </a>
            <a className="ghost-link contact-phone" href={`tel:${contact.phone}`}>
              <Phone size={18} />
              {contact.phone}
            </a>
            <span className="ghost-link contact-wechat">
              <MessageCircle size={18} />
              微信：{contact.wechat}
            </span>
          </div>
        </div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
