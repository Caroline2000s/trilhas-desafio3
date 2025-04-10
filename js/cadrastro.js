// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o formulário pelo ID
    const form = document.getElementById('formInscricao');

    // Preenche automaticamente os campos com os dados salvos no localStorage
    preencherCamposSalvos();

    // Escuta qualquer alteração no formulário para salvar os dados automaticamente
    form.addEventListener('input', function () {
        // Cria um objeto com os dados preenchidos nos campos
        const dados = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            dataNascimento: document.getElementById('dataNascimento').value,
            curso: document.getElementById('curso').value,
            usuarioId: document.getElementById('usuarioId').value,
            senha: document.getElementById('senha').value
        };

        // Salva o objeto como string no localStorage
        localStorage.setItem('formInscricao', JSON.stringify(dados));
    });

    // Evento de envio do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Captura e limpa os valores dos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const dataNascimento = document.getElementById('dataNascimento').value;
        const curso = document.getElementById('curso').value;
        const usuarioId = document.getElementById('usuarioId').value.trim();
        const senha = document.getElementById('senha').value;

        // Verifica se algum campo está vazio
        if (!nome || !email || !dataNascimento || !curso || !usuarioId || !senha) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validação do nome (mínimo 3 caracteres)
        if (nome.length < 3) {
            alert('Por favor, informe um nome válido com pelo menos 3 caracteres.');
            return;
        }

        // Validação do e-mail usando regex
        if (!validarEmail(email)) {
            alert('Por favor, informe um e-mail válido.');
            return;
        }

        // Validação da idade (mínimo 16 anos)
        if (!validarIdade(dataNascimento)) {
            alert('Você deve ter pelo menos 16 anos para se inscrever.');
            return;
        }

        // Validação do ID do usuário
        if (usuarioId.length < 3) {
            alert('O ID do Usuário deve ter pelo menos 3 caracteres.');
            return;
        }

        // Validação da senha
        if (senha.length < 6) {
            alert('A senha deve conter pelo menos 6 caracteres.');
            return;
        }

        // Se tudo estiver certo, mostra mensagem e reseta o formulário
        alert('Inscrição enviada com sucesso!');
        form.reset(); // Limpa os campos

        // Remove os dados salvos
        localStorage.removeItem('formInscricao');
    });

    // Função para preencher os campos com os dados salvos (caso existam)
    function preencherCamposSalvos() {
        const dadosSalvos = localStorage.getItem('formInscricao');

        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            document.getElementById('nome').value = dados.nome || '';
            document.getElementById('email').value = dados.email || '';
            document.getElementById('dataNascimento').value = dados.dataNascimento || '';
            document.getElementById('curso').value = dados.curso || '';
            document.getElementById('usuarioId').value = dados.usuarioId || '';
            document.getElementById('senha').value = dados.senha || '';
        }
    }

    // Função para validar formato de e-mail
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para validar idade mínima de 16 anos com base na data de nascimento
    function validarIdade(dataNascimento) {
        if (!dataNascimento) return false;

        const hoje = new Date();
        const nascimento = new Date(dataNascimento);

        if (isNaN(nascimento.getTime())) return false;

        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        return Number.isInteger(idade) && idade >= 16;
    }
});
