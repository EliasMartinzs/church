import {
  IoHomeOutline,
  IoPricetagOutline,
  IoInformation,
} from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdWhatsapp } from "react-icons/md";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { SiGithub } from "react-icons/si";

import {
  FaHands,
  FaLightbulb,
  FaBox,
  FaHeart,
  FaSeedling,
  FaUsers,
  FaGlobe,
  FaUser,
  FaGratipay,
  FaUserCog,
  FaCalendar,
  FaCommentDots,
  FaChartBar,
  FaEye,
} from "react-icons/fa";

interface CardInfo {
  title: string;
  description: string;
  icon: IconType;
}

export const linksSite: { label: string; href: string; icon: IconType }[] = [
  {
    label: "Home",
    href: "/home",
    icon: IoHomeOutline,
  },
  {
    label: "Preços",
    href: "/precos",
    icon: IoPricetagOutline,
  },
  {
    label: "Sobre",
    href: "/about",
    icon: IoInformation,
  },
  {
    label: "Contato",
    href: "/contact",
    icon: MdWhatsapp,
  },
] as const;

export const cardSiteInfos: CardInfo[] = [
  {
    title: "Criação e Gestão de Células",
    description:
      "Configure e administre células facilmente. Crie novas células, defina líderes e atribua secretários para gerenciar cada grupo. Organize e ajuste suas células conforme necessário para atender às necessidades da sua comunidade.",
    icon: FaUsers,
  },
  {
    title: "Controle de Secretários",
    description:
      "Atribua secretários para gerir as células de forma eficaz. Eles poderão auxiliar na administração de membros, coordenação de eventos e comunicação, garantindo uma gestão eficiente e bem organizada.",
    icon: FaUserCog,
  },
  {
    title: "Planejamento de Eventos e Encontros",
    description:
      "Organize encontros e eventos para suas células com facilidade. Defina datas, horários e locais, e envie convites e lembretes automáticos para todos os membros. Acompanhe a participação e ajuste conforme necessário.",
    icon: FaCalendar,
  },
  {
    title: "Comunicação Eficiente",
    description:
      "Envie mensagens direcionadas para membros, líderes e secretários diretamente pelo aplicativo. Mantenha todos informados sobre mudanças, eventos e atualizações importantes, e promova uma comunicação contínua e eficiente.",
    icon: FaCommentDots,
  },
  {
    title: "Relatórios e Insights",
    description:
      "Gere relatórios detalhados sobre a frequência dos membros, a participação em eventos e a atividade das células. Utilize esses insights para avaliar o desempenho e otimizar a gestão das células.",
    icon: FaChartBar,
  },
  {
    title: "Monitoramento de Atividades",
    description:
      "Acompanhe as atividades e o progresso das células com ferramentas de monitoramento. Verifique a frequência dos encontros, o engajamento dos membros e a eficácia das reuniões, garantindo que as células estejam cumprindo seus objetivos.",
    icon: FaEye,
  },
];

export const footerLinks = {
  company: [
    { label: "Sobre Nós", href: "/about" },
    { label: "Nossa Equipe", href: "/team" },
    { label: "Carreiras", href: "/careers" },
    { label: "Contato", href: "/contact" },
  ],
  services: [
    { label: "Gerenciamento de Células", href: "/features/cell-management" },
    { label: "Relatórios e Análises", href: "/features/reports" },
    { label: "Eventos e Encontros", href: "/features/events" },
    { label: "Mensagens e Comunicações", href: "/features/messaging" },
  ],
  legal: [
    { label: "Política de Privacidade", href: "/privacy-policy" },
    { label: "Termos de Serviço", href: "/terms-of-service" },
  ],
};

export const contactInfo = {
  address: "Rua Exemplo, 123, Bairro, Cidade, Estado, País",
  phone: "+55 (11) 1234-5678",
  email: "contato@exemplo.com",
};

export const socialMediaLinks = [
  {
    platform: "Facebook",
    href: "https://facebook.com/yourpage",
    icon: FaFacebookF,
  },
  {
    platform: "Twitter",
    href: "https://twitter.com/yourprofile",
    icon: FaTwitter,
  },
  {
    platform: "LinkedIn",
    href: "https://linkedin.com/company/yourcompany",
    icon: FaLinkedinIn,
  },
  {
    platform: "Instagram",
    href: "https://instagram.com/yourprofile",
    icon: FaInstagram,
  },
  {
    platform: "GitHub",
    href: "https://github.com/yourprofile",
    icon: SiGithub,
  },
];

export const footerInfo = {
  year: new Date().getFullYear(),
  copyrightText: "© [YEAR] Cramb. Todos os direitos reservados.",
};

export const onboardingSteps: {
  step: number;
  title: string;
  description: string;
}[] = [
  {
    step: 1,
    title: "Crie sua Conta",
    description:
      "Comece sua jornada criando uma conta em nosso aplicativo. É rápido, fácil e permite que você tenha acesso a todas as funcionalidades de gerenciamento de células de forma segura.",
  },
  {
    step: 2,
    title: "Configure suas Células e Adicione Secretários",
    description:
      "Após criar sua conta, você pode configurar as células que deseja administrar. Adicione secretários responsáveis para cada célula, garantindo uma gestão organizada e eficiente. Personalize cada célula de acordo com as necessidades específicas da sua organização.",
  },
  {
    step: 3,
    title: "Envio Automático de Credenciais",
    description:
      "Assim que você adiciona secretários, nosso sistema envia automaticamente um e-mail com as credenciais de acesso (login e senha). Dessa forma, os secretários podem acessar o aplicativo de forma segura e imediata.",
  },
  {
    step: 4,
    title: "Gerenciamento Simplificado das Células",
    description:
      "Com as credenciais em mãos, os secretários têm acesso total às suas respectivas células. Eles podem gerenciar membros, organizar eventos, registrar relatórios, enviar mensagens, e muito mais, garantindo uma administração eficaz e conectada.",
  },
  {
    step: 5,
    title: "Acompanhe o Progresso em Tempo Real",
    description:
      "Monitore o desenvolvimento das células e acompanhe relatórios em tempo real. Mantenha-se informado sobre todas as atividades e tenha controle total sobre o crescimento e engajamento de sua comunidade.",
  },
  {
    step: 6,
    title: "Expanda e Otimize",
    description:
      "À medida que sua organização cresce, você pode adicionar novas células e secretários, expandindo o alcance e otimizando a gestão. Nosso aplicativo escala com você, proporcionando ferramentas avançadas para um gerenciamento contínuo e eficaz.",
  },
] as const;

export const menuItemsAdmin = [
  {
    label: "Home",
    iconName: "FiHome",
    path: "/admin",
  },
  {
    label: "Células",
    iconName: "FiLayers",
    path: "/admin/cells",
  },
  {
    label: "Membros",
    iconName: "FiUsers",
    path: "/admin/members",
  },
  {
    label: "Orações",
    iconName: "PiHandsPrayingFill",
    path: "/admin/prayers",
  },
  {
    label: "Meu Perfil",
    iconName: "FaRegUserCircle",
    path: "/admin/profile",
  },
];

export const menuItemsSecretary = [
  {
    label: "Célula",
    iconName: "FiHome",
    path: "/secretario",
  },
  {
    label: "Encontros",
    iconName: "FiCalendar",
    path: "/secretario/meetings",
  },
  {
    label: "Membros",
    iconName: "FiUsers",
    path: "/secretario/members",
  },
  {
    label: "Orações",
    iconName: "PiHandsPrayingFill",
    path: "/secretario/prayers",
  },
  {
    label: "Meu Perfil",
    iconName: "FaRegUserCircle",
    path: "/secretario/profile",
  },
];

export const prayerTypes = [
  { label: "Cura", value: "HEALING" },
  { label: "Orientação", value: "GUIDANCE" },
  { label: "Suprimento", value: "PROVISION" },
  { label: "Relacionamentos", value: "RELATIONSHIPS" },
  { label: "Crescimento Espiritual", value: "SPIRITUAL_GROWTH" },
  { label: "Comunidade", value: "COMMUNITY" },
  { label: "Paz Mundial", value: "WORLD_PEACE" },
  { label: "Pessoal", value: "PERSONAL" },
  { label: "Agradecimento", value: "THANKSGIVING" },
];

export const prayerIcons = {
  HEALING: FaHands, // Cura
  GUIDANCE: FaLightbulb, // Orientação
  PROVISION: FaBox, // Suprimento
  RELATIONSHIPS: FaHeart, // Relacionamentos
  SPIRITUAL_GROWTH: FaSeedling, // Crescimento Espiritual
  COMMUNITY: FaUsers, // Comunidade
  WORLD_PEACE: FaGlobe, // Paz Mundial
  PERSONAL: FaUser, // Pessoal
  THANKSGIVING: FaGratipay, // Agradecimento
};

export const prayerNames = {
  HEALING: "Cura",
  GUIDANCE: "Orientação",
  PROVISION: "Suprimento",
  RELATIONSHIPS: "Relacionamentos",
  SPIRITUAL_GROWTH: "Crescimento Espiritual",
  COMMUNITY: "Comunidade",
  WORLD_PEACE: "Paz Mundial",
  PERSONAL: "Pessoal",
  THANKSGIVING: "Agradecimento",
};

export const prayerStatusOptions = [
  { label: "Pendente", value: "PENDING" },
  { label: "Respondida", value: "ANSWERED" },
  { label: "Ignorada", value: "IGNORED" },
  { label: "Em Progresso", value: "IN_PROGRESS" },
];
