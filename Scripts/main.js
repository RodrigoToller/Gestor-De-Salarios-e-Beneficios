$(document).ready(function() {
    let boolCalc = false;
    $(".control-feriado").hide();
    $(".control-feriado-horas").hide();
    const valorReifeicao = $('#valorRefeicao');
    const valorFeriado = $('#valor-feriado');
    const resultadoView = $('#resultadoView');
    const Meses = {
        Janeiro: 1,
        Fevereiro: 2,
        Março: 3,
        Abril: 4,
        Maio: 5,
        Junho: 6,
        Julho: 7,
        Agosto: 8,
        Setembro: 9,
        Outubro: 10,
        Novembro: 11,
        Dezembro: 12
    };
    const DiasDaSemana = {
        DOMINGO: 0,
        SEGUNDA: 1,
        TERCA: 2,
        QUARTA: 3,
        QUINTA: 4,
        SEXTA: 5,
        SABADO: 6
    };
    function gerarSelect() {
        const select = $('#selectMeses');

        // Itera sobre o objeto Meses
        $.each(Meses, function(nomeMes, numeroMes) {
            // Cria uma nova opção e a adiciona ao select
            $('<option>').val(numeroMes).text(nomeMes).appendTo(select);
        });
    }
    gerarSelect();
    function ehDiaUtil(data) {
        const diaDaSemana = data.getDay();
        return diaDaSemana !== DiasDaSemana.DOMINGO && diaDaSemana !== DiasDaSemana.SABADO;
    }
    function getDiasNoMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
    }
    function getDiasUteisNoMes(mes, ano) {
        let diasUteis = 0;
        const diasNoMes = getDiasNoMes(mes, ano);
        for (let dia = 1; dia <= diasNoMes; dia++) {
            const data = new Date(ano, mes - 1, dia);
            if (ehDiaUtil(data)) {
                diasUteis++;
            }
    }

    return diasUteis;
    }
    // Função para lidar com a mudança de seleção no select
    $('#selectMeses').change(function() {
        const mesSelecionado = $(this).val();
        const anoAtual = new Date().getFullYear();
        const diasUteis = getDiasUteisNoMes(mesSelecionado, anoAtual);

        console.log(`O mês selecionado tem ${diasUteis} dias úteis.`);
    });
    $('#btnCalcular').click(function() {
        const mesSelecionado = $('#selectMeses').val();
        const anoAtual = new Date().getFullYear();
        let calcularVR = 0;
        if(!getCheckBoxStatus()){
                diasUteis = getDiasUteisNoMes(mesSelecionado, anoAtual);
                console.log(`O mês selecionado tem ${diasUteis} dias úteis.`);
                calcularVR = diasUteis * valorReifeicao.val();
                console.log(`O valor de VR do mês é de R$ ${calcularVR}`);
        }
       else if( getCheckBoxStatus() && valorFeriado.val() < 1)
        {
            alert("Por favor, insira o valor do feriado");
        }

        else if (getCheckBoxStatus() && valorFeriado != null ){
  
            diasUteis = getDiasUteisNoMes(mesSelecionado, anoAtual);
            diasUteis = diasUteis - valorFeriado.val();
            console.log(`Após subtrair os feriados, o mês selecionado tem ${diasUteis} dias úteis.`);
            calcularVR = diasUteis * valorReifeicao.val();
            console.log(`O valor de VR do mês é de R$ ${calcularVR}`);
        }

        AtualizarView(diasUteis, calcularVR);

        if(boolCalc == false){
            resultadoView.toggleClass('vr-resultado-active');
            boolCalc = true;
        }


    });

    $('button-fechar').click(function(){
        resultadoView.toggleClass('vr-resultado-active');
        boolCalc = false;
    });
    function AtualizarView(diasUteis, calcularVR){

        $('#mes-view').text(`O mês selecionado tem ${diasUteis} dias úteis.`);
        $('#valor-view').text(`O valor total do mês é de R$ ${calcularVR}`);


    }
    function getCheckBoxStatus(){
   
        const isChecked = $('#temFeriado').is(':checked');
        return isChecked;
   
    }
    function updateCheckboxStatus() {
        let isChecked = getCheckBoxStatus();
        console.log(`Checkbox está: ${isChecked}`);

        if (isChecked) {
            $(".control-feriado").show();
        } else {
            $(".control-feriado").hide();
        }


    }
    $('#temFeriado').change(function() {
        updateCheckboxStatus();
    });
    function gerarSelectHORAS() {
        const select = $('#selectMesesHoras');

        // Itera sobre o objeto Meses
        $.each(Meses, function(nomeMes, numeroMes) {
            // Cria uma nova opção e a adiciona ao select
            $('<option>').val(numeroMes).text(nomeMes).appendTo(select);
        });
    }
    gerarSelectHORAS();
    $('#selectMesesHoras').change(function() {
        const mesSelecionado = $(this).val();
        const anoAtual = new Date().getFullYear();
        const diasUteis = getDiasUteisNoMes(mesSelecionado, anoAtual);

        console.log(`O mês selecionado tem ${diasUteis} dias úteis.`);
    });
    function getCheckBoxStatusHORAS(){
   
        const isChecked = $('#temFeriadoHORAS').is(':checked');
        return isChecked;
   
    }
    function updateCheckboxStatusHORAS() {
        let isChecked = getCheckBoxStatusHORAS();

        console.log(`Checkbox está: ${isChecked}`);

        if (isChecked) {
            $(".control-feriado-horas").show();
        } else {
            $(".control-feriado-horas").hide();
        }


    }
    $('#temFeriadoHORAS').change(function() {
        updateCheckboxStatusHORAS();
    });






    const valorHORA = $('#valorHora');
    const valorFeriadoHORAS = $('#valor-feriado-horas');
    const resultadoViewHORAS = $('#resultadoViewhoras');



$('#btnCalcularHoras').click(function() {
        const mesSelecionado = $('#selectMesesHoras').val();
        const anoAtual = new Date().getFullYear();
        let calcularHORA = 0;
        if(!getCheckBoxStatusHORAS()){
                diasUteis = getDiasUteisNoMes(mesSelecionado, anoAtual);
                console.log(`O mês selecionado tem ${diasUteis} dias úteis.`);
                calcularHORA = diasUteis * valorHORA.val();
                console.log(`O valor de VR do mês é de R$ ${calcularHORA}`);
        }
       else if( getCheckBoxStatusHORAS() && valorFeriadoHORAS.val() < 1)
        {
            alert("Por favor, insira o valor do feriado");
        }

        else if (getCheckBoxStatusHORAS() && valorFeriadoHORAS != null ){
  
            diasUteis = getDiasUteisNoMes(mesSelecionado, anoAtual);
            diasUteis = diasUteis - valorvalorFeriadoHORASFeriado.val();
            console.log(`Após subtrair os feriados, o mês selecionado tem ${diasUteis} dias úteis.`);
            calcularHORA = diasUteis * valorHORA.val();
            console.log(`O valor de VR do mês é de R$ ${calcularHORA}`);
        }
        AtualizarViewhora(diasUteis, calcularHORA);
        if(boolCalc == false){
            resultadoViewHORAS.toggleClass('');
            boolCalc = true;
        }


    });
    function AtualizarViewhora(diasUteis, calcularHORA){

        $('#mes-view-hora').text(`O mês selecionado tem ${diasUteis} dias úteis.`);
        $('#valor-view-hora').text(`O valor total do mês é de R$ ${calcularHORA}`);


    }








});