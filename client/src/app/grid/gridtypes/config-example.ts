import { GridAlign, GridColorRule, GridConfig } from "./grid-config";

export class ConfigGridExample {
    constructor(){
    }

    private configGridLineRules() : GridConfig{
        const grid : GridConfig = new GridConfig();

        // Somemnte um evento de click por linha
        grid.line.click = (row : any, column : any, value : any) => {
            console.log('Click');
        };

        // Mais de um evento de click por linha
        grid.line.click = [
            (row : any, column : any, value : any) => {
                console.log('Click 1');
            },
            (row : any, column : any, value : any) => {
                console.log('Click 2');
            }
        ];

        // Fixando uma cor para a linha
        grid.line.color = 'red';

        // Somente uma regra para colorir a linha
        grid.line.color = {
            color : 'red',
            condition : (row : any) => {
                return true;
            }
        }

        // Array com regras para colorir as linhas
        grid.line.color = [
            // Objeto com condiçao para colorir a linha
            {
                color : 'red',
                condition : (row : any) => {
                    return true;
                }
            },
            // Objeto sem condiçao para colorir a linha
            {
                color : 'blue',
            }
        ]

        // Por default a linha sempre fica habilitada
        // Desabilitando a linha incodicionamente
        grid.line.enabled = false;
        grid.line.enabled = (row : any) => {return false};
        grid.line.enabled = [
            (row : any) => {return false},
            (row : any) => {return true}
        ]

        return grid;
    }

    public configGridFields(grid : GridConfig){
        grid.fields = [
            // Campo simples
            {
                field : 'description',
                caption : 'Descrição',
                // Evento de click no campo
                click : (row : any, column : any, value : any) => {	
                    console.log('Click na coluna description');	
                },
                // Habilitar desabilitar o campo condicionalmente
                // Apenas uma regra para habilitar ou desabilitar o campo
                enabled : (row : any) => {  
                    return true;
                },
                align : GridAlign.LEFT,
                // Fixando uma cor para o campo
                color : 'red'
            },
            // Campo com subcampo e com duas regras de colorir
            {
                field : 'person.name',	
                caption : 'Nome',
                color : [
                            // Cor com regra de colorir
                            {
                                color : 'red',
                                condition : (row : any) => {
                                    return true;
                                }
                            },
                            // Cor sem regra de colorir
                            {
                                color : 'blue'
                            }
                        ],
                // Mais de um evento de click no campo
                click : [
                            (row : any, column : any, value : any) => {
                                console.log('Click 1');
                            },  
                            (row : any, column : any, value : any) => {
                                console.log('Click 2');
                            }
                        ],
                enabled : [
                            (row : any) => {
                                return true;
                            },
                            (row : any) => {
                                return false;
                            }
                        ],
                // Alinhamento do campo
                align : GridAlign.CENTER
            },
            {
                field : 'person.age',
                caption : 'Idade',
                enabled : false, // Desabilitando o campo de forma fixa
                align : GridAlign.RIGHT, // Alinhando o campo a direita,
                // Fixando uma cor para o campo condicionalmente
                color : {
                    color : 'red',
                    condition : (row : any) => {
                        return true;
                    }
                }
            },
            {
                field : 'person.address.street',
                caption : 'Rua',
                // Fixando uma cor para o campo no retorno da condition 
                color : {
                    condition : (row : any) => {
                        return 'red';
                    }
                }
            }
        ];
    }

    public teste(){
        const grid : GridConfig = this.configGridLineRules();
        this.configGridFields(grid);
    }
}