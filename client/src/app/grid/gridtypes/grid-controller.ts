import { GridClickEvent, GridCollun, GridColorRule, GridConfig, GridEnabledFunction } from "./grid-config";
import { GridUtils } from "./GridUtils";

export class GridController {
    constructor(private config : GridConfig){
    
    }

    private evaluateColorRule(row : any, colorRule : GridColorRule) : string{
        // Se existir uma condiçao para a cor e tiver uma cor
        if (colorRule.condition &&  colorRule.color){
            const result : any = colorRule.condition(row);

            // Se a condiçao retornar uma cor
            if (typeof result == 'string'){
                return result;
            }

            // Se a condiçao retornar um boolean
            if (typeof result == 'boolean' && result){
                return colorRule.color;
            }

            return '';
        }

        // Se nao existir uma condiçao para a cor e tiver uma cor
        if (!colorRule.condition &&  colorRule.color){
            return colorRule.color;
        }

        // Se existir uma condiçao para a cor e nao tiver uma cor
        if (colorRule.condition &&  !colorRule.color){
            const result : any = colorRule.condition(row);

            // Se a condiçao retornar uma cor
            if (typeof result == 'string'){
                return result;
            }
            
            return '';
        }

        return '';
    }

    public defineBackgroundColor(row : any, collun : GridCollun | null) : string{
        if(!row || !collun){
            return '';
        }

        // Avalia as regras de cor definidas na coluna
        //-----------------------------------------------------------------------------------------------------
        if (typeof collun.color == 'string'){
            return collun.color;
        }

        if (collun.color instanceof GridColorRule){
            return this.evaluateColorRule(row, collun.color);
        }

        if (Array.isArray(collun.color)){
            for(const colorRule of collun.color){
                const color : string = this.evaluateColorRule(row, colorRule);

                if (color != ''){
                    return color;
                }
            }
        }
        //-----------------------------------------------------------------------------------------------------

        // Avalia as regras de cor definidas na linha
        //-----------------------------------------------------------------------------------------------------
        if (!this.config.line.color){
            return '';
        }

        if (typeof this.config.line.color == 'string'){
            return this.config.line.color;
        }

        if (this.config.line.color instanceof GridColorRule){
            return this.evaluateColorRule(row, this.config.line.color);
        }

        if (Array.isArray(this.config.line.color)){
            for(const colorRule of this.config.line.color){
                const color : string = this.evaluateColorRule(row, colorRule);

                if (color != ''){
                    return color;
                }
            }
        }
        //-----------------------------------------------------------------------------------------------------

        return '';
    }

    public click(row : any, collun : GridCollun | null) : void{
        if (!row || !collun){
            return;
        }

        if (!this.isEnabled(row, collun)){
            return;
        }
        
        // O clique da coluna sempre sobrepoe o clique da linha, por isso avalia primeiro o clique da coluna
        //-----------------------------------------------------------------------------------------------------
        if (Array.isArray(collun.click)){
            for(const clickEvent of collun.click){
                clickEvent(row, collun, GridUtils.getValue(row, collun.field));
            }
            return;
        }

        if (collun.click){
            (collun.click as GridClickEvent)(row, collun, GridUtils.getValue(row, collun.field));
            return;
        }
        //-----------------------------------------------------------------------------------------------------

        // Agora vamos avaliar o clique da linha
        //-----------------------------------------------------------------------------------------------------
        if (!this.config.line.click){
            return;	
        }

        if (Array.isArray(this.config.line.click)){
            for(const clickEvent of this.config.line.click){
                clickEvent(row, collun, GridUtils.getValue(row, collun.field));
            }
            return;
        }

        (this.config.line.click as GridClickEvent)(row, collun, GridUtils.getValue(row, collun.field));
        //-----------------------------------------------------------------------------------------------------
    }

    public isEnabled(row : any, collun : GridCollun | null) : boolean{
        if (!row || !collun){
            return false;
        }

        // Avalia as regras da linha
        //-----------------------------------------------------------------------------------------------------
        if (this.config.line.enabled){
            if (typeof this.config.line.enabled == 'boolean'){
                if(!this.config.line.enabled){
                    return false;
                }
            }

            if (Array.isArray(this.config.line.enabled)){
                // Se uma regra retornar false, a linha fica desabilitada
                for(const enabledFunction of this.config.line.enabled){
                    if (!enabledFunction(row)){
                        return false;
                    }
                }
            }

            if (typeof this.config.line.enabled == 'function'){
                 if(!(this.config.line.enabled as GridEnabledFunction)(row)){
                        return false;   
                 }
            }
        }
        //-----------------------------------------------------------------------------------------------------

        // Avalia se a coluna esta habilitada
        //-----------------------------------------------------------------------------------------------------
        if (typeof collun.enabled == 'boolean'){
            return collun.enabled;
        }

        if (Array.isArray(collun.enabled)){
            // Se uma regra retornar false a coluna fica desabilitada
            for(const enabledRule of collun.enabled){
                const result : any = enabledRule(row);

                if (!result){
                    return false;
                }
            }
        }
         
        if (collun.enabled){
            return (collun.enabled as GridEnabledFunction)(row);
        }
        //-----------------------------------------------------------------------------------------------------

        return true;
    }
}
