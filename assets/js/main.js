function meuEscopo() {

    // VARIÁVEIS E SELETORES

    const container = document.querySelector(".container");
    const initial = document.querySelector("#initial");
    const formDir = document.querySelector(".form-dir");
    const formRange = document.querySelector(".form-range");
    const directionVariation = document.querySelector("#direction-variation");
    const rangeVariation = document.querySelector("#range-variation");
    const resultDir = document.querySelector("#result-dir");
    const resultRange = document.querySelector("#result-range");

    const mecDir = 15;
    const mecElev = 9;

    // FUNÇÕES

    function getDirection() {
        const inputTargetDistance = document.querySelector(".target-distance");
        const inputLaunchVariation = document.querySelector(".launch-variation");
        const selectTrendVariation = document.querySelector(".trend-variation");

        const distance = Number(inputTargetDistance.value);
        const variation = Number(inputLaunchVariation.value);
        const trend = selectTrendVariation.value;

        const info = {
            whatDistance: distance,
            whatVariation: variation,
            whatTrend: trend
        };
        return info;
    };

    function getRange() {
        const inputTargetDistance = document.querySelector("#target-distance");
        const inputLaunchVariation = document.querySelector("#launch-variation");
        const selectTrendVariation = document.querySelector("#trend-variation");

        const distance = Number(inputTargetDistance.value);
        const variation = Number(inputLaunchVariation.value);
        const trend = selectTrendVariation.value;

        const info = {
            whatDistance: distance,
            whatVariation: variation,
            whatTrend: trend
        };
        return info;
    };

    function calculateDirection() {
        const { whatDistance, whatVariation, whatTrend } = getDirection();
        if (whatDistance > 5800) {
            return alert("O alcance máximo desse Equipamento é de 5.800 metros. Ajuste a distância do alvo!");
        } else if (whatVariation < 40) {
            return alert("O tiro está dentro do raio de ação letal de 40m da granada. Não é necessário ajuste!");
        } else if (whatDistance < 190) {
            return alert("Você não pode executar um lançamento com uma distancia menor que a zona de perigo (190m)");
        };
        const milesimal = ((whatVariation * 1000) / whatDistance);
        const result = milesimal / mecDir;
        const trend = (whatTrend === "left") ? "Direita" : "Esquerda";
        let fix;
        if (result >= 14) {
            fix = "Você excedeu a capacidade do Mecanismo de Direção. Realize um novo comando de tiro."
            resultDir.innerHTML = fix;
            resultDir.classList.remove("hide");
        } else {
            fix = `AJUSTE: ${trend} ${result.toFixed(1)} volta(s).`;
            resultDir.innerHTML = "";
            resultDir.innerHTML = fix;
            resultDir.classList.remove("hide");
        };
    };

    function calculateRange() {
        const { whatDistance, whatVariation, whatTrend } = getRange();
        if (whatDistance > 5800) {
            return alert("O alcance máximo desse Equipamento é de 5.800 metros. Ajuste a distância do alvo!");
        } else if (whatVariation < 40) {
            return alert("O tiro está dentro do raio de ação letal de 40m da granada. Não é necessário ajuste!");
        } else if (whatDistance < 190) {
            return alert("Você não pode executar um lançamento com uma distancia menor que a zona de perigo (190m)");
        };
        const milesimal = ((whatVariation * 1000) / whatDistance);
        const result = milesimal / mecElev;
        const trend = (whatTrend === "above") ? "Encurte" : "Alongue";
        let fix;
        if (result >= 25) {
            fix = "Você excedeu a capacidade do Mecanismo de Elevação. Realize um novo comando de tiro."
            resultRange.innerHTML = fix;
            resultRange.classList.remove("hide");;
        } else {
            fix = `AJUSTE: ${trend} ${result.toFixed(1)} volta(s).`;
            resultRange.innerHTML = "";
            resultRange.innerHTML = fix;
            resultRange.classList.remove("hide");
        };
    };

    // EVENTOS

    document.addEventListener("click", (e) => {
        const elemento = e.target;

        if (elemento.classList.contains("direction")) {
            directionVariation.classList.remove("hide");
            rangeVariation.classList.add("hide");

        } else if (elemento.classList.contains("range")) {
            rangeVariation.classList.remove("hide");
            directionVariation.classList.add("hide");
        };
    });

    formDir.addEventListener("submit", (e) => {
        e.preventDefault();
        calculateDirection();
    });

    formRange.addEventListener("submit", (e) => {
        e.preventDefault();
        calculateRange();
    });

    formDir.addEventListener("reset", () => {
        resultDir.innerHTML = "";
    });

    formRange.addEventListener("reset", () => {
        resultRange.innerHTML = "";
    });

};

meuEscopo();