export default class QuebraCabeca extends Phaser.Scene {
    constructor() {
        super("QuebraCabeca");
    }

    init(data) {
        this.portaId = data.portaId;
        this.cenaOrigem = data.cenaOrigem;
        this.pecasCorretas = 0;
    }

    preload() {
        // Agora carrega 16 imagens (peca1.png até peca16.png)
        for (let i = 0; i < 16; i++) {
            this.load.image(`peca${i}`, `assets/puzzles/jigsaw/peca${i + 1}.png`);
        }
    }

    create() {
        this.add.text(400, 30, "Monta o Quebra-Cabeças (4x4)", { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);

        // 1. GERAR AS POSIÇÕES DA GRELHA 4x4
        // Assumindo que cada peça tem cerca de 100x100 pixels
        const posicoesGrelha = [];
        for (let linha = 0; linha < 4; linha++) {
            for (let coluna = 0; coluna < 4; coluna++) {
                // Começa no X:250 e Y:120 e avança 100px por cada peça
                posicoesGrelha.push({ 
                    x: 250 + (coluna * 100), 
                    y: 120 + (linha * 100) 
                });
            }
        }

        // Cria as zonas de drop (Drop Zones) para a matriz 4x4
        for (let i = 0; i < 16; i++) {
            let zone = this.add.zone(posicoesGrelha[i].x, posicoesGrelha[i].y, 100, 100).setRectangleDropZone(100, 100);
            zone.idCorreto = i;
            
            // Desenha um contorno para a zona
            let graphics = this.add.graphics();
            graphics.lineStyle(2, 0xffff00); // Linha amarela fina para veres onde as peças encaixam
            graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        }

        // 2. GERAR AS POSIÇÕES DAS PEÇAS BARALHADAS (INVENTÁRIO/BARRA)
        // Para 16 peças, vamos colocá-las em 2 linhas no fundo do ecrã
        let posicoesBarra = [];
        for (let linha = 0; linha < 2; linha++) {
            for (let coluna = 0; coluna < 8; coluna++) {
                // Distribuídas no fundo do ecrã
                posicoesBarra.push({ 
                    x: 120 + (coluna * 80), // Afastadas de 80 em 80px
                    y: 500 + (linha * 70)   // Duas linhas: Y=500 e Y=570
                });
            }
        }
        
        // Baralhar as posições onde as peças vão nascer
        Phaser.Utils.Array.Shuffle(posicoesBarra);

        // Criar as imagens das peças nas posições baralhadas
        for (let i = 0; i < 16; i++) {
            let peca = this.add.image(posicoesBarra[i].x, posicoesBarra[i].y, `peca${i}`).setInteractive();
            this.input.setDraggable(peca);
            peca.idPeca = i;
            // Guardar posição inicial para o caso de o jogador falhar o encaixe
            peca.posicaoInicial = { x: posicoesBarra[i].x, y: posicoesBarra[i].y };
        }

        // 3. LÓGICA DE ARRASTAR E LARGAR (DRAG & DROP)
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            // Puxa a peça que está a ser arrastada para a frente das outras
            this.children.bringToTop(gameObject);
        });

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (gameObject.idPeca === dropZone.idCorreto) {
                // Encaixou certo
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false; // Bloqueia a peça (já não se pode mover)
                this.pecasCorretas++;

                // Condição de Vitória (Agora são 16 peças)
                if (this.pecasCorretas === 16) {
                    this.vencerPuzzle();
                }
            } else {
                // Encaixou errado, a peça volta como um elástico para a posição inicial na barra
                this.tweens.add({
                    targets: gameObject,
                    x: gameObject.posicaoInicial.x,
                    y: gameObject.posicaoInicial.y,
                    duration: 200,
                    ease: 'Power1'
                });
            }
        });

        this.input.on('dragend', (pointer, gameObject, dropped) => {
            // Se o jogador largar a peça fora de uma zona de drop
            if (!dropped) {
                this.tweens.add({
                    targets: gameObject,
                    x: gameObject.posicaoInicial.x,
                    y: gameObject.posicaoInicial.y,
                    duration: 200,
                    ease: 'Power1'
                });
            }
        });
    }

    vencerPuzzle() {
        // Texto de feedback visual
        let txt = this.add.text(400, 300, "COMPLETO!", { 
            fontSize: '64px', 
            fill: '#0f0', 
            fontStyle: 'bold',
            backgroundColor: '#000'
        }).setOrigin(0.5);

        // Chama a porta da cena principal após 1.5 segundos e fecha o puzzle
        this.time.delayedCall(1500, () => {
            this.scene.get(this.cenaOrigem).abrirPorta(this.portaId);
            this.scene.stop();
        });
    }
}