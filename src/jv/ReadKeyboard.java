package jv;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ReadKeyboard {
	private String doRead() {
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
		
			return in.readLine();
		} catch (Exception e) {
			System.out.println("Error on read keyboard: " + e.getMessage());
			return "";
		}
	}
	
	private Pos validate(String text) {
		if (text == null || text.length() != 2 || !Character.isDigit(text.charAt(0))) {
			return null;
		}
		
		char charX = text.charAt(0);
		char charY = text.charAt(1);
		
		if (Character.getNumericValue(charX) < 1 || Character.getNumericValue(charX) > 3) {
			return null;
		}
		
		charY = Character.toUpperCase(charY);
		
		if (charY != 'A' && charY != 'B' && charY != 'C') {
			return null;
		}
		
		int x = Character.getNumericValue(charX) - 1;
		int y = -1;
		
		if (charY == 'A') {
			y = 0;
		}
		
		if (charY == 'B'){
			y = 1;
		}
		
		if (charY == 'C') {
			y = 2;
		}
		
		return new Pos(x, y);
	}
	
	public Pos read(JVEnum player) {
		System.out.println("Jogador " + player.toString() + " faça a sua jogada!");
		String text  = this.doRead();
		Pos result   = this.validate(text);
		
		if (result != null) {
			return result;
		}
		
		System.out.println("Valor informado inválido. Tente novamente.\n");
		return this.read(player);	
	}
}
