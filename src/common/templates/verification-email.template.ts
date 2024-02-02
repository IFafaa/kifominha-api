export function verificationEmailTemplate(code: string): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #666;
            }
    
            .verification-code {
                font-size: 24px;
                font-weight: bold;
                color: #007bff;
                margin-bottom: 20px;
            }
    
            .cta-button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 3px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Verificação de E-mail</h2>
            <p>Obrigado por se cadastrar! Utilize o código de verificação abaixo para confirmar seu endereço de e-mail.</p>
            <p class="verification-code">Seu código de verificação: <strong>${code}</strong></p>
            <p>Insira este código no aplicativo para completar o processo.</p>
            <p>Se você não solicitou esta verificação, por favor, ignore este e-mail.</p>
        </div>
    </body>
    </html>
    `;
}
