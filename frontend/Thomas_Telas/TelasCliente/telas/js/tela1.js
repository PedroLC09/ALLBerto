/* BOTTOM SHEET */

const sheet =
document.getElementById(
    "bottomSheet"
);

const handle =
document.getElementById(
    "handle"
);

let estado = 0;

handle.onclick = () => {

    estado++;

    if(estado > 2)
        estado = 0;

    switch(estado){

        case 0:
            sheet.style.height =
            "180px";
        break;

        case 1:
            sheet.style.height =
            "50%";
        break;

        case 2:
            sheet.style.height =
            "90%";
        break;
    }

};

/* FILTROS */

document
.querySelectorAll(".filter-btn")
.forEach(btn => {

    btn.onclick = () => {

        btn.classList.toggle(
            "active"
        );

    };

});

/* PINS */

document
.querySelectorAll(".pin")
.forEach(pin => {

    pin.onclick = () => {

        sheet.style.height =
        "90%";

        estado = 2;

    };

});

/* VAGAS */

const vagas =
document.getElementById(
    "vagas"
);

const estados = [

    "livre",
    "ocupada",
    "reservada"

];

for(let i=0;i<30;i++){

    const vaga =
    document.createElement(
        "div"
    );

    const estado =

    estados[
        Math.floor(
            Math.random()*3
        )
    ];

    vaga.classList.add(
        "vaga",
        estado
    );

    vaga.onclick = () => {

        if(
            vaga.classList.contains(
                "ocupada"
            )
        ) return;

        document
        .querySelectorAll(".vaga")
        .forEach(v => {

            v.classList.remove(
                "selecionada"
            );

        });

        vaga.classList.add(
            "selecionada"
        );

    };

    vagas.appendChild(vaga);

}

/* SIMULAÇÃO TEMPO REAL */

setInterval(() => {

    const todas =
    document.querySelectorAll(
        ".vaga"
    );

    const vaga =
    todas[
        Math.floor(
            Math.random()*
            todas.length
        )
    ];

    vaga.classList.remove(
        "livre",
        "ocupada",
        "reservada"
    );

    vaga.classList.add(

        estados[
            Math.floor(
                Math.random()*3
            )
        ]

    );

},5000);