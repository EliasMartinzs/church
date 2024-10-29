# Cramb

Desenvolvi este projeto inspirado em uma ideia de um amigo, para uma igreja onde o pastor ou padre pode criar e gerenciar células de encontro para a comunidade. Cada célula tem um secretário responsável por sua organização, e ele pode criar reuniões, cadastrar novos membros e gerenciar pedidos de oração, seja individual ou em grupo. Os membros podem acessar os perfis de outros participantes, visualizar suas próximas reuniões, marcar presença nas atividades e fazer pedidos de oração para si mesmos ou para conhecidos. O acesso à plataforma é feito por login, criado e enviado por e-mail pelo pastor ou secretário para cada usuário (pastor, secretário ou membro).

As tecnologias utilizadas no projeto incluem Next.js, Prisma, Tailwind CSS, Shadcn Ui, Clerk e PostgreSQL. Optei por um monolito com Next.js, onde o front-end e back-end estão integrados, utilizando o Next.js com server-side rendering e Prisma para manipulação de dados, sem necessidade de um backend separado. Essa escolha se deu pelo fato de ainda não ter experiência com NestJS, Express ou outras tecnologias de backend e porque o projeto é um webapp pequeno, voltado ao aprendizado sobre essas tecnologias.

No painel do Pastor, há um dashboard completa onde o administrador pode visualizar dados detalhados sobre sua igreja: o total de membros, número de células, quantidade de novos membros que ingressaram por mês, entre outras informações relevantes.

Este é um projeto open source, no qual deixei todas as variáveis de ambiente expostas no GitHub e também hospedei na Vercel para facilitar testes e experimentações sobre o projeto.

- Se desejarem modificar este projeto conforme suas necessidades, seja para uso próprio ou qualquer outro propósito, abaixo segue uma breve documentação sobre como utilizar as variáveis de ambiente.

- Neste projeto, configurei um webhook do Clerk Dev que, ao criar um usuário pela primeira vez no site, automaticamente define esse usuário como Pastor/Admin, vinculando os dados de login fornecidos pelo Clerk ao banco de dados. Além disso, o sistema cria automaticamente uma igreja associada ao usuário.

- Para que o projeto funcione corretamente, você pode usar o Ngrok para expor seu ambiente local e permitir que o webhook funcione como esperado. Se tiver dúvidas sobre o funcionamento do webhook, consulte a documentação do Clerk para obter mais detalhes.

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_***
- Link: https://clerk.com/

CLERK_SECRET_KEY=sk_test_***
- Link: https://clerk.com/

WEBHOOK_SECRET=whsec_***
- Link: https://clerk.com/

CLERK_WEBHOOK_SECRET=whsec_***
- Link: https://clerk.com/

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- Link: https://clerk.com/

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
- Link: https://clerk.com/

NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/admin
- Link: https://clerk.com/

NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/admin
- Link: https://clerk.com/

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dsj3p6kyh
- Link: https://cloudinary.com/

NEXT_PUBLIC_CLOUDINARY_API_KEY=643282291538595
- Link: https://cloudinary.com/

CLOUDINARY_API_SECRET=***
- Link: https://cloudinary.com/

DATABASE_URL=postgresql://neondb_owner:***
- Link: https://neon.tech/

NEXT_PUBLIC_API_URL=http://localhost:3000/
- Link: Localhost URL

NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=iv5PhHDNPOQ3IDhsw
- Link: https://www.emailjs.com/

NEXT_PUBLIC_EMAILJS_TEMPLATE_KEY=template_2k3r0vm
- Link: https://www.emailjs.com/

NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_s438rmn
- Link: https://www.emailjs.com/

Hospedagem Vercel

https://church-livid.vercel.app/

Repositório

https://github.com/EliasMartinzs/church


![screenshot-2024-10-29-17-36-04](https://github.com/user-attachments/assets/6729ea4b-595f-4ccc-842f-b0b6ac1b7654)
![screenshot-2024-10-29-17-36-38](https://github.com/user-attachments/assets/1bf7d636-2a02-472e-8bf1-467d6b405074)
![screenshot-2024-10-29-17-37-04](https://github.com/user-attachments/assets/fc9a378a-1844-435c-ab75-6a2e6f6360f7)
![screenshot-2024-10-29-17-37-18](https://github.com/user-attachments/assets/737d4511-82e3-4cd6-bf17-cd34a0bdf388)
![screenshot-2024-10-29-17-37-27](https://github.com/user-attachments/assets/cdd92aee-63fb-4c8d-87ef-90e2b00ab284)
![screenshot-2024-10-29-17-38-05](https://github.com/user-attachments/assets/59cefe90-6d0b-42cd-840d-bd0f350f226c)
![screenshot-2024-10-29-17-41-40](https://github.com/user-attachments/assets/017f2098-bfae-44e1-8e11-041528a0a6f0)
![screenshot-2024-10-29-17-41-48](https://github.com/user-attachments/assets/795cd61c-b373-4208-9318-67eb21ec572f)
![screenshot-2024-10-29-17-41-58](https://github.com/user-attachments/assets/ebf28556-4f8e-43ad-9691-ac40dfc371ac)
