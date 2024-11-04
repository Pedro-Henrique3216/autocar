# Iniciar projeto

# Diagnóstico e Orçamento de Veículos

## Iniciar Projeto

Para iniciar o projeto, primeiro devemos iniciar o backend Java. Certifique-se de que o servidor esteja em execução antes de acessar a aplicação front-end.

## Como iniciar o Java

1. **Abrir o Projeto Java**
   ![Abrir o Projeto Java](https://github.com/user-attachments/assets/c56d669f-2df9-402a-aae5-4dd6034eaa18)

2. **Ir em Current File**
   ![Ir em Current File](https://github.com/user-attachments/assets/fd5f7238-c175-4908-a412-ab2ff54cb8a8)

3. **Edit Configurations**
   ![Edit Configurations](https://github.com/user-attachments/assets/962108c1-aae1-475b-9b3e-094e1b45eb45)

4. **Add New**
   ![Add New](https://github.com/user-attachments/assets/f5dc5048-5962-475a-9445-6546036792c3)

5. **Selecionar Tomcat**
   ![Tomcat](https://github.com/user-attachments/assets/442a4a35-3b7d-45e8-ae51-85f99d0ef66e)

6. **Configure Tomcat**
   ![Configure](https://github.com/user-attachments/assets/d0e1b0df-9173-42c5-980f-d33462c79a65)
   - Seleciona a pasta que seu Tomcat está instalado e clica em **OK**.

7. **Adicionar Novo**
   ![Clique no mais](https://github.com/user-attachments/assets/ab7eb677-0b90-48c0-bd95-4c8a0465b702)

8. **Pesquisar Maven**
   ![Pesquisar Maven](https://github.com/user-attachments/assets/5cfe7512-9b82-4dc8-83a7-da92b5dd9c95)
   - Clica no **Maven run goal**.

9. **Em Command Line**
   ![Em command line](https://github.com/user-attachments/assets/b5548a4a-3caf-4284-b934-91fecb7a6205)
   - Escreva `clean install` e clique em **OK**.

10. **Va em Deployment**
    ![Deployment](https://github.com/user-attachments/assets/6483e14d-b0ac-4b3f-946b-d213b1814e38)
    - Clique no **mais** após isso **artifact**.

11. **Selecionar Artifact**
    ![Clique em sprint4:war](https://github.com/user-attachments/assets/e6b8f2a3-87c7-4a33-8bbe-abb69cc66f2a)
    - Clique em `sprint4:war` e **OK**.

12. **Mudar Application Context**
    ![Mudar application context](https://github.com/user-attachments/assets/e840feb0-5f89-4382-b30f-4c3db3520993)
    - Mude o application context para `Java_war`.

13. **Aplicar e Executar**
    ![Clique em apply e em run](https://github.com/user-attachments/assets/96f35196-de84-4c98-8ef4-57cfe08b62af)
    - Clique em **Apply** e em **Run**.

E o backend já estará rodando!

## Vercel

![image](https://github.com/user-attachments/assets/8352bdbc-2adb-42c0-b13c-7d57badd85e7)
- Para usar No Vercel demovemos abrir config e entrar em corsFilter

![image](https://github.com/user-attachments/assets/337c124d-4a6b-4fcb-830f-80698540ba3b)
- trocar http://localhost:3000 para a url do Vercel que é https://autocar-fawn.vercel.app

### Apos isso dar um reload no projeto


## Objetivo do Projeto

O objetivo do nosso projeto é desenvolver um software que permita aos usuários realizar diagnósticos e orçamentos de seus veículos por meio de uma Inteligência Artificial, tudo isso sem precisar sair de casa. Isso facilita a manutenção dos veículos e proporciona uma experiência de usuário mais conveniente.

## Tecnologias Utilizadas

Neste projeto, estamos utilizando as seguintes tecnologias:

- **Front-End**: React com TypeScript
- **Back-End**: Java
- **Chat Bot**: IBM cloud
- **Banco de Dados**: Oracle SQL Developer

## Estrutura do Projeto

### Front-End

O front-end é desenvolvido utilizando React com TypeScript, proporcionando uma interface de usuário interativa e responsiva.

### Back-End

O back-end é implementado em Java, responsável por gerenciar as requisições e a lógica do servidor.

### Inteligência Artificial

Utilizamos um chatbot através da IBM Cloud para interagir com os usuários, fornecendo diagnósticos precisos e orçamentos.

### Banco de Dados

Utilizamos o Oracle SQL Developer para gerenciar e armazenar os dados dos usuários e dos veículos.




# Páginas do Projeto

## Página Principal
![Página Principal](https://github.com/user-attachments/assets/5244f4c8-c301-4d26-a478-182ffed855a6)
- Nesta página teremos uma explicação do projeto, os diferenciais e uma seção "Sobre Nós".

## Página de Login
![Página de Login](https://github.com/user-attachments/assets/252feae4-1924-460f-9dce-b5bc11da4d4f)
- Esta será a página de login, onde teremos o campo para logar e o campo para encaminhar para a página de cadastro.

## Página de Cadastro
![Página de Cadastro](https://github.com/user-attachments/assets/36c367fd-ae8e-41c1-87f7-9f8f569da7b1)
- Esta página será para cadastrar uma oficina ou usuário, com campos de inputs que mudam conforme a seleção.

## Página do Usuário
![Página do Usuário](https://github.com/user-attachments/assets/e04d09b3-e544-47ab-9735-af519501e800)
![Página do Usuário (2)](https://github.com/user-attachments/assets/a014b65e-a36f-4375-92e0-8bc9eb574eb0)
- A página do usuário mostrará suas informações, permitindo alterar algumas delas, ver os carros cadastrados e cadastrar novos carros.

## Página de Detalhes do Carro
![Página de Detalhes do Carro](https://github.com/user-attachments/assets/42e6d091-54f0-45ae-ac49-678e5df2acd6)
- Nesta página, veremos informações detalhadas do carro, podendo alterar essas informações e visualizar os diagnósticos associados.

## Página de Início de Diagnóstico
![Página de Início de Diagnóstico](https://github.com/user-attachments/assets/59ec356e-8b9f-46e0-8b87-4ee5dfd32dd6)
- Aqui podemos iniciar um diagnóstico.

## Página de Detalhes do Diagnóstico
![Página de Detalhes do Diagnóstico](https://github.com/user-attachments/assets/233eca60-f650-4b48-9a3b-249d1fcae910)
- Nessa página, clicaremos no diagnóstico para ver informações mais detalhadas e poderemos atualizar o status para "concluído".

## Página de Interação com o Chatbot
![Página de Interação com o Chatbot](https://github.com/user-attachments/assets/51a8c601-ca81-456d-b313-5b5a15ded968)
- Aqui podemos descrever nosso problema para o chatbot, que analisará e retornará com um diagnóstico.

## Página de Dados da Oficina
![Página de Dados da Oficina](https://github.com/user-attachments/assets/1e4a009b-0965-4624-b3bb-452fbe0fdf86)
![Página de Dados da Oficina (2)](https://github.com/user-attachments/assets/7b6e1332-1638-46a6-92b9-2b1360191f08)
- Nesta página, encontraremos os dados da oficina, poderemos atualizar algumas informações e visualizar os diagnósticos ligados a essa oficina.

![Página de Dados da Oficina (3)](https://github.com/user-attachments/assets/3a4789a9-401c-4eed-b6af-39c50dbc1557)
- ela tera a mesma funcionalidade de mostrar informações de diagnostico mais detalhadas


