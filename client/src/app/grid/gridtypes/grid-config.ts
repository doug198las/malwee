/*
    Recursos necessários para o funcionamento do componente

    Pintar linha de acordo com condiçao
    Pintar celula de acordo com condiçao
    Evento de click em célula específica
    Evento de click em linha específica
    Ediçao de celula de acordo com o tipo
       Quando em ediçao se pressionar enter ou tab continua a ediçao e esc cancela a edicao
    Validaçao de celula de acordo com regra quando em ediçao
    Navegaçao no grid com teclado
    Formataçao dos valores exibidos no grid, se especificado formato
    Alinhamento dos valores dentro da celula
*/

export class GridFieldType{
    static TEXT     = 'text'    ;
    static DECIMAL2 = 'decimal2';
    static DECIMAL3 = 'decimal3';
    static DATE     = 'date'    ;
    static BOOLEAN  = 'boolean' ;
    static INTEGER  = 'integer' ;
    static CURRENCY = 'currency';
}

export class GridAlign{
    static LEFT   = 'left'  ;
    static CENTER = 'center';
    static RIGHT  = 'right' ;
}

export class ExportOptions {
    static CSV = 'csv';
}

export type GridClickEvent = (row : any, collun : GridCollun, value : any) => void;
export type GridEnabledFunction = (row : any) => boolean;
type GridColorFunction = (row : any) => boolean | string;
export type GridFieldMaskFunction = (row : any, value : any) => any;

export class GridColorRule {
    public color?       : string = '';
    public condition?   : GridColorFunction | null = null;

    constructor(color : string, fn : GridColorFunction | null = null){
        this.color = color;
        this.condition = fn;
    }
}

export class GridLineConfig{
    public color     : Array<GridColorRule> | GridColorRule | string | null | undefined = [];
    public click     : Array<GridClickEvent> | GridClickEvent | null | undefined = null;
    public enabled   : Array<GridEnabledFunction> | GridEnabledFunction | boolean | null = true;
}

export class GridCollun{
    public color?    : Array<GridColorRule> | GridColorRule | string | null | undefined = [];
    public click?    : Array<GridClickEvent> | GridClickEvent | null | undefined = null;
    public caption   : string = '';
    public field     : string = '';
    public type?     : GridFieldType = GridFieldType.TEXT;
    public align?    : GridAlign = GridAlign.LEFT;
    public enabled?  : Array<GridEnabledFunction> | GridEnabledFunction | boolean | null | undefined = true;
    public mask?     : GridFieldMaskFunction | null | undefined = null;
}

export class GridConfig {
    public line     : GridLineConfig          = new GridLineConfig();
    public exports  : Array<ExportOptions>    = [ExportOptions.CSV] ;
    public fields   : Array<GridCollun> = [];
    public data     : Array<any> = [];
}