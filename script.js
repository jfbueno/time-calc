const calcUrl = 'https://ohtdcdovni.execute-api.us-west-2.amazonaws.com/prod/calcTime';

window.onload = init;

let inputHoraInicio, inputTempoConsulta, inputQuantidadeConsultas, form;

function init() {
    document.querySelector('#btn-calcular').addEventListener('click', btCalcularClick);
    inputHoraInicio = document.querySelector('#hora-inicio');
    inputTempoConsulta = document.querySelector('#tempo-consulta');
    inputQuantidadeConsultas = document.querySelector('#qtd-consultas');
    form = document.querySelector('form');

    document.querySelector('.alert button.close').addEventListener('click', function() {
        this.parentNode.classList.add('hidden')
    });
}

function btCalcularClick() {
    if(!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const payload = {
        'qtdMinutos': parseInt(inputTempoConsulta.value),
        'qtdConsultas': parseInt(inputQuantidadeConsultas.value),
        'horaInicio': inputHoraInicio.value
    };

    const requestConfig = {        
        method: 'POST',
        body: JSON.stringify(payload)
    };
    
    fetch(calcUrl, requestConfig).then((response) => {        
        return response.json();
    })
    .then((payload) => {
        const elementResultado = document.querySelector('#alert-resultado');      
        elementResultado.classList.remove('hidden');

        elementResultado.querySelector('span').innerHTML = `As consultas terminarão às ${payload.horaFinal}`;
    });
}