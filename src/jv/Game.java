package jv;

public class Game {
	JVEnum[][] table = {    
							{JVEnum.EMPTY, JVEnum.EMPTY, JVEnum.EMPTY}, 
							{JVEnum.EMPTY, JVEnum.EMPTY, JVEnum.EMPTY},
							{JVEnum.EMPTY, JVEnum.EMPTY, JVEnum.EMPTY}
				       };
		
	// Controla qual o jogador atual do jogo
	JVEnum actualPlayer = JVEnum.O;	
	
	private boolean win(Pos pos1, Pos pos2, Pos pos3, JVEnum player) {
		boolean result = (table[pos1.getLine()][pos1.getCol()] == player) &&
						 (table[pos2.getLine()][pos2.getCol()] == player) &&
						 (table[pos3.getLine()][pos3.getCol()] == player);
		
		if (result) {
			System.out.println("O jogardor " + player.toString() + " é o vencedor. Parabéns!");
		}
		
		return result;
	}

	private boolean canWin(JVEnum player) {
		return true;
		
		// Aqui imprimir que o jogo empatou
	}
	
	private boolean gameFinished(JVEnum player) {
		// Análise transversal
		//-------------------------------------------------------------------------
		if (this.win(new Pos(0,0), new Pos(1, 1), new Pos(2, 2), player)) {
			return true;
		}
		
		if (this.win(new Pos(0,2), new Pos(1, 1), new Pos(2, 0), player)) {
			return true;
		}
		//-------------------------------------------------------------------------
		
		// Análise vertical
		//-------------------------------------------------------------------------
		if (this.win(new Pos(0,0), new Pos(1, 0), new Pos(2, 0), player)) {
			return true;
		}
		
		if (this.win(new Pos(0,1), new Pos(1, 1), new Pos(2, 1), player)) {
			return true;
		}		
		
		if (this.win(new Pos(0,2), new Pos(1, 2), new Pos(2, 2), player)) {
			return true;
		}
		//-------------------------------------------------------------------------
		
		// Análise horizontal
		//-------------------------------------------------------------------------
		if (this.win(new Pos(0,0), new Pos(0, 1), new Pos(0, 2), player)) {
			return true;
		}
		
		if (this.win(new Pos(1,0), new Pos(1, 1), new Pos(1, 2), player)) {
			return true;
		}
		
		if (this.win(new Pos(2,0), new Pos(2, 1), new Pos(2, 2), player)) {
			return true;
		}
		//-------------------------------------------------------------------------
		
		return false;
	}
	
	private void printGame() {
		System.out.println("   A  B  C");
		System.out.println("1_" + table[0][0].toString("_") + "_|_" + table[0][1].toString("_") + "_|_" + table[0][2].toString("_") + "_");
		System.out.println("2_" + table[1][0].toString("_") + "_|_" + table[1][1].toString("_") + "_|_" + table[1][2].toString("_") + "_");
		System.out.println("3 " + table[2][0].toString(" ") + " | " + table[2][1].toString(" ") + " | " + table[2][2].toString(" ") + " ");
	}
	
	private boolean setPosTable(Pos pos, JVEnum player) {
		if (table[pos.getLine()][pos.getCol()] != JVEnum.EMPTY) {
			return false;
		}
		
		table[pos.getLine()][pos.getCol()] = player;
		return true;
	}
	
	private boolean verifyEnd() {
		if(this.gameFinished(JVEnum.O) || this.gameFinished(JVEnum.X)) {
			return true;
		}
		
		if (!this.canWin(JVEnum.O) || !this.canWin(JVEnum.X)) {
			return true;
		}
		
		return false;
	}
	
	private void tooglePlayer() {
		if (this.actualPlayer == JVEnum.X) {
			this.actualPlayer = JVEnum.O;
			return;
		}
		
		this.actualPlayer = JVEnum.X;
	}
	
	public void run() {
		System.out.println("Bem vindo ao fabuloso jogo da velha\n");
		
		while (!this.verifyEnd()) {
			this.printGame();
			
			Pos response = new ReadKeyboard().read(this.actualPlayer);
			
			// Verifica se a posicao esta livre e preenche ela
			if (!this.setPosTable(response, this.actualPlayer)) {
				System.out.println("Resposta inválida. Tente novamente!");
				continue;
			}
			
			this.tooglePlayer();
		}
		this.printGame();
	}
}
