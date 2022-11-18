import { GridCollun, GridConfig } from "./grid-config";
import { GridController } from "./grid-controller";
import { GridUtils } from "./GridUtils";

export class GridCell {
    private controller : GridController | null = null;

    public gridCollun : GridCollun | null = null;
    public row : any | null = null;
    public isFocused : boolean = false;

    constructor(private config : GridConfig){
        this.controller = new GridController(config);
    }

    public getValue() : any {
        let value = GridUtils.getValue(this.row, String(this.gridCollun?.field));
        
        if (this.gridCollun?.mask){
            value = this.gridCollun.mask(this.row, value);
        }   
    }

    public isEnabled() : boolean {
        return this.controller?.isEnabled(this.row, this.gridCollun) ?? false;
    }

    public click() : void {
        this.controller?.click(this.row, this.gridCollun);
    }

    public getBackgroundColor() : string {
        return this.controller?.defineBackgroundColor(this.row, this.gridCollun) ?? '';
    }
}

export class GridRow {
    public cells : GridCell[] = [];
    
    constructor(private config : GridConfig, private row : any){

    }
}

export class Grid {
    public rows : GridRow[] = [];

    constructor(private config : GridConfig){
        
    }

    public build(array : Array<any>){
        for(const item of array){
            this.rows.push(new GridRow(this.config, item));
        }
    }
}