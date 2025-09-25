<?php
/**
 * Script PHP para processar formulário de contato
 * Portfólio Artur Alves Santos
 * 
 * INSTRUÇÕES PARA CONFIGURAÇÃO:
 * 1. Para usar SQLite, certifique-se de que a extensão PDO_SQLITE esteja habilitada
 * 2. Para usar apenas CSV, defina USE_SQLITE como false
 * 3. Altere o EMAIL_DESTINO para seu email real
 * 4. Configure as permissões de escrita na pasta onde estão os arquivos
 */

// Configurações
define('USE_SQLITE', true); // Mude para false se não tiver SQLite disponível
define('EMAIL_DESTINO', 'arturalvessantos2@gmail.com'); // Altere para seu email
define('CSV_FILE', 'messages.csv');
define('DB_FILE', 'messages.db');

// Headers para permitir requisições CORS (se necessário)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Função para sanitizar dados de entrada
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Função para validar email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Função para inicializar banco SQLite
function initDatabase() {
    try {
        $pdo = new PDO('sqlite:' . DB_FILE);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Criar tabela se não existir
        $sql = "CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            mensagem TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )";
        
        $pdo->exec($sql);
        return $pdo;
    } catch(PDOException $e) {
        error_log("Erro ao inicializar banco: " . $e->getMessage());
        return false;
    }
}

// Função para salvar no SQLite
function saveToDatabase($nome, $email, $mensagem) {
    $pdo = initDatabase();
    if (!$pdo) return false;
    
    try {
        $stmt = $pdo->prepare("INSERT INTO messages (nome, email, mensagem) VALUES (?, ?, ?)");
        return $stmt->execute([$nome, $email, $mensagem]);
    } catch(PDOException $e) {
        error_log("Erro ao salvar no banco: " . $e->getMessage());
        return false;
    }
}

// Função para salvar no CSV
function saveToCSV($nome, $email, $mensagem) {
    $file_exists = file_exists(CSV_FILE);
    $file = fopen(CSV_FILE, 'a');
    
    if (!$file) {
        error_log("Erro: Não foi possível abrir o arquivo CSV");
        return false;
    }
    
    // Se o arquivo não existir, adicionar cabeçalho
    if (!$file_exists) {
        fputcsv($file, ['ID', 'Nome', 'Email', 'Mensagem', 'Data/Hora']);
    }
    
    // Gerar ID simples baseado no timestamp
    $id = time() . rand(100, 999);
    $data_hora = date('Y-m-d H:i:s');
    
    $result = fputcsv($file, [$id, $nome, $email, $mensagem, $data_hora]);
    fclose($file);
    
    return $result !== false;
}

// Processar formulário apenas se for POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];
    $success = false;
    
    // Validar e sanitizar dados
    $nome = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
    $mensagem = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
    
    // Validações
    if (empty($nome)) {
        $errors[] = "Nome é obrigatório";
    }
    
    if (empty($email)) {
        $errors[] = "Email é obrigatório";
    } elseif (!validateEmail($email)) {
        $errors[] = "Email inválido";
    }
    
    if (empty($mensagem)) {
        $errors[] = "Mensagem é obrigatória";
    }
    
    // Se não há erros, processar
    if (empty($errors)) {
        // Tentar salvar no banco de dados ou CSV
        if (USE_SQLITE) {
            $saved = saveToDatabase($nome, $email, $mensagem);
        } else {
            $saved = saveToCSV($nome, $email, $mensagem);
        }
        
        if ($saved) {
            $success = true;
            
            // Opcional: Enviar email (descomente se tiver configuração de email)
            /*
            $subject = "Nova mensagem do portfólio - $nome";
            $body = "Nome: $nome\nEmail: $email\nMensagem:\n$mensagem";
            $headers = "From: $email\r\nReply-To: $email\r\n";
            
            mail(EMAIL_DESTINO, $subject, $body, $headers);
            */
        } else {
            $errors[] = "Erro ao salvar mensagem. Tente novamente.";
        }
    }
    
    // Resposta JSON para requisições AJAX
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
        strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
        
        header('Content-Type: application/json');
        echo json_encode([
            'success' => $success,
            'errors' => $errors,
            'message' => $success ? 'Mensagem enviada com sucesso!' : 'Erro ao enviar mensagem.'
        ]);
        exit;
    }
    
    // Resposta HTML normal
    ?>
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resultado do Contato - Artur Alves Santos</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Inter', sans-serif;
                background-color: #f8f8f8;
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .result-container {
                background: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.08);
                text-align: center;
                max-width: 500px;
                width: 100%;
            }
            .success {
                color: #00aa00;
            }
            .error {
                color: #cc0000;
            }
            .btn {
                display: inline-block;
                padding: 12px 25px;
                background-color: #00aaff;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                transition: background-color 0.3s ease;
            }
            .btn:hover {
                background-color: #0088cc;
            }
        </style>
    </head>
    <body>
        <div class="result-container">
            <?php if ($success): ?>
                <h2 class="success">✓ Mensagem Enviada com Sucesso!</h2>
                <p>Obrigado pelo contato, <strong><?php echo htmlspecialchars($nome); ?></strong>!</p>
                <p>Sua mensagem foi recebida e responderei em breve no email <strong><?php echo htmlspecialchars($email); ?></strong>.</p>
            <?php else: ?>
                <h2 class="error">✗ Erro ao Enviar Mensagem</h2>
                <p>Ocorreram os seguintes erros:</p>
                <ul style="text-align: left; color: #cc0000;">
                    <?php foreach ($errors as $error): ?>
                        <li><?php echo htmlspecialchars($error); ?></li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
            
            <a href="index.html" class="btn">← Voltar ao Portfólio</a>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// Se não for POST, redirecionar para o index
header('Location: index.html');
exit;
?>

