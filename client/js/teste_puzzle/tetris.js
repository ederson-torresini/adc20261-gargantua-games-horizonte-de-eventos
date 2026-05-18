export default class tetris extends Phaser.Scene {
    constructor() { super("tetris"); }

    init(data) {
        this.portaId = data.portaId;
        this.cenaOrigem = data.cenaOrigem;
    }

    create() {
        this.linhasLimpas = 0;
        this.add.text(400, 30, "Limpa 1 linha para abrir a porta!", { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

        // Grelha 10x20
        this.grelhaLogica = Array.from({length: 20}, () => Array(10).fill(0));
        this.blocosVisuais = [];

        // Fundo da Grelha (Centro)
        this.add.rectangle(400, 320, 200, 400, 0x111111).setStrokeStyle(2, 0xffffff);

        // Peça atual simulada (Mecânica base)
        this.pecaAtual = { x: 4, y: 0, formato: [[1,1],[1,1]] }; // Quadrado
        this.desenharPeca();

        this.input.keyboard.on('keydown-LEFT', () => this.moverPeca(-1));
        this.input.keyboard.on('keydown-RIGHT', () => this.moverPeca(1));
        this.input.keyboard.on('keydown-DOWN', () => this.cairPeca());

        // Temporizador de queda
        this.time.addEvent({ delay: 500, callback: this.cairPeca, callbackScope: this, loop: true });
    }

    moverPeca(direcao) {
        this.pecaAtual.x += direcao;
        // Lógica simplificada de colisão lateral
        if (this.pecaAtual.x < 0) this.pecaAtual.x = 0;
        if (this.pecaAtual.x > 8) this.pecaAtual.x = 8; 
        this.desenharPeca();
    }

    cairPeca() {
        if (this.pecaAtual.y < 18) {
            this.pecaAtual.y++;
            this.desenharPeca();
        } else {
            // Fixa a peça no fundo (simplificação)
            this.verificarLinha();
            this.pecaAtual.y = 0; // Nova peça
        }
    }

    desenharPeca() {
        if (this.gfx) this.gfx.destroy();
        this.gfx = this.add.graphics({ fillStyle: { color: 0xff0000 } });
        // Tamanho do bloco = 20px. Início grelha: X: 300, Y: 120
        this.gfx.fillRect(300 + this.pecaAtual.x * 20, 120 + this.pecaAtual.y * 20, 40, 40); // Desenha o 2x2
    }

    verificarLinha() {
        this.linhasLimpas++; // Fictício para a demo. Lógica real: validar `this.grelhaLogica`.
        if (this.linhasLimpas >= 1) { // Ao encaixar, abre a porta
            this.scene.get(this.cenaOrigem).abrirPorta(this.portaId);
            this.scene.stop();
        }
    }
}