document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formLogin');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede envio padrão

        const usuario = document.getElementById('usuario').value.trim();
        const senha = document.getElementById('senha').value;

        // Usuário de teste fixo
        const usuarioTeste = "teste123";
        const senhaTeste = "senha123";

        // Verifica se os campos estão preenchidos
        if (!usuario || !senha) {
            alert("Preencha todos os campos.");
            return;
        }

        // Valida as credenciais
        if (usuario === usuarioTeste && senha === senhaTeste) {
            alert("Login realizado com sucesso!");
            // Aqui você pode redirecionar para outra página, se quiser:
            // window.location.href = "painel.html";
        } else {
            alert("ID ou senha inválidos.");
        }
    });
});
