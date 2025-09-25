# Portfólio Artur Alves Santos

**Português** | [English](#english-version)

## Sobre o Projeto

Este é o portfólio técnico de **Artur Alves Santos**, estudante de Análise e Desenvolvimento de Sistemas. O projeto foi desenvolvido com foco em simplicidade, responsividade e facilidade de deploy, utilizando tecnologias web modernas como HTML5, CSS3, PHP e Python.

### Características Principais

- **Design Responsivo**: Layout adaptável para desktop, tablet e mobile
- **Bilíngue**: Conteúdo em português e inglês
- **Tecnologias Modernas**: HTML5, CSS3, JavaScript, PHP, Python
- **Machine Learning**: Demonstração prática com scikit-learn
- **Formulário de Contato**: Sistema completo com validação e armazenamento
- **Fácil Deploy**: Compatível com GitHub Pages e hospedagem PHP básica

## Estrutura do Projeto

```
portfolio-artur-novo/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # JavaScript para interatividade
├── contact.php             # Script PHP para formulário de contato
├── demo_ml.py              # Demonstração de Machine Learning
├── images/                 # Pasta para imagens e mockups
├── README.md               # Este arquivo
└── requirements.txt        # Dependências Python (será criado)
```

## Como Usar Este Portfólio

### 1. Publicação no GitHub Pages (Apenas Front-end)

Para publicar apenas a parte front-end (HTML, CSS, JS) no GitHub Pages:

1. **Faça fork ou clone este repositório**
2. **Acesse as configurações do repositório no GitHub**
   - Vá em Settings > Pages
   - Em "Source", selecione "Deploy from a branch"
   - Escolha "main" ou "master" branch
   - Clique em "Save"

3. **Aguarde alguns minutos** e acesse seu site em:
   `https://seu-usuario.github.io/nome-do-repositorio/`

**Nota**: No GitHub Pages, o formulário de contato não funcionará pois não há suporte a PHP. Para funcionalidade completa, use hospedagem com PHP.

### 2. Hospedagem com PHP (Funcionalidade Completa)

Para usar todas as funcionalidades, incluindo o formulário de contato:

#### Requisitos do Servidor
- PHP 7.4 ou superior
- Extensão PDO_SQLITE (opcional, para banco de dados)
- Permissões de escrita na pasta do projeto

#### Passos para Deploy

1. **Faça upload de todos os arquivos** para seu servidor web
2. **Configure permissões** (chmod 755 para pastas, 644 para arquivos)
3. **Teste o formulário de contato** acessando a página
4. **Configure email** (opcional) editando `contact.php`

#### Configuração do Formulário de Contato

Edite o arquivo `contact.php` e altere as seguintes configurações:

```php
// Linha 13: Altere para seu email
define('EMAIL_DESTINO', 'seu-email@exemplo.com');

// Linha 12: Use SQLite se disponível, senão CSV
define('USE_SQLITE', true); // ou false para usar apenas CSV
```

### 3. Demonstração de Machine Learning

O projeto inclui um script Python que demonstra o uso de Machine Learning para estimar valores de projetos web.

#### Instalação das Dependências

```bash
# Criar ambiente virtual (recomendado)
python -m venv venv

# Ativar ambiente virtual
# No Windows:
venv\\Scripts\\activate
# No Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install scikit-learn pandas joblib
```

#### Executar a Demonstração

```bash
python demo_ml.py
```

O script irá:
- Gerar dados de exemplo para treinamento
- Treinar um modelo de regressão linear
- Salvar o modelo treinado
- Mostrar exemplos de predições
- Explicar como o modelo funciona

#### Arquivos Gerados

- `projeto_valor_model.pkl`: Modelo treinado
- `projeto_scaler.pkl`: Informações do modelo
- `messages.csv`: Mensagens do formulário (se não usar SQLite)
- `messages.db`: Banco SQLite (se configurado)

## Personalização do Conteúdo

### Editando Informações Pessoais

#### 1. Dados de Contato (index.html)

Procure pelas seguintes seções no arquivo `index.html` e altere conforme necessário:

```html
<!-- Seção Hero - Linha ~45 -->
<h1 class="hero-title">Seu Nome Aqui</h1>
<p class="hero-subtitle">Sua Profissão | Suas Especialidades</p>

<!-- Seção de Contato - Linha ~180 -->
<p class="text-slate-600">seu-email@exemplo.com</p>
<p class="text-slate-600">+55 11 99999-9999</p>
```

#### 2. Habilidades (index.html)

Na seção de habilidades (linha ~95), adicione ou remova tags conforme suas competências:

```html
<div class="skill-tag">Nova Habilidade</div>
```

#### 3. Projetos (index.html)

Para adicionar novos projetos, copie a estrutura de um card existente (linha ~110) e modifique:

```html
<div class="project-card">
    <div class="project-image">
        <img src="images/seu-projeto.png" alt="Descrição do Projeto">
    </div>
    <div class="project-content">
        <h3 class="project-title">Nome do Projeto</h3>
        <div class="project-description">
            <p class="description-pt">Descrição em português...</p>
            <p class="description-en">Description in English...</p>
        </div>
        <div class="project-tech">
            <span class="tech-tag">Tecnologia 1</span>
            <span class="tech-tag">Tecnologia 2</span>
        </div>
    </div>
</div>
```

### Personalizando Cores e Estilo

As cores principais estão definidas no início do arquivo `styles.css`:

```css
:root {
    --primary-color: #00aaff;     /* Cor principal (azul) */
    --secondary-color: #333;      /* Cor secundária (cinza escuro) */
    --text-color: #444;           /* Cor do texto */
    --light-bg: #f8f8f8;         /* Fundo claro */
    --white-bg: #ffffff;          /* Fundo branco */
}
```

Para alterar a paleta de cores, modifique esses valores.

### Adicionando Imagens

1. **Crie a pasta `images/`** na raiz do projeto
2. **Adicione suas imagens** (formatos recomendados: PNG, JPG, WebP)
3. **Otimize as imagens** para web (recomendado: máximo 1MB por imagem)
4. **Atualize os caminhos** no HTML

#### Tamanhos Recomendados
- **Mockups de projetos**: 400x250px
- **Ícones**: 64x64px
- **Imagens de fundo**: 1920x1080px

## Solução de Problemas

### Formulário de Contato Não Funciona

**Problema**: Mensagem de erro ao enviar formulário

**Soluções**:
1. Verifique se o PHP está instalado no servidor
2. Confirme as permissões de escrita na pasta
3. Teste se o SQLite está disponível (ou use CSV)
4. Verifique os logs de erro do servidor

### Script Python Não Executa

**Problema**: Erro "ModuleNotFoundError"

**Solução**:
```bash
pip install scikit-learn pandas joblib
```

**Problema**: Erro de permissão

**Solução**:
```bash
chmod +x demo_ml.py
```

### Layout Quebrado no Mobile

**Problema**: Site não responsivo

**Soluções**:
1. Verifique se a meta tag viewport está presente
2. Teste em diferentes tamanhos de tela
3. Use as ferramentas de desenvolvedor do navegador

## Tecnologias Utilizadas

### Front-end
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com Flexbox e Grid
- **JavaScript**: Interatividade e menu mobile
- **Google Fonts**: Tipografia (Inter)

### Back-end
- **PHP 7.4+**: Processamento do formulário
- **SQLite/CSV**: Armazenamento de mensagens

### Machine Learning
- **Python 3.8+**: Linguagem principal
- **scikit-learn**: Biblioteca de Machine Learning
- **pandas**: Manipulação de dados
- **joblib**: Serialização de modelos

### Ferramentas de Desenvolvimento
- **Git**: Controle de versão
- **GitHub Pages**: Hospedagem gratuita
- **VS Code**: Editor recomendado

## Licença

Este projeto está sob a licença MIT. Você pode usar, modificar e distribuir livremente, mantendo os créditos originais.

## Contato

**Artur Alves Santos**
- Email: arturalvessantos2@gmail.com
- Telefone: +55 11 940572858
- LinkedIn: [linkedin.com/in/artur-alves-a4b297338](https://www.linkedin.com/in/artur-alves-a4b297338)
- GitHub: [github.com/artur-source](https://github.com/artur-source)

---

## English Version

# Artur Alves Santos Portfolio

**English** | [Português](#portfólio-artur-alves-santos)

## About the Project

This is the technical portfolio of **Artur Alves Santos**, a Systems Development and Analysis student. The project was developed with a focus on simplicity, responsiveness, and easy deployment, using modern web technologies such as HTML5, CSS3, PHP, and Python.

### Key Features

- **Responsive Design**: Adaptive layout for desktop, tablet, and mobile
- **Bilingual**: Content in Portuguese and English
- **Modern Technologies**: HTML5, CSS3, JavaScript, PHP, Python
- **Machine Learning**: Practical demonstration with scikit-learn
- **Contact Form**: Complete system with validation and storage
- **Easy Deploy**: Compatible with GitHub Pages and basic PHP hosting

## Project Structure

```
portfolio-artur-novo/
├── index.html              # Main page
├── styles.css              # CSS styles
├── script.js               # JavaScript for interactivity
├── contact.php             # PHP script for contact form
├── demo_ml.py              # Machine Learning demonstration
├── images/                 # Folder for images and mockups
├── README.md               # This file
└── requirements.txt        # Python dependencies (to be created)
```

## How to Use This Portfolio

### 1. GitHub Pages Deployment (Front-end Only)

To publish only the front-end part (HTML, CSS, JS) on GitHub Pages:

1. **Fork or clone this repository**
2. **Access repository settings on GitHub**
   - Go to Settings > Pages
   - In "Source", select "Deploy from a branch"
   - Choose "main" or "master" branch
   - Click "Save"

3. **Wait a few minutes** and access your site at:
   `https://your-username.github.io/repository-name/`

**Note**: On GitHub Pages, the contact form won't work as there's no PHP support. For full functionality, use PHP hosting.

### 2. PHP Hosting (Full Functionality)

To use all features, including the contact form:

#### Server Requirements
- PHP 7.4 or higher
- PDO_SQLITE extension (optional, for database)
- Write permissions in project folder

#### Deployment Steps

1. **Upload all files** to your web server
2. **Configure permissions** (chmod 755 for folders, 644 for files)
3. **Test the contact form** by accessing the page
4. **Configure email** (optional) by editing `contact.php`

#### Contact Form Configuration

Edit the `contact.php` file and change the following settings:

```php
// Line 13: Change to your email
define('EMAIL_DESTINO', 'your-email@example.com');

// Line 12: Use SQLite if available, otherwise CSV
define('USE_SQLITE', true); // or false to use only CSV
```

### 3. Machine Learning Demonstration

The project includes a Python script that demonstrates the use of Machine Learning to estimate web project values.

#### Installing Dependencies

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\\Scripts\\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install scikit-learn pandas joblib
```

#### Run the Demonstration

```bash
python demo_ml.py
```

The script will:
- Generate example data for training
- Train a linear regression model
- Save the trained model
- Show prediction examples
- Explain how the model works

#### Generated Files

- `projeto_valor_model.pkl`: Trained model
- `projeto_scaler.pkl`: Model information
- `messages.csv`: Form messages (if not using SQLite)
- `messages.db`: SQLite database (if configured)

## Content Customization

### Editing Personal Information

#### 1. Contact Data (index.html)

Look for the following sections in the `index.html` file and change as needed:

```html
<!-- Hero Section - Line ~45 -->
<h1 class="hero-title">Your Name Here</h1>
<p class="hero-subtitle">Your Profession | Your Specialties</p>

<!-- Contact Section - Line ~180 -->
<p class="text-slate-600">your-email@example.com</p>
<p class="text-slate-600">+55 11 99999-9999</p>
```

#### 2. Skills (index.html)

In the skills section (line ~95), add or remove tags according to your competencies:

```html
<div class="skill-tag">New Skill</div>
```

#### 3. Projects (index.html)

To add new projects, copy the structure of an existing card (line ~110) and modify:

```html
<div class="project-card">
    <div class="project-image">
        <img src="images/your-project.png" alt="Project Description">
    </div>
    <div class="project-content">
        <h3 class="project-title">Project Name</h3>
        <div class="project-description">
            <p class="description-pt">Descrição em português...</p>
            <p class="description-en">Description in English...</p>
        </div>
        <div class="project-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
    </div>
</div>
```

### Customizing Colors and Style

The main colors are defined at the beginning of the `styles.css` file:

```css
:root {
    --primary-color: #00aaff;     /* Primary color (blue) */
    --secondary-color: #333;      /* Secondary color (dark gray) */
    --text-color: #444;           /* Text color */
    --light-bg: #f8f8f8;         /* Light background */
    --white-bg: #ffffff;          /* White background */
}
```

To change the color palette, modify these values.

### Adding Images

1. **Create the `images/` folder** in the project root
2. **Add your images** (recommended formats: PNG, JPG, WebP)
3. **Optimize images** for web (recommended: maximum 1MB per image)
4. **Update paths** in HTML

#### Recommended Sizes
- **Project mockups**: 400x250px
- **Icons**: 64x64px
- **Background images**: 1920x1080px

## Troubleshooting

### Contact Form Not Working

**Problem**: Error message when submitting form

**Solutions**:
1. Check if PHP is installed on the server
2. Confirm write permissions in the folder
3. Test if SQLite is available (or use CSV)
4. Check server error logs

### Python Script Not Running

**Problem**: "ModuleNotFoundError" error

**Solution**:
```bash
pip install scikit-learn pandas joblib
```

**Problem**: Permission error

**Solution**:
```bash
chmod +x demo_ml.py
```

### Broken Layout on Mobile

**Problem**: Site not responsive

**Solutions**:
1. Check if viewport meta tag is present
2. Test on different screen sizes
3. Use browser developer tools

## Technologies Used

### Front-end
- **HTML5**: Semantic and accessible structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Interactivity and mobile menu
- **Google Fonts**: Typography (Inter)

### Back-end
- **PHP 7.4+**: Form processing
- **SQLite/CSV**: Message storage

### Machine Learning
- **Python 3.8+**: Main language
- **scikit-learn**: Machine Learning library
- **pandas**: Data manipulation
- **joblib**: Model serialization

### Development Tools
- **Git**: Version control
- **GitHub Pages**: Free hosting
- **VS Code**: Recommended editor

## License

This project is under the MIT license. You can use, modify, and distribute freely, maintaining the original credits.

## Contact

**Artur Alves Santos**
- Email: arturalvessantos2@gmail.com
- Phone: +55 11 940572858
- LinkedIn: [linkedin.com/in/artur-alves-a4b297338](https://www.linkedin.com/in/artur-alves-a4b297338)
- GitHub: [github.com/artur-source](https://github.com/artur-source)

---

*Portfolio developed with ❤️ by Artur Alves Santos*

