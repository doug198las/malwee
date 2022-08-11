package jv;

public enum JVEnum {
	O, 
	X, 
	TIE,
	EMPTY;
	
	@Override
	public String toString() {
		return this.toString(this, "");
	}
	
	public String toString(String valueWhenIsEmpty) {
		return this.toString(this, valueWhenIsEmpty);
	}
	
	public String toString(JVEnum value, String valueWhenIsEmpty) {
		if(valueWhenIsEmpty == null) {
			valueWhenIsEmpty = "";
		}
		
		if (value == JVEnum.O) {
			return "O";
		}
		
		if (value == JVEnum.X) {
			return "X";
		}
		
		if (value == JVEnum.TIE) {
			return "Empatado"; 
		}
		
		return valueWhenIsEmpty;
	}
	
	public JVEnum oposite() {
		if (this == JVEnum.O) {
			return JVEnum.X;
		}
		
		if (this == JVEnum.X) {
			return JVEnum.O;
		}
		
		return this;
	}
}
