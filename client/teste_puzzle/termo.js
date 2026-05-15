export default class termo extends Phaser.Scene {
    constructor() { super("termo"); }

    init(data) {
        this.portaId = data.portaId;
        this.cenaOrigem = data.cenaOrigem;
    }

    create() {
        this.palavraCerta = "PERDI"; // Palavra a adivinhar
        this.tentativaAtual = 0;
        this.letraAtual = 0;
        this.grelha = [];
        this.gameOver = false;

        this.add.text(400, 50, "Descobre a Palavra (5 Letras)", { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);

        // Criar grelha 6x5
        for (let i = 0; i < 6; i++) {
            this.grelha[i] = [];
            for (let j = 0; j < 5; j++) {
                let rect = this.add.rectangle(250 + j * 60, 150 + i * 60, 50, 50, 0x333333).setStrokeStyle(2, 0xffffff);
                let txt = this.add.text(250 + j * 60, 150 + i * 60, "", { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
                this.grelha[i].push({ rect: rect, txt: txt, valor: "" });
            }
        }

        this.input.keyboard.on('keydown', this.tratarTeclado, this);
    }

    tratarTeclado(event) {
        if (this.gameOver) return;

        let tecla = event.key.toUpperCase();

        if (tecla === 'ENTER' && this.letraAtual === 5) {
            this.verificarPalavra();
        } else if (tecla === 'BACKSPACE' && this.letraAtual > 0) {
            this.letraAtual--;
            this.grelha[this.tentativaAtual][this.letraAtual].txt.setText("");
            this.grelha[this.tentativaAtual][this.letraAtual].valor = "";
        } else if (/^[A-Z]$/.test(tecla) && this.letraAtual < 5) {
            this.grelha[this.tentativaAtual][this.letraAtual].txt.setText(tecla);
            this.grelha[this.tentativaAtual][this.letraAtual].valor = tecla;
            this.letraAtual++;
        }
    }

    verificarPalavra() {
        let palavraInserida = this.grelha[this.tentativaAtual].map(celula => celula.valor).join("");
        let corretas = 0;

        for (let i = 0; i < 5; i++) {
            let celula = this.grelha[this.tentativaAtual][i];
            if (celula.valor === this.palavraCerta[i]) {
                celula.rect.setFillStyle(0x00ff00); // Verde (certo na posição certa)
                corretas++;
            } else if (this.palavraCerta.includes(celula.valor)) {
                celula.rect.setFillStyle(0xffff00); // Amarelo (certo na posição errada)
            } else {
                celula.rect.setFillStyle(0x555555); // Cinzento (errado)
            }
        }

        if (corretas === 5) {
            this.gameOver = true;
            this.time.delayedCall(1000, () => {
                this.scene.get(this.cenaOrigem).abrirPorta(this.portaId);
                this.scene.stop();
            });
        } else {
            this.tentativaAtual++;
            this.letraAtual = 0;
            if (this.tentativaAtual >= 6) {
                // Falhou - Podes adicionar lógica de reiniciar aqui
                this.scene.restart();
            }
        }
    }
}